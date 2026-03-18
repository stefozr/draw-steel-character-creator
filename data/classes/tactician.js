// DS.Data.Classes.tactician - Tactician class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.tactician = {
  id: 'tactician', name: 'Tactician', role: 'Support',
  description: 'Strategist. Defender. Leader. With weapon in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.',
  heroicResource: 'Focus',
  heroicResourceDescription: 'Start combat with focus equal to Victories. Gain 2 focus at the start of each of your turns. Gain 1 focus the first time each round you or an ally damages a creature marked by you. Gain 1 focus the first time each round an ally within 10 squares uses a heroic ability. Outside combat, heroic abilities can be used once without spending focus.',
  primaryCharacteristics: ['might', 'reason'],
  staminaBase: 21,
  staminaPerLevel: 9,
  recoveries: 10,
  classSkillGroups: ['exploration'],
  classSkillCount: 2,
  freeSkills: ['Lead'],
  signatureAbilityCount: 0,
  subclassLabel: 'Tactical Doctrine',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'mark-field-arsenal' },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Strike Now!', description: 'As a main action, target an ally within ranged 10 who can use a signature ability as a free triggered action. Spend 5 focus to target two allies instead.' }
    ],
    subclassFeatures: {
      insurgent: [
        { name: 'Covert Operations', description: 'Allies gain an edge on intrigue tests while in your presence. You can use Lead to assist allies with intrigue tests.' },
        { name: 'Advanced Tactics', description: 'When an ally deals damage, grant them 2 surges. Spend 1 focus to also increase potency by 1.', tag: 'Triggered Action' }
      ],
      mastermind: [
        { name: 'Studied Commander', description: 'Discover Lore projects about wars and battles are treated as one category cheaper. You can make a Reason test with 24+ hours notice for encounter intel.' },
        { name: 'Overwatch', description: 'When a marked creature moves, an ally can make a free strike against them. Spend 1 focus to also slow the target.', tag: 'Triggered Action' }
      ],
      vanguard: [
        { name: 'Commanding Presence', description: 'Heroes treat their Renown as 2 higher during negotiations. Heroes gain a double edge on tests to stop combat.' },
        { name: 'Parry', description: 'When you or an ally takes damage, shift 1 square and the target takes half damage. Spend 1 focus for shift distance equal to Reason and ranged 1 + Reason.', tag: 'Triggered Action' }
      ]
    }
  },
  characteristicArrays: [
    { id: 'tactician_a', label: 'Might/Reason Focus', might: 2, agility: 2, reason: 2, intuition: -1, presence: -1 },
    { id: 'tactician_b', label: 'Balanced Might', might: 2, agility: 1, reason: 2, intuition: 1, presence: -1 },
    { id: 'tactician_c', label: 'Even Spread', might: 2, agility: 1, reason: 2, intuition: 0, presence: 0 },
    { id: 'tactician_d', label: 'Well-Rounded', might: 2, agility: 0, reason: 2, intuition: 0, presence: 0 }
  ],
  subclasses: [
    { id: 'insurgent', name: 'Insurgent', description: 'You\'ll do whatever it takes to keep your allies alive. Grants Covert Operations (allies gain edge on intrigue tests in your presence), Advanced Tactics triggered action (grant 2 surges when ally deals damage, spend 1 Focus for +1 potency). Skill from intrigue group.', skillGroup: 'intrigue' },
    { id: 'mastermind', name: 'Mastermind', description: 'You view the battlefield as a game board, thinking steps ahead of opponents. Grants Studied Commander (cheaper Discover Lore for wars/battles, Reason test for pre-encounter intel), Overwatch triggered action (ally free strike when target moves, spend 1 Focus to slow). Skill from lore group.', skillGroup: 'lore' },
    { id: 'vanguard', name: 'Vanguard', description: 'You lead from the front lines through sheer force of will. Grants Commanding Presence (allies treat Renown as 2 higher, double edge to start negotiations), Parry triggered action (shift 1, half damage to self or ally, -1 potency, spend 1 Focus for extended range). Skill from interpersonal group.', skillGroup: 'interpersonal' }
  ],
  signatureAbilities: [],
  heroicAbilities: {
    3: [
      {
        name: 'Battle Cry', cost: 3, resource: 'Focus', keywords: ['Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Three allies',
        flavor: 'You shout a phrase that galvanizes your team.',
        powerRoll: { characteristic: 'Reason', t1: 'Each target gains 1 surge', t2: 'Each target gains 2 surges', t3: 'Each target gains 3 surges' }
      },
      {
        name: 'Concussive Strike', cost: 3, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature or object',
        flavor: 'Your precise strike leaves your foe struggling to respond.',
        powerRoll: { characteristic: 'Might', t1: '3 + M damage; M<weak, dazed (save ends)', t2: '5 + M damage; M<avg, dazed (save ends)', t3: '8 + M damage; M<strong, dazed (save ends)' }
      },
      {
        name: 'Inspiring Strike', cost: 3, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature or object',
        flavor: 'Your attack gives an ally hope.',
        powerRoll: { characteristic: 'Might', t1: '3 + M damage; you or one ally within 10 squares of you can spend a Recovery', t2: '5 + M damage; you or one ally within 10 squares of you can spend a Recovery', t3: '8 + M damage; you and one ally within 10 squares of you can spend a Recovery, and each of you gains an edge on the next ability roll you make during the encounter' }
      },
      {
        name: 'Squad! Forward!', cost: 3, resource: 'Focus', keywords: ['Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self and two allies',
        flavor: 'On your command, you and your allies force back the enemy line.',
        effect: 'Each target can move up to their speed.'
      }
    ],
    5: [
      {
        name: 'Hammer and Anvil', cost: 5, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature or object',
        flavor: '"Let\'s not argue about who\'s the hammer and who\'s the anvil!"',
        powerRoll: { characteristic: 'Might', t1: '5 + M damage; one ally within 10 squares can use a strike signature ability against the target as a free triggered action', t2: '9 + M damage; one ally within 10 squares can use a signature ability that gains an edge against the target as a free triggered action', t3: '12 + M damage; two allies within 10 squares can each use a strike signature ability that gains an edge against the target as a free triggered action' },
        effect: 'If the target is reduced to 0 Stamina before one or both chosen allies has made their strike, the ally or allies can pick a different target.'
      },
      {
        name: 'Mind Game', cost: 5, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature or object',
        flavor: 'Your attack demoralizes your foe. Your allies begin to think you can win.',
        powerRoll: { characteristic: 'Might', t1: '4 + M damage; R<weak, weakened (save ends)', t2: '6 + M damage; R<avg, weakened (save ends)', t3: '10 + M damage; R<strong, weakened (save ends)' },
        effect: 'You mark the target. Before the start of your next turn, the first time any ally deals damage to any target marked by you, that ally can spend a Recovery.'
      },
      {
        name: 'Now!', cost: 5, resource: 'Focus', keywords: ['Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Three allies',
        flavor: 'Your allies wait for your command -- then unleash death!',
        effect: 'Each target can make a free strike.'
      },
      {
        name: 'This Is What We Planned For', cost: 5, resource: 'Focus', keywords: ['Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Two allies',
        flavor: 'All those coordination drills you made them do finally pay off.',
        effect: 'Each target who hasn\'t acted yet this combat round can take their turn in any order immediately after yours.'
      }
    ],
    7: [
      {
        name: 'Frontal Assault', cost: 7, resource: 'Focus', keywords: [], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'The purpose of a charge is to break their morale and force a retreat.',
        effect: 'Until the end of the encounter or until you are dying, the first time on a turn that you or any ally deals damage to a target marked by you, the creature who dealt the damage can push the target up to 2 squares and then shift up to 2 squares. Any ally using the Charge action to target a creature marked by you can use a melee strike signature or heroic ability instead of a melee free strike.'
      },
      {
        name: 'Hit \'Em Hard!', cost: 7, resource: 'Focus', keywords: [], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Your allies see the advantages in attacking the targets you select.',
        effect: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you, that creature gains 2 surges, which they can use immediately.'
      },
      {
        name: 'Rout', cost: 7, resource: 'Focus', keywords: [], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'The tide begins to turn.',
        effect: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you who has R<avg, the target is frightened of the creature who dealt the damage (save ends).'
      },
      {
        name: 'Stay Strong and Focus!', cost: 7, resource: 'Focus', keywords: [], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: '"We can do this! Keep faith and hold fast!"',
        effect: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you, the creature who dealt the damage can spend a Recovery.'
      }
    ],
    9: [
      {
        name: 'Squad! Gear Check!', cost: 9, resource: 'Focus', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You distract a foe while your allies secure their defensive gear.',
        powerRoll: { characteristic: 'Might', t1: '9 + M damage', t2: '13 + M damage', t3: '18 + M damage' },
        effect: 'You and each ally adjacent to the target gain 10 temporary Stamina.'
      },
      {
        name: 'Squad! Remember Your Training!', cost: 9, resource: 'Focus', keywords: ['Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Self and two allies',
        flavor: 'You remind your allies how to best use their gear.',
        effect: 'Each target gains 1 surge and can use a signature ability that has a double edge.'
      },
      {
        name: 'Win This Day!', cost: 9, resource: 'Focus', keywords: ['Area'], type: 'Main action',
        distance: '3 burst', target: 'Self and each ally in the area',
        flavor: 'You inspire your allies to recover and gather their strength.',
        effect: 'Each target gains 2 surges. Additionally, they can spend a Recovery, remove any conditions or effects on them, and stand up if they are prone.'
      },
      {
        name: 'You\'ve Still Got Something Left', cost: 9, resource: 'Focus', keywords: ['Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'One ally',
        flavor: 'You push an ally to use a heroic ability sooner than they otherwise would.',
        effect: 'The target uses a heroic ability with the Strike keyword as a free triggered action, and deals extra damage equal to your Reason score. The ability has its Heroic Resource cost reduced by 1 + your Reason score (minimum cost 0).'
      },
      {
        name: 'Panic in Their Lines', cost: 9, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'Two creatures',
        flavor: 'You confuse your foes, causing them to turn on each other.',
        powerRoll: { characteristic: 'Might', t1: '6 + M damage; slide 1', t2: '9 + M damage; slide 3', t3: '13 + M damage; slide 5' },
        effect: 'If a target is force moved into another creature, they must make a free strike against that creature.'
      }
    ],
    11: [
      {
        name: 'Go Now and Speed Well', cost: 11, resource: 'Focus', keywords: ['Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You direct an attack to strike true.',
        effect: 'The target gains 2 surges and can use a signature or heroic ability as a free triggered action. The ability has a double edge, ignores damage immunity, and increases the potency of any potency effects by 1.'
      },
      {
        name: 'Finish Them!', cost: 11, resource: 'Focus', keywords: ['Ranged'], type: 'Free triggered',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You point out an opening to your ally so they can land a killing blow.',
        trigger: 'The target is not a leader or solo creature and becomes winded.',
        effect: 'The target is killed. The creature who caused the target to be winded can spend a Recovery.'
      },
      {
        name: 'Floodgates Open', cost: 11, resource: 'Focus', keywords: ['Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Three allies',
        flavor: 'You direct your squad to strike in unison and with devastating effect.',
        effect: 'Each target gains 1 surge and can use a signature ability as a free triggered action. That ability gains an edge and increases the potency of any potency effects by 1.'
      },
      {
        name: 'I\'ll Open and You\'ll Close', cost: 11, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'You create an opening for an ally.',
        powerRoll: { characteristic: 'Might', t1: '6 + M damage', t2: '10 + M damage', t3: '14 + M damage' },
        effect: 'One ally within 10 squares can use a heroic ability against the target as a free triggered action without spending Heroic Resource, as long as they have enough to pay. If the target is reduced to 0 Stamina before the ally acts, they can pick a different target.'
      },
      {
        name: 'Their Lack of Focus Is Their Undoing', cost: 11, resource: 'Focus', keywords: ['Magic', 'Ranged', 'Weapon'], type: 'Main action',
        distance: 'Ranged 10', target: 'Three enemies',
        flavor: 'You trick your enemies into attacking each other.',
        powerRoll: { characteristic: 'Might', t1: 'R<weak, dazed (save ends)', t2: 'R<avg, dazed (save ends)', t3: 'R<strong, dazed (save ends)' },
        effect: 'Each target uses a signature ability against one or more targets of your choosing, automatically obtaining a tier 3 outcome. After resolving the targets\' abilities, you make a power roll against each original target.'
      },
      {
        name: 'That One Is Mine!', cost: 11, resource: 'Focus', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 5', target: 'One creature',
        flavor: 'You focus on making an enemy irrelevant.',
        powerRoll: { characteristic: 'Might', t1: '8 + M damage', t2: '13 + M damage', t3: '17 + M damage' },
        effect: 'The target is marked by you. Until end of encounter or until dying, you can use a signature or heroic ability instead of a free strike against any target marked by you.'
      }
    ]
  },
  features: {
    'Focus Resource': 'Start combat with focus equal to Victories. Gain 2 at start of each turn. First time each round you or an ally damages a creature marked by you, gain 1 focus. First time each round any ally within 10 squares uses a heroic ability, gain 1 focus. Outside combat, heroic abilities can be used once without spending focus until you earn Victories or finish a respite.',
    'Field Arsenal': 'You can use and gain the benefits of two kits, including both their signature abilities. Whenever you would choose or change one kit, you can choose or change your second kit as well. If both kits grant you the same benefit, you take one or the other and can\'t change your choice until you finish a respite.',
    'Mark': 'Maneuver (Ranged 10, one creature). The target is marked by you until end of encounter, until you are dying, or until you use this ability again. While a creature marked by you is within your line of effect, you and allies within your line of effect gain an edge on power rolls against that creature. When you or any ally deals rolled damage to a creature marked by you, spend 1 focus for: extra damage equal to 2x Reason, or the creature dealing damage can spend a Recovery, or shift up to Reason squares, or (melee) the creature is taunted by you until end of their next turn.',
    'Strike Now': 'Main action (Ranged 10, one ally). The target can use a signature ability as a free triggered action. Spend 5 Focus: You target two allies instead of one.',
    'Out of Position': 'At the start of an encounter, you can use a free triggered action to use your Mark ability against one enemy you have line of effect to, even if you are surprised. You can then slide the marked target up to 3 squares, ignoring stability.',
    'Focus on Their Weakness': 'The first time each combat round that you or any ally damages a target marked by you, you gain 2 focus instead of 1.',
    'Improved Field Arsenal': 'Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you gain an edge.',
    'Heightened Focus': 'When you gain focus at the start of each of your turns during combat, you gain 3 focus instead of 2.',
    'Seize the Initiative': 'If you are not surprised when combat begins, your side gets to go first. If an enemy has an ability that allows their side to go first, you roll as usual to determine who goes first.',
    'Master of Arms': 'Your expertise with weapons has grown to true mastery. Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you can negate a bane on the power roll or reduce a double bane to a bane.',
    'Grandmaster of Arms': 'Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you automatically obtain a tier 3 outcome on the power roll. You can still roll to determine if you score a critical hit.',
    'Command': 'Epic resource. Each time you finish a respite, you gain command equal to the XP you gain. Spend command as focus. When you or any ally deals rolled damage to a creature marked by you, spend 1 command to increase the power roll outcome by one tier. When an enemy marked by you makes an ability roll, spend 1 command to decrease their power roll outcome by one tier. Command remains until you spend it.',
    'True Focus': 'When you gain focus at the start of each of your turns during combat, you gain 4 focus instead of 3.',
    'Warmaster': 'Whenever you or any ally makes an ability roll against a target marked by you, the character making the roll can roll three dice and choose which two to use. Whenever an ally uses a heroic ability that targets one or more creatures marked by you, they spend 2 fewer of their Heroic Resource on that ability (minimum 1).'
  },
  advancement: {
    1: { features: ['Tactical Doctrine (Subclass)', 'Focus', 'Doctrine Feature', 'Doctrine Triggered Action', 'Field Arsenal', 'Mark', 'Strike Now', 'Kit', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Perk', 'Doctrine Feature', 'Doctrine Ability (5-cost)'] },
    3: { features: ['Out of Position', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Might & Reason to 3)', 'Focus on Their Weakness', 'Improved Field Arsenal', 'Perk', 'Skill'], charBumps: { auto: { might: 1, reason: 1 }, max: 3 } },
    5: { features: ['Doctrine Feature', '9-cost Heroic Ability'] },
    6: { features: ['Master of Arms', 'Perk', 'Doctrine Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Heightened Focus', 'Seize the Initiative', 'Skill', 'Doctrine Feature'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Doctrine Feature', '11-cost Heroic Ability'] },
    9: { features: ['Grandmaster of Arms', 'Doctrine Ability (11-cost)'] },
    10: { features: ['Characteristic +1 (Might & Reason to 5)', 'Command', 'Perk', 'Skill', 'True Focus', 'Warmaster'], charBumps: { auto: { might: 1, reason: 1 }, max: 5 } }
  }
};
