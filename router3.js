;(function() {
  'use strict';
  var tagContent = 'router3';
  var tagSrc = 'router3-src';
  var tagConfig = 'router3-config';

  var classShowAttribute = 'class-show';
  var classHideAttribute = 'class-hide';
  var specialHideAttribute = 'private-hidden';

  var currentClassShow = null;
  var currentClassHide = null;

  function updateAll() {
    var containers = document.querySelectorAll(tagContent);
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      if (!container.updatePromise && container.hasAttribute('src')) {
        var src = container.querySelector(tagSrc);
        if (!src) {
          src = document.createElement(tagSrc);
          container.appendChild(src);
        }
        var url = container.getAttribute('src');
        container.updatePromise = window
          .PseudoimportHTML
          .importHTML(container, url, src);
      }
    }
  }

  function flatSelection(containers, parent) {
    var flatten = [];
    var container;
    var not_inside_container;
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      not_inside_container = true;
      while (container) {
        container = container.parentNode;
        if (container === parent) {
          break;
        }
        if (container) {
          if (container.tagName === tagContent.toUpperCase()) {
            not_inside_container = false;
            break;
          }
        }
      }
      if (not_inside_container) {
        flatten.push(containers[i]);
      }
    }
    return flatten;
  }

  function prepareClasses(container, action) {
    if (!container) return;
    var classShow = container.hasAttribute(classShowAttribute) ?
                      container.getAttribute(classShowAttribute) :
                      null;
    var classHide = container.hasAttribute(classHideAttribute) ?
                      container.getAttribute(classHideAttribute) :
                      null;
    if (action === 'show') {
      if (classShow || classHide) {
        if (classHide) {
          container.classList.remove(classHide);
        } else if (currentClassHide) {
          container.classList.remove(currentClassHide);
        }
        if (classShow) {
          container.classList.add(classShow);
        } else if (currentClassShow) {
          container.classList.add(currentClassShow);
        }
      } else {
        if ((currentClassShow || currentClassHide) &&
            (classShow !== '') && (classHide !== '')) {
          if (currentClassShow) {
            container.classList.add(currentClassShow);
          }
          if (currentClassHide) {
            container.classList.remove(currentClassHide);
          }
        } else {
          container.hidden = false;
        }
      }
      container.removeAttribute(specialHideAttribute);
    } else if (action === 'hide') {
      if (classShow || classHide) {
        if (classHide) {
          container.classList.add(classHide);
        } else if (currentClassShow) {
          container.classList.add(currentClassHide);
        }
        if (classShow) {
          container.classList.remove(classShow);
        } else if (currentClassShow) {
          container.classList.remove(currentClassShow);
        }
      } else {
        if ((currentClassShow || currentClassHide) &&
            (classShow !== '') && (classHide !== '')) {
          if (currentClassShow) {
            container.classList.remove(currentClassShow);
          }
          if (currentClassHide) {
            container.classList.add(currentClassHide);
          }
        } else {
          container.hidden = true;
        }
      }
      container.setAttribute(specialHideAttribute, '');
    }
  }

  function hideAll() {
    var containers;
    var _params = [];
    var __params = {};

    containers = document.querySelectorAll(tagContent + '[hash=""]');
    for (var i = 0; i < containers.length; i++) {
      prepareClasses(container, 'show');
    }

    containers = document.querySelectorAll(tagContent + ':not([' + specialHideAttribute + '])');
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var attrs = container.attributes;
      prepareClasses(container, 'hide');

      for (var j = 0; j < attrs.length; j++) {
        if (/param\d+/.test(attrs[j].name)) {
          __params[attrs[j].name] = attrs[j].value;
          attrs.removeNamedItem(attrs[j].name);
          j--;
        }
      }
    }
    if (container instanceof HTMLElement) {
      container.dispatchEvent(new CustomEvent('hide', {
        detail: __params,
        bubbles: true
      }));
    }
  }

  function matchHash(parent, hash, params) {
    var _params = params || [];
    var containers;
    var container;
    var match;
    var _hash = hash || window.location.hash;

    if (!parent) {
      containers = flatSelection(document.querySelectorAll(tagContent), document);
    } else {
      containers = flatSelection(parent.querySelectorAll(tagContent), parent);
    }

    if (_hash[0] === '/' || _hash[0] === '#') {
      _hash = _hash.slice(1);
    }
    if (!_hash) {
      for (var i = 0; i < containers.length; i++) {
        container = containers[i];
        if (container.getAttribute('hash') === '') {
          prepareClasses(container, 'show');
          dispatchCustomEvent(container, _params);
        }
      }
      return;
    }

    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      var search = container.getAttribute('hash');
      var matcher = new RegExp('^' + search + '$|^' + search + '\/');
      match = matcher.test(_hash);

      if (match) {
        prepareClasses(container, 'show');

        var __params = {};
        var next_hash = _hash.split(matcher);
        _params.forEach(function(item, i) {
          container.setAttribute('param' + (i + 1), item);
          __params['param' + (i + 1)] = item;
        });
        _hash.match(matcher).forEach(function(item, i) {
          if (i > 0 && item) {
            _params.push(item);
            __params['param' + _params.length] = item;
            container.setAttribute('param' + _params.length, item);
          }
        });

        _hash = next_hash[next_hash.length - 1];
        if (_hash.length > 0) {
          matchHash(container, _hash, _params);
        } else {
          var defaults = flatSelection(container.querySelectorAll(tagContent + '[hash=""]'), container);
          for (var j = 0; j < defaults.length; j++) {
            prepareClasses(defaults[j], 'show');
          }

          if (container.updatePromise) {
            container.updatePromise.then(function() {
              dispatchCustomEvent(container, __params);
            })
          } else {
            dispatchCustomEvent(container, __params);
          }
        }
        break;
      }
    }

    if (!match) {
      throw new Error('hash "' + _hash + '" does not match any content');
    }
  }

  function dispatchCustomEvent(container, __params) {
    container.dispatchEvent(new CustomEvent('show', {
      detail: __params,
      bubbles: true
    }));
  }

  function prepareConfig() {
    var configs = document.querySelectorAll(tagConfig);
    var config = configs[0]; // here I want to check if there are more than
                             // one config in the same document
    if (config instanceof HTMLElement) {
      currentClassShow = config.hasAttribute(classShowAttribute) ?
                           config.getAttribute(classShowAttribute) :
                           null;
      currentClassHide = config.hasAttribute(classHideAttribute) ?
                           config.getAttribute(classHideAttribute) :
                           null;
    } else {
      currentClassShow = null;
      currentClassHide = null;
    }
  }

  window.addEventListener('hashchange', function(e) {
    prepareConfig();
    hideAll();
    updateAll();
    matchHash();
  });
  window.addEventListener('load', function(e) {
    prepareConfig();
    window.PseudoimportHTML.run(tagContent, tagSrc).then(function() {
      var containers = document.querySelectorAll(tagContent + ':not([' + specialHideAttribute + '])');
      for (var i = 0; i < containers.length; i++) {
        var container = containers[i];
        var attrs = container.attributes;
        prepareClasses(container, 'hide');

        for (var j = 0; j < attrs.length; j++) {
          if (/param\d+/.test(attrs[j].name)) {
            attrs.removeNamedItem(attrs[j].name);
            j--;
          }
        }
      }
      updateAll();
      matchHash();
    });
  });

})();
