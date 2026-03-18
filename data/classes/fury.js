// DS.Data.Classes.fury - Fury class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.fury = {
  id: 'fury', name: 'Fury', role: 'Striker',
  description: 'You do not temper the heat of battle within you. You unleash it. Your experience in the wild taught you the secrets of predators, and now, like the raptor, the panther, the wolf, you channel unfettered anger into martial prowess. Primordial Chaos is your ally. Let others use finesse to clean up the wreckage left in your wake. As a fury, you devastate foes with overwhelming might, hurl yourself and enemies around the battlefield, and grow stronger as your ferocity increases. Nature has no concept of fairness -- and neither do you.',
  heroicResource: 'Ferocity',
  heroicResourceDescription: 'Start combat with ferocity equal to Victories. Gain 1d3 ferocity at the start of each of your turns. The first time each combat round you take damage, gain 1 ferocity. The first time you become winded or are dying in an encounter, gain 1d3 ferocity. Lose remaining ferocity at end of encounter. Outside combat, heroic abilities can be used once without spending ferocity until you earn Victories or finish a respite. When you use an ability outside combat that lets you spend unlimited ferocity, use it as if you had spent ferocity equal to your Victories.',
  primaryCharacteristics: ['might', 'agility'],
  staminaBase: 21,
  staminaPerLevel: 9,
  recoveries: 10,
  classSkillGroups: ['exploration', 'intrigue'],
  classSkillCount: 2,
  freeSkills: ['Nature'],
  signatureAbilityCount: 1,
  subclassLabel: 'Primordial Aspect',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'growing-ferocity' },
    { section: 'signature-abilities', config: { count: 1 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Mighty Leaps', description: 'You can\'t obtain lower than a tier 2 outcome on any Might test made to jump.' }
    ],
    subclassFeatures: {
      berserker: [
        { name: 'Primordial Strength', description: 'Your weapon strikes against objects deal extra damage equal to your Might score. When you push a creature into an object, they take extra damage equal to your Might score.' },
        { name: 'Lines of Force', description: 'When you would be force moved, you can redirect it to a creature of your size or smaller within melee 1. The forced movement distance gains a bonus equal to your Might score.', tag: 'Triggered Action' }
      ],
      reaver: [
        { name: 'Primordial Cunning', description: 'You are never surprised. Whenever you push a target, you can slide them instead.' },
        { name: 'Unearthly Reflexes', description: 'When you take damage, you take half damage and can shift up to your Agility score. Spend 1 ferocity to also reduce potency by 1.', tag: 'Triggered Action' }
      ],
      stormwight: [
        { name: 'Relentless Hunter', description: 'You gain an edge on tests using the Track skill.' },
        { name: 'Furious Change', description: 'When you lose Stamina, gain temporary Stamina equal to your Might score and enter animal or hybrid form. Spend 1 ferocity to also spend a Recovery.', tag: 'Triggered Action' }
      ]
    }
  },
  characteristicArrays: [
    { id: 'fury_a', label: 'Might/Agility Focus', might: 2, agility: 2, reason: 2, intuition: -1, presence: -1 },
    { id: 'fury_b', label: 'Balanced Might', might: 2, agility: 2, reason: 1, intuition: 1, presence: -1 },
    { id: 'fury_c', label: 'Even Spread', might: 2, agility: 2, reason: 1, intuition: 0, presence: 0 }
  ],
  subclasses: [
    { id: 'berserker', name: 'Berserker', description: 'You channel your ferocity into physical might, acting as a living version of the forces that shape the world. Grants aspect features at levels 1, 2, 3, 5, and 8 plus aspect abilities at levels 2, 6, and 9.', skill: 'Lift' },
    { id: 'reaver', name: 'Reaver', description: 'You channel your ferocity into instinct and cunning, challenging the order of civilization. Grants aspect features at levels 1, 2, 3, 5, and 8 plus aspect abilities at levels 2, 6, and 9.', skill: 'Hide' },
    { id: 'stormwight', name: 'Stormwight', description: 'You channel your ferocity into primordial storms and can take on the form of an animal or an animal hybrid form. Grants aspect features at levels 1, 2, 3, 5, and 8 plus aspect abilities at levels 2, 6, and 9.', skill: 'Track' }
  ],
  signatureAbilities: [
    {
      name: 'Brutal Slam', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'The heavy impact of your weapon attacks drives your foes ever back.',
      powerRoll: { characteristic: 'Might', t1: '3 + M damage; push 1', t2: '6 + M damage; push 2', t3: '9 + M damage; push 4' }
    },
    {
      name: 'Hit and Run', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'Staying in constant motion helps you slip out of reach after a brutal assault.',
      powerRoll: { characteristic: 'Might', t1: '2 + M damage', t2: '5 + M damage', t3: '7 + M damage; A<strong, slowed (save ends)' },
      effect: 'You can shift 1 square.'
    },
    {
      name: 'Impaled!', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature of your size or smaller',
      flavor: 'You skewer your enemy like a boar upon a spit.',
      powerRoll: { characteristic: 'Might', t1: '2 + M damage; M<weak, grabbed', t2: '5 + M damage; M<avg, grabbed', t3: '7 + M damage; M<strong, grabbed' }
    },
    {
      name: 'To the Death!', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'Your reckless assault leaves you tactically vulnerable.',
      powerRoll: { characteristic: 'Might', t1: '3 + M damage', t2: '6 + M damage', t3: '9 + M damage' },
      effect: 'You gain 2 surges, and the target can make an opportunity attack against you as a free triggered action.'
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Back!', cost: 3, resource: 'Ferocity', keywords: ['Area', 'Melee', 'Weapon'], type: 'Main action',
        distance: '1 burst', target: 'Each enemy in the area',
        flavor: 'You hew about you with your mighty weapon, hurling enemies backward.',
        powerRoll: { characteristic: 'Might', t1: '5 damage', t2: '8 damage; push 1', t3: '11 damage; push 3' }
      },
      {
        name: 'Out of the Way!', cost: 3, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Your enemies will clear your path -- whether they want to or not.',
        powerRoll: { characteristic: 'Might', t1: '3 + M damage; slide 2', t2: '5 + M damage; slide 3', t3: '8 + M damage; slide 5' },
        effect: 'When you slide the target, you can move into any square they leave. If you take damage from an opportunity attack by moving this way, the target takes the same damage.'
      },
      {
        name: 'Tide of Death', cost: 3, resource: 'Ferocity', keywords: ['Melee', 'Weapon'], type: 'Main action',
        distance: 'Self; see below', target: 'Self',
        flavor: 'Teach them the folly of lining up for you.',
        effect: 'You move up to your speed in a straight line, and enemy squares are not difficult terrain for this movement. You can end this movement in a creature\'s space and move them to an adjacent unoccupied space. You make one power roll that targets each enemy whose space you move through.',
        powerRoll: { characteristic: 'Might', t1: '2 damage', t2: '3 damage', t3: '5 damage' },
        effect2: 'The last target you damage takes extra damage equal to your Might score for each opportunity attack you trigger during your move.'
      },
      {
        name: 'Your Entrails Are Your Extrails!', cost: 3, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'Hard for them to fight when they\'re busy holding in their giblets.',
        powerRoll: { characteristic: 'Might', t1: '3 + M damage; M<weak, bleeding (save ends)', t2: '5 + M damage; M<avg, bleeding (save ends)', t3: '8 + M damage; M<strong, bleeding (save ends)' },
        effect: 'While bleeding this way, the target takes damage equal to your Might score at the end of each of your turns.'
      }
    ],
    5: [
      {
        name: 'Blood for Blood!', cost: 5, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'See how well they fight after you\'ve bled them dry.',
        powerRoll: { characteristic: 'Might', t1: '4 + M damage; M<weak, bleeding and weakened (save ends)', t2: '6 + M damage; M<avg, bleeding and weakened (save ends)', t3: '10 + M damage; M<strong, bleeding and weakened (save ends)' },
        effect: 'You can deal 1d6 damage to yourself to deal an extra 1d6 damage to the target.'
      },
      {
        name: 'Make Peace With Your God!', cost: 5, resource: 'Ferocity', keywords: [], type: 'Free maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Anger is your energy.',
        effect: 'You gain 1 surge, and the next ability roll you make this turn automatically obtains a tier 3 outcome.'
      },
      {
        name: 'Thunder Roar', cost: 5, resource: 'Ferocity', keywords: ['Area', 'Melee', 'Weapon'], type: 'Main action',
        distance: '5 x 1 line within 1', target: 'Each enemy in the area',
        flavor: 'You unleash a howl that hurls your enemies back.',
        powerRoll: { characteristic: 'Might', t1: '6 damage; push 2', t2: '9 damage; push 4', t3: '13 damage; push 6' },
        effect: 'The targets are force moved one at a time, starting with the target nearest to you, and can be pushed into other targets in the same line.'
      },
      {
        name: 'To the Uttermost End', cost: 5, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You gut your life force to ensure a foe\'s demise.',
        powerRoll: { characteristic: 'Might', t1: '7 + M damage', t2: '11 + M damage', t3: '16 + M damage' },
        spend: 'Spend 1+ Ferocity: While you are winded, this ability deals an extra 1d6 damage for each ferocity spent. While you are dying, it deals an extra 1d10 damage for each ferocity spent. In either case, you lose 1d6 Stamina after making this strike.'
      }
    ],
    7: [
      {
        name: 'Demon Unleashed', cost: 7, resource: 'Ferocity', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Foes tremble at the sight of you.',
        effect: 'Until end of encounter or until dying, each enemy who starts their turn adjacent to you and has P<strong is frightened until end of their turn.'
      },
      {
        name: 'Face the Storm!', cost: 7, resource: 'Ferocity', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Shocked in the face of your naked brutality, your enemy\'s instincts take over.',
        effect: 'Until end of encounter or until dying, each creature you make a melee strike against who has P<avg is taunted until end of their next turn. Additionally, when you use an ability that deals rolled damage against any enemy taunted by you, the ability deals extra damage equal to twice your Might score and increases its potency by 1.'
      },
      {
        name: 'Steelbreaker', cost: 7, resource: 'Ferocity', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'See how useless their weapons are!',
        effect: 'You gain 20 temporary Stamina.'
      },
      {
        name: 'You Are Already Dead', cost: 7, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Slash. Walk away.',
        effect: 'If the target is not a leader or solo creature, they are reduced to 0 Stamina at the end of their next turn. If the target is a leader or solo creature, you gain 3 surges and can make a melee free strike against them.'
      }
    ],
    9: [
      {
        name: 'Debilitating Strike', cost: 9, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You need just one blow to sabotage your target.',
        powerRoll: { characteristic: 'Might', t1: '10 + M damage; M<weak, slowed (save ends)', t2: '14 + M damage; M<avg, slowed (save ends)', t3: '20 + M damage; M<strong, slowed (save ends)' },
        effect: 'While slowed this way, the target takes 1 damage for every square they move, including from forced movement.'
      },
      {
        name: 'My Turn!', cost: 9, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Free triggered',
        distance: 'Melee 1', target: 'The triggering creature',
        flavor: 'You quickly strike back at a foe.',
        trigger: 'A creature causes you to be winded or dying, or damages you while you are winded or dying.',
        powerRoll: { characteristic: 'Might', t1: '6 + M damage', t2: '9 + M damage', t3: '13 + M damage' },
        effect: 'You can spend a Recovery.'
      },
      {
        name: 'Rebounding Storm', cost: 9, resource: 'Ferocity', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'Two creatures or objects',
        flavor: 'You knock around enemies like playthings.',
        powerRoll: { characteristic: 'Might', t1: '9 damage; push 3', t2: '14 damage; push 5', t3: '19 damage; push 7' },
        effect: 'When a target would end this forced movement by colliding with a creature or object, they take damage as usual, then are pushed the remaining distance away from the creature or object in the direction they came from. As long as forced movement remains, this effect continues if the target collides with another creature or object.'
      },
      {
        name: 'To Stone!', cost: 9, resource: 'Ferocity', keywords: ['Magic', 'Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You channel the Primordial Chaos into blows that petrify your foe... literally.',
        powerRoll: { characteristic: 'Might', t1: '9 + M damage; M<weak, slowed (save ends)', t2: '13 + M damage; M<avg, slowed (save ends)', t3: '18 + M damage; M<strong, restrained (save ends)' },
        effect: 'While the target is slowed this way, any other effect that would make the target slowed instead makes them restrained by this ability. Additionally, a creature restrained this way is petrified until they are given a supernatural cure or you choose to reverse the effect (no action required).'
      }
    ],
    11: [
      {
        name: 'Elemental Ferocity', cost: 11, resource: 'Ferocity', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your primordial energy makes for instant retribution.',
        effect: 'You gain 10 temporary Stamina. Additionally, choose acid, cold, corruption, fire, lightning, poison, or sonic damage. Until end of encounter or until dying, whenever an enemy damages you, they take 10 damage of the chosen type. If this damage reduces the enemy to 0 Stamina, you gain 10 temporary Stamina.'
      },
      {
        name: 'Overkill', cost: 11, resource: 'Ferocity', keywords: ['Magic', 'Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You strike so no damage is wasted.',
        powerRoll: { characteristic: 'Might', t1: '6 + M damage', t2: '10 + M damage', t3: '14 + M damage' },
        effect: 'If the target is a minion or is winded but isn\'t a leader or solo creature, they are reduced to 0 Stamina before this ability\'s damage is dealt. If the target is killed by this damage, you can deal any damage over what was required to kill them to another creature within 5 squares of the target.'
      },
      {
        name: 'Primordial Rage', cost: 11, resource: 'Ferocity', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your ferocity manifests into primordial power.',
        effect: 'Choose acid, cold, corruption, fire, lightning, poison, or sonic damage. Until end of encounter or until dying, you can choose one target of any ability you use, with that target taking an extra 15 damage of the chosen type. Additionally, whenever you gain ferocity from taking damage, the source of the damage takes 5 damage of the chosen type.'
      },
      {
        name: 'Relentless Death', cost: 11, resource: 'Ferocity', keywords: ['Magic', 'Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Self; see below', target: 'Self',
        flavor: 'You won\'t escape your fate.',
        effect: 'You shift up to your speed. Each enemy you move adjacent to during this movement takes damage equal to twice your Might score. Then make one power roll that targets each enemy you moved adjacent to during this shift. You gain 1 ferocity for each target who dies as a result of this ability (maximum 11 ferocity).',
        powerRoll: { characteristic: 'Might', t1: 'Any target whose Stamina <= 8 dies', t2: 'Any target whose Stamina <= 11 dies', t3: 'Any target whose Stamina <= 17 dies' }
      }
    ]
  },
  features: {
    'Ferocity': 'Within the heat of battle, your determination and anger grow, fueling a Heroic Resource called ferocity. Start combat with ferocity equal to Victories. Gain 1d3 at start of each turn. First time each combat round you take damage, gain 1 ferocity. First time you become winded or are dying in an encounter, gain 1d3 ferocity. Lose remaining ferocity at end of encounter. Outside combat, heroic abilities can be used once without spending ferocity until you earn Victories or finish a respite. When you use an ability outside combat that lets you spend unlimited ferocity, use it as if you had spent ferocity equal to your Victories.',
    'Growing Ferocity': 'You gain certain benefits in combat based on the amount of ferocity you have (see 1st-Level Aspect Features for details). These benefits last until end of your turn, even if a benefit would become unavailable because of the ferocity you spend during your turn. Some Growing Ferocity benefits can only be applied at specific levels or higher.',
    'Mighty Leaps': 'You can\'t obtain lower than a tier 2 outcome on any Might test made to jump.',
    'Damaging Ferocity': 'The first time you take damage each combat round, you gain 2 ferocity instead of 1.',
    'Primordial Attunement': 'You automatically sense whether any creature within 10 squares has damage immunity or weakness to acid, cold, corruption, fire, lightning, poison, or sonic damage, learning whether they have immunity or weakness, the value, and the specific damage type. You also automatically sense any source of those damage types within 10 squares.',
    'Primordial Strike': 'As part of any strike, you can spend 1 ferocity to gain 1 surge that must be used for that strike. The extra damage dealt by the surge can be acid, cold, corruption, fire, lightning, poison, or sonic (your choice).',
    'Marauder of the Primordial Chaos': 'You automatically sense any elemental creatures or magic sources of elemental power within 1 mile. You can speak with elemental creatures. When negotiating with an elemental, treat your Renown as 1 higher. When any elemental first becomes aware of you in combat, if they have P<avg, they are frightened of you (save ends).',
    'Elemental Form': 'Whenever you show strong emotion or increase ferocity, elemental motes flit around you and your skin changes to reflect an element. Berserker/Reaver: immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to Might score. Stormwight: immunity to your Primordial Storm damage type equal to twice Might score.',
    'Greater Ferocity': 'When you gain ferocity at the start of each of your turns during combat, you gain 1d3 + 1 ferocity instead of 1d3.',
    'Harbinger of the Primordial Chaos': 'You can create a temporary source of elemental power as a respite activity. This source lasts 24 hours and can be used to create a portal to Quintessence with your Primordial Portal feature. If you do so, the source lasts as long as the portal is maintained in your network.',
    'Chaos Incarnate': 'Berserker/Reaver: immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to twice Might score. Stormwight: Primordial Storm damage immunity increases to three times Might score. When any elemental or creature whose abilities deal those damage types first becomes aware of you in combat, if P<strong, they are frightened of you (save ends). When you use Primordial Strike, you can spend up to 3 ferocity, gaining 1 surge per ferocity spent.',
    'Primordial Ferocity': 'The first time you take damage each combat round, you gain 3 ferocity instead of 2.',
    'Primordial Power': 'You have an epic resource called primordial power. Each time you finish a respite, you gain primordial power equal to the XP you gain. You can spend primordial power as if it were ferocity. You can spend any amount of primordial power as a free maneuver, ending one effect on you for each primordial power spent. You can also spend 3 primordial power to create a portal to Quintessence without needing a source of elemental power. Primordial power remains until you spend it.'
  },
  advancement: {
    1: { features: ['Primordial Aspect (Subclass)', 'Ferocity', 'Growing Ferocity', 'Aspect Features', 'Aspect Triggered Action', 'Mighty Leaps', 'Fury Abilities', 'Signature Ability', '3-Ferocity Ability', '5-Ferocity Ability'] },
    2: { features: ['Perk', 'Aspect Feature', 'Aspect Ability (5-Ferocity)'] },
    3: { features: ['Aspect Feature', '7-Ferocity Ability'] },
    4: { features: ['Characteristic Increase (Might & Agility to 3)', 'Damaging Ferocity', 'Growing Ferocity Improvement', 'Perk', 'Primordial Attunement', 'Primordial Strike', 'Skill'], charBumps: { auto: { might: 1, agility: 1 }, max: 3 } },
    5: { features: ['Aspect Feature', '9-Ferocity Ability'] },
    6: { features: ['Marauder of the Primordial Chaos', 'Perk', 'Aspect Ability (9-Ferocity)'] },
    7: { features: ['Characteristic Increase (all, max 4)', 'Elemental Form', 'Greater Ferocity', 'Growing Ferocity Improvement', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Aspect Feature', '11-Ferocity Ability'] },
    9: { features: ['Harbinger of the Primordial Chaos', 'Aspect Ability (11-Ferocity)'] },
    10: { features: ['Chaos Incarnate', 'Characteristic Increase (Might & Agility to 5)', 'Growing Ferocity Improvement', 'Perk', 'Primordial Ferocity', 'Primordial Power', 'Skill'], charBumps: { auto: { might: 1, agility: 1 }, max: 5 } }
  }
};
