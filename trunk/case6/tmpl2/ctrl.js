;(function() {
  'use strict';
  var router = document.querySelector('[src="/demo/case6/tmpl2/page.html"]');
  router.addEventListener('show', function (e) {
    console.log(e.detail);
    console.log('show location 2');
  });
  router.addEventListener('hide', function (e) {
    console.log(e.detail);
    console.log('hide location 2');
  });
})();
