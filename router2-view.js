;(_ => {
  'use strict';

  class Router2View extends HTMLElement {
    createdCallback() {
      var targetId = this.getAttribute('for'),
          target;
      if (targetId) {
        target = document.querySelector(`router2-content#${targetId}`);
      }
      if (target) {
        this.appendChild(target);
      }
    }
  }

  document.registerElement('router2-view', Router2View);
})();
