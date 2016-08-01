;(_ => {
  'use strict';
  var router = document.currentScript.parentNode;
  router.addEventListener('show', e => {
    console.log(e.detail);
    console.log('show location 1');
  });
  router.addEventListener('hide', e => {
    console.log(e.detail);
    console.log('hide location 1');
  });
})();
