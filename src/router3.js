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
      window.addEventListener('hashchange', (e) => {
        let newHash = e.newURL.split('#')[1];
        let hash = this.element_.getAttribute('hash');

        var parent1 = this.element_.parentElement.closest(selClass);
        if (parent1) {

          let parentHash1 = parent1.getAttribute('hash');

          var parent2 = parent1.parentElement.closest(selClass);
          if (parent2) {

            let parentHash2 = parent2.getAttribute('hash');

            var parent3 = parent2.parentElement.closest(selClass);
            if (parent3) {

              let parentHash3 = parent3.getAttribute('hash');
              if (newHash === [parentHash3, parentHash2, parentHash1, hash].join('/')) {
                parent3.hidden = false;
                parent2.hidden = false;
                parent1.hidden = false;
                this.element_.hidden = false;
              } else {
                this.element_.hidden = true;
              }

            } else {
              if (newHash === [parentHash2, parentHash1, hash].join('/')) {
                parent2.hidden = false;
                parent1.hidden = false;
                this.element_.hidden = false;
              } else {
                this.element_.hidden = true;
              }
            }
          } else {
            if (newHash === [parentHash1, hash].join('/')) {
              parent1.hidden = false;
              this.element_.hidden = false;
            } else {
              this.element_.hidden = true;
            }
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
