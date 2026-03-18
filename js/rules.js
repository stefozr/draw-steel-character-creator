// DS.Rules - Rules Cheat Sheet content renderer
DS.Rules = (function() {

  var rendered = false;

  // SVG icons for each section (inline, 20x20)
  var icons = {
    basics:     '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    edges:      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813h6.138l-4.962 3.574 1.912 5.813L12 14.626 7 18.2l1.912-5.813L3.95 8.813h6.138z"/></svg>',
    hero:       '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    combat:     '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 7l4-4 4 4-4 4"/><path d="M7 13l-4 4 4 4 4-4"/></svg>',
    maneuvers:  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    glossary:   '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    movement:   '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="16"/><polyline points="9 13 12 16 15 13"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
    forced:     '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
    areas:      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    conditions: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    size:       '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>'
  };

  function render(container) {
    if (rendered) return;
    rendered = true;

    container.innerHTML =
      renderBasics() +
      renderEdgesAndBanes() +
      renderHeroTokens() +
      renderCombat() +
      renderManeuvers() +
      renderCombatGlossary() +
      renderMovement() +
      renderForcedMovement() +
      renderAreasOfEffect() +
      renderConditions() +
      renderSizeAndSpace();

    initSearch();
  }

  function section(title, body, icon) {
    return '<section class="rules-section">' +
      '<h2 class="rules-section-title">' +
        (icon ? '<span class="rules-section-icon">' + icon + '</span>' : '') +
        title +
      '</h2>' + body +
    '</section>';
  }

  function dt(term, def) {
    return '<div class="rules-dt"><strong>' + term + ':</strong> ' + def + '</div>';
  }

  // --- Search ---
  function initSearch() {
    var input = document.getElementById('rules-search');
    var clearBtn = document.getElementById('rules-search-clear');
    var noResults = document.getElementById('rules-no-results');
    var debounceTimer;

    // Snapshot original innerHTML of every highlightable element so we can
    // restore cleanly before each new search (avoids DOM fragmentation bugs).
    var snapshots = [];
    var container = document.getElementById('rules-content');
    container.querySelectorAll('.rules-dt, .rules-ability-block, .rules-note, .rules-section > p, .rules-section > ul, .rules-section > h3, .rules-section-title').forEach(function(el) {
      snapshots.push({ el: el, html: el.innerHTML });
    });

    input.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() { filterRules(input.value); }, 150);
      clearBtn.classList.toggle('hidden', !input.value);
    });

    clearBtn.addEventListener('click', function() {
      input.value = '';
      clearBtn.classList.add('hidden');
      filterRules('');
      input.focus();
    });

    function restoreAll() {
      for (var i = 0; i < snapshots.length; i++) {
        snapshots[i].el.innerHTML = snapshots[i].html;
      }
    }

    function filterRules(query) {
      var q = query.trim().toLowerCase();
      var sections = document.querySelectorAll('#rules-content .rules-section');
      var anyVisible = false;

      // Always restore original HTML first to clear previous highlights
      restoreAll();

      sections.forEach(function(sec) {
        if (!q) {
          sec.classList.remove('rules-hidden');
          sec.querySelectorAll('.rules-dt, .rules-ability-block, .rules-note, p, ul, h3').forEach(function(el) {
            el.classList.remove('rules-hidden');
          });
          anyVisible = true;
          return;
        }

        var sectionTitle = sec.querySelector('.rules-section-title');
        var titleText = sectionTitle ? sectionTitle.textContent.toLowerCase() : '';
        var titleMatch = titleText.indexOf(q) !== -1;

        // Check each filterable child
        var children = sec.querySelectorAll('.rules-dt, .rules-ability-block');
        var hasChildMatch = false;

        children.forEach(function(child) {
          var text = child.textContent.toLowerCase();
          if (text.indexOf(q) !== -1) {
            child.classList.remove('rules-hidden');
            hasChildMatch = true;
            highlightIn(child, q);
          } else {
            child.classList.add('rules-hidden');
          }
        });

        // For non-dt/ability content (paragraphs, lists, notes)
        var otherContent = sec.querySelectorAll(':scope > p, :scope > ul, :scope > .rules-note, :scope > h3');
        otherContent.forEach(function(el) {
          var text = el.textContent.toLowerCase();
          if (titleMatch || text.indexOf(q) !== -1) {
            el.classList.remove('rules-hidden');
            if (!titleMatch) highlightIn(el, q);
          } else if (!titleMatch && !hasChildMatch) {
            el.classList.add('rules-hidden');
          } else {
            el.classList.remove('rules-hidden');
          }
        });

        if (titleMatch || hasChildMatch) {
          sec.classList.remove('rules-hidden');
          anyVisible = true;
        } else {
          // Check whole section text as fallback
          if (sec.textContent.toLowerCase().indexOf(q) !== -1) {
            sec.classList.remove('rules-hidden');
            sec.querySelectorAll('.rules-dt, .rules-ability-block, p, ul, h3, .rules-note').forEach(function(el) {
              el.classList.remove('rules-hidden');
            });
            anyVisible = true;
          } else {
            sec.classList.add('rules-hidden');
          }
        }
      });

      noResults.classList.toggle('hidden', anyVisible || !q);
    }

    // Highlight by replacing innerHTML using a regex that skips HTML tags.
    // This is safe because the content is static trusted HTML (no user content).
    function highlightIn(container, query) {
      var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match query text only outside of HTML tags
      var re = new RegExp('(?![^<]*>)(' + escaped + ')', 'gi');
      container.innerHTML = container.innerHTML.replace(re, '<mark class="rules-highlight">$1</mark>');
    }
  }

  // --- Section renderers ---

  function renderBasics() {
    return section('The Basics',
      dt('Characteristic Scores', 'Your Might, Agility, Reason, Intuition, and Presence are your characteristic scores and measures of mental and physical power') +
      dt('Natural 19 or 20', 'A result of 19 or 20 rolled on the dice without a modifier (a Critical Hit) is always a Tier 3 result, no matter the modifiers') +
      dt('Power Roll', 'Most abilities and all tests require you to roll 2d10 and add a characteristic. Each power roll has three tiers of outcome. Tier 1 is a result of 11 or lower. Tier 2 is a result of 12 to 16. Tier 3 is a result of 17 or higher') +
      dt('Recovery', 'You can spend a Recovery to regain Stamina equal to your recovery value. Only heroes have Recoveries') +
      dt('Respite', 'An uninterrupted rest for 24 hours in a safe place, at the end of which you regain all your Recoveries and Stamina and your Victories are converted into XP') +
      dt('Skill', 'If you have at least one skill that applies to a test (not an ability roll), you gain a +2 bonus to it') +
      dt('Victories', 'When you successfully overcome challenges such as combat in an adventure, you earn Victories'),
      icons.basics
    );
  }

  function renderEdgesAndBanes() {
    return section('Edges &amp; Banes',
      dt('Edge', 'If you have a situational advantage (edge) on a power roll, the roll gains +2') +
      dt('Double Edge', 'If you have two or more edges, the roll is one tier higher instead') +
      dt('Bane', 'If you have a situational disadvantage (bane) on a power roll, the roll gains -2') +
      dt('Double Bane', 'If you have two or more banes, the roll is one tier lower instead') +
      '<div class="rules-note">' +
        '<ul>' +
          '<li>If you have an edge and a bane or a double edge and a double bane, the roll is made normally without any edges or banes.</li>' +
          '<li>If you have a double edge and a bane, the roll has one edge.</li>' +
          '<li>If you have a double bane and an edge, the roll has one bane.</li>' +
        '</ul>' +
      '</div>',
      icons.edges
    );
  }

  function renderHeroTokens() {
    return section('Hero Tokens',
      '<p>Your Director will set out hero tokens in a shared pool at the start of each session. You can spend:</p>' +
      '<ul>' +
        '<li>1 hero token to gain 2 surges.</li>' +
        '<li>1 hero token when you fail a saving throw, letting you succeed on the save instead.</li>' +
        '<li>1 hero token to reroll a test. You must use the new roll.</li>' +
        '<li>2 hero tokens on your turn or after you take damage (no action required) to regain Stamina equal to your Recovery value.</li>' +
      '</ul>',
      icons.hero
    );
  }

  function renderCombat() {
    return section('Combat',
      '<p><strong>Combat Turn:</strong> On your turn in combat, you can take a main action, a move action, and a maneuver. You can turn your action into an additional move action or maneuver. There is no limit to the number of free maneuvers you can take.</p>' +
      '<p><strong>Triggered Action:</strong> You can take one triggered action per round when the trigger happens. There is no limit to the number of free triggered actions you can take.</p>' +

      '<h3 class="rules-subsection-title">Main Actions</h3>' +
      '<p>Any creature can take the following main actions, in addition to those listed in their stats:</p>' +
      '<ul>' +
        '<li><strong>Charge:</strong> Move up to your speed in a straight line without shifting, and can then make a melee free strike or use an ability with the Charge keyword against a creature when you end your move.</li>' +
        '<li><strong>Defend:</strong> All ability power rolls made against you have a double bane until the start of your next turn. You gain no benefit from this action while another creature is taunted by you.</li>' +
        '<li><strong>Free Strike:</strong> You make a free strike.</li>' +
        '<li><strong>Heal:</strong> Choose an adjacent creature who can spend a Recovery or make a saving throw.</li>' +
      '</ul>' +

      '<h3 class="rules-subsection-title">Move Actions</h3>' +
      '<ul>' +
        '<li><strong>Advance:</strong> Move a number of squares up to your speed. You can break up this movement with your maneuver and action however you wish.</li>' +
        '<li><strong>Disengage:</strong> Shift 1 square.</li>' +
        '<li><strong>Ride:</strong> Cause a mount you are riding to take the Advance move action. A mount can only benefit from this once per round.</li>' +
      '</ul>',
      icons.combat
    );
  }

  function renderManeuvers() {
    return section('Maneuvers',
      '<p>Any creature can take the following maneuvers, in addition to those listed in their stats:</p>' +
      '<ul>' +
        '<li><strong>Aid Attack:</strong> Choose an adjacent enemy. The next ability power roll an ally makes against them before the start of your next turn has an edge.</li>' +
        '<li><strong>Catch Breath:</strong> Spend a Recovery.</li>' +
        '<li><strong>Escape Grab:</strong> You use the Escape Grab ability while grabbed.</li>' +
        '<li><strong>Grab:</strong> You use the Grab ability.</li>' +
        '<li><strong>Hide:</strong> You become hidden from creatures who aren\'t observing you while you have cover or concealment from them.</li>' +
        '<li><strong>Knockback:</strong> You use the Knockback ability.</li>' +
        '<li><strong>Stand Up:</strong> You stand up from prone, ending that condition. Alternatively, you can use this maneuver to make an adjacent prone creature stand up.</li>' +
      '</ul>' +

      renderAbilityBlock('Escape Grab', 'Maneuver', '\u2014', 'Self', 'Self',
        'Power Roll + M or A:',
        ['\u226411: No effect.',
         '12\u201316: You can escape the grab, but if you do, a creature who has you grabbed can make a melee free strike against you before you are no longer grabbed.',
         '17+: You are no longer grabbed.'],
        'You take a bane on this maneuver if your size is smaller than the size of the creature, object, or effect that has you grabbed.') +

      renderAbilityBlock('Grab', 'Maneuver', 'Melee, Weapon', 'Melee 1', 'One creature',
        'Power Roll + M:',
        ['\u226411: No effect.',
         '12\u201316: You can grab the target, but if you do, the target can make a melee free strike against you before they are grabbed.',
         '17+: The target is grabbed by you.'],
        'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score. Unless otherwise indicated, a creature can grab only one creature at a time.') +

      renderAbilityBlock('Knockback', 'Maneuver', 'Melee, Weapon', 'Melee 1', 'One creature',
        'Power Roll + M:',
        ['\u226411: Push 1.',
         '12\u201316: Push 2.',
         '17+: Push 3.'],
        'You can usually target only creatures of your size or smaller. If your Might score is 2 or higher, you can target any creature with a size equal to or less than your Might score.'),
      icons.maneuvers
    );
  }

  function renderAbilityBlock(name, type, keywords, distance, target, rollLabel, tiers, effect) {
    var html = '<div class="rules-ability-block">' +
      '<div class="rules-ability-header">' +
        '<span class="rules-ability-name">' + name + '</span>' +
        '<span class="rules-ability-type">' + type + '</span>' +
      '</div>';

    if (keywords !== '\u2014') {
      html += '<div class="rules-ability-meta"><span class="rules-ability-kw">' + keywords + '</span></div>';
    }
    html += '<div class="rules-ability-meta">' +
      '<span><strong>Distance:</strong> ' + distance + '</span>' +
      '<span><strong>Target:</strong> ' + target + '</span>' +
    '</div>';

    html += '<div class="rules-power-roll"><div class="rules-roll-label">' + rollLabel + '</div>';
    for (var i = 0; i < tiers.length; i++) {
      var tierClass = i === 0 ? 't1' : (i === 1 ? 't2' : 't3');
      html += '<div class="rules-tier"><span class="rules-tier-range ' + tierClass + '">' + tiers[i].split(':')[0] + ':</span> ' + tiers[i].split(':').slice(1).join(':').trim() + '</div>';
    }
    html += '</div>';

    if (effect) {
      html += '<div class="rules-ability-effect"><strong>Effect:</strong> ' + effect + '</div>';
    }

    html += '</div>';
    return html;
  }

  function renderCombatGlossary() {
    return section('Combat Glossary',
      dt('Critical Hit', 'When you roll a natural 19 or 20 on a Strike or ability power roll on an ability that uses an action, you can immediately take another action') +
      dt('Concealment', 'Darkness, fog, invisibility magic, and any other effect that fully obscures a creature or object but doesn\'t protect their physical form grants that creature or object concealment. You can target a creature or object with concealment using a strike, provided they aren\'t hidden. However, strikes against such targets take a bane') +
      dt('Cover', 'When you have line of effect to a creature or object but that target has at least half their form blocked by a solid obstruction such as a tree, wall, or overturned table, the target has cover. You take a bane on damage-dealing abilities used against creatures or objects that have cover from you') +
      dt('Damage Immunity', 'Each damage immunity has a type and value. If a creature with damage immunity takes damage equal to the value (minimum 0), they reduce the incoming damage to 0 and avoid any associated effects with the damage too') +
      dt('Damage Weakness', 'Each damage weakness has a type and value. If a creature with damage weakness takes damage of that type, they take additional damage equal to the weakness value') +
      dt('Dying', 'While your Stamina is 0, you are dying and can\'t take the Catch Breath maneuver in combat. While dying, you are bleeding until you are no longer dying. When your Stamina is equal to your negative winded value, you die') +
      dt('EoT', 'If an effect ends with "(EoT)" at the end of its description, a creature suffers the effect until the end of their next turn, or the current turn if they got the effect on their current turn') +
      dt('Flanking', 'When you and at least one ally are adjacent to the same enemy and on completely opposite sides of the enemy, you are flanking that enemy. While flanking an enemy, you gain an edge on melee strikes against them') +
      dt('High Ground', 'Whenever a creature uses an ability to target a creature or object while standing on the ground and occupying a space that is fully above the target\'s space, they gain an edge on the power roll against that target') +
      dt('Line of Effect', 'To target a creature or object with an ability, you must have line of effect to them. If a solid object completely blocks the line, then you don\'t have line of effect to them') +
      dt('Opportunity Attack', 'When a creature within your reach willingly moves out of it without shifting, you can make a melee free strike against that creature as a free triggered action') +
      dt('Potency', 'Many of your ability effects have a potency, which is a value that indicates how high a target\'s characteristic score must be to resist the effect. A potency always appears in text as a capital letter followed by a less-than sign (&lt;) and then your potency value') +
      dt('Saving Throws', 'If an effect ends with "(save ends)" at the end of its description, then a creature suffering the effect can make a saving throw at the end of their turn to remove the effect. To make a saving throw, roll a d10. On a 6 or higher, the effect ends. Otherwise, it continues') +
      dt('Stamina', 'When you take damage, your Stamina is reduced by an amount equal to the damage you take. When you reduce a non-hero creature\'s Stamina to 0, you decide if they die or become unconscious until they regain Stamina') +
      dt('Surges', 'Certain abilities give heroes surges. When you deal damage with an ability power roll, you can spend up to three surges to increase the damage you deal by 2 per surge spent to one creature or object targeted with the ability. When you target one or more creatures with an ability that has a potency, you can spend two surges to increase the potency by 1 for one of the creatures targeted with the effect. After you spend a surge, it disappears. At the end of combat, you lose all surges') +
      dt('Winded', 'When your Stamina is equal to half your maximum or less, you are winded'),
      icons.glossary
    );
  }

  function renderMovement() {
    return section('Movement',
      '<p>A single move or effect can never allow a creature to move more squares than their speed, unless the effect specifically states otherwise.</p>' +
      '<p>All squares adjacent to your character cost 1 movement to move into, even diagonally. A creature can\'t move diagonally when doing so would allow them to cross the corner of a wall or other structure the fills between your space and the space you are moving to. This rule applies only to moving by objects, not creatures.</p>' +

      dt('Climb', 'If a creature\'s speed entry includes the word "climb," they can climb across vertical and horizontal surfaces at full speed. Creatures without those types of movement can still climb when a rule allows them to move, but each square of climbing costs 2 squares of movement') +
      dt('Crawl', 'If you are prone, you can remain prone and crawl on the ground. Doing so costs you 1 additional square of movement for every square you crawl. You can fall prone as a free maneuver on your turn. While voluntarily prone, you can choose to stand as a free maneuver') +
      dt('Difficult Terrain', 'Areas of thick underbrush, rubble, spiderwebs, or other obstacles create difficult terrain. It costs 1 additional square of movement to enter a square of difficult terrain') +
      dt('Jump', 'When an effect allows you to move, you can long jump a number of squares up to your Might or Agility score (your choice; minimum 1 square) without a test as part of that movement. If you move at least 2 squares in a straight line immediately before your jump, you can long jump 1 additional square. You can\'t jump farther or higher than the distance of the effect that allows you to move. You can\'t jump out of difficult or damaging terrain') +
      dt('Teleport', 'When you teleport, you move from one space to another space instantaneously. Teleporting doesn\'t provoke opportunity attacks. You bypass any obstacles between the spaces. The creature teleporting you must have line of effect from the space you leave and to your destination space. Your destination space can\'t be occupied by another creature. If the effect tells you how far you can teleport, you can use even if it is greater than your speed') +
      dt('Shifting', 'The Disengage move action and certain abilities allow you to shift. When you shift, you move without provoking opportunity attacks. You can\'t shift into difficult terrain') +
      dt('Slamming into Creatures', 'When you force move a creature into another creature, the movement ends and both creatures take 1 damage for each square remaining in the first creature\'s forced movement. You can force move another creature onto yourself with a pull or a slide') +
      dt('Slamming into Objects', 'When you force move a creature into a stationary object that is their size or larger, the movement ends and the creature takes 2 damage plus 1 damage for each square remaining in their forced movement'),
      icons.movement
    );
  }

  function renderForcedMovement() {
    return section('Forced Movement',
      '<p>When you force move a target, you can always move that target fewer squares than the number indicated.</p>' +
      '<ul>' +
        '<li><strong>Push X:</strong> You move the target up to X squares away from you in a straight line, without moving them vertically. Each square you move the creature must put them further away from you.</li>' +
        '<li><strong>Pull X:</strong> You move the target up to X squares toward you in a straight line, without moving them vertically. Each square you move the creature must bring them closer to you.</li>' +
        '<li><strong>Slide X:</strong> You move the target up to X squares in any direction, except for vertically.</li>' +
        '<li><strong>Vertical:</strong> If a forced movement effect has the word "vertical" in front of it, then the forced movement can move a target up or down in addition to horizontally.</li>' +
      '</ul>' +

      '<h3 class="rules-subsection-title">Big vs Little</h3>' +
      '<p>When a larger creature force moves a smaller creature with a melee weapon ability, the force move distance is increased by 1. If a smaller creature force moves a larger creature with a melee weapon ability, the force move distance does not change.</p>' +

      '<h3 class="rules-subsection-title">Breaking Objects</h3>' +
      '<p>When you move a creature into an object, the object can break depending on how many squares of forced movement remain. The cost of being slammed into an object is baked into the damage you take for being hurled through it.</p>' +
      '<ul>' +
        '<li>It costs 1 remaining square of forced movement to destroy 1 square of glass. The creature moved takes 3 damage.</li>' +
        '<li>It costs 3 remaining squares of forced movement to destroy 1 square of wood. The creature moved takes 5 damage.</li>' +
        '<li>It costs 6 remaining squares of forced movement to destroy 1 square of stone. The creature moved takes 8 damage.</li>' +
        '<li>It costs 9 remaining squares of forced movement to destroy 1 square of metal. The creature moved takes 11 damage.</li>' +
      '</ul>' +
      '<p>If any forced movement remains after the object is destroyed, you can continue to move the creature who destroyed the object.</p>' +

      dt('Stability', 'Each creature has a stability that allows them to resist forced movement. When a creature is forced moved, they can reduce the movement up to a number of squares equal to their stability'),
      icons.forced
    );
  }

  function renderAreasOfEffect() {
    return section('Areas of Effect',
      '<p>Area abilities cover an area, creating an effect within that area that lets you target multiple creatures or objects at once. When an ability allows you to create an area of effect, you are sometimes given a distance, noted as "within X," that describes how many squares away from you the area can be. If an area ability doesn\'t originate from you, then at least 1 square of the area of effect must be within that distance and your line of effect. Unless otherwise noted, area abilities don\'t pass through solid barriers such as walls or ceilings, and spread around corners. As long as you have line of effect and distance to the origin square, you can place an area ability to include one or more squares where you don\'t have line of effect.</p>' +
      '<ul>' +
        '<li><strong>Aura:</strong> When an ability creates an aura, that area is expressed as "X aura." The number X is the radius of the aura, which always originates from you and moves with you for the duration of the ability that created it. A creature or object must be within X squares of you to be targeted with an aura ability.</li>' +
        '<li><strong>Burst:</strong> When an ability creates a burst area, that area is expressed as "X burst." The number X is the radius of the burst, which always originates from you and lasts only for as long as it takes to affect its targets. A creature or object must be within X squares of you to be targeted with a burst ability.</li>' +
        '<li><strong>Cube:</strong> When an ability affects a cubic area, that area is expressed as "X cube." The number X is the radius of the cube. A creature or object must be within the area to be targeted with a cube ability.</li>' +
        '<li><strong>Line:</strong> When an ability affects a linear area, that area is expressed as "A \u00d7 B line." The number A denotes the line\'s length in squares, while the number B equals the line\'s width and height in squares. When you create a line area of effect, the squares in that area must be in a straight line. A creature or object must be within the area to be targeted with a line ability.</li>' +
        '<li><strong>Wall:</strong> When an ability creates a wall, that area is expressed as "X wall." The number X is how many squares are used to make the wall. When you place a wall, you can build it one square at a time, but each square must share at least one side (not just a corner) with another square of the wall. A creature or object must be within the area to be targeted with a wall ability. You can stack squares on top of each other to make the wall higher. Unless otherwise stated, a wall can\'t be placed in occupied squares, and a wall blocks line of effect.</li>' +
      '</ul>',
      icons.areas
    );
  }

  function renderConditions() {
    return section('Conditions',
      '<p>Some abilities and other effects apply specific negative effects called conditions to a creature. The following conditions show up regularly in the game and can be tracked on your character sheet.</p>' +

      dt('Bleeding', 'While a creature is bleeding, whenever they use a main action, use a triggered action, or make a test or ability power roll using Might or Agility, they lose Stamina equal to 1d6 + their level. This Stamina loss can\'t be prevented in any way. You take damage from this condition when you use a main action you use off your turn. For example, a signature attack used as a free triggered action with the assistance of the tactician\'s Strike Now ability triggers the damage from the bleeding condition') +
      dt('Dazed', 'A creature who is dazed can do only one thing on their turn: use a main action, use a maneuver, or use a move action. A dazed creature also can\'t use triggered actions, free triggered actions, or free maneuvers') +
      dt('Frightened', 'When a creature is frightened, any ability roll they make against the source of their fear takes a bane. If that source is a creature, their ability rolls made against the frightened creature gain an edge. A frightened creature can\'t willingly move closer to the source of their fear if they know the location of that source. If a creature gains the frightened condition from one source while already frightened by a different source, the new condition replaces the old one') +
      dt('Grabbed', 'A creature who is grabbed has speed 0, can\'t be force moved by a creature, object, or effect that has them grabbed, can\'t use the Knockback maneuver, and takes a bane on abilities that don\'t target the creature, object, or effect that has them grabbed. If a creature is grabbed by another creature and that creature moves, they bring the grabbed creature with them. If a creature\'s size is equal to or less than the size of a creature they have grabbed, their speed is halved while they have that creature grabbed. A creature who has another creature grabbed can use a maneuver to move the grabbed creature into an unoccupied space adjacent to them. A creature can release a creature they have grabbed at any time to end that condition (no action required). A creature targeted by an effect that would grab them can attempt to escape being grabbed using the Escape Grab maneuver. If a grabbed creature teleports, or the creature grabbing them is force moved so that both creatures are no longer adjacent to each other, they are no longer grabbed') +
      dt('Prone', 'While a creature is prone, they are flat on the ground, any strike they make takes a bane, and melee abilities used against them gain an edge. A prone creature must crawl to move along the ground, which costs 1 additional square of movement for every square crawled. A creature can\'t climb, jump, swim, or fly while prone. If they are climbing, flying, or jumping when knocked prone, they fall. Unless the ability or effect that imposed the prone condition says otherwise, a prone creature can stand up using the Stand Up maneuver. A creature adjacent to a willing prone creature can likewise use the Stand Up maneuver to make that creature stand up') +
      dt('Restrained', 'A creature who is restrained has speed 0, can\'t use the Stand Up maneuver, and can\'t be force moved. A restrained creature takes a bane on ability rolls and on Might and Agility tests, and abilities used against them gain an edge. If a creature teleports while restrained, that condition ends') +
      dt('Slowed', 'A creature who is slowed has speed 2 unless their speed is already lower, and they can\'t shift') +
      dt('Taunted', 'A creature who is taunted has a double bane on ability rolls for any ability that doesn\'t target the creature who taunted them, as long as they have line of effect to that creature. If a creature gains the taunted condition from one source while already taunted by a different source, the new condition replaces the old one') +
      dt('Weakened', 'A creature who is weakened takes a bane on power rolls'),
      icons.conditions
    );
  }

  function renderSizeAndSpace() {
    return section('Size &amp; Space',
      '<p>A creature\'s size indicates how many squares they occupy during combat, which defines the creature\'s space. If a creature\'s size is 1, they occupy a space of 1 square. If a creature is larger than 1 square, their size equals the number of squares they take up in length, width, and height.</p>' +
      '<p>If a creature is a size 1, their size value includes the letter T, S, M, or L, abbreviations of tiny, small, medium, and large respectively. Since the minimal amount of space a creature can take up during combat is 1, this letter indicates the difference between tiny pixies, small polders, medium humans, and large bugbears, each of which occupy a space 1 square in combat. These sizes in order from smallest to largest are 1T, 1S, 1M, and 1L. These sizes have different values. Size 1T is one size smaller than size 1S, two sizes smaller than 1M, etc. If a rule affects size 1 creatures, the rule applies to all size 1 creatures.</p>',
      icons.size
    );
  }

  return {
    render: render
  };

})();
