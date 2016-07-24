;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
    <router2-content id="case2-test1" hash="location1" hidden>
      Location 1
    </router2-content>

    <router2-content id="case2-test2" hash="location2" hidden>
      Location 2
    </router2-content>

    <router2-view for="case2-test1">
    </router2-view>

    <router2-view for="case2-test2">
    </router2-view>
  `;

  var async1 = async_test('Case 2: hash changed to content[hash="location1"]');
  var async2 = async_test('Case 2: hash changed to content[hash="location2"]');

  async1.next = async1.step_func(_ => {
    var hash = 'location1';
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    var view = document.querySelector(`${tagView}[for="case2-test1"]`);
    assert_true(content.parentNode === view);
    assert_true(content.hidden);
    var hashAsync = async_test(`Case 2: If change hash to "${hash}" then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(content.parentNode === view);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';
      hashAsync.done();
      async1.done();
      async2.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  });

  async2.next = async2.step_func(_ => {
    var hash = 'location2';
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    var view = document.querySelector(`${tagView}[for="case2-test2"]`);
    assert_true(content.parentNode === view);
    assert_true(content.hidden);
    var hashAsync = async_test(`Case 2: If change hash to "${hash}" then show its content`);

    var check_hash = hashAsync.step_func((e) => {
      assert_false(content.hidden);
      assert_true(content.parentNode === view);
      assert_true(e.newURL.includes(hash));

      // clean the test
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';
      document.body.removeChild(div);
      hashAsync.done();
      async2.done();
      rc.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });

  });

})(window.routeCases);
