// DS.Data.Classes.censor - Censor class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.censor = {
  id: 'censor', name: 'Censor', role: 'Tank / Support',
  description: 'Your divine vocation is to burn away the impurities of the world, from the corruption of the wicked to the weakness of despair. Empowered by a higher being or ideal, you wade into battle to face the enemy head-on, shining the light of your patron on evil and warding your allies from harm.',
  heroicResource: 'Wrath',
  heroicResourceDescription: 'Start combat with wrath equal to Victories. Gain 1d3 wrath at the start of each of your turns. Gain 1 wrath the first time each round a creature within 5 squares is reduced to 0 Stamina. Outside combat, heroic abilities can be used once without spending wrath.',
  primaryCharacteristics: ['might', 'presence'],
  staminaBase: 21,
  staminaPerLevel: 9,
  recoveries: 10,
  classSkillGroups: ['interpersonal', 'lore'],
  classSkillCount: 2,
  freeSkills: ['Religion'],
  signatureAbilityCount: 1,
  subclassLabel: 'Censor Order',
  uiSections: [
    { section: 'order-domain' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'signature-abilities', config: { count: 1 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Judgment', description: 'As a ranged 10 maneuver, judge a target. Deal holy damage equal to twice your Presence when the judged creature uses a main action. Spend 1 wrath for: shift interruption, power roll bane, potency reduction, or taunting melee damage.' },
      { name: 'My Life for Yours', description: 'When you or an ally starts their turn or takes damage, spend a Recovery to restore Stamina. Spend 1 wrath to also remove effects or stand up the target.', tag: 'Triggered Action' }
    ],
    subclassFeatures: {
      exorcism: [
        { name: 'Eye of the Censor', description: 'Identify supernatural ability types. Gain an edge on lore tests against supernatural creatures.' },
        { name: 'Hallowed Weapon', description: 'Weapon damage against Undead, Fiend, and Demon creatures becomes holy damage and ignores immunities.' },
        { name: 'Rebuke', description: 'When a creature within 5 squares uses a supernatural ability, deal holy damage equal to your Presence score.', tag: 'Triggered Action' }
      ],
      redemption: [
        { name: 'Gentle Touch', description: 'As a maneuver, let a creature within melee 1 spend a Recovery.' },
        { name: 'Halo', description: 'Enemies starting their turn within your reach take holy damage equal to your Presence score.' },
        { name: 'Absolve', description: 'When a creature within 5 squares takes damage, you can take that damage instead.', tag: 'Triggered Action' }
      ],
      retribution: [
        { name: 'Burning Zeal', description: '+2 speed when you charge. Charge strikes deal extra holy damage equal to your Presence score.' },
        { name: 'Relentless', description: 'When you reduce a creature to 0 Stamina, you can shift up to 2 squares.' },
        { name: 'Vengeful Strike', description: 'When a creature within melee 1 damages you or an ally, make a free strike against them.', tag: 'Triggered Action' }
      ]
    }
  },
  characteristicArrays: [
    { id: 'censor_a', label: 'Might/Presence Focus', might: 2, agility: 2, reason: -1, intuition: -1, presence: 2 },
    { id: 'censor_b', label: 'Balanced', might: 2, agility: 1, reason: 1, intuition: -1, presence: 2 },
    { id: 'censor_c', label: 'Even Spread', might: 2, agility: 1, reason: 0, intuition: 0, presence: 2 }
  ],
  subclasses: [
    { id: 'exorcism', name: 'Exorcism', description: 'You root out corruption and banish supernatural evil. Grants Eye of the Censor (identify supernatural ability types, edge on lore tests vs supernatural creatures), Hallowed Weapon (weapon damage vs Undead/Fiend/Demon becomes holy, ignores immunities), and Rebuke triggered action. Skill from lore group.', skillGroup: 'lore' },
    { id: 'redemption', name: 'Redemption', description: 'You believe in the power of mercy and second chances. Grants Gentle Touch (maneuver to let a creature spend a Recovery), Halo (enemies starting turn in reach take holy damage equal to Presence), and Absolve triggered action. Skill from interpersonal group.', skillGroup: 'interpersonal' },
    { id: 'retribution', name: 'Retribution', description: 'Your divine patron demands justice through righteous violence. Grants Burning Zeal (+2 speed on charges, extra holy damage equal to Presence), Relentless (shift 2 on reducing creature to 0 Stamina), and Vengeful Strike triggered action. Skill from exploration group.', skillGroup: 'exploration' }
  ],
  signatureAbilities: [
    {
      name: 'Battle Grace', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature',
      flavor: 'You feint to move your enemies into perfect position.',
      powerRoll: { characteristic: 'Might or Agility', t1: '5 + M or A damage; you can swap places with the target', t2: '8 + M or A damage; you can swap places with the target', t3: '11 + M or A damage; you can swap places with the target' },
      effect: 'If you obtain a tier 2 or tier 3 outcome and can\'t swap places because one or both of you is too big, you both remain in your original spaces and the target takes 1 extra damage.'
    },
    {
      name: 'Holy Lance', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 5', target: 'One creature or object',
      flavor: 'A ray of blazing light smites the unrighteous.',
      powerRoll: { characteristic: 'Might or Presence', t1: '5 + M or P holy damage', t2: '8 + M or P holy damage', t3: '11 + M or P holy damage' }
    },
    {
      name: 'Patient Shot', keywords: ['Ranged', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'You stand your ground and focus your aim on a foe, no matter how close they come.',
      powerRoll: { characteristic: 'Might or Agility', t1: '5 + M or A damage', t2: '8 + M or A damage', t3: '11 + M or A damage' },
      effect: 'You don\'t provoke opportunity attacks from the target by making this strike.'
    },
    {
      name: 'Protective Attack', keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1 or ranged 5', target: 'One creature or object',
      flavor: 'A weapon strike inspires an ally to avoid harm.',
      powerRoll: { characteristic: 'Might or Agility', t1: '5 + M or A damage; one ally within distance can shift 1', t2: '8 + M or A damage; one ally within distance can shift 2', t3: '11 + M or A damage; one ally within distance can shift 3' }
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Blinding Light', cost: 3, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '3 burst', target: 'Each enemy in the area',
        flavor: 'You invoke a flare of divine radiance that sears the eyes of the unworthy.',
        powerRoll: { characteristic: 'Might or Presence', t1: '3 holy damage', t2: '5 holy damage; P<weak, dazed (save ends)', t3: '8 holy damage; P<avg, dazed (save ends)' }
      },
      {
        name: 'Consecrated Ground', cost: 3, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '2 aura', target: 'Self and each ally in the area',
        flavor: 'Wherever you stand is holy ground.',
        effect: 'Each target gains temporary Stamina equal to your Presence score. Whenever an enemy enters the area or starts their turn there, they take holy damage equal to your Presence score. The aura lasts until the start of your next turn. Spend 1 Wrath: You can use this as a free maneuver to extend the aura until the start of your next turn.'
      },
      {
        name: 'Pillar of Holy Fire', cost: 3, resource: 'Wrath', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'A column of divine fire erupts from the ground.',
        powerRoll: { characteristic: 'Might or Presence', t1: '3 holy damage', t2: '5 holy damage', t3: '8 holy damage; the area is difficult terrain for enemies until the end of the encounter' }
      },
      {
        name: 'Punishing Smite', cost: 3, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'Your holy weapon strike smashes the wicked.',
        powerRoll: { characteristic: 'Might', t1: '6 + M holy damage', t2: '10 + M holy damage', t3: '15 + M holy damage; taunted (EoT)' },
        effect: 'You gain temporary Stamina equal to your Presence score.'
      }
    ],
    5: [
      {
        name: 'Banishing Light', cost: 5, resource: 'Wrath', keywords: ['Magic', 'Ranged'], type: 'Main action',
        distance: 'Ranged 5', target: 'One creature',
        flavor: 'You cast your foe into a blinding void between worlds.',
        powerRoll: { characteristic: 'Might or Presence', t1: 'Push 3; M<weak or P<weak, the target is banished (save ends)', t2: 'Push 5; M<avg or P<avg, the target is banished (save ends)', t3: 'Push 7; M<strong or P<strong, the target is banished (save ends)' },
        effect: 'A banished target is removed from the encounter until they save. They reappear in the nearest unoccupied space.'
      },
      {
        name: 'Come and Get It', cost: 5, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '5 burst', target: 'Each enemy in the area',
        flavor: 'Divine power pulls your enemies toward you.',
        powerRoll: { characteristic: 'Might or Presence', t1: 'Pull 3', t2: 'Pull 5', t3: 'Pull 7; taunted (EoT)' },
        effect: 'Each target that ends adjacent to you takes holy damage equal to your Presence score.'
      },
      {
        name: 'Exalted Retribution', cost: 5, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'Your weapon blazes with righteous fury.',
        powerRoll: { characteristic: 'Might', t1: '9 + M holy damage', t2: '14 + M holy damage', t3: '20 + M holy damage; prone' },
        effect: 'You can push the target up to 3 squares.'
      },
      {
        name: 'Wings of Radiance', cost: 5, resource: 'Wrath', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Brilliant wings of light carry you across the battlefield.',
        effect: 'You can fly up to your speed. Until the start of your next turn, whenever an enemy enters a square adjacent to you or starts their turn there, they take holy damage equal to your Presence score.'
      }
    ],
    7: [
      {
        name: 'Edict of Disruptive Isolation', cost: 7, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '2 aura', target: 'Each enemy in the area',
        flavor: 'The evil within your foes detonates with holy fire that burns only the guilty.',
        effect: 'Until the end of the encounter or until you are dying, each target takes holy damage equal to your Presence score at the end of each of your turns. A target takes an extra 2d6 holy damage if they are judged by you or if they are adjacent to any enemy.'
      },
      {
        name: 'Edict of Perfect Order', cost: 7, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '2 aura', target: 'Each enemy in the area',
        flavor: 'Within the area of your divine presence, your enemies will regret using their fell abilities.',
        effect: 'Until the end of the encounter or until you are dying, whenever a target uses an ability that costs Malice, they take holy damage equal to three times your Presence score. A target judged by you takes an extra 2d6 holy damage.'
      },
      {
        name: 'Edict of Purifying Pacifism', cost: 7, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '2 aura', target: 'Each enemy in the area',
        flavor: 'You shed a righteous energy that punishes enemies who would harm you or your allies.',
        effect: 'Until the end of the encounter or until you are dying, whenever a target makes a strike, they take holy damage equal to twice your Presence score. A target judged by you takes an extra 2d6 holy damage.'
      },
      {
        name: 'Edict of Stillness', cost: 7, resource: 'Wrath', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '2 aura', target: 'Each enemy in the area',
        flavor: 'The holy aura you project makes it painful for evil-doers to leave your reach.',
        effect: 'Until the end of the encounter or until you are dying, whenever a target moves or is force moved out of the area, they take holy damage equal to twice your Presence score. A target judged by you who moves willingly takes an extra 2d6 holy damage.'
      }
    ],
    9: [
      {
        name: 'Gods Grant Thee Strength', cost: 9, resource: 'Wrath', keywords: ['Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You channel divine force for movement that cannot be stopped.',
        effect: 'The target ends any condition or effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up. The target then gains 2 surges, can shift up to their speed while ignoring difficult terrain, and can use a strike signature ability as a free triggered action.'
      },
      {
        name: 'Orison of Victory', cost: 9, resource: 'Wrath', keywords: ['Area'], type: 'Maneuver',
        distance: '1 burst', target: 'Self and each ally in the area',
        flavor: 'You channel your god\'s will to overcome hardship and inflict pain.',
        powerRoll: { characteristic: 'Presence', t1: 'Each target gains 1 surge', t2: 'Each target gains 2 surges', t3: 'Each target gains 3 surges' },
        effect: 'A target can end one effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.'
      },
      {
        name: 'Righteous Judgment', cost: 9, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You amplify the power of your judgment.',
        powerRoll: { characteristic: 'Might', t1: '10 + M damage', t2: '14 + M damage', t3: '20 + M damage' },
        effect: 'Until the end of the encounter, whenever any ally deals damage to a target judged by you, that ally gains 1 surge.'
      },
      {
        name: 'Shield of the Righteous', cost: 9, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You strike a foe and create a fleet of divine shields that protect your allies.',
        powerRoll: { characteristic: 'Might', t1: '10 + M damage; you and each ally adjacent to you gain 10 temporary Stamina', t2: '14 + M damage; you and each ally adjacent to you gain 15 temporary Stamina', t3: '20 + M damage; you and each ally adjacent to you gain 20 temporary Stamina' }
      }
    ],
    11: [
      {
        name: 'Excommunication', cost: 11, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You curse your foe to become a bane to their allies.',
        powerRoll: { characteristic: 'Might', t1: '9 + M damage; I<weak, weakened (save ends)', t2: '13 + M damage; I<avg, weakened (save ends)', t3: '18 + M damage; I<strong, weakened (save ends)' },
        effect: 'At the end of each of your turns, a target weakened this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them. Additionally, a target weakened this way can\'t be targeted by their allies\' abilities.'
      },
      {
        name: 'Hand of the Gods', cost: 11, resource: 'Wrath', keywords: ['Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You use your foe as a tool against your enemies.',
        powerRoll: { characteristic: 'Might', t1: '10 + M damage', t2: '15 + M damage', t3: '21 + M damage' },
        effect: 'Until the end of the encounter, while the target is judged by you, you can choose to make them the source of any of your abilities. Additionally, the target counts as an ally for the purpose of flanking.'
      },
      {
        name: 'Pillar of Divine Fire', cost: 11, resource: 'Wrath', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'Your enemy\'s guilt fuels a holy flame that burns your foes.',
        powerRoll: { characteristic: 'Might', t1: '9 + M damage; I<weak, dazed (save ends)', t2: '13 + M damage; I<avg, dazed (save ends)', t3: '18 + M damage; I<strong, dazed (save ends)' },
        effect: 'At the end of each of your turns, a target dazed this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them.'
      },
      {
        name: 'Your Allies Turn on You!', cost: 11, resource: 'Wrath', keywords: ['Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You turn your enemies\' ire to the target.',
        powerRoll: { characteristic: 'Presence', t1: '5 + P damage; I<weak, slowed (save ends)', t2: '9 + P damage; I<avg, slowed (save ends)', t3: '12 + P damage; I<strong, slowed (save ends)' },
        effect: 'While the target is slowed this way, each ally who starts their turn within 5 squares of them must use a free maneuver to make a free strike against the target.'
      }
    ]
  },
  features: {
    'Wrath Resource': 'Start combat with wrath equal to Victories. Gain 1d3 at start of each turn. Gain 1 wrath first time each round a creature within 5 squares is reduced to 0 Stamina. Outside combat, heroic abilities can be used once without spending wrath until you earn Victories or finish a respite.',
    'Censure': 'Maneuver (Magic, Ranged 10). Taunt one creature until end of encounter, until you are dying, or until you use this again. While taunted, the target takes holy damage equal to your Presence score at start of each of their turns. Once as a free maneuver each turn, spend 1 wrath to grant one benefit to you and allies within distance who can see the censured target: Guiding Light (edge on next strike vs censured target), Shielding Light (temporary Stamina equal to Presence), or Searing Light (censured target takes holy damage equal to 2x Presence).',
    'Whiplash': 'Whenever a creature you have censured moves willingly, you can use a free triggered action to shift up to 2 squares toward them.',
    'Immovable': 'You can\'t be force moved unless you choose to be. Additionally, whenever a creature attempts to force move you, you gain temporary Stamina equal to your level.',
    'Unyielding': 'Whenever you start your turn with a condition that is ended by a saving throw, you can make a saving throw to end it immediately (before any other effects).',
    'Lead By Example': 'Whenever you use a heroic ability, one ally within 5 squares of you gains temporary Stamina equal to your Presence score and can shift 1 square.',
    'Judgment': 'Epic resource. Gain judgment equal to XP each respite. Spend judgment as wrath. Whenever you use Censure, you can censure two creatures at once, spending wrath benefits on each independently. Judgment persists until spent.',
    'Eye of the Censor': 'Each time you observe a creature engage in a supernatural ability, you automatically know whether the ability is divine, primordial, psionic, or wyrd. Edge on tests to recall or discover lore regarding undead, fiends, elementals, and other supernatural creatures.',
    'Hallowed Weapon': 'Whenever you damage a creature with the Undead, Fiend, or Demon keyword using a weapon ability, the damage type changes to holy and the ability ignores damage immunities on the target.',
    'Gentle Touch': 'Maneuver. Touch a creature and they can spend a Recovery. Once per encounter, plus once more for free each combat round that you use a heroic ability.',
    'Halo': 'An enemy that starts their turn within your weapon\'s reach takes holy damage equal to your Presence score. You can increase this distance by spending wrath.',
    'Burning Zeal': 'Whenever you charge, your speed increases by 2 for the charge. When you deal damage with a charge, you deal extra holy damage equal to your Presence score.',
    'Relentless': 'Whenever you reduce a creature to 0 Stamina, you can shift up to 2 squares.',
    'Beacon of Hope': 'While you are not dying, allies within 5 squares of you gain a +1 bonus to saving throws. Increases to +2 at 4th level, +3 at 7th level, and +4 at 10th level.',
    'Fiery Wrath': 'Whenever you spend wrath on a Censure benefit or on a censor heroic ability, you deal extra holy damage equal to your Presence score to one enemy within 5 squares.',
    'Seal': 'Whenever you damage a creature with the Undead, Fiend, or Demon keyword using a weapon ability, the creature can\'t use supernatural abilities until the end of their next turn.'
  },
  advancement: {
    1: { features: ['Censor Doctrine (Subclass)', 'Wrath', 'Doctrine Features', 'Doctrine Triggered Action', 'Kit', 'Censure', 'Signature Ability', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Perk', 'Doctrine Feature', 'Doctrine Ability (5-cost)'] },
    3: { features: ['Whiplash', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Might & Presence to 3)', 'Immovable', 'Perk', 'Skill'], charBumps: { auto: { might: 1, presence: 1 }, max: 3 } },
    5: { features: ['Doctrine Feature', '9-cost Heroic Ability'] },
    6: { features: ['Perk', 'Doctrine Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'Unyielding', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Doctrine Feature', '11-cost Heroic Ability'] },
    9: { features: ['Lead By Example', 'Doctrine Ability (11-cost)'] },
    10: { features: ['Judgment', 'Characteristic +1 (Might & Presence to 5)', 'Perk', 'Skill'], charBumps: { auto: { might: 1, presence: 1 }, max: 5 } }
  }
};
