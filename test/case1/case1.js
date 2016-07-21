;(_ => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.querySelector('div#case1');
  test(_ => {
    assert_true(window.location.hash === '' || window.location.hash === '');
  }, 'The location starts with no hash');

  var async1 = async_test('hash changed for content[hash="a-hash-template"]');
  var async2 = async_test('hash changed for content[hash="another-hash-template"]');
  var async3 = async_test('click over href="#a-hash-template"');
  var async4 = async_test('click over href="#another-hash-tempate"');
  var async5 = async_test('click over button leads to unmatching route');

  async1.next = async1.step_func(_ => {
    var hash = "a-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);
    var hashAsync = async_test(`If change hash to "${hash}" then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      hashAsync.done();
      async1.done();
      async2.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  });

  async2.next = async2.step_func(_ => {
    var hash = "another-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);

    var hashAsync = async_test(`If change hash to "${hash}" then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      hashAsync.done();
      async2.done();
      async3.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;

  });

  async3.next = async3.step_func(_ => {
    var hash = "a-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);
    var hashAsync = async_test(`If click over a[href="${hash}"] then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      hashAsync.done();
      async3.done();
      async4.next();
    });

    window.addEventListener('hashchange', check_hash);
    document.querySelector(`a[href="#${hash}"]`).dispatchEvent(new Event('click'));
  });

  async4.next = async4.step_func(_ => {
    var hash = "another-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);

    var hashAsync = async_test(`If click over a[href="${hash}"] then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      hashAsync.done();
      async4.done();
      async5.next();
    });

    window.addEventListener('hashchange', check_hash);
    document.querySelector(`a[href="#${hash}"]`).dispatchEvent(new Event('click'));
  });

  async5.next = async5.step_func(_ => {
    var hash = "myHash";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_equals(content, null);

    var hashAsync = async_test(`If hash changes to an unmatching route throw an error`);

    var check_error = hashAsync.step_func((message) => {
      // clean the test
      assert_equals(message, `Uncaught Error: hash "${hash}" does not match any content`);
      window.location.hash = '';

      hashAsync.done();
      async5.done();
      document.body.removeChild(div);
    });

    onerror = check_error;
    document.querySelector('button').dispatchEvent(new Event('click'));
  });

  async1.step(_ => {
    async1.next();
  });

})();
