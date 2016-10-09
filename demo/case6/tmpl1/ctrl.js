;(function() {
  'use strict';
  var router = document.querySelector('[src="/demo/case6/tmpl1/page.html"]');
  router.addEventListener('show', function (e) {
    console.log(e.detail);
    console.log('show location 1');
  });
  router.addEventListener('hide', function (e) {
    console.log(e.detail);
    console.log('hide location 1');
  });
})();
