(function (QUnit) {

  var _module = QUnit.module;

  QUnit.module = function (name, config) {

    (function addSetupOnce() {

      if (typeof config.setupOnce === 'function') {
        var _setupOnceRan = false;
        var _setup = typeof config.setup === 'function' ?
          config.setup : null;

        config.setup = function () {
          if (!_setupOnceRan) {
            config.setupOnce();
            _setupOnceRan = true;
          }

          if (_setup) {
            _setup.call(config);
          }
        };
      }
    }());

    (function addTeardownOnce() {

      function isLastTestInModule() {
        return QUnit.config.queue.length === 1;
      }

      if (typeof config.teardownOnce === 'function') {
        var _teardown = typeof config.teardown === 'function' ?
          config.teardown : null;

        config.teardown = function () {
          if (_teardown) {
            _teardown.call(config);
          }

          if (isLastTestInModule()) {
            config.teardownOnce();
          }
        };
      }
    }());

    _module.call(QUnit, name, config);
  };
}(QUnit));

