;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  function matchHash(parent, hash) {
    var containers;
    var container;
    var _hash = hash || window.location.hash;

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

    if (_hash[0] === '/' || _hash[0] === '#') {
      _hash = _hash.slice(1);
    }
    if (!_hash) {
      return;
    }


    // this selector selects the children items too... that's incorrect
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      if (!parent) {
        if (container.parentNode.TAG_NAME === tagContent) {
          continue;
        }
      }
      var search = container.getAttribute('hash');
      var matcher = new RegExp(`^${search}$|^${search}\/`);
      var match = matcher.test(_hash);

      if (match) {
        container.hidden = false;
        _hash = _hash.split(matcher)[1];
        if (_hash.length > 0) {
          matchHash(container, _hash);
        }
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
