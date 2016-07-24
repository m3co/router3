;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  function matchHash() {
    var containers = document.querySelectorAll(`${tagContent}:not([hidden])`);
    var container;
    for (var i = 0; i < containers.length; i++) {
      containers[i].hidden = true;
    }

    var hash = window.location.hash.slice(1);
    // nothing to unhide...
    if (!hash) {
      return;
    }

    // this selector selects the children items too... that's incorrect
    var containers = document.querySelectorAll(`${tagContent}`);
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      var matcher = new RegExp(`^${container.getAttribute('hash')}`);
      var match = matcher.test(hash);

      if (match) {
        container.hidden = false;
        return;
      }
    }

    throw new Error(`hash "${hash}" does not match any content`);
  }

  window.addEventListener('hashchange', (e) => {
    matchHash();
  });
  window.addEventListener('load', (e) => {
    matchHash();
  });

})();
