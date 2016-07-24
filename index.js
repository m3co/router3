;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  function matchHash(parent, hash) {
    var containers;
    var container;
    var _hash = hash || window.location.hash;

    if (_hash[0] === '/' || _hash[0] === '#') {
      _hash = _hash.slice(1);
    }
    if (!_hash) {
      return;
    }

    if (!parent) {
      containers = document.querySelectorAll(`${tagContent}:not([hidden])`);
      for (var i = 0; i < containers.length; i++) {
        containers[i].hidden = true;
      }
      containers = document.querySelectorAll(`${tagContent}`);
    } else {
      containers = parent.querySelectorAll(`${tagContent}`);
      if (containers.length === 0) {
        return;
      }
    }

    // this selector selects the children items too... that's incorrect
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      var matcher = new RegExp(`^${container.getAttribute('hash')}`);
      var match = matcher.test(_hash);

      if (match) {
        container.hidden = false;
        matchHash(container, _hash.split(matcher)[1]);
        return;
      }
    }

    throw new Error(`hash "${_hash}" does not match any content`);
  }

  window.addEventListener('hashchange', (e) => {
    matchHash();
  });
  window.addEventListener('load', (e) => {
    matchHash();
  });

})();
