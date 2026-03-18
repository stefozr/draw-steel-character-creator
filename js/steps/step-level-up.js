// DS.LevelUp - Level-up screen (standalone, not a wizard step)
DS.LevelUp = (function() {

  var choices = {};
  var requiredChoices = [];
  var currentChar;

  function render(container, char, classData, nextLevel, preselect) {
    choices = {};
    requiredChoices = [];
    currentChar = char;

    var advancement = classData.advancement[nextLevel];
    if (!advancement) {
      container.innerHTML = '<p class="text-dim">No advancement data for level ' + nextLevel + '.</p>';
      return;
    }

    var features = advancement.features || [];
    var charBumps = advancement.charBumps || null;

    var html = '<h2 class="step-title">Level ' + (nextLevel - 1) + ' &rarr; Level ' + nextLevel + '</h2>' +
      '<p class="step-subtitle">' + DS.Renderer.esc(classData.name) + ' Advancement</p>';

    // Auto-granted features
    var autoFeatures = classifyFeatures(features);
    if (autoFeatures.display.length > 0) {
      html += '<div class="levelup-section">' +
        '<h4>New Features</h4>' +
        '<div class="levelup-feature-list">';
      autoFeatures.display.forEach(function(f) {
        var desc = findFeatureDescription(classData, char, f);
        html += '<div class="levelup-feature-item">' +
          '<span class="feature-badge">' + DS.Renderer.esc(f) + '</span>' +
          (desc ? '<p class="text-sm text-dim" style="margin:0.25rem 0 0.5rem 0;">' + DS.Renderer.esc(desc) + '</p>' : '') +
        '</div>';
      });
      html += '</div></div>';
    }

    // Characteristic bumps
    if (charBumps) {
      html += renderCharBumpsSection(char, charBumps);
    }

    // Perk choice
    if (autoFeatures.hasPerk) {
      html += renderPerkSection(char, autoFeatures.perkFilter);
    }

    // Skill choice
    if (autoFeatures.hasSkill) {
      html += renderSkillSection(char, classData);
    }

    // Heroic ability choice
    if (autoFeatures.heroicAbilityCost) {
      html += renderHeroicAbilitySection(char, classData, autoFeatures.heroicAbilityCost);
    }

    container.innerHTML = html;

    // Wire interactive elements
    wireCharBumps(container, char, charBumps);
    wirePerkPicker(container);
    wireSkillPicker(container);
    wireHeroicAbilityPicker(container, char, classData, autoFeatures.heroicAbilityCost);

    // Apply pre-selections when editing an existing level-up
    if (preselect) {
      applyPreselections(container, preselect);
    }

    updateConfirmButton();
  }

  function classifyFeatures(features) {
    var result = {
      display: [],
      hasPerk: false,
      perkFilter: null,
      hasSkill: false,
      heroicAbilityCost: null
    };

    features.forEach(function(f) {
      if (/^Perk(\s*\(|$)/.test(f)) {
        result.hasPerk = true;
        var match = f.match(/\(([^)]+)\)/);
        if (match) {
          result.perkFilter = match[1].split('/').map(function(s) { return s.trim(); });
        }
      } else if (f === 'Skill') {
        result.hasSkill = true;
      } else if (/^\d+-cost Heroic Ability$/.test(f)) {
        // "7-cost Heroic Ability" (standard pattern)
        result.heroicAbilityCost = parseInt(f);
      } else if (/^\d+-\w+ Ability$/.test(f)) {
        // "7-Ferocity Ability" (Fury pattern)
        result.heroicAbilityCost = parseInt(f);
      } else if (/Ability\s*\(\d+/.test(f)) {
        // "Doctrine Ability (5-cost)", "Aspect Ability (9-Ferocity)"
        var costMatch = f.match(/\((\d+)/);
        if (costMatch) result.heroicAbilityCost = parseInt(costMatch[1]);
      } else if (/^Characteristic/.test(f)) {
        // Handled by charBumps section
      } else {
        result.display.push(f);
      }
    });

    return result;
  }

  // --- Feature Description Lookup ---
  function findFeatureDescription(classData, char, featureName) {
    // 1. Check features flat map (most common)
    if (classData.features && classData.features[featureName]) {
      return classData.features[featureName];
    }
    // 2. Check core class features
    if (classData.classFeatures && classData.classFeatures.core) {
      var coreMatch = classData.classFeatures.core.find(function(f) { return f.name === featureName; });
      if (coreMatch) return coreMatch.description;
    }
    // 3. Check subclass features
    var sub = char && char.class ? char.class.subclass : null;
    if (sub && classData.classFeatures && classData.classFeatures.subclassFeatures && classData.classFeatures.subclassFeatures[sub]) {
      var subMatch = classData.classFeatures.subclassFeatures[sub].find(function(f) { return f.name === featureName; });
      if (subMatch) return subMatch.description;
    }
    return null;
  }

  // --- Characteristic Bumps ---
  function renderCharBumpsSection(char, charBumps) {
    var chars = char.class.characteristics || {};
    var html = '<div class="levelup-section">' +
      '<h4>Characteristic Increases</h4>';

    if (charBumps.auto) {
      html += '<div class="stat-bump-list">';
      Object.keys(charBumps.auto).forEach(function(stat) {
        var current = chars[stat] || 0;
        var next = current + charBumps.auto[stat];
        if (next > charBumps.max) next = charBumps.max;
        html += '<div class="stat-bump-row">' +
          '<span class="stat-bump-name">' + capitalize(stat) + '</span>' +
          '<span class="stat-bump-change">' + current + ' &rarr; ' + next + '</span>' +
        '</div>';
      });
      html += '</div>';
    }

    if (charBumps.choose) {
      requiredChoices.push('charBump');
      var autoStats = charBumps.auto ? Object.keys(charBumps.auto) : [];
      html += '<p class="text-sm text-dim mt-1">Choose ' + charBumps.choose + ' other characteristic to increase (max ' + charBumps.max + '):</p>' +
        '<div class="choice-pills mt-1" id="charbump-choices">';
      ['might', 'agility', 'reason', 'intuition', 'presence'].forEach(function(stat) {
        if (autoStats.indexOf(stat) !== -1) return;
        var current = chars[stat] || 0;
        var disabled = current >= charBumps.max;
        html += '<button class="choice-pill charbump-pill' + (disabled ? ' disabled' : '') + '" data-stat="' + stat + '"' +
          (disabled ? ' disabled' : '') + '>' +
          capitalize(stat) + ' (' + current + ' &rarr; ' + (current + 1) + ')' +
        '</button>';
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  function wireCharBumps(container, char, charBumps) {
    if (!charBumps || !charBumps.choose) return;
    container.querySelectorAll('.charbump-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        if (pill.disabled) return;
        container.querySelectorAll('.charbump-pill').forEach(function(p) { p.classList.remove('selected'); });
        pill.classList.add('selected');
        choices.charBump = pill.dataset.stat;
        updateConfirmButton();
      });
    });
  }

  // --- Perk Picker ---
  function renderPerkSection(char, perkFilter) {
    requiredChoices.push('perk');
    var perks = getPerkOptions(char, perkFilter);

    var html = '<div class="levelup-section">' +
      '<h4>Choose a Perk</h4>';
    if (perkFilter) {
      html += '<p class="text-sm text-dim mb-1">Limited to: ' + perkFilter.join(', ') + '</p>';
    }
    html += '<div class="selection-grid" id="perk-grid">';
    perks.forEach(function(p) {
      html += '<div class="card perk-option" data-perk="' + p.id + '">' +
        '<div class="card-title">' + DS.Renderer.esc(p.name) + '</div>' +
        '<span class="card-badge">' + p.type + '</span>' +
        '<div class="card-desc">' + DS.Renderer.esc(p.description) + '</div>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function getPerkOptions(char, perkFilter) {
    var existingPerks = getExistingPerks(char);
    var perks = [];
    var categories = perkFilter || Object.keys(DS.Data.Perks);
    categories.forEach(function(cat) {
      (DS.Data.Perks[cat] || []).forEach(function(p) {
        if (existingPerks.indexOf(p.id) === -1) {
          perks.push(p);
        }
      });
    });
    return perks;
  }

  function getExistingPerks(char) {
    var perks = [];
    if (char.career.perk) perks.push(char.career.perk);
    var lc = char.class.levelChoices || {};
    Object.keys(lc).forEach(function(lvl) {
      if (lc[lvl].perk) perks.push(lc[lvl].perk);
    });
    return perks;
  }

  function wirePerkPicker(container) {
    container.querySelectorAll('.perk-option').forEach(function(card) {
      card.addEventListener('click', function() {
        container.querySelectorAll('.perk-option').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        choices.perk = card.dataset.perk;
        updateConfirmButton();
      });
    });
  }

  // --- Skill Picker ---
  function renderSkillSection(char, classData) {
    requiredChoices.push('skill');
    var existingSkills = getExistingSkills(char);
    var available = DS.Data.AllSkills.filter(function(s) {
      return existingSkills.indexOf(s) === -1;
    });

    var html = '<div class="levelup-section">' +
      '<h4>Choose a Skill</h4>' +
      '<div class="choice-pills" id="skill-choices">';

    if (choices.skill) {
      html += '<span class="choice-pill selected js-levelup-skill-filled">'
        + DS.Renderer.esc(choices.skill)
        + ' <span class="skill-chip-clear">&times;</span></span>';
    } else {
      html += '<select class="choice-pill choice-pill-empty js-levelup-skill-select">';
      html += '<option value="">+ Choose skill</option>';
      available.forEach(function(s) {
        html += '<option value="' + DS.Renderer.esc(s) + '">' + DS.Renderer.esc(s) + '</option>';
      });
      html += '</select>';
    }

    html += '</div></div>';
    return html;
  }

  function getExistingSkills(char) {
    var skills = [];
    (char.computed.skills || []).forEach(function(s) { skills.push(s); });
    var lc = char.class.levelChoices || {};
    Object.keys(lc).forEach(function(lvl) {
      if (lc[lvl].skill) skills.push(lc[lvl].skill);
    });
    return skills;
  }

  function wireSkillPicker(container) {
    var sel = container.querySelector('.js-levelup-skill-select');
    if (sel) {
      sel.addEventListener('change', function() {
        choices.skill = sel.value || undefined;
        rerenderSkillSection(container);
        updateConfirmButton();
      });
    }
    var clearBtn = container.querySelector('.skill-chip-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        choices.skill = undefined;
        rerenderSkillSection(container);
        updateConfirmButton();
      });
    }
  }

  function rerenderSkillSection(container) {
    var section = container.querySelector('#skill-choices');
    if (!section) return;
    var existingSkills = getExistingSkills(currentChar);
    var available = DS.Data.AllSkills.filter(function(s) {
      return existingSkills.indexOf(s) === -1;
    });

    var html = '';
    if (choices.skill) {
      html = '<span class="choice-pill selected js-levelup-skill-filled">'
        + DS.Renderer.esc(choices.skill)
        + ' <span class="skill-chip-clear">&times;</span></span>';
    } else {
      html = '<select class="choice-pill choice-pill-empty js-levelup-skill-select">';
      html += '<option value="">+ Choose skill</option>';
      available.forEach(function(s) {
        html += '<option value="' + DS.Renderer.esc(s) + '">' + DS.Renderer.esc(s) + '</option>';
      });
      html += '</select>';
    }

    section.innerHTML = html;
    wireSkillPicker(container);
  }

  // --- Heroic Ability Picker ---
  function renderHeroicAbilitySection(char, classData, cost) {
    var abilities = classData.heroicAbilities[cost] || [];
    var existing = getAllChosenHeroicAbilities(char);

    if (abilities.length === 0) {
      // Auto-save a deferred placeholder so this doesn't block level-up
      choices.heroicAbility = { cost: cost, name: null };
      return '<div class="levelup-section">' +
        '<h4>' + cost + '-cost Heroic Ability</h4>' +
        '<div class="levelup-notice">' +
          '<p class="text-dim">No ' + cost + '-cost heroic abilities have been added to the data yet. ' +
          'This choice will be skipped for now — you can select one later when the data becomes available.</p>' +
        '</div></div>';
    }

    requiredChoices.push('heroicAbility');
    var html = '<div class="levelup-section">' +
      '<h4>Choose a ' + cost + '-cost Heroic Ability</h4>' +
      '<div id="heroic-grid">';
    abilities.forEach(function(a) {
      if (existing.indexOf(a.name) !== -1) return;
      html += '<div class="heroic-option" data-name="' + DS.Renderer.esc(a.name) + '" data-cost="' + cost + '">' +
        '<div id="heroic-card-' + a.name.replace(/[^a-zA-Z0-9]/g, '_') + '"></div>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function getAllChosenHeroicAbilities(char) {
    var names = [];
    var ha = char.class.heroicAbilities || {};
    Object.keys(ha).forEach(function(cost) {
      (ha[cost] || []).forEach(function(name) { names.push(name); });
    });
    var lc = char.class.levelChoices || {};
    Object.keys(lc).forEach(function(lvl) {
      if (lc[lvl].heroicAbility && lc[lvl].heroicAbility.name) {
        names.push(lc[lvl].heroicAbility.name);
      }
    });
    return names;
  }

  function wireHeroicAbilityPicker(container, char, classData, cost) {
    if (!cost) return;
    var abilities = classData.heroicAbilities[cost] || [];

    // Render ability cards into their slots
    abilities.forEach(function(a) {
      var slot = container.querySelector('#heroic-card-' + a.name.replace(/[^a-zA-Z0-9]/g, '_'));
      if (slot) {
        slot.appendChild(DS.Renderer.renderAbilityCard(a));
      }
    });

    container.querySelectorAll('.heroic-option').forEach(function(card) {
      card.addEventListener('click', function() {
        container.querySelectorAll('.heroic-option').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        choices.heroicAbility = { cost: parseInt(card.dataset.cost), name: card.dataset.name };
        updateConfirmButton();
      });
    });
  }

  // --- Pre-selections (for editing existing level-ups) ---
  function applyPreselections(container, preselect) {
    if (preselect.charBump) {
      var bumpPill = container.querySelector('.charbump-pill[data-stat="' + preselect.charBump + '"]');
      if (bumpPill && !bumpPill.disabled) {
        bumpPill.classList.add('selected');
        choices.charBump = preselect.charBump;
      }
    }
    if (preselect.perk) {
      var perkCard = container.querySelector('.perk-option[data-perk="' + preselect.perk + '"]');
      if (perkCard) {
        perkCard.classList.add('selected');
        choices.perk = preselect.perk;
      }
    }
    if (preselect.skill) {
      choices.skill = preselect.skill;
      rerenderSkillSection(container);
    }
    if (preselect.heroicAbility && preselect.heroicAbility.name) {
      var heroCard = container.querySelector('.heroic-option[data-name="' + preselect.heroicAbility.name + '"]');
      if (heroCard) {
        heroCard.classList.add('selected');
        choices.heroicAbility = { cost: preselect.heroicAbility.cost, name: preselect.heroicAbility.name };
      }
    }
  }

  // --- Confirm ---
  function updateConfirmButton() {
    var btn = document.getElementById('btn-levelup-confirm');
    if (!btn) return;
    var allMade = requiredChoices.every(function(key) {
      return choices[key] !== undefined && choices[key] !== null;
    });
    btn.disabled = !allMade;
  }

  function confirm(char, nextLevel, classData, options) {
    options = options || {};

    if (!char.class.levelChoices) char.class.levelChoices = {};
    char.class.levelChoices[nextLevel] = JSON.parse(JSON.stringify(choices));

    if (!options.skipLevelChange) {
      char.level = nextLevel;
    }

    // Apply characteristic bumps
    var advancement = classData.advancement[nextLevel];
    if (advancement && advancement.charBumps) {
      var bumps = advancement.charBumps;
      if (bumps.auto) {
        Object.keys(bumps.auto).forEach(function(stat) {
          var current = char.class.characteristics[stat] || 0;
          var newVal = current + bumps.auto[stat];
          if (newVal > bumps.max) newVal = bumps.max;
          char.class.characteristics[stat] = newVal;
        });
      }
      if (bumps.choose && choices.charBump) {
        var current = char.class.characteristics[choices.charBump] || 0;
        var newVal = current + 1;
        if (newVal > bumps.max) newVal = bumps.max;
        char.class.characteristics[choices.charBump] = newVal;
      }
    }

    // Add heroic ability
    if (choices.heroicAbility && choices.heroicAbility.name) {
      var cost = choices.heroicAbility.cost;
      if (!char.class.heroicAbilities[cost]) char.class.heroicAbilities[cost] = [];
      char.class.heroicAbilities[cost].push(choices.heroicAbility.name);
    }

    DS.State.set(char);
    DS.Storage.save(char);

    if (options.onComplete) {
      options.onComplete();
    } else if (char.finished) {
      DS.App.showCharacterSheet(char.id);
    } else {
      DS.App.showHome();
    }
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  return {
    render: render,
    confirm: confirm
  };
})();
