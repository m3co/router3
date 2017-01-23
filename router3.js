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
          var hashes = [_this.element_.getAttribute('hash')];
          var parents = [_this.element_];

          parents.push(_this.element_.parentElement.closest(selClass));
          if (parents[1]) {

            hashes.push(parents[1].getAttribute('hash'));
            parents.push(parents[1].parentElement.closest(selClass));

            if (parents[2]) {

              hashes.push(parents[2].getAttribute('hash'));
              parents.push(parents[2].parentElement.closest(selClass));

              if (parents[3]) {

                hashes.push(parents[3].getAttribute('hash'));

                if (newHash === hashes.slice(0, 4).reverse().join('/')) {
                  parents.slice(0, 4).forEach(function (parent) {
                    return parent.hidden = false;
                  });
                } else {
                  parents[0].hidden = true;
                }
              } else {
                if (newHash === hashes.slice(0, 3).reverse().join('/')) {
                  parents.slice(0, 3).forEach(function (parent) {
                    return parent.hidden = false;
                  });
                } else {
                  parents[0].hidden = true;
                }
              }
            } else {
              if (newHash === hashes.slice(0, 2).reverse().join('/')) {
                parents.slice(0, 2).forEach(function (parent) {
                  return parent.hidden = false;
                });
              } else {
                parents[0].hidden = true;
              }
            }
          } else {
            if (newHash === hashes.slice(0, 1).reverse().join('/')) {
              parents.slice(0, 1).forEach(function (parent) {
                return parent.hidden = false;
              });
            } else {
              parents[0].hidden = true;
            }
          }
        });
        this.element_.hidden = true;
      }
    }]);

    return MaterialRouter3;
  }();

  window[classAsString] = MaterialRouter3;

  componentHandler.register({
    constructor: MaterialRouter3,
    classAsString: classAsString,
    cssClass: cssClass,
    widget: true
  });
})();