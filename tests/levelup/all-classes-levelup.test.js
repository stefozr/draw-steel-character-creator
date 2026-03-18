const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1, simulateLevelUp } = require('../helpers');

describe('Full Level-Up Paths (1 → 10)', () => {
  const classIds = Object.keys(DS.Data.Classes);

  classIds.forEach(classId => {
    const cls = DS.Data.Classes[classId];

    cls.subclasses.forEach(sub => {
      it(`${cls.name} / ${sub.name} — full 1→10 path`, () => {
        const char = buildLevel1({
          classId,
          subclassId: sub.id,
          charArrayIndex: 0,
          kitId: 'panther'
        });

        assert.equal(char.level, 1);

        for (let lvl = 2; lvl <= 10; lvl++) {
          assert.doesNotThrow(() => {
            simulateLevelUp(char, cls, lvl);
          }, `level-up to ${lvl} should not throw`);

          // Level was incremented
          assert.equal(char.level, lvl, `level should be ${lvl}`);

          // Characteristics never exceed the max for this level's bumps
          // (we check against the highest max seen so far)
          const maxSoFar = getMaxCharacteristicCap(cls, lvl);
          ['might', 'agility', 'reason', 'intuition', 'presence'].forEach(stat => {
            assert.ok(char.class.characteristics[stat] <= maxSoFar,
              `${stat} (${char.class.characteristics[stat]}) exceeds max ${maxSoFar} at level ${lvl}`);
          });

          // No duplicate skills in computed
          const skills = char.computed.skills;
          assert.equal(skills.length, new Set(skills).size,
            `duplicate skills at level ${lvl}: ${skills.join(', ')}`);

          // levelChoices for this level is populated
          assert.ok(char.class.levelChoices[lvl] !== undefined,
            `levelChoices[${lvl}] should be populated`);

          // All computed stats are positive and consistent
          assert.ok(char.computed.stamina > 0, `stamina should be > 0 at level ${lvl}`);
          assert.ok(char.computed.speed > 0, `speed should be > 0 at level ${lvl}`);
          assert.equal(char.computed.winded, Math.floor(char.computed.stamina / 2));
          assert.equal(char.computed.recoveryValue, Math.floor(char.computed.stamina / 3));
        }

        // At level 10 — final checks
        assert.equal(char.level, 10);

        // Heroic abilities should be populated across cost tiers
        const ha = char.class.heroicAbilities;
        const totalHA = Object.values(ha).reduce((sum, arr) => sum + arr.length, 0);
        assert.ok(totalHA > 0, 'should have heroic abilities at level 10');

        // No duplicate heroic abilities across all cost tiers
        const allHANames = [];
        Object.values(ha).forEach(arr => {
          arr.forEach(name => { if (name) allHANames.push(name); });
        });
        assert.equal(allHANames.length, new Set(allHANames).size,
          `duplicate heroic abilities: ${allHANames.join(', ')}`);
      });
    });
  });
});

/**
 * Get the highest characteristic max cap seen up to the given level.
 */
function getMaxCharacteristicCap(cls, level) {
  let maxCap = 10; // generous default
  for (let lvl = 1; lvl <= level; lvl++) {
    const adv = cls.advancement[lvl];
    if (adv && adv.charBumps && adv.charBumps.max) {
      maxCap = adv.charBumps.max;
    }
  }
  return maxCap;
}
