;((rc) => {
  'use strict';
  var tagContent = 'router3';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} hash="" hidden>
      The default content
    </${tagContent}>

    <${tagContent} hash="case12-1" hidden>
      The content at case12-1
      <${tagContent} hash="" hidden>
        The default content at case12-1
      </${tagContent}>

      <${tagContent} hash="case12-11" hidden>
        The content at case12-11
      </${tagContent}>

      <${tagContent} hash="case12-12" hidden>
        The content at case12-12
      </${tagContent}>
    </${tagContent}>

    <${tagContent} hash="case12-2" hidden>
      The content at case12-2
    </${tagContent}>
  `;

  var async1 = async_test('Case 12: hash changed to content[hash="case12-1"]');

  rc.push(async1.step_func(_ => {

    // this line is a dirty add for all consecuent tests for this first case
    document.body.appendChild(div);

    var hash = "case12-1";
    var defaultHash = "";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    var defaultContent = document.querySelector(`${tagContent}[hash="${defaultHash}"]`);

    var check_default = async1.step_func((e) => {
      assert_true(content.hidden);
      assert_false(defaultContent.hidden);

      // clean the test
      document.body.removeChild(div);
      window.removeEventListener('hashchange', check_hash);
      window.location.hash = '';
      async1.done();
    });

    var check_hash = async1.step_func((e) => {
      defaultContent.addEventListener('show', check_default);
      assert_false(content.hidden);
      window.location.hash = defaultHash;
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  }));

})(window.routeCases);
