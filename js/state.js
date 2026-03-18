// DS.State - Central character state with observable updates

DS.State = (function() {
  var listeners = [];
  var character = null;

  function createBlank() {
    return {
      id: generateId(),
      playerName: '',
      name: '',
      level: 1,
      finished: false,
      ancestry: { id: null, purchasedTraits: [], specialChoices: {} },
      culture: { environment: null, organization: null, upbringing: null, skills: {}, language: null },
      career: { id: null, skills: [], languages: [], perk: null, incitingIncident: null },
      class: {
        id: null, subclass: null,
        characteristicArray: null,
        characteristics: { might: 0, agility: 0, reason: 0, intuition: 0, presence: 0 },
        skills: [],
        signatureAbilities: [],
        heroicAbilities: { 3: [], 5: [], 7: [], 9: [], 11: [] },
        features: [],
        levelChoices: {}
      },
      kit: { id: null },
      complication: { id: null },
      details: { heroName: '', pronouns: '', appearance: '', personality: '', backstory: '', portrait: '' },
      computed: {}
    };
  }

  function generateId() {
    return 'ds_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
  }

  function get() {
    return JSON.parse(JSON.stringify(character));
  }

  function getRef() {
    return character;
  }

  function set(newChar) {
    character = newChar;
    recompute();
    notify();
  }

  function update(path, value) {
    if (!character) return;
    var parts = path.split('.');
    var obj = character;
    for (var i = 0; i < parts.length - 1; i++) {
      if (obj[parts[i]] === undefined) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
    recompute();
    notify();
  }

  function recompute() {
    if (!character) return;
    character.computed = DS.Calculator.compute(character);
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      listeners = listeners.filter(function(l) { return l !== fn; });
    };
  }

  function notify() {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](character); } catch(e) { console.error('State listener error:', e); }
    }
  }

  function init() {
    character = createBlank();
  }

  return {
    createBlank: createBlank,
    get: get,
    getRef: getRef,
    set: set,
    update: update,
    subscribe: subscribe,
    init: init,
    generateId: generateId
  };
})();
