// DS.Storage - Firestore-backed storage with in-memory cache
DS.Storage = (function() {
  var OLD_STORAGE_KEY = 'drawsteel_characters';
  var _cache = [];
  var _ready = false;
  var _readyCallbacks = [];

  function init() {
    DS.db.collection('characters')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(function(snapshot) {
        _cache = [];
        snapshot.forEach(function(doc) {
          _cache.push(doc.data());
        });
        if (!_ready) {
          _ready = true;
          var cbs = _readyCallbacks.slice();
          _readyCallbacks = [];
          cbs.forEach(function(cb) { cb(); });
        }
        // Auto-refresh home screen if visible
        var homeScreen = document.getElementById('home-screen');
        if (homeScreen && homeScreen.classList.contains('active') && DS.App && DS.App.renderCharacterList) {
          DS.App.renderCharacterList();
        }
      }, function(err) {
        console.error('Firestore onSnapshot error:', err);
      });
  }

  function onReady(cb) {
    if (_ready) { cb(); return; }
    _readyCallbacks.push(cb);
  }

  function isReady() {
    return _ready;
  }

  function getAll() {
    return _cache;
  }

  function save(character) {
    // Stamp player name and timestamp
    if (DS.Player) {
      character.playerName = character.playerName || DS.Player.getName();
    }
    character.updatedAt = Date.now();

    // Update cache optimistically
    var idx = -1;
    for (var i = 0; i < _cache.length; i++) {
      if (_cache[i].id === character.id) { idx = i; break; }
    }
    if (idx >= 0) {
      _cache[idx] = character;
    } else {
      _cache.unshift(character);
    }

    // Fire-and-forget to Firestore
    DS.db.collection('characters').doc(character.id).set(JSON.parse(JSON.stringify(character)))
      .catch(function(err) { console.error('Firestore save error:', err); });
  }

  function remove(id) {
    _cache = _cache.filter(function(c) { return c.id !== id; });
    DS.db.collection('characters').doc(id).delete()
      .catch(function(err) { console.error('Firestore delete error:', err); });
  }

  function load(id) {
    for (var i = 0; i < _cache.length; i++) {
      if (_cache[i].id === id) return _cache[i];
    }
    return null;
  }

  function exportJSON(character) {
    var blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (character.name || character.details.heroName || 'character') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function exportFoundryVTT(character) {
    var computed = character.computed || {};
    var char = character;

    // Resolve ancestry name
    var ancestryName = '';
    if (char.ancestry && char.ancestry.id) {
      var anc = DS.Data.Ancestries.find(function(a) { return a.id === char.ancestry.id; });
      if (anc) ancestryName = anc.name;
    }

    // Resolve culture names
    var culture = {};
    if (char.culture) {
      if (char.culture.environment) {
        var env = DS.Data.Cultures.environments.find(function(e) { return e.id === char.culture.environment; });
        culture.environment = env ? env.name : char.culture.environment;
      }
      if (char.culture.organization) {
        var org = DS.Data.Cultures.organizations.find(function(o) { return o.id === char.culture.organization; });
        culture.organization = org ? org.name : char.culture.organization;
      }
      if (char.culture.upbringing) {
        var upb = DS.Data.Cultures.upbringings.find(function(u) { return u.id === char.culture.upbringing; });
        culture.upbringing = upb ? upb.name : char.culture.upbringing;
      }
      culture.language = char.culture.language || '';
    }

    // Resolve career name
    var careerName = '';
    if (char.career && char.career.id) {
      var car = DS.Data.Careers.find(function(c) { return c.id === char.career.id; });
      if (car) careerName = car.name;
    }

    // Resolve class and subclass names
    var className = '';
    var subclassName = '';
    if (char.class && char.class.id) {
      var cls = DS.Data.Classes[char.class.id];
      if (cls) {
        className = cls.name;
        if (char.class.subclass && cls.subclasses) {
          var sub = cls.subclasses.find(function(s) { return s.id === char.class.subclass; });
          if (sub) subclassName = sub.name;
        }
        // Conduit dual domains
        if (char.class.id === 'conduit' && char.class.levelChoices && char.class.levelChoices.domains) {
          var domainNames = [];
          char.class.levelChoices.domains.forEach(function(domId) {
            var domObj = cls.subclasses.find(function(s) { return s.id === domId; });
            if (domObj) domainNames.push(domObj.name);
          });
          if (domainNames.length) subclassName = domainNames.join(' & ');
        }
      }
    }

    // Resolve kit name
    var kitName = '';
    if (char.kit && char.kit.id) {
      var kit = DS.Data.Kits.find(function(k) { return k.id === char.kit.id; });
      if (kit) kitName = kit.name;
    }

    // Resolve complication name
    var complicationName = '';
    if (char.complication && char.complication.id) {
      var comp = DS.Data.Complications.find(function(c) { return c.id === char.complication.id; });
      if (comp) complicationName = comp.name;
    }

    // Collect all ability names
    var abilities = [];
    if (char.class && char.class.signatureAbilities) {
      char.class.signatureAbilities.forEach(function(name) {
        if (abilities.indexOf(name) === -1) abilities.push(name);
      });
    }
    if (char.class && char.class.heroicAbilities) {
      var ha = char.class.heroicAbilities;
      Object.keys(ha).forEach(function(cost) {
        (ha[cost] || []).forEach(function(name) {
          if (abilities.indexOf(name) === -1) abilities.push(name);
        });
      });
    }

    // Collect perks
    var perks = [];
    if (char.career && char.career.perk) {
      var cp = DS.Data.PerksList.find(function(p) { return p.id === char.career.perk || p.name === char.career.perk; });
      if (cp) perks.push(cp.name);
    }
    var lc = char.class && char.class.levelChoices || {};
    Object.keys(lc).forEach(function(lvl) {
      if (lc[lvl] && lc[lvl].perk) {
        var pd = DS.Data.PerksList.find(function(p) { return p.id === lc[lvl].perk; });
        if (pd && perks.indexOf(pd.name) === -1) perks.push(pd.name);
      }
    });

    // Resolve size
    var sizeRaw = computed.size || '1M';
    var sizeStr = String(sizeRaw);
    var sizeValue = parseFloat(sizeStr) || 1;
    var sizeLetter = sizeStr.replace(/[^A-Za-z]/g, '') || 'M';

    // Build export object
    var result = {
      format: 'drawsteel-foundry-v1',
      name: (char.details && char.details.heroName) || char.name || 'Unnamed Hero',
      level: char.level || 1,
      ancestry: { name: ancestryName },
      culture: culture,
      career: { name: careerName },
      class: { name: className, subclass: subclassName },
      kit: { name: kitName },
      complication: { name: complicationName },
      characteristics: char.class && char.class.characteristics || { might: 0, agility: 0, reason: 0, intuition: 0, presence: 0 },
      skills: computed.skills || [],
      languages: computed.languages || [],
      stamina: { max: computed.stamina || 0, winded: computed.winded || 0, recoveryValue: computed.recoveryValue || 0, recoveries: computed.recoveries || 0 },
      speed: computed.speed || 5,
      stability: computed.stability || 0,
      size: { value: sizeValue, letter: sizeLetter },
      abilities: abilities,
      perks: perks,
      biography: {
        pronouns: (char.details && char.details.pronouns) || '',
        appearance: (char.details && char.details.appearance) || '',
        personality: (char.details && char.details.personality) || '',
        backstory: (char.details && char.details.backstory) || ''
      },
      portrait: (char.details && char.details.portrait) || ''
    };

    var blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (result.name || 'character') + '-foundry.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function parseImportFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var data = JSON.parse(e.target.result);
        if (!data.id || !data.ancestry) {
          callback(null, 'Invalid character file');
          return;
        }
        callback(data, null);
      } catch(err) {
        callback(null, 'Failed to parse file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function findByName(heroName) {
    if (!heroName) return [];
    var lower = heroName.toLowerCase();
    return getAll().filter(function(c) {
      var n = (c.details && c.details.heroName || c.name || '').toLowerCase();
      return n === lower;
    });
  }

  function getNextIncrementalName(baseName) {
    var chars = getAll();
    var max = 0;
    var baseLower = baseName.toLowerCase();
    var re = new RegExp('^' + escapeRegex(baseLower) + '(?:\\s*\\((\\d+)\\))?$');
    chars.forEach(function(c) {
      var n = (c.details && c.details.heroName || c.name || '').toLowerCase();
      var m = n.match(re);
      if (m) {
        var num = m[1] ? parseInt(m[1]) : 0;
        if (num >= max) max = num + 1;
      }
    });
    return baseName + ' (' + max + ')';
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function autosave() {
    var char = DS.State.getRef();
    if (char && char.id) {
      save(char);
    }
  }

  // One-time migration of existing localStorage characters to Firestore
  function migrateLocalStorage() {
    try {
      var data = localStorage.getItem(OLD_STORAGE_KEY);
      if (!data) return;
      var chars = JSON.parse(data);
      if (!Array.isArray(chars) || chars.length === 0) return;
      var playerName = DS.Player.getName();
      chars.forEach(function(c) {
        c.playerName = playerName;
        c.updatedAt = Date.now();
        DS.db.collection('characters').doc(c.id).set(JSON.parse(JSON.stringify(c)))
          .catch(function(err) { console.error('Migration save error:', err); });
      });
      localStorage.removeItem(OLD_STORAGE_KEY);
      console.log('Migrated ' + chars.length + ' characters from localStorage to Firestore');
    } catch(e) {
      console.error('Migration error:', e);
    }
  }

  return {
    init: init,
    onReady: onReady,
    isReady: isReady,
    getAll: getAll,
    save: save,
    remove: remove,
    load: load,
    exportJSON: exportJSON,
    exportFoundryVTT: exportFoundryVTT,
    parseImportFile: parseImportFile,
    findByName: findByName,
    getNextIncrementalName: getNextIncrementalName,
    autosave: autosave,
    migrateLocalStorage: migrateLocalStorage
  };
})();
