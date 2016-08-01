;((rc) => {
  'use strict';
  var tagContent = 'router3';

  var div = document.createElement('div');
  div.innerHTML = `
    <button>Test</button>
    <${tagContent} hash="a-hash-template" hidden>
      The content to render
    </${tagContent}>

    <${tagContent} hash="another-hash-template" hidden>
      This is another hash
    </${tagContent}>
  `;
  var script1 = document.createElement('script');
  script1.text = `
    document.querySelector('button').addEventListener('click', (e) => {
      location.hash = "myHash";
    });
  `;
  div.appendChild(script1);

  var async1 = async_test('Case 1: hash changed to content[hash="a-hash-template"]');
  var async2 = async_test('Case 1: hash changed to content[hash="another-hash-template"]');
  var async3 = async_test('Case 1: click over button leads to unmatching route');
  var async4 = async_test('Case 1: reset to the window.location.hash="" state at case 1');

  async1.next = async1.step_func(_ => {
    var hash = "a-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);

    var check_hash = async1.step_func((e) => {
      assert_false(content.hidden);
      //assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

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

    var check_hash = async2.step_func((e) => {
      assert_false(content.hidden);
      //assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      async2.done();
      async3.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;

  });

  async3.next = async3.step_func(_ => {
    var hash = "myHash";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_equals(content, null);

    var check_error = async3.step_func((message) => {
      // clean the test
      assert_true(message.indexOf(`hash "${hash}" does not match any content`) > 0);
      window.location.hash = '';

      async3.done();
      async4.next();
    });

    onerror = check_error;
    document.querySelector('button').dispatchEvent(new Event('click'));
  });

  async4.next = async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      async4.done();
      rc.next();
      document.body.removeChild(div);
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = '';
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
