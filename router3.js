'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var classAsString = 'MaterialRouter3';
  var cssClass = 'mdl-router3';
  var selClass = '.' + cssClass;

  var lastMatch = null;

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
        var _this = this;

        window.addEventListener('hashchange', function (e) {
          var newHash = e.newURL.split('#')[1];
          var lastHash = newHash.split('/').reverse()[0];
          var hash = new RegExp(_this.element_.getAttribute('hash'));
          var match = lastHash.match(hash);

          if (match && match[0] === lastHash) {
            lastMatch = route_(newHash, [_this.element_], []);
            match = newHash.match(new RegExp(lastMatch));
            var detail = { router: _this.element_ };
            for (var i = 1; i < match.length; i++) {
              detail['param' + i] = match[i];
            }

            _this.element_.dispatchEvent(new CustomEvent('show', {
              bubbles: true,
              detail: detail
            }));
          } else {
            _this.element_.hidden = true;
          }
        });
        this.element_.hidden = true;
      }
    }]);

    return MaterialRouter3;
  }();

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

    var hash = hashes.slice(0, hashes.length).reverse().join('/');
    if (parents[hashes.length]) {
      return route_(newHash, parents, hashes);
    } else {
      parents.slice(0, hashes.length).map(function (parent) {
        return parent.hidden = false;
      });
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

  window.addEventListener('load', function () {
    var lastMatch_ = void 0;
    window.addEventListener('hashchange', function (e) {
      var newHash = e.newURL.split('#')[1];
      if (newHash !== '') {
        if (lastMatch) {
          lastMatch_ = lastMatch;
          lastMatch = null;
        } else {
          window.location.hash = lastMatch_;
          throw new Error('Cannot navigate to ' + newHash);
        }
      }
    });
  });
})();