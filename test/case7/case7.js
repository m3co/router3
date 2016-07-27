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

  var async1 = async_test('Case 7: hash changed to content[hash="case(\\d+)"]');
  //var async2 = async_test('Case 7: hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  //var async3 = async_test('Case 7; hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"] in order to reset last state');

  async1.next = async1.step_func(_ => {
    window.location.hash = '';
    var content1 = document.querySelector('#case7-1');
    var order = [];
    var expected = '123';

    var check_show = async1.step_func((e) => {
      order.push(e.type);

      content1.removeEventListener(e.type, check_show);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, expected);
      assert_equals(e.detail.router, content1);

      //window.location.hash = '';
    });

    var check_hide = async1.step_func((e) => {
      order.push(e.type);

      content1.removeEventListener(e.type, check_hide);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, expected);
      assert_equals(e.detail.router, content1);
      assert_array_equals(order, ['show', 'hide']);

      document.body.removeChild(div);
      async1.done();
      rc.next();
    });

    content1.addEventListener('show', check_show);
    content1.addEventListener('hide', check_hide);
    window.location.hash = "case" + expected;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
