const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1, generateValidTraitCombos } = require('../helpers');

describe('Ancestry × Trait Combos', () => {
  DS.Data.Ancestries.forEach(ancestry => {
    describe(ancestry.name, () => {
      it('has required ancestry fields', () => {
        assert.ok(ancestry.id);
        assert.ok(ancestry.name);
        assert.ok(ancestry.size);
        assert.ok(typeof ancestry.speed === 'number');
        assert.ok(typeof ancestry.ancestryPoints === 'number');
        assert.ok(Array.isArray(ancestry.purchasedTraits));
      });

      const combos = generateValidTraitCombos(ancestry);

      // Test a sample of combos (empty, a couple with traits)
      const sampled = combos.length <= 5 ? combos : [
        combos[0],  // empty
        combos[1],  // single trait
        combos[Math.floor(combos.length / 2)],  // mid
        combos[combos.length - 1]  // last
      ];

      sampled.forEach((combo, idx) => {
        const comboDesc = combo.length === 0 ? 'no traits' :
          combo.map(t => t.id).join('+');

        it(`trait combo: ${comboDesc} — computes valid stats`, () => {
          const char = buildLevel1({
            classId: 'fury',
            kitId: 'panther',
            ancestryId: ancestry.id,
            purchasedTraits: combo
          });

          // Size should match ancestry
          assert.equal(char.computed.size, ancestry.size.replace(/^1/, ''));

          // Speed should be valid
          assert.ok(char.computed.speed > 0, `speed should be > 0`);

          // Check trait bonuses apply
          combo.forEach(traitRef => {
            const traitData = ancestry.purchasedTraits.find(t => t.id === traitRef.id);
            if (traitData && traitData.speedOverride) {
              assert.equal(char.computed.speed, traitData.speedOverride,
                `speed override from ${traitData.name} not applied`);
            }
          });

          // Stamina should be positive
          assert.ok(char.computed.stamina > 0);
        });
      });

      it('trait combos within budget', () => {
        combos.forEach(combo => {
          const totalCost = combo.reduce((sum, t) => sum + t.cost, 0);
          assert.ok(totalCost <= ancestry.ancestryPoints,
            `combo cost ${totalCost} exceeds budget ${ancestry.ancestryPoints}`);
        });
      });
    });
  });
});
