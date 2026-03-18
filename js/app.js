// DS.App - Entry point, router, init
DS.Steps = DS.Steps || {};
DS.Data = DS.Data || {};

DS.App = (function() {

  function init() {
    DS.State.init();
    DS.Wizard.init();

    // Wire home screen buttons
    document.getElementById('btn-new-character').addEventListener('click', newCharacter);
    document.getElementById('btn-import').addEventListener('click', function() {
      document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', handleImport);
    document.getElementById('btn-rules').addEventListener('click', showRules);
    document.getElementById('btn-rules-back').addEventListener('click', showHome);

    // Auto-save on state changes (debounced)
    var saveTimeout;
    DS.State.subscribe(function() {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(DS.Storage.autosave, 500);
    });

    // Player name prompt → Firestore init → show home
    DS.Player.ensureName(function() {
      DS.Storage.init();
      DS.Storage.onReady(function() {
        DS.Storage.migrateLocalStorage();
        showHome();
      });
    });
  }

  function showHome() {
    setScreen('home-screen');
    renderCharacterList();
  }

  function showWizard() {
    document.getElementById('wizard-screen').classList.remove('sheet-mode');
    setScreen('wizard-screen');
  }

  function showLevelUp(charId) {
    var char = DS.Storage.load(charId);
    if (!char) return;
    if (!char.class.id || char.level >= 10) return;

    // Ownership check
    if (DS.Player && !DS.Player.isOwner(char)) return;

    DS.State.set(char);
    var classData = DS.Data.Classes[char.class.id];
    if (!classData) return;

    var nextLevel = (char.level || 1) + 1;

    setScreen('levelup-screen');
    var title = document.getElementById('levelup-title');
    var name = char.details.heroName || 'Unnamed Hero';
    title.textContent = name + ' — Level ' + char.level + ' → ' + nextLevel;

    var container = document.getElementById('levelup-content');
    var clsName = char.class.id.charAt(0).toUpperCase() + char.class.id.slice(1);
    container.style.setProperty('--step-bg', "url('resources/classes/" + clsName + ".png')");
    DS.LevelUp.render(container, char, classData, nextLevel);

    // Wire buttons
    var backBtn = document.getElementById('btn-levelup-back');
    var cancelBtn = document.getElementById('btn-levelup-cancel');
    var confirmBtn = document.getElementById('btn-levelup-confirm');

    function goBack() {
      var c = DS.State.getRef();
      if (c && c.finished) {
        showCharacterSheet(c.id);
      } else {
        showHome();
      }
    }

    backBtn.onclick = goBack;
    cancelBtn.onclick = goBack;
    confirmBtn.onclick = function() {
      DS.LevelUp.confirm(char, nextLevel, classData);
    };
  }

  function showRules() {
    setScreen('rules-screen');
    DS.Rules.render(document.getElementById('rules-content'));
  }

  function setScreen(id) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
  }

  function newCharacter() {
    DS.State.init();
    showWizard();
    DS.Wizard.start();
  }

  function editCharacter(id) {
    var char = DS.Storage.load(id);
    if (!char) return;

    // Non-owners can only view
    if (DS.Player && !DS.Player.isOwner(char)) {
      DS.State.set(char);
      showCharacterSheet(id);
      return;
    }

    DS.State.set(char);
    if (char.finished) {
      showCharacterSheet(id);
    } else {
      showWizard();
      DS.Wizard.resume(char);
    }
  }

  function showCharacterSheet() {
    var wizardScreen = document.getElementById('wizard-screen');
    wizardScreen.classList.add('sheet-mode');
    setScreen('wizard-screen');

    // Hide all step containers, activate only summary
    document.querySelectorAll('.step-container').forEach(function(el) {
      el.classList.remove('active');
    });
    var summaryEl = document.getElementById('step-summary');
    summaryEl.classList.add('active');

    // Set class-specific background if character has a class
    var char = DS.State.getRef();
    if (char && char.class && char.class.id) {
      var className = char.class.id.charAt(0).toUpperCase() + char.class.id.slice(1);
      summaryEl.style.setProperty('--step-bg', "url('resources/classes/" + className + ".png')");
    } else {
      summaryEl.style.removeProperty('--step-bg');
    }

    // Clear sidebar
    if (DS.Sidebar) DS.Sidebar.clear();

    // Render summary
    DS.Steps.Summary.render(summaryEl);
    window.scrollTo(0, 0);
  }

  function enterEditMode() {
    document.getElementById('step-summary').style.removeProperty('--step-bg');
    var wizardScreen = document.getElementById('wizard-screen');
    wizardScreen.classList.remove('sheet-mode');
    DS.Wizard.resume(DS.State.getRef());
  }

  function editLevelUp(level) {
    var char = DS.State.getRef();
    if (!char || !char.class.id) return;
    var classData = DS.Data.Classes[char.class.id];
    if (!classData) return;

    // Snapshot for cancel
    var snapshot = JSON.parse(JSON.stringify(char));
    var oldChoices = char.class.levelChoices[level]
      ? JSON.parse(JSON.stringify(char.class.levelChoices[level]))
      : {};

    // Revert applied changes for this level
    revertLevelChoices(char, level, classData);
    DS.State.set(char);

    setScreen('levelup-screen');
    var title = document.getElementById('levelup-title');
    var name = char.details.heroName || 'Unnamed Hero';
    title.textContent = name + ' \u2014 Editing Level ' + level;

    var container = document.getElementById('levelup-content');
    var clsName = char.class.id.charAt(0).toUpperCase() + char.class.id.slice(1);
    container.style.setProperty('--step-bg', "url('resources/classes/" + clsName + ".png')");
    DS.LevelUp.render(container, char, classData, level, oldChoices);

    // Wire buttons
    var backBtn = document.getElementById('btn-levelup-back');
    var cancelBtn = document.getElementById('btn-levelup-cancel');
    var confirmBtn = document.getElementById('btn-levelup-confirm');

    function returnToEditSummary() {
      showWizard();
      DS.Wizard.goToStep(7);
    }

    function goBack() {
      // Restore snapshot on cancel
      DS.State.set(snapshot);
      DS.Storage.save(snapshot);
      returnToEditSummary();
    }

    backBtn.onclick = goBack;
    cancelBtn.onclick = goBack;
    confirmBtn.onclick = function() {
      DS.LevelUp.confirm(char, level, classData, {
        skipLevelChange: true,
        onComplete: returnToEditSummary
      });
    };
  }

  function revertLevelChoices(char, level, classData) {
    var lc = char.class.levelChoices[level];
    if (!lc) return;

    var advancement = classData.advancement[level];

    // Revert auto characteristic bumps
    if (advancement && advancement.charBumps && advancement.charBumps.auto) {
      Object.keys(advancement.charBumps.auto).forEach(function(stat) {
        char.class.characteristics[stat] = (char.class.characteristics[stat] || 0) - advancement.charBumps.auto[stat];
      });
    }

    // Revert chosen characteristic bump
    if (lc.charBump) {
      char.class.characteristics[lc.charBump] = (char.class.characteristics[lc.charBump] || 0) - 1;
    }

    // Remove heroic ability
    if (lc.heroicAbility && lc.heroicAbility.name) {
      var cost = lc.heroicAbility.cost;
      var arr = char.class.heroicAbilities[cost] || [];
      var idx = arr.indexOf(lc.heroicAbility.name);
      if (idx !== -1) arr.splice(idx, 1);
    }

    // Delete the level choices entry
    delete char.class.levelChoices[level];
  }

  function renderCharacterList() {
    var container = document.getElementById('character-list');

    if (!DS.Storage.isReady()) {
      container.innerHTML = '<p class="text-center text-dim mt-2">Loading characters...</p>';
      return;
    }

    var chars = DS.Storage.getAll();
    var playerName = DS.Player.getName();

    // Player header
    var html = '<div class="player-header">' +
      '<span class="player-label">Playing as: <strong>' + DS.Renderer.esc(playerName) + '</strong></span>' +
      ' <a href="#" class="player-change-link" id="change-player-name">Change</a>' +
    '</div>';

    // Split into mine and others
    var mine = [];
    var othersByPlayer = {};
    chars.forEach(function(c) {
      if (c.playerName === playerName) {
        mine.push(c);
      } else {
        var owner = c.playerName || 'Unknown';
        if (!othersByPlayer[owner]) othersByPlayer[owner] = [];
        othersByPlayer[owner].push(c);
      }
    });

    if (mine.length === 0 && Object.keys(othersByPlayer).length === 0) {
      html += '<p class="text-center text-dim mt-2">No saved characters yet.</p>';
      container.innerHTML = html;
      wireChangePlayerName(container);
      return;
    }

    // My characters
    if (mine.length > 0) {
      html += '<h2>My Characters</h2>';
      mine.forEach(function(c) {
        html += renderCharCard(c, true);
      });
    }

    // Other players' characters
    var otherPlayers = Object.keys(othersByPlayer).sort();
    otherPlayers.forEach(function(owner) {
      html += '<h2>' + DS.Renderer.esc(owner) + '\'s Characters</h2>';
      othersByPlayer[owner].forEach(function(c) {
        html += renderCharCard(c, false);
      });
    });

    container.innerHTML = html;
    wireChangePlayerName(container);
    wireCharCardHandlers(container);
  }

  function renderCharCard(c, isOwner) {
    var name = c.details.heroName || c.name || 'Unnamed Hero';
    var ancestry = c.ancestry.id ? capitalize(c.ancestry.id) : '';
    var cls = c.class.id ? capitalize(c.class.id) : '';
    var meta = [ancestry, cls, 'Level ' + (c.level || 1)].filter(Boolean).join(' &middot; ');

    var portrait = (c.details && c.details.portrait)
      ? '<div class="char-card-portrait"><img src="' + DS.Renderer.esc(c.details.portrait) + '" alt=""></div>'
      : '<div class="char-card-portrait"><div class="char-card-portrait-empty">' + DS.Renderer.esc(name.charAt(0)) + '</div></div>';

    var actions = '';
    if (isOwner) {
      actions =
        '<button class="btn btn-sm btn-secondary char-edit" data-id="' + c.id + '">Edit</button>' +
        (c.class.id && (c.level || 1) < 10 ? '<button class="btn btn-sm btn-primary char-levelup" data-id="' + c.id + '">Level Up</button>' : '') +
        '<button class="btn btn-sm btn-secondary char-export" data-id="' + c.id + '">Export</button>' +
        '<button class="btn btn-sm btn-danger char-delete" data-id="' + c.id + '">Delete</button>';
    } else {
      actions =
        '<button class="btn btn-sm btn-secondary char-view" data-id="' + c.id + '">View</button>' +
        '<button class="btn btn-sm btn-secondary char-export" data-id="' + c.id + '">Export</button>';
    }

    return '<div class="char-card" data-id="' + c.id + '">' +
      portrait +
      '<div class="char-card-info">' +
        '<div class="char-card-name">' + DS.Renderer.esc(name) + '</div>' +
        '<div class="char-card-meta">' + meta + '</div>' +
      '</div>' +
      '<div class="char-card-actions">' + actions + '</div>' +
    '</div>';
  }

  function wireChangePlayerName(container) {
    var link = container.querySelector('#change-player-name');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        DS.Renderer.showModal({
          title: 'Change Player Name',
          message: 'This only changes your display name. Existing characters keep their original owner.',
          confirmLabel: 'OK',
          onConfirm: function() {
            // Re-prompt for name
            localStorage.removeItem('drawsteel_player_name');
            DS.Player.ensureName(function() {
              renderCharacterList();
            });
          }
        });
      });
    }
  }

  function wireCharCardHandlers(container) {
    // Click on card body → edit/view
    container.querySelectorAll('.char-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        if (e.target.classList.contains('char-edit') || e.target.classList.contains('char-view') ||
            e.target.classList.contains('char-export') || e.target.classList.contains('char-delete') ||
            e.target.classList.contains('char-levelup')) return;
        editCharacter(card.dataset.id);
      });
    });

    // Edit buttons (owner only)
    container.querySelectorAll('.char-edit').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var char = DS.Storage.load(btn.dataset.id);
        if (!char) return;
        DS.State.set(char);
        showWizard();
        DS.Wizard.resume(char);
      });
    });

    // View buttons (non-owner)
    container.querySelectorAll('.char-view').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        editCharacter(btn.dataset.id);
      });
    });

    // Level up buttons
    container.querySelectorAll('.char-levelup').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        showLevelUp(btn.dataset.id);
      });
    });

    // Export buttons
    container.querySelectorAll('.char-export').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var c = DS.Storage.load(btn.dataset.id);
        if (c) DS.Storage.exportJSON(c);
      });
    });

    // Delete buttons (owner only)
    container.querySelectorAll('.char-delete').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var charId = btn.dataset.id;
        var char = DS.Storage.load(charId);
        if (!char) return;
        if (DS.Player && !DS.Player.isOwner(char)) return;
        DS.Renderer.showModal({
          title: 'Delete Character',
          message: 'Are you sure you want to delete this character? This cannot be undone.',
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
          danger: true,
          onConfirm: function() {
            DS.Storage.remove(charId);
            renderCharacterList();
          }
        });
      });
    });
  }

  function handleImport(e) {
    var file = e.target.files[0];
    if (!file) return;
    DS.Storage.parseImportFile(file, function(data, err) {
      e.target.value = '';
      if (err) {
        DS.Renderer.showModal({ title: 'Import Failed', message: err });
        return;
      }
      var heroName = (data.details && data.details.heroName) || data.name || '';
      var duplicates = DS.Storage.findByName(heroName);

      if (duplicates.length > 0) {
        DS.Renderer.showModal({
          title: 'Character Already Exists',
          message: 'A character named "' + heroName + '" already exists. Would you like to overwrite the existing character or add as a new one?',
          confirmLabel: 'Overwrite',
          cancelLabel: 'Add New',
          danger: true,
          onConfirm: function() {
            // Overwrite: keep the existing character's id
            data.id = duplicates[0].id;
            data.playerName = DS.Player.getName();
            DS.Storage.save(data);
            renderCharacterList();
          },
          onCancel: function() {
            // Add new with incremental name
            data.id = DS.State.generateId();
            data.playerName = DS.Player.getName();
            data.details.heroName = DS.Storage.getNextIncrementalName(heroName);
            DS.Storage.save(data);
            renderCharacterList();
          }
        });
      } else {
        data.id = DS.State.generateId();
        data.playerName = DS.Player.getName();
        DS.Storage.save(data);
        renderCharacterList();
      }
    });
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
  }

  return {
    init: init,
    showHome: showHome,
    showWizard: showWizard,
    showRules: showRules,
    editCharacter: editCharacter,
    showLevelUp: showLevelUp,
    showCharacterSheet: showCharacterSheet,
    enterEditMode: enterEditMode,
    editLevelUp: editLevelUp,
    renderCharacterList: renderCharacterList
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', DS.App.init);
