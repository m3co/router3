;(_ => {
  'use strict';

  function matchHash() {
    var containers = document.querySelectorAll('router2-content');
    for (var i = 0; i < containers.length; i++) {
      containers[i].hidden = true;
    }

    var hash = window.location.hash.slice(1);
    // nothing to unhide...
    if (!hash) {
      return;
    }

    var matched = document.querySelector(`router2-content[hash="${hash}"]`);
    if (matched) {
      matched.hidden = false;
    } else {
      throw new Error(`hash "${hash}" does not match any content`);
    }
  }

  window.addEventListener('hashchange', (e) => {
    matchHash();
  });
  window.addEventListener('load', (e) => {
    matchHash();
  });

})();
