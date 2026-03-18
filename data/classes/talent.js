// DS.Data.Classes.talent - Talent class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.talent = {
  id: 'talent', name: 'Talent', role: 'Controller',
  description: 'A rare few people are born with the potential to harness psionic power, but only those who experience an awakening, a significant event that activates a talent\'s abilities, can tap into the mind\'s full potential. You are one of those people -- a master of psionics and a source of incredible power created through sheer force of will.',
  heroicResource: 'Clarity',
  heroicResourceDescription: 'Start combat with clarity equal to Victories. Gain 1d3 clarity at the start of each of your turns. Gain 1 clarity the first time each round a creature is force moved. You can spend clarity you don\'t have (going negative, max negative = 1 + Reason). Take 1 damage per negative clarity at end of each turn. While below 0, you are strained. Outside combat, heroic abilities can be used once without spending clarity.',
  primaryCharacteristics: ['reason', 'presence'],
  staminaBase: 18,
  staminaPerLevel: 6,
  recoveries: 8,
  classSkillGroups: ['interpersonal', 'lore'],
  classSkillCount: 2,
  freeSkills: ['Psionics', 'Read Person'],
  signatureAbilityCount: 2,
  subclassLabel: 'Psionic Tradition',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'strain-display' },
    { section: 'signature-abilities', config: { count: 2 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Mind Spike', description: 'Ranged 10 free strike dealing psychic damage based on Reason. While strained, deals 2 extra psychic damage to both target and yourself.' },
      { name: 'Telepathic Speech', description: 'You know the Mindspeech language. You can telepathically communicate with any creature that shares a language with you within Mind Spike range.' }
    ],
    subclassFeatures: {
      chronopathy: [
        { name: 'Accelerate', description: 'As a maneuver, target within ranged 10 shifts up to your Reason score. Spend 2 clarity to use this as a maneuver on your turn.' },
        { name: 'Again', description: 'After seeing the result of an ability roll, force a reroll and use either result.', tag: 'Triggered Action' }
      ],
      telekinesis: [
        { name: 'Minor Telekinesis', description: 'As a maneuver, force move a target within ranged 10 up to your Reason score. Spend clarity for larger targets or vertical movement.' },
        { name: 'Repel', description: 'When an adjacent creature deals damage to you, push them up to your Reason score.', tag: 'Triggered Action' }
      ],
      telepathy: [
        { name: 'Feedback Loop', description: 'When an enemy damages an ally, the enemy takes half that damage as psychic damage.', tag: 'Triggered Action' },
        { name: 'Remote Assistance', description: 'As a maneuver, grant an ally an edge on their next roll against a target. Spend 1 clarity to target an additional creature.' }
      ]
    },
    choices: [
      {
        name: 'Talent Ward',
        key: 'ward',
        description: 'Choose a ward that protects you when you take damage.',
        options: [
          { id: 'entropy', name: 'Entropy Ward', description: 'When an adjacent creature deals damage to you, their speed is reduced by your Reason score and they can\'t use triggered actions until end of their next turn.' },
          { id: 'repulsive', name: 'Repulsive Ward', description: 'Push an adjacent creature up to your Reason score as a free triggered action when they deal damage to you.' },
          { id: 'steel', name: 'Steel Ward', description: 'Gain damage immunity equal to your Reason score until end of your next turn after taking damage.' },
          { id: 'vanishing', name: 'Vanishing Ward', description: 'Become invisible until the end of your next turn when you take damage.' }
        ]
      },
      {
        name: 'Psionic Augmentation',
        key: 'psionicAugmentation',
        description: 'Choose an augmentation that enhances your psionic abilities.',
        options: [
          { id: 'battle', name: 'Battle Augmentation', description: 'Wear light armor and wield light weapons. +3 Stamina per echelon, +1 weapon damage.' },
          { id: 'density', name: 'Density Augmentation', description: '+6 Stamina per echelon, +1 stability.' },
          { id: 'distance', name: 'Distance Augmentation', description: 'Ranged psionic abilities gain +2 distance.' },
          { id: 'force', name: 'Force Augmentation', description: 'Damage-dealing psionic abilities gain +1 damage.' },
          { id: 'speed', name: 'Speed Augmentation', description: '+1 speed, +1 to Disengage shift distance.' }
        ]
      }
    ]
  },
  characteristicArrays: [
    { id: 'talent_a', label: 'Reason/Presence Focus', reason: 2, presence: 2, might: 2, agility: -1, intuition: -1 },
    { id: 'talent_b', label: 'Balanced Reason', reason: 2, presence: 2, might: 1, agility: 1, intuition: -1 },
    { id: 'talent_c', label: 'Even Spread', reason: 2, presence: 2, might: 1, agility: 0, intuition: 0 }
  ],
  subclasses: [
    { id: 'chronopathy', name: 'Chronopathy', description: 'View the future and past, manipulate time. Grants Accelerate (maneuver: target shifts up to Reason squares, spend 2 Clarity for maneuver) and Again (triggered: force reroll of an ability roll). Tradition features and abilities at levels 2, 5, 8.' },
    { id: 'telekinesis', name: 'Telekinesis', description: 'Physically manipulate creatures and objects with psionic force. Grants Minor Telekinesis (maneuver: slide target up to Reason squares, spend clarity for larger targets or vertical slide) and Repel (triggered: half damage or reduce forced movement by Reason). Tradition features and abilities at levels 2, 5, 8.' },
    { id: 'telepathy', name: 'Telepathy', description: 'Communicate with, read, and influence minds. Grants Feedback Loop (triggered: when target damages an ally, target takes half that as psychic damage) and Remote Assistance (maneuver: ally gains edge on next roll vs target, spend 1 Clarity for additional target). Tradition features and abilities at levels 2, 5, 8.' }
  ],
  signatureAbilities: [
    {
      name: 'Entropic Bolt', keywords: ['Chronopathy', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'You advance an enemy\'s age for a moment.',
      powerRoll: { characteristic: 'Presence', t1: '2 + P corruption damage; P<weak, slowed (save ends)', t2: '3 + P corruption damage; P<avg, slowed (save ends)', t3: '5 + P corruption damage; P<strong, slowed (save ends)' },
      effect: 'The target takes an extra 1 corruption damage for each additional time they are targeted by this ability during the encounter. Strained: You gain 1 clarity when you obtain a tier 2 or tier 3 outcome on the power roll.'
    },
    {
      name: 'Hoarfrost', keywords: ['Cryokinesis', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature',
      flavor: 'You blast a foe with a pulse of cold energy.',
      powerRoll: { characteristic: 'Reason', t1: '2 + R cold damage; M<weak, slowed (EoT)', t2: '4 + R cold damage; M<avg, slowed (EoT)', t3: '6 + R cold damage; M<strong, slowed (EoT)' },
      effect: 'Strained: You are slowed until the end of your next turn. Additionally, a target slowed by this ability is restrained instead.'
    },
    {
      name: 'Incinerate', keywords: ['Area', 'Fire', 'Psionic', 'Pyrokinesis', 'Ranged'], type: 'Main action',
      distance: '3 cube within 10', target: 'Each enemy in the area',
      flavor: 'The air erupts into a column of smokeless flame.',
      powerRoll: { characteristic: 'Reason', t1: '2 fire damage', t2: '4 fire damage', t3: '6 fire damage' },
      effect: 'A column of fire remains in the area until the start of your next turn. Each enemy who enters or starts their turn there takes 2 fire damage. Strained: The size of the cube increases by 2, but the fire disappears at the end of your turn.'
    },
    {
      name: 'Kinetic Grip', keywords: ['Psionic', 'Ranged', 'Telekinesis'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'You lift and hurl your foe away from you.',
      powerRoll: { characteristic: 'Reason', t1: 'Slide 2 + R', t2: 'Slide 4 + R', t3: 'Slide 6 + R; prone' },
      effect: 'Strained: You must vertical push the target instead of sliding them.'
    },
    {
      name: 'Kinetic Pulse', keywords: ['Area', 'Psionic', 'Telepathy'], type: 'Main action',
      distance: '1 burst', target: 'Each enemy in the area',
      flavor: 'The force of your mind hurls enemies backward.',
      powerRoll: { characteristic: 'Reason', t1: '2 psychic damage', t2: '5 psychic damage; push 1', t3: '7 psychic damage; push 2' },
      effect: 'Strained: The size of the burst increases by 2, and you are bleeding until the start of your next turn.'
    },
    {
      name: 'Materialize', keywords: ['Psionic', 'Ranged', 'Resopathy', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'You picture an object in your mind and give it form -- directly above your opponent\'s head.',
      powerRoll: { characteristic: 'Reason', t1: '3 + R damage', t2: '5 + R damage', t3: '8 + R damage' },
      effect: 'A worthless size 1M object drops onto the target to deal the damage, then rolls into an adjacent unoccupied space of your choice. The object is made of wood, stone, or metal (your choice). Strained: The object explodes after the damage is dealt, and each creature adjacent to the target takes damage equal to your Reason score. You also take damage equal to your Reason score that can\'t be reduced in any way.'
    },
    {
      name: 'Optic Blast', keywords: ['Metamorphosis', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'Your eyes emit rays of powerful enervating force.',
      powerRoll: { characteristic: 'Reason', t1: '2 + R damage; M<weak, prone', t2: '4 + R damage; M<avg, prone', t3: '6 + R damage; M<strong, prone' },
      effect: 'When targeting an object with a solid reflective surface, you can target one additional creature or object within 3 squares of the first target. Strained: You gain 1 surge that you can use immediately, and you take damage equal to your Reason score that can\'t be reduced in any way.'
    },
    {
      name: 'Spirit Sword', keywords: ['Animapathy', 'Melee', 'Psionic', 'Strike'], type: 'Main action',
      distance: 'Melee 2', target: 'One creature or object',
      flavor: 'You form a blade of mind energy and stab your target, invigorating yourself.',
      powerRoll: { characteristic: 'Presence', t1: '3 + P damage', t2: '6 + P damage', t3: '9 + P damage' },
      effect: 'You gain 1 surge. Strained: The target takes an extra 3 damage. You also take 3 damage that can\'t be reduced in any way.'
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Awe', cost: 3, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telepathy'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'Your psionic presence overwhelms a creature\'s mind.',
        effect: 'If you target an ally, they gain temporary Stamina equal to three times your Presence score, and they can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.',
        powerRoll: { characteristic: 'Presence', t1: '3 + P psychic damage; I<weak, frightened (save ends)', t2: '6 + P psychic damage; I<avg, frightened (save ends)', t3: '9 + P psychic damage; I<strong, frightened (save ends)' }
      },
      {
        name: 'Choke', cost: 3, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telekinesis'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You telekinetically constrict a foe\'s throat.',
        powerRoll: { characteristic: 'Reason', t1: '3 + R damage; M<weak, slowed (save ends)', t2: '5 + R damage; M<avg, slowed (save ends)', t3: '8 + R damage; M<strong, restrained (save ends)' },
        effect: 'You can vertical pull the target up to 2 squares. If the target is made restrained by this ability, this forced movement ignores their stability. Strained: You are weakened (save ends). While you are weakened this way, whenever you are force moved, the forced movement distance gains a +5 bonus.'
      },
      {
        name: 'Precognition', cost: 3, resource: 'Clarity', keywords: ['Chronopathy', 'Melee', 'Psionic'], type: 'Main action',
        distance: 'Melee 2', target: 'Self or one ally',
        flavor: 'You see the future and share that vision with an ally.',
        effect: 'Ability rolls made against the target take a bane until the start of your next turn. Whenever the target takes damage while under this effect, they can use a triggered action to make a free strike against the source of the damage.'
      },
      {
        name: 'Smolder', cost: 3, resource: 'Clarity', keywords: ['Psionic', 'Pyrokinesis', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You cause a target to burn from the inside out.',
        effect: 'Choose the damage type and the weakness for this ability from one of the following: acid, corruption, or fire. The target takes damage before this ability imposes any weakness.',
        powerRoll: { characteristic: 'Reason', t1: '3 + R damage; R<weak, the target has weakness 5 (save ends)', t2: '6 + R damage; R<avg, the target has weakness 5 (save ends)', t3: '9 + R damage; R<strong, the target has weakness equal to 5 + your Reason score (save ends)' }
      }
    ],
    5: [
      {
        name: 'Flashback', cost: 5, resource: 'Clarity', keywords: ['Chronopathy', 'Psionic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You rewind time to let an ally repeat a powerful ability.',
        effect: 'The target uses an ability with a base Heroic Resource cost of 7 or lower that they\'ve previously used this round, without needing to spend the base cost. Augmentations to the ability can be paid for as usual. Strained: You take 1d6 damage and are slowed (save ends).'
      },
      {
        name: 'Inertia Soak', cost: 5, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Telekinesis'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You absorb kinetic energy to empower an ally\'s movement.',
        effect: 'The target ignores difficult terrain and takes no damage from forced movement until the start of your next turn. Whenever the target enters a square while under this effect, they can push one adjacent creature up to a number of squares equal to your Reason score. When pushing an ally, the target can ignore that ally\'s stability. A creature can only be force moved this way once a turn. Strained: You are weakened (save ends). While you are weakened this way, whenever you are force moved, the forced movement distance gains a +5 bonus.'
      },
      {
        name: 'Iron', cost: 5, resource: 'Clarity', keywords: ['Metamorphosis', 'Psionic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You harden a target\'s body with psionic energy.',
        effect: 'The target\'s stability increases by an amount equal to your Reason score, and they gain 10 temporary Stamina and 2 surges. This stability increase lasts until the target no longer has temporary Stamina from this ability. Strained: You can\'t use maneuvers (save ends).'
      },
      {
        name: 'Perfect Clarity', cost: 5, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Telepathy'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You grant a creature preternatural awareness and speed.',
        effect: 'Until the start of your next turn, the target gains a +3 bonus to speed, and they have a double edge on the next power roll they make. If the target obtains a tier 3 outcome on that roll, you gain 1 clarity. Strained: You take 1d6 damage, and you can\'t use triggered actions (save ends).'
      }
    ],
    7: [
      {
        name: 'Fling Through Time', cost: 7, resource: 'Clarity', keywords: ['Chronopathy', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You hurl the target through the annals of time.',
        powerRoll: { characteristic: 'Presence', t1: '3 + P corruption damage; P<weak, weakened (save ends)', t2: '5 + P corruption damage; target is flung through time, P<avg weakened (save ends)', t3: '8 + P corruption damage; target is flung through time, P<strong weakened (save ends)' },
        effect: 'A target who is flung through time is removed from the encounter map until the end of their next turn, reappearing in their original space or nearest unoccupied space. Strained: You take 2d6 damage. If tier 3, you gain 2 clarity.'
      },
      {
        name: 'Force Orbs', cost: 7, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telekinesis'], type: 'Main action',
        distance: 'Self', target: 'Self',
        flavor: 'Spheres of solid psionic energy float around you.',
        powerRoll: { characteristic: 'Reason', t1: '2 damage', t2: '3 damage', t3: '5 damage' },
        effect: 'You create three size 1T orbs that orbit your body. Each orb gives you a cumulative damage immunity 1. Each time you take damage, you lose 1 orb. Once per turn, use a free maneuver to fire an orb at a creature within 5 squares as a ranged strike. Strained: You create five orbs, and are weakened while you have any orbs active.'
      },
      {
        name: 'Reflector Field', cost: 7, resource: 'Clarity', keywords: ['Area', 'Psionic', 'Telepathy'], type: 'Main action',
        distance: '3 aura', target: 'Special',
        flavor: 'A protective field reverses the momentum of incoming attacks.',
        effect: 'The aura lasts until start of your next turn. Whenever an enemy targets an ally in the area with a ranged ability, the ability is negated on the ally and reflected back at the enemy, dealing half damage and losing additional effects. Strained: The size increases by 1. Each time your aura reflects, you take 2d6 damage.'
      },
      {
        name: 'Soul Burn', cost: 7, resource: 'Clarity', keywords: ['Animapathy', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You blast their soul out of their body.',
        powerRoll: { characteristic: 'Presence', t1: '6 + P damage; P<weak, dazed (save ends)', t2: '10 + P damage; P<avg, dazed (save ends)', t3: '14 + P damage; P<strong, dazed (save ends)' },
        effect: 'The target takes a bane on Presence tests until end of encounter. Strained: The potency increases by 1. You take 2d6 damage and gain 3 surges.'
      }
    ],
    9: [
      {
        name: 'Exothermic Shield', cost: 9, resource: 'Clarity', keywords: ['Pyrokinesis', 'Psionic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You encase the target in psionic flame.',
        effect: 'Until start of your next turn, the target has cold and fire immunity 10, and their strikes deal extra fire damage equal to twice your Reason score. Whenever an enemy uses a melee ability against the target, the enemy takes 5 fire damage. Strained: The target gains 2 surges. You are weakened and slowed (save ends).'
      },
      {
        name: 'Hypersonic', cost: 9, resource: 'Clarity', keywords: ['Area', 'Charge', 'Psionic', 'Telekinesis'], type: 'Main action',
        distance: '5 x 2 line within 1', target: 'Each enemy in the area',
        flavor: 'You move fast enough to turn around and watch your foes feel the aftermath.',
        powerRoll: { characteristic: 'Reason', t1: '12 sonic damage', t2: '18 sonic damage', t3: '24 sonic damage' },
        effect: 'You teleport to a square on the opposite side of the area before making the power roll. Strained: If tier 2 or better, you and each target are slowed until end of turn.'
      },
      {
        name: 'Mind Snare', cost: 9, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telepathy'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You latch onto your prey\'s brain and don\'t let go.',
        powerRoll: { characteristic: 'Reason', t1: '10 + R psychic damage; R<weak, slowed (save ends)', t2: '14 + R psychic damage; R<avg, slowed (save ends)', t3: '20 + R psychic damage; R<strong, slowed (save ends)' },
        effect: 'While slowed this way, the target takes 3 psychic damage for each square they willingly leave. Strained: Damage increases to 5 per square. You have a double bane against the target while slowed.'
      },
      {
        name: 'Soulbound', cost: 9, resource: 'Clarity', keywords: ['Animapathy', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'Two enemies',
        flavor: 'A piercing bolt of psychic energy lances through two foes and leaves a thread between them.',
        powerRoll: { characteristic: 'Presence', t1: '8 damage; A<weak, stitched (save ends)', t2: '13 damage; A<avg, stitched (save ends)', t3: '17 damage; A<strong, stitched (save ends)' },
        effect: 'If any target becomes stitched, both are stitched together. While stitched, a target takes a bane on power rolls while not adjacent to the other stitched target. When a stitched target takes damage not dealt by the other, each other stitched target takes half the damage. Strained: You target yourself and three enemies instead.'
      },
      {
        name: 'Fate', cost: 9, resource: 'Clarity', keywords: ['Chronopathy', 'Psionic', 'Melee'], type: 'Main action',
        distance: 'Melee 2', target: 'One enemy',
        flavor: 'Your foe gets a glimpse of how it will end for them.',
        powerRoll: { characteristic: 'Presence', t1: '8 + P psychic damage', t2: '13 + P psychic damage', t3: '17 + P psychic damage' },
        effect: 'The target has damage weakness 5 until end of your next turn. Whenever the target takes damage while they have this weakness, they are knocked prone. Strained: You make a power roll, then are weakened (save ends).'
      },
      {
        name: 'Stasis Field', cost: 9, resource: 'Clarity', keywords: ['Area', 'Chronopathy', 'Psionic', 'Ranged'], type: 'Main action',
        distance: '4 cube within 10', target: 'Each creature and object in the area',
        flavor: 'Keep everything as it was. Ignore everything that will be.',
        powerRoll: { characteristic: 'Presence', t1: 'P<weak, slowed until the effect ends', t2: 'P<avg, speed is 0 until the effect ends', t3: 'P<strong, restrained until the effect ends' },
        effect: 'The area is frozen in time until start of your next turn. Objects in the area are restrained and can\'t fall. Creatures reduced to 0 Stamina stay alive, and objects reduced to 0 Stamina remain undestroyed. Strained: Creatures force moved in the area take 2 corruption damage per square.'
      },
      {
        name: 'Gravitic Well', cost: 9, resource: 'Clarity', keywords: ['Area', 'Psionic', 'Ranged', 'Telekinesis'], type: 'Main action',
        distance: '4 cube within 10', target: 'Each enemy and object in the area',
        flavor: 'You bend gravity into a fine point and pull your foes toward it.',
        powerRoll: { characteristic: 'Reason', t1: '6 damage; vertical pull 5 toward center', t2: '9 damage; vertical pull 7 toward center', t3: '13 damage; vertical pull 10 toward center' },
        effect: 'Targets closest to the center are pulled first. Strained: The area increases by 2. You also target yourself and allies.'
      },
      {
        name: 'Greater Kinetic Grip', cost: 9, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telekinesis'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You raise the target into the air without breaking a sweat.',
        powerRoll: { characteristic: 'Reason', t1: 'Slide 4 + R; M<weak, vertical', t2: 'Slide 8 + R; M<avg, vertical', t3: 'Slide 12 + R; prone; M<strong, vertical' },
        effect: 'Strained: The forced movement ignores stability. You take 2d6 damage and are weakened (save ends).'
      },
      {
        name: 'Synaptic Conditioning', cost: 9, resource: 'Clarity', keywords: ['Psionic', 'Melee', 'Strike', 'Telepathy'], type: 'Main action',
        distance: 'Melee 2', target: 'One creature',
        flavor: 'It\'s a subtle mindset shift. You just don\'t like them!',
        powerRoll: { characteristic: 'Reason', t1: '10 psychic damage; target takes a bane on ability rolls vs you/allies (save ends)', t2: '14 psychic damage; double bane vs you/allies (save ends)', t3: '20 psychic damage; target considers you/allies to be their allies (save ends)' },
        effect: 'Strained: While the target is under this effect, you no longer consider enemies to be your enemies.'
      },
      {
        name: 'Synaptic Dissipation', cost: 9, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telepathy'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'You make enemies wonder if you were ever really there.',
        powerRoll: { characteristic: 'Reason', t1: 'Two creatures', t2: 'Three creatures', t3: 'Five creatures' },
        effect: 'You and your allies are invisible to each target until start of your next turn. Strained: The effect ends early if you take damage from an enemy\'s ability.'
      }
    ],
    11: [
      {
        name: 'Doubt', cost: 11, resource: 'Clarity', keywords: ['Animapathy', 'Psionic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You tug at the strings of the foe\'s anima and unravel them.',
        powerRoll: { characteristic: 'Presence', t1: '10 + P damage; P<weak, weakened (save ends)', t2: '14 + P damage; P<avg, weakened (save ends)', t3: '20 + P damage; P<strong, weakened and slowed (save ends)' },
        effect: 'This ability gains an edge against a target with a soul. After the power roll, you or one ally within distance have a double edge on the next power roll before end of encounter. Strained: You feel dispirited until you finish a respite. If tier 3, you and the target each have damage weakness 5 (save ends).'
      },
      {
        name: 'Mindwipe', cost: 11, resource: 'Clarity', keywords: ['Melee', 'Psionic', 'Strike', 'Telepathy'], type: 'Main action',
        distance: 'Melee 2', target: 'One creature',
        flavor: 'You attempt to make them forget all their training.',
        powerRoll: { characteristic: 'Reason', t1: '12 + R damage; R<weak, bane on next power roll', t2: '17 + R damage; R<avg, bane on power rolls (save ends)', t3: '23 + R damage; R<strong, double bane on power rolls (save ends)' },
        effect: 'The target can\'t communicate with anyone until end of encounter. Strained: You take 3d6 damage.'
      },
      {
        name: 'Rejuvenate', cost: 11, resource: 'Clarity', keywords: ['Chronopathy', 'Psionic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You reshape the flow of time in the target\'s body.',
        effect: 'Choose two: (1) The target can spend any number of Recoveries. (2) The target gains 1 Heroic Resource and can end any save-ends effects. (3) The target gains 2 surges and +3 speed until end of encounter. Strained: You and the target both permanently grow visibly younger. You are weakened and slowed (save ends).'
      },
      {
        name: 'Steel', cost: 11, resource: 'Clarity', keywords: ['Metamorphosis', 'Psionic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'The target\'s skin becomes covered in tough metal.',
        effect: 'The target has damage immunity 5 and can\'t be made slowed or weakened until start of your next turn. Whenever the target force moves a creature, the distance gains a +5 bonus. Strained: You can\'t use maneuvers (save ends).'
      },
      {
        name: 'Acceleration Field', cost: 11, resource: 'Clarity', keywords: ['Chronopathy', 'Psionic', 'Ranged'], type: 'Main action',
        distance: 'Ranged 5', target: 'Three allies',
        flavor: 'You forcibly stuff more moments into a critical point in time.',
        powerRoll: { characteristic: 'Presence', t1: '4 corruption damage; slowed (save ends)', t2: '6 corruption damage; slowed (save ends)', t3: '10 corruption damage; slowed (save ends)' },
        effect: 'Each target can use any main action as a free triggered action, but they lose their main action on their next turn. Strained: Make a power roll that targets you and each enemy within distance.'
      },
      {
        name: 'Borrow From the Future', cost: 11, resource: 'Clarity', keywords: ['Area', 'Chronopathy', 'Psionic'], type: 'Maneuver',
        distance: '2 burst', target: 'Each ally in the area',
        flavor: 'You lean on future heroism to assist you in the now.',
        effect: 'The targets share 6 of their Heroic Resource among themselves, as you determine. A target can\'t gain more than 3 this way. After using this ability, you can\'t gain any clarity until end of next combat round.'
      },
      {
        name: 'Fulcrum', cost: 11, resource: 'Clarity', keywords: ['Area', 'Psionic', 'Telekinesis'], type: 'Main action',
        distance: 'Special', target: 'Each enemy and object in the area',
        flavor: 'You precisely manipulate the creatures around you.',
        powerRoll: { characteristic: 'Reason', t1: '2 burst', t2: '3 burst', t3: '4 burst' },
        effect: 'Make a power roll to determine the area. Each target is vertical pushed 6 squares. Objects must be size 1L or smaller. Strained: Reduce the burst by 2 (min 1) to give forced movement +2 bonus. You take half the total forced movement damage.'
      },
      {
        name: 'Gravitic Nova', cost: 11, resource: 'Clarity', keywords: ['Area', 'Psionic', 'Telekinesis'], type: 'Main action',
        distance: '3 burst', target: 'Each enemy and object in the area',
        flavor: 'Unbridled psionic energy erupts from your body.',
        powerRoll: { characteristic: 'Reason', t1: '6 damage; push 7', t2: '9 damage; push 10', t3: '13 damage; push 15' },
        effect: 'On a critical hit, the area increases by 3 and deals extra 10 damage. Strained: You are weakened (save ends). If critical hit, you die.'
      },
      {
        name: 'Resonant Mind Spike', cost: 11, resource: 'Clarity', keywords: ['Psionic', 'Ranged', 'Strike', 'Telepathy'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You fire a telepathic bolt empowered by every consciousness within reach.',
        powerRoll: { characteristic: 'Reason', t1: '15 + R psychic damage', t2: '24 + R psychic damage', t3: '28 + R psychic damage' },
        effect: 'This ability ignores cover and concealment. Strained: Critical hit on natural 17 or higher. You take half the damage dealt, can\'t be reduced.'
      },
      {
        name: 'Synaptic Terror', cost: 11, resource: 'Clarity', keywords: ['Area', 'Psionic', 'Telepathy'], type: 'Main action',
        distance: '3 burst', target: 'Each ally and enemy in the area',
        flavor: 'You project a terrifying image into the brains of your foes.',
        powerRoll: { characteristic: 'Reason', t1: 'R<weak, frightened (save ends)', t2: 'R<avg, frightened (save ends)', t3: 'R<strong, frightened (save ends)' },
        effect: 'You and each target ally can\'t obtain lower than tier 2 on power rolls until start of your next turn. Each enemy is affected by the power roll. Strained: Can\'t use if it would cause negative clarity.'
      }
    ]
  },
  features: {
    'Clarity and Strain': 'Start combat with clarity equal to Victories. Gain 1d3 at start of each turn. Gain 1 clarity first time each round a creature is force moved. You can spend clarity you don\'t have, pushing into negative (max negative = 1 + Reason). Take 1 damage per negative clarity at end of each turn. While below 0 clarity, you are strained. Outside combat, heroic abilities can be used once without spending clarity until you earn Victories or finish a respite.',
    'Mind Spike': 'Psionic, Ranged, Strike, Telepathy. Main action, Ranged 10, one creature. Power Roll + Reason: <=11: 2 + R psychic damage; 12-16: 4 + R psychic damage; 17+: 6 + R psychic damage. Strained: The target takes an extra 2 psychic damage. You also take 2 psychic damage that can\'t be reduced in any way.',
    'Psionic Augmentation': 'Choose one: Battle Augmentation (light armor +3 Stamina, light weapon +1 damage), Density Augmentation (+6 Stamina, +1 stability), Distance Augmentation (+2 ranged psionic distance), Force Augmentation (+1 rolled psionic damage), Speed Augmentation (+1 speed and disengage distance). Can change via psionic meditation respite activity.',
    'Talent Ward': 'Choose one: Entropy Ward (attacker speed reduced by Reason, can\'t use triggered actions until end of next turn), Repulsive Ward (push adjacent attacker up to Reason squares), Steel Ward (gain damage immunity equal to Reason until end of next turn after taking damage), Vanishing Ward (become invisible until end of next turn after taking damage). Can change via psionic meditation respite activity.',
    'Telepathic Speech': 'You know Mindspeech language. You can telepathically communicate with creatures within Mind Spike distance if they share a language with you and you know of each other.',
    'Scan': 'You can scan the minds of creatures around you for useful information.',
    'Mind Projection': 'As a maneuver, project your mind outside your body. Body is unconscious and prone. Mind is size 1T, has concealment, moves freely through solid matter. Abilities originate from mind. Both mind and body can take damage. Mind returns to body if you take damage. Can return as free maneuver.',
    'Mind Recovery': 'When spending a Recovery while strained, can forgo Stamina and gain 3 clarity instead. First time each round a creature is force moved, gain 2 clarity instead of 1.',
    'Suspensor Field': 'You can fly. While flying, stability reduced to 0 and can\'t be increased. If you can already fly, +2 speed while flying. If strained and force moved, forced movement distance gains +2 bonus.',
    'Psi Boost': 'Spend additional clarity on Psionic main actions/maneuvers: Dynamic Power (1, +Reason forced movement distance), Expanded Power (3, +1 area size), Extended Power (1, +Reason ranged distance or +2 melee distance), Heightened Power (1, +Reason rolled damage), Magnified Power (5, +Reason potency), Shared Power (5, +1 target), Sharpened Power (1, edge on power roll).',
    'Ancestral Memory': 'After each respite, replace up to Reason skills with interpersonal/lore skills until next respite.',
    'Cascading Strain': 'When you take damage from strained effects or negative clarity, choose one enemy within Mind Spike distance to take the same damage.',
    'Lucid Mind': 'Gain 1d3 + 1 clarity at start of each turn instead of 1d3.',
    'Fortress of Perfect Thought': 'You can breathe without air. Psychic immunity 10. Creatures can\'t read your thoughts unless allowed. Reason and Intuition treated as 2 higher for resisting potency. Can\'t be taunted or frightened.',
    'Clear Mind': 'First time each round a creature is force moved, gain 3 clarity instead of 2.',
    'Omnisensory': '+10 bonus to ranged ability distance. Don\'t need line of effect to a target of a ranged ability if the target is a creature capable of thought who you have previously had line of effect to.',
    'Psion': 'Gain 1d3 + 2 clarity at start of turns instead of 1d3 + 1. Can choose to not take damage from negative clarity. Can choose to take on any ability\'s strained effect even if not strained.',
    'Vision': 'Epic resource. Gain vision equal to XP each respite. Spend as clarity. Can spend vision to use one additional psionic ability on your turn (pay entire cost in vision). If ability costs no clarity, spend 1 vision. Vision remains until spent.'
  },
  advancement: {
    1: { features: ['Talent Tradition (Subclass)', 'Clarity and Strain', 'Mind Spike', 'Psionic Augmentation', 'Talent Ward', 'Telepathic Speech', 'Tradition Features', 'Signature Ability', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Perk', 'Tradition Feature', 'Tradition Ability (5-cost)'] },
    3: { features: ['Scan', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Reason & Presence to 3)', 'Mind Projection', 'Mind Recovery', 'Perk', 'Skill', 'Suspensor Field'], charBumps: { auto: { reason: 1, presence: 1 }, max: 3 } },
    5: { features: ['Tradition Feature', '9-cost Heroic Ability'] },
    6: { features: ['Perk', 'Psi Boost', 'Tradition Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Ancestral Memory', 'Cascading Strain', 'Lucid Mind', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Tradition Feature', '11-cost Heroic Ability'] },
    9: { features: ['Fortress of Perfect Thought', 'Tradition Ability (11-cost)'] },
    10: { features: ['Characteristic +1 (Reason & Presence to 5)', 'Clear Mind', 'Omnisensory', 'Perk', 'Psion', 'Skill', 'Vision'], charBumps: { auto: { reason: 1, presence: 1 }, max: 5 } }
  }
};
