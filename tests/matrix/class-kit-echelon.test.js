const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1 } = require('../helpers');

describe('Class × Kit × Echelon Matrix', () => {
  const classIds = Object.keys(DS.Data.Classes);
  const echelonLevels = [1, 4, 7, 10]; // boundary levels for echelons 1-4

  classIds.forEach(classId => {
    describe(DS.Data.Classes[classId].name, () => {
      DS.Data.Kits.forEach(kit => {
        describe(`with ${kit.name}`, () => {
          echelonLevels.forEach(level => {
            it(`level ${level} (echelon ${DS.Calculator.getEchelon(level)}) — valid stats`, () => {
              const char = buildLevel1({ classId, kitId: kit.id });
              char.level = level;
              char.computed = DS.Calculator.compute(char);

              assert.ok(char.computed.stamina > 0,
                `stamina should be > 0, got ${char.computed.stamina}`);
              assert.equal(char.computed.winded, Math.floor(char.computed.stamina / 2),
                'winded should be floor(stamina/2)');
              assert.equal(char.computed.recoveryValue, Math.floor(char.computed.stamina / 3),
                'recoveryValue should be floor(stamina/3)');
              assert.ok(char.computed.speed > 0,
                `speed should be > 0, got ${char.computed.speed}`);
              assert.ok(char.computed.recoveries > 0,
                `recoveries should be > 0, got ${char.computed.recoveries}`);
            });
          });
        });
      });
    });
  });
});
