(() => {
  'use strict';

  const classAsString = 'MaterialRouter3';
  const cssClass = 'mdl-router3';
  const selClass = `.${cssClass}`;

  /**
   * Class MaterialRouter3
   */
  class MaterialRouter3 {

    /**
     * Class constructor for dropdown MDL component.
     * Implements {@link https://github.com/jasonmayes/mdl-component-design-pattern|MDL component design pattern}
     *
     * @param {HTMLElement} element - The element that will be upgraded.
     */
    constructor(element) {
      this.element_ = element;

      this.init();
    }

    /**
     * Initialize element.
     *
     */
    init() {
      let hash = this.element_.getAttribute('hash');
      window.addEventListener('hashchange', (e) => {
        let newHash = e.newURL.split('#')[1];
        var parent = this.element_.parentElement.closest(selClass);
        if (parent) {
          let parentHash = parent.getAttribute('hash');
          if (newHash === [parentHash, hash].join('/')) {
            parent.hidden = false;
            this.element_.hidden = false;
          }
        } else {
          if (newHash === hash) {
            this.element_.hidden = false;
          } else {
            this.element_.hidden = true;
          }
        }
      });
      this.element_.hidden = true;
    }

  }

  window[classAsString] = MaterialRouter3;

  componentHandler.register({
    constructor: MaterialRouter3,
    classAsString: classAsString,
    cssClass: cssClass,
    widget: true
  });
})();
