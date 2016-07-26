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

  function matchHash(parent, hash) {
    var containers;
    var container;
    var _hash = hash || window.location.hash;

    if (!parent) {
      containers = document.querySelectorAll(`${tagContent}:not([hidden])`);
      for (var i = 0; i < containers.length; i++) {
        containers[i].hidden = true;
      }
      containers = flat_selection(document.querySelectorAll(`${tagContent}`), document);
    } else {
      containers = flat_selection(parent.querySelectorAll(`${tagContent}`), parent);
      if (containers.length === 0) {
        return;
      }
    }

    if (_hash[0] === '/' || _hash[0] === '#') {
      _hash = _hash.slice(1);
    }
    if (!_hash) {
      return;
    }

    // this selector selects the children items too... that's incorrect
    for (var i = 0; i < containers.length; i++) {
      container = containers[i];
      var search = container.getAttribute('hash');
      var matcher = new RegExp(`^${search}$|^${search}\/`);
      var match = matcher.test(_hash);

      if (match) {
        container.hidden = false;
        var params = _hash.match(matcher).filter((item, i) => {
          if (i === 0) {
            return false;
          }
          if (item) {
            return true;
          }
          return false;
        });
        params.forEach((item, i) => {
          container.setAttribute(`route-param${i + 1}`, item);
        });

        _hash = _hash.split(matcher)[1];
        if (_hash.length > 0) {
          matchHash(container, _hash);
        }
        return;
      }
    }

    throw new Error(`hash "${_hash}" does not match any content`);
  }

  window.addEventListener('hashchange', (e) => {
    matchHash();
  });
  window.addEventListener('load', (e) => {
    matchHash();
  });

})();
