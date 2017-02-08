'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var classAsString = 'MaterialRouter3';
  var cssClass = 'mdl-router3';
  var selClass = '.' + cssClass;
  var slice = Array.prototype.slice;

  var lastMatch = [];

  /**
   * Class MaterialRouter3
   */

  var MaterialRouter3 = function () {

    /**
     * Class constructor for dropdown MDL component.
     * Implements {@link https://github.com/jasonmayes/mdl-component-design-pattern|MDL component design pattern}
     *
     * @param {HTMLElement} element - The element that will be upgraded.
     */
    function MaterialRouter3(element) {
      _classCallCheck(this, MaterialRouter3);

      this.element_ = element;

      this.init();
    }

    /**
     * Initialize element.
     *
     */


    _createClass(MaterialRouter3, [{
      key: 'init',
      value: function init() {
        this.element_.hidden = true;
      }
    }]);

    return MaterialRouter3;
  }();

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
    slice.call(e.target.querySelectorAll(selClass)).forEach(function (element) {
      return componentHandler.upgradeElement(element);
    });
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
    Promise.all(slice.call(document.querySelectorAll(selClass)).map(function (element) {
      new Promise(function (resolve) {
        if (element.querySelector('.mdl-fragment') || element.classList.contains('mdl-fragment')) {
          element.addEventListener('load', resolve_.bind(null, resolve));
        } else {
          resolve();
        }
      });
    })).then(function () {
      var match = slice.call(document.querySelectorAll(selClass)).map(function (element) {
        return route_(element, e && e.newURL ? e.newURL : window.location.href, lastMatch);
      }).find(function (result) {
        return result;
      });
      if (match) {
        stateRevert = false;
        lastMatch = match;
      } else {
        (function () {
          var newHash = window.location.hash;
          if (newHash !== '') {
            stateRevert = true;
            window.location.hash = e && e.oldURL ? e.oldURL.split('#')[1] : '';
            setTimeout(function () {
              throw new Error('Cannot navigate to ' + newHash.slice(1));
            });
          }
        })();
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
    var lastMatch = null;
    var newHash = newURL.split('#')[1] || '';
    var lastHash = newHash.split('/').reverse()[0];
    var match = lastHash.match(new RegExp(element.getAttribute('hash')));

    if (match && match[0] === lastHash && (match.length === 1 || !document.querySelector('[hash="' + lastHash + '"]'))) {
      (function () {
        var parents = [element];
        lastMatch = match_(newHash, parents, []);
        if (lastMatch !== newHash && element.getAttribute('hash') === '') {
          lastMatch = null;
        } else {
          parents.forEach(function (element) {
            return element && unhide_(element);
          });
          alreadyShown instanceof Array && alreadyShown.reduce(function (acc, curr) {
            curr && !parents.includes(curr) && acc.push(curr);
            return acc;
          }, []).reverse().forEach(function (item) {
            return hide_(item);
          });
          match = newHash.match(new RegExp(lastMatch));
          !match && (lastMatch = parents.forEach(function (element) {
            return element && hide_(element);
          }));
          match && !stateRevert && (lastMatch = parents) && dispatchShow_(element, match.slice(1).reduce(function (detail, hash, i) {
            detail['param' + (i + 1)] = hash;
            return detail;
          }, { router: element }));
        }
      })();
    } else {
      if (!(alreadyShown.find && alreadyShown.find(function (show) {
        return show === element;
      }))) {
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
       * Dispatch hide event if URL's fragment matches with a route
       * and router.hidden = true
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
    return true;
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
     * Dispatch show event if URL's fragment matches with a route
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
   * Unhide element and dispatch unhide event
   *
   * @param {HTMLElement} element - The element
   * @private
   */
  function unhide_(element) {
    if (element.hidden) {
      element.hidden = false;

      /**
       * Dispatch unhide even if URL's fragment matches with a route
       * and router.hidden = false
       *
       * @event MaterialRouter3#hide
       * @type {CustomEvent}
       * @property {HTMLElement} router - The router that dispatches
       *   this event
       */
      element.dispatchEvent(new CustomEvent('unhide', {
        detail: {
          router: element
        }
      }));
    }
    return true;
  }

  /**
   * Match to chain-hash
   *
   * @param {String} newHash - The new hash to navigate
   * @param {Array} parents - The array of pushed parents
   * @param {Array} hashes - The array of pushed hashes
   * @private
   */
  function match_(newHash, parents, hashes) {
    parents.push(parents[hashes.length].parentElement.closest(selClass));
    hashes.push(parents[hashes.length].getAttribute('hash'));

    if (parents[hashes.length]) {
      return match_(newHash, parents, hashes);
    } else {
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