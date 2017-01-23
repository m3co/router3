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
        let hashes = [this.element_.getAttribute('hash')];
        let parents = [this.element_];

        parents.push(this.element_.parentElement.closest(selClass));
        if (parents[1]) {

          hashes.push(parents[1].getAttribute('hash'));
          parents.push(parents[1].parentElement.closest(selClass));

          if (parents[2]) {

            hashes.push(parents[2].getAttribute('hash'));
            parents.push(parents[2].parentElement.closest(selClass));

            if (parents[3]) {

              hashes.push(parents[3].getAttribute('hash'));

              if (newHash === hashes.slice(0, 4).reverse().join('/')) {
                parents.slice(0, 4).forEach(parent => parent.hidden = false);
              } else {
                parents[0].hidden = true;
              }

            } else {
              if (newHash === hashes.slice(0, 3).reverse().join('/')) {
                parents.slice(0, 3).forEach(parent => parent.hidden = false);
              } else {
                parents[0].hidden = true;
              }
            }
          } else {
            if (newHash === hashes.slice(0, 2).reverse().join('/')) {
              parents.slice(0, 2).forEach(parent => parent.hidden = false);
            } else {
              parents[0].hidden = true;
            }
          }
        } else {
          if (newHash === hashes.slice(0, 1).reverse().join('/')) {
            parents.slice(0, 1).forEach(parent => parent.hidden = false);
          } else {
            parents[0].hidden = true;
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
