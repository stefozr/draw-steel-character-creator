const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');
const { buildLevel1 } = require('../helpers');

describe('Culture Combos (env × org × upbringing)', () => {
  const { environments, organizations, upbringings } = DS.Data.Cultures;

  environments.forEach(env => {
    organizations.forEach(org => {
      upbringings.forEach(up => {
        it(`${env.name} / ${org.name} / ${up.name} — valid skills`, () => {
          const char = buildLevel1({ classId: 'fury', kitId: 'panther' });

          // Override culture with this combo
          char.culture.environment = env.id;
          char.culture.organization = org.id;
          char.culture.upbringing = up.id;

          // Pick a skill from each source's skill groups
          const envSkill = pickSkillFromGroups(env.skillGroups);
          const upSkill = pickSkillFromGroups(up.skillGroups, up.specificSkills, [envSkill]);
          char.culture.skills = {};
          if (envSkill) char.culture.skills.environment = envSkill;
          if (upSkill) char.culture.skills.upbringing = upSkill;

          // Recompute
          char.computed = DS.Calculator.compute(char);

          // Verify culture skills appear in computed
          if (envSkill) {
            assert.ok(char.computed.skills.includes(envSkill),
              `environment skill "${envSkill}" not in computed skills`);
          }
          if (upSkill) {
            assert.ok(char.computed.skills.includes(upSkill),
              `upbringing skill "${upSkill}" not in computed skills`);
          }

          // Basic sanity
          assert.ok(char.computed.stamina > 0);
          assert.ok(char.computed.speed > 0);
        });
      });
    });
  });
});

function pickSkillFromGroups(groups, specificSkills, exclude) {
  exclude = exclude || [];
  // If specific skills provided, pick from those
  if (specificSkills && specificSkills.length > 0) {
    for (const s of specificSkills) {
      if (!exclude.includes(s)) return s;
    }
  }
  // Pick from skill groups
  for (const group of (groups || [])) {
    const skills = DS.Data.Skills[group] || [];
    for (const s of skills) {
      if (!exclude.includes(s)) return s;
    }
  }
  return null;
}
