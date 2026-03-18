const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1 } = require('../helpers');

describe('Class × Subclass × Characteristic Array', () => {
  const classIds = Object.keys(DS.Data.Classes);

  classIds.forEach(classId => {
    const cls = DS.Data.Classes[classId];

    describe(cls.name, () => {
      cls.subclasses.forEach(sub => {
        cls.characteristicArrays.forEach((arr, arrIdx) => {
          it(`${sub.name} / ${arr.label || arr.id} — valid level-1 stats`, () => {
            const char = buildLevel1({
              classId,
              subclassId: sub.id,
              charArrayIndex: arrIdx,
              kitId: 'panther'
            });

            // Verify characteristics match the array
            assert.equal(char.class.characteristics.might, arr.might);
            assert.equal(char.class.characteristics.agility, arr.agility);
            assert.equal(char.class.characteristics.reason, arr.reason);
            assert.equal(char.class.characteristics.intuition, arr.intuition);
            assert.equal(char.class.characteristics.presence, arr.presence);

            // Verify subclass is set
            assert.equal(char.class.subclass, sub.id);

            // Computed stats are valid
            assert.ok(char.computed.stamina > 0, 'stamina > 0');
            assert.ok(char.computed.speed > 0, 'speed > 0');
            assert.ok(char.computed.recoveries > 0, 'recoveries > 0');

            // Signature abilities count
            if (cls.signatureAbilityCount === 0) {
              assert.equal(char.class.signatureAbilities.length, 0);
            } else {
              assert.equal(char.class.signatureAbilities.length, cls.signatureAbilityCount,
                `expected ${cls.signatureAbilityCount} signature abilities`);
            }
          });
        });
      });
    });
  });
});
