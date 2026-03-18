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
    parseImportFile: parseImportFile,
    findByName: findByName,
    getNextIncrementalName: getNextIncrementalName,
    autosave: autosave,
    migrateLocalStorage: migrateLocalStorage
  };
})();
