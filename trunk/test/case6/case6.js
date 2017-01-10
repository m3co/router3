;((rc) => {
  'use strict';
  var tagContent = 'router3';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} id="case6-2" hash="case62">
    Case 6. It is suposed that this will come before (\\d+)
  </${tagContent}>
  <${tagContent} id="case6-1" hash="case(\\d+)">
    Case 6 via RegExp
    <${tagContent} id="case6-11" hash="case(\\d+)">
      Nested param
      <${tagContent} id="case6-111" hash="case(\\w+)-(\\d+)">
        Very interesting test
        <${tagContent} id="case6-1111" hash="case(\\w+)">
          Really interesting
        </${tagContent}>
      </${tagContent}>
    </${tagContent}>
  </${tagContent}>
  `;

  var async1 = async_test('Case 6: hash changed to content[hash="case(\\d+)"]');
  var async2 = async_test('Case 6; hash changed to content[hash="case62"]');
  var async3 = async_test('Case 6: hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  var async4 = async_test('Case 6; hash changed to content[hash="case62"] in order to reset last state');
  var async5 = async_test('Case 6: hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)/case(\\w+)"]');

  rc.push(async1.step_func(_ => {
    document.body.appendChild(div);
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      assert_false(content1.hidden);
      assert_equals(content1.getAttribute('param1'), '6');

      window.location.hash = '';
      async1.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case6";
  }));

  rc.push(async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-2');
      assert_false(content1.hidden);

      window.location.hash = '';
      async2.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case62";
  }));

  rc.push(async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      var content2 = document.querySelector('#case6-11');
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      assert_equals(content1.getAttribute('param1'), '11');
      assert_equals(content2.getAttribute('param1'), '11');
      assert_equals(content2.getAttribute('param2'), '22');

      window.location.hash = '';
      async3.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case11/case22";
  }));

  rc.push(async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      var content2 = document.querySelector('#case6-11');
      var content3 = document.querySelector('#case6-2');
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);

      assert_equals(content1.getAttribute('param1'), null);
      assert_equals(content2.getAttribute('param1'), null);
      assert_equals(content2.getAttribute('param2'), null);

      window.location.hash = '';
      async4.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case62";
  }));

  rc.push(async5.step_func(_ => {
    var check_hash = async5.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      var content2 = document.querySelector('#case6-11');
      var content3 = document.querySelector('#case6-111');
      var content4 = document.querySelector('#case6-1111');
      assert_false(content1.hidden);
      assert_false(content2.hidden);
      assert_false(content3.hidden);
      assert_false(content4.hidden);

      assert_equals(content1.getAttribute('param1'), '555');

      assert_equals(content2.getAttribute('param1'), '555');
      assert_equals(content2.getAttribute('param2'), '666');

      assert_equals(content3.getAttribute('param1'), '555');
      assert_equals(content3.getAttribute('param2'), '666');
      assert_equals(content3.getAttribute('param3'), 'AAA');
      assert_equals(content3.getAttribute('param4'), '888');

      assert_equals(content4.getAttribute('param1'), '555');
      assert_equals(content4.getAttribute('param2'), '666');
      assert_equals(content4.getAttribute('param3'), 'AAA');
      assert_equals(content4.getAttribute('param4'), '888');
      assert_equals(content4.getAttribute('param5'), 'BBB');

      document.body.removeChild(div);
      window.location.hash = '';
      async5.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case555/case666/caseAAA-888/caseBBB";
  }));

})(window.routeCases);
