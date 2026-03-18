const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1 } = require('../helpers');

describe('DS.Calculator', () => {

  describe('getEchelon()', () => {
    const cases = [
      [1, 1], [2, 1], [3, 1],
      [4, 2], [5, 2], [6, 2],
      [7, 3], [8, 3], [9, 3],
      [10, 4]
    ];
    cases.forEach(([level, expected]) => {
      it(`level ${level} → echelon ${expected}`, () => {
        assert.equal(DS.Calculator.getEchelon(level), expected);
      });
    });
  });

  describe('stamina calculation', () => {
    it('stamina = classBase + might + (kitStaminaPerEchelon × echelon)', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'panther' });
      const classData = DS.Data.Classes.fury;
      const kit = DS.Data.Kits.find(k => k.id === 'panther');
      const might = char.class.characteristics.might;
      const expected = classData.staminaBase + might + kit.staminaPerEchelon * 1;
      assert.equal(char.computed.stamina, expected);
    });

    it('stamina scales with echelon', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'panther' });
      const kit = DS.Data.Kits.find(k => k.id === 'panther');
      const staminaAt1 = char.computed.stamina;

      char.level = 4; // echelon 2
      char.computed = DS.Calculator.compute(char);
      const staminaAt4 = char.computed.stamina;

      assert.equal(staminaAt4 - staminaAt1, kit.staminaPerEchelon);
    });

    it('stamina with no class or kit is 0', () => {
      const char = DS.State.createBlank();
      const computed = DS.Calculator.compute(char);
      assert.equal(computed.stamina, 0);
    });
  });

  describe('winded and recoveryValue', () => {
    it('winded = floor(stamina / 2)', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'panther' });
      assert.equal(char.computed.winded, Math.floor(char.computed.stamina / 2));
    });

    it('recoveryValue = floor(stamina / 3)', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'panther' });
      assert.equal(char.computed.recoveryValue, Math.floor(char.computed.stamina / 3));
    });
  });

  describe('speed', () => {
    it('ancestry speed overrides base + kit speed', () => {
      // Calculator: speed starts at 5, + kit.speed, then ancestry.speed replaces entirely
      const char = buildLevel1({ classId: 'fury', kitId: 'panther', ancestryId: 'human' });
      const ancestry = DS.Data.Ancestries.find(a => a.id === 'human');
      // Ancestry speed replaces accumulated speed
      assert.equal(char.computed.speed, ancestry.speed);
    });

    it('speed override from purchased trait replaces base', () => {
      const char = buildLevel1({
        classId: 'fury', kitId: 'panther', ancestryId: 'devil',
        purchasedTraits: [{ id: 'beast_legs' }]
      });
      // beast_legs has speedOverride: 6
      const kit = DS.Data.Kits.find(k => k.id === 'panther');
      // Speed = 6 (override) — but kit speed is added before ancestry override
      // Looking at calculator: speed starts 5, +kit.speed, then ancestry overrides to ancestry.speed,
      // then trait speedOverride replaces speed
      assert.equal(char.computed.speed, 6);
    });

    it('ancestry speed replaces kit speed bonus', () => {
      // Calculator: speed = 5, + kit.speed, then ancestry.speed replaces entirely
      // So kit speed is lost when ancestry overrides
      const char = buildLevel1({ classId: 'fury', kitId: 'martial_artist', ancestryId: 'human' });
      const ancestry = DS.Data.Ancestries.find(a => a.id === 'human');
      assert.equal(char.computed.speed, ancestry.speed);
    });
  });

  describe('stability', () => {
    it('includes kit stability', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'mountain', ancestryId: 'human' });
      const kit = DS.Data.Kits.find(k => k.id === 'mountain');
      assert.ok(char.computed.stability >= kit.stability);
    });

    it('includes trait stability bonus', () => {
      const char = buildLevel1({
        classId: 'fury', kitId: 'panther', ancestryId: 'dwarf',
        purchasedTraits: [{ id: 'grounded' }]
      });
      assert.ok(char.computed.stability >= 1);
    });
  });

  describe('ancestry trait bonuses', () => {
    it('staminaBonus trait adds stamina scaled by echelon', () => {
      const charWith = buildLevel1({
        classId: 'fury', kitId: 'panther', ancestryId: 'dwarf',
        purchasedTraits: [{ id: 'spark_off_skin' }]
      });
      const charWithout = buildLevel1({
        classId: 'fury', kitId: 'panther', ancestryId: 'dwarf',
        purchasedTraits: []
      });
      // spark_off_skin has staminaBonus: 6, echelon 1 → +6
      assert.equal(charWith.computed.stamina - charWithout.computed.stamina, 6);
    });

    it('staminaBonus scales at higher echelons', () => {
      const char = buildLevel1({
        classId: 'fury', kitId: 'panther', ancestryId: 'dwarf',
        purchasedTraits: [{ id: 'spark_off_skin' }]
      });
      const staminaAt1 = char.computed.stamina;
      char.level = 4; // echelon 2
      char.computed = DS.Calculator.compute(char);
      // At echelon 2, staminaBonus adds 6*2=12 instead of 6*1=6, so +6 more
      const kit = DS.Data.Kits.find(k => k.id === 'panther');
      // Also kit stamina scales, so total increase is kitStamina + 6
      assert.equal(char.computed.stamina - staminaAt1, kit.staminaPerEchelon + 6);
    });
  });

  describe('size', () => {
    it('strips leading 1 from ancestry size', () => {
      const char = buildLevel1({ classId: 'fury', ancestryId: 'human' });
      assert.equal(char.computed.size, 'M');
    });

    it('hakaan is L size', () => {
      const char = buildLevel1({ classId: 'fury', ancestryId: 'hakaan' });
      assert.equal(char.computed.size, 'L');
    });

    it('polder is S size', () => {
      const char = buildLevel1({ classId: 'fury', ancestryId: 'polder' });
      assert.equal(char.computed.size, 'S');
    });
  });

  describe('skills aggregation', () => {
    it('includes culture skills', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.skills.includes('Navigate'));
      assert.ok(char.computed.skills.includes('History'));
    });

    it('includes career skills', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.skills.includes('Alertness'));
      assert.ok(char.computed.skills.includes('Endurance'));
    });

    it('includes class free skills', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.skills.includes('Nature'));
    });

    it('skills are sorted alphabetically', () => {
      const char = buildLevel1({ classId: 'fury' });
      const skills = char.computed.skills;
      const sorted = [...skills].sort();
      assert.deepEqual(skills, sorted);
    });

    it('skills are deduplicated', () => {
      const char = buildLevel1({ classId: 'fury' });
      const skills = char.computed.skills;
      const unique = [...new Set(skills)];
      assert.equal(skills.length, unique.length);
    });
  });

  describe('languages', () => {
    it('always includes Caelian', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.languages.includes('Caelian'));
    });

    it('includes culture language', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.languages.includes('Anjal'));
    });

    it('includes career languages', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.ok(char.computed.languages.includes('Higaran'));
    });

    it('languages are sorted', () => {
      const char = buildLevel1({ classId: 'fury' });
      const langs = char.computed.languages;
      assert.deepEqual(langs, [...langs].sort());
    });
  });

  describe('recoveries', () => {
    it('fury has 10 recoveries', () => {
      const char = buildLevel1({ classId: 'fury' });
      assert.equal(char.computed.recoveries, DS.Data.Classes.fury.recoveries);
    });

    it('conduit has 8 recoveries', () => {
      const char = buildLevel1({ classId: 'conduit' });
      assert.equal(char.computed.recoveries, DS.Data.Classes.conduit.recoveries);
    });
  });

  describe('empty/null character', () => {
    it('computes without crashing on blank character', () => {
      const char = DS.State.createBlank();
      assert.doesNotThrow(() => {
        DS.Calculator.compute(char);
      });
    });

    it('blank character produces valid defaults', () => {
      const char = DS.State.createBlank();
      const computed = DS.Calculator.compute(char);
      assert.equal(computed.stamina, 0);
      assert.equal(computed.speed, 5);
      assert.equal(computed.stability, 0);
      assert.equal(computed.size, 'M');
      assert.deepEqual(computed.languages, ['Caelian']);
    });
  });

  describe('kit damage bonuses', () => {
    it('melee damage bonus from kit', () => {
      const char = buildLevel1({ classId: 'fury', kitId: 'mountain' });
      const kit = DS.Data.Kits.find(k => k.id === 'mountain');
      assert.equal(char.computed.meleeDamageBonus, kit.meleeDamage);
    });

    it('ranged damage bonus from kit', () => {
      const char = buildLevel1({ classId: 'conduit', kitId: 'rapid_fire' });
      const kit = DS.Data.Kits.find(k => k.id === 'rapid_fire');
      assert.equal(char.computed.rangedDamageBonus, kit.rangedDamage);
    });
  });
});
