// DS.Data.Classes.shadow - Shadow class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.shadow = {
  id: 'shadow', name: 'Shadow', role: 'Striker',
  description: 'Subtlety is your art, the tip of the blade your brush. You use stealth, magic, and alchemy to strike from the shadows with devastating precision.',
  heroicResource: 'Insight',
  heroicResourceDescription: 'Start combat with insight equal to Victories. Gain 1d3 insight at the start of each of your turns. Gain 1 insight the first time each round you deal damage with 1+ surges. Heroic abilities with power rolls cost 1 fewer insight if you have an edge or double edge. Outside combat, heroic abilities can be used once without spending insight.',
  primaryCharacteristics: ['agility'],
  staminaBase: 18,
  staminaPerLevel: 6,
  recoveries: 8,
  classSkillGroups: ['exploration', 'interpersonal', 'intrigue'],
  classSkillCount: 5,
  freeSkills: ['Hide', 'Sneak'],
  signatureAbilityCount: 1,
  subclassLabel: 'Shadow College',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'signature-abilities', config: { count: 1 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Hesitation Is Weakness', description: 'As a free triggered action costing 1 insight, you can take your turn immediately after another hero ends their turn.' }
    ],
    subclassFeatures: {
      college_of_black_ash: [
        { name: 'Black Ash Teleport', description: 'As a maneuver, teleport up to 5 squares. You can hide at the destination if you have concealment or cover. Gain 1 surge if hidden. Spend 1+ insight for +1 square each.' },
        { name: 'In All This Confusion', description: 'When you take damage, take half damage and teleport up to 4 squares. Spend 1+ insight for +1 square each.', tag: 'Triggered Action' }
      ],
      college_of_caustic_alchemy: [
        { name: 'Coat the Blade', description: 'As a maneuver, gain 2 surges. Surges can deal poison damage instead of normal damage.' },
        { name: 'Smoke Bomb', description: 'As a maneuver, use Hide even without cover or concealment and shift up to your Agility score.' },
        { name: 'Defensive Roll', description: 'When you take damage, take half and shift up to 2 squares. Can hide if you have concealment or cover. Spend 1 insight to reduce potency by 1.', tag: 'Triggered Action' }
      ],
      college_of_the_harlequin_mask: [
        { name: 'I\'m No Threat', description: 'You appear as a harmless creature or unarmed version of yourself. Strikes gain an edge, Disengage +1 shift. End the illusion to gain 1 surge. Spend 1 insight to appear as a specific creature.' },
        { name: 'Clever Trick', description: 'When an enemy strikes you or an ally, spend 1 insight to redirect the strike to a different enemy within striking distance.', tag: 'Triggered Action' }
      ]
    }
  },
  characteristicArrays: [
    { id: 'shadow_a', label: 'Agility + Intuition', might: -1, agility: 2, reason: -1, intuition: 2, presence: 2 },
    { id: 'shadow_b', label: 'Agility + Two', might: -1, agility: 2, reason: 1, intuition: 2, presence: 1 },
    { id: 'shadow_c', label: 'Balanced Agility', might: 0, agility: 2, reason: 0, intuition: 2, presence: 1 },
    { id: 'shadow_d', label: 'Well-Rounded', might: 0, agility: 2, reason: 1, intuition: 1, presence: 1 }
  ],
  subclasses: [
    { id: 'college_of_black_ash', name: 'College of Black Ash', description: 'Unmatched mobility using sorcery to teleport, manipulate shadows, and summon darkness. Grants Black Ash Teleport (teleport 5 squares, hide at destination), In All This Confusion triggered action (half damage, teleport 4). Skill: Magic.', skill: 'Magic' },
    { id: 'college_of_caustic_alchemy', name: 'College of Caustic Alchemy', description: 'Teaches recipes for acids, bombs, and poisons for assassination. Grants Coat the Blade (gain 2 surges as maneuver, can deal poison damage), Smoke Bomb (hide while observed, shift Agility squares), Defensive Roll triggered action (half damage, shift 2, can hide). Skill: Alchemy.', skill: 'Alchemy' },
    { id: 'college_of_the_harlequin_mask', name: 'College of the Harlequin Mask', description: 'Learn illusion magic to infiltrate and create chaos. Grants I\'m No Threat (strikes gain edge, +1 disengage, can disguise as another creature), Clever Trick triggered action (1 insight, redirect strike to another enemy). Skill: Lie.', skill: 'Lie' }
  ],
  signatureAbilities: [
    {
      name: 'Gasping in Pain', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature',
      flavor: 'Your precise strikes let your allies take advantage of a target\'s agony.',
      powerRoll: { characteristic: 'Agility', t1: '3 + A damage', t2: '5 + A damage', t3: '8 + A damage; I<strong, prone' },
      effect: 'One ally within 5 squares of the target gains 1 surge.'
    },
    {
      name: 'I Work Better Alone', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1 or ranged 5', target: 'One creature',
      flavor: '"It\'s better, just you and me. Isn\'t it?"',
      powerRoll: { characteristic: 'Agility', t1: '3 + A damage', t2: '6 + A damage', t3: '9 + A damage' },
      effect: 'If the target has none of your allies adjacent to them, gain 1 surge before making the power roll.'
    },
    {
      name: 'Teamwork Has Its Place', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1 or ranged 5', target: 'One creature or object',
      flavor: 'You attack an enemy as an ally exposes their weakness.',
      powerRoll: { characteristic: 'Agility', t1: '3 + A damage', t2: '6 + A damage', t3: '9 + A damage' },
      effect: 'If any ally is adjacent to the target, gain 1 surge before making the power roll.'
    },
    {
      name: 'You Were Watching the Wrong One', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature',
      flavor: 'They can\'t watch both of you at once.',
      powerRoll: { characteristic: 'Agility', t1: '3 + A damage', t2: '5 + A damage', t3: '8 + A damage' },
      effect: 'If 1+ allies within 5 of target, gain 1 surge. If flanking, one flanking ally also gains 1 surge.'
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Disorienting Strike', cost: 3, resource: 'Insight', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Your attack leaves them reeling, allowing you to follow up.',
        powerRoll: { characteristic: 'Agility', t1: '4 + A damage; slide 2', t2: '6 + A damage; slide 3', t3: '10 + A damage; slide 5' },
        effect: 'You can shift into any square the target leaves when you slide them.'
      },
      {
        name: 'Eviscerate', cost: 3, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'You leave your foe bleeding out after a devastating attack.',
        powerRoll: { characteristic: 'Agility', t1: '4 + A damage; A<weak, bleeding (save ends)', t2: '6 + A damage; A<avg, bleeding (save ends)', t3: '10 + A damage; A<strong, bleeding (save ends)' }
      },
      {
        name: 'Get In Get Out', cost: 3, resource: 'Insight', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Move unexpectedly, strike fast, and be gone!',
        powerRoll: { characteristic: 'Agility', t1: '5 + A damage', t2: '8 + A damage', t3: '11 + A damage' },
        effect: 'You can shift up to your speed, dividing that movement before or after your strike.'
      },
      {
        name: 'Two Throats at Once', cost: 3, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'Two creatures or objects',
        flavor: 'A bargain.',
        powerRoll: { characteristic: 'Agility', t1: '4 damage', t2: '6 damage', t3: '10 damage' }
      }
    ],
    5: [
      {
        name: 'Coup de Grace', cost: 5, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'Your blade might be the last thing they see.',
        powerRoll: { characteristic: 'Agility', t1: '2d6 + 7 + A damage', t2: '2d6 + 11 + A damage', t3: '2d6 + 16 + A damage' }
      },
      {
        name: 'One Hundred Throats', cost: 5, resource: 'Insight', keywords: ['Melee', 'Weapon'], type: 'Main action',
        distance: 'Self', target: 'Self',
        flavor: 'As you move across the battlefield, every foe within reach feels your wrath.',
        powerRoll: { characteristic: 'Agility', t1: '3 damage', t2: '6 damage', t3: '9 damage' },
        effect: 'Shift up to your speed and make one power roll that targets up to three enemies you come adjacent to.'
      },
      {
        name: 'Setup', cost: 5, resource: 'Insight', keywords: ['Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Ranged 5', target: 'One creature',
        flavor: 'Your friends will thank you.',
        powerRoll: { characteristic: 'Agility', t1: '6 + A damage; R<weak, damage weakness 5 (save ends)', t2: '9 + A damage; R<avg, damage weakness 5 (save ends)', t3: '13 + A damage; R<strong, damage weakness 5 (save ends)' }
      },
      {
        name: 'Shadowstrike', cost: 5, resource: 'Insight', keywords: ['Magic', 'Melee', 'Ranged'], type: 'Main action',
        distance: 'Self', target: 'Self',
        flavor: 'They have no idea what the college taught you.',
        effect: 'You can use a strike signature ability twice.'
      }
    ],
    9: [
      {
        name: 'Blackout', cost: 9, resource: 'Insight', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '3 burst', target: 'Special',
        flavor: 'You cause a plume of shadow to erupt, creating a cloud of darkness.',
        effect: 'A black cloud fills the area until end of your next turn, granting you and allies concealment against enemies. While in the area, whenever an enemy ends their turn in the area, you can shift to a new location within it and make a free strike against them.'
      },
      {
        name: 'Into the Shadows', cost: 9, resource: 'Insight', keywords: ['Magic', 'Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'You sweep your foe off their feet and plunge them into absolute darkness.',
        powerRoll: { characteristic: 'Agility', t1: '8 + A corruption damage', t2: '13 + A corruption damage', t3: '17 + A corruption damage' },
        effect: 'You and the target are removed from the encounter map until the start of your next turn. You reappear in the spaces you left or nearest unoccupied spaces. Make the power roll upon return.'
      },
      {
        name: 'Shadowfall', cost: 9, resource: 'Insight', keywords: ['Area', 'Melee', 'Weapon'], type: 'Main action',
        distance: '10 x 1 line within 1', target: 'Each enemy in the area',
        flavor: 'You vanish. They fall. You reappear.',
        powerRoll: { characteristic: 'Agility', t1: '10 damage', t2: '14 damage', t3: '20 damage' },
        effect: 'You disappear before the power roll. After resolution, you appear in the first unoccupied space at the far end of the line.'
      },
      {
        name: 'You Talk Too Much', cost: 9, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'Silence is a virtue. A knife pinning their mouth shut is the next best thing.',
        powerRoll: { characteristic: 'Agility', t1: '10 + A damage; P<weak, dazed (save ends)', t2: '15 + A damage; P<avg, dazed (save ends)', t3: '21 + A damage; P<strong, dazed (save ends)' },
        effect: 'The target can\'t communicate with anyone until the end of the encounter.'
      }
    ],
    11: [
      {
        name: 'Assassinate', cost: 11, resource: 'Insight', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'A practiced attack will instantly kill an already weakened foe.',
        powerRoll: { characteristic: 'Agility', t1: '12 + A damage', t2: '18 + A damage', t3: '24 + A damage' },
        effect: 'A target who is not a minion, leader, or solo creature and who is winded after taking this damage is reduced to 0 Stamina.'
      },
      {
        name: 'Shadowgrasp', cost: 11, resource: 'Insight', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '2 burst', target: 'Each enemy in the area',
        flavor: 'The shadows around you give way, allowing the shadow creature within you to grasp at your foes.',
        powerRoll: { characteristic: 'Agility', t1: '11 corruption damage; A<weak, restrained (save ends)', t2: '16 corruption damage; A<avg, restrained (save ends)', t3: '21 corruption damage; A<strong, restrained (save ends)' }
      },
      {
        name: 'Speed of Shadows', cost: 11, resource: 'Insight', keywords: ['Magic'], type: 'Main action',
        distance: 'Self', target: 'Self',
        flavor: 'You make multiple strikes before they even notice they\'re dead.',
        effect: 'Use a strike signature ability four times, a strike signature ability with an edge three times, or a strike signature ability with a double edge twice. You can shift up to 2 squares between each use.'
      },
      {
        name: 'They Always Line Up', cost: 11, resource: 'Insight', keywords: ['Area', 'Ranged', 'Weapon'], type: 'Main action',
        distance: '5 x 1 line within 5', target: 'Each enemy in the area',
        flavor: 'You fire a projectile so fast it passes through a line of foes.',
        powerRoll: { characteristic: 'Agility', t1: '12 damage; M<weak, slowed (save ends)', t2: '18 damage; M<avg, slowed (save ends)', t3: '24 damage; M<strong, slowed (save ends)' }
      }
    ],
    7: [
      {
        name: 'Dancer', cost: 7, resource: 'Insight', keywords: ['Weapon'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your footwork is unmatched.',
        effect: 'Until end of encounter, whenever an enemy moves adjacent to you, is force moved adjacent to you, or damages you, you can Disengage as a free triggered action.'
      },
      {
        name: 'Misdirecting Strike', cost: 7, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: '"Why are you looking at ME?!"',
        powerRoll: { characteristic: 'Agility', t1: '9 + A damage', t2: '13 + A damage', t3: '18 + A damage' },
        effect: 'Target is taunted by a willing ally within 5 squares until end of target\'s next turn.'
      },
      {
        name: 'Pinning Shot', cost: 7, resource: 'Insight', keywords: ['Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Ranged 5', target: 'One creature',
        flavor: 'One missile -- placed well and placed hard.',
        powerRoll: { characteristic: 'Agility', t1: '8 + A damage; A<weak, restrained (save ends)', t2: '12 + A damage; A<avg, restrained (save ends)', t3: '16 + A damage; A<strong, restrained (save ends)' }
      },
      {
        name: 'Staggering Blow', cost: 7, resource: 'Insight', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'There\'s no recovering from this.',
        powerRoll: { characteristic: 'Agility', t1: '7 + A damage; M<weak, slowed (save ends)', t2: '11 + A damage; M<avg, prone and can\'t stand (save ends)', t3: '16 + A damage; M<strong, prone and can\'t stand (save ends)' }
      }
    ]
  },
  features: {
    'Hesitation Is Weakness': '1 Insight. Free triggered action when another hero ends their turn - take your turn immediately after.',
    'Insight Resource': 'Start combat with insight equal to Victories. Gain 1d3 at start of each turn. Gain 1 insight first time each round you deal damage with surges. Outside combat, heroic abilities can be used once without spending insight until you earn Victories or finish a respite.',
    'College Triggered Action': 'Black Ash: In All This Confusion (half damage, teleport 4). Caustic Alchemy: Defensive Roll (half damage, shift 2, hide). Harlequin Mask: Clever Trick (1 insight, redirect strike to another enemy).',
    'Careful Observation': 'Maneuver, Ranged 20, one creature. As long as you remain within distance, maintain line of effect, and strike no other creature first, you gain an edge on the next strike against the target and gain 1 surge for that strike.',
    'Keep It Down': 'While conversing with any creature you share a language with, you can decide whether anyone else can perceive what you\'re conveying, even while yelling.',
    'Night Watch': 'While hidden, enemies take a bane on tests to search for you or other hidden creatures within 10 squares. Triggered: when an ally takes damage while you are hidden, the target takes half damage and you remain hidden.',
    'Surge of Insight': 'The first time each combat round that you deal damage incorporating 1 or more surges, you gain 2 insight instead of 1.',
    'Umbral Form': 'Maneuver. Become a shadow creature until end of encounter or until dying. While in this form: auto-climb at full speed, pass through enemy spaces (dealing Agility corruption damage), auto-hide with cover/concealment, gain 1 surge per turn, corruption immunity 5 + level. Drawbacks: enemies have edge on strikes against you, bane on Presence tests.',
    'Keen Insight': 'At the start of each of your turns during combat, you gain 1d3 + 1 insight instead of 1d3.',
    'Ventriloquist': 'Whenever you communicate, you can throw your voice so it seems to originate from a creature or object within 10 squares. If hidden, talking this way doesn\'t reveal you.',
    'Gloom Squad': 'At the start of each turn, forgo gaining insight to create 1d6 clones in adjacent spaces. Clones use your statistics but have 1 Stamina. They last until start of your next turn and can only make free strikes.',
    'Death Pool': 'The first time each combat round that you deal damage incorporating 1 or more surges, you gain 3 insight instead of 2.',
    'Improved Umbral Form': 'Full control over Umbral Form transformation, can end at will. Always wreathed in darkness granting concealment. Enemies no longer gain edge on strikes. Can spend 1 min to teleport self and allies within 10 squares to a previously visited location (invisible for 1 hour).',
    'Subterfuge Epic Resource': 'You gain subterfuge (epic resource) equal to XP each respite. Spend subterfuge as insight. Can also spend subterfuge to take additional maneuvers on your turn. Subterfuge persists until spent.'
  },
  advancement: {
    1: { features: ['Shadow College (Subclass)', 'Insight', 'College Features', 'College Triggered Action', 'Hesitation Is Weakness', 'Kit', 'Signature Ability', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['College Feature', 'Perk', 'College Ability (5-cost)'] },
    3: { features: ['Careful Observation', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Agility to 3, +1 other)', 'Keep It Down', 'Night Watch', 'Perk', 'Skill', 'Surge of Insight'], charBumps: { auto: { agility: 1 }, choose: 1, max: 3 } },
    5: { features: ['College Feature', '9-cost Heroic Ability'] },
    6: { features: ['Perk', 'Umbral Form', 'College Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Keen Insight', 'Skill', 'Careful Observation Improvement', 'Ventriloquist'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['College Feature', 'Perk', '11-cost Heroic Ability'] },
    9: { features: ['Gloom Squad', 'College Ability (11-cost)'] },
    10: { features: ['Characteristic +1 (Agility to 5, +1 other)', 'Death Pool', 'Perk', 'Skill', 'Careful Observation Improvement', 'Improved Umbral Form', 'Subterfuge Epic Resource'], charBumps: { auto: { agility: 1 }, choose: 1, max: 5 } }
  }
};
