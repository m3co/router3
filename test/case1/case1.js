;(_ => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  // reset in order to begin the test... you should delete this line
  window.location.hash = '';

  var div = document.createElement('div');
  div.innerHTML = `
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

    <script>
      document.querySelector('button').addEventListener('click', (e) => {
        location.hash = "myHash";
      });
    </script>
  `;
  document.body.appendChild(div);
  test(_ => {
    assert_true(window.location.hash === '' || window.location.hash === '');
  }, 'The location starts with no hash');

  var async1 = async_test('Test content[hash="a-hash-template"]');
  var async2 = async_test('Test content[hash="another-hash-template"]');

  async1.step(_ => {
    var hash = "a-hash-template";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);
    var hashAsync = async_test(`If change hash to "${hash}" then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);

      // clean the test
      window.removeEventListener('hashchange', check_hash);
      window.location.hash = '';

      hashAsync.done();
      async1.done();


      async2.step(_ => {
        var hash = "another-hash-template";
        var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
        assert_true(content.hidden);

        var hashAsync = async_test(`If change hash to "${hash}" then show its content`);

        var check_hash = hashAsync.step_func((e) => {
          assert_false(content.hidden);

          // clean the test
          window.removeEventListener('hashchange', check_hash);
          window.location.hash = '';

          hashAsync.done();
          async2.done();
          document.body.removeChild(div);
        });

        window.addEventListener('hashchange', check_hash);
        window.location.hash = hash;

      });
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  });

})();
