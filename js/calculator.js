// DS.Calculator - Derived stat computation
DS.Calculator = (function() {
  // Echelon: levels 1-3 = 1, 4-6 = 2, 7-9 = 3, 10 = 4
  function getEchelon(level) {
    if (level <= 3) return 1;
    if (level <= 6) return 2;
    if (level <= 9) return 3;
    return 4;
  }

  function compute(char) {
    var result = {
      stamina: 0,
      winded: 0,
      recoveryValue: 0,
      recoveries: 0,
      speed: 5,
      stability: 0,
      size: 'M',
      skills: [],
      languages: ['Caelian'],
      abilities: [],
      features: [],
      meleeDamageBonus: '+0/+0/+0',
      rangedDamageBonus: '+0/+0/+0',
      meleeDistanceBonus: 0,
      rangedDistanceBonus: 0,
      disengageBonus: 0
    };

    var echelon = getEchelon(char.level);

    // Gather characteristics
    var chars = char.class.characteristics || { might: 0, agility: 0, reason: 0, intuition: 0, presence: 0 };

    // Class base stats
    var classData = getClassData(char.class.id);
    if (classData) {
      result.stamina = (classData.staminaBase || 0) + chars.might;
      result.recoveries = classData.recoveries || 8;
    }

    // Kit bonuses
    var kitData = getKitData(char.kit.id);
    if (kitData) {
      var kitStamina = kitData.staminaPerEchelon ? kitData.staminaPerEchelon * echelon : 0;
      result.stamina += kitStamina;
      result.speed += (kitData.speed || 0);
      result.stability += (kitData.stability || 0);
      result.meleeDamageBonus = kitData.meleeDamage || '+0/+0/+0';
      result.rangedDamageBonus = kitData.rangedDamage || '+0/+0/+0';
      result.meleeDistanceBonus = kitData.meleeDistance || 0;
      result.rangedDistanceBonus = kitData.rangedDistance || 0;
      result.disengageBonus = kitData.disengage || 0;
    }

    // Ancestry size/speed overrides
    var ancestryData = getAncestryData(char.ancestry.id);
    if (ancestryData) {
      if (ancestryData.size) result.size = ancestryData.size.replace(/^1/, '');
      if (ancestryData.speed) result.speed = ancestryData.speed;
      // Check purchased traits for speed/size modifications
      (char.ancestry.purchasedTraits || []).forEach(function(t) {
        var trait = findTrait(ancestryData, t.id);
        if (trait) {
          if (trait.speedOverride) result.speed = trait.speedOverride;
          if (trait.staminaBonus) result.stamina += trait.staminaBonus * echelon;
          if (trait.stabilityBonus) result.stability += trait.stabilityBonus;
        }
      });
    }

    // Winded and recovery value
    result.winded = Math.floor(result.stamina / 2);
    result.recoveryValue = Math.floor(result.stamina / 3);

    // Collect skills from all sources
    var allSkills = new Set();
    // Culture skills
    Object.values(char.culture.skills || {}).forEach(function(s) { if (s) allSkills.add(s); });
    // Career skills
    (char.career.skills || []).forEach(function(s) { allSkills.add(s); });
    // Class skills
    (char.class.skills || []).forEach(function(s) { allSkills.add(s); });
    // Level-up skills
    var lc = char.class.levelChoices || {};
    Object.keys(lc).forEach(function(lvl) {
      if (lc[lvl] && typeof lc[lvl] === 'object' && !Array.isArray(lc[lvl]) && lc[lvl].skill) {
        allSkills.add(lc[lvl].skill);
      }
    });
    result.skills = Array.from(allSkills).sort();

    // Collect languages
    var allLangs = new Set(['Caelian']);
    if (char.culture.language) allLangs.add(char.culture.language);
    (char.career.languages || []).forEach(function(l) { allLangs.add(l); });
    result.languages = Array.from(allLangs).sort();

    return result;
  }

  function getClassData(classId) {
    if (!classId || !DS.Data || !DS.Data.Classes) return null;
    return DS.Data.Classes[classId] || null;
  }

  function getKitData(kitId) {
    if (!kitId || !DS.Data || !DS.Data.Kits) return null;
    return DS.Data.Kits.find(function(k) { return k.id === kitId; }) || null;
  }

  function getAncestryData(ancestryId) {
    if (!ancestryId || !DS.Data || !DS.Data.Ancestries) return null;
    return DS.Data.Ancestries.find(function(a) { return a.id === ancestryId; }) || null;
  }

  function findTrait(ancestryData, traitId) {
    if (!ancestryData || !ancestryData.purchasedTraits) return null;
    return ancestryData.purchasedTraits.find(function(t) { return t.id === traitId; }) || null;
  }

  return { compute: compute, getEchelon: getEchelon };
})();
