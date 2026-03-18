// DS.Data.Classes.elementalist - Elementalist class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.elementalist = {
  id: 'elementalist', name: 'Elementalist', role: 'Controller',
  description: 'The most ancient and primordial magic in the timescape is elemental magic -- the magic of the core building blocks of all things. Those who study this primal force can become elementalists, channeling power from the Elemental Planes to devastate their foes with blasts of fire, lightning, and more.',
  heroicResource: 'Essence',
  heroicResourceDescription: 'Start combat with essence equal to Victories. Gain 1d3 essence at the start of each of your turns. Gain 1 essence each time you damage an enemy with an ability that has a persistent area. Outside combat, heroic abilities can be used once without spending essence.',
  primaryCharacteristics: ['reason', 'intuition'],
  staminaBase: 18,
  staminaPerLevel: 6,
  recoveries: 8,
  classSkillGroups: ['lore', 'crafting'],
  classSkillCount: 2,
  freeSkills: ['Magic'],
  signatureAbilityCount: 2,
  subclassLabel: 'Elemental Specialization',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'persistent-magic' },
    { section: 'signature-abilities', config: { count: 2 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Hurl Element', description: 'Ranged 10 free strike. Choose damage type: acid, cold, corruption, fire, lightning, poison, or sonic.' },
      { name: 'Practical Magic', description: 'As a maneuver, choose: Knockback using Reason instead of Might, deal Reason-based damage to a creature within range, or teleport by spending essence.' }
    ],
    subclassFeatures: {
      geomancer: [
        { name: 'Motivate Earth', description: 'Touch mundane dirt, stone, or metal to create a 5-wall, open openings in structures, or seal openings.' },
        { name: 'Skin Like Castle Walls', description: 'When a target takes damage, they take half damage. Spend 1 essence to also reduce potency by 1.', tag: 'Triggered Action' }
      ],
      pyromancer: [
        { name: 'Return to Formlessness', description: 'Touch a mundane object to destroy it by heating (melts or combusts).' },
        { name: 'Explosive Assistance', description: 'Forced movement gains a bonus equal to your Reason score. Spend 1 essence for a bonus equal to twice Reason.', tag: 'Triggered Action' }
      ],
      stormwight: [
        { name: 'Ride the Lightning', description: 'You can fly up to your speed as part of a move action. Lightning-based abilities gain +1 distance.' },
        { name: 'Subtle Relocation', description: 'Teleport a target up to your Reason score when they start turn, move, or are force moved. Spend 1 essence for double distance.', tag: 'Triggered Action' }
      ]
    },
    choices: [
      {
        name: 'Enchantment',
        key: 'enchantment',
        description: 'Choose an enchantment that enhances your combat style.',
        options: [
          { id: 'battle', name: 'Enchantment of Battle', description: 'Wear light armor and wield light weapons. +3 Stamina per echelon, +1 weapon damage.' },
          { id: 'celerity', name: 'Enchantment of Celerity', description: '+1 speed and +1 to Disengage shift distance.' },
          { id: 'destruction', name: 'Enchantment of Destruction', description: '+1 damage with magic abilities.' },
          { id: 'distance', name: 'Enchantment of Distance', description: '+2 distance on ranged magic abilities.' },
          { id: 'permanence', name: 'Enchantment of Permanence', description: '+6 Stamina per echelon, +1 stability.' }
        ]
      },
      {
        name: 'Elementalist Ward',
        key: 'ward',
        description: 'Choose a ward that protects you in combat.',
        options: [
          { id: 'delightful', name: 'Ward of Delightful Consequences', description: 'Gain 1 surge the first time each round you take damage.' },
          { id: 'excellent', name: 'Ward of Excellent Protection', description: 'Immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to your Reason score.' },
          { id: 'nature', name: 'Ward of Nature\'s Affection', description: 'Slide a creature up to your Reason score as a free triggered action when they deal damage to you.' },
          { id: 'reactivity', name: 'Ward of Surprising Reactivity', description: 'Push an adjacent creature up to twice your Reason score as a free triggered action when they deal damage to you.' }
        ]
      }
    ]
  },
  characteristicArrays: [
    { id: 'elementalist_a', label: 'Presence Focus', reason: 2, intuition: 2, might: -1, agility: -1, presence: 2 },
    { id: 'elementalist_b', label: 'Balanced', reason: 2, intuition: 2, might: 1, agility: 1, presence: -1 },
    { id: 'elementalist_c', label: 'Even Spread', reason: 2, intuition: 2, might: 1, agility: 0, presence: 0 }
  ],
  subclasses: [
    { id: 'geomancer', name: 'Geomancer', description: 'You focus on earth and stone. Grants specialization features at levels 2, 5, and 8 that enhance earth-based abilities. Skill from crafting group.', skillGroup: 'crafting' },
    { id: 'pyromancer', name: 'Pyromancer', description: 'You focus on fire and heat. Grants specialization features at levels 2, 5, and 8 that enhance fire-based abilities. Skill from lore group.', skillGroup: 'lore' },
    { id: 'stormwight', name: 'Stormwight', description: 'You focus on air and lightning. Grants specialization features at levels 2, 5, and 8 that enhance lightning-based abilities. Skill from exploration group.', skillGroup: 'exploration' }
  ],
  signatureAbilities: [
    {
      name: 'Burning Hands', keywords: ['Area', 'Fire', 'Magic', 'Ranged'], type: 'Main action',
      distance: '3 cube within 10', target: 'Each enemy in the area',
      flavor: 'Flames erupt from your palms.',
      powerRoll: { characteristic: 'Reason', t1: '2 fire damage', t2: '4 fire damage', t3: '6 fire damage' },
      effect: 'A column of fire remains in the area until the start of your next turn, dealing 2 fire damage to creatures entering or starting their turn there.'
    },
    {
      name: 'Freezing Grasp', keywords: ['Magic', 'Melee', 'Strike'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'Cold radiates from your hand to freeze your foe.',
      powerRoll: { characteristic: 'Reason', t1: '3 + R cold damage', t2: '5 + R cold damage; R<weak, slowed (EoT)', t3: '8 + R cold damage; R<avg, slowed (EoT)' },
      effect: 'You can shift 1 square before or after this strike.'
    },
    {
      name: 'Lightning Lance', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'A bolt of lightning streaks from your hand toward your foe.',
      powerRoll: { characteristic: 'Reason', t1: '3 + R lightning damage', t2: '5 + R lightning damage', t3: '8 + R lightning damage' },
      effect: 'You can slide the target 1 square.'
    },
    {
      name: 'Stone Spike', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'A chunk of stone erupts from the ground beneath your enemy.',
      powerRoll: { characteristic: 'Reason', t1: '3 + R damage; push 1', t2: '5 + R damage; push 2', t3: '8 + R damage; push 3' },
      effect: 'The target takes extra damage equal to the number of squares pushed if they collide with an object or another creature.'
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Acid Storm', cost: 3, resource: 'Essence', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'You call down a rain of corrosive acid.',
        powerRoll: { characteristic: 'Reason', t1: '3 acid damage', t2: '5 acid damage', t3: '7 acid damage' },
        effect: 'Persistent: The area becomes persistent. Each creature that enters or starts their turn in the area takes acid damage equal to your Reason score.'
      },
      {
        name: 'Earthen Force', cost: 3, resource: 'Essence', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '5 wall within 10', target: 'Special',
        flavor: 'You raise a wall of stone that shoves foes aside.',
        effect: 'The wall is 2 squares high. You can place it in occupied squares, sliding each creature in an occupied square to the nearest unoccupied square. The wall provides cover for allies. Each enemy adjacent to the wall takes 3 damage when it appears. Persistent: The wall remains until you dismiss it.'
      },
      {
        name: 'Lightning Arc', cost: 3, resource: 'Essence', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object; a second target within 5 of the first',
        flavor: 'Electricity arcs between your enemies.',
        powerRoll: { characteristic: 'Reason', t1: '5 + R lightning damage (each target)', t2: '7 + R lightning damage (each target)', t3: '10 + R lightning damage (each target)' }
      },
      {
        name: 'Poison Cloud', cost: 3, resource: 'Essence', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each creature in the area',
        flavor: 'A sickly green cloud of poison fills the area.',
        powerRoll: { characteristic: 'Reason', t1: '3 poison damage', t2: '5 poison damage', t3: '7 poison damage; R<weak, weakened (save ends)' },
        effect: 'Persistent: The cloud remains in the area. Each creature that enters or starts their turn in the area takes poison damage equal to your Reason score.'
      }
    ],
    5: [
      {
        name: 'Cone of Cold', cost: 5, resource: 'Essence', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '5 cone', target: 'Each enemy in the area',
        flavor: 'A blast of frigid air freezes everything before you.',
        powerRoll: { characteristic: 'Reason', t1: '5 cold damage', t2: '8 cold damage; R<weak, slowed (save ends)', t3: '11 cold damage; R<avg, restrained (save ends)' }
      },
      {
        name: 'Fireball', cost: 5, resource: 'Essence', keywords: ['Area', 'Fire', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'A blazing sphere of fire detonates amid your enemies.',
        powerRoll: { characteristic: 'Reason', t1: '5 fire damage', t2: '8 fire damage', t3: '12 fire damage' },
        effect: 'Persistent: The area is on fire. Creatures entering or starting their turn there take fire damage equal to your Reason score.'
      },
      {
        name: 'Shatter', cost: 5, resource: 'Essence', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy and object in the area',
        flavor: 'A focused pulse of force shatters everything in its path.',
        powerRoll: { characteristic: 'Reason', t1: '6 sonic damage', t2: '9 sonic damage; push 1', t3: '13 sonic damage; push 3' }
      },
      {
        name: 'Thunderstrike', cost: 5, resource: 'Essence', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'A bolt of lightning strikes down from above.',
        powerRoll: { characteristic: 'Reason', t1: '8 + R lightning damage', t2: '12 + R lightning damage', t3: '17 + R lightning damage; dazed (save ends)' }
      }
    ],
    7: [
      {
        name: 'Erase', cost: 7, resource: 'Essence', keywords: ['Magic', 'Ranged', 'Strike', 'Void'], type: 'Main action',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'With a flick of the wrist, you phase creatures out of existence.',
        powerRoll: { characteristic: 'Reason', t1: 'One creature', t2: 'Two creatures', t3: 'Three creatures' },
        effect: 'Each target begins to fade from existence (save ends). On their first turn while fading, a target takes a bane on power rolls. At the end of their first turn, they have a double bane. At the end of their second turn, they fade for 1 hour, reappearing in their original space or nearest unoccupied space.'
      },
      {
        name: 'Maw of Earth', cost: 7, resource: 'Essence', keywords: ['Area', 'Earth', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'You open up the ground, spewing out shrapnel of stone and debris.',
        powerRoll: { characteristic: 'Reason', t1: '5 damage', t2: '9 damage', t3: '12 damage' },
        effect: 'The ground in or directly beneath the area drops 3 squares.'
      },
      {
        name: 'Swarm of Spirits', cost: 7, resource: 'Essence', keywords: ['Area', 'Green', 'Magic'], type: 'Main action',
        distance: '3 aura', target: 'Each enemy in the area',
        flavor: 'Guardian animal spirits surround you to harry your foes and bolster your allies.',
        powerRoll: { characteristic: 'Reason', t1: '3 damage', t2: '6 damage', t3: '9 damage' },
        effect: 'Until the end of your next turn, each ally in the area has each of their characteristic scores treated as 1 higher for resisting potencies, and has a +1 bonus to saving throws. Spend 1 Essence: Make the power roll again without spending essence, and the effect lasts until start of your next turn.'
      },
      {
        name: 'Wall of Fire', cost: 7, resource: 'Essence', keywords: ['Area', 'Fire', 'Magic', 'Ranged'], type: 'Maneuver',
        distance: '10 wall within 10', target: 'Special',
        flavor: 'A blazing, beautifully organized inferno erupts at your command.',
        effect: 'The wall lasts until the start of your next turn, and can be placed in occupied squares. Each enemy who enters the area for the first time in a round or starts their turn there takes fire damage equal to your Reason score for each square they occupy. Spend 1 Essence: The wall lasts until start of your next turn, and you can add squares equal to your Reason score.'
      }
    ],
    9: [
      {
        name: 'Combustion Deferred', cost: 9, resource: 'Essence', keywords: ['Fire', 'Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'Your flames dance from kindling to kindling to kindling.',
        powerRoll: { characteristic: 'Reason', t1: '8 + R fire damage', t2: '13 + R fire damage', t3: '17 + R fire damage' },
        effect: 'When the target ends their next turn, or if they drop to 0 Stamina before then, each enemy adjacent to them takes fire damage equal to twice your Reason score. Each affected enemy then gains this same effect.'
      },
      {
        name: 'Storm of Sands', cost: 9, resource: 'Essence', keywords: ['Area', 'Earth', 'Magic', 'Ranged'], type: 'Main action',
        distance: '4 cube within 10', target: 'Each enemy in the area',
        flavor: 'Dirt and debris swirl into a dark, pulsing hurricane.',
        powerRoll: { characteristic: 'Reason', t1: '2 damage', t2: '5 damage', t3: '7 damage' },
        effect: 'The area lasts until the start of your next turn. It is difficult terrain for enemies, and you and allies have concealment while in the area. Spend 1 Essence: The area remains, and you can move it up to 5 squares. As a maneuver, make the power roll again without spending essence.'
      },
      {
        name: 'Subverted Perception of Space', cost: 9, resource: 'Essence', keywords: ['Magic', 'Ranged', 'Strike', 'Void'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You rip an enemy\'s world in twain.',
        powerRoll: { characteristic: 'Reason', t1: '9 + R corruption damage', t2: '10 + R corruption damage; the target has line of effect only to creatures within 4 squares until start of your next turn', t3: '15 + R corruption damage; the target has line of effect only to adjacent creatures until start of your next turn' }
      },
      {
        name: 'Web of All That\'s Come Before', cost: 9, resource: 'Essence', keywords: ['Area', 'Green', 'Magic', 'Ranged'], type: 'Main action',
        distance: '4 cube within 10', target: 'Each enemy in the area',
        flavor: 'Threads you\'ve been weaving through your adventures create a vibrant, pearlescent web.',
        powerRoll: { characteristic: 'Reason', t1: '2 corruption damage; A<weak, restrained (save ends)', t2: '3 corruption damage; A<avg, restrained (save ends)', t3: '5 corruption damage; A<strong, restrained (save ends)' },
        effect: 'The area is difficult terrain until start of your next turn. Each enemy who ends their turn in the area is restrained (save ends).'
      },
      {
        name: 'Luminous Champion Aloft', cost: 9, resource: 'Essence', keywords: ['Fire', 'Green', 'Magic', 'Ranged', 'Void'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'They shine vibrantly, a beautiful diamond in the night sky.',
        effect: 'The target has a +3 bonus to speed, they can fly, and their abilities ignore concealment. Whenever the target gains their Heroic Resource, they gain 1 additional. This effect lasts until the start of your next turn. Spend 1 Essence: The effect lasts until start of your next turn.'
      },
      {
        name: 'Magma Titan', cost: 9, resource: 'Essence', keywords: ['Earth', 'Fire', 'Green', 'Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'Their body swells with lava, mud, and might, towering over their enemies.',
        effect: 'Until start of your next turn, the target\'s size and stability increase by 2. They have fire immunity 10. Their strikes deal extra fire damage equal to twice your Reason score. When the target force moves a creature or object, the distance gains a +2 bonus. They can use their highest characteristic instead of Might for Might power rolls. Spend 2 Essence: The effect lasts until start of your next turn, and the target can spend 2 Recoveries.'
      },
      {
        name: 'Meteor', cost: 9, resource: 'Essence', keywords: ['Earth', 'Fire', 'Magic', 'Ranged', 'Void'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You teleport the target into the air and let the ground and elemental fire do the rest.',
        powerRoll: { characteristic: 'Reason', t1: 'Teleport the target up to 4 squares', t2: 'Teleport the target up to 6 squares', t3: 'Teleport the target up to 8 squares' },
        effect: 'If the target is teleported to a space where they would fall, they immediately do so, treating the fall as if their Agility score were 0. The target takes fire damage from the fall, and each enemy within 3 squares takes the same fire damage. The ground within 3 squares becomes difficult terrain.'
      },
      {
        name: 'The Wode Remembers and Returns', cost: 9, resource: 'Essence', keywords: ['Area', 'Earth', 'Green', 'Magic', 'Void'], type: 'Main action',
        distance: '4 burst', target: 'Special',
        flavor: 'You create a terrarium that spans from canopy above to underbrush below.',
        effect: 'The area becomes dark and verdant, with trees and plant life appearing until start of your next turn. The area is difficult terrain for enemies, and any ally who ends their turn in the area has cover. Spend 2 Essence: The area remains until start of your next turn, and each ally in the area can spend a Recovery.'
      }
    ],
    11: [
      {
        name: 'Heart of the Wode', cost: 11, resource: 'Essence', keywords: ['Green', 'Magic', 'Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'You call forth one of the Great Tree\'s many splinters to provide for your every need.',
        effect: 'A size 5 tree appears in an unoccupied space within distance with 100 Stamina that can\'t be force moved. You and allies can touch it to use Catch Breath as a free maneuver. When you start your turn with line of effect to the tree, you can end one save-ends effect or stand up. Each ally within distance also gains this benefit. Each enemy ending their turn within 3 squares is restrained until end of their next turn.'
      },
      {
        name: 'Muse of Fire', cost: 11, resource: 'Essence', keywords: ['Area', 'Fire', 'Magic', 'Ranged'], type: 'Main action',
        distance: '5 cube within 10', target: 'Each enemy in the area',
        flavor: 'The fire burns hot enough to sear the face of any god watching.',
        powerRoll: { characteristic: 'Reason', t1: '7 fire damage; the Director loses 2 Malice', t2: '10 fire damage; the Director loses 3 Malice', t3: '15 fire damage; the Director loses 4 Malice' },
        effect: 'The Director\'s Malice can become negative as a result of this ability.'
      },
      {
        name: 'Return to Oblivion', cost: 11, resource: 'Essence', keywords: ['Area', 'Magic', 'Ranged', 'Void'], type: 'Main action',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'You create a tear in reality that could consume everything.',
        effect: 'You create a size 1L vortex that lasts until end of encounter. At the start of each combat round while unoccupied, the vortex vertical pulls 3 each enemy within 5 squares. Any enemy who enters or starts their turn there is knocked prone. At end of round, if a winded non-leader/solo enemy is in the vortex, they are instantly destroyed.'
      },
      {
        name: 'World Torn Asunder', cost: 11, resource: 'Essence', keywords: ['Area', 'Earth', 'Magic'], type: 'Main action',
        distance: '5 burst', target: 'Each enemy in the area',
        flavor: 'You stomp your foot and quake the whole world over.',
        powerRoll: { characteristic: 'Reason', t1: 'M<weak, prone', t2: 'M<avg, prone', t3: 'M<strong, prone' },
        effect: 'You create a fissure adjacent to you that is a 10 x 2 line and 6 squares deep. Each creature in the area who is prone and size 2 or smaller falls in.'
      },
      {
        name: 'Earth Rejects You', cost: 11, resource: 'Essence', keywords: ['Area', 'Earth', 'Magic', 'Ranged'], type: 'Main action',
        distance: '5 cube within 10', target: 'Each enemy and object in the area',
        flavor: 'Everyone and everything gets blown away in an eruption of rocks and debris.',
        powerRoll: { characteristic: 'Reason', t1: '6 damage', t2: '9 damage', t3: '13 damage' },
        effect: 'Spend 2 Essence: At the start of your turn, use a maneuver to use this ability again without spending essence.'
      },
      {
        name: 'The Green Defends Its Servants', cost: 11, resource: 'Essence', keywords: ['Green', 'Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'A luminous green shield shows its true beauty the more it cracks.',
        effect: 'You conjure an elemental shield until end of your next turn. While active, the target can take the Defend action as a maneuver. The target gains 30 temporary Stamina. If this temporary Stamina disappears, the shield explodes, dealing 10 damage to each enemy within 5 squares.'
      },
      {
        name: 'Prism', cost: 11, resource: 'Essence', keywords: ['Magic', 'Void'], type: 'Main action',
        distance: 'Self', target: 'Self',
        flavor: 'You split your essence, allowing you to cast multiple effects at once.',
        effect: 'You use up to three heroic abilities whose essence costs total 11 or less, spending no additional essence beyond the cost of this ability. You can shift up to 2 squares between each ability.'
      },
      {
        name: 'Unquenchable Fire', cost: 11, resource: 'Essence', keywords: ['Fire', 'Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One enemy or object',
        flavor: 'You let fly a fiery missile braided with pure primal energy.',
        powerRoll: { characteristic: 'Reason', t1: '13 + R fire damage; I<weak, dazed (save ends)', t2: '18 + R fire damage; I<avg, dazed (save ends)', t3: '25 + R fire damage; I<strong, dazed (save ends)' },
        effect: 'This damage ignores immunity.'
      }
    ]
  },
  features: {
    'Essence Resource': 'Start combat with essence equal to Victories. Gain 1d3 at start of each turn. Gain 1 essence each time you damage an enemy with an ability that has a persistent area. Outside combat, heroic abilities can be used once without spending essence until you earn Victories or finish a respite.',
    'Hurl Element': 'Ranged 10 free strike. Power Roll + Reason: <=11: 2 + R damage; 12-16: 5 + R damage; 17+: 7 + R damage. Choose damage type: cold, corruption, fire, lightning, or poison.',
    'Persistent Magic': 'Certain elementalist abilities create persistent areas. The area remains until end of encounter or dismissed. You can have one persistent area active at a time; creating a new one ends the previous.',
    'Practical Magic': 'You can use your Hurl Element ability as a maneuver instead of a main action.',
    'Essence Overflow': 'At the start of each of your turns during combat, you gain 1d3 + 1 essence instead of 1d3.',
    'Improved Persistent Magic': 'You can have two persistent areas active at a time.',
    'Elemental Mastery': 'Whenever you use a signature ability, you can choose to change its damage type to any elemental type (acid, cold, corruption, fire, lightning, poison, or sonic).',
    'Primordial': 'You have an epic resource called primordial. Each time you finish a respite, you gain primordial equal to the XP you gain. You can spend primordial as if it were essence. Additionally, whenever you create a persistent area, you can spend 1 primordial to make it permanent (it doesn\'t count against your limit and doesn\'t end when you create a new one). Primordial remains until you spend it.'
  },
  advancement: {
    1: { features: ['Elemental Specialization (Subclass)', 'Essence', 'Hurl Element', 'Persistent Magic', 'Specialization Feature', 'Signature Ability x2', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Perk', 'Specialization Feature', 'Specialization Ability (5-cost)'] },
    3: { features: ['Practical Magic', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Reason & Intuition to 3)', 'Essence Overflow', 'Perk', 'Skill'], charBumps: { auto: { reason: 1, intuition: 1 }, max: 3 } },
    5: { features: ['Specialization Feature', '9-cost Heroic Ability'] },
    6: { features: ['Perk', 'Specialization Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Improved Persistent Magic', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Specialization Feature', '11-cost Heroic Ability'] },
    9: { features: ['Elemental Mastery', 'Specialization Ability (11-cost)'] },
    10: { features: ['Characteristic +1 (Reason & Intuition to 5)', 'Primordial', 'Perk', 'Skill'], charBumps: { auto: { reason: 1, intuition: 1 }, max: 5 } }
  }
};
