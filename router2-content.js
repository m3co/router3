;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  class Router2Content extends HTMLElement {
    createdCallback() {
      this.hidden = true; // by default
      this.TAG_NAME = tagContent;
    }
  }

  document.registerElement(tagContent, Router2Content);
})();
