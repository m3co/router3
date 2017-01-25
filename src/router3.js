(() => {
  'use strict';

  const classAsString = 'MaterialRouter3';
  const cssClass = 'mdl-router3';
  const selClass = `.${cssClass}`;

  let lastMatch = null;

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
        let lastHash = newHash.split('/').reverse()[0];
        let match = lastHash
          .match(
            new RegExp(this.element_.getAttribute('hash'))
          );

        if ((match) && (match[0] === lastHash)) {
          lastMatch = route_(newHash, [this.element_], []);
          let detail = {router: this.element_};
          newHash.match(new RegExp(lastMatch))
            .slice(1)
            .forEach((hash, i) => {
            detail[`param${i + 1}`] = hash;
          });

          /**
           * Dispatch show even if URL's fragment matches with a route
           *
           * @event MaterialRouter3#show
           * @type {CustomEvent}
           * @property {HTMLElement} router - The router that dispatches
           *   this event
           * @property {String} param1
           * @property {String} param2
           * @property {String} ...
           * @property {String} paramN - The values extracted
           *   from the URL's fragment. These params go in order of appearance
           *   from left to right.
           */
          this.element_.dispatchEvent(new CustomEvent('show', {
            bubbles: true,
            detail: detail
          }));
        } else {
          this.element_.hidden = true;

          /**
           * Dispatch show even if URL's fragment matches with a route
           *
           * @event MaterialRouter3#hide
           * @type {CustomEvent}
           * @property {HTMLElement} router - The router that dispatches
           *   this event
           */
          // THIS EVENT MAY BE DISPATCHED A LOT OF TIMES...
          // WRITE TEST FOR NESTED ROUTERS...
          this.element_.dispatchEvent(new CustomEvent('hide', {
            detail: {
              router: this.element_
            }
          }));
        }
      });
      this.element_.hidden = true;
    }

  }

  /**
   * Route/Navigate to chain-hash
   *
   * @param {String} newHash - The new hash to navigate
   * @param {Array} parents - The array of pushed parents
   * @param {Array} hashes - The array of pushed hashes
   * @private
   */
  function route_(newHash, parents, hashes) {
    parents.push(parents[hashes.length].parentElement.closest(selClass));
    hashes.push(parents[hashes.length].getAttribute('hash'));

    let hash = hashes.slice(0, hashes.length).reverse().join('/');
    if (parents[hashes.length]) {
      return route_(newHash, parents, hashes);
    } else {
      parents.slice(0, hashes.length).map(parent => parent.hidden = false);
      return hash;
    }
    return null;
  }

  window[classAsString] = MaterialRouter3;

  componentHandler.register({
    constructor: MaterialRouter3,
    classAsString: classAsString,
    cssClass: cssClass,
    widget: true
  });

  window.addEventListener('load', () => {
    let lastMatch_;
    window.addEventListener('hashchange', (e) => {
      let newHash = e.newURL.split('#')[1];
      if (newHash !== '') {
        if (lastMatch) {
          lastMatch_ = lastMatch;
          lastMatch = null;
        } else {
          // prevent here dispatching twice the show event
          window.location.hash = lastMatch_;
          throw new Error(`Cannot navigate to ${newHash}`);
        }
      }
    });
  });
})();
