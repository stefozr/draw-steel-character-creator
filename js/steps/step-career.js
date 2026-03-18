// DS.Steps.Career - Step 3: Choose career
DS.Steps = DS.Steps || {};
DS.Steps.Career = (function() {

  var DESC = {
    agent: {
      text: 'You worked as a spy for a government or organization.',
      questions: [
        'Who did you work for?',
        'Who did you spy on?',
        'Who shouldn\'t know your true identity and allegiance but does?',
        'Who did you burn or leave behind to get a job done?'
      ],
      incidents: [
        { roll: 1, name: 'Disavowed', text: 'While on a dangerous espionage assignment, things went sideways. Although you escaped with your life, the mission was a public failure thanks to bad information your agency gave you. They denied you work for them, and you went on the run. Hero work will let you survive and clear your name.' },
        { roll: 2, name: 'Faceless', text: 'Your identity was always hidden. It was your way of protecting those around you because the work you did spying on powerful entities came with dangers. Then your world came crashing down when an enemy agent unmasked you, causing you to lose everything \u2014 your privacy, livelihood, loved ones, all gone in the blink of an eye. Instead of going into hiding, you became a public hero to protect the innocent in the name of those you lost.' },
        { roll: 3, name: 'Free Agent', text: 'There was a time in your life when you used to sell information to the highest bidder. Your acts were unsanctioned by any one organization, but you were well-connected enough to trade in secrets. Politics never mattered much to you until the information you sold wound up causing a ripple effect of harm that eventually destroyed the place you once called home. You became a hero to make up for your past.' },
        { roll: 4, name: 'Informed', text: 'After years of cultivating a rich list of informants, one of those informants risked everything to expose the heinous plans of powerful individuals. You promised to protect your informant, but your agency left them hanging \u2014 literally. You cut ties with your employer and swore to always make good on your word as a hero.' },
        { roll: 5, name: 'Spies and Lovers', text: 'While embedded in an undercover assignment, you fell for someone on the other side. They discovered you were a double agent, and though you insisted your feelings were real, the deceit cut too deep for your love interest to ignore. They exposed you, spurned you, or died because of their closeness to you. You left the espionage business to become a hero with nothing to hide.' },
        { roll: 6, name: 'Turncoat', text: 'You spent your life in service of your country or an organization that upheld your values. During your undercover operations, you discovered that everything you had been told was a lie. Whether you confronted your superiors or were exposed, you were stripped of your service medals before you left to become a true hero.' }
      ]
    },
    aristocrat: {
      text: 'Career? Who needs a career when you\'re born into money! Or marry into it! Or con your way into it! Whatever the case, you didn\'t need to work thanks to (someone\'s) generational wealth.',
      questions: [
        'How did you become an aristocrat?',
        'What did you do to fill your days?',
        'Which aristocrats and people who worked for you were your best friends and greatest enemies?',
        'What sentimental heirloom from your old estate do you carry, and what does it mean to you?'
      ],
      incidents: [
        { roll: 1, name: 'Blood Money', text: 'When you entered adulthood, you heard unsavory whispers about your family\'s fortune before learning that their wealth came at the cost of others\' suffering. Whether you shed light on the secret or not, you left to become a hero stripped of noble title.' },
        { roll: 2, name: 'Charmed Life', text: 'Whether through some supernatural power or your innate persuasiveness, you were able to defraud other aristocrats. You did it for fun. And when you were found out, you lost your status. Whether you served time or escaped punishment, you decided to rehabilitate yourself and became a hero.' },
        { roll: 3, name: 'Inheritance', text: 'The guardians who instilled in you the virtues of doing the right thing were murdered in a senseless petty robbery. Though their wealth was bequeathed to you, it did little to assuage the guilt you felt for being unable to stop the deadly crime. You decided to use your riches to fund your life as a hero, whether publicly or using an alter ego.' },
        { roll: 4, name: 'Privileged Position', text: 'Life outside the manor never piqued your interest. You had everything you wanted. It thus came as a surprise when the peasants came to overthrow your family. You narrowly escaped, and for the first time witnessed the world. It caused you to become a hero for the people, fighting against inequities.' },
        { roll: 5, name: 'Royal Pauper', text: 'Seeking a break from noble duties, you sought a lookalike to switch identities with. It went so well that you made a habit of switching whenever you were bored. Unfortunately, your counterpart became so good at imitating you that they convinced all those around you that you were an impostor. You lost contact with your family, but now pursue a heroic path free of the pomp of your old life.' },
        { roll: 6, name: 'Wicked Secret', text: 'One parent passed away when you were a baby and the other remarried years later. Then that parent died under suspicious circumstances. Their spouse courted you, and you were banished (and possibly hunted). Rising from tragedy, you now seek to right the wrongs of the world.' }
      ]
    },
    artisan: {
      text: 'You made and sold useful wares.',
      questions: [
        'What did you create?',
        'Who taught you your craft?',
        'Was there any particular creation you were known for?',
        'Did you have a shop, or did you travel to sell your wares?'
      ],
      incidents: [
        { roll: 1, name: 'Continue the Work', text: 'A great hero was a fan of the things you created and gave you a generous commission to create your best work for them. While working on this commission, you and the hero became close friends. The day you finished the work was the same day they disappeared. To honor their legacy, you took up the mantle of a hero with the intent of finishing your friend\'s work.' },
        { roll: 2, name: 'Inspired', text: 'As you traveled the road selling your wares, troll bandits attacked you. One of the bandits claimed an item belonging to someone precious to you \u2014 or perhaps claimed that person\'s life \u2014 but the rest were driven off or slain by a group of heroes. Seeing the quick work those heroes made of the bandits inspired you to follow in their footsteps.' },
        { roll: 3, name: 'Robbery', text: 'A criminal gang stole your goods and harmed a number of people who worked for you. You became a hero to prevent such indignities from being visited upon others, to seek revenge for the assault, or to find the thieves and get your stuff back.' },
        { roll: 4, name: 'Stolen Passions', text: 'Your parents discouraged your artistic talents, instead trying to focus your passions on the family business. You refused to dim your spark and continued your work in secret. Enraged at discovering your disobedience, they sold your work to a traveling merchant. You left your hometown, seeking your lost art and encouraging others to live freely.' },
        { roll: 5, name: 'Tarnished Honor', text: 'A new patron commissioned some art, but on completion, they refused to pay you and claimed the work as their own. You were accused of plagiarism and run out of town. For you, heroics are about restoring your name and honor.' },
        { roll: 6, name: 'Twisted Skill', text: 'You had great success that caused an unscrupulous rival to curse you. For a time, everything you tried to create turned to ruin. You broke the curse through adventuring, and in doing so, discovered a new joy and purpose that now defines you.' }
      ]
    },
    beggar: {
      text: 'You lived by going to a tavern, crossroads, city street, or other busy area and begging passersby for money or food.',
      questions: [
        'What unfortunate circumstances led you to become a beggar?',
        'Where did you beg?',
        'Who made sport out of bullying you?',
        'Who showed you the most kindness?'
      ],
      incidents: [
        { roll: 1, name: 'Champion', text: 'You were never content with your lot. Watching yet another friend fall to preventable circumstances was your last straw. You gathered up what little you had and set off to become a hero, determined to make real change for those society forgot.' },
        { roll: 2, name: 'Night Terrors', text: 'Something killed the other beggars. It came in the night. You barely saw it, but what you did see of it wasn\'t natural. You survived by hiding, or perhaps it simply passed you over for reasons unknown to you. It still haunts your nightmares, and you kill monsters so no one else has to experience such horrors.' },
        { roll: 3, name: 'One Good Deed', text: 'You ran afoul of the local watch by being in the wrong place when they were in a bad mood. A passing hero intervened on your behalf, shaming the guards into moving on, then gave you enough gold to get you back on your feet. Their kindness kindled a spark in you. You took the gold, bought some secondhand gear, and went to pay that hero\'s kindness forward.' },
        { roll: 4, name: 'Precious', text: 'No matter how far you\'d fallen, there was one belonging you would never part with, no matter how much money it would bring you. When a pickpocket stole that object, you chased them until you were in a part of the city you no longer recognized. With a jolt, you realized you had no desire to return to your previous stomping grounds. You kept going, and you haven\'t looked back.' },
        { roll: 5, name: 'Strange Charity', text: 'A passerby dropped something in your cup. When you counted your day\'s collections, you found a magic coin among the coppers. You knew immediately that it was special. When the other beggars \u2014 your friends, you thought \u2014 showed that they were ready to murder you for it, you killed several of them in self-defense before you fled, leaving behind the only semblance of community you had.' },
        { roll: 6, name: 'Witness', text: 'You witnessed something you weren\'t meant to. Others would kill you if they knew, and they might be searching for you even now. You remain on the move, terrified of remaining in one place too long lest it all catch up to you. Perhaps if you make a big enough name for yourself, you can become untouchable and finally speak of what happened without fear.' }
      ]
    },
    criminal: {
      text: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
      questions: [
        'What crimes did you commit, and why?',
        'Did anyone help you perform your illicit activities?',
        'What is one crime you botched?',
        'Who was your nemesis while you were a criminal?'
      ],
      incidents: [
        { roll: 1, name: 'Antiquity Procurement', text: 'You stole, smuggled, and sold antiquities. In your haste to make a quick sale, you didn\'t fully vet a client and they subsequently robbed your warehouse. When the items that had stolen were taken from you, you realized the harm you had caused. Now you adventure to find those items you lost and return them to where they belong.' },
        { roll: 2, name: 'Atonement', text: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. To make up for the loss you caused, you left your criminal ways behind and became a hero.' },
        { roll: 3, name: 'Friendly Priest', text: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn\'t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.' },
        { roll: 4, name: 'Shadowed Influence', text: 'You spent years blackmailing and manipulating nobles for influence and wealth until a scheme went wrong. You were publicly exposed, and after a narrow escape, you reevaluated your life. Under a new identity, you work as a hero and hope no one looks at your past too closely.' },
        { roll: 5, name: 'Simply Survival', text: 'Stealing was a matter of survival for you and not what defined you \u2014 at least in your own mind. But when your thieving actions led to innocent folk being harmed, you knew you could be better. You turned your back on your old life, though your old skills still come in handy.' },
        { roll: 6, name: 'Stand Against Tyranny', text: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn\'t matter; with pickpockets and beggars made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance \u2014 not just against this tyrant, but against authoritarians anywhere.' }
      ]
    },
    disciple: {
      text: 'You worked in a church, temple, or other religious institution as part of the clergy.',
      questions: [
        'What gods or saints did your institution venerate?',
        'What initiation rites did you undergo to get the job?',
        'What were your responsibilities as a disciple?',
        'How was your institution viewed by members of the local culture?'
      ],
      incidents: [
        { roll: 1, name: 'Angel\'s Advocate', text: 'Swayed by an evil faith, your cult was about to unleash horrors upon the world when an angel (figurative or literal) intervened. They convinced you to stop your cult\'s plots. Now you follow in the footsteps of the angel who showed you the righteous path.' },
        { roll: 2, name: 'Dogma', text: 'Although you joined your religious institution under the guidance of a kind mentor, others within the house of worship became increasingly fanatical in their convictions. Your mentor sought to be a voice of reason in the rising tide of hatred and was tried as a heretic before being executed. Leaving the institution behind, you became a hero to uphold the beliefs you hold dear.' },
        { roll: 3, name: 'Freedom to Worship', text: 'Your temple was destroyed in a religious conflict. The institution\'s leaders sought retaliation, but you saw in these actions a ceaseless cycle of destruction that would lead to more conflict. Instead, you became a hero to protect religious freedoms, so all worshippers might practice their faith without fear.' },
        { roll: 4, name: 'Lost Faith', text: 'You devoted your life to ministering to the sick and needy, alongside other charitable work. Time and time again, tragedy struck those you served without rhyme or reason. Your prayers went unanswered, and your efforts went thankless. Eventually, you lost your faith in a higher power, and you left your church or temple to do good outside of any religious affiliation.' },
        { roll: 5, name: 'Near-Death Experience', text: 'While serving at a religious institution, you almost died in an accident. When you woke, you had lost all memory of ever having worked for the church or temple. Though the clergy encouraged you to stay, you left to forge a new path. Your sense of altruism \u2014 whether instilled in you by your past work or a part of who you naturally are \u2014 guides you in your life.' },
        { roll: 6, name: 'Taxing Times', text: 'The faith-based organization you were once part of became corrupt. It used its status in the community to accumulate wealth through tithes, while its leaders sought political appointments. During a season of drought, the institution stockpiled resources and refused to give aid, resulting in the deaths of many. You became a hero to fight against such corruption and to honor those you lost.' }
      ]
    },
    explorer: {
      text: 'You ventured into uncharted areas and made your living as a cartographer, researcher, resource seeker, or treasure hunter.',
      questions: [
        'For what purpose did you explore the unknown?',
        'Who else was part of your exploration team?',
        'What types of environments did you explore?',
        'What legend or rumor did you search for but never found?',
        'What is your greatest discovery?'
      ],
      incidents: [
        { roll: 1, name: 'Awakening', text: 'In an uncharted area, you awakened some fell horror. You subsequently turned to the life of a hero to put an end to the dread you unleashed and keep other hidden dangers at bay.' },
        { roll: 2, name: 'Missing Piece', text: 'You made an important but dangerous discovery about a treasure or ancient ritual that could spell mass destruction. Then the unthinkable happened when an unscrupulous colleague, spy, or treasure hunter stole your research notes. You\'re looking for the thief now, and anyone else who might use such discoveries for ill.' },
        { roll: 3, name: 'Nothing Belongs in a Museum', text: 'Exploring distant lands to collect valuable artifacts for cultural institutions was once your way of life. But when people died trying to reclaim one of the objects you took, you realized the truth. Your work was part of a larger problem of cultural theft, and the best place for these significant objects wasn\'t in a museum but with the people who created them. Setting out to return what had been taken and to protect others from theft set you on the path to become a hero.' },
        { roll: 4, name: 'Unschooled', text: 'You delved into dungeons and far-off places by studying them in books. You were an explorer who never felt the need to experience the dangers your peers did. Then your theory about a lost world cost you your reputation, and gave you the impetus to go on adventures and stand up for those with different ideas.' },
        { roll: 5, name: 'Wanderlust', text: 'You saw yourself as an observer and operated within a code of conduct. You swore to never interfere with a group by exposing them to your technology, knowledge, or values. But when faced with a moral conundrum, you either broke your code or stood idly by \u2014 and suffered the consequences. During this incident, you lost your observation journal but became a hero who refuses to let evil stand unchecked.' },
        { roll: 6, name: 'Wind in Your Sails', text: 'As a seafaring explorer, you lived to chart unknown courses. Though travel on the high seas was fraught with danger, the destination was always rewarding in riches, knowledge, or some other meaningful benefit. But your luck ran out when your ship was destroyed by pirates or other enemy forces. Now you\'ve taken to protecting those who seek safe passage while also hoping to avenge your crew.' }
      ]
    },
    farmer: {
      text: 'You grew crops or cared for livestock.',
      questions: [
        'Did you own the land you farmed, or did you farm for another?',
        'What crops or livestock did you cultivate?',
        'Who else worked on the farm with you?',
        'What ill omen did you witness that caused you to have a poor season of farming?'
      ],
      incidents: [
        { roll: 1, name: 'Blight', text: 'A horrible blight swept over your homeland, sickening the livestock and causing crops to rot. No one knows whether the blight is of natural origin or something more malevolent, but you set out in search of a way to cleanse the land of this affliction.' },
        { roll: 2, name: 'Bored', text: 'You\'ve always wanted so much more than gathering eggs and milking cows. You kept a secret journal of your dreams, filled with all the things you wanted. When your parent found the journal, they burned it and told you to keep your head out of the clouds. In response, you gathered what you could in a pack and left everything else behind, seeking a life of adventure.' },
        { roll: 3, name: 'Cursed', text: 'While tilling your fields, you found something in the dirt. Perhaps it was a chipped and dented weapon, a piece of ancient jewelry, or something altogether unique. Excited by your find, you showed it to a loved one, but when they touched it, something happened. You now know it was a curse conveyed by the item, though you don\'t know why it affected them and not you. You left your old life in search of answers.' },
        { roll: 4, name: 'Hard Times', text: 'Your farm had always been prosperous, until the last few years. Changes in the weather caused smaller yields until you could no longer pay your tithe to the local noble. Her soldiers took what items of value they found, including a precious family heirloom. You left the struggling farm behind to find a better life.' },
        { roll: 5, name: 'Razed', text: 'Your animals were killed, your crops and home set ablaze. The culprits might have been wandering bandits, raiders from a nearby kingdom, or hired thugs sent by a rival farm. Whoever they were, they left you with nothing. You couldn\'t face the thought of starting again from scratch, so you took up a life of heroism to protect others from such villainy.' },
        { roll: 6, name: 'Stolen', text: 'Your family bred horses \u2014 beautiful creatures that few could rival on the track and in the jousting lists. When a local noble arrived with an offer to buy your prized stallion, your father refused. The noble struck him down where he stood and stole the horse. Without that stallion, the renowned bloodline would end. You intend to get them back \u2014 and get revenge.' }
      ]
    },
    gladiator: {
      text: 'In the past, you entertained the masses with flashy displays of violence in the arena.',
      questions: [
        'What led you to this life of violent entertainment?',
        'What was your gladiator name and persona?',
        'Who was your biggest rival?',
        'What happened during your most famous match?'
      ],
      incidents: [
        { roll: 1, name: 'Betrayed', text: 'A local crime lord offered you money to throw your last bout, promising that you\'d live through the ordeal and get a cut of all the wagers placed on the match. You upheld your end of the deal \u2014 which made the knife in your back after the bout so surprising. You woke in a shallow grave, barely alive, and ready to mete out justice.' },
        { roll: 2, name: 'Heckler', text: 'As you stood victorious on the arena sands, a voice cried out among the cheering, "This violence is only for show. You should be ashamed. There are people who need you \u2014 who need your skills!" Why did that voice ring so clear? And why did it sound so familiar? You never saw the face of the person who uttered those words, but they weighed heavy on you. The next day, you fled the arena to begin a hero\'s life.' },
        { roll: 3, name: 'Joined the Arena', text: 'As a child, you loved gladiatorial matches, captivated by the fierce displays of bravery and bravado, never giving much thought to how the competitors ended up in the ring. Then your friend was wrongly accused of a crime and sentenced to compete. You went in their place. After viewing what life was like for those forced to fight, you survived your sentence and resolved to protect the unfairly condemned.' },
        { roll: 4, name: 'New Challenges', text: 'You earned every title you could. You beat every opponent willing to face you in the arena. Your final battle with your rival ended with you victorious \u2014 and still you were unsatisfied. Other, greater foes are out there. And you mean to find them.' },
        { roll: 5, name: 'Scion\'s Compassion', text: 'You were born a noble, but the duplicitous and power-hungry nature of your family had you seeking your own fortune in the arena. You saw that competitors brought there by circumstance and not choice suffered. You gave all you could of your family money to those less-fortunate folk, and then set out to make a real difference in this cruel world.' },
        { roll: 6, name: 'Warriors\' Home', text: 'The orphanage you grew up in secretly supplied gladiators to the arena. Forced to fight against many childhood friends as an adult, you vowed to dismantle the arena and free other victims. You became a liberator, dedicated to ending the oppression of others until your dying breath.' }
      ]
    },
    laborer: {
      text: 'You worked as a farmer, builder, clothes washer, forester, miner, or some other profession engaged in hard manual labor.',
      questions: [
        'What type of manual labor did you do?',
        'What important friendship did you make on the job?',
        'Where did you go with your coworkers to blow off steam when the job was done?',
        'What aspect of the job was most difficult for you?'
      ],
      incidents: [
        { roll: 1, name: 'Deep Sentinel', text: 'Spending your days cleaning and maintaining the sewers doesn\'t make you many friends. But you found companionship among the rats. You fought the monsters that hunted your friends, and which others ignored. After making the sewers safe for the rats, you decided to take your talents to the surface and serve other humanoids who might appreciate your efforts in the same way.' },
        { roll: 2, name: 'Disaster', text: 'A disaster, such as a cave-in, wildfire, or tidal wave, hit the work crew you were in charge of. You saved as many as you could, but the ones you couldn\'t save weigh heavily on your mind. You took up the life of a hero to save as many people as possible, vowing that what happened to you then won\'t happen again.' },
        { roll: 3, name: 'Embarrassment', text: 'A noble you worked for admonished you publicly for work done poorly \u2014 and more than once. Finally, you\'d had enough. You vowed to take up a new path and show this noble you\'re far more than what they make you out to be.' },
        { roll: 4, name: 'Live the Dream', text: 'You worked with a good friend, and on the job, you would always fantasize about what it would be like to hit the road as adventuring heroes \u2026 someday. You didn\'t expect that your friend would fall ill and pass away. Now it\'s time to live out that dream for both of you.' },
        { roll: 5, name: 'Shining Light', text: 'You kept a lighthouse along the constantly stormy cliffs of your village with your mentor. On a clear and sunny day, your mentor vanished. Finding only a cryptic notebook filled with his musings on the supernatural, you left to find out what really happened. The trail has gone cold for now, and you\'re helping others find their loved ones in the meantime.' },
        { roll: 6, name: 'Slow and Steady', text: 'You labored silently as an uncaring boss drove those around you into the ground, pushing you to work harder to lessen the burden on your companions. But when the boss pushed too far and killed a friend of yours, you led an uprising against them. That was the start of your adventuring life.' }
      ]
    },
    mages_apprentice: {
      text: 'For long years, you studied magic under the mentorship of a more experienced mage.',
      questions: [
        'Who did you study under, and what kind of person were they?',
        'What were your mentor\'s areas of expertise?',
        'What aspects of magic did you struggle to comprehend?',
        'What is your current relationship with your mentor?'
      ],
      incidents: [
        { roll: 1, name: 'Forgotten Memories', text: 'While practicing a spell, your inexperience caused the magic to backfire and your memories were wiped, leaving you with only fragments of who you once were. Determined to recall your past, you now dedicate yourself to helping others, hoping your actions will spark some remembrance or lead you to a way to reverse the magic.' },
        { roll: 2, name: 'Magic of Friendship', text: 'As a sign of your status as a star pupil, your mentor gifted you a familiar as a magic pet. Another jealous apprentice captured the familiar and slipped away in the night. Haunted by your pet\'s absence, you adventure to find your kidnapped friend and prevent others from feeling your loss.' },
        { roll: 3, name: 'Missing Mage', text: 'One day you woke up and the mage you worked for was gone. They didn\'t take any of their belongings and there was no sign of any foul play \u2014 only the scent of sulfur in their bedchamber. You set out on your heroic journey in the aftermath and have been looking for them ever since.' },
        { roll: 4, name: 'Nightmares Made Flesh', text: 'Your attempts at magic have always been unpredictable. A powerful mage promised to help you gain control. During your training, a terrible nightmare caused your body to flare with magic and pull the monster of your nightmare into the waking world. The horror escaped. You left, seeking to vanquish their vileness.' },
        { roll: 5, name: 'Otherworldly', text: 'While studying magic, you accidentally sent yourself from your original world to this one. Now you\'re stranded here, hoping to find ancient texts or powerful magic treasures that might transport you back home. A life of adventure it is!' },
        { roll: 6, name: 'Ultimate Power', text: 'The mage you worked for was a kindly old soul, but the basic magic they taught you always seemed like a small part of something bigger. It wasn\'t until you met an adventuring elementalist that you realized hitting the road as a hero was the only way to truly improve and hone your skills. You resigned your apprenticeship and found yourself walking the path of a hero the next day.' }
      ]
    },
    performer: {
      text: 'You can sing, act, or dance well enough that people actually pay you to do it. Imagine that!',
      questions: [
        'What is the tone of your performances?',
        'What song, role, or dance are you most known for?',
        'Did you perform in the same place throughout your career, or did you travel?',
        'Were you part of a troupe, or were you a solo act?'
      ],
      incidents: [
        { roll: 1, name: 'Cursed Audience', text: 'During a performance, you watched in horror as the audience was suddenly overcome by a curse that caused them to disintegrate before your eyes. You aren\'t sure what happened, but seeking an answer quickly led you to places where only heroes dare to go.' },
        { roll: 2, name: 'False Accolades', text: 'After a poor performance, you found a script to a well-written play left in your dressing room. The accompanying note asked that if you performed the play, you should give the author credit. But after a commanding performance, you claimed to be star and playwright both \u2014 and the curse hidden on those pages activated. A small portion of your skin has begun to transform into undead flesh, and the only cure is to prove you have become selfless.' },
        { roll: 3, name: 'Fame and Fortune', text: 'You thought you were famous \u2014 then that hero came to your show. Suddenly, all eyes were on the dragon-slaying brute instead of on the stage where they belonged. The audience even gave them a standing ovation when they entered the room. All you got was polite applause. Fine. If people want a hero so much, then a hero you shall be.' },
        { roll: 4, name: 'Songs to the Dead', text: 'Your performances have always been tinged with a bit of melancholy. During a particularly soulful performance, spirits disturbed the living audience and sat in their chairs. They begged you to prevent their demise, providing no other details before disappearing. You set out to determine if you could help your most dedicated fans.' },
        { roll: 5, name: 'Speechless', text: 'A heckler\'s mocking words left you utterly speechless during a performance, stinging your pride and stirring your arrogance. The incident strained your legendary voice, and you could speak only in soft whispers. The heckler was a fey trickster who stole your voice, promising to give it back after you accomplished real good in the world.' },
        { roll: 6, name: 'Tragic Lesson', text: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward them inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you made it your responsibility to protect others.' }
      ]
    },
    politician: {
      text: 'You worked as a leader within a formal, bureaucratic organization or government. You might have been appointed, born, or elected into your position, but getting people to agree and making decisions for the people you serve (or who served you) was your job.',
      questions: [
        'Who were you responsible for ruling or representing?',
        'What was your official title and how did you earn it?',
        'Who was your greatest political rival?',
        'What secret do you know that could tear apart the entire system you worked within?'
      ],
      incidents: [
        { roll: 1, name: 'Diplomatic Immunity', text: 'Your political power allowed you to be foolish without consequence. Through sheer carelessness or on a dare, you accidentally harmed or killed an innocent bystander. Due to your position as an official, you faced no consequences. But this event was the final straw for the person you loved or respected most, and they turned away from you. You left the world of political machinations behind to earn back their trust.' },
        { roll: 2, name: 'Insurrectionist', text: 'You secretly funded a rebel organization intent on overthrowing the corrupt establishment. Someone discovered your treason, and you were forced to flee or risk execution. You became a hero to live and fight another day on behalf of those who have no power.' },
        { roll: 3, name: 'Respected Consul', text: 'You were a seneschal to a leader, able to sway their opinions. But gossip convinced the leader you were plotting a coup, and you were ousted from their circle of influence. You became a hero to continue your work making meaningful change in the world.' },
        { roll: 4, name: 'Right Side of History', text: 'You tried to work on policy change from the inside of a bureaucratic organization. There were others like you who were more vocal. You started to notice those colleagues were disappearing overnight. Not wanting to find out if you were next on the list, you left to enact change in more direct ways.' },
        { roll: 5, name: 'Self-Serving', text: 'You used your skills to collect incriminating or scandalous information about your opponents to blackmail them. A rival got one step ahead of you and stole your book of dirty secrets. But instead of using it against you, they gave you an opportunity to leave the world of politics behind. Saved from public humiliation, you now use your skills for the greater good.' },
        { roll: 6, name: 'Unbound', text: 'The red tape required to achieve anything through your political position resulted in a crisis being mishandled and countless people harmed or killed. After that unfortunate event, you resolved to live unfettered by bureaucratic interference, seeking to do good through action, not paperwork.' }
      ]
    },
    sage: {
      text: 'From an early age, you dedicated yourself to learning, whether you shared the knowledge of the world with others or sought out secret lore only for yourself.',
      questions: [
        'What subjects did you study?',
        'Where did your studies take place?',
        'How did you acquire the books and other materials you needed for work?',
        'Who benefited most from your research?'
      ],
      incidents: [
        { roll: 1, name: 'Bookish Ideas', text: 'You were always content to live a peaceful life in your library, until you found that one book \u2014 the one that told the tale of heroes who had saved the timescape. They didn\'t spend their days behind a desk. They made a real difference. It was time for you to do the same.' },
        { roll: 2, name: 'Cure the Curse', text: 'You used to think knowledge could fix everything. You were wrong. When someone you loved fell under a curse, the means to cure them couldn\'t be found in any of the books you owned. But that wasn\'t going to stop you. The answers are out there, and you\'ll find them even if you have to face down death to do so.' },
        { roll: 3, name: 'Lost Library', text: 'An evil mage took all your books for themself, cackling at your impotence as they raided your shelves. Now, you\'re off to search through ancient ruins and secret libraries to rebuild your collection of rare tomes \u2014 and to find the mage who stole from you.' },
        { roll: 4, name: 'Paper Guilt', text: 'While transcribing ancient texts, you and another scribe discovered a shelf of long-forgotten books. At your suggestion, your companion started work on one end and vanished along with the tome. Your guilt drove you to seek out your still-missing friend and prevent others from falling to similar dangers.' },
        { roll: 5, name: 'Unforeseen Futures', text: 'In your pursuit of ancient knowledge, you discovered a prophecy that has yet to come to pass. And that prophecy involves someone who might be \u2026 you. Since your discovery, strange dreams have plagued you, driving you to seek out your destiny.' },
        { roll: 6, name: 'Vanishing', text: 'At first you thought it was your imagination, and you brushed off the disappearance of random sentences in historical books. Then as the books changed to entirely blank pages, the disappearances became difficult to ignore, particularly those involving ancient or critical text. Driven by the desire to preserve knowledge, you have made it your purpose to restore and reverse those vanishing texts before they forever disappear.' }
      ]
    },
    sailor: {
      text: 'You worked on a ship, whether a merchant cog, a mercenary or military craft, or a pirate vessel. You might have been a deckhand, a mate, or even the captain.',
      questions: [
        'What is the name of the vessel you sailed on, and what type of business was the crew engaged in?',
        'What was your job aboard the ship?',
        'What\'s the longest amount of time you\'ve spent at sea?',
        'Who or what did you lose on your maritime journeys?'
      ],
      incidents: [
        { roll: 1, name: 'Alone', text: 'You joined up with your best friend, sibling, or other loved one, the culmination of a lifelong dream to sail the high seas together. When they died, you lost your taste for the seafaring life. You left at the first opportunity and haven\'t looked back since.' },
        { roll: 2, name: 'Deserter', text: 'It was in the middle of a pirate raid (whether you were part of it or targeted by it) that you realized you no longer yearned for a sailor\'s life. You used the chaos of the moment to slip away unnoticed. You now work as a hero in an effort to either end the piracy of others or atone for your past deeds, but you fear the day your old crew finds you and punishes you for your desertion.' },
        { roll: 3, name: 'Forgotten', text: 'You awoke aboard your ship with no memory of who you were. Though the other sailors insisted they knew you, you didn\'t know them. The next time you went ashore, you decided to stay, determined to find out who you really are.' },
        { roll: 4, name: 'Jealousy', text: 'You had the favor of your captain, which earned you many rivals aboard your ship. One night, your fellow sailors pulled you from your bunk and threw you overboard. By some miracle, you were scooped from the waters by a passing vessel. You worked off your debt to them, then set out on a new life involving less pettiness.' },
        { roll: 5, name: 'Marooned', text: 'There was a mutiny, and you were on the losing side. You were marooned on an island and escaped when a merchant vessel was blown off course by a storm and found you. Your reputation is ruined among sailors, so you seek adventure elsewhere.' },
        { roll: 6, name: 'Water Fear', text: 'A catastrophic storm hit while you were at sea, destroying your ship and leaving you as the only survivor. Once you recovered, you tried to sign on with another ship, but the thought of the open water turned your legs to jelly. Instead, you\'ve taken on the role of a traveling hero to make ends meet.' }
      ]
    },
    soldier: {
      text: 'In your formative years, you fought tirelessly in skirmishes and campaigns against enemy forces.',
      questions: [
        'In which army and company did you serve?',
        'What conflicts were you a part of?',
        'What rank did you achieve?',
        'What heroics did you perform in the heat of battle?'
      ],
      incidents: [
        { roll: 1, name: 'Dishonorable Discharge', text: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.' },
        { roll: 2, name: 'Out of Retirement', text: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior \u2014 one seeking to save others from the fate you suffered.' },
        { roll: 3, name: 'Peace Through Healing', text: 'Living with constant bloodshed took its toll on you. You seek peace through healing and have dedicated yourself to ending wars before they begin, to spare those around you from the horror.' },
        { roll: 4, name: 'Sole Survivor', text: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only through luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.' },
        { roll: 5, name: 'Stolen Valor', text: 'Tired of eking out an existence on the streets, you enrolled in the military. However, you were unable to escape your lower-class background until the officer leading your unit fell in battle. In the chaos that ensued, you assumed their identity and returned home a hero. But when suspicion arose, you took on the life of an adventurer, staying always on the move.' },
        { roll: 6, name: 'Vow of Sacrifice', text: 'You promised a fellow soldier that you\'d protect his family if he ever fell in battle. When he did, you traveled to his village, but found its people slain or scattered by war. Driven by your vow, you have dedicated your life to finding any survivors and protecting others from a similar fate.' }
      ]
    },
    warden: {
      text: 'You protected a wild region from those who sought to harm it, such as poachers and cultists bent on the destruction of the natural world.',
      questions: [
        'What environment did you protect?',
        'Were you part of a formal group of wardens or did you take the job upon yourself?',
        'Which animal became your constant companion while you worked in the wild?',
        'What mysterious creature or wanderer did you meet in the forest, and what prophecy did they share with you?'
      ],
      incidents: [
        { roll: 1, name: 'Betrayed', text: 'When outsiders arrived in your lands with the intent to exploit the wilds for their resources, you spoke out against them. However, several other wardens spoke in favor of these outsiders, and allowed them in to despoil nature. Refusing to watch your homeland destroyed, you left. Now you help others avoid such a fate.' },
        { roll: 2, name: 'Corruption', text: 'A disease has infected the lands you protect, causing animals to become violent and twisting plants into something sinister. You\'ve tried everything, magical and mundane, to stop the scourge, but it continues to spread. As such, you\'ve set out in search of a cure or an unblighted land to protect.' },
        { roll: 3, name: 'Exiled', text: 'You made a mistake that could not be forgiven. The other wardens of the region decided your fate, exiling you from your lands with an order never to return.' },
        { roll: 4, name: 'Honor the Fallen', text: 'A group of heroes arrived in your territory with trouble close on their heels. You fought alongside them to turn back the evil, but it was too much. The heroes fell, and your wilderness was forever altered. Though your lands are beyond saving, there are other lands you can help.' },
        { roll: 5, name: 'Portents', text: 'There were signs. You tried to ignore them, but when a great beast died at your feet, you had to recognize the truth. You were meant to leave your home territory, meant to fight a battle for the fate of all lands \u2014 and so you gave up the only life you\'ve ever known.' },
        { roll: 6, name: 'Theft', text: 'You were responsible for guarding something precious, something vital to your region\'s survival. But you let someone in, and they betrayed your trust by stealing the thing you were meant to guard. You left your chosen territory to atone for your mistake.' }
      ]
    },
    watch_officer: {
      text: 'You served as an officer of the law for a local government. You might have been a single person in a much larger city watch or the only constable patrolling a small village.',
      questions: [
        'What type of settlement did you protect?',
        'What was your law enforcement style like? Were you a by-the-book officer, a more lenient-but-fair type, or totally corrupt?',
        'What criminal still eludes your grasp to this day?',
        'Whose life did you save in the line of duty?',
        'What is the most absurd call you ever responded to and how did you handle it?'
      ],
      incidents: [
        { roll: 1, name: 'Bigger Fish', text: 'You grew bored and disillusioned with chasing down petty thieves and imprisoning folks just trying to survive. Surely there are greater threats in the world. You will find that evil wherever it may lurk, and you\'ll be the one to stop it.' },
        { roll: 2, name: 'Corruption Within', text: 'You joined the force to help the helpless and bring justice to those wronged. You weren\'t prepared for the rampant corruption reaching the top of your organization. You refused to cover for your fellow officers and were told in no uncertain terms to leave town or face the consequences. Now you travel as a hero, acting as the protector you always wanted to be.' },
        { roll: 3, name: 'Frame Job', text: 'Your partner was murdered. That much is irrefutable. But you didn\'t do it, despite what the evidence implies. When it became clear you\'d take the fall, you fled, leaving everything behind. Not content to cower in the shadows, you decided to adventure under a new name while you work to clear your own.' },
        { roll: 4, name: 'Missing Mentor', text: 'You learned everything you know about the job from someone you always looked up to in a corrupt organization. One night, they sent you a cryptic message saying they had discovered "something big," but before you could find out more, they disappeared. No longer sure who you could trust, you slipped away and sought a new life. Now you do what good you can and search to find the truth.' },
        { roll: 5, name: 'One That Got Away', text: 'A violent or depraved criminal began targeting you \u2014 perhaps stealing something personal or hurting someone you love \u2014 after slipping through your grasp. You left your career to pursue the criminal, but the trail has gone cold \u2026 for now. Might as well help folk in the meantime.' },
        { roll: 6, name: 'Powerful Enemies', text: 'You made it your responsibility to root out and bring down the region\'s foremost crime syndicate. They sent goons to burn down your home and teach you a lesson, leaving you bleeding in the street with nothing left except your life. You\'ve since taken on the life of a hero to gain the power and influence you need to destroy the syndicate once and for all.' }
      ]
    }
  };

  function render(container) {
    var char = DS.State.getRef();
    var careers = DS.Data.Careers;
    var selectedId = char.career.id;

    var html = '<h2 class="step-title">Choose Your Career</h2>' +
      '<p class="step-subtitle">Your career is what you did before becoming a hero. It grants skills, languages, and a perk.</p>' +
      '<div id="career-grid"></div>';

    container.innerHTML = html;

    DS.Components.ChoiceGrid.render(document.getElementById('career-grid'), {
      items: careers.map(function(c) {
        return { id: c.id, name: c.name, description: c.description };
      }),
      selectedId: selectedId,
      onSelect: function(id) {
        if (id !== char.career.id) {
          DS.State.update('career.id', id);
          var career = careers.find(function(c) { return c.id === id; });
          if (career && career.quickBuildSkills) {
            DS.State.update('career.skills', career.quickBuildSkills.slice());
          } else {
            DS.State.update('career.skills', []);
          }
          DS.State.update('career.languages', []);
          DS.State.update('career.perk', career ? career.perk : null);
        }
        render(container);
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      },
      renderItem: function(item) {
        var c = careers.find(function(x) { return x.id === item.id; });
        var badges = [];
        if (c.renown) badges.push('Renown +' + c.renown);
        if (c.wealth) badges.push('Wealth +' + c.wealth);
        if (c.projectPoints) badges.push(c.projectPoints + ' Project Points');
        if (c.languages) badges.push(c.languages + (c.languages === 1 ? ' Language' : ' Languages'));
        return '<div class="card-title">' + DS.Renderer.esc(item.name) + '</div>' +
          '<div class="card-desc">' + DS.Renderer.esc(item.description) + '</div>' +
          (badges.length ? '<div class="text-sm text-primary mt-1">' + badges.join(' · ') + '</div>' : '');
      }
    });

    if (selectedId) {
      var career = careers.find(function(c) { return c.id === selectedId; });
      if (career) {
        showCareerSidebar(career, DS.State.getRef());
      }
    } else {
      if (DS.Sidebar) DS.Sidebar.clear();
    }
  }

  function showCareerSidebar(career, char) {
    var sidebarEl = document.getElementById('sidebar-content');
    if (!sidebarEl) return;
    var sidebarWrap = document.getElementById('wizard-sidebar');
    if (sidebarWrap) sidebarWrap.scrollTop = 0;

    var html = '<h4>' + DS.Renderer.esc(career.name) + '</h4>' +
      '<p class="text-dim">' + DS.Renderer.esc(career.description) + '</p>';

    // Grants
    var grants = [];
    if (career.renown) grants.push('Renown +' + career.renown);
    if (career.wealth) grants.push('Wealth +' + career.wealth);
    if (career.projectPoints) grants.push(career.projectPoints + ' Project Points');
    if (grants.length) {
      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Grants</div>' +
        '<div class="sidebar-value">' + grants.join(', ') + '</div>' +
      '</div>';
    }

    // Perk
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Perk</div>' +
      '<div class="sidebar-value">' + DS.Renderer.esc(career.perk) + ' (' + DS.Renderer.esc(career.perkType) + ')</div>' +
    '</div>';

    // Skills as chips
    var skills = char.career.skills || [];
    html += '<div class="sidebar-section">' +
      '<div class="sidebar-label">Skills</div>' +
      '<div class="choice-pills" style="margin-top:0.25rem">';
    if (skills.length) {
      skills.forEach(function(s) {
        html += '<span class="choice-pill selected">' + DS.Renderer.esc(s) + '</span>';
      });
    } else {
      html += '<span class="text-dim text-sm" style="font-style:italic">Auto-assigned on selection</span>';
    }
    html += '</div></div>';

    // Language dropdowns
    if (career.languages > 0) {
      var selected = char.career.languages || [];
      var available = DS.Data.Languages.filter(function(l) { return l !== 'Caelian'; });

      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Languages (' + selected.length + ' / ' + career.languages + ')</div>';

      for (var i = 0; i < career.languages; i++) {
        var current = selected[i] || '';
        html += '<select class="culture-skill-select career-lang-select" data-index="' + i + '" style="margin-bottom:0.35rem">';
        html += '<option value="">Choose a language\u2026</option>';
        available.forEach(function(l) {
          // Disable if already picked in another slot
          var usedElsewhere = selected.indexOf(l) >= 0 && selected[i] !== l;
          html += '<option value="' + DS.Renderer.esc(l) + '"' +
            (l === current ? ' selected' : '') +
            (usedElsewhere ? ' disabled' : '') +
            '>' + DS.Renderer.esc(l) + '</option>';
        });
        html += '</select>';
      }

      html += '</div>';
    }

    // Description, guiding questions, inciting incidents
    var info = DESC[career.id];
    if (info) {
      // Description
      html += '<div class="sidebar-section">' +
        '<div class="sidebar-label">Description</div>' +
        '<p class="text-sm" style="margin:0.25rem 0 0">' + DS.Renderer.esc(info.text) + '</p>' +
      '</div>';

      // Guiding questions
      if (info.questions && info.questions.length) {
        html += '<div class="sidebar-section">' +
          '<div class="sidebar-label">Guiding Questions</div>' +
          '<ul class="sidebar-list">';
        info.questions.forEach(function(q) {
          html += '<li>' + DS.Renderer.esc(q) + '</li>';
        });
        html += '</ul></div>';
      }

      // Inciting incidents table
      if (info.incidents && info.incidents.length) {
        html += '<div class="sidebar-section">' +
          '<div class="sidebar-label">Inciting Incidents</div>' +
          '<table class="sidebar-table"><thead><tr><th>d6</th><th>Incident</th></tr></thead><tbody>';
        info.incidents.forEach(function(inc) {
          html += '<tr><td>' + inc.roll + '</td><td><strong>' + DS.Renderer.esc(inc.name) + ':</strong> ' + DS.Renderer.esc(inc.text) + '</td></tr>';
        });
        html += '</tbody></table></div>';
      }
    }

    sidebarEl.innerHTML = html;

    // Wire language dropdowns
    sidebarEl.querySelectorAll('.career-lang-select').forEach(function(sel) {
      sel.addEventListener('change', function() {
        var idx = parseInt(sel.dataset.index);
        var langs = (DS.State.getRef().career.languages || []).slice();
        // Ensure array is right size
        while (langs.length < career.languages) langs.push('');
        langs[idx] = sel.value || '';
        // Remove empty trailing entries
        var cleaned = langs.filter(function(l) { return l; });
        DS.State.update('career.languages', cleaned);
        showCareerSidebar(career, DS.State.getRef());
        if (DS.Wizard.refreshNextButton) DS.Wizard.refreshNextButton();
      });
    });
  }

  function validate() {
    var char = DS.State.getRef();
    if (!char.career.id) return false;
    var career = DS.Data.Careers.find(function(c) { return c.id === char.career.id; });
    if (!career) return false;
    // Must have selected languages
    if (career.languages > 0) {
      var langs = (char.career.languages || []).filter(function(l) { return l; });
      if (langs.length < career.languages) return false;
    }
    return true;
  }

  return { render: render, validate: validate };
})();
