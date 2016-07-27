;((rc) => {
  'use strict';
  var tagContent = 'router2-content';

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
      </${tagContent}>
    </${tagContent}>
  </${tagContent}>
  `;

  var async1 = async_test('Case 6: hash changed to content[hash="case(\\d+)"]');
  var async2 = async_test('Case 6; hash changed to content[hash="case62"]');
  var async3 = async_test('Case 6: hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  var async4 = async_test('Case 6; hash changed to content[hash="case62"] in order to reset last state');
  //var async5 = async_test('Case 6: hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      assert_false(content1.hidden);
      assert_equals(content1.getAttribute('route-param1'), '6');

      async1.done();
      async2.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case6";
  });

  async2.next = async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-2');
      assert_false(content1.hidden);

      async2.done();
      async3.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case62";
  });

  async3.next = async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      var content2 = document.querySelector('#case6-11');
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      assert_equals(content1.getAttribute('route-param1'), '11');
      assert_equals(content2.getAttribute('route-param1'), '11');
      assert_equals(content2.getAttribute('route-param2'), '22');

      async3.done();
      async4.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case11/case22";
  });

  async4.next = async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      var content2 = document.querySelector('#case6-11');
      var content3 = document.querySelector('#case6-2');
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);

      assert_equals(content1.getAttribute('route-param1'), null);
      assert_equals(content2.getAttribute('route-param1'), null);
      assert_equals(content2.getAttribute('route-param2'), null);

      document.body.removeChild(div);
      async4.done();
      rc.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case62";
  });


  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
