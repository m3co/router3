;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';
  var tagSrc = 'router2-src';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} hash="case8" src="case8-external.html">
    </${tagContent}>
  `;

  var async1 = async_test('Case 8: hash changed to content[hash="case8"] and imports from "case8-external.html"');

  async1.next = async1.step_func(_ => {
    var hash = "case8";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);

    var check_hash = async1.step_func((e) => {
      assert_false(content.hidden);

      var src = content.querySelector(`${tagSrc}`);
      assert_true(src instanceof HTMLElement);
      assert_equals(src.textContent, 'This is an external content');

      // clean the test
      window.removeEventListener('hashchange', check_hash);
      document.body.removeChild(div);
      window.location.hash = '';

      async1.done();
      rc.next();
    });

    content.addEventListener('show', check_hash);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
