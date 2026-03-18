// DS.Data.BeastKits - Beast form kits for Stormwight Furies
DS.Data = DS.Data || {};
DS.Data.BeastKits = [
  {
    id: 'boren',
    name: 'Boren (Bear)',
    description: 'With this stormwight kit, you channel your primordial ferocity into the form of a bear, becoming large, durable, and imposing. Boren are tied to the craggy, rocky north, and this aspect is associated with the blizzard\'s bitter cold.',
    aspectBenefits: 'Whenever you use forced movement to push a creature, you can pull that creature instead. Whenever you pull a creature adjacent to you and that creature has M < AVERAGE, you can use a free triggered action to make that creature grabbed by you.',
    animalForm: 'While in your bear form, your size is 2 and you gain a +1 bonus to distance with melee weapon abilities.',
    hybridForm: 'While in your hybrid form, your size is 2 and you gain a +1 bonus to distance with melee weapon abilities. At 4th level, the first time you take hybrid form in an encounter, you gain 10 temporary Stamina.',
    primordialStorm: 'Blizzard \u2014 Your primordial damage type is cold.',
    staminaPerEchelon: 9,
    stability: 2,
    meleeDamage: '+0/+0/+4',
    signatureAbility: {
      name: 'Bear Claws',
      flavorText: 'Attacks with your sharp and deadly claws grab the weak.',
      keywords: ['Melee', 'Strike', 'Weapon'],
      type: 'Action',
      distance: 'Melee 1',
      target: 'One creature or object',
      powerRoll: {
        characteristic: 'Might',
        t1: '2 + M damage; M < WEAK, grabbed',
        t2: '5 + M damage; M < AVERAGE, grabbed',
        t3: '11 + M damage; M < STRONG, grabbed'
      }
    },
    growingFerocity: [
      { ferocity: '2', benefit: 'You can have up to two creatures grabbed at a time. Additionally, whenever you make a strike against a creature you have grabbed, you gain 1 surge.' },
      { ferocity: '4', benefit: 'The first time you grab a creature on a turn, you gain 1 surge.' },
      { ferocity: '6', benefit: 'You gain an edge on the Grab and Knockback maneuvers.' },
      { ferocity: '8 (4th level)', benefit: 'The first time you grab a creature on a turn, you gain 2 surges instead of 1.' },
      { ferocity: '10 (7th level)', benefit: 'You have a double edge on the Grab and Knockback maneuvers.' },
      { ferocity: '12 (10th level)', benefit: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you have a creature grabbed, any ability roll made against that creature gains a bonus to its potency equal to your Might score.' }
    ]
  },
  {
    id: 'corven',
    name: 'Corven (Crow)',
    description: 'With this stormwight kit, you channel your primordial ferocity into the form of a crow, becoming stealthy and quick. Corven are tied to the mountain passes and the hot winds that flow through them. This aspect is associated with the warm and fast-rising anabatic wind.',
    aspectBenefits: 'You gain an edge on tests made to hide and sneak. Additionally, whenever you fall, you can use a free triggered action to use your Aspect of the Wild ability.',
    animalForm: 'While in your crow form, your size is 1T and you can fly. You can use the Hide maneuver as a free maneuver, and you can use your allies as cover when you hide. You can\'t use any abilities while in this form except for Aspect of the Wild.',
    hybridForm: 'While in your hybrid form, your size is your choice of 1S or 1M. At 4th level, you can fly.',
    primordialStorm: 'Anabatic Wind \u2014 Your primordial damage type is fire.',
    staminaPerEchelon: 3,
    speed: 3,
    meleeDamage: '+2/+2/+2',
    disengage: 1,
    signatureAbility: {
      name: 'Wing Buffet',
      flavorText: 'Foes who try to close in around you do so at their peril.',
      keywords: ['Area', 'Melee', 'Weapon'],
      type: 'Action',
      distance: '1 burst',
      target: 'Each enemy in the area',
      powerRoll: {
        characteristic: 'Agility',
        t1: '3 damage',
        t2: '6 damage',
        t3: '8 damage'
      },
      effect: 'You can shift up to 2 squares before or after making the power roll.'
    },
    growingFerocity: [
      { ferocity: '2', benefit: 'Whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.' },
      { ferocity: '4', benefit: 'The first time you shift on a turn, you gain 1 surge.' },
      { ferocity: '6', benefit: 'You gain an edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.' },
      { ferocity: '8 (4th level)', benefit: 'The first time you shift on a turn, you gain 2 surges instead of 1.' },
      { ferocity: '10 (7th level)', benefit: 'You have a double edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.' },
      { ferocity: '12 (10th level)', benefit: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, the potency of any effects targeting you is reduced by 2 for you.' }
    ]
  },
  {
    id: 'raden',
    name: 'Raden (Rat)',
    description: 'With this stormwight kit, you channel your primordial ferocity into the form of a rat, becoming mobile and elusive. Raden are associated with the wild nature of the rat, before cities became their habitat. This aspect is associated with the rat flood \u2014 a surge of corrupted water that draws forth hordes of rats.',
    aspectBenefits: 'You gain an edge on tests made to hide and sneak. Additionally, you ignore difficult terrain.',
    animalForm: 'While in your rat form, your size is 1T and you can automatically climb at full speed while moving. You can use the Hide maneuver as a free maneuver, you can use your allies as cover when you hide, and you can stay hidden while you move through squares occupied by any creature. Additionally, you gain an edge on tests made to climb while in this form. You can\'t use any abilities while in this form except for Aspect of the Wild.',
    hybridForm: 'While in your hybrid form, your size is your choice of 1S or 1M. At 4th level, you can automatically climb at full speed while moving.',
    primordialStorm: 'Rat Flood \u2014 Your primordial damage type is corruption.',
    staminaPerEchelon: 3,
    speed: 3,
    meleeDamage: '+2/+2/+2',
    disengage: 1,
    signatureAbility: {
      name: 'Driving Pounce',
      flavorText: 'Your enemies try in vain to fall back from your pouncing attack.',
      keywords: ['Melee', 'Strike', 'Weapon'],
      type: 'Action',
      distance: 'Melee 1',
      target: 'One creature or object',
      powerRoll: {
        characteristic: 'Agility',
        t1: '4 + A damage',
        t2: '7 + A damage; push 1',
        t3: '9 + A damage; push 2'
      },
      effect: 'You can shift up to the same number of squares that you pushed the target.'
    },
    growingFerocity: [
      { ferocity: '2', benefit: 'Whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.' },
      { ferocity: '4', benefit: 'The first time you shift on a turn, you gain 1 surge.' },
      { ferocity: '6', benefit: 'You gain an edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.' },
      { ferocity: '8 (4th level)', benefit: 'The first time you shift on a turn, you gain 2 surges instead of 1.' },
      { ferocity: '10 (7th level)', benefit: 'You have a double edge on Agility tests, the Escape Grab maneuver, and the Knockback maneuver.' },
      { ferocity: '12 (10th level)', benefit: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, the potency of any effects targeting you is reduced by 2 for you.' }
    ]
  },
  {
    id: 'vuken',
    name: 'Vuken (Wolf)',
    description: 'With this stormwight kit, you channel your primordial ferocity into the form of a wolf, becoming a fleet-footed hunter. Vuken are tied to forests and open steppes, and this aspect is associated with the thunderstorm.',
    aspectBenefits: 'Whenever you use the Knockback maneuver, you can then use the Aid Attack maneuver as a free triggered action.',
    animalForm: 'While in your wolf form, your size is 1L, you have a +2 bonus to speed, and you ignore difficult terrain.',
    hybridForm: 'While in your hybrid form, your size is 1L, you have a +2 bonus to speed, and you ignore difficult terrain. At 4th level, the first time you take hybrid form in an encounter, you gain 10 temporary Stamina.',
    primordialStorm: 'Lightning Storm \u2014 Your primordial damage type is lightning.',
    staminaPerEchelon: 9,
    speed: 2,
    meleeDamage: '+2/+2/+2',
    disengage: 1,
    signatureAbility: {
      name: 'Unbalancing Attack',
      flavorText: 'A wild assault forces your foe onto their back.',
      keywords: ['Melee', 'Strike', 'Weapon'],
      type: 'Action',
      distance: 'Melee 1',
      target: 'One creature or object',
      powerRoll: {
        characteristic: 'Might',
        t1: '4 + M damage; A < WEAK, prone',
        t2: '7 + M damage; A < AVERAGE, prone',
        t3: '9 + M damage; A < STRONG, prone'
      }
    },
    growingFerocity: [
      { ferocity: '2', benefit: 'Whenever you use the Knockback maneuver, you can target one additional creature.' },
      { ferocity: '4', benefit: 'The first time on a turn that you push a creature or knock a creature prone, you gain 1 surge.' },
      { ferocity: '6', benefit: 'You gain an edge on Agility tests and the Knockback maneuver.' },
      { ferocity: '8 (4th level)', benefit: 'The first time on a turn that you push a creature or knock a creature prone, you gain 2 surges.' },
      { ferocity: '10 (7th level)', benefit: 'You have a double edge on Agility tests and the Knockback maneuver.' },
      { ferocity: '12 (10th level)', benefit: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.' }
    ]
  }
];
