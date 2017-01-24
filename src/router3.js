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
        let hashes = [];
        let parents = [this.element_];

        this.route_(newHash, parents, hashes);
      });
      this.element_.hidden = true;
    }

    /**
     * Route/Navigate to chain-hash
     *
     * @param {String} newHash - The new hash to navigate
     * @param {Array} parents - The array of pushed parents
     * @param {Array} hashes - The array of pushed hashes
     * @private
     */
    route_(newHash, parents, hashes) {
      parents.push(parents[hashes.length].parentElement.closest(selClass));
      hashes.push(parents[hashes.length].getAttribute('hash'));

      if (parents[hashes.length]) {
        this.route_(newHash, parents, hashes);
      } else {
        if (newHash === hashes.slice(0, hashes.length).reverse().join('/')) {
          parents.slice(0, hashes.length).forEach(parent => parent.hidden = false);
        } else {
          parents[0].hidden = true;
        }
      }
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
