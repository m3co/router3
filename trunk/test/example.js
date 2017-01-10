;(_ => {
  'use strict';

  // the goal here is
  // to organize the testing code with a "promise-flavored" style
  var async1 = async_test('test 1');
  var async2 = async_test('test 2');
  var async3 = async_test('test 3');
  var async4 = async_test('test 4');
  var async5 = async_test('test 5');
  var async6 = async_test('test 6');

  var tests = [];                     // 1)

  tests.push(async1.step_func(_ => {
    async1.step_timeout(_ => {
      console.log('1');
      async1.done();
    }, 500);
  }));

  tests.push(async2.step_func(_ => {
    async2.step_timeout(_ => {
      console.log('2');
      assert_true(false);   // intentionally I left this error
      async2.done();
    }, 500);
  }));

  tests.push(async3.step_func(_ => {
    async3.step_timeout(_ => {
      console.log('3');
      async3.done();
    }, 500);
  }));

  tests.push(async4.step_func(_ => {
    async4.step_timeout(_ => {
      console.log('4');
      async4.done();
    }, 500);
  }));

  tests.push(async5.step_func(_ => {
    async5.step_timeout(_ => {
      console.log('5');
      async5.done();
    }, 500);
  }));

  tests.push(async6.step_func(_ => {
    async6.step_timeout(_ => {
      console.log('6');
      async6.done();
    }, 500);
  }));

  // In order to arrange a sequential testing of
  // async tests I want to use
  //   1) a global array called tests  * see above
  //   2) a callback that fires the test under any circumstances
  //   3) an internal function that queues the next test to launch
  //   4) a call that fires the queue
  add_result_callback(() => {         // 2)
    call_next_test();
  });
  function call_next_test() {         // 3)
    if (tests.length > 0) {
      var next = tests.shift();
      next();
    }
  };
  call_next_test();                   // 4)
  // This construction is enough to implement within all the tests

})();
