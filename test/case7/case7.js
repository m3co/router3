;((rc) => {
  'use strict';
  var tagContent = 'router3';

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
  var async4 = async_test('Case 7: (show event) hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  var async5 = async_test('Case 7: (show event) hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"]');
  var async6 = async_test('Case 7: (hide event) hash changed to content[hash="case(\\d+)/case(\\d+)"]');
  var async7 = async_test('Case 7: (hide event) hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"]');
  var async8 = async_test('Case 7: (show/hide event) hash changed to content[hash="case(\\d+)/case(\\d+)/case(\\w+)-(\\d+)"]');

  async1.next = async1.step_func(_ => {
    var content1 = document.querySelector('#case7-1');
    var param1 = '123';

    var check_show = async1.step_func((e) => {
      content1.removeEventListener(e.type, check_show);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);

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
    });

    var check_hide = async3.step_func((e) => {
      order.push('hide');
      content1.removeEventListener(e.type, check_hide);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
      assert_array_equals(order, ['show', 'hide']);

      async3.done();
      async4.next();
    });

    content1.addEventListener('hide', check_hide);
    content1.addEventListener('show', check_show);
    window.location.hash = `case${param1}`;
    setTimeout(async3.step_func(_ => {
      window.location.hash = '';
    }), 0);
  });

  async4.next = async4.step_func(_ => {
    var order = [];
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var param1 = '123';
    var param2 = '654';

    var check_show1 = async4.step_func((e) => {
      order.push('2');
      content1.removeEventListener(e.type, check_show1);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_show2 = async4.step_func((e) => {
      order.push('1');
      content2.removeEventListener(e.type, check_show2);
      assert_false(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    content1.addEventListener('show', check_show1);
    content2.addEventListener('show', check_show2);
    window.location.hash = `case${param1}/case${param2}`;

    setTimeout(async4.step_func(_ => {
      window.location.hash = '';
      async5.next(); // do you see this line? should I repeat this solution
                 // along to all other tests? I should...
      assert_array_equals(order, ['1', '2']);
      async4.done();
    }), 0);
  });

  async5.next = async5.step_func(_ => {
    var order = [];
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var content3 = document.querySelector('#case7-111');
    var param1 = '123';
    var param2 = '654';
    var param3 = 'abc';
    var param4 = '789';

    var check_show1 = async5.step_func((e) => {
      order.push('3');
      content1.removeEventListener(e.type, check_show1);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_show2 = async5.step_func((e) => {
      order.push('2');
      content2.removeEventListener(e.type, check_show2);
      assert_false(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    var check_show3 = async5.step_func((e) => {
      order.push('1');
      content3.removeEventListener(e.type, check_show3);
      assert_false(content3.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
      assert_equals(e.detail.param3, param3);
      assert_equals(e.detail.param4, param4);
    });

    content1.addEventListener('show', check_show1);
    content2.addEventListener('show', check_show2);
    content3.addEventListener('show', check_show3);
    window.location.hash = `case${param1}/case${param2}/case${param3}-${param4}`;

    setTimeout(async5.step_func(_ => {
      window.location.hash = '';
      async6.next(); // do you see this line? should I repeat this solution
                 // along to all other tests? I should...
      assert_array_equals(order, ['1', '2', '3']);
      async5.done();
    }), 0);
  });

  async6.next = async6.step_func(_ => {
    var order = [];
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var param1 = '123';
    var param2 = '654';

    var check_hide1 = async6.step_func((e) => {
      order.push('2');
      content1.removeEventListener(e.type, check_hide1);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_hide2 = async6.step_func((e) => {
      order.push('1');
      content2.removeEventListener(e.type, check_hide2);
      assert_true(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    content1.addEventListener('hide', check_hide1);
    content2.addEventListener('hide', check_hide2);
    window.location.hash = `case${param1}/case${param2}`;

    setTimeout(async6.step_func(_ => {
      window.location.hash = '';
    }), 0);
    setTimeout(async6.step_func(_ => {
      async7.next(); // do you see this line? should I repeat this solution
                 // along to all other tests? I should...
      assert_array_equals(order, ['1', '2']);
      async6.done();
    }), 0);
  });

  async7.next = async7.step_func(_ => {
    var order = [];
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var content3 = document.querySelector('#case7-111');
    var param1 = '123';
    var param2 = '654';
    var param3 = 'abc';
    var param4 = '789';

    var check_hide1 = async7.step_func((e) => {
      order.push('3');
      content1.removeEventListener(e.type, check_hide1);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_hide2 = async7.step_func((e) => {
      order.push('2');
      content2.removeEventListener(e.type, check_hide2);
      assert_true(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    var check_hide3 = async7.step_func((e) => {
      order.push('1');
      content3.removeEventListener(e.type, check_hide3);
      assert_true(content3.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
      assert_equals(e.detail.param3, param3);
      assert_equals(e.detail.param4, param4);
    });

    content1.addEventListener('hide', check_hide1);
    content2.addEventListener('hide', check_hide2);
    content3.addEventListener('hide', check_hide3);
    window.location.hash = `case${param1}/case${param2}/case${param3}-${param4}`;

    setTimeout(async7.step_func(_ => {
      window.location.hash = '';
    }), 0);
    setTimeout(async7.step_func(_ => {
      assert_array_equals(order, ['2', '3', '1']);
      async8.next(); // do you see this line? should I repeat this solution
                 // along to all other tests? I should...
      async7.done();
    }), 0);
  });

  async8.next = async8.step_func(_ => {
    var order = [];
    var content1 = document.querySelector('#case7-1');
    var content2 = document.querySelector('#case7-11');
    var content3 = document.querySelector('#case7-111');
    var param1 = '123';
    var param2 = '654';
    var param3 = 'abc';
    var param4 = '789';

    var check_show1 = async8.step_func((e) => {
      order.push('3s');
      content1.removeEventListener(e.type, check_show1);
      assert_false(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_show2 = async8.step_func((e) => {
      order.push('2s');
      content2.removeEventListener(e.type, check_show2);
      assert_false(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    var check_show3 = async8.step_func((e) => {
      order.push('1s');
      content3.removeEventListener(e.type, check_show3);
      assert_false(content3.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
      assert_equals(e.detail.param3, param3);
      assert_equals(e.detail.param4, param4);
    });

    var check_hide1 = async8.step_func((e) => {
      order.push('3h');
      content1.removeEventListener(e.type, check_hide1);
      assert_true(content1.hidden);
      assert_equals(e.detail.param1, param1);
    });

    var check_hide2 = async8.step_func((e) => {
      order.push('2h');
      content2.removeEventListener(e.type, check_hide2);
      assert_true(content2.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
    });

    var check_hide3 = async8.step_func((e) => {
      order.push('1h');
      content3.removeEventListener(e.type, check_hide3);
      assert_true(content3.hidden);
      assert_equals(e.detail.param1, param1);
      assert_equals(e.detail.param2, param2);
      assert_equals(e.detail.param3, param3);
      assert_equals(e.detail.param4, param4);
    });

    content1.addEventListener('show', check_show1);
    content2.addEventListener('show', check_show2);
    content3.addEventListener('show', check_show3);

    content1.addEventListener('hide', check_hide1);
    content2.addEventListener('hide', check_hide2);
    content3.addEventListener('hide', check_hide3);
    window.location.hash = `case${param1}/case${param2}/case${param3}-${param4}`;

    setTimeout(async8.step_func(_ => {
      window.location.hash = '';
    }), 0);
    setTimeout(async8.step_func(_ => {
      document.body.removeChild(div);
      rc.next(); // do you see this line? should I repeat this solution
                 // along to all other tests? I should...
      // RECONSIDER THE ORDER OF EXECUTION
      assert_array_equals(order, ['1h', '2h', '3h', '1s', '2s', '3s']);
      async8.done();
    }), 0);
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
