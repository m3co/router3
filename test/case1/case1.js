;(_ => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
    <div id="case1">
      <a href="#">Reset</a>
      <a href="#a-hash-template">first case</a>
      <a href="#another-hash-template">second case</a>
      <button>Test</button>
      <router2-content id="first-id" hash="a-hash-template" hidden>
        The content to render
      </router2-content>

      <router2-content id="second-id" hash="another-hash-template" hidden>
        This is another hash
      </router2-content>

      <router2-view for="second-id">
      </router2-view>
    </div>
  `;
  var script1 = document.createElement('script');
  script1.text = `
        document.querySelector('button').addEventListener('click', (e) => {
          location.hash = "myHash";
        });
  `;
  div.appendChild(script1);
  document.body.appendChild(div);

  test(_ => {
    assert_true(window.location.hash === '' || window.location.hash === '');
  }, 'The location starts with no hash');

  var async1 = async_test('hash changed for content[hash="a-hash-template"]');
  var async2 = async_test('hash changed for content[hash="another-hash-template"]');
  var async5 = async_test('click over button leads to unmatching route');
  var async6 = async_test('reset to the window.location.hash="" state');

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
      async5.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;

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
      async6.next();
    });

    onerror = check_error;
    document.querySelector('button').dispatchEvent(new Event('click'));
  });

  async6.next = async6.step_func(_ => {
    var check_hash = async6.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      async6.done();
      document.body.removeChild(div);
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = '';
  });

  async1.step(_ => {
    async1.next();
  });

})();
