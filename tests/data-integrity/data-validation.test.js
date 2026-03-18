const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');

describe('Data Integrity', () => {

  describe('Ancestries', () => {
    it('has 12 ancestries', () => {
      assert.equal(DS.Data.Ancestries.length, 12);
    });

    DS.Data.Ancestries.forEach(ancestry => {
      describe(ancestry.name, () => {
        it('has required fields', () => {
          assert.ok(ancestry.id, 'missing id');
          assert.ok(ancestry.name, 'missing name');
          assert.ok(ancestry.size, 'missing size');
          assert.ok(typeof ancestry.speed === 'number', 'speed must be a number');
          assert.ok(typeof ancestry.ancestryPoints === 'number', 'ancestryPoints must be a number');
          assert.ok(ancestry.signatureTrait, 'missing signatureTrait');
          assert.ok(Array.isArray(ancestry.purchasedTraits), 'purchasedTraits must be an array');
        });

        it('size follows 1X pattern', () => {
          assert.match(ancestry.size, /^1[SMLT]$/);
        });

        it('ancestry points are 2-4', () => {
          assert.ok(ancestry.ancestryPoints >= 2 && ancestry.ancestryPoints <= 4,
            `ancestryPoints ${ancestry.ancestryPoints} out of range 2-4`);
        });

        it('all purchased traits have id, name, cost', () => {
          ancestry.purchasedTraits.forEach(t => {
            assert.ok(t.id, `trait missing id in ${ancestry.name}`);
            assert.ok(t.name, `trait missing name in ${ancestry.name}`);
            assert.ok(typeof t.cost === 'number' && t.cost >= 1, `trait ${t.id} cost must be >= 1`);
          });
        });

        it('no duplicate trait IDs', () => {
          const ids = ancestry.purchasedTraits.map(t => t.id);
          assert.equal(ids.length, new Set(ids).size, 'duplicate trait IDs');
        });
      });
    });
  });

  describe('Classes', () => {
    const classIds = Object.keys(DS.Data.Classes);

    it('has 9 classes', () => {
      assert.equal(classIds.length, 9);
    });

    classIds.forEach(classId => {
      const cls = DS.Data.Classes[classId];

      describe(cls.name, () => {
        it('has required fields', () => {
          assert.ok(cls.id, 'missing id');
          assert.ok(cls.name, 'missing name');
          assert.ok(typeof cls.staminaBase === 'number', 'staminaBase must be a number');
          assert.ok(typeof cls.recoveries === 'number', 'recoveries must be a number');
          assert.ok(Array.isArray(cls.characteristicArrays), 'characteristicArrays must be an array');
          assert.ok(cls.characteristicArrays.length > 0, 'must have at least one characteristic array');
          assert.ok(cls.advancement, 'missing advancement table');
        });

        it('has advancement entries for levels 1-10', () => {
          for (let lvl = 1; lvl <= 10; lvl++) {
            assert.ok(cls.advancement[lvl], `missing advancement for level ${lvl}`);
            assert.ok(Array.isArray(cls.advancement[lvl].features), `level ${lvl} features must be an array`);
          }
        });

        it('characteristic arrays have all 5 stats', () => {
          const stats = ['might', 'agility', 'reason', 'intuition', 'presence'];
          cls.characteristicArrays.forEach(arr => {
            stats.forEach(stat => {
              assert.ok(typeof arr[stat] === 'number', `array ${arr.id} missing ${stat}`);
            });
          });
        });

        it('heroicAbilities keys are valid costs', () => {
          if (cls.heroicAbilities) {
            const validCosts = ['3', '5', '7', '9', '11'];
            Object.keys(cls.heroicAbilities).forEach(cost => {
              assert.ok(validCosts.includes(String(cost)),
                `invalid heroic ability cost: ${cost}`);
            });
          }
        });

        it('heroicAbilities at each cost are arrays', () => {
          if (cls.heroicAbilities) {
            Object.values(cls.heroicAbilities).forEach(abilities => {
              assert.ok(Array.isArray(abilities));
            });
          }
        });

        it('has subclasses', () => {
          assert.ok(Array.isArray(cls.subclasses), 'subclasses must be an array');
          assert.ok(cls.subclasses.length > 0, 'must have at least one subclass');
        });

        it('subclasses have id and name', () => {
          cls.subclasses.forEach(sub => {
            assert.ok(sub.id, `subclass missing id`);
            assert.ok(sub.name, `subclass missing name`);
          });
        });

        it('signatureAbilities is an array', () => {
          assert.ok(Array.isArray(cls.signatureAbilities), 'signatureAbilities must be an array');
        });

        it('signatureAbilityCount matches or is less than available', () => {
          if (cls.signatureAbilityCount > 0) {
            assert.ok(cls.signatureAbilities.length >= cls.signatureAbilityCount,
              `only ${cls.signatureAbilities.length} signature abilities but count is ${cls.signatureAbilityCount}`);
          }
        });
      });
    });
  });

  describe('Kits', () => {
    it('has kits loaded', () => {
      assert.ok(DS.Data.Kits.length > 0);
    });

    DS.Data.Kits.forEach(kit => {
      it(`${kit.name} has required fields`, () => {
        assert.ok(kit.id, 'missing id');
        assert.ok(kit.name, 'missing name');
        assert.ok(typeof kit.staminaPerEchelon === 'number', 'staminaPerEchelon must be a number');
        assert.ok(typeof kit.speed === 'number' || kit.speed === undefined, 'speed must be a number or undefined');
        assert.ok(typeof kit.stability === 'number' || kit.stability === undefined, 'stability must be a number or undefined');
      });
    });

    it('no duplicate kit IDs', () => {
      const ids = DS.Data.Kits.map(k => k.id);
      assert.equal(ids.length, new Set(ids).size, 'duplicate kit IDs found');
    });
  });

  describe('Careers', () => {
    it('has careers loaded', () => {
      assert.ok(DS.Data.Careers.length > 0);
    });

    DS.Data.Careers.forEach(career => {
      it(`${career.name} has required fields`, () => {
        assert.ok(career.id, 'missing id');
        assert.ok(career.name, 'missing name');
        assert.ok(career.skills, 'missing skills');
      });
    });

    it('no duplicate career IDs', () => {
      const ids = DS.Data.Careers.map(c => c.id);
      assert.equal(ids.length, new Set(ids).size, 'duplicate career IDs');
    });

    it('career skill group references are valid', () => {
      const validGroups = Object.keys(DS.Data.Skills);
      DS.Data.Careers.forEach(career => {
        if (career.skills.choices && typeof career.skills.choices.from === 'string') {
          assert.ok(validGroups.includes(career.skills.choices.from),
            `${career.name}: invalid skill group "${career.skills.choices.from}"`);
        }
        if (career.skills.choices && Array.isArray(career.skills.choices.from)) {
          career.skills.choices.from.forEach(g => {
            assert.ok(validGroups.includes(g),
              `${career.name}: invalid skill group "${g}"`);
          });
        }
        if (career.skills.choices2 && typeof career.skills.choices2.from === 'string') {
          assert.ok(validGroups.includes(career.skills.choices2.from),
            `${career.name}: invalid skill group "${career.skills.choices2.from}"`);
        }
      });
    });
  });

  describe('Complications', () => {
    it('has complications loaded', () => {
      assert.ok(DS.Data.Complications.length > 0);
    });

    it('all complications have id and name', () => {
      DS.Data.Complications.forEach(c => {
        assert.ok(c.id !== undefined && c.id !== null, 'missing id');
        assert.ok(c.name, 'missing name');
      });
    });

    it('no duplicate complication IDs', () => {
      const ids = DS.Data.Complications.map(c => c.id);
      assert.equal(ids.length, new Set(ids).size, 'duplicate complication IDs');
    });

    it('no duplicate complication names', () => {
      const names = DS.Data.Complications.map(c => c.name);
      assert.equal(names.length, new Set(names).size, 'duplicate complication names');
    });
  });

  describe('Perks', () => {
    it('has perk categories', () => {
      const categories = Object.keys(DS.Data.Perks);
      assert.ok(categories.length > 0);
    });

    Object.keys(DS.Data.Perks).forEach(cat => {
      it(`${cat} perks have id, name, type`, () => {
        DS.Data.Perks[cat].forEach(p => {
          assert.ok(p.id, `perk missing id in ${cat}`);
          assert.ok(p.name, `perk missing name in ${cat}`);
          assert.ok(p.type, `perk missing type in ${cat}`);
        });
      });
    });

    it('no duplicate perk IDs across all categories', () => {
      const allIds = [];
      Object.values(DS.Data.Perks).forEach(perks => {
        perks.forEach(p => allIds.push(p.id));
      });
      assert.equal(allIds.length, new Set(allIds).size, 'duplicate perk IDs');
    });
  });

  describe('Skills', () => {
    it('has skill groups', () => {
      const groups = Object.keys(DS.Data.Skills);
      assert.ok(groups.length >= 5);
      assert.ok(groups.includes('crafting'));
      assert.ok(groups.includes('exploration'));
      assert.ok(groups.includes('interpersonal'));
      assert.ok(groups.includes('intrigue'));
      assert.ok(groups.includes('lore'));
    });

    it('AllSkills is populated and sorted', () => {
      assert.ok(DS.Data.AllSkills.length > 0);
      const sorted = [...DS.Data.AllSkills].sort();
      assert.deepEqual(DS.Data.AllSkills, sorted);
    });

    it('no duplicate skills in AllSkills', () => {
      assert.equal(DS.Data.AllSkills.length, new Set(DS.Data.AllSkills).size);
    });
  });

  describe('Languages', () => {
    it('includes Caelian', () => {
      assert.ok(DS.Data.Languages.includes('Caelian'));
    });

    it('has multiple languages', () => {
      assert.ok(DS.Data.Languages.length > 10);
    });
  });

  describe('Cultures', () => {
    it('has environments', () => {
      assert.ok(DS.Data.Cultures.environments.length > 0);
    });

    it('has organizations', () => {
      assert.ok(DS.Data.Cultures.organizations.length > 0);
    });

    it('has upbringings', () => {
      assert.ok(DS.Data.Cultures.upbringings.length > 0);
    });

    it('environment skill groups are valid', () => {
      const validGroups = Object.keys(DS.Data.Skills);
      DS.Data.Cultures.environments.forEach(env => {
        (env.skillGroups || []).forEach(g => {
          assert.ok(validGroups.includes(g), `${env.name}: invalid skill group "${g}"`);
        });
      });
    });

    it('organization skill groups are valid', () => {
      const validGroups = Object.keys(DS.Data.Skills);
      DS.Data.Cultures.organizations.forEach(org => {
        (org.skillGroups || []).forEach(g => {
          assert.ok(validGroups.includes(g), `${org.name}: invalid skill group "${g}"`);
        });
      });
    });

    it('upbringing skill groups are valid', () => {
      const validGroups = Object.keys(DS.Data.Skills);
      DS.Data.Cultures.upbringings.forEach(up => {
        (up.skillGroups || []).forEach(g => {
          assert.ok(validGroups.includes(g), `${up.name}: invalid skill group "${g}"`);
        });
      });
    });
  });

  describe('Cross-references', () => {
    it('class free skills exist in AllSkills', () => {
      Object.values(DS.Data.Classes).forEach(cls => {
        (cls.freeSkills || []).forEach(skill => {
          assert.ok(DS.Data.AllSkills.includes(skill),
            `${cls.name} freeSkill "${skill}" not in AllSkills`);
        });
      });
    });

    it('class skill groups are valid', () => {
      const validGroups = Object.keys(DS.Data.Skills);
      Object.values(DS.Data.Classes).forEach(cls => {
        (cls.classSkillGroups || []).forEach(g => {
          assert.ok(validGroups.includes(g),
            `${cls.name}: invalid class skill group "${g}"`);
        });
      });
    });
  });
});
