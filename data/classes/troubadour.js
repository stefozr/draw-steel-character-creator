// DS.Data.Classes.troubadour - Troubadour class (full data from PDF)
DS.Data = DS.Data || {};
DS.Data.Classes = DS.Data.Classes || {};
DS.Data.Classes.troubadour = {
  id: 'troubadour', name: 'Troubadour', role: 'Support',
  description: 'The whole world\'s a stage, and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whoever might witness your performance.',
  heroicResource: 'Drama',
  heroicResourceDescription: 'Start combat with drama equal to Victories. Gain 1d3 drama at the start of each of your turns. Gain 2 drama when 3+ heroes use an ability on the same turn. Gain 2 drama the first time a hero is winded. Gain 3 drama on a natural 19 or 20. Gain 10 drama when a hero dies. If dead with 30 drama, come back to life with 1 Stamina. Outside combat, heroic abilities can be used once without spending drama.',
  primaryCharacteristics: ['agility', 'presence'],
  staminaBase: 18,
  staminaPerLevel: 6,
  recoveries: 8,
  classSkillGroups: ['interpersonal', 'intrigue', 'lore'],
  classSkillCount: 3,
  freeSkills: ['Read Person'],
  signatureAbilityCount: 1,
  subclassLabel: 'Class Act',
  uiSections: [
    { section: 'subclass' },
    { section: 'characteristics' },
    { section: 'common-skills' },
    { section: 'class-features' },
    { section: 'routines' },
    { section: 'signature-abilities', config: { count: 1 } },
    { section: 'heroic-abilities' }
  ],
  classFeatures: {
    core: [
      { name: 'Scene Partner', description: 'Bond NPCs through successful interpersonal skill tests. Bonded NPCs gain +1 patience and double interest on first argument. You can maintain bonds equal to your level.' }
    ],
    subclassFeatures: {
      auteur: [
        { name: 'Blocking', description: 'At the end of your turn, teleport creatures in a 2-burst aura to unoccupied squares within the aura.' },
        { name: 'Dramatic Monologue', description: 'As a maneuver, choose: grant an ally an edge on their next roll, grant them 1 surge, or impose a bane on an enemy\'s next roll. Spend 1 drama to target 2 creatures.' },
        { name: 'Turnabout Is Fair Play', description: 'When a creature makes an ability roll, flip their edge to a bane or vice versa. Spend 3 drama for a stronger flip.', tag: 'Triggered Action' }
      ],
      duelist: [
        { name: 'Acrobatics', description: 'You automatically get a tier 3 result on jump, tumble, and climb tests.' },
        { name: 'Star Power', description: 'As a maneuver spending 1 drama, gain +2 speed and your next power roll is minimum tier 2. Spend 1 more drama for +4 speed instead.' },
        { name: 'Riposte', description: 'When a creature deals melee damage to you or an adjacent ally, make a free strike against them.', tag: 'Triggered Action' }
      ],
      virtuoso: [
        { name: 'Power Chord', description: 'As a maneuver, push all enemies in a 2-burst 1-3 squares based on your power roll.' },
        { name: 'Virtuoso Performances', description: 'You gain access to "Thunder Mother" (ranged sonic attack) and "Ballad of the Beast" (grant surges to allies) performances.' },
        { name: 'Harmonize', description: 'When an ally uses a single-target ability costing 3 or less heroic resource, add an additional target. Spend drama for higher-cost abilities.', tag: 'Triggered Action' }
      ]
    }
  },
  characteristicArrays: [
    { id: 'troubadour_a', label: 'Agility/Presence Focus', agility: 2, presence: 2, might: 2, reason: -1, intuition: -1 },
    { id: 'troubadour_b', label: 'Balanced Presence', agility: 2, presence: 2, might: 1, reason: 1, intuition: -1 },
    { id: 'troubadour_c', label: 'Even Spread', agility: 2, presence: 2, might: 1, reason: 0, intuition: 0 }
  ],
  subclasses: [
    { id: 'auteur', name: 'Auteur', description: 'You seek drama from story and recount. Grants Blocking performance (teleport allies at end of turn), Dramatic Monologue (maneuver: edge on ally roll, grant surge, or bane on enemy roll). Turnabout Is Fair Play triggered action (swap edges/banes on a roll). Skill: Brag.', skill: 'Brag' },
    { id: 'duelist', name: 'Duelist', description: 'Drama infuses your every movement in tandem with another. Grants Acrobatics performance (auto tier 3 on jump/tumble/climb tests), Star Power (1 Drama maneuver: +2 speed, minimum tier 2 on next roll). Riposte triggered action (free strike when you or ally takes melee damage). Skill: Gymnastics.', skill: 'Gymnastics' },
    { id: 'virtuoso', name: 'Virtuoso', description: 'You find drama in music and song. Grants Power Chord (push enemies in 2 burst), Thunder Mother and Ballad of the Beast performances (ranged attack or grant surges). Harmonize triggered action (3 Drama: ally targets additional enemy with sonic damage). Skill: Music.', skill: 'Music' }
  ],
  signatureAbilities: [
    {
      name: 'Artful Flourish', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'Two creatures or objects',
      flavor: 'And they said practicing fencing was a waste!',
      powerRoll: { characteristic: 'Agility', t1: '2 damage', t2: '5 damage', t3: '7 damage' },
      effect: 'You can shift up to 3 squares. Spend 2+ Drama: You can target one additional creature or object for every 2 drama spent.'
    },
    {
      name: 'Cutting Sarcasm', keywords: ['Magic', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Ranged 10', target: 'One creature',
      flavor: 'There you are, radiating your usual charisma.',
      powerRoll: { characteristic: 'Presence', t1: '2 + P psychic damage; P<weak, bleeding (save ends)', t2: '5 + P psychic damage; P<avg, bleeding (save ends)', t3: '7 + P psychic damage; P<strong, bleeding (save ends)' }
    },
    {
      name: 'Instigator', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
      distance: 'Melee 1', target: 'One creature',
      flavor: 'I didn\'t do it! What?',
      powerRoll: { characteristic: 'Presence', t1: '3 + P damage', t2: '6 + P damage', t3: '9 + P damage' },
      effect: 'The target is taunted by you or a willing ally adjacent to you until the end of the target\'s next turn.'
    },
    {
      name: 'Witty Banter', keywords: ['Magic', 'Melee', 'Ranged', 'Strike'], type: 'Main action',
      distance: 'Melee 1 or ranged 5', target: 'One creature',
      flavor: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
      powerRoll: { characteristic: 'Presence', t1: '4 + P psychic damage', t2: '5 + P psychic damage', t3: '7 + P psychic damage' },
      effect: 'One ally within 10 squares of you can end one effect on them that is ended by a saving throw or that ends at the end of their turn. Spend 1 Drama: The chosen ally can spend a Recovery.'
    }
  ],
  heroicAbilities: {
    3: [
      {
        name: 'Harsh Critic', cost: 3, resource: 'Drama', keywords: ['Magic', 'Melee', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Melee 1 or ranged 10', target: 'One creature or object',
        flavor: 'Just one bad review will ruin their day.',
        powerRoll: { characteristic: 'Presence', t1: '7 + P sonic damage', t2: '10 + P sonic damage', t3: '13 + P sonic damage' },
        effect: 'The first time the target uses an ability before the start of your next turn, any effects from the ability\'s tier outcomes other than damage are negated for all targets. Ability effects that always happen regardless of the power roll work as usual.'
      },
      {
        name: 'Hypnotic Overtones', cost: 3, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '2 burst', target: 'Each enemy in the area',
        flavor: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
        powerRoll: { characteristic: 'Presence', t1: 'Slide 1; I<weak, dazed (save ends)', t2: 'Slide 1; I<avg, dazed (save ends)', t3: 'Slide 2; I<strong, dazed (save ends)' },
        effect: 'Spend 2+ Drama: The size of the burst increases by 1 for every 2 drama spent.'
      },
      {
        name: 'Quick Rewrite', cost: 3, resource: 'Drama', keywords: ['Area', 'Magic', 'Ranged'], type: 'Main action',
        distance: '3 cube within 10', target: 'Each enemy in the area',
        flavor: 'You write something unexpected into the scene that hinders your enemy.',
        powerRoll: { characteristic: 'Presence', t1: '4 damage; P<weak, slowed (save ends)', t2: '5 damage; P<avg, slowed (save ends)', t3: '6 damage; P<strong, restrained (save ends)' },
        effect: 'The area is difficult terrain for enemies.'
      },
      {
        name: 'Upstage', cost: 3, resource: 'Drama', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'As you bob and weave through the crowd, you can\'t help but leave the audience wanting more.',
        powerRoll: { characteristic: 'Agility or Presence', t1: 'Taunted (EoT); A<weak, prone', t2: 'Taunted (EoT); A<avg, prone', t3: 'Taunted (EoT); A<strong, prone and can\'t stand (EoT)' },
        effect: 'You shift up to your speed. You make one power roll that targets each enemy you move adjacent to during this shift.'
      }
    ],
    5: [
      {
        name: 'Dramatic Reversal', cost: 5, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '3 burst', target: 'Self and each ally in the area',
        flavor: 'Give the audience a surprise.',
        powerRoll: { characteristic: 'Presence', t1: 'The target can shift 1 square and make a free strike.', t2: 'The target can shift up to 2 squares and make a free strike that gains an edge.', t3: 'The target can shift up to 3 squares and make a free strike that gains an edge, then can spend a Recovery.' }
      },
      {
        name: 'Fake Your Death', cost: 5, resource: 'Drama', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'O happy dagger, this is thy sheath!',
        effect: 'You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion and your invisibility last until the end of your next turn, or until the illusion is interacted with, you take damage, or you use a main action or a maneuver.'
      },
      {
        name: 'Flip the Script', cost: 5, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '3 burst', target: 'Self and each ally in the area',
        flavor: 'You try a different take on events, justifying the new locations everyone ended up in.',
        effect: 'Each target can teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.'
      },
      {
        name: 'Method Acting', cost: 5, resource: 'Drama', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'They\'re so hurt by your performance, you start to believe it yourself.',
        powerRoll: { characteristic: 'Agility', t1: '6 + A damage; P<weak, weakened (save ends)', t2: '10 + A damage; P<avg, weakened (save ends)', t3: '14 + A damage; P<strong, weakened (save ends)' },
        effect: 'You can become bleeding (save ends) to deal an extra 5 corruption damage to the target.'
      }
    ],
    7: [
      {
        name: 'Extensive Rewrites', cost: 7, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '4 burst', target: 'Each enemy in the area',
        flavor: 'No, this isn\'t right. That foe was over there!',
        powerRoll: { characteristic: 'Presence', t1: 'Slide 3; P<weak, ignores stability', t2: 'Slide 5; P<avg, ignores stability', t3: 'Slide 7; P<strong, ignores stability' },
        effect: 'Instead of sliding a target, you can swap their location with another target as long as each can fit into the other\'s space.'
      },
      {
        name: 'Infernal Gavotte', cost: 7, resource: 'Drama', keywords: ['Area', 'Magic', 'Melee', 'Weapon'], type: 'Main action',
        distance: '3 burst', target: 'Each enemy in the area',
        flavor: 'A spicy performance lights a fire under your allies\' feet.',
        powerRoll: { characteristic: 'Presence', t1: '5 fire damage; A<weak, weakened (save ends)', t2: '7 fire damage; A<avg, weakened (save ends)', t3: '10 fire damage; A<strong, weakened (save ends)' },
        effect: 'Each ally in the area can shift up to 2 squares.'
      },
      {
        name: 'Star Solo', cost: 7, resource: 'Drama', keywords: ['Magic', 'Melee', 'Ranged', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1 or ranged 10', target: 'One creature or object',
        flavor: 'Your performance travels and doesn\'t stop until your audience is completely rocked.',
        powerRoll: { characteristic: 'Presence', t1: '5 + P damage', t2: '8 + P damage; push 3', t3: '11 + P damage; push 5' },
        effect: 'You can choose to have this ability deal sonic damage. You can use this ability against the same target for the next 2 combat rounds without spending drama.'
      },
      {
        name: 'We Meet at Last', cost: 7, resource: 'Drama', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'One creature',
        flavor: 'You magically intertwine your fate with another creature.',
        effect: 'Until end of encounter, both you and the target can target each other with abilities even beyond distance, with this ability\'s distance replacing those abilities\' distances. The target can\'t be force moved by abilities used beyond distance. Once per turn as a free maneuver, communicate a motivating or dispiriting message: grant 2 surges or force a bane on the target\'s next ability roll.'
      }
    ],
    9: [
      {
        name: 'Action Hero', cost: 9, resource: 'Drama', keywords: ['Area', 'Melee', 'Weapon'], type: 'Main action',
        distance: '3 burst', target: 'Each enemy in the area',
        flavor: 'You wield your weapon at blistering speed.',
        powerRoll: { characteristic: 'Agility', t1: '10 damage', t2: '14 damage', t3: '20 damage' },
        effect: 'Unless you score a critical hit, this ability can\'t reduce a non-minion target below 1 Stamina.'
      },
      {
        name: 'Continuity Error', cost: 9, resource: 'Drama', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'One enemy or object',
        flavor: 'Your subject is written into two places at once.',
        effect: 'The target is split into two entities. One remains, the other appears in an unoccupied space within distance. Each entity has half the original\'s Stamina, is weakened, and takes 1d6 corruption damage at the start of their turns. If either reaches 0 Stamina, the other persists as the original. Both entities in the same space automatically merge, combining Stamina.'
      },
      {
        name: 'Love Song', cost: 9, resource: 'Drama', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'One creature or object',
        flavor: 'You play a small ditty that plants you inside your target\'s heart.',
        effect: 'The target gains 20 temporary Stamina. Until end of encounter, whenever the target takes damage while you\'re within distance, you can choose to take the damage instead.'
      },
      {
        name: 'Patter Song', cost: 9, resource: 'Drama', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Special',
        flavor: 'Dazzle them with your fancy patter.',
        powerRoll: { characteristic: 'Presence', t1: 'One ally can take their turn immediately after yours', t2: 'Two allies can take turns immediately after yours in any order', t3: 'Three allies can take turns immediately after yours; one can have already taken a turn this round' }
      },
      {
        name: 'Here\'s How Your Story Ends', cost: 9, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '5 burst', target: 'Each enemy in the area',
        flavor: 'You give away the ending, and it\'s not great for them.',
        powerRoll: { characteristic: 'Presence', t1: '2 psychic damage; P<weak, frightened (save ends)', t2: '5 psychic damage; P<avg, frightened (save ends)', t3: '7 damage; P<strong, frightened (save ends)' }
      },
      {
        name: 'You\'re All My Understudies', cost: 9, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '5 burst', target: 'Each ally in the area',
        flavor: 'It\'s important for everyone to know each other\'s lines.',
        effect: 'Until end of encounter, each target gains the speed bonus, weapon distance bonus, disengage bonus, and stability bonus of your currently equipped kit in addition to their own.'
      },
      {
        name: 'Blood on the Stage', cost: 9, resource: 'Drama', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature or object',
        flavor: 'It\'s love and blood or drama and blood. Either way, there\'s always blood.',
        powerRoll: { characteristic: 'Agility', t1: '12 + A damage; M<weak, bleeding (save ends)', t2: '18 + A damage; M<avg, bleeding (save ends)', t3: '24 + A damage; bleeding (EoT), or if M<strong, bleeding (save ends)' }
      },
      {
        name: 'Fight Choreography', cost: 9, resource: 'Drama', keywords: ['Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 1', target: 'One creature',
        flavor: 'You and your partner make a flashy show of derring-do.',
        effect: 'You and the target each make a melee free strike targeting each enemy within 3 squares, dividing enemies between you. You choose targeting. Then slide the target 5 squares, ignoring stability.'
      },
      {
        name: 'Feedback', cost: 9, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: 'Three 3 cubes within 1', target: 'Each enemy in the area',
        flavor: 'Your music pounds the crowd to the beat.',
        powerRoll: { characteristic: 'Presence', t1: '7 sonic damage; P<weak, prone', t2: '10 sonic damage; P<avg, prone', t3: '13 sonic damage; P<strong, prone' },
        effect: 'A prone target ignores this ability.'
      },
      {
        name: 'Legendary Drum Fill', cost: 9, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Maneuver',
        distance: '4 burst', target: 'Self and each ally in the area',
        flavor: 'You start a drumroll that roars like thunder.',
        effect: 'Each target gains 1 surge, then gains 1 surge at the start of each combat round until end of encounter.'
      }
    ],
    11: [
      {
        name: 'Dramatic Reveal', cost: 11, resource: 'Drama', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'Where once stood a foe, now stands a friend!',
        effect: 'Until end of encounter, whenever you reduce a creature to 0 Stamina, use a free triggered action to teleport an ally within distance of that ability into the creature\'s space. You or the teleported ally can then make a melee free strike.'
      },
      {
        name: 'Power Ballad', cost: 11, resource: 'Drama', keywords: ['Magic', 'Ranged'], type: 'Maneuver',
        distance: 'Ranged 10', target: 'Self or one ally',
        flavor: 'A song for the brokenhearted wraps itself around the target.',
        effect: 'Until end of encounter, whenever the target takes damage while winded, they can use a free triggered action to deal half the damage to the source.'
      },
      {
        name: 'Saved in the Edit', cost: 11, resource: 'Drama', keywords: ['Magic'], type: 'Maneuver',
        distance: 'Self', target: 'Self',
        flavor: 'You shout a word of power that allows you to rewrite reality.',
        effect: 'Until end of encounter, whenever you deal rolled damage or enable a creature to spend a Recovery, use a free triggered action to give the target one of the following until start of your next turn: damage weakness equal to Presence vs magic/psionic/weapon abilities; damage immunity equal to Presence; bonus to stability and penalty to speed equal to Presence; bonus to speed and penalty to stability equal to Presence.'
      },
      {
        name: 'The Show Must Go On', cost: 11, resource: 'Drama', keywords: ['Area', 'Magic', 'Ranged'], type: 'Maneuver',
        distance: '5 cube within 10', target: 'Each enemy in the area',
        flavor: 'You shine a bright light on the players on the stage.',
        powerRoll: { characteristic: 'Presence', t1: '6 damage; P<weak, can\'t leave area (EoT)', t2: '8 damage; P<avg, can\'t leave area (save ends)', t3: '12 damage; can\'t leave area (EoT); P<strong, can\'t leave area (save ends)' },
        effect: 'Each ally within distance can\'t obtain lower than tier 2 on the next test before start of your next turn.'
      },
      {
        name: 'Epic', cost: 11, resource: 'Drama', keywords: ['Magic', 'Melee', 'Ranged'], type: 'Maneuver',
        distance: 'Melee 1 or ranged 10', target: 'One creature',
        flavor: 'Your story tells a tale of the villain\'s waning power.',
        powerRoll: { characteristic: 'Presence', t1: 'Bane on ability rolls (save ends)', t2: 'Double bane on ability rolls (save ends)', t3: 'Double bane on power rolls (save ends)' },
        effect: 'Choose one ally within distance. While the target is affected, each time they use an ability, that ally can make a free strike against them.'
      },
      {
        name: 'Expert Fencer', cost: 11, resource: 'Drama', keywords: ['Charge', 'Melee', 'Strike', 'Weapon'], type: 'Main action',
        distance: 'Melee 3', target: 'One creature or object',
        flavor: 'If you can land the strike, the crowd goes wild.',
        powerRoll: { characteristic: 'Agility', t1: '15 + A damage', t2: '21 + A damage', t3: '28 + A damage; M<strong, bleeding (save ends)' },
        effect: 'This ability can\'t obtain better than tier 2 unless the target is at maximum distance. If tier 3 with natural 17 or higher, gain 3 surges.'
      },
      {
        name: 'Jam Session', cost: 11, resource: 'Drama', keywords: ['Area', 'Magic'], type: 'Main action',
        distance: '5 burst', target: 'Each enemy in the area',
        flavor: 'Your jam session creates new genres that compel everyone to move.',
        powerRoll: { characteristic: 'Presence', t1: '8 sonic damage', t2: '11 sonic damage', t3: '15 sonic damage' },
        effect: 'Each creature within distance gains +5 speed until end of their next turn. While under this effect, each target must use their full movement.'
      },
      {
        name: 'Melt Their Faces', cost: 11, resource: 'Drama', keywords: ['Magic', 'Melee', 'Ranged', 'Strike'], type: 'Main action',
        distance: 'Melee 1 or ranged 10', target: 'One creature or object',
        flavor: 'The power of music rips through reality around the target.',
        powerRoll: { characteristic: 'Presence', t1: '12 + P sonic damage; push 5', t2: '16 + P sonic damage; push 10', t3: '22 + P sonic damage; push 15' },
        effect: 'Forced movement from this ability ignores stability.'
      }
    ]
  },
  features: {
    'Drama Resource': 'Start combat with drama equal to Victories. Gain 1d3 at start of each turn. Gain 2 drama first time three or more heroes use an ability on the same turn. Gain 2 drama the first time any hero is made winded during the encounter. Gain 3 drama whenever a creature within line of effect rolls a natural 19 or 20. Gain 10 drama when you or another hero dies. When dead with body intact, continue gaining drama; at 30 drama come back to life with 1 Stamina and 0 drama. Outside combat, heroic abilities can be used once without spending drama until you earn Victories or finish a respite.',
    'Kit': 'You can use and gain the benefits of a kit.',
    'Scene Partner': 'Whenever you obtain a success on a test to interact with an NPC using a skill from the interpersonal group, you can form a bond with that NPC. When you enter into a negotiation with a bonded NPC, their patience increases by 1 (max 5). The first time during a negotiation that you personally make an argument that would increase a bonded NPC\'s interest by 1, you instead increase their interest by 2 (max 5). You can have a number of bonds active equal to your level.',
    'Routines': 'At the start of each combat round, as long as you are not dazed, dead, or surprised, you can choose a new performance or maintain your current performance (no action required). Your performance lasts until you are unable to maintain it or until the end of the encounter. You start with Choreography and Revitalizing Limerick performances.',
    'Appeal to the Muses': 'Before you roll to gain drama at the start of your turn, you can make your appeal (no action required). Roll of 1: gain 1 additional drama, Director gains 1d3 Malice. Roll of 2: gain 1 Heroic Resource to keep or give to an ally within performance distance, Director gains 1 Malice. Roll of 3: gain 2 Heroic Resource distributed among yourself and allies within performance distance.',
    'Melodrama': 'Choose two additional events that grant drama during battle: natural 2 on power roll (2 drama), Director Villain action/Malice ability damages hero (2 drama), hero unwillingly falls 5+ squares (2 drama), hero deals damage with 3 surges (2 drama), hero spends last Recovery (2 drama). Alternatively, forgo new event to boost an existing event by 1 additional drama.',
    'Zeitgeist': 'When you start or finish a respite, choose Foreshadowing (two clues, one can be false), Hear Ye Hear Ye (spread information, Presence test), or Latest Goss (three rumors, one can be false).',
    'Equal Billing': 'You can use Scene Partner to bond with one willing hero. You and bonded creatures gain +1 bonus to saving throws. Whenever you or a bonded creature succeeds on a saving throw, you and each bonded creature gain temporary Stamina equal to your level.',
    'A Muse\'s Muse': 'At the start of each of your turns during combat, you gain 1d3 + 1 drama instead of 1d3.',
    'Roar of the Crowd': 'You can\'t be made frightened, and if you are prone, you can stand up as a free maneuver. Whenever you spend a Recovery, you can forgo regaining Stamina to invoke the roar of an invisible applauding audience. You and each ally within 3 squares gains temporary Stamina equal to 10 + active bonds + either Victories or number of players (whichever is higher).',
    'Applause': 'Epic resource. Each respite, gain applause equal to XP gained. Spend applause as drama. Whenever you or a creature within 3 squares would obtain a failure or tier 1 on a test, spend 1 applause to improve the outcome by 1 tier. Applause remains until spent.',
    'Dramaturgy': 'Gain 1 additional drama or other Heroic Resource whenever you use Appeal to the Muses. Your performances no longer have a distance, but can affect any target on the encounter map within your line of effect.',
    'Greatest of All Time': 'Whenever you obtain a success on a test, each NPC within line of effect has their Impression score decreased by 4 during a negotiation (min 1), and each ally within 3 squares gains an edge on their next test. These effects last until you start your next respite.'
  },
  advancement: {
    1: { features: ['Troubadour Class Act (Subclass)', 'Drama', 'Kit', 'Scene Partner', 'Routines', 'Class Act Features', 'Class Act Triggered Action', 'Signature Ability', '3-cost Heroic Ability', '5-cost Heroic Ability'] },
    2: { features: ['Appeal to the Muses', 'Invocation', 'Perk', 'Class Act Ability (5-cost)'] },
    3: { features: ['Class Act Feature', '7-cost Heroic Ability'] },
    4: { features: ['Characteristic +1 (Agility & Presence to 3)', 'Melodrama', 'Perk', 'Skill', 'Zeitgeist'], charBumps: { auto: { agility: 1, presence: 1 }, max: 3 } },
    5: { features: ['Class Act Feature', '9-cost Heroic Ability'] },
    6: { features: ['Perk', 'Spotlight', 'Class Act Ability (9-cost)'] },
    7: { features: ['Characteristic +1 (all, max 4)', 'A Muse\'s Muse', 'Equal Billing', 'Skill'], charBumps: { auto: { might: 1, agility: 1, reason: 1, intuition: 1, presence: 1 }, max: 4 } },
    8: { features: ['Perk', 'Class Act Feature', '11-cost Heroic Ability'] },
    9: { features: ['Roar of the Crowd', 'Class Act Ability (11-cost)'] },
    10: { features: ['Applause', 'Characteristic +1 (Agility & Presence to 5)', 'Dramaturgy', 'Greatest of All Time', 'Perk', 'Skill'], charBumps: { auto: { agility: 1, presence: 1 }, max: 5 } }
  }
};
