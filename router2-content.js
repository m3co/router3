;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  class Router2Content extends HTMLElement {
    attachedCallback() {
      this.hidden = true; // by default
    }
    createdCallback() {
      this.TAG_NAME = tagContent;
    }
  }

  document.registerElement(tagContent, Router2Content);
})();
