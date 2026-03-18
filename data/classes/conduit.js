// DS.Data.Classes.conduit - Conduit class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.conduit = {
  id: 'conduit', name: 'Conduit', role: 'Support',
  description: 'The power of the gods flows through you! As a vessel for divine power, you don\'t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. Though the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.',
  heroicResource: 'Piety',
  heroicResourceDescription: 'Start combat with piety equal to Victories. Gain 1d3 piety at the start of each of your turns. Before rolling, you can pray (no action required): on a 1, gain 1 extra piety but take psychic damage equal to 1d6 + your level (can\'t be reduced); on a 2, gain 1 extra piety; on a 3, gain 2 extra piety and activate a domain effect of your choice. You lose remaining piety at end of encounter. Outside combat, heroic abilities can be used once without spending piety until you earn Victories or finish a respite.',
  primaryCharacteristics: ['intuition'],
  staminaBase: 18,
  staminaPerLevel: 6,
  recoveries: 8,
  classSkillGroups: ['interpersonal', 'lore'],
  classSkillCount: 2,
  freeSkills: ['Religion'],
  signatureAbilityCount: 2,
  subclassLabel: 'Domain',
  uiSections: [
    { section: 'dual-domain' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'signature-abilities', config: { count: 2 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Healing Grace', description: 'As a main action, a target within ranged 10 can spend a Recovery. Spend 1+ piety for extra targets, removing effects, standing up prone targets, or additional Recovery spending.' },
      { name: 'Ray of Wrath', description: 'Ranged 10 free strike dealing holy damage based on Intuition. Can be used as your free strike.' }
    ],
    choices: [
      {
        name: 'Triggered Action',
        key: 'triggeredAction',
        description: 'Choose a triggered action you can use in combat.',
        options: [
          { id: 'word_of_guidance', name: 'Word of Guidance', description: 'Grant an ally an edge on their ability roll when they deal damage. Spend 1 piety for a double edge.' },
          { id: 'word_of_judgment', name: 'Word of Judgment', description: 'Impose a bane on an enemy\'s damage roll against an ally. Spend 1 piety for a double bane.' }
        ]
      },
      {
        name: 'Prayer',
        key: 'prayer',
        description: 'Choose a prayer that enhances your combat abilities.',
        options: [
          { id: 'destruction', name: 'Prayer of Destruction', description: '+1 damage with magic abilities.' },
          { id: 'distance', name: 'Prayer of Distance', description: '+2 distance on ranged magic abilities.' },
          { id: 'soldiers_skill', name: 'Prayer of Soldier\'s Skill', description: 'Wear light armor and wield light weapons. +3 Stamina per echelon, +1 weapon damage.' },
          { id: 'speed', name: 'Prayer of Speed', description: '+1 speed and +1 to Disengage shift distance.' }
        ]
      }
    ]
  },
  characteristicArrays: [
    { id: 'conduit_a', label: 'Array A', might: 2, agility: 2, reason: -1, intuition: 2, presence: -1 },
    { id: 'conduit_b', label: 'Array B', might: 2, agility: 1, reason: 1, intuition: 2, presence: -1 },
    { id: 'conduit_c', label: 'Array C', might: 2, agility: 1, reason: 0, intuition: 2, presence: 0 },
    { id: 'conduit_d', label: 'Array D', might: 1, agility: 1, reason: 1, intuition: 2, presence: 0 }
  ],
  subclasses: [
    { id: 'creation', name: 'Creation Domain', description: 'Your patron deity controls the forces of creation. Piety trigger: gain 2 piety the first time a creature within 10 squares uses an area ability. Prayer effect: create a wall of stone within 10 squares (size 5 + Intuition). 1st-level feature: Hands of the Maker. Skill from crafting group.', skillGroup: 'crafting' },
    { id: 'death', name: 'Death Domain', description: 'Your patron deity embodies death and the transition beyond. Piety trigger: gain 2 piety the first time a non-minion creature within 10 squares is reduced to 0 Stamina, or a solo creature becomes winded. Prayer effect: up to two enemies within 10 squares take corruption damage equal to twice your Intuition. 1st-level feature: Grave Speech. Skill from lore group.', skillGroup: 'lore' },
    { id: 'fate', name: 'Fate Domain', description: 'Your patron deity controls destiny. Piety trigger: gain 2 piety the first time an ally within 10 squares gets tier 3 or an enemy gets tier 1 on a power roll. Prayer effect: choose a creature within 10 squares to automatically get tier 1 or tier 3 on their next power roll. 1st-level feature: Oracular Visions. Skill from lore group.', skillGroup: 'lore' },
    { id: 'knowledge', name: 'Knowledge Domain', description: 'Your patron deity embodies knowledge and secrets. Piety trigger: gain 2 piety the first time the Director spends Malice. Prayer effect: up to five allies within 10 squares each gain 1 surge. 1st-level feature: Blessing of Comprehension. Skill from lore group.', skillGroup: 'lore' },
    { id: 'life', name: 'Life Domain', description: 'Your patron deity embodies vitality and growth. Piety trigger: gain 2 piety the first time a creature within 10 squares regains Stamina. Prayer effect: one ally spends a Recovery, ends one effect, and stands up; or one ally gains temporary Stamina equal to 2x Intuition. 1st-level feature: Revitalizing Ritual. Skill from exploration group.', skillGroup: 'exploration' },
    { id: 'love', name: 'Love Domain', description: 'Your patron deity embodies love and compassion. Piety trigger: gain 2 piety the first time you or an ally within 10 squares uses Aid Attack or an ability targeting an ally. Prayer effect: each ally within 10 squares gains temporary Stamina equal to 2x Intuition. 1st-level feature: Blessing of Compassion. Skill from interpersonal group.', skillGroup: 'interpersonal' },
    { id: 'nature', name: 'Nature Domain', description: 'Your patron deity embodies the natural world. Piety trigger: gain 2 piety the first time a creature within 10 squares takes acid, cold, fire, lightning, poison, or sonic damage. Prayer effect: vines slide a number of creatures equal to Intuition up to Intuition squares each. 1st-level feature: Faithful Friend. Skill from exploration group.', skillGroup: 'exploration' },
    { id: 'protection', name: 'Protection Domain', description: 'Your patron deity shields the faithful. Piety trigger: gain 2 piety the first time you or an ally within 10 squares gains temporary Stamina, or uses a triggered action to reduce damage or impose a bane. Prayer effect: one ally within 10 squares gains temporary Stamina equal to 4x Intuition. 1st-level feature: Protective Circle. Skill from exploration group.', skillGroup: 'exploration' },
    { id: 'storm', name: 'Storm Domain', description: 'Your patron deity commands storms and lightning. Piety trigger: gain 2 piety the first time an enemy within 10 squares is force moved. Prayer effect: each enemy in a 3 cube within 10 squares takes lightning damage equal to 2x Intuition. 1st-level feature: Blessing of Fortunate Weather. Skill from exploration group.', skillGroup: 'exploration' },
    { id: 'sun', name: 'Sun Domain', description: 'Your patron deity embodies the power of the sun. Piety trigger: gain 2 piety the first time an enemy within 10 squares takes fire or holy damage. Prayer effect: one enemy within 10 squares takes fire damage equal to 3x Intuition. 1st-level feature: Inner Light. Skill from lore group.', skillGroup: 'lore' },
    { id: 'trickery', name: 'Trickery Domain', description: 'Your patron deity embodies trickery and deception. Piety trigger: gain 2 piety the first time you or a creature within 10 squares takes the Aid Attack or Hide maneuver. Prayer effect: slide one creature within 10 squares up to 5 + conduit level squares. 1st-level feature: Inspired Deception. Skill from intrigue group.', skillGroup: 'intrigue' },
    { id: 'war', name: 'War Domain', description: 'Your patron deity embodies war and battle. Piety trigger: gain 2 piety the first time a creature within 10 squares takes damage greater than 10 + your level in a single turn. Prayer effect: up to three allies within 10 squares each gain 2 surges. 1st-level feature: Sanctified Weapon. Skill from exploration group.', skillGroup: 'exploration' }
  ],
  signatureAbilities: [
    {
      name: 'Blessed Light', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
      powerRoll: { characteristic: 'Intuition', t1: '3 + I holy damage', t2: '5 + I holy damage', t3: '8 + I holy damage' },
      effect: 'One ally within distance gains a number of surges equal to the tier outcome of your power roll.'
    },
    {
      name: 'Drain', keywords: ['Magic', 'Melee', 'Strike'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature',
      flavor: 'You drain the energy from your target to revitalize yourself or an ally.',
      powerRoll: { characteristic: 'Intuition', t1: '2 + I corruption damage', t2: '5 + I corruption damage', t3: '7 + I corruption damage' },
      effect: 'You or one ally within distance can spend a Recovery.'
    },
    {
      name: 'Holy Lash', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'A tendril of divine energy shoots forth to draw in your foe.',
      powerRoll: { characteristic: 'Intuition', t1: '3 + I holy damage; vertical pull 2', t2: '5 + I holy damage; vertical pull 3', t3: '8 + I holy damage; vertical pull 4' }
    },
    {
      name: 'Lightfall', keywords: ['Area', 'Magic'], type: 'Main action',
      distance: '2 burst', target: 'Each enemy in the area',
      flavor: 'A rain of holy light scours your enemies and repositions your allies.',
      powerRoll: { characteristic: 'Intuition', t1: '2 holy damage', t2: '3 holy damage', t3: '5 holy damage' },
      effect: 'You can teleport yourself and each ally in the area to unoccupied spaces in the area.'
    },
    {
      name: 'Sacrificial Offer', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature',
      flavor: 'Divine magic tears at your foe and defends a nearby friend.',
      powerRoll: { characteristic: 'Intuition', t1: '2 + I corruption damage', t2: '4 + I corruption damage', t3: '6 + I corruption damage' },
      effect: 'Choose yourself or one ally within distance. That character can impose a bane on one power roll made against them before the end of their next turn.'
    },
    {
      name: 'Staggering Curse', keywords: ['Magic', 'Melee', 'Strike'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature or object',
      flavor: 'A blast of judgment disorients your foe.',
      powerRoll: { characteristic: 'Intuition', t1: '3 + I holy damage; slide 1', t2: '5 + I holy damage; slide 2', t3: '8 + I holy damage; slide 3' }
    },
    {
      name: "Warrior's Prayer", keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature',
      flavor: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
      powerRoll: { characteristic: 'Intuition', t1: '3 + I holy damage', t2: '6 + I holy damage', t3: '9 + I holy damage' },
      effect: 'You or one ally within distance gains temporary Stamina equal to your Intuition score.'
    },
    {
      name: 'Wither', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature or object',
      flavor: 'A bolt of holy energy saps the life from a foe.',
      powerRoll: { characteristic: 'Intuition', t1: '3 + I corruption damage; P<weak, the target takes a bane on their next power roll', t2: '5 + I corruption damage; P<avg, the target takes a bane on their next power roll', t3: '8 + I corruption damage; P<strong, the target takes a bane on their next power roll' }
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Call the Thunder Down', cost: 3, resource: 'Piety', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'You ask your saint for thunder and your prayer is answered.',
        powerRoll: { characteristic: 'Intuition', t1: '2 sonic damage; push 1', t2: '3 sonic damage; push 2', t3: '5 sonic damage; push 3' },
        effect: 'You can push each willing ally in the area the same distance, ignoring stability.'
      },
      {
        name: 'Font of Wrath', cost: 3, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
        effect: 'You summon a spirit of size 2 who can\'t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit\'s space, but enemies can\'t. Any enemy who moves within 2 squares of the spirit for the first time in a combat round or starts their turn there takes holy damage equal to your Intuition score.'
      },
      {
        name: "Judgment's Hammer", cost: 3, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
        powerRoll: { characteristic: 'Intuition', t1: '3 + I holy damage; A<weak, prone', t2: '6 + I holy damage; A<avg, prone', t3: '9 + I holy damage; A<strong, prone and can\'t stand (save ends)' }
      },
      {
        name: 'Violence Will Not Aid Thee', cost: 3, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'After some holy lightning, your enemy will think twice about their next attack.',
        powerRoll: { characteristic: 'Intuition', t1: '3 + I lightning damage', t2: '6 + I lightning damage', t3: '9 + I lightning damage' },
        effect: 'The first time on a turn that the target deals damage to another creature, the target of this ability takes 1d10 lightning damage (save ends).'
      }
    ],
    5: [
      {
        name: "Corruption's Curse", cost: 5, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'Cursed by you, your enemy takes more damage from your allies.',
        powerRoll: { characteristic: 'Intuition', t1: '3 + I corruption damage; M<weak, damage weakness 5 (save ends)', t2: '6 + I corruption damage; M<avg, damage weakness 5 (save ends)', t3: '9 + I corruption damage; M<strong, damage weakness 5 (save ends)' }
      },
      {
        name: 'Curse of Terror', cost: 5, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'Fear of divine judgment overwhelms your foe.',
        powerRoll: { characteristic: 'Intuition', t1: '6 + I holy damage; I<weak, frightened (save ends)', t2: '9 + I holy damage; I<avg, frightened (save ends)', t3: '13 + I holy damage; I<strong, frightened (save ends)' }
      },
      {
        name: 'Faith Is Our Armor', cost: 5, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Four allies',
        flavor: 'The heroes\' armor glows with golden light, granting divine protection.',
        effect: 'You can target yourself instead of one ally with this ability.',
        powerRoll: { characteristic: 'Intuition', t1: 'The target gains 5 temporary Stamina', t2: 'The target gains 10 temporary Stamina', t3: 'The target gains 15 temporary Stamina' }
      },
      {
        name: 'Sermon of Grace', cost: 5, resource: 'Piety', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '4 burst', target: 'Each ally in the area',
        flavor: 'You inspire your allies with tales of your saint\'s great deeds.',
        effect: 'Each target can spend a Recovery. Additionally, each target can use a free triggered action to end one effect on them that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.'
      }
    ],
    7: [
      {
        name: 'Fear of the Gods', cost: 7, resource: 'Piety', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '5 cube within 10', target: 'Each enemy in the area',
        flavor: 'Your divine magic makes a creature appear as what your enemies fear most.',
        powerRoll: { characteristic: 'Intuition', t1: '6 psychic damage; I<weak, frightened (save ends)', t2: '9 psychic damage; I<avg, frightened (save ends)', t3: '13 psychic damage; I<strong, frightened (save ends)' },
        effect: 'Each target is frightened of you or a creature you choose within distance.'
      },
      {
        name: "Saint's Raiment", cost: 7, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'One ally',
        flavor: 'An ally becomes the wearer of an empowered golden cloak.',
        effect: 'Target gains 20 temporary Stamina and 3 surges.'
      },
      {
        name: 'Soul Siphon', cost: 7, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One enemy',
        flavor: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
        powerRoll: { characteristic: 'Intuition', t1: '7 + I corruption damage', t2: '10 + I corruption damage', t3: '15 + I corruption damage' },
        effect: 'One ally within distance can spend any number of Recoveries.'
      },
      {
        name: 'Words of Wrath and Grace', cost: 7, resource: 'Piety', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '5 burst', target: 'Each enemy in the area',
        flavor: 'Your saint grants your enemies a vision of pain and fills your allies with healing energy.',
        powerRoll: { characteristic: 'Intuition', t1: '2 holy damage', t2: '5 holy damage', t3: '7 holy damage' },
        effect: 'Each ally in the area can spend a Recovery.'
      }
    ],
    9: [
      {
        name: 'Beacon of Grace', cost: 9, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You ignite a foe with holy radiance, rewarding allies who attack them.',
        powerRoll: { characteristic: 'Intuition', t1: '8 + I holy damage', t2: '13 + I holy damage', t3: '17 + I holy damage' },
        effect: 'Until the end of the encounter, whenever you or any ally damages the target using an ability, that creature can spend a Recovery. If the target is reduced to 0 Stamina before the end of the encounter, you can use a free triggered action to move this effect to another creature within distance.'
      },
      {
        name: 'Penance', cost: 9, resource: 'Piety', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '4 cube within 10', target: 'Each enemy in the area',
        flavor: '"If you won\'t kneel, the gods will make you."',
        powerRoll: { characteristic: 'Intuition', t1: '4 corruption damage; I<weak, prone and can\'t stand (save ends)', t2: '7 corruption damage; I<avg, prone and can\'t stand (save ends)', t3: '11 corruption damage; I<strong, prone and can\'t stand (save ends)' }
      },
      {
        name: 'Sanctuary', cost: 9, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You send yourself or an ally to a divine manifold to instantaneously regain health.',
        effect: 'The target is removed from the encounter map until the start of their next turn and can spend any number of Recoveries. At the start of their turn, the target reappears in the space they left or the nearest unoccupied space of their choice.'
      },
      {
        name: 'Vessel of Retribution', cost: 9, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'You infuse yourself or an ally with the retributive energy of the gods, waiting to be unleashed.',
        effect: 'The first time the target is dying or winded before the end of the encounter, each enemy within 5 squares of them takes 15 holy damage.'
      }
    ],
    11: [
      {
        name: 'Arise!', cost: 11, resource: 'Piety', keywords: ['Magic', 'Ranged'], type: 'Main action',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'Your deity rewards you or an ally on the verge of defeat with a miracle burst of strength and resolve.',
        effect: 'The target can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone. Additionally, at the start of each of their turns until the end of the encounter or until they are dying, the target gains 3 surges.'
      },
      {
        name: 'Blessing of Steel', cost: 11, resource: 'Piety', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '5 aura', target: 'Self and each ally in the area',
        flavor: 'A protective aura defends your allies from harm.',
        effect: 'Until the end of the encounter, any ability roll made against a target takes a bane and each target has damage immunity 5.'
      },
      {
        name: 'Blessing of the Blade', cost: 11, resource: 'Piety', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '5 aura', target: 'Self and each ally in the area',
        flavor: '"The power of the gods is within you, friends. Allow me to unleash it."',
        effect: 'At the end of each of your turns until the end of the encounter or until you are dying, each target gains 3 surges.'
      },
      {
        name: 'Drag the Unworthy', cost: 11, resource: 'Piety', keywords: ['Magic', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You conjure an angel who moves a foe and heals your allies.',
        powerRoll: { characteristic: 'Intuition', t1: '9 + I holy damage; slide 3', t2: '13 + I holy damage; slide 4', t3: '18 + I holy damage; slide 6' },
        effect: 'Each ally the target comes adjacent to during the forced movement can spend a Recovery.'
      }
    ]
  },
  features: {
    'Deity and Domains': 'Choose a god or saint, then pick two domains from their portfolio. Your two domains make up your subclass and determine many features you gain as you level up.',
    'Healing Grace': 'Maneuver (Magic, Ranged 10, once per turn). Target: Self or one ally. The target can spend a Recovery. Spend 1+ Piety: for each piety spent, choose one enhancement: target one additional ally within distance; end one save-ends or end-of-turn effect on a target; a prone target can stand up; a target can spend 1 additional Recovery.',
    'Ray of Wrath': 'Main action (Magic, Ranged 10, Strike). Can be used as a ranged free strike. Target: One creature or object. Power Roll + Intuition: <=11: 2 + I damage; 12-16: 4 + I damage; 17+: 6 + I damage. You can have this ability deal holy damage.',
    'Triggered Action': 'Choose one: Word of Guidance (triggered when ally makes damage ability roll; edge on the roll, spend 1 Piety for double edge) or Word of Judgment (triggered when ally would take damage from a power roll ability; bane on the roll against the target, spend 1 Piety for double bane).',
    'Prayer': 'Choose one prayer (changeable as respite activity along with ward): Prayer of Destruction (+1 rolled damage with magic abilities), Prayer of Distance (+2 distance to ranged magic abilities), Prayer of Soldier\'s Skill (light armor +3 Stamina scaling at 4th/7th/10th, light weapon +1 damage; can\'t have a kit), Prayer of Speed (+1 speed and disengage shift distance), Prayer of Steel (+6 Stamina scaling at 4th/7th/10th, +1 stability).',
    'Conduit Ward': 'Choose one ward (changeable as respite activity along with prayer): Bastion Ward (+1 saving throws), Quickness Ward (shift up to Intuition squares when adjacent creature damages you), Sanctuary Ward (creature that damages you can\'t target you with strikes until they harm you/ally or end of their next turn), Spirit Ward (adjacent creature that damages you takes corruption damage equal to Intuition).',
    'The Lists of Heaven': 'Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.',
    'Minor Miracle': 'As a respite activity, beseech the gods to restore a dead creature to life. Requires at least half the creature\'s remains, dead within 24 hours, not age-related, and a willing soul. Creature returns at end of respite with full Stamina and half Recoveries. You regain only half your Recoveries.',
    'Blessed Domain': 'Whenever you gain piety from a domain feature, you gain 1 additional piety.',
    'Burgeoning Saint': 'Edge on Presence tests to interact with creatures. Whenever you deal damage to an enemy, you can spend a Recovery. Corruption immunity 10 or holy immunity 10 (your choice). Your clothing/equipment reflects your status as your deity\'s chosen.',
    "Faith's Sword": 'Each respite, choose a willing hero ally who finished the respite with you. That ally gains benefits of your Burgeoning Saint feature until next respite. You can spend piety as a free maneuver to give the hero 1 of their Heroic Resource for every 2 piety spent.',
    'Ordained': 'Characteristic scores treated as 1 higher for resisting potencies. While you have 5+ Victories, double edge on Presence tests to influence creatures.',
    "Faithful's Reward": 'When you roll for piety at the start of your turn in combat, you gain 1d3 + 1 piety instead of 1d3.',
    'Avatar': 'When you use Prayer, you can be affected by up to three prayers at once (changeable as respite activity along with ward). You can use a maneuver to activate one domain effect without needing to pray. Each respite, you can open a portal to rest with your deity, ask three questions (answered honestly), and return to any location where someone worships your deity. Your god may give priority targets (double edge on power rolls against them).',
    'Divine Power': 'Epic resource called divine power. Gain divine power equal to XP each respite. Spend as piety. Can spend divine power to use any conduit abilities you don\'t have (1 divine power minimum for free abilities). Persists until spent.',
    'Most Pious': 'When you roll for piety at the start of your turn in combat and you pray, you gain 1 additional piety.'
  },
  advancement: {
    1: { features: ['Deity and Domains', 'Piety', 'Domain Feature', 'Healing Grace', 'Ray of Wrath', 'Triggered Action', 'Prayer', 'Conduit Ward', 'Two Signature Abilities', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['The Lists of Heaven', 'Perk (crafting/lore/supernatural)', 'Domain Feature', 'Domain Ability (5-cost)'] },
    3: { features: ['Minor Miracle', '7-cost Heroic Ability'] },
    4: { features: ['Blessed Domain', 'Characteristic Increase (Intuition to 3, plus one to max 3)', 'Domain Feature', 'Perk', 'Skill'] },
    5: { features: ['Domain Feature', '9-cost Heroic Ability'] },
    6: { features: ['Burgeoning Saint', 'Perk (crafting/lore/supernatural)', 'Domain Ability (9-cost)'] },
    7: { features: ['Characteristic Increase (all +1, max 4)', "Faithful's Reward", 'Skill', 'Domain Feature'] },
    8: { features: ['Domain Feature', 'Perk', '11-cost Heroic Ability'] },
    9: { features: ['Domain Ability (11-cost)', "Faith's Sword", 'Ordained'] },
    10: { features: ['Avatar', 'Characteristic Increase (Intuition to 5, plus one to max 5)', 'Divine Power', 'Most Pious', 'Perk (crafting/lore/supernatural)', 'Skill'] }
  }
};
