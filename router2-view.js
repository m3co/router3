;(_ => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  class Router2View extends HTMLElement {
    createdCallback() {
      var targetId = this.getAttribute('for'),
          target;
      if (targetId) {
        target = document.querySelector(`${tagContent}#${targetId}`);
      }
      if (target) {
        this.appendChild(target);
      }
      this.TAG_NAME = tagView;
    }
  }

  document.registerElement(`${tagView}`, Router2View);
})();
