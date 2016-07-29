;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  function flat_selection(containers, parent) {
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

    containers = document.querySelectorAll(`${tagContent}:not([hidden])`);
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

      __params.router = container;
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
      containers = flat_selection(document.querySelectorAll(`${tagContent}`), document);
    } else {
      containers = flat_selection(parent.querySelectorAll(`${tagContent}`), parent);
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
      var matcher = new RegExp(`^${search}$|^${search}\/`);
      var match = matcher.test(_hash);

      if (match) {
        container.hidden = false;
        var __params = {};
        var next_hash = _hash.split(matcher);
        _params.forEach((item, i) => {
          container.setAttribute(`route-param${i + 1}`, item);
          __params[`param${i + 1}`] = item;
        });
        _hash.match(matcher).forEach((item, i) => {
          if (i > 0 && item) {
            _params.push(item);
            __params[`param${_params.length}`] = item;
            container.setAttribute(`route-param${_params.length}`, item);
          }
        });

        __params.router = container;
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

    throw new Error(`hash "${_hash}" does not match any content`);
  }

  window.addEventListener('hashchange', (e) => {
    hideAll();
    matchHash();
  });
  window.addEventListener('load', (e) => {
    var containers = document.querySelectorAll(`${tagContent}:not([hidden])`);
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
