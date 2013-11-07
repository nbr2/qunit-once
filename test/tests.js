(function teardownOnceTest() {
  var count = 0;

  QUnit.module('single teardownOnce', {
    teardownOnce: function () {
      console.assert(count === 1, 'count should be at 1', count);
    }
  });

  QUnit.test('first', 1, function (assert) {
    assert.equal(count, 0, 'counter is at 0');
    count += 1;
  });

  QUnit.test('second', 1, function (assert) {
    assert.equal(count, 1, 'counter is at 1');
  });
}());

(function teardownAndTeardownOnceTest() {
  var count = 0;

  QUnit.module('teardown and teardownOnce', {
    teardown: function () {
      console.assert(count === 1, 'count should be at 1', count);
      count = 0;
    },
    teardownOnce: function () {
      console.assert(count === 0, 'count should be at 0', count);
    }
  });

  QUnit.test('first', function (assert) {
    assert.equal(count, 0, 'counter is at 0');
    count += 1;
  });

  QUnit.test('second', function (assert) {
    assert.equal(count, 0, 'counter was reset to 0 by teardown');
    count += 1;
  });
}());

(function setupOnceTest() {
  var count = 0;

  QUnit.module('single setupOnce', {
    setupOnce: function () {
      console.assert(count === 0, 'count starts at 1', count);
      count = 100;
    }
  });

  QUnit.test('first', function (assert) {
    assert.equal(count, 100, 'counter was setup');
    count += 1;
  });

  QUnit.test('second', function (assert) {
    assert.equal(count, 101, 'counter is at 101');
  });
}());

(function setupOnceAndSetupTest() {
  var count = 0;

  QUnit.module('setupOnce and setup', {
    setupOnce: function () {
      console.assert(count === 0, 'count starts at 1', count);
      count = 100;
    },
    setup: function () {
      count += 10;
    }
  });

  QUnit.test('first', function (assert) {
    assert.equal(count, 110, 'counter was updated by setupOnce and setup');
    count += 1;
  });

  QUnit.test('second', function (assert) {
    assert.equal(count, 121, 'counter was updated by setup');
  });
}());

(function setupOnceAndTeardownOnce() {
  var count = 0;

  QUnit.module('setupOnce and teardownOnce', {
    setupOnce: function () {
      console.assert(count === 0, 'count starts at 1', count);
      count = 100;
    },
    teardownOnce: function () {
      console.assert(count === 102, 'wrong count in teardownOnce', count);
    }
  });

  QUnit.test('first', function (assert) {
    assert.equal(count, 100);
    count += 1;
  });

  QUnit.test('second', function (assert) {
    assert.equal(count, 101);
    count += 1;
  });
}());
