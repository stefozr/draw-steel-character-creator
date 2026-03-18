// Test helpers — character builders and level-up simulator
const { DS } = require('./harness');

/**
 * Build a fully populated level-1 character with valid defaults.
 */
function buildLevel1(opts) {
  opts = opts || {};
  var classId = opts.classId || 'fury';
  var subclassId = opts.subclassId || null;
  var charArrayIndex = opts.charArrayIndex || 0;
  var kitId = opts.kitId || 'panther';
  var ancestryId = opts.ancestryId || 'human';

  var char = DS.State.createBlank();
  char.level = 1;

  // Ancestry
  char.ancestry.id = ancestryId;
  var ancestryData = DS.Data.Ancestries.find(a => a.id === ancestryId);
  if (ancestryData && opts.purchasedTraits) {
    char.ancestry.purchasedTraits = opts.purchasedTraits;
  }

  // Culture — pick first valid options
  char.culture.environment = 'nomadic';
  char.culture.organization = 'bureaucratic';
  char.culture.upbringing = 'academic';
  char.culture.skills = { environment: 'Navigate', upbringing: 'History' };
  char.culture.language = 'Anjal';

  // Career — pick first
  char.career.id = 'soldier';
  char.career.skills = ['Alertness', 'Endurance'];
  char.career.languages = ['Higaran'];
  char.career.perk = 'teamwork';

  // Class
  var classData = DS.Data.Classes[classId];
  char.class.id = classId;

  // Subclass
  if (subclassId) {
    char.class.subclass = subclassId;
  } else if (classData && classData.subclasses && classData.subclasses.length > 0) {
    char.class.subclass = classData.subclasses[0].id;
  }

  // Characteristic array
  if (classData && classData.characteristicArrays && classData.characteristicArrays.length > 0) {
    var arr = classData.characteristicArrays[charArrayIndex] || classData.characteristicArrays[0];
    char.class.characteristicArray = arr.id;
    char.class.characteristics = {
      might: arr.might,
      agility: arr.agility,
      reason: arr.reason,
      intuition: arr.intuition,
      presence: arr.presence
    };
  }

  // Class skills — pick first available
  if (classData && classData.freeSkills) {
    char.class.skills = classData.freeSkills.slice();
  }

  // Signature abilities — pick first N
  if (classData && classData.signatureAbilities) {
    var count = classData.signatureAbilityCount || 0;
    char.class.signatureAbilities = classData.signatureAbilities.slice(0, count).map(a => a.name);
  }

  // Heroic abilities — pick first at cost 3 and 5 (level 1 grants these for most classes)
  if (classData && classData.heroicAbilities) {
    [3, 5].forEach(cost => {
      var abilities = classData.heroicAbilities[cost] || [];
      if (abilities.length > 0) {
        char.class.heroicAbilities[cost] = [abilities[0].name];
      }
    });
  }

  // Kit
  char.kit.id = kitId;

  // Complication
  char.complication.id = 1;

  // Compute derived stats
  char.computed = DS.Calculator.compute(char);

  return char;
}

/**
 * Classify advancement features — pure logic extracted from DS.LevelUp.
 */
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
      result.heroicAbilityCost = parseInt(f);
    } else if (/^\d+-\w+ Ability$/.test(f)) {
      result.heroicAbilityCost = parseInt(f);
    } else if (/Ability\s*\(\d+/.test(f)) {
      var costMatch = f.match(/\((\d+)/);
      if (costMatch) result.heroicAbilityCost = parseInt(costMatch[1]);
    } else if (/^Characteristic/.test(f)) {
      // Handled by charBumps section — not displayed
    } else {
      result.display.push(f);
    }
  });

  return result;
}

/**
 * Simulate a single level-up step programmatically.
 * Mirrors DS.LevelUp.confirm() logic without DOM.
 */
function simulateLevelUp(char, classData, nextLevel) {
  var advancement = classData.advancement[nextLevel];
  if (!advancement) throw new Error('No advancement data for level ' + nextLevel);

  var features = advancement.features || [];
  var classified = classifyFeatures(features);
  var choices = {};

  // Apply characteristic bumps
  var charBumps = advancement.charBumps || null;
  if (charBumps) {
    if (charBumps.auto) {
      Object.keys(charBumps.auto).forEach(function(stat) {
        var current = char.class.characteristics[stat] || 0;
        var newVal = current + charBumps.auto[stat];
        if (newVal > charBumps.max) newVal = charBumps.max;
        char.class.characteristics[stat] = newVal;
      });
    }
    if (charBumps.choose) {
      // Pick first eligible stat not in auto bumps
      var autoStats = charBumps.auto ? Object.keys(charBumps.auto) : [];
      var eligible = ['might', 'agility', 'reason', 'intuition', 'presence'].filter(function(s) {
        return autoStats.indexOf(s) === -1 && (char.class.characteristics[s] || 0) < charBumps.max;
      });
      if (eligible.length > 0) {
        var stat = eligible[0];
        char.class.characteristics[stat] = (char.class.characteristics[stat] || 0) + 1;
        choices.charBump = stat;
      }
    }
  }

  // Pick a perk if needed
  if (classified.hasPerk) {
    var existingPerks = getExistingPerks(char);
    var categories = classified.perkFilter || Object.keys(DS.Data.Perks);
    var picked = null;
    for (var i = 0; i < categories.length && !picked; i++) {
      var catPerks = DS.Data.Perks[categories[i]] || [];
      for (var j = 0; j < catPerks.length && !picked; j++) {
        if (existingPerks.indexOf(catPerks[j].id) === -1) {
          picked = catPerks[j].id;
        }
      }
    }
    if (picked) choices.perk = picked;
  }

  // Pick a skill if needed
  if (classified.hasSkill) {
    var existingSkills = getAllSkills(char);
    var available = DS.Data.AllSkills.filter(function(s) {
      return existingSkills.indexOf(s) === -1;
    });
    if (available.length > 0) {
      choices.skill = available[0];
    }
  }

  // Pick a heroic ability if needed
  if (classified.heroicAbilityCost) {
    var cost = classified.heroicAbilityCost;
    var abilities = classData.heroicAbilities[cost] || [];
    var chosenNames = getAllChosenHeroicAbilities(char);
    var picked = null;
    for (var k = 0; k < abilities.length; k++) {
      if (chosenNames.indexOf(abilities[k].name) === -1) {
        picked = abilities[k].name;
        break;
      }
    }
    if (picked) {
      choices.heroicAbility = { cost: cost, name: picked };
      if (!char.class.heroicAbilities[cost]) char.class.heroicAbilities[cost] = [];
      char.class.heroicAbilities[cost].push(picked);
    } else {
      // No ability available at this cost — store deferred placeholder
      choices.heroicAbility = { cost: cost, name: null };
    }
  }

  // Store choices
  if (!char.class.levelChoices) char.class.levelChoices = {};
  char.class.levelChoices[nextLevel] = JSON.parse(JSON.stringify(choices));
  char.level = nextLevel;

  // Recompute
  char.computed = DS.Calculator.compute(char);
  return char;
}

function getExistingPerks(char) {
  var perks = [];
  if (char.career.perk) perks.push(char.career.perk);
  var lc = char.class.levelChoices || {};
  Object.keys(lc).forEach(function(lvl) {
    if (lc[lvl] && lc[lvl].perk) perks.push(lc[lvl].perk);
  });
  return perks;
}

function getAllSkills(char) {
  var skills = (char.computed.skills || []).slice();
  var lc = char.class.levelChoices || {};
  Object.keys(lc).forEach(function(lvl) {
    if (lc[lvl] && lc[lvl].skill && skills.indexOf(lc[lvl].skill) === -1) {
      skills.push(lc[lvl].skill);
    }
  });
  return skills;
}

function getAllChosenHeroicAbilities(char) {
  var names = [];
  var ha = char.class.heroicAbilities || {};
  Object.keys(ha).forEach(function(cost) {
    (ha[cost] || []).forEach(function(name) { names.push(name); });
  });
  var lc = char.class.levelChoices || {};
  Object.keys(lc).forEach(function(lvl) {
    if (lc[lvl] && lc[lvl].heroicAbility && lc[lvl].heroicAbility.name) {
      names.push(lc[lvl].heroicAbility.name);
    }
  });
  return names;
}

/**
 * Generate valid trait purchase combos within ancestry point budget.
 */
function generateValidTraitCombos(ancestry) {
  var budget = ancestry.ancestryPoints;
  var traits = ancestry.purchasedTraits || [];
  var combos = [];

  // Empty combo (no purchased traits)
  combos.push([]);

  // Single traits within budget
  traits.forEach(function(t) {
    if (t.cost <= budget) {
      combos.push([{ id: t.id, cost: t.cost }]);
    }
  });

  // Two-trait combos within budget
  for (var i = 0; i < traits.length; i++) {
    for (var j = i + 1; j < traits.length; j++) {
      if (traits[i].cost + traits[j].cost <= budget) {
        combos.push([
          { id: traits[i].id, cost: traits[i].cost },
          { id: traits[j].id, cost: traits[j].cost }
        ]);
      }
    }
  }

  // Three-trait combos within budget (only for ancestries with 3+ budget and 1-cost traits)
  for (var a = 0; a < traits.length; a++) {
    for (var b = a + 1; b < traits.length; b++) {
      for (var c = b + 1; c < traits.length; c++) {
        if (traits[a].cost + traits[b].cost + traits[c].cost <= budget) {
          combos.push([
            { id: traits[a].id, cost: traits[a].cost },
            { id: traits[b].id, cost: traits[b].cost },
            { id: traits[c].id, cost: traits[c].cost }
          ]);
        }
      }
    }
  }

  return combos;
}

module.exports = {
  buildLevel1,
  classifyFeatures,
  simulateLevelUp,
  generateValidTraitCombos,
  getExistingPerks,
  getAllSkills,
  getAllChosenHeroicAbilities
};
