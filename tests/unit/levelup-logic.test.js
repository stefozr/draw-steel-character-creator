const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { classifyFeatures, buildLevel1, simulateLevelUp } = require('../helpers');

describe('classifyFeatures()', () => {

  it('"Perk" → hasPerk: true, perkFilter: null', () => {
    const result = classifyFeatures(['Perk']);
    assert.equal(result.hasPerk, true);
    assert.equal(result.perkFilter, null);
  });

  it('"Perk (crafting/lore)" → hasPerk: true, perkFilter: ["crafting","lore"]', () => {
    const result = classifyFeatures(['Perk (crafting/lore)']);
    assert.equal(result.hasPerk, true);
    assert.deepEqual(result.perkFilter, ['crafting', 'lore']);
  });

  it('"Perk (exploration)" → perkFilter: ["exploration"]', () => {
    const result = classifyFeatures(['Perk (exploration)']);
    assert.deepEqual(result.perkFilter, ['exploration']);
  });

  it('"Skill" → hasSkill: true', () => {
    const result = classifyFeatures(['Skill']);
    assert.equal(result.hasSkill, true);
  });

  it('"7-cost Heroic Ability" → heroicAbilityCost: 7', () => {
    const result = classifyFeatures(['7-cost Heroic Ability']);
    assert.equal(result.heroicAbilityCost, 7);
  });

  it('"7-Ferocity Ability" (Fury pattern) → heroicAbilityCost: 7', () => {
    const result = classifyFeatures(['7-Ferocity Ability']);
    assert.equal(result.heroicAbilityCost, 7);
  });

  it('"Doctrine Ability (5-cost)" → heroicAbilityCost: 5', () => {
    const result = classifyFeatures(['Doctrine Ability (5-cost)']);
    assert.equal(result.heroicAbilityCost, 5);
  });

  it('"Aspect Ability (9-Ferocity)" → heroicAbilityCost: 9', () => {
    const result = classifyFeatures(['Aspect Ability (9-Ferocity)']);
    assert.equal(result.heroicAbilityCost, 9);
  });

  it('"3-Ferocity Ability" → heroicAbilityCost: 3', () => {
    const result = classifyFeatures(['3-Ferocity Ability']);
    assert.equal(result.heroicAbilityCost, 3);
  });

  it('"5-Ferocity Ability" → heroicAbilityCost: 5', () => {
    const result = classifyFeatures(['5-Ferocity Ability']);
    assert.equal(result.heroicAbilityCost, 5);
  });

  it('"Characteristic Increase (Might & Agility to 3)" is filtered out of display', () => {
    const result = classifyFeatures(['Characteristic Increase (Might & Agility to 3)']);
    assert.equal(result.display.length, 0);
  });

  it('non-special features go to display', () => {
    const result = classifyFeatures(['Mighty Leaps', 'Ferocity']);
    assert.deepEqual(result.display, ['Mighty Leaps', 'Ferocity']);
  });

  it('mixed feature array returns correct combined result', () => {
    const features = ['Perk', 'Skill', '7-cost Heroic Ability', 'Mighty Leaps', 'Characteristic Increase (all, max 4)'];
    const result = classifyFeatures(features);
    assert.equal(result.hasPerk, true);
    assert.equal(result.hasSkill, true);
    assert.equal(result.heroicAbilityCost, 7);
    assert.deepEqual(result.display, ['Mighty Leaps']);
    assert.equal(result.perkFilter, null);
  });

  it('empty features array returns defaults', () => {
    const result = classifyFeatures([]);
    assert.equal(result.hasPerk, false);
    assert.equal(result.hasSkill, false);
    assert.equal(result.heroicAbilityCost, null);
    assert.deepEqual(result.display, []);
  });
});

describe('simulateLevelUp()', () => {

  it('increments character level', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    simulateLevelUp(char, classData, 2);
    assert.equal(char.level, 2);
  });

  it('stores levelChoices for the level', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    simulateLevelUp(char, classData, 2);
    assert.ok(char.class.levelChoices[2]);
  });

  it('applies auto characteristic bumps', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    const mightBefore = char.class.characteristics.might;
    const agilityBefore = char.class.characteristics.agility;
    // Level 4 has auto bumps: might +1, agility +1
    simulateLevelUp(char, classData, 2);
    simulateLevelUp(char, classData, 3);
    simulateLevelUp(char, classData, 4);
    assert.ok(char.class.characteristics.might > mightBefore);
    assert.ok(char.class.characteristics.agility > agilityBefore);
  });

  it('caps characteristics at max from charBumps', () => {
    const char = buildLevel1({ classId: 'fury', charArrayIndex: 0 });
    const classData = DS.Data.Classes.fury;
    // Level up through 4 (max 3), 7 (max 4), 10 (max 5)
    for (let lvl = 2; lvl <= 10; lvl++) {
      simulateLevelUp(char, classData, lvl);
    }
    // At level 10, max is 5 for might and agility
    assert.ok(char.class.characteristics.might <= 5);
    assert.ok(char.class.characteristics.agility <= 5);
  });

  it('adds heroic ability to correct cost bucket', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    // Level 3 has 7-Ferocity Ability
    simulateLevelUp(char, classData, 2);
    simulateLevelUp(char, classData, 3);
    // Check that a 7-cost ability was added
    const ha7 = char.class.heroicAbilities[7] || [];
    assert.ok(ha7.length > 0, 'Should have a 7-cost heroic ability after level 3');
  });

  it('picks perk when advancement has Perk feature', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    // Level 2 has 'Perk'
    simulateLevelUp(char, classData, 2);
    assert.ok(char.class.levelChoices[2].perk, 'Should have picked a perk at level 2');
  });

  it('picks skill when advancement has Skill feature', () => {
    const char = buildLevel1({ classId: 'fury' });
    const classData = DS.Data.Classes.fury;
    // Level 4 has 'Skill'
    for (let lvl = 2; lvl <= 4; lvl++) {
      simulateLevelUp(char, classData, lvl);
    }
    assert.ok(char.class.levelChoices[4].skill, 'Should have picked a skill at level 4');
  });

  it('recomputes stats after level-up', () => {
    const char = buildLevel1({ classId: 'fury', kitId: 'panther' });
    const staminaBefore = char.computed.stamina;
    const classData = DS.Data.Classes.fury;
    // Level up to 4 (echelon boundary) — stamina should increase due to kit scaling
    for (let lvl = 2; lvl <= 4; lvl++) {
      simulateLevelUp(char, classData, lvl);
    }
    assert.ok(char.computed.stamina > staminaBefore);
  });
});
