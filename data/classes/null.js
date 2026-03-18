// DS.Data.Classes.null - Null class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes['null'] = {
  id: 'null', name: 'Null', role: 'Controller',
  description: 'Through extensive physical and psionic training, you have learned to unlock the full potential of your body. Your training has made you a living weapon -- a psionic martial artist who disrupts supernatural abilities and manifests incredible physical feats.',
  heroicResource: 'Discipline',
  heroicResourceDescription: 'Start combat with discipline equal to Victories. Gain 2 discipline at the start of each of your turns. Gain 1 discipline the first time each round an enemy in your Null Field uses a main action. Gain 1 discipline the first time each round the Director uses an ability that costs Malice. Outside combat, heroic abilities can be used once without spending discipline.',
  primaryCharacteristics: ['agility', 'intuition'],
  staminaBase: 21,
  staminaPerLevel: 9,
  recoveries: 8,
  classSkillGroups: ['interpersonal', 'lore'],
  classSkillCount: 2,
  freeSkills: ['Psionics'],
  signatureAbilityCount: 2,
  subclassLabel: 'Psionic Tradition',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'discipline-mastery' },
    { section: 'null-field' },
    { section: 'signature-abilities', config: { count: 2 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Inertial Shield', description: 'When you take damage, take half damage. Spend 1 discipline to also reduce potency by 1.', tag: 'Triggered Action' },
      { name: 'Null Speed', description: 'Your speed and Disengage shift distance gain a bonus equal to your Agility score.' },
      { name: 'Psionic Martial Arts', description: 'Use Intuition instead of Might for Knockback and Grab maneuvers. You can slide instead of push with Knockback.' }
    ],
    subclassFeatures: {
      chronokinetic: [
        { name: 'Chronokinetic Discipline', description: 'After using Inertial Shield, you can Disengage as a free triggered action. Knockback allows you to Disengage before or after the push.' }
      ],
      cryokinetic: [
        { name: 'Cryokinetic Discipline', description: 'After using Inertial Shield, you can use Grab as a free triggered action. Knockback targets one additional creature. You can deal cold damage with psionic abilities.' }
      ],
      metakinetic: [
        { name: 'Metakinetic Discipline', description: 'After using Inertial Shield, you can use Knockback as a free triggered action. Knockback distance gains a bonus equal to your Intuition score.' }
      ]
    },
    choices: [
      {
        name: 'Psionic Augmentation',
        key: 'psionicAugmentation',
        description: 'Choose an augmentation that enhances your psionic abilities.',
        options: [
          { id: 'density', name: 'Density Augmentation', description: '+6 Stamina per echelon, +1 stability.' },
          { id: 'force', name: 'Force Augmentation', description: 'Damage-dealing psionic abilities gain +1 damage.' },
          { id: 'speed', name: 'Speed Augmentation', description: '+1 speed, +1 to Disengage shift distance.' }
        ]
      }
    ]
  },
  characteristicArrays: [
    { id: 'null_a', label: 'Agility/Intuition Focus', agility: 2, intuition: 2, might: 2, reason: -1, presence: -1 },
    { id: 'null_b', label: 'Balanced Intuition', agility: 2, intuition: 2, might: 1, reason: 1, presence: -1 },
    { id: 'null_c', label: 'Even Spread', agility: 2, intuition: 2, might: 1, reason: 0, presence: 0 }
  ],
  subclasses: [
    { id: 'chronokinetic', name: 'Chronokinetic', description: 'Your training unmoors you from temporal reality. Grants Disengage on Inertial Shield use. Discipline Mastery: movement-based surges and enhanced forced movement. 5th-level: Instant Action (edge and surges on first turn). Skill from lore group.', skillGroup: 'lore' },
    { id: 'cryokinetic', name: 'Cryokinetic', description: 'You tap into absolute cold energy. Grants Grab on Inertial Shield use. Discipline Mastery: extra Knockback target, cold damage option, grab-based surges. 5th-level: Chilling Readiness (surges equal to Victories at combat start). Skill from crafting group.', skillGroup: 'crafting' },
    { id: 'metakinetic', name: 'Metakinetic', description: 'You see through the illusions of the universe. Grants Knockback on Inertial Shield use. Discipline Mastery: enhanced Knockback distance, damage/force-movement surges. 5th-level: Inertial Fulcrum (deal Intuition damage when reducing damage or forced movement). Skill from exploration group.', skillGroup: 'exploration' }
  ],
  signatureAbilities: [
    {
      name: 'Dance of Blows', keywords: ['Area', 'Psionic', 'Weapon'], type: 'Main action',
      distance: '1 burst', target: 'Each enemy in the area',
      flavor: 'You strike everywhere at once, tricking an enemy into moving out of position.',
      powerRoll: { characteristic: 'Agility', t1: '3 damage', t2: '4 damage', t3: '5 damage' },
      effect: 'You can slide one adjacent enemy up to a number of squares equal to your Intuition score.'
    },
    {
      name: 'Faster Than the Eye', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'Two creatures or objects',
      flavor: 'You strike so quickly that your hands become a blur.',
      powerRoll: { characteristic: 'Agility', t1: '4 damage', t2: '5 damage', t3: '7 damage' },
      effect: 'You can deal damage equal to your Agility score to one creature or object adjacent to you.'
    },
    {
      name: 'Inertial Step', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'You flit about the battlefield and take an opportunistic strike.',
      powerRoll: { characteristic: 'Agility', t1: '5 + A damage', t2: '7 + A damage', t3: '10 + A damage' },
      effect: 'You can shift up to half your speed before or after you make this strike.'
    },
    {
      name: 'Joint Lock', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'You contort your enemy\'s body into a stance they struggle to escape from.',
      powerRoll: { characteristic: 'Agility', t1: '4 + A damage; A<weak, grabbed', t2: '7 + A damage; A<avg, grabbed', t3: '9 + A damage; A<strong, grabbed' }
    },
    {
      name: 'Kinetic Strike', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'Your opponent staggers. They cannot ignore you.',
      powerRoll: { characteristic: 'Agility', t1: '4 + A damage; taunted (EoT)', t2: '5 + A damage; taunted (EoT), slide 1', t3: '6 + A damage; taunted (EoT), slide 2' }
    },
    {
      name: 'Pressure Points', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'You strike at key nerve clusters to leave your foe staggered.',
      powerRoll: { characteristic: 'Agility', t1: '4 + A damage; A<weak, weakened (save ends)', t2: '7 + A damage; A<avg, weakened (save ends)', t3: '9 + A damage; A<strong, weakened (save ends)' }
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Chronal Spike', cost: 3, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'You foresee the best moment to strike, then exploit it.',
        powerRoll: { characteristic: 'Agility', t1: '7 + A damage', t2: '10 + A damage', t3: '13 + A damage' },
        effect: 'You can shift up to half your speed before or after you make this strike. Additionally, whenever an effect lets you make a free strike or use a signature ability, you can use this ability instead, paying its discipline cost as usual.'
      },
      {
        name: 'Magnetic Strike', cost: 3, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 2', target: 'One creature',
        flavor: 'The force of your blow extends past the limits of your body, pulling your enemy closer.',
        powerRoll: { characteristic: 'Agility', t1: '5 + A psychic damage; vertical pull 1', t2: '8 + A psychic damage; vertical pull 2', t3: '11 + A psychic damage; vertical pull 3' }
      },
      {
        name: 'Phase Inversion Strike', cost: 3, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'You step momentarily out of phase as you pull an enemy through you.',
        powerRoll: { characteristic: 'Agility', t1: '4 + A damage; push 2', t2: '6 + A damage; push 4', t3: '8 + A damage; push 6' },
        effect: 'Before the push is resolved, you teleport the target to a square adjacent to you and opposite the one they started in. If the target can\'t be teleported this way, you can\'t push them.'
      },
      {
        name: 'Psychic Pulse', cost: 3, resource: 'Discipline', keywords: ['Area', 'Psionic'], type: 'Maneuver',
        distance: '2 burst', target: 'Each enemy in the area',
        flavor: 'A burst of psionic energy interferes with your enemy\'s synapses.',
        effect: 'Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the size of your Null Field ability increases by 1. At the end of your current turn, each enemy in the area of your Null Field ability takes psychic damage equal to your Intuition score.'
      },
      {
        name: 'Relentless Nemesis', cost: 3, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'You strike, and for the next few moments, your enemy can\'t escape you.',
        powerRoll: { characteristic: 'Agility', t1: '6 + A damage', t2: '8 + A damage', t3: '12 + A damage' },
        effect: 'Until the start of your next turn, whenever the target moves or is force moved, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.'
      },
      {
        name: 'Stunning Blow', cost: 3, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'You focus your psionic technique into a concussive punch.',
        powerRoll: { characteristic: 'Agility', t1: '4 + A damage; I<weak, dazed and slowed (save ends)', t2: '5 + A damage; I<avg, dazed and slowed (save ends)', t3: '7 + A damage; I<strong, dazed and slowed (save ends)' }
      }
    ],
    5: [
      {
        name: 'Arcane Disruptor', cost: 5, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Your blow reorders a foe\'s body, causing pain if they attempt to channel sorcery.',
        powerRoll: { characteristic: 'Agility', t1: '8 + A psychic damage; M<weak, weakened (save ends)', t2: '12 + A psychic damage; M<avg, weakened (save ends)', t3: '16 + A psychic damage; M<strong, weakened (save ends)' },
        effect: 'While weakened this way, the target takes damage equal to your Intuition score whenever they use a supernatural ability that costs Malice.'
      },
      {
        name: 'Impart Force', cost: 5, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Maneuver',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'A single touch from you, and your enemy flies backward.',
        powerRoll: { characteristic: 'Intuition', t1: 'Push 3', t2: 'Push 5', t3: 'Push 7' },
        effect: 'An object you target must be your size or smaller. You gain an edge on this ability. Additionally, for each square you push the target, they take 1 psychic damage.'
      },
      {
        name: 'Phase Strike', cost: 5, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'For a moment, your foe slips out of phase with this manifold.',
        powerRoll: { characteristic: 'Agility', t1: '3 + A psychic damage; I<weak, the target goes out of phase (save ends)', t2: '4 + A psychic damage; I<avg, the target goes out of phase (save ends)', t3: '6 + A psychic damage; I<strong, the target goes out of phase (save ends)' },
        effect: 'A target who goes out of phase is slowed, has their stability reduced by 2, and can\'t obtain a tier 3 outcome on ability rolls.'
      },
      {
        name: 'A Squad Unto Myself', cost: 5, resource: 'Discipline', keywords: ['Area', 'Psionic', 'Weapon'], type: 'Main action',
        distance: '2 burst', target: 'Each enemy in the area',
        flavor: 'You move so quickly, it seems as though an army assaulted your foes.',
        powerRoll: { characteristic: 'Agility', t1: '6 damage', t2: '9 damage', t3: '13 damage' },
        effect: 'You can take the Disengage move action as a free maneuver before or after you use this ability.'
      }
    ],
    7: [
      {
        name: 'Absorption Field', cost: 7, resource: 'Discipline', keywords: ['Psionic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your null field absorbs kinetic energy.',
        effect: 'Until the end of the encounter, the size of your Null Field ability increases by 1. While enlarged, each enemy in the area takes a bane on ability rolls.'
      },
      {
        name: 'Molecular Rearrangement Field', cost: 7, resource: 'Discipline', keywords: ['Psionic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your enemies\' wounds open, your allies\' wounds close.',
        effect: 'Until the end of the encounter, the size of your Null Field increases by 1. While enlarged, each enemy who has I<avg and enters the area for the first time in a round or starts their turn there is bleeding (save ends). Each ally who enters or starts their turn there gains temporary Stamina equal to your Intuition score.'
      },
      {
        name: 'Stabilizing Field', cost: 7, resource: 'Discipline', keywords: ['Psionic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'You project order, making it harder for enemies to interfere with you and your allies.',
        effect: 'Until the end of the encounter, the size of your Null Field increases by 1. While enlarged, you ignore difficult terrain and reduce enemy potencies targeting you by 1. You can use a free triggered action at the start of each turn to end one save-ends effect on you. Each ally in the area also gains these benefits.'
      },
      {
        name: 'Synapse Field', cost: 7, resource: 'Discipline', keywords: ['Psionic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Attacks made by allies in your null field disrupt your enemies\' thoughts.',
        effect: 'Until the end of the encounter, the size of your Null Field increases by 1. While enlarged, whenever an enemy in the area takes rolled damage, they take extra psychic damage equal to twice your Intuition score.'
      }
    ],
    9: [
      {
        name: 'Anticipating Strike', cost: 9, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Free triggered',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You suddenly strike an enemy, then grab them in a psionically enhanced grip.',
        trigger: 'The target moves or uses a main action.',
        powerRoll: { characteristic: 'Agility', t1: '7 + A damage; I<weak, restrained (save ends)', t2: '10 + A damage; I<avg, restrained (save ends)', t3: '13 + A damage; I<strong, restrained (save ends)' },
        effect: 'This strike resolves before the triggering movement or main action.'
      },
      {
        name: 'Iron Grip', cost: 9, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You grab the target with supernatural force.',
        powerRoll: { characteristic: 'Agility', t1: '10 + A damage; A<weak, grabbed', t2: '14 + A damage; A<avg, grabbed', t3: '18 + A damage; A<strong, grabbed' },
        effect: 'While grabbed this way, the target takes a bane on the Escape Grab maneuver. Each time they use that maneuver, they take damage equal to twice your Agility score.'
      },
      {
        name: 'Phase Leap', cost: 9, resource: 'Discipline', keywords: ['Psionic'], type: 'Move',
        distance: 'Self', target: 'Self',
        flavor: 'You leap beyond reality, leaving an afterimage of yourself.',
        effect: 'You jump up to your speed without provoking opportunity attacks. Until end of your next turn, a static afterimage remains in the space you left, and any enemy adjacent to your afterimage takes a bane on ability rolls. You can use abilities from your space or your afterimage\'s space. If Null Field is active, your afterimage also projects the aura.'
      },
      {
        name: 'Synaptic Reset', cost: 9, resource: 'Discipline', keywords: ['Area', 'Psionic'], type: 'Maneuver',
        distance: '3 burst', target: 'Self and each ally in the area',
        flavor: 'You expand your nullifying power to mitigate harmful effects.',
        effect: 'Each target can end any conditions or effects on themselves, and gains 5 temporary Stamina for each condition or effect removed.'
      }
    ],
    11: [
      {
        name: 'Arcane Purge', cost: 11, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You focus your null field into a pressure point strike that prevents your foe from channeling sorcery.',
        powerRoll: { characteristic: 'Agility', t1: '13 + A damage; M<weak, suppressed (save ends)', t2: '19 + A damage; M<avg, suppressed (save ends)', t3: '24 + A damage; M<strong, suppressed (save ends)' },
        effect: 'While suppressed, the target takes psychic damage equal to twice your Intuition score at the start of their turns, whenever they use a supernatural ability, or whenever they use an ability that costs Malice.'
      },
      {
        name: 'Phase Hurl', cost: 11, resource: 'Discipline', keywords: ['Melee', 'Psionic', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You throw your foe out of phase with this manifold.',
        powerRoll: { characteristic: 'Agility', t1: '9 + A damage; push 5; I<weak, dazed (save ends)', t2: '13 + A damage; push 7; I<avg, dazed (save ends)', t3: '18 + A damage; push 10; I<strong, dazed (save ends)' },
        effect: 'The target and each creature they collide with takes psychic damage equal to the total squares the target was force moved.'
      },
      {
        name: 'Scalar Assault', cost: 11, resource: 'Discipline', keywords: ['Area', 'Psionic'], type: 'Main action',
        distance: '3 cube within 1', target: 'Each enemy in the area',
        flavor: 'You warp reality to grow a limb for just a moment and make a single devastating attack.',
        powerRoll: { characteristic: 'Agility', t1: '12 psychic damage; push 3', t2: '17 psychic damage; push 5', t3: '23 psychic damage; push 7' }
      },
      {
        name: 'Synaptic Anchor', cost: 11, resource: 'Discipline', keywords: ['Psionic'], type: 'Free triggered',
        distance: 'Self', target: 'Self or one creature',
        flavor: 'You disrupt an enemy\'s strike and create a feedback loop in their mind.',
        trigger: 'The target takes damage from another creature\'s ability while in the area of your Null Field.',
        effect: 'The target takes half the damage, and if the triggering creature has I<avg, they are dazed (save ends). While dazed this way, they take psychic damage equal to your Intuition score whenever they use a main action.'
      }
    ]
  },
  features: {
    'Discipline Resource': 'Start combat with discipline equal to Victories. Gain 2 at start of each turn. Gain 1 discipline first time each round an enemy in Null Field uses a main action. Gain 1 discipline first time each round the Director uses an ability that costs Malice. Outside combat, heroic abilities can be used once without spending discipline until you earn Victories or finish a respite.',
    'Null Field': 'Project a 1 aura that reduces each enemy\'s potencies by 1. Once as a free maneuver each turn, spend 1 discipline for: Gravitic Disruption (slide 2 on first damage), Inertial Anchor (targets can\'t shift), or Synaptic Break (+1 potency on ally abilities vs targets). Active until dying or willingly ended.',
    'Inertial Shield': 'Triggered action when you take damage: take half damage. Spend 1 Discipline: reduce potency of one associated effect by 1.',
    'Discipline Mastery': 'Gain scaling benefits based on discipline amount and tradition. At 2: tradition-specific maneuver bonus. At 4: surge generation. At 6: edge on Grab and Knockback. At 8 (4th level): improved surge generation. At 10 (7th level): double edge on Grab and Knockback. At 12 (10th level): force movement bonus equal to Intuition and 10 temporary Stamina on heroic ability use.',
    'Null Speed': 'Gain a bonus to speed and to the number of squares you can shift when you Disengage equal to your Agility score.',
    'Psionic Augmentation': 'Choose one: Density (+6 Stamina, +1 stability, Stamina bonus increases at 4th/7th/10th), Force (+1 bonus to rolled psionic damage), or Speed (+1 speed and disengage distance). Can change via respite meditation.',
    'Psionic Martial Arts': 'Use Intuition instead of Might for Knockback and Grab power rolls and size targeting. Knockback can slide instead of push.',
    'Psionic Leap': 'Long jump and high jump a distance equal to twice your Agility score without a test.',
    'Reorder': 'At the start of each turn, free triggered action to end one save-ends or end-of-turn effect on you, or grant this to one creature in your Null Field.',
    'Enhanced Null Field': 'Your Null Field removes temporary supernatural terrain effects of your level or lower and temporarily negates permanent ones while overlapping.',
    'Regenerative Field': 'The first time each combat round an enemy in Null Field uses a main action, gain 2 discipline instead of 1.',
    'Elemental Absorption': 'When using Inertial Shield, gain immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to Intuition score against the triggering damage.',
    'Elemental Buffer': 'When you reduce elemental damage with immunity, gain 2 surges usable only to increase your next strike\'s damage.',
    'Psi Boost': 'When using a main action or maneuver with Psionic keyword, spend extra discipline for boosts: Dynamic Power (1, +Intuition forced movement), Expanded Power (3, +1 area size), Extended Power (1, +Intuition ranged or +2 melee distance), Heightened Power (1, +Intuition rolled damage), Magnified Power (5, +Intuition potency), Shared Power (5, +1 target), Sharpened Power (1, edge on power roll).',
    'Improved Body': 'Gain 3 discipline instead of 2 at the start of your turns during combat.',
    'I Am the Weapon': 'Stamina increases by 21. Can\'t be made bleeding even while dying. No longer age or need food. Can use Intuition instead of another characteristic when resisting potencies.',
    'Manifold Body': 'Gain 4 discipline instead of 3 at the start of your turns during combat.',
    'Manifold Resonance': 'After a respite, teleport yourself and creatures in Null Field to any known location in the timescape. When using an ability, gain 1 discipline usable only for Psi Boost. You and allies in Null Field ignore banes and double banes on power rolls.',
    'Order': 'Epic resource. Gain order equal to XP each respite. Spend order as discipline. At combat start, spend 1 order to increase Null Field size by 1 until end of encounter. Order persists until spent.'
  },
  advancement: {
    1: { features: ['Null Tradition (Subclass)', 'Discipline', 'Null Field', 'Inertial Shield', 'Discipline Mastery', 'Null Speed', 'Psionic Augmentation', 'Psionic Martial Arts', 'Signature Ability x2', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Perk', 'Tradition Feature', 'Tradition Ability (5-cost)'] },
    3: { features: ['Psionic Leap', 'Reorder', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Agility & Intuition to 3)', 'Discipline Mastery Improvement', 'Enhanced Null Field', 'Perk', 'Regenerative Field', 'Skill'], charBumps: { auto: { agility: 1, intuition: 1 }, max: 3 } },
    5: { features: ['Tradition Feature', '9-cost Heroic Ability'] },
    6: { features: ['Elemental Absorption', 'Elemental Buffer', 'Perk', 'Tradition Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Discipline Mastery Improvement', 'Psi Boost', 'Improved Body', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Tradition Feature', '11-cost Heroic Ability'] },
    9: { features: ['I Am the Weapon', 'Tradition Ability (11-cost)'] },
    10: { features: ['Characteristic +1 (Agility & Intuition to 5)', 'Discipline Mastery Improvement', 'Manifold Body', 'Manifold Resonance', 'Order', 'Perk', 'Skill'], charBumps: { auto: { agility: 1, intuition: 1 }, max: 5 } }
  }
};
