;(_ => {
  'use strict';

  // the goal here is
  // to organize the testing code with a "promise-flavored" style
  var async1 = async_test('test 1');
  var async2 = async_test('test 2');
  var async3 = async_test('test 3');
  var async4 = async_test('test 4');
  var async5 = async_test('test 5');

  // enqueue the process
  async1.next = async1.step_func(_ => {
    setTimeout(_ => {
      console.log('async 1 done');
      async1.done();

      async2.next();
    }, 1000);
  });

  async2.next = async2.step_func(_ => {
    setTimeout(_ => {
      console.log('async 2 done');
      async2.done();

      async3.next();
    }, 1000);
  });

  async3.next = async3.step_func(_ => {
    setTimeout(_ => {
      console.log('async 3 done');
      async3.done();

      async4.next();
    }, 1000);
  });

  async4.next = async4.step_func(_ => {
    setTimeout(_ => {
      console.log('async 4 done');
      async4.done();

      async5.next();
    }, 1000);
  });

  async5.next = async5.step_func(_ => {
    setTimeout(_ => {
      console.log('async 5 done');
      async5.done();

    }, 1000);
  });

  // start the process
  async1.step(_ => {
    async1.next();

  });

})();
