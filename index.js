;(function() {
  'use strict';
  var tagContent = 'router2-content';
  var tagSrc = 'router2-src';

  function pseudoImportHTML(element, url) {
    return fetch(src).then(response => {
      return response.text();
    }).then(text => {
      element.innerHTML = text;

      var scripts = element.querySelectorAll('script');
      var i, l = scripts.length;
      for (var i = 0; i < scripts.length; i++) {
        var old_script = scripts[i];
        var new_script = document.createElement('script');

        // clone text (content)
        if (old_script.src) {
          new_script.src = old_script.src;
        } else if (old_script.text) {
          new_script.text = old_script.text;
        }

        // clone all attributes
        for (var j = 0; j < old_script.attributes.length; j++) {
          new_script.setAttribute(old_script.attributes[j].name, old_script.attributes[j].value);
        }

        var parent = old_script.parentNode;
        parent.replaceChild(new_script, old_script);
      }

      return element;
    });
  }

  function updateAll() {
    var containers = document.querySelector(tagContent);
    console.log(containers);
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

  function hideAll() {
    var containers;
    var _params = [];
    var __params = {};

    containers = document.querySelectorAll(tagContent + ':not([hidden])');
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var attrs = container.attributes;
      container.hidden = true;

      for (var j = 0; j < attrs.length; j++) {
        if (/route-param\d+/.test(attrs[j].name)) {
          __params[attrs[j].name.slice(6)] = attrs[j].value;
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
      return;
    }

    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      var search = container.getAttribute('hash');
      var matcher = new RegExp('^' + search + '$|^' + search + '\/');
      var match = matcher.test(_hash);

      if (match) {
        container.hidden = false;
        var __params = {};
        var next_hash = _hash.split(matcher);
        _params.forEach(function(item, i) {
          container.setAttribute('route-param' + (i + 1), item);
          __params['param' + (i + 1)] = item;
        });
        _hash.match(matcher).forEach(function(item, i) {
          if (i > 0 && item) {
            _params.push(item);
            __params['param' + _params.length] = item;
            container.setAttribute('route-param' + _params.length, item);
          }
        });

        _hash = next_hash[next_hash.length - 1];
        if (_hash.length > 0) {
          matchHash(container, _hash, _params);
        } else {
          container.dispatchEvent(new CustomEvent('show', {
            detail: __params,
            bubbles: true
          }));
        }
        return;
      }
    }

    throw new Error('hash "' + _hash + '" does not match any content');
  }

  window.addEventListener('hashchange', function(e) {
    hideAll();
    matchHash();
  });
  window.addEventListener('load', function(e) {
    var containers = document.querySelectorAll(tagContent + ':not([hidden])');
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var attrs = container.attributes;
      container.hidden = true;

      for (var j = 0; j < attrs.length; j++) {
        if (/route-param\d+/.test(attrs[j].name)) {
          attrs.removeNamedItem(attrs[j].name);
          j--;
        }
      }
    }

    matchHash();
  });

})();
