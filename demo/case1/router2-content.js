;(_ => {
  'use strict';

  class Router2Content extends HTMLElement {
    createdCallback() {
      this.hidden = true; // by default
    }
  }

  window.addEventListener('hashchange', (e) => {
    var containers = document.querySelectorAll('router2-content');
    for (var i = 0; i < containers.length; i++) {
      containers[i].hidden = true;
    }

    var hash = window.location.hash.slice(1);
    var matched = document.querySelector(`router2-content[hash="${hash}"]`);
    if (matched) {
      matched.hidden = false;
    }
  });
  document.registerElement('router2-content', Router2Content);
})();
