// DS.Data.Cultures - Culture options (environment, organization, upbringing)
DS.Data = DS.Data || {};
DS.Data.Cultures = {
  environments: [
    { id: 'nomadic', name: 'Nomadic', description: 'Your people travel constantly, never settling in one place.', skillGroups: ['exploration', 'interpersonal'], quickBuild: 'Navigate' },
    { id: 'rural', name: 'Rural', description: 'You grew up in a small settlement surrounded by farmland or wilderness.', skillGroups: ['crafting', 'lore'], quickBuild: 'Nature' },
    { id: 'secluded', name: 'Secluded', description: 'Your community is hidden away from the wider world.', skillGroups: ['interpersonal', 'lore'], quickBuild: 'Read Person' },
    { id: 'urban', name: 'Urban', description: 'You grew up in a bustling city or large town.', skillGroups: ['interpersonal', 'intrigue'], quickBuild: 'Alertness' },
    { id: 'wilderness', name: 'Wilderness', description: 'You grew up in the untamed wild, far from civilization.', skillGroups: ['crafting', 'exploration'], quickBuild: 'Endurance' }
  ],
  organizations: [
    { id: 'bureaucratic', name: 'Bureaucratic', description: 'An official hierarchy with laws and regulations.', skillGroups: ['interpersonal', 'intrigue'], quickBuild: 'Persuade' },
    { id: 'communal', name: 'Communal', description: 'Decisions are made collectively by the community.', skillGroups: ['crafting', 'exploration'], quickBuild: 'Jump' }
  ],
  upbringings: [
    { id: 'academic', name: 'Academic', description: 'You were raised in a scholarly environment.', skillGroups: ['lore'], quickBuild: 'History' },
    { id: 'creative', name: 'Creative', description: 'You were raised among artists and performers.', skillGroups: ['crafting'], specificSkills: ['Music', 'Perform'], quickBuild: 'Perform' },
    { id: 'labor', name: 'Labor', description: 'You were raised among workers and tradespeople.', skillGroups: ['exploration'], specificSkills: ['Blacksmithing', 'Handle Animals'], quickBuild: 'Lift' },
    { id: 'lawless', name: 'Lawless', description: 'You were raised outside the law.', skillGroups: ['intrigue'], quickBuild: 'Sneak' },
    { id: 'martial', name: 'Martial', description: 'You were raised among warriors.', skillGroups: [], specificSkills: ['Blacksmithing', 'Fletching', 'Climb', 'Endurance', 'Ride', 'Intimidate', 'Alertness', 'Track', 'Monsters', 'Strategy'], quickBuild: 'Intimidate' },
    { id: 'noble', name: 'Noble', description: 'You were raised among the elite.', skillGroups: ['interpersonal'], quickBuild: 'Lead' }
  ]
};
