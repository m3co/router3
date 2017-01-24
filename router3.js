'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var classAsString = 'MaterialRouter3';
  var cssClass = 'mdl-router3';
  var selClass = '.' + cssClass;

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
          var hashes = [];
          var parents = [_this.element_];

          route(newHash, parents, hashes);
        });
        this.element_.hidden = true;
      }
    }]);

    return MaterialRouter3;
  }();

  function route(newHash, parents, hashes) {

    parents.push(parents[hashes.length].parentElement.closest(selClass));
    hashes.push(parents[hashes.length].getAttribute('hash'));

    if (parents[hashes.length]) {

      parents.push(parents[hashes.length].parentElement.closest(selClass));
      hashes.push(parents[hashes.length].getAttribute('hash'));

      if (parents[hashes.length]) {

        parents.push(parents[hashes.length].parentElement.closest(selClass));
        hashes.push(parents[hashes.length].getAttribute('hash'));

        if (parents[hashes.length]) {

          hashes.push(parents[hashes.length].getAttribute('hash'));

          if (newHash === hashes.slice(0, hashes.length).reverse().join('/')) {
            parents.slice(0, hashes.length).forEach(function (parent) {
              return parent.hidden = false;
            });
          } else {
            parents[0].hidden = true;
          }
        } else {
          if (newHash === hashes.slice(0, hashes.length).reverse().join('/')) {
            parents.slice(0, hashes.length).forEach(function (parent) {
              return parent.hidden = false;
            });
          } else {
            parents[0].hidden = true;
          }
        }
      } else {
        if (newHash === hashes.slice(0, hashes.length).reverse().join('/')) {
          parents.slice(0, hashes.length).forEach(function (parent) {
            return parent.hidden = false;
          });
        } else {
          parents[0].hidden = true;
        }
      }
    } else {
      if (newHash === hashes.slice(0, hashes.length).reverse().join('/')) {
        parents.slice(0, hashes.length).forEach(function (parent) {
          return parent.hidden = false;
        });
      } else {
        parents[0].hidden = true;
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