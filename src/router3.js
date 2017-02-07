(() => {
  'use strict';

  const classAsString = 'MaterialRouter3';
  const cssClass = 'mdl-router3';
  const selClass = `.${cssClass}`;
  const slice = Array.prototype.slice;

  var lastMatch = [];

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
      this.element_.hidden = true;
    }

  }

  var stateRevert = false;
  window.addEventListener('hashchange', hashchange_);
  window.addEventListener('load', hashchange_);

  /**
   * Resolve and upgrade any router element present in e.target
   *
   * @param {Function} resolve - The function to resolve the Promise.
   * @param {Event} e - The load event.
   * @private
   */
  function resolve_(resolve, e) {
    slice.call(e.target.querySelectorAll(selClass))
      .forEach(element => componentHandler.upgradeElement(element));
    e.target.removeEventListener('load', resolve_);
    resolve();
  }

  /**
   * Hash Change handler that also is executed when
   * load event has been dispatched
   *
   * @private
   */
  function hashchange_(e) {
    Promise.all(slice
      .call(document.querySelectorAll(selClass))
      .map(element => {
        new Promise(resolve => {
          if (element.querySelector('.mdl-fragment') ||
            element.classList.contains('mdl-fragment')) {
            element.addEventListener('load', resolve_.bind(null, resolve));
          } else {
            resolve();
          }
        });
      })
    ).then(() => {
      let match = slice
        .call(document.querySelectorAll(selClass))
        .map(element => route_(element,
            e && e.newURL ? e.newURL : window.location.href, lastMatch))
        .find(result => result);
      if (match) {
        stateRevert = false;
        lastMatch = match;
      } else {
        let newHash = window.location.hash;
        if (newHash !== '') {
          stateRevert = true;
          window.location.hash = e && e.oldURL ? e.oldURL.split('#')[1] : '';
          setTimeout(() => {
            throw new Error(`Cannot navigate to ${newHash.slice(1)}`);
          });
        }
      }
    });
  }

  /**
   * Route/Match process
   *
   * @param {HTMLElement} element - The element to match
   * @param {String} newURL - The URL to match against the element
   * @private
   */
  function route_(element, newURL, alreadyShown) {
    let lastMatch = null;
    let newHash = newURL.split('#')[1] || '';
    let lastHash = newHash.split('/').reverse()[0];
    let match = lastHash.match(
      new RegExp(element.getAttribute('hash')));

    if (match && match[0] === lastHash &&
      (match.length === 1 ||
      !document.querySelector(`[hash="${lastHash}"]`))) {
      let parents = [element];
      lastMatch = show_(newHash, parents, []);
      (alreadyShown instanceof Array) && alreadyShown.reduce((acc, curr) => {
        curr && !parents.includes(curr) && acc.push(curr);
        return acc;
      }, []).reverse().forEach(item => hide_(item));
      match = newHash.match(new RegExp(lastMatch));
      !match && (lastMatch = parents.forEach(
        element => element && hide_(element)));
      match && !stateRevert && (lastMatch = parents) &&
        dispatchShow_(element, match.slice(1)
        .reduce((detail, hash, i) => {
          detail[`param${i + 1}`] = hash;
          return detail;
        }, { router: element }));
    } else {
      if (!(alreadyShown.find &&
          alreadyShown.find(show => show === element))) {
        hide_(element);
      }
    }
    return lastMatch;
  }

  /**
   * Hide element and dispatch hide event
   *
   * @param {HTMLElement} element - The element
   * @private
   */
  function hide_(element) {
    if (!element.hidden) {
      element.hidden = true;

      /**
       * Dispatch show even if URL's fragment matches with a route
       *
       * @event MaterialRouter3#hide
       * @type {CustomEvent}
       * @property {HTMLElement} router - The router that dispatches
       *   this event
       */
      element.dispatchEvent(new CustomEvent('hide', {
        detail: {
          router: element
        }
      }));
    }
  }

  /**
   * Dispatch show event
   *
   * @param {HTMLElement} element - The element
   * @param {Object} detail - The extracted params
   * @private
   */
  function dispatchShow_(element, detail) {

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
    element.dispatchEvent(new CustomEvent('show', {
      bubbles: true,
      detail: detail
    }));
  }

  /**
   * Show/Navigate to chain-hash
   *
   * @param {String} newHash - The new hash to navigate
   * @param {Array} parents - The array of pushed parents
   * @param {Array} hashes - The array of pushed hashes
   * @private
   */
  function show_(newHash, parents, hashes) {
    parents.push(parents[hashes.length].parentElement.closest(selClass));
    hashes.push(parents[hashes.length].getAttribute('hash'));

    if (parents[hashes.length]) {
      return show_(newHash, parents, hashes);
    } else {
      parents.slice(0, hashes.length).map(parent => {
        if (parent.hidden) {
          parent.hidden = false;

          /**
           * Dispatch unhide event: FOR TEST PURPOSES
           *
           * @private
           */
          parent.dispatchEvent(new CustomEvent('unhide', {
            detail: {
              router: parent
            }
          }));
        }
      });
      return hashes.slice(0, hashes.length).reverse().join('/');
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
