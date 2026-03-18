// DS.Data.Ancestries - All 12 ancestries
DS.Data = DS.Data || {};
DS.Data.Ancestries = [
  {
    id: 'devil', name: 'Devil', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Devils are humanoids with horns, tails, and an innate talent for persuasion.',
    signatureTrait: { name: 'Silver Tongue', description: 'You have one skill from the interpersonal skill group. You gain an edge on tests to discover motivations and pitfalls during negotiation.' },
    purchasedTraits: [
      { id: 'barbed_tail', name: 'Barbed Tail', cost: 1, description: 'Once per round when you make a melee strike, deal extra damage equal to your highest characteristic score.' },
      { id: 'beast_legs', name: 'Beast Legs', cost: 1, description: 'Your speed is 6.', speedOverride: 6 },
      { id: 'glowing_eyes', name: 'Glowing Eyes', cost: 1, description: 'When you take damage from a creature, use a triggered action to deal 1d10 + level psychic damage to them.' },
      { id: 'hellsight', name: 'Hellsight', cost: 1, description: 'You don\'t take a bane on strikes against creatures with concealment.' },
      { id: 'impressive_horns', name: 'Impressive Horns', cost: 2, description: 'Whenever you make a saving throw, you succeed on a roll of 5 or higher.' },
      { id: 'prehensile_tail', name: 'Prehensile Tail', cost: 2, description: 'You can\'t be flanked.' },
      { id: 'wings', name: 'Wings', cost: 2, description: 'You can fly, staying aloft for rounds equal to your Might score (min 1). At 3rd level or lower, you have damage weakness 5 while flying.' }
    ]
  },
  {
    id: 'dragon_knight', name: 'Dragon Knight', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Dragon knights are dragonborn warriors with hardened scales and powerful breath.',
    signatureTrait: { name: 'Wyrmplate', description: 'You have damage immunity equal to your level to one damage type: acid, cold, corruption, fire, lightning, or poison. Change type on respite.' },
    purchasedTraits: [
      { id: 'draconian_guard', name: 'Draconian Guard', cost: 1, description: 'When you or an adjacent creature takes damage from a strike, use a triggered action to reduce that damage by your level.' },
      { id: 'draconian_pride', name: 'Draconian Pride', cost: 2, description: 'Signature ability: Area 1 burst. Power Roll + Might or Presence. Deals damage and pushes enemies.' },
      { id: 'dragon_breath', name: 'Dragon Breath', cost: 2, description: 'Signature ability: Area 3 cube within 1. Power Roll + Might or Presence. Choose damage type from acid, cold, corruption, fire, lightning, or poison.' },
      { id: 'prismatic_scales', name: 'Prismatic Scales', cost: 1, description: 'Select one Wyrmplate damage immunity. You always have this immunity in addition to Wyrmplate.' },
      { id: 'remember_your_oath', name: 'Remember Your Oath', cost: 1, description: 'As a maneuver, until start of next turn, saving throws succeed on 4 or higher.' },
      { id: 'dk_wings', name: 'Wings', cost: 2, description: 'You can fly, staying aloft for rounds equal to your Might score (min 1). At 3rd level or lower, you have damage weakness 5 while flying.' }
    ]
  },
  {
    id: 'dwarf', name: 'Dwarf', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Dwarves are stone-skinned folk with an innate connection to earth and runes.',
    signatureTrait: { name: 'Runic Carving', description: 'Carve a rune on your skin (10 min) for one benefit: Detection (sense creature/object type within 20 sq), Light (glow 10 sq), or Voice (telepathy within 1 mile). One rune at a time.' },
    purchasedTraits: [
      { id: 'great_fortitude', name: 'Great Fortitude', cost: 2, description: 'You can\'t be made weakened.' },
      { id: 'grounded', name: 'Grounded', cost: 1, description: '+1 bonus to stability.', stabilityBonus: 1 },
      { id: 'spark_off_skin', name: 'Spark Off Your Skin', cost: 2, description: '+6 bonus to Stamina, increasing by 6 at 4th, 7th, and 10th levels.', staminaBonus: 6 },
      { id: 'stand_tough', name: 'Stand Tough', cost: 1, description: 'Might score treated as 1 higher for resisting potencies. Edge on Might tests to resist environmental effects.' },
      { id: 'stone_singer', name: 'Stone Singer', cost: 1, description: 'Spend 1 hour singing to reshape unworked mundane stone within 3 squares.' }
    ]
  },
  {
    id: 'wode_elf', name: 'Wode Elf', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Wode elves are fey-touched forest dwellers with natural camouflage.',
    signatureTrait: { name: 'Wode Elf Glamor', description: 'Edge on tests to hide and sneak. Tests to search for you while hidden take a bane.' },
    purchasedTraits: [
      { id: 'forest_walk', name: 'Forest Walk', cost: 1, description: 'You can shift into and while within difficult terrain.' },
      { id: 'quick_and_brutal', name: 'Quick and Brutal', cost: 1, description: 'On a critical hit, take an additional main action and an additional move action.' },
      { id: 'otherworldly_grace', name: 'Otherworldly Grace', cost: 2, description: 'Saving throws succeed on 5 or higher.' },
      { id: 'revisit_memory', name: 'Revisit Memory', cost: 1, description: 'Edge on tests to recall lore.' },
      { id: 'we_swift', name: 'Swift', cost: 1, description: 'Your speed is 6.', speedOverride: 6 },
      { id: 'wode_defends', name: 'The Wode Defends', cost: 2, description: 'Signature ability: Ranged strike. Thorny vines. Power Roll + Might or Agility. Deals damage and slows.' }
    ]
  },
  {
    id: 'high_elf', name: 'High Elf', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'High elves possess a magical glamor that makes them engaging and persuasive.',
    signatureTrait: { name: 'High Elf Glamor', description: 'Edge on Presence tests using Flirt or Persuade. You appear slightly different to each creature, but always as yourself.' },
    purchasedTraits: [
      { id: 'glamor_of_terror', name: 'Glamor of Terror', cost: 2, description: 'When you take damage from a creature, use a triggered action to make them frightened of you until end of their next turn.' },
      { id: 'graceful_retreat', name: 'Graceful Retreat', cost: 1, description: '+1 bonus to shift distance when you Disengage.' },
      { id: 'high_senses', name: 'High Senses', cost: 1, description: 'Edge on tests to notice threats.' },
      { id: 'he_otherworldly_grace', name: 'Otherworldly Grace', cost: 2, description: 'Saving throws succeed on 5 or higher.' },
      { id: 'he_revisit_memory', name: 'Revisit Memory', cost: 1, description: 'Edge on tests to recall lore.' },
      { id: 'unstoppable_mind', name: 'Unstoppable Mind', cost: 2, description: 'You can\'t be made dazed.' }
    ]
  },
  {
    id: 'hakaan', name: 'Hakaan', size: '1L', speed: 5, ancestryPoints: 3,
    description: 'Hakaan are large folk descended from giants, towering over most humanoids.',
    signatureTrait: { name: 'Big!', description: 'Your size is 1L.' },
    purchasedTraits: [
      { id: 'all_is_feather', name: 'All Is a Feather', cost: 1, description: 'Edge on tests to lift and haul heavy objects.' },
      { id: 'doomsight', name: 'Doomsight', cost: 2, description: 'Predetermine an encounter where you die. While doomed, auto tier 3 on tests and rolls, can\'t die until encounter ends, then die permanently.' },
      { id: 'forceful', name: 'Forceful', cost: 1, description: 'Forced movement distance you deal increases by 1.' },
      { id: 'hk_great_fortitude', name: 'Great Fortitude', cost: 2, description: 'You can\'t be made weakened.' },
      { id: 'hk_stand_tough', name: 'Stand Tough', cost: 1, description: 'Might treated as 1 higher for resisting potencies. Edge on Might tests to resist effects.' }
    ]
  },
  {
    id: 'human', name: 'Human', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Humans have an innate connection to the natural world that lets them detect and resist the supernatural.',
    signatureTrait: { name: 'Detect the Supernatural', description: 'As a maneuver, until end of next turn, know location of every supernatural object or undead/construct/otherworldly creature within 5 squares.' },
    purchasedTraits: [
      { id: 'cant_take_hold', name: 'Can\'t Take Hold', cost: 1, description: 'Ignore temporary difficult terrain from magic/psionic. Reduce magic/psionic forced movement by 1.' },
      { id: 'determination', name: 'Determination', cost: 2, description: 'If frightened, slowed, or weakened, use a maneuver to end one of those conditions.' },
      { id: 'perseverance', name: 'Perseverance', cost: 1, description: 'Edge on Endurance tests. When slowed, speed is 3 instead of 2.' },
      { id: 'resist_unnatural', name: 'Resist the Unnatural', cost: 1, description: 'When you take typed damage, use a triggered action to take half damage.' },
      { id: 'staying_power', name: 'Staying Power', cost: 2, description: 'Increase your Recoveries by 2.' }
    ]
  },
  {
    id: 'memonek', name: 'Memonek', size: '1M', speed: 5, ancestryPoints: 4,
    description: 'Memonek are beings of order from Axiom with silicon bodies and lawful natures.',
    signatureTrait: { name: 'Fall Lightly / Lightweight', description: 'Reduce fall distance by 2 squares. When force moved, treat your size as one smaller.' },
    purchasedTraits: [
      { id: 'i_am_law', name: 'I Am Law', cost: 1, description: 'Enemies can\'t move through your space unless you allow it.' },
      { id: 'keeper_of_order', name: 'Keeper of Order', cost: 2, description: 'Once per round, when you or adjacent creature makes a power roll, use triggered action to remove an edge or bane.' },
      { id: 'lightning_nimbleness', name: 'Lightning Nimbleness', cost: 2, description: 'Your speed is 7.', speedOverride: 7 },
      { id: 'nonstop_m', name: 'Nonstop', cost: 2, description: 'You can\'t be made slowed.' },
      { id: 'systematic_mind', name: 'Systematic Mind', cost: 1, description: 'Edge on tests to parse schematics and maps. Treat unknown languages as if you know a related language.' },
      { id: 'unphased', name: 'Unphased', cost: 1, description: 'You can\'t be surprised.' },
      { id: 'useful_emotion', name: 'Useful Emotion', cost: 1, description: 'At start of combat, gain 1 surge.' }
    ]
  },
  {
    id: 'orc', name: 'Orc', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Orcs are fierce warriors with bloodfire magic coursing through their veins.',
    signatureTrait: { name: 'Relentless', description: 'When damage leaves you dying, make a free strike. If it reduces the target to 0 Stamina, spend a Recovery.' },
    purchasedTraits: [
      { id: 'bloodfire_rush', name: 'Bloodfire Rush', cost: 1, description: 'First time you take damage each round, +2 speed until end of round.' },
      { id: 'glowing_recovery', name: 'Glowing Recovery', cost: 2, description: 'When using Catch Breath, spend as many Recoveries as you like.' },
      { id: 'orc_grounded', name: 'Grounded', cost: 1, description: '+1 stability.', stabilityBonus: 1 },
      { id: 'orc_nonstop', name: 'Nonstop', cost: 2, description: 'You can\'t be made slowed.' },
      { id: 'passionate_artisan', name: 'Passionate Artisan', cost: 1, description: 'Choose 2 crafting skills. +2 bonus to project rolls using those skills.' }
    ]
  },
  {
    id: 'polder', name: 'Polder', size: '1S', speed: 5, ancestryPoints: 4,
    description: 'Polders are small folk with innate shadow magic who can flatten into shadows.',
    signatureTrait: { name: 'Shadowmeld / Small!', description: 'Size 1S. As a maneuver, flatten into a shadow on a wall or floor. While in shadow form, strikes and searches against you take a bane.' },
    purchasedTraits: [
      { id: 'corruption_immunity', name: 'Corruption Immunity', cost: 1, description: 'Corruption immunity equal to your level + 2.' },
      { id: 'fearless', name: 'Fearless', cost: 2, description: 'You can\'t be made frightened.' },
      { id: 'polder_graceful', name: 'Graceful Retreat', cost: 1, description: '+1 shift distance when you Disengage.' },
      { id: 'nimblestep', name: 'Nimblestep', cost: 2, description: 'Ignore difficult terrain. Move at full speed while sneaking.' },
      { id: 'polder_geist', name: 'Polder Geist', cost: 1, description: 'At start of turn, if no enemy has line of effect or you\'re hidden/have concealment, +3 speed until end of turn.' },
      { id: 'reactive_tumble', name: 'Reactive Tumble', cost: 1, description: 'When force moved, shift 1 square after.' }
    ]
  },
  {
    id: 'revenant', name: 'Revenant', size: '1M', speed: 5, ancestryPoints: 2, // 3 if size 1S (from former life)
    description: 'Revenants are undead who returned from death with a purpose.',
    signatureTrait: { name: 'Former Life / Tough But Withered', description: 'Choose a former ancestry (size from that ancestry). Immunity to cold, corruption, lightning, poison equal to level. Fire weakness 5. When Stamina reaches negative winded, become inert instead of dying.' },
    purchasedTraits: [
      { id: 'bloodless', name: 'Bloodless', cost: 2, description: 'You can\'t be made bleeding even while dying.' },
      { id: 'previous_life_1', name: 'Previous Life (1pt)', cost: 1, description: 'Select a 1-point purchased trait from your previous ancestry.' },
      { id: 'previous_life_2', name: 'Previous Life (2pt)', cost: 2, description: 'Select a 2-point purchased trait from your previous ancestry.' },
      { id: 'undead_influence', name: 'Undead Influence', cost: 1, description: 'Edge on Reason, Intuition, and Presence tests to interact with undead.' },
      { id: 'vengeance_mark', name: 'Vengeance Mark', cost: 2, description: 'Place magic sigils on creatures. Always know direction to sigiled creatures. Signature ability: Detonate Sigil (ranged 10, deals damage and slides).' }
    ]
  },
  {
    id: 'time_raider', name: 'Time Raider', size: '1M', speed: 5, ancestryPoints: 3,
    description: 'Time raiders are four-armed beings displaced from the timescape with psychic abilities.',
    signatureTrait: { name: 'Psychic Scar', description: 'Psychic immunity equal to your level.' },
    purchasedTraits: [
      { id: 'beyondsight', name: 'Beyondsight', cost: 1, description: 'As a maneuver, see through mundane obstructions 1 square thick or less. While adjusted, you can\'t see or target creatures within 1 square. Restore vision as a maneuver.' },
      { id: 'foresight', name: 'Foresight', cost: 1, description: 'Auto-know location of concealed creatures within 20. When targeted by a strike, impose a bane.' },
      { id: 'four_armed_athletics', name: 'Four-Armed Athletics', cost: 1, description: 'Edge on Climb, Gymnastics, or Swim when using all arms.' },
      { id: 'four_armed_martial', name: 'Four-Armed Martial Arts', cost: 2, description: 'Grab/Knockback targets one additional adjacent creature. Can grab up to 2 creatures.' },
      { id: 'psionic_gift', name: 'Psionic Gift', cost: 2, description: 'Choose a signature ability: Concussive Slam (damage + push + prone), Psionic Bolt (psychic + slide), or Minor Acceleration (speed boost).' },
      { id: 'tr_unstoppable_mind', name: 'Unstoppable Mind', cost: 2, description: 'You can\'t be made dazed.' }
    ]
  }
];
