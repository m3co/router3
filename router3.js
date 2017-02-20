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

  var lastMatch = [];
  var counterLastMatch = 0;
  var stateRevert = false;

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

      if (!this.element_.hasAttribute('hash')) {
        throw new Error('Hash attribute is not present');
      }

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
    if (counterLastMatch > 1) {
      counterLastMatch = 0;
      throw new Error('Cannot go back to last matched hash ' + e.oldURL);
    }
    // Look for all router3 elements in order
    Promise.all(slice.call(document.querySelectorAll(selClass)).map(function (element) {
      /**
       * link router3 with fragment
       * (This process should be decoupled...)
       */
      return new Promise(function (resolve) {
        var fragments = slice.call(element.querySelectorAll('.mdl-fragment'));
        if (element.classList.contains('mdl-fragment')) {
          // if element is a fragment, it will load everything
          // up to child element
          if (element.MaterialFragment) {
            element.MaterialFragment.loaded.then(function () {
              slice.call(element.querySelectorAll(selClass)).forEach(function (element) {
                return componentHandler.upgradeElement(element);
              });
              resolve();
            });
          } else {
            element.addEventListener('load', resolve_.bind(null, resolve));
          }
        } else if (fragments.length) {
          // if there's at least one child fragment, then load all fragments
          // and resolve their promises
          Promise.all(fragments.map(function (fragment) {
            return new Promise(function (resolve) {
              if (fragment.MaterialFragment) {
                fragment.MaterialFragment.loaded.then(function () {
                  slice.call(fragment.querySelectorAll(selClass)).forEach(function (element) {
                    return componentHandler.upgradeElement(element);
                  });
                  resolve();
                });
              } else {
                fragment.addEventListener('load', resolve_.bind(null, resolve));
              }
            });
          })).then(function () {
            resolve();
          });
        } else {
          // if element is not a fragment, neither contains any fragment
          // then just resolve it
          resolve();
        }
      });
    })).then(function () {
      // when everything was loaded...
      var match = slice.call(document.querySelectorAll(selClass)).map(function (element) {
        return route_(element, e && e.newURL ? e.newURL : window.location.href, lastMatch);
      }).find(function (result) {
        return result;
      });
      if (match) {
        stateRevert = false;
        lastMatch = match;
        counterLastMatch = 0;
      } else {
        (function () {
          var newHash = window.location.hash || '';
          if (newHash !== '') {
            stateRevert = true;
            counterLastMatch++;
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

    // if match...
    if (match && match[0] === lastHash && (match.length === 1 || !document.querySelector('[hash="' + lastHash + '"]'))) {
      var _ret2 = function () {
        var parents = [element];

        // match_ newHash pushing all matched elements to parents
        lastMatch = match_(newHash, parents, []);

        // if default route do not match
        if (lastMatch !== newHash && element.getAttribute('hash') === '') {
          lastMatch = null;
        } else {
          var hash = newHash.match(new RegExp(parents.reduce(function (acc, curr) {
            if (curr) {
              acc = curr.getAttribute('hash') + (acc ? '/' : '') + acc;
            }
            return acc;
          }, '')));
          if (!hash) {
            return {
              v: null
            };
          }
          // unhide all matched elements
          parents.forEach(function (element) {
            return element && unhide_(element);
          });

          // hide_ last elements. I mean, if go
          // from /page1/page2/page3
          // to   /page1/page2/page5
          // then hide only page3
          alreadyShown instanceof Array && alreadyShown.reduce(function (acc, curr) {
            curr && !parents.includes(curr) && acc.push(curr);
            return acc;
          }, []).reverse().forEach(function (item) {
            return hide_(item);
          });

          // update match
          match = newHash.match(new RegExp(lastMatch));

          // if no match, then lastMatch = undefined and hide current element
          !match && (lastMatch = parents.forEach(function (element) {
            return element && hide_(element);
          }));
          // if match, and no stateRevert then update lastMatch and dispatch show
          match && !stateRevert && (lastMatch = parents) && dispatchShow_(element, match.slice(1).reduce(function (detail, hash, i) {
            detail['param' + (i + 1)] = hash;
            return detail;
          }, { router: element }));
        }
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    } else {
      // do not hide elements unnecessarily
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

  if (!window[classAsString]) {
    window[classAsString] = MaterialRouter3;
    window.addEventListener('hashchange', hashchange_);
    window.addEventListener('load', hashchange_);

    componentHandler.register({
      constructor: MaterialRouter3,
      classAsString: classAsString,
      cssClass: cssClass,
      widget: true
    });
  }
})();