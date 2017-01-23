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
          var hash = _this.element_.getAttribute('hash');

          var parent1 = _this.element_.parentElement.closest(selClass);
          if (parent1) {

            var parentHash1 = parent1.getAttribute('hash');

            var parent2 = parent1.parentElement.closest(selClass);
            if (parent2) {

              var parentHash2 = parent2.getAttribute('hash');

              var parent3 = parent2.parentElement.closest(selClass);
              if (parent3) {

                var parentHash3 = parent3.getAttribute('hash');
                if (newHash === [parentHash3, parentHash2, parentHash1, hash].join('/')) {
                  parent3.hidden = false;
                  parent2.hidden = false;
                  parent1.hidden = false;
                  _this.element_.hidden = false;
                } else {
                  _this.element_.hidden = true;
                }
              } else {
                if (newHash === [parentHash2, parentHash1, hash].join('/')) {
                  parent2.hidden = false;
                  parent1.hidden = false;
                  _this.element_.hidden = false;
                } else {
                  _this.element_.hidden = true;
                }
              }
            } else {
              if (newHash === [parentHash1, hash].join('/')) {
                parent1.hidden = false;
                _this.element_.hidden = false;
              } else {
                _this.element_.hidden = true;
              }
            }
          } else {
            if (newHash === hash) {
              _this.element_.hidden = false;
            } else {
              _this.element_.hidden = true;
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