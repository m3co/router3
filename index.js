;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  function matchHash() {
    var containers = document.querySelectorAll(tagContent);
    for (var i = 0; i < containers.length; i++) {
      containers[i].hidden = true;
    }

    var hash = window.location.hash.slice(1);
    // nothing to unhide...
    if (!hash) {
      return;
    }

    var matched = document.querySelector(`${tagContent}[hash="${hash}"]`);
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
