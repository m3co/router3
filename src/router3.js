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
        let hash = new RegExp(this.element_.getAttribute('hash'));
        let match = lastHash.match(hash);

        if ((match) && (match[0] === lastHash)) {
          lastMatch = route_(newHash, [this.element_], []);
          match = newHash.match(new RegExp(lastMatch));
          let detail = { router: this.element_ };
          for (let i = 1; i < match.length; i++) {
            detail[`param${i}`] = match[i];
          }

          this.element_.dispatchEvent(new CustomEvent('show', {
            bubbles: true,
            detail: detail
          }));
        } else {
          this.element_.hidden = true;
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
          window.location.hash = lastMatch_;
          throw new Error(`Cannot navigate to ${newHash}`);
        }
      }
    });
  });
})();
