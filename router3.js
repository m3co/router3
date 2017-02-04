'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var classAsString = 'MaterialRouter3';
  var cssClass = 'mdl-router3';
  var selClass = '.' + cssClass;
  var slice = Array.prototype.slice;

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
      if (slice.call(document.querySelectorAll(selClass)).map(function (element) {
        return route_(element, e && e.newURL ? e.newURL : window.location.href);
      }).find(function (result) {
        return result;
      })) {
        stateRevert = false;
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
  function route_(element, newURL) {
    var lastMatch = null;
    var newHash = newURL.split('#')[1] || '';
    var lastHash = newHash.split('/').reverse()[0];
    var match = lastHash.match(new RegExp(element.getAttribute('hash')));

    if (match && match[0] === lastHash && (match.length === 1 || !document.querySelector('[hash="' + lastHash + '"]'))) {
      var _ret2 = function () {
        var parents = [element];
        lastMatch = show_(newHash, parents, []);
        match = newHash.match(new RegExp(lastMatch));
        if (match === null) {
          return {
            v: parents.forEach(function (element) {
              return element && hide_(element);
            })
          };
        }
        var detail = { router: element };
        match.slice(1).forEach(function (hash, i) {
          detail['param' + (i + 1)] = hash;
        });
        !stateRevert && dispatchShow_(element, detail);
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    } else {
      hide_(element);
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
      parents.slice(0, hashes.length).map(function (parent) {
        return parent.hidden = false;
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