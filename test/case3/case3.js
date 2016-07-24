;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} hash="case3-location1">
    <${tagContent} id="case3-test1" hash="case3-location2">
      Location 2
    </${tagContent}>
    Case 3 - Location 1
  </${tagContent}>

  <${tagContent} id="case3-test2" hash="case3-location2">
    External location 2
  </${tagContent}>
  `;

  var async1 = async_test('Case 3: hash changed to content[hash="case3-location1/case3-location2"]');
  var async2 = async_test('Case 3: hash changed to content[hash="case3-location1"]');
  var async3 = async_test('Case 3: hash changed to content[hash="case3-location2"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}[hash="case3-location1"]`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      //window.location.hash = '';// still having problems with this tear-down
      async1.done();
      async2.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location1/case3-location2";
  });

  async2.next = async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';// still having problems with this tear-down
      var content1 = document.querySelector(`${tagContent}[hash="case3-location1"]`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      assert_false(content1.hidden);
      assert_true(content2.hidden);

      async2.done();
      async3.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location1";
  });

  async3.next = async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';// still having problems with this tear-down
      var content1 = document.querySelector(`${tagContent}[hash="case3-location1"]`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      var content3 = document.querySelector(`${tagContent}#case3-test2`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);

      async3.done();
      document.body.removeChild(div);
      rc.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location2";
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });

  });

})(window.routeCases);
