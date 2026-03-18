// DS.Steps.Summary - Step 8: Full character sheet view
DS.Steps = DS.Steps || {};
DS.Steps.Summary = (function() {

  function render(container) {
    var char = DS.State.getRef();
    var computed = char.computed || {};
    var cls = char.class.id ? DS.Data.Classes[char.class.id] : null;
    var ancestry = char.ancestry.id ? DS.Data.Ancestries.find(function(a) { return a.id === char.ancestry.id; }) : null;
    var kit = char.kit.id ? DS.Data.Kits.find(function(k) { return k.id === char.kit.id; }) : null;
    var career = char.career.id ? DS.Data.Careers.find(function(c) { return c.id === char.career.id; }) : null;
    var complication = char.complication.id ? DS.Data.Complications.find(function(c) { return c.id === char.complication.id; }) : null;
    var esc = DS.Renderer.esc;

    var name = char.details.heroName || 'Unnamed Hero';
    var charSkills = computed.skills || [];

    // Detect special kit modes
    var isFieldArsenal = char.class.id === 'tactician' && char.class.levelChoices && char.class.levelChoices.fieldArsenalKits && char.class.levelChoices.fieldArsenalKits.length === 2;
    var isStormwight = char.class.id === 'fury' && char.class.subclass === 'stormwight';
    var beastKit = null;
    if (isStormwight && char.class.levelChoices && char.class.levelChoices.beastFormKit) {
      beastKit = DS.Data.BeastKits.find(function(bk) { return bk.id === char.class.levelChoices.beastFormKit; });
    }

    // Step 5: Resolve subclass display name(s) and description(s) — Conduit shows both domains
    var subclassName = '';
    var subclassDesc = '';
    var isConduitDual = char.class.id === 'conduit' && char.class.levelChoices && char.class.levelChoices.domains && char.class.levelChoices.domains.length === 2;
    if (isConduitDual && cls) {
      var domainNames = [];
      var domainDescs = [];
      char.class.levelChoices.domains.forEach(function(domId) {
        var domObj = cls.subclasses.find(function(s) { return s.id === domId; });
        if (domObj) {
          domainNames.push(domObj.name);
          if (domObj.description) domainDescs.push(domObj.name + ': ' + domObj.description);
        }
      });
      subclassName = domainNames.join(' & ');
      subclassDesc = domainDescs.join('\n\n');
    } else if (cls && char.class.subclass) {
      var subObj = cls.subclasses.find(function(s) { return s.id === char.class.subclass; });
      subclassName = subObj ? subObj.name : titleCase(char.class.subclass.replace(/_/g, ' '));
      subclassDesc = subObj && subObj.description ? subObj.description : '';
    }

    var html = '<div class="sheet-wrapper">';

    // Build TOC entries based on what will actually render
    var tocEntries = [];
    tocEntries.push({ id: 'section-combat', label: 'Combat & Equipment' });
    tocEntries.push({ id: 'section-culture', label: 'Culture / Career' });
    if (ancestry) tocEntries.push({ id: 'section-ancestry', label: 'Ancestry' });
    tocEntries.push({ id: 'section-skills', label: 'Skills' });

    // Check perks
    var hasPerksToc = false;
    if (career && career.perk) {
      var cpCheck = DS.Data.PerksList.find(function(p) { return p.id === career.perk || p.name === career.perk; });
      if (cpCheck) hasPerksToc = true;
    }
    if (!hasPerksToc) {
      var lcPerkCheck = char.class.levelChoices || {};
      Object.keys(lcPerkCheck).forEach(function(lvl) {
        if (lcPerkCheck[lvl].perk) hasPerksToc = true;
      });
    }
    if (hasPerksToc) tocEntries.push({ id: 'section-perks', label: 'Perks' });

    // Check advancement features
    if (cls && cls.advancement) {
      var hasAdvFeatures = false;
      for (var tocLvl = 2; tocLvl <= char.level; tocLvl++) {
        var tocAdv = cls.advancement[tocLvl];
        if (!tocAdv || !tocAdv.features) continue;
        tocAdv.features.forEach(function(fName) {
          if (/^Perk(\s*\(|$)/.test(fName) || fName === 'Skill' || /^Characteristic/.test(fName)) return;
          if (/^\d+-cost Heroic Ability$/.test(fName) || /^\d+-\w+ Ability$/.test(fName) || /Ability\s*\(\d+/.test(fName)) return;
          if (findFeatureDesc(cls, char, fName)) hasAdvFeatures = true;
        });
      }
      if (hasAdvFeatures) tocEntries.push({ id: 'section-features', label: 'Features' });
    }

    if (cls && cls.classFeatures && cls.classFeatures.core && cls.classFeatures.core.length) {
      tocEntries.push({ id: 'section-class-features', label: 'Class Features' });
    }
    if (isStormwight && beastKit) {
      tocEntries.push({ id: 'section-beast-form', label: 'Beast Form' });
    }
    tocEntries.push({ id: 'section-abilities', label: 'Abilities' });
    tocEntries.push({ id: 'section-maneuvers', label: 'Maneuvers' });

    var levelChoicesCheck = char.class.levelChoices || {};
    var levelKeysCheck = Object.keys(levelChoicesCheck).filter(function(k) { return Number(k) <= char.level; });
    if (levelKeysCheck.length > 0) tocEntries.push({ id: 'section-levelup-history', label: 'Level-Up History' });
    if (char.details.appearance) tocEntries.push({ id: 'section-appearance', label: 'Appearance' });
    if (char.details.personality) tocEntries.push({ id: 'section-personality', label: 'Personality' });
    if (char.details.backstory) tocEntries.push({ id: 'section-backstory', label: 'Backstory' });

    // Render TOC sidebar
    var tocCollapsed = localStorage.getItem('drawsteel_toc_collapsed') === 'true';
    html += '<div class="sheet-toc' + (tocCollapsed ? ' collapsed' : '') + '" id="sheet-toc">' +
      '<button class="sheet-toc-toggle" id="toc-toggle" title="Toggle navigation">&#9776;</button>' +
      '<div class="sheet-toc-body" id="toc-body">' +
        '<div class="sheet-toc-title">Contents</div>';
    tocEntries.forEach(function(entry) {
      html += '<a class="sheet-toc-link" href="#' + entry.id + '" data-target="' + entry.id + '">' + esc(entry.label) + '</a>';
    });
    html += '</div></div>';

    html += '<div class="sheet">';

    // === HEADER ===
    var portraitHTML = char.details.portrait
      ? '<div class="summary-portrait"><img src="' + esc(char.details.portrait) + '" alt="Portrait"></div>'
      : '';

    html += '<div class="sheet-header">' +
      '<div class="sheet-header-left">' +
        portraitHTML +
        '<div class="sheet-header-info">' +
          '<h2>' + esc(name) + '</h2>' +
          '<div class="sheet-header-sub">' +
            (ancestry ? esc(ancestry.name) : '') +
          '</div>' +
          '<div class="sheet-header-tags">' +
            (cls ? '<span class="sheet-tag sheet-tag-class sheet-tag-clickable" id="class-chip">&#9876; ' + esc(cls.name) + '</span>' : '') +
            (subclassName ? '<span class="sheet-tag sheet-tag-subclass sheet-tag-clickable" id="subclass-chip">&#9733; ' + esc(subclassName) + '</span>' : '') +
            (cls ? '<span class="sheet-tag sheet-tag-resource' + (cls.heroicResourceDescription ? ' sheet-tag-clickable' : '') + '"' + (cls.heroicResourceDescription ? ' id="resource-chip"' : '') + '>&#9889; ' + esc(cls.heroicResource) + '</span>' : '') +
          '</div>' +
          '<div class="sheet-chip-body" id="chip-body" style="display:none"></div>' +
        '</div>' +
      '</div>' +
      '<div class="sheet-header-right">';

    var inSheetMode = document.getElementById('wizard-screen').classList.contains('sheet-mode');
    var inEditMode = char.finished && !inSheetMode;

    if (inEditMode) {
      // Level dropdown in edit mode
      html += '<select class="sheet-level-select" id="summary-level-select">';
      for (var lvl = 1; lvl <= 10; lvl++) {
        html += '<option value="' + lvl + '"' + (lvl === char.level ? ' selected' : '') + '>Level ' + lvl + '</option>';
      }
      html += '</select>';
    } else {
      html += '<span class="sheet-level-badge">Level ' + char.level + '</span>';
    }

    var isOwner = !DS.Player || DS.Player.isOwner(char);
    html += (inSheetMode && char.finished && isOwner ? '<button class="btn btn-secondary btn-sm" id="summary-edit">&#9998; Edit Character</button>' : '') +
        (inSheetMode && char.class.id && char.level < 10 && isOwner ? '<button class="btn btn-primary btn-sm" id="summary-levelup">Level Up</button>' : '') +
        '<button class="btn btn-secondary btn-sm" id="summary-export">Export JSON</button>' +
      '</div>' +
    '</div>';

    // === CHARACTERISTICS ===
    html += DS.Renderer.renderStatBlock(char.class.characteristics || {});

    // === COMBAT STATS + KIT PANEL ===
    html += '<div class="sheet-section" id="section-combat">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#9876;</span> Combat Stats &amp; Equipment</div>' +
      '<div class="sheet-combat">' +
        // Left: Stamina & Defenses
        '<div class="sheet-combat-left">' +
          '<div class="sheet-stat-grid">' +
            sheetStat('Stamina', computed.stamina || 0) +
            sheetStat('Winded', computed.winded || 0) +
            sheetStat('Recovery Value', computed.recoveryValue || 0) +
            sheetStat('Recoveries', computed.recoveries || 0) +
          '</div>' +
          '<div class="sheet-stat-grid">' +
            sheetStat('Size', computed.size || 'M') +
            sheetStat('Speed', computed.speed || 5) +
            sheetStat('Stability', computed.stability || 0) +
          '</div>' +
        '</div>' +
        // Right: Kit / Equipment
        '<div class="sheet-combat-right">';

    // Step 2: Tactician Field Arsenal — render both kits
    if (isFieldArsenal) {
      html += renderFieldArsenalKits(char.class.levelChoices.fieldArsenalKits, esc);
    // Step 3: Stormwight Beast Kit — render beast kit panel
    } else if (isStormwight && beastKit) {
      html += renderBeastKitPanel(beastKit, esc);
    } else if (kit) {
      html += renderSingleKit(kit, esc);
    } else {
      html += '<div class="sheet-kit"><div class="sheet-kit-name" style="color:var(--color-text-dim)">No Kit Selected</div></div>';
    }

    html += '</div></div></div>';

    // === CULTURE / CAREER / COMPLICATION (3-column) ===
    html += '<div class="sheet-columns-3" id="section-culture">';

    // Culture
    html += '<div class="sheet-section">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#127760;</span> Culture</div>' +
      (char.culture.environment ? '<div class="text-sm"><strong>Environment:</strong> ' + esc(capitalize(char.culture.environment)) + '</div>' : '') +
      (char.culture.organization ? '<div class="text-sm"><strong>Organization:</strong> ' + esc(capitalize(char.culture.organization)) + '</div>' : '') +
      (char.culture.upbringing ? '<div class="text-sm"><strong>Upbringing:</strong> ' + esc(capitalize(char.culture.upbringing)) + '</div>' : '') +
      (computed.languages && computed.languages.length ? '<div class="text-sm"><strong>Languages:</strong> ' + computed.languages.map(esc).join(', ') + '</div>' : '') +
    '</div>';

    // Career
    html += '<div class="sheet-section">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#128188;</span> Career</div>';
    if (career) {
      html += '<div class="text-sm"><strong>' + esc(career.name) + '</strong></div>' +
        '<div class="text-sm text-dim">' + esc(career.description) + '</div>';
    } else {
      html += '<div class="text-sm text-dim">No career selected</div>';
    }
    html += '</div>';

    // Complication
    html += '<div class="sheet-section">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#9888;</span> Complication</div>';
    if (complication) {
      html += '<div class="text-sm"><strong>' + esc(complication.name) + '</strong></div>' +
        '<div class="text-sm mt-1"><strong class="text-primary">Benefit:</strong> ' + DS.Renderer.formatText(complication.benefit) + '</div>' +
        '<div class="text-sm mt-1"><strong style="color:var(--color-danger)">Drawback:</strong> ' + DS.Renderer.formatText(complication.drawback) + '</div>';
    } else {
      html += '<div class="text-sm text-dim">No complication selected</div>';
    }
    html += '</div>';

    html += '</div>'; // end sheet-columns-3

    // === ANCESTRY TRAITS ===
    if (ancestry) {
      html += '<div class="sheet-section" id="section-ancestry">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128065;</span> Ancestry: ' + esc(ancestry.name) + '</div>' +
        '<div class="text-sm"><strong>Signature Trait:</strong> ' + esc(ancestry.signatureTrait.name) + ' &mdash; ' + esc(ancestry.signatureTrait.description) + '</div>';
      if (char.ancestry.purchasedTraits && char.ancestry.purchasedTraits.length) {
        html += '<div style="margin-top:0.5rem">';
        char.ancestry.purchasedTraits.forEach(function(pt) {
          var trait = ancestry.purchasedTraits.find(function(t) { return t.id === pt.id; });
          if (trait) {
            html += '<div class="text-sm" style="padding:0.15rem 0">&bull; <strong>' + esc(trait.name) + ':</strong> ' + esc(trait.description) + '</div>';
          }
        });
        html += '</div>';
      }
      html += '</div>';
    }

    // === SKILLS BY CATEGORY ===
    html += '<div class="sheet-section" id="section-skills">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#9733;</span> Skills</div>' +
      '<label class="sheet-skill-filter"><input type="checkbox" id="skills-trained-only" checked> Show trained only</label>' +
      '<div class="sheet-skills trained-only" id="skills-grid">';

    var categories = ['crafting', 'exploration', 'interpersonal', 'intrigue', 'lore'];
    categories.forEach(function(cat) {
      var skills = DS.Data.Skills[cat] || [];
      html += '<div class="sheet-skill-group">' +
        '<h5>' + capitalize(cat) + '</h5>' +
        '<div class="sheet-skill-list">';
      skills.forEach(function(skill) {
        var has = charSkills.indexOf(skill) !== -1;
        html += '<div class="sheet-skill-item' + (has ? ' has-skill' : '') + '">' +
          '<span class="skill-dot"></span>' +
          esc(skill) +
        '</div>';
      });
      html += '</div></div>';
    });

    html += '</div></div>';

    // === PERKS ===
    var allPerkData = [];
    if (career && career.perk) {
      var careerPerkObj = DS.Data.PerksList.find(function(p) { return p.id === career.perk || p.name === career.perk; });
      if (careerPerkObj) allPerkData.push(careerPerkObj);
    }
    var lcPerks = char.class.levelChoices || {};
    Object.keys(lcPerks).forEach(function(lvl) {
      if (lcPerks[lvl].perk) {
        var pd = DS.Data.PerksList.find(function(p) { return p.id === lcPerks[lvl].perk; });
        if (pd && !allPerkData.some(function(existing) { return existing.id === pd.id; })) {
          allPerkData.push(pd);
        }
      }
    });
    if (allPerkData.length > 0) {
      html += '<div class="sheet-section" id="section-perks">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#127942;</span> Perks</div>' +
        '<div class="sheet-abilities">';
      allPerkData.forEach(function(p) {
        html += '<div class="ability-card">' +
          '<div class="ability-header">' +
            '<span class="ability-name">' + esc(p.name) + '</span>' +
            '<span class="ability-cost">' + esc(capitalize(p.type)) + '</span>' +
          '</div>' +
          '<div class="ability-effect">' + esc(p.description) + '</div>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // === ADVANCEMENT FEATURES ===
    if (cls && cls.advancement) {
      var advFeatureList = [];
      for (var fl = 2; fl <= char.level; fl++) {
        var adv = cls.advancement[fl];
        if (!adv || !adv.features) continue;
        adv.features.forEach(function(fName) {
          if (/^Perk(\s*\(|$)/.test(fName) || fName === 'Skill' || /^Characteristic/.test(fName)) return;
          if (/^\d+-cost Heroic Ability$/.test(fName) || /^\d+-\w+ Ability$/.test(fName) || /Ability\s*\(\d+/.test(fName)) return;
          var fDesc = findFeatureDesc(cls, char, fName);
          if (fDesc) {
            advFeatureList.push({ name: fName, description: fDesc, level: fl });
          }
        });
      }
      if (advFeatureList.length > 0) {
        html += '<div class="sheet-section" id="section-features">' +
          '<div class="sheet-section-title"><span class="sheet-section-icon">&#9881;</span> Features</div>';
        advFeatureList.forEach(function(f) {
          html += renderFeatureCard(f, esc);
        });
        html += '</div>';
      }
    }

    // === Step 4: CLASS FEATURES ===
    if (cls && cls.classFeatures) {
      html += renderClassFeatures(cls, char, esc);
    }

    // === Step 3 (cont): BEAST FORM DETAILS (forms, primordial storm, growing ferocity) ===
    if (isStormwight && beastKit) {
      html += renderBeastKitDetails(beastKit, esc);
    }

    // === ABILITIES ===
    html += '<div class="sheet-section" id="section-abilities">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#9889;</span> Abilities</div>' +
      '<div class="sheet-abilities">';

    if (cls) {
      (char.class.signatureAbilities || []).forEach(function(name) {
        var ability = cls.signatureAbilities.find(function(a) { return a.name === name; });
        if (ability) {
          html += '<div id="summary-sig-' + name.replace(/\s/g, '_') + '"></div>';
        }
      });
      [3, 5, 7, 9, 11].forEach(function(cost) {
        (char.class.heroicAbilities[cost] || []).forEach(function(name) {
          var ability = (cls.heroicAbilities[cost] || []).find(function(a) { return a.name === name; });
          if (ability) {
            html += '<div id="summary-h' + cost + '-' + name.replace(/\s/g, '_') + '"></div>';
          }
        });
      });
    }

    // Kit signature abilities — Field Arsenal shows both, beast kit shows beast sig, standard shows one
    if (isFieldArsenal) {
      char.class.levelChoices.fieldArsenalKits.forEach(function(kitId, idx) {
        var faKit = DS.Data.Kits.find(function(k) { return k.id === kitId; });
        if (faKit && faKit.signatureAbility) {
          html += '<div id="summary-fa-kit-sig-' + idx + '"></div>';
        }
      });
    } else if (isStormwight && beastKit && beastKit.signatureAbility) {
      html += '<div id="summary-beast-kit-sig"></div>';
    } else if (kit && kit.signatureAbility) {
      html += '<div id="summary-kit-sig"></div>';
    }

    html += '</div></div>';

    // === MANEUVERS ===
    html += '<div class="sheet-section" id="section-maneuvers">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#128074;</span> Maneuvers</div>' +
      '<p class="text-sm text-dim mb-1">Any creature can take the following maneuvers on their turn, in addition to those listed in their stats.</p>' +
      '<div class="sheet-maneuvers-basic">' +
        maneuverEntry('Aid Attack', 'Choose an adjacent enemy. The next ability power roll an ally makes against them before the start of your next turn has an edge.') +
        maneuverEntry('Catch Breath', 'Spend a Recovery.') +
        maneuverEntry('Escape Grab', 'You use the Escape Grab ability while grabbed.') +
        maneuverEntry('Grab', 'You use the Grab ability.') +
        maneuverEntry('Hide', 'You become hidden from creatures who aren\'t observing you while you have cover or concealment from them.') +
        maneuverEntry('Knockback', 'You use the Knockback ability.') +
        maneuverEntry('Stand Up', 'You stand up from prone, ending that condition. Alternatively, you can use this maneuver to make an adjacent prone creature stand up.') +
      '</div>' +
      '<div class="sheet-abilities" id="summary-maneuver-blocks"></div>' +
    '</div>';

    // === LEVEL-UP HISTORY ===
    var levelChoices = char.class.levelChoices || {};
    var levelKeys = Object.keys(levelChoices)
      .filter(function(k) { return Number(k) <= char.level; })
      .sort(function(a, b) { return Number(a) - Number(b); });
    if (levelKeys.length > 0) {
      html += '<div class="sheet-section" id="section-levelup-history">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128200;</span> Level-Up History</div>';
      levelKeys.forEach(function(lvl) {
        var lc = levelChoices[lvl];
        html += '<div class="levelup-history-entry">' +
          '<div class="flex-between"><h5>Level ' + esc(lvl) + '</h5>' +
          (inEditMode && isOwner ? '<button class="btn btn-secondary btn-sm levelup-edit-btn" data-level="' + esc(lvl) + '">&#9998; Edit</button>' : '') +
          '</div>';
        if (lc.charBump) {
          html += '<div class="text-sm">&bull; Characteristic: +1 ' + esc(capitalize(lc.charBump)) + '</div>';
        }
        if (lc.perk) {
          var perkData = DS.Data.PerksList.find(function(p) { return p.id === lc.perk; });
          html += '<div class="text-sm">&bull; Perk: <strong>' + esc(perkData ? perkData.name : lc.perk) + '</strong>' +
            (perkData && perkData.description ? ' &mdash; ' + esc(perkData.description) : '') + '</div>';
        }
        if (lc.skill) {
          html += '<div class="text-sm">&bull; Skill: ' + esc(lc.skill) + '</div>';
        }
        if (lc.heroicAbility && lc.heroicAbility.name) {
          html += '<div class="text-sm">&bull; Heroic Ability:</div>' +
            '<div id="summary-lh-ability-' + esc(lvl) + '"></div>';
        }
        // Show features gained at this level (from advancement table)
        if (cls && cls.advancement && cls.advancement[Number(lvl)]) {
          var advFeatures = cls.advancement[Number(lvl)].features || [];
          advFeatures.forEach(function(fName) {
            // Skip entries already shown as choices (Perk, Skill, abilities, characteristics)
            if (/^Perk(\s*\(|$)/.test(fName) || fName === 'Skill' || /^Characteristic/.test(fName)) return;
            if (/^\d+-cost Heroic Ability$/.test(fName) || /^\d+-\w+ Ability$/.test(fName) || /Ability\s*\(\d+/.test(fName)) return;
            var fDesc = findFeatureDesc(cls, char, fName);
            if (fDesc) {
              html += '<div class="text-sm">&bull; Feature: <strong>' + esc(fName) + '</strong></div>';
            }
          });
        }
        html += '</div>';
      });
      html += '</div>';
    }

    // === APPEARANCE ===
    if (char.details.appearance) {
      html += '<div class="sheet-section" id="section-appearance">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128100;</span> Appearance</div>' +
        '<p class="text-sm">' + esc(char.details.appearance) + '</p>' +
      '</div>';
    }

    // === PERSONALITY ===
    if (char.details.personality) {
      html += '<div class="sheet-section" id="section-personality">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128172;</span> Personality</div>' +
        '<p class="text-sm">' + esc(char.details.personality) + '</p>' +
      '</div>';
    }

    // === BACKSTORY ===
    if (char.details.backstory) {
      html += '<div class="sheet-section" id="section-backstory">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128214;</span> Backstory</div>' +
        '<p class="text-sm">' + esc(char.details.backstory) + '</p>' +
      '</div>';
    }

    html += '</div>'; // end .sheet
    html += '</div>'; // end .sheet-wrapper

    container.innerHTML = html;

    // Render ability cards into their slots
    if (cls) {
      (char.class.signatureAbilities || []).forEach(function(name) {
        var ability = cls.signatureAbilities.find(function(a) { return a.name === name; });
        var slot = document.getElementById('summary-sig-' + name.replace(/\s/g, '_'));
        if (ability && slot) slot.appendChild(DS.Renderer.renderAbilityCard(ability));
      });
      [3, 5, 7, 9, 11].forEach(function(cost) {
        (char.class.heroicAbilities[cost] || []).forEach(function(name) {
          var ability = (cls.heroicAbilities[cost] || []).find(function(a) { return a.name === name; });
          var slot = document.getElementById('summary-h' + cost + '-' + name.replace(/\s/g, '_'));
          if (ability && slot) slot.appendChild(DS.Renderer.renderAbilityCard(ability));
        });
      });

      // Render ability cards in level-up history
      levelKeys.forEach(function(lvl) {
        var lc = levelChoices[lvl];
        if (lc.heroicAbility && lc.heroicAbility.name) {
          var slot = document.getElementById('summary-lh-ability-' + lvl);
          if (slot) {
            var cost = lc.heroicAbility.cost;
            var ability = (cls.heroicAbilities[cost] || []).find(function(a) { return a.name === lc.heroicAbility.name; });
            if (ability) slot.appendChild(DS.Renderer.renderAbilityCard(ability));
          }
        }
      });
    }

    // Render kit signature ability cards
    if (isFieldArsenal) {
      char.class.levelChoices.fieldArsenalKits.forEach(function(kitId, idx) {
        var faKit = DS.Data.Kits.find(function(k) { return k.id === kitId; });
        var slot = document.getElementById('summary-fa-kit-sig-' + idx);
        if (faKit && faKit.signatureAbility && slot) {
          slot.appendChild(DS.Renderer.renderAbilityCard(faKit.signatureAbility));
        }
      });
    } else if (isStormwight && beastKit && beastKit.signatureAbility) {
      var beastSigSlot = document.getElementById('summary-beast-kit-sig');
      if (beastSigSlot) beastSigSlot.appendChild(DS.Renderer.renderAbilityCard(beastKit.signatureAbility));
    } else if (kit && kit.signatureAbility) {
      var kitSlot = document.getElementById('summary-kit-sig');
      if (kitSlot) kitSlot.appendChild(DS.Renderer.renderAbilityCard(kit.signatureAbility));
    }

    // Render maneuver stat blocks
    var maneuverContainer = document.getElementById('summary-maneuver-blocks');
    if (maneuverContainer) {
      var maneuverAbilities = [
        {
          name: 'Escape Grab',
          type: 'Maneuver',
          distance: 'Self',
          target: 'Self',
          powerRoll: {
            characteristic: 'Might or Agility',
            t1: 'No effect.',
            t2: 'You can escape the grab, but if you do, a creature who has you grabbed can make a melee free strike against you before you are no longer grabbed.',
            t3: 'You are no longer grabbed.'
          },
          effect: 'You take a bane on this maneuver if your size is smaller than the size of the creature, object, or effect that has you grabbed.'
        },
        {
          name: 'Grab',
          keywords: ['Melee', 'Weapon'],
          type: 'Maneuver',
          distance: 'Melee 1',
          target: 'One creature',
          powerRoll: {
            characteristic: 'Might',
            t1: 'No effect.',
            t2: 'You can grab the target, but if you do, the target can make a melee free strike against you before they are grabbed.',
            t3: 'The target is grabbed by you.'
          },
          effect: 'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score. A creature can grab only one creature at a time.'
        },
        {
          name: 'Knockback',
          keywords: ['Melee', 'Weapon'],
          type: 'Maneuver',
          distance: 'Melee 1',
          target: 'One creature',
          powerRoll: {
            characteristic: 'Might',
            t1: 'Push 1.',
            t2: 'Push 2.',
            t3: 'Push 3.'
          },
          effect: 'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score.'
        }
      ];
      maneuverAbilities.forEach(function(m) {
        maneuverContainer.appendChild(DS.Renderer.renderAbilityCard(m));
      });
    }

    // Wire clickable header chips — all share one expandable body
    var chipBody = document.getElementById('chip-body');
    if (chipBody) {
      var chipDescriptions = {
        'class-chip': cls && cls.description ? cls.description : '',
        'subclass-chip': subclassDesc,
        'resource-chip': cls && cls.heroicResourceDescription ? cls.heroicResourceDescription : ''
      };
      var activeChipId = null;
      Object.keys(chipDescriptions).forEach(function(chipId) {
        var chip = document.getElementById(chipId);
        if (!chip || !chipDescriptions[chipId]) return;
        chip.addEventListener('click', function() {
          if (activeChipId === chipId) {
            // Toggle off
            chipBody.style.display = 'none';
            chip.classList.remove('sheet-tag-active');
            activeChipId = null;
          } else {
            // Deactivate previous
            if (activeChipId) {
              var prev = document.getElementById(activeChipId);
              if (prev) prev.classList.remove('sheet-tag-active');
            }
            // Activate this one
            chipBody.innerHTML = '<p class="text-sm">' + esc(chipDescriptions[chipId]) + '</p>';
            chipBody.style.display = 'block';
            chip.classList.add('sheet-tag-active');
            activeChipId = chipId;
          }
        });
      });
    }

    // Wire skills filter checkbox
    var trainedCheckbox = document.getElementById('skills-trained-only');
    if (trainedCheckbox) {
      function applySkillFilter() {
        var skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid) return;
        var groups = skillsGrid.querySelectorAll('.sheet-skill-group');
        if (trainedCheckbox.checked) {
          skillsGrid.classList.add('trained-only');
          for (var i = 0; i < groups.length; i++) {
            var hasTrained = groups[i].querySelector('.sheet-skill-item.has-skill');
            groups[i].style.display = hasTrained ? '' : 'none';
          }
        } else {
          skillsGrid.classList.remove('trained-only');
          for (var j = 0; j < groups.length; j++) {
            groups[j].style.display = '';
          }
        }
      }
      trainedCheckbox.addEventListener('change', applySkillFilter);
      applySkillFilter();
    }

    // Wire level dropdown in edit mode
    var levelSelect = document.getElementById('summary-level-select');
    if (levelSelect) {
      levelSelect.addEventListener('change', function() {
        DS.State.update('level', Number(levelSelect.value));
        DS.Storage.autosave();
        render(container);
      });
    }

    // Wire edit button (sheet mode only)
    var editBtn = document.getElementById('summary-edit');
    if (editBtn) {
      editBtn.addEventListener('click', function() {
        DS.App.enterEditMode();
      });
    }

    // Wire per-level edit buttons (edit mode only)
    container.querySelectorAll('.levelup-edit-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var level = Number(btn.dataset.level);
        DS.App.editLevelUp(level);
      });
    });

    // Wire export button
    document.getElementById('summary-export').addEventListener('click', function() {
      DS.Storage.exportJSON(DS.State.get());
    });

    // Wire level up button
    var levelUpBtn = document.getElementById('summary-levelup');
    if (levelUpBtn) {
      levelUpBtn.addEventListener('click', function() {
        var c = DS.State.getRef();
        if (c && c.id) {
          DS.Storage.save(DS.State.get());
          DS.App.showLevelUp(c.id);
        }
      });
    }

    // Wire TOC toggle
    var tocToggle = document.getElementById('toc-toggle');
    var tocEl = document.getElementById('sheet-toc');
    if (tocToggle && tocEl) {
      tocToggle.addEventListener('click', function() {
        tocEl.classList.toggle('collapsed');
        localStorage.setItem('drawsteel_toc_collapsed', tocEl.classList.contains('collapsed') ? 'true' : 'false');
      });
    }

    // Wire TOC link clicks — smooth scroll
    var tocLinks = container.querySelectorAll('.sheet-toc-link');
    var scrollContainer = container.closest('.wizard-content') || container;
    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = link.getAttribute('data-target');
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          var containerRect = scrollContainer.getBoundingClientRect();
          var targetRect = targetEl.getBoundingClientRect();
          var offset = targetRect.top - containerRect.top + scrollContainer.scrollTop;
          scrollContainer.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });

    // Scroll spy — highlight active TOC link
    if (tocLinks.length > 0) {
      var spyTimer = null;
      function updateActiveTocLink() {
        var best = null;
        var bestDist = Infinity;
        var containerTop = scrollContainer.getBoundingClientRect().top;
        tocEntries.forEach(function(entry) {
          var el = document.getElementById(entry.id);
          if (!el) return;
          var dist = el.getBoundingClientRect().top - containerTop;
          if (dist <= 60 && Math.abs(dist) < bestDist) {
            bestDist = Math.abs(dist);
            best = entry.id;
          }
        });
        // If nothing is above threshold, pick the first visible one
        if (!best && tocEntries.length) {
          tocEntries.forEach(function(entry) {
            if (best) return;
            var el = document.getElementById(entry.id);
            if (!el) return;
            var dist = el.getBoundingClientRect().top - containerTop;
            if (dist >= 0 && dist < window.innerHeight) best = entry.id;
          });
        }
        tocLinks.forEach(function(link) {
          if (link.getAttribute('data-target') === best) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
      scrollContainer.addEventListener('scroll', function() {
        if (spyTimer) clearTimeout(spyTimer);
        spyTimer = setTimeout(updateActiveTocLink, 50);
      });
      updateActiveTocLink();
    }
  }

  // Render a single kit panel (used for standard mode)
  function renderSingleKit(kit, esc) {
    var html = '<div class="sheet-kit">' +
      '<div class="sheet-kit-name">' + esc(kit.name) + '</div>' +
      '<div class="sheet-kit-row"><span class="kit-label">Armor</span><span>' + esc(verboseArmor(kit.armor)) + '</span></div>' +
      '<div class="sheet-kit-row"><span class="kit-label">Weapon</span><span>' + esc(verboseWeapon(kit.weapon)) + '</span></div>';

    if (kit.disengage) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Disengage Bonus</span><span>+' + kit.disengage + '</span></div>';
    }
    if (kit.staminaPerEchelon) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Stamina/Echelon</span><span>+' + kit.staminaPerEchelon + '</span></div>';
    }
    if (kit.speed) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Speed Bonus</span><span>+' + kit.speed + '</span></div>';
    }
    if (kit.stability) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Stability Bonus</span><span>+' + kit.stability + '</span></div>';
    }
    // Step 1: Melee/Ranged distance bonuses
    if (kit.meleeDistance) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Melee Distance Bonus</span><span>+' + kit.meleeDistance + '</span></div>';
    }
    if (kit.rangedDistance) {
      html += '<div class="sheet-kit-row"><span class="kit-label">Ranged Distance Bonus</span><span>+' + kit.rangedDistance + '</span></div>';
    }

    // Damage tiers
    if (kit.meleeDamage || kit.rangedDamage) {
      html += renderDamageTiers(kit, esc);
    }
    html += '</div>';
    return html;
  }

  // Render damage tier grid for a kit
  function renderDamageTiers(kit, esc) {
    var html = '<div class="sheet-damage-tiers">' +
      '<span></span><span class="tier-header">&le;11</span><span class="tier-header">12-16</span><span class="tier-header">17+</span>';
    if (kit.meleeDamage) {
      var mt = parseDamageTiers(kit.meleeDamage);
      html += '<span class="tier-label">Melee</span>' +
        '<span class="tier-val">' + esc(mt[0]) + '</span>' +
        '<span class="tier-val">' + esc(mt[1]) + '</span>' +
        '<span class="tier-val">' + esc(mt[2]) + '</span>';
    }
    if (kit.rangedDamage) {
      var rt = parseDamageTiers(kit.rangedDamage);
      html += '<span class="tier-label">Ranged</span>' +
        '<span class="tier-val">' + esc(rt[0]) + '</span>' +
        '<span class="tier-val">' + esc(rt[1]) + '</span>' +
        '<span class="tier-val">' + esc(rt[2]) + '</span>';
    }
    html += '</div>';
    return html;
  }

  // Step 2: Render Tactician Field Arsenal — both kits stacked
  function renderFieldArsenalKits(kitIds, esc) {
    var html = '';
    kitIds.forEach(function(kitId, idx) {
      var kit = DS.Data.Kits.find(function(k) { return k.id === kitId; });
      if (!kit) return;
      if (idx > 0) html += '<hr style="margin:0.75rem 0;border-color:var(--color-border)">';
      html += renderSingleKit(kit, esc);
    });
    return html;
  }

  // Step 3: Render beast kit panel (bonuses + damage in the equipment area)
  function renderBeastKitPanel(bk, esc) {
    var html = '<div class="sheet-kit">' +
      '<div class="sheet-kit-name">' + esc(bk.name) + '</div>';

    var bonuses = [];
    if (bk.staminaPerEchelon) bonuses.push('Stamina +' + bk.staminaPerEchelon + ' per echelon');
    if (bk.speed) bonuses.push('Speed +' + bk.speed);
    if (bk.stability) bonuses.push('Stability +' + bk.stability);
    if (bk.disengage) bonuses.push('Disengage +' + bk.disengage);
    bonuses.forEach(function(b) {
      html += '<div class="sheet-kit-row"><span class="kit-label">' + esc(b) + '</span></div>';
    });

    if (bk.meleeDamage) {
      html += renderDamageTiers(bk, esc);
    }
    html += '</div>';
    return html;
  }

  // Step 3 (cont): Render beast kit full details (aspect benefits, forms, primordial storm, growing ferocity)
  function renderBeastKitDetails(bk, esc) {
    var html = '<div class="sheet-section" id="section-beast-form">' +
      '<div class="sheet-section-title"><span class="sheet-section-icon">&#128058;</span> Beast Form: ' + esc(bk.name) + '</div>' +
      '<p class="text-sm text-dim">' + esc(bk.description) + '</p>';

    html += '<div style="margin-top:0.75rem">' +
      '<div class="text-sm" style="padding:0.25rem 0"><strong>Aspect Benefits:</strong> ' + esc(bk.aspectBenefits) + '</div>' +
      '<div class="text-sm" style="padding:0.25rem 0"><strong>Animal Form:</strong> ' + esc(bk.animalForm) + '</div>' +
      '<div class="text-sm" style="padding:0.25rem 0"><strong>Hybrid Form:</strong> ' + esc(bk.hybridForm) + '</div>' +
      '<div class="text-sm" style="padding:0.25rem 0"><strong>Primordial Storm:</strong> ' + esc(bk.primordialStorm) + '</div>' +
    '</div>';

    // Growing Ferocity table
    if (bk.growingFerocity && bk.growingFerocity.length) {
      html += '<div style="margin-top:0.75rem"><strong class="text-sm">Growing Ferocity</strong>' +
        '<table class="sidebar-table" style="margin-top:0.25rem"><thead><tr><th>Ferocity</th><th>Benefit</th></tr></thead><tbody>';
      bk.growingFerocity.forEach(function(row) {
        html += '<tr><td>' + esc(String(row.ferocity)) + '</td><td>' + esc(row.benefit) + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    html += '</div>';
    return html;
  }

  // Step 4: Render class features section
  function renderClassFeatures(cls, char, esc) {
    var cf = cls.classFeatures;
    if (!cf) return '';
    var html = '';
    var subclass = char.class.subclass;

    // Core features
    if (cf.core && cf.core.length) {
      html += '<div class="sheet-section" id="section-class-features">' +
        '<div class="sheet-section-title"><span class="sheet-section-icon">&#128737;</span> Class Features</div>';
      cf.core.forEach(function(f) {
        html += renderFeatureCard(f, esc);
      });

      // Subclass features (inline in same section)
      if (subclass && cf.subclassFeatures && cf.subclassFeatures[subclass]) {
        var subName = '';
        if (cls.subclasses) {
          var sub = cls.subclasses.find(function(s) { return s.id === subclass; });
          if (sub) subName = sub.name;
        }
        html += '<h5 style="margin-top:0.75rem">' + esc(subName || cls.subclassLabel || 'Subclass') + ' Features</h5>';
        cf.subclassFeatures[subclass].forEach(function(f) {
          html += renderFeatureCard(f, esc);
        });
      }

      // Choice-based features (show selected option)
      if (cf.choices && cf.choices.length) {
        cf.choices.forEach(function(choice) {
          var selectedId = (char.class.levelChoices || {})[choice.key] || null;
          if (selectedId) {
            var opt = choice.options.find(function(o) { return o.id === selectedId; });
            if (opt) {
              html += '<h5 style="margin-top:0.75rem">' + esc(choice.name) + '</h5>';
              html += renderFeatureCard(opt, esc);
            }
          }
        });
      }

      html += '</div>';
    }

    return html;
  }

  // Render a feature card (matches class-features.js pattern)
  function renderFeatureCard(f, esc) {
    var tag = f.tag ? '<span class="feature-tag">' + esc(f.tag) + '</span>' : '';
    return '<div class="feature-card">' +
      '<div class="feature-card-header">' +
        '<span class="feature-card-name">' + esc(f.name) + '</span>' + tag +
      '</div>' +
      '<p class="feature-card-desc">' + esc(f.description) + '</p>' +
    '</div>';
  }

  function maneuverEntry(name, desc) {
    var esc = DS.Renderer.esc;
    return '<div class="sheet-maneuver-entry">' +
      '<strong class="text-primary">' + esc(name) + ':</strong> ' +
      '<span class="text-sm">' + esc(desc) + '</span>' +
    '</div>';
  }

  function sheetStat(label, value) {
    return '<div class="sheet-stat-box">' +
      '<div class="stat-val">' + value + '</div>' +
      '<div class="stat-lbl">' + label + '</div>' +
    '</div>';
  }

  function parseDamageTiers(str) {
    if (typeof str === 'string') {
      var parts = str.split('/');
      if (parts.length === 3) return parts;
    }
    return [str, str, str];
  }

  // Look up a feature description from all available sources
  function findFeatureDesc(cls, char, featureName) {
    if (cls.features && cls.features[featureName]) {
      return cls.features[featureName];
    }
    if (cls.classFeatures && cls.classFeatures.core) {
      var coreMatch = cls.classFeatures.core.find(function(f) { return f.name === featureName; });
      if (coreMatch) return coreMatch.description;
    }
    var sub = char && char.class ? char.class.subclass : null;
    if (sub && cls.classFeatures && cls.classFeatures.subclassFeatures && cls.classFeatures.subclassFeatures[sub]) {
      var subMatch = cls.classFeatures.subclassFeatures[sub].find(function(f) { return f.name === featureName; });
      if (subMatch) return subMatch.description;
    }
    return null;
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function titleCase(str) {
    if (!str) return '';
    return str.replace(/\b\w/g, function(c) { return c.toUpperCase(); });
  }

  // Make armor descriptions more readable
  function verboseArmor(armor) {
    if (!armor || armor === 'None') return 'None';
    var parts = armor.split(',').map(function(p) { return p.trim().toLowerCase(); });
    return parts.map(function(p) {
      if (p === 'light') return 'Light Armor';
      if (p === 'medium') return 'Medium Armor';
      if (p === 'heavy') return 'Heavy Armor';
      if (p === 'shield') return 'Shield';
      return capitalize(p);
    }).join(', ');
  }

  // Make weapon descriptions more readable
  function verboseWeapon(weapon) {
    if (!weapon || weapon === 'None') return 'None';
    var parts = weapon.split(',').map(function(p) { return p.trim().toLowerCase(); });
    return parts.map(function(p) {
      if (p === 'light') return 'Light Weapon';
      if (p === 'medium') return 'Medium Weapon';
      if (p === 'heavy') return 'Heavy Weapon';
      if (p === 'bow') return 'Bow';
      if (p === 'polearm') return 'Polearm';
      if (p === 'whip') return 'Whip';
      if (p === 'unarmed strikes') return 'Unarmed Strikes';
      if (p === 'ensnaring') return 'Ensnaring Weapon';
      return capitalize(p);
    }).join(', ');
  }

  function validate() {
    return true;
  }

  return { render: render, validate: validate };
})();
