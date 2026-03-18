// DS.Data.Skills - All skill groups and individual skills (from Chapter 9)
DS.Data = DS.Data || {};
DS.Data.Skills = {
  crafting: ['Alchemy', 'Architecture', 'Blacksmithing', 'Carpentry', 'Cooking', 'Fletching', 'Forgery', 'Jewelry', 'Mechanics', 'Tailoring'],
  exploration: ['Climb', 'Drive', 'Endurance', 'Gymnastics', 'Heal', 'Jump', 'Lift', 'Navigate', 'Ride', 'Swim'],
  interpersonal: ['Brag', 'Empathize', 'Flirt', 'Gamble', 'Handle Animals', 'Interrogate', 'Intimidate', 'Lead', 'Lie', 'Music', 'Perform', 'Persuade', 'Read Person'],
  intrigue: ['Alertness', 'Conceal Object', 'Disguise', 'Eavesdrop', 'Escape Artist', 'Hide', 'Pick Lock', 'Pick Pocket', 'Sabotage', 'Search', 'Sneak', 'Track'],
  lore: ['Criminal Underworld', 'Culture', 'History', 'Magic', 'Monsters', 'Nature', 'Psionics', 'Religion', 'Rumors', 'Society', 'Strategy', 'Timescape']
};

// Flat list of all skill names
DS.Data.AllSkills = [];
Object.keys(DS.Data.Skills).forEach(function(group) {
  DS.Data.Skills[group].forEach(function(skill) {
    if (DS.Data.AllSkills.indexOf(skill) === -1) {
      DS.Data.AllSkills.push(skill);
    }
  });
});
DS.Data.AllSkills.sort();
