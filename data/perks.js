// DS.Data.Perks - All perks by category
DS.Data = DS.Data || {};
DS.Data.Perks = {
  crafting: [
    { id: 'area_of_expertise', name: 'Area of Expertise', type: 'crafting', description: 'Choose one crafting skill. Tier 1 outcomes on easy/medium tests become tier 2. Spend 1 min inspecting an object to learn its value and flaws.' },
    { id: 'expert_artisan', name: 'Expert Artisan', type: 'crafting', description: 'On crafting/research project tests using a crafting skill, roll power roll twice and use either result.' },
    { id: 'handy', name: 'Handy', type: 'crafting', description: 'When testing to craft without a relevant skill, +1 to the power roll.' },
    { id: 'improvisation_creation', name: 'Improvisation Creation', type: 'crafting', description: 'Quickly jury-rig a mundane item using a crafting skill. Lasts 1 hour or 1 use, then breaks.' },
    { id: 'inspired_artisan', name: 'Inspired Artisan', type: 'crafting', description: 'Spend a hero token to make another project roll for the same crafting respite activity. Once per respite.' },
    { id: 'traveling_artisan', name: 'Traveling Artisan', type: 'crafting', description: 'On non-respite days, spend 1 hour on a crafting project to gain 1d10 project points.' }
  ],
  exploration: [
    { id: 'brawny', name: 'Brawny', type: 'exploration', description: 'On failed Might tests, lose Stamina equal to 1d6 + level to improve outcome by one tier. Once per test.' },
    { id: 'camouflage_hunter', name: 'Camouflage Hunter', type: 'exploration', description: 'In wilderness, once hidden you don\'t need cover or concealment to stay hidden.' },
    { id: 'danger_sense', name: 'Danger Sense', type: 'exploration', description: 'In natural environments, edge on Alertness tests and can\'t be surprised. Warned of natural disasters within 72 hours.' },
    { id: 'friend_catapult', name: 'Friend Catapult', type: 'exploration', description: 'As maneuver, grab willing adjacent ally/object your size or smaller, vertical push up to 2x Might squares. Once per victory.' },
    { id: 'ive_got_you', name: "I've Got You!", type: 'exploration', description: 'Catch a falling willing ally as a free triggered action. Neither takes fall damage.' },
    { id: 'monster_whisperer', name: 'Monster Whisperer', type: 'exploration', description: 'Use Handle Animals to interact with nonsapient non-animal creatures.' },
    { id: 'put_your_back_into_it', name: 'Put Your Back Into It!', type: 'exploration', description: 'Assisted montage tests don\'t take a bane on tier 1. Once per montage, turn an ally\'s tier 1 into tier 2.' },
    { id: 'team_leader', name: 'Team Leader', type: 'exploration', description: 'At start of group/montage test, spend hero token so all participants use your exploration skills.' },
    { id: 'teamwork', name: 'Teamwork', type: 'exploration', description: 'On first turn of montage tests, make a test and assist another hero\'s test.' },
    { id: 'wood_wise', name: 'Wood Wise', type: 'exploration', description: 'On exploration skill tests where a d10 rolls 1, reroll it. Once per test.' }
  ],
  interpersonal: [
    { id: 'charming_liar', name: 'Charming Liar', type: 'interpersonal', description: 'Failed Lie tests have no consequences. Get one free lie in negotiations. Can\'t reuse until 1+ Victories.' },
    { id: 'dazzler', name: 'Dazzler', type: 'interpersonal', description: 'After performing for 1+ min, edge on tests to influence that creature for 1 hour.' },
    { id: 'engrossing_monologue', name: 'Engrossing Monologue', type: 'interpersonal', description: 'Out of combat, shout to get attention of non-hostile creatures within 10 squares for 1+ min. Allies get edge on stealth tests.' },
    { id: 'harmonizer', name: 'Harmonizer', type: 'interpersonal', description: 'Use Music to influence creatures who don\'t understand you. During negotiation arguments, play music for ally to give them an edge.' },
    { id: 'lie_detector', name: 'Lie Detector', type: 'interpersonal', description: 'Spend hero token to detect if information contains knowing lies (but not what truth is).' },
    { id: 'open_book', name: 'Open Book', type: 'interpersonal', description: 'Ask one potentially offensive question without suspicion. If they answer honestly, they can ask you one back.' },
    { id: 'pardon_my_friend', name: 'Pardon My Friend', type: 'interpersonal', description: 'When ally within 5 fails Presence test, step in with your roll replacing ally\'s. Once per test.' },
    { id: 'power_player', name: 'Power Player', type: 'interpersonal', description: 'Use Might instead of other characteristics for Brag, Flirt, or Intimidate tests.' },
    { id: 'so_tell_me', name: 'So Tell Me...', type: 'interpersonal', description: 'On successful Presence influence, ask one follow-up question that must be answered honestly.' },
    { id: 'spot_the_tell', name: 'Spot the Tell', type: 'interpersonal', description: 'On tier 3 Read Person tests, notice tells. Future Read Person tests on that person gain an edge.' }
  ],
  intrigue: [
    { id: 'criminal_contacts', name: 'Criminal Contacts', type: 'intrigue', description: 'During respite in a settlement, ask criminal contacts a question via Presence test for information.' },
    { id: 'forgettable_face', name: 'Forgettable Face', type: 'intrigue', description: 'Spend 10 min interacting to make creature forget your face. 1 hour assembling disguise = auto tier 2 on Disguise.' },
    { id: 'gum_up_the_works', name: 'Gum Up the Works', type: 'intrigue', description: 'When mundane trap activates within 3 sq, move to it and jam it to prevent activation while adjacent.' },
    { id: 'lucky_dog', name: 'Lucky Dog', type: 'intrigue', description: 'On failed intrigue skill tests, lose Stamina equal to 1d6 + level to improve by one tier. Once per test.' },
    { id: 'master_of_disguise', name: 'Master of Disguise', type: 'intrigue', description: 'Don/remove disguise as part of any Hide test or Hide maneuver.' },
    { id: 'slipped_lead', name: 'Slipped Lead', type: 'intrigue', description: 'Edge on tests to escape bonds. Given 1 min, escape mundane bonds without a test.' },
    { id: 'team_leader_intrigue', name: 'Team Leader', type: 'intrigue', description: 'At start of group/montage test, spend hero token so all participants use your intrigue skills.' }
  ],
  lore: [
    { id: 'but_i_know_who_does', name: 'But I Know Who Does', type: 'lore', description: 'On failed lore recall, learn nearest location where you could find the information.' },
    { id: 'eidetic_memory', name: 'Eidetic Memory', type: 'lore', description: 'On respite, choose one lore skill you don\'t have until next respite. 1+ min reading = memorize a page.' },
    { id: 'expert_sage', name: 'Expert Sage', type: 'lore', description: 'On lore research/crafting tests, roll power roll twice and use either result.' },
    { id: 'ive_read_about_this_place', name: "I've Read About This Place", type: 'lore', description: 'On entering a new settlement, ask the Director one of three questions about the settlement.' },
    { id: 'linguist', name: 'Linguist', type: 'lore', description: 'Auto-learn 2 new languages heard/seen regularly. After 7 days, pick up enough of unknown languages. Learn New Language projects at half cost.' },
    { id: 'polymath', name: 'Polymath', type: 'lore', description: 'When recalling lore without a relevant skill, +1 to the power roll.' },
    { id: 'specialist', name: 'Specialist', type: 'lore', description: 'Choose one lore skill. Always double edge on recall tests with it. Treat Renown as 1 higher (or 2 if they share the skill) in negotiations.' },
    { id: 'traveling_sage', name: 'Traveling Sage', type: 'lore', description: 'On non-respite days, spend 1 hour on a lore research project to gain 1d10 project points.' }
  ],
  supernatural: [
    { id: 'arcane_trick', name: 'Arcane Trick', type: 'supernatural', description: 'Signature ability: Cast minor magical effects (teleport small objects, harmless sparks, light sources, food transformation, illusions, inscriptions).' },
    { id: 'creature_sense', name: 'Creature Sense', type: 'supernatural', description: 'As maneuver, choose creature within 10 sq at your level or lower to learn their stat block keywords.' },
    { id: 'familiar', name: 'Familiar', type: 'supernatural', description: 'Gain a familiar spirit (1T, speed 5, Stamina 2+level). Telepathic within 10 squares. Can flank with you.' },
    { id: 'invisible_force', name: 'Invisible Force', type: 'supernatural', description: 'Psionic maneuver: Manipulate a tiny object within ranged 10, moving it up to R/I/P squares.' },
    { id: 'psychic_whisper', name: 'Psychic Whisper', type: 'supernatural', description: 'Psionic maneuver: Send 10-second telepathic message to one ally within ranged 10.' },
    { id: 'ritualist', name: 'Ritualist', type: 'supernatural', description: 'Spend 1 uninterrupted minute for a ritual of blessing. Target has double edge on next test within 1 minute. Once per respite.' },
    { id: 'thingspeaker', name: 'Thingspeaker', type: 'supernatural', description: 'Hold object 1 min to sense emotional resonance. Learn the dominant emotion and ask questions about it.' }
  ]
};

// Flat list for easy lookup
DS.Data.PerksList = [];
Object.keys(DS.Data.Perks).forEach(function(cat) {
  DS.Data.Perks[cat].forEach(function(p) { DS.Data.PerksList.push(p); });
});
