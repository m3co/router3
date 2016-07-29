;((rc) => {
  'use strict';
  var tagContent = 'router2-content';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} id="case7-1" hash="case(\\d+)">
    Case 7 via RegExp
    <${tagContent} id="case7-11" hash="case(\\d+)">
      Nested param
      <${tagContent} id="case7-111" hash="case(\\w+)-(\\d+)">
        Very interesting test
      </${tagContent}>
    </${tagContent}>
  </${tagContent}>
  `;

  var async1 = async_test('Case 7: (show event) hash changed to content[hash="case(\\d+)"]');
  var async2 = async_test('Case 7: (hide event) hash changed to content[hash="case(\\d+)"]');
  var async3 = async_test('Case 7: (show/hide event) hash changed to content[hash="case(\d+)"]');
  //var async2 = async_test('Case 7: hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  //var async3 = async_test('Case 7; hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"] in order to reset last state');

  async1.next = async1.step_func(_ => {
    var content1 = document.querySelector('#case7-1');
    var param1 = '123';

    var check_show = async1.step_func((e) => {
      content1.removeEventListener(e.type, check_show);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.router, content1);

      window.location.hash = '';
      async1.done();
      async2.next();
    });

    content1.addEventListener('show', check_show);
    window.location.hash = `case${param1}`;
  });

  async2.next = async2.step_func(_ => {
    var content1 = document.querySelector('#case7-1');
    var param1 = '123';

    var check_hide = async2.step_func((e) => {
      content1.removeEventListener(e.type, check_hide);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.router, content1);

      window.location.hash = '';
      async2.done();
      async3.next();
    });

    content1.addEventListener('hide', check_hide);
    window.location.hash = `case${param1}`;
    setTimeout(async2.step_func(_ => {
      window.location.hash = '';
    }), 0);
  });

  async3.next = async3.step_func(_ => {
    var content1 = document.querySelector('#case7-1');
    var order = [];
    var param1 = '123';

    var check_show = async3.step_func((e) => {
      order.push('show');
      content1.removeEventListener(e.type, check_show);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.router, content1);
    });

    var check_hide = async3.step_func((e) => {
      order.push('hide');
      content1.removeEventListener(e.type, check_hide);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.router, content1);
      assert_array_equals(order, ['show', 'hide']);

      document.body.removeChild(div);
      async3.done();
      rc.next();
    });

    content1.addEventListener('hide', check_hide);
    content1.addEventListener('show', check_show);
    window.location.hash = `case${param1}`;
    setTimeout(async3.step_func(_ => {
      window.location.hash = '';
    }), 0);
  });

  /*
  async2.next = async2.step_func(_ => {
    window.location.hash = '';
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var order = [];
    var param1 = '678';
    var param2 = '432';

    var check_show = async2.step_func((e) => {
      e.preventDefault();
      order.push(e.type);

      content2.removeEventListener(e.type, check_show);
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);

      //assert_equals(e.detail.router, content2);

      //window.location.hash = '';
    });

    var check_hide = async2.step_func((e) => {
      e.preventDefault();
      order.push(e.type);

      content2.removeEventListener(e.type, check_hide);
      assert_true(content1.hidden);
      assert_true(content2.hidden);

      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);

      //assert_equals(e.detail.router, content2);
      assert_array_equals(order, ['show', 'hide']);

      async2.done();
      document.body.removeChild(div);
      rc.next();

    });

    var check_show_not_reach = async2.step_func((e) => {
      document.body.removeChild(div);
      rc.next();
      assert_unreached('Unreachable show listener as it is after a preventDefault()');
    });

    var check_hide_not_reach = async2.step_func((e) => {
      document.body.removeChild(div);
      rc.next();
      assert_unreached('Unreachable hide listener as it is after a preventDefault()');
    });

    content1.addEventListener('show', check_show_not_reach);
    //content1.addEventListener('hide', check_hide_not_reach);

    content2.addEventListener('show', check_show);
    //content2.addEventListener('hide', check_hide);
    window.location.hash = `case${param1}/case${param2}`;

  });
  */

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
