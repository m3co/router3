;((rc) => {
  'use strict';
  var tagContent = 'router3';
  var tagSrc = 'router3-src';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} hash="case8" src="/test/case8/case8-external.html">
    </${tagContent}>
  `;

  var async1 = async_test('Case 8: hash changed to content[hash="case8"] and imports from "case8-external.html"');
  var async2 = async_test('Case 8: repeat last test and see if case8-external.html has been fetched once');
  var async3 = async_test('Case 8: listen event "load" at content[hash="case8"]');

  rc.push(async1.step_func(_ => {
    document.body.appendChild(div);
    var hash = "case8";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);

    var check_hash = async1.step_func((e) => {
      assert_false(content.hidden);

      var src = content.querySelector(`${tagSrc}`);
      assert_true(src instanceof HTMLElement);
      assert_equals(src.textContent, 'This is an external content\n');

      window.location.hash = '';
      async1.done();
    });

    var check_load =  async3.step_func(_ => {
      content.removeEventListener('load', check_load);
      async3.done();
    });

    content.addEventListener('show', check_hash);
    content.addEventListener('load', check_load);
    window.location.hash = hash;
  }));

  rc.push(async2.step_func(_ => {
    var hash = "case8";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);

    var check_hash = async2.step_func((e) => {
      assert_false(content.hidden);

      var src = content.querySelector(`${tagSrc}`);
      assert_true(src instanceof HTMLElement);
      assert_equals(src.textContent, 'This is an external content\n');

      window.removeEventListener('hashchange', check_hash);
      document.body.removeChild(div);
      window.location.hash = '';

      async2.done();
    });

    content.addEventListener('show', check_hash);
    content.addEventListener('load', async2.step_func(_ => {
      assert_unreached();
    }));
    window.location.hash = hash;
  }));

})(window.routeCases);