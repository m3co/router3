;(_ => {
  'use strict';

  class Router2Content extends HTMLElement {
    createdCallback() {
      this.hidden = true; // by default
    }
  }

  document.registerElement('router2-content', Router2Content);
})();
