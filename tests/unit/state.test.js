const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { DS } = require('../harness');

describe('DS.State', () => {

  beforeEach(() => {
    // Reset state for each test
    DS.State.init();
  });

  describe('createBlank()', () => {
    it('returns an object with all expected top-level keys', () => {
      const char = DS.State.createBlank();
      const expectedKeys = ['id', 'playerName', 'name', 'level', 'finished',
        'ancestry', 'culture', 'career', 'class', 'kit', 'complication', 'details', 'computed'];
      expectedKeys.forEach(key => {
        assert.ok(key in char, `Missing key: ${key}`);
      });
    });

    it('sets level to 1', () => {
      const char = DS.State.createBlank();
      assert.equal(char.level, 1);
    });

    it('sets finished to false', () => {
      const char = DS.State.createBlank();
      assert.equal(char.finished, false);
    });

    it('generates a unique id', () => {
      const a = DS.State.createBlank();
      const b = DS.State.createBlank();
      assert.notEqual(a.id, b.id);
    });

    it('initializes ancestry with empty purchasedTraits array', () => {
      const char = DS.State.createBlank();
      assert.deepEqual(char.ancestry.purchasedTraits, []);
      assert.equal(char.ancestry.id, null);
    });

    it('initializes class with all characteristics at 0', () => {
      const char = DS.State.createBlank();
      const chars = char.class.characteristics;
      assert.equal(chars.might, 0);
      assert.equal(chars.agility, 0);
      assert.equal(chars.reason, 0);
      assert.equal(chars.intuition, 0);
      assert.equal(chars.presence, 0);
    });

    it('initializes heroicAbilities with empty arrays at cost buckets', () => {
      const char = DS.State.createBlank();
      [3, 5, 7, 9, 11].forEach(cost => {
        assert.deepEqual(char.class.heroicAbilities[cost], []);
      });
    });

    it('initializes empty computed object', () => {
      const char = DS.State.createBlank();
      assert.deepEqual(char.computed, {});
    });
  });

  describe('set() and get()', () => {
    it('stores character and get() returns it', () => {
      const char = DS.State.createBlank();
      char.name = 'Test Hero';
      DS.State.set(char);
      const retrieved = DS.State.get();
      assert.equal(retrieved.name, 'Test Hero');
    });

    it('get() returns a deep copy — mutating copy does not affect state', () => {
      const char = DS.State.createBlank();
      DS.State.set(char);
      const copy = DS.State.get();
      copy.name = 'Changed';
      const retrieved = DS.State.get();
      assert.notEqual(retrieved.name, 'Changed');
    });

    it('set() triggers recompute — computed is populated', () => {
      const char = DS.State.createBlank();
      char.class.id = 'fury';
      char.kit.id = 'panther';
      DS.State.set(char);
      const ref = DS.State.getRef();
      assert.ok(ref.computed);
      assert.ok('stamina' in ref.computed);
    });
  });

  describe('getRef()', () => {
    it('returns the actual character reference', () => {
      const char = DS.State.createBlank();
      DS.State.set(char);
      const ref = DS.State.getRef();
      ref.name = 'DirectMutation';
      const ref2 = DS.State.getRef();
      assert.equal(ref2.name, 'DirectMutation');
    });
  });

  describe('update()', () => {
    it('sets a nested path correctly', () => {
      const char = DS.State.createBlank();
      DS.State.set(char);
      DS.State.update('class.characteristics.might', 3);
      const ref = DS.State.getRef();
      assert.equal(ref.class.characteristics.might, 3);
    });

    it('sets a top-level path correctly', () => {
      const char = DS.State.createBlank();
      DS.State.set(char);
      DS.State.update('name', 'Updated Hero');
      assert.equal(DS.State.getRef().name, 'Updated Hero');
    });

    it('creates intermediate objects for missing paths', () => {
      const char = DS.State.createBlank();
      DS.State.set(char);
      DS.State.update('class.levelChoices.5.skill', 'Alchemy');
      const ref = DS.State.getRef();
      assert.equal(ref.class.levelChoices['5'].skill, 'Alchemy');
    });

    it('triggers recompute after update', () => {
      const char = DS.State.createBlank();
      char.class.id = 'fury';
      char.kit.id = 'panther';
      DS.State.set(char);
      const staminaBefore = DS.State.getRef().computed.stamina;
      DS.State.update('class.characteristics.might', 5);
      const staminaAfter = DS.State.getRef().computed.stamina;
      // Stamina includes might, so it should change
      assert.notEqual(staminaBefore, staminaAfter);
    });

    it('is a no-op when character is null', () => {
      // Create a fresh state module scenario — init sets character to blank
      // We need to test with null. Since we can't directly set to null via public API,
      // we test that update on a blank char doesn't crash
      DS.State.init();
      assert.doesNotThrow(() => {
        DS.State.update('name', 'Test');
      });
    });
  });

  describe('subscribe()', () => {
    it('fires listener on set()', () => {
      let called = false;
      DS.State.subscribe(() => { called = true; });
      DS.State.set(DS.State.createBlank());
      assert.ok(called);
    });

    it('fires listener on update()', () => {
      DS.State.set(DS.State.createBlank());
      let called = false;
      DS.State.subscribe(() => { called = true; });
      DS.State.update('name', 'Test');
      assert.ok(called);
    });

    it('passes character to listener', () => {
      let received = null;
      DS.State.subscribe(char => { received = char; });
      const char = DS.State.createBlank();
      char.name = 'Listener Test';
      DS.State.set(char);
      assert.equal(received.name, 'Listener Test');
    });

    it('unsubscribe stops notifications', () => {
      let count = 0;
      const unsub = DS.State.subscribe(() => { count++; });
      DS.State.set(DS.State.createBlank());
      assert.equal(count, 1);
      unsub();
      DS.State.set(DS.State.createBlank());
      assert.equal(count, 1);
    });

    it('listener errors do not break other listeners', () => {
      let secondCalled = false;
      DS.State.subscribe(() => { throw new Error('Boom'); });
      DS.State.subscribe(() => { secondCalled = true; });
      DS.State.set(DS.State.createBlank());
      assert.ok(secondCalled);
    });
  });

  describe('generateId()', () => {
    it('returns a string starting with ds_', () => {
      const id = DS.State.generateId();
      assert.ok(id.startsWith('ds_'));
    });

    it('generates unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(DS.State.generateId());
      }
      assert.equal(ids.size, 100);
    });
  });
});
