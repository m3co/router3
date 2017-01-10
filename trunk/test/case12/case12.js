;((rc) => {
  'use strict';
  var tagContent = 'router3';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} id="case12-default" hash="" hidden>
      The default content
    </${tagContent}>

    <${tagContent} id="case12-1-default" hash="case12-1" hidden>
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

  var async1 = async_test('Case 12: default show/fire events for #case12-default');
  var async2 = async_test('Case 12: default show/fire events for #case12-1-default');

  rc.push(async1.step_func(_ => {
    document.body.appendChild(div);

    var hash1 = "case12-2";
    var hash2 = "case12-1";
    var defaultHash = "";
    var content1 = document.querySelector(`${tagContent}[hash="${hash1}"]`);
    var content2 = document.querySelector(`${tagContent}[hash="${hash2}"]`);
    var defaultContent = document.querySelector(`${tagContent}#case12-default`);

    var check_default = async1.step_func(e => {
      assert_false(defaultContent.hidden);

      window.location.hash = hash2;
    });

    var check_default_hide = async1.step_func(e => {
      assert_true(defaultContent.hidden);

      // clean the test
      document.body.removeChild(div);
      window.location.hash = '';
      async1.done();
    });

    var check_hash = async1.step_func((e) => {
      content1.removeEventListener('show', check_hash);

      defaultContent.addEventListener('show', check_default);
      defaultContent.addEventListener('hide', check_default_hide);

      window.location.hash = defaultHash;
    });

    content1.addEventListener('show', check_hash);
    window.location.hash = hash1;
  }));

  rc.push(async2.step_func(_ => {
    document.body.appendChild(div);

    var hash1 = "case12-12";
    var hash2 = "case12-11";
    var defaultHash = "case12-1";
    var content1 = document.querySelector(`${tagContent}[hash="${hash1}"]`);
    var content2 = document.querySelector(`${tagContent}[hash="${hash2}"]`);
    var defaultContent2 = document.querySelector(`${tagContent}#case12-1-default`);
    var defaultContent1 = document.querySelector(`${tagContent}#case12-default`);

    var check_default2 = async2.step_func(e => {
      assert_true(defaultContent1.hidden);
      assert_false(defaultContent2.hidden);

      window.location.hash = 'case12-1/' + hash2;
    });

    var check_default_hide2 = async2.step_func(e => {
      assert_true(defaultContent1.hidden);
      assert_true(defaultContent2.hidden);

      async2.done();
      // clean the test
      document.body.removeChild(div);
      window.location.hash = '';
    });

    var check_default1 = async2.step_func(e => {
      assert_unreached();
    });

    var check_default_hide1 = async2.step_func(e => {
      assert_unreached();
    });

    var check_hash = async2.step_func((e) => {
      content1.removeEventListener('show', check_hash);

      defaultContent1.addEventListener('show', check_default1);
      defaultContent1.addEventListener('hide', check_default_hide1);

      defaultContent2.addEventListener('show', check_default2);
      defaultContent2.addEventListener('hide', check_default_hide2);

      window.location.hash = defaultHash;
    });

    content1.addEventListener('show', check_hash);
    window.location.hash = 'case12-1/' + hash1;
  }));

})(window.routeCases);
