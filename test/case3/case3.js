;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} id="case3-test1-p" hash="case3-location1">
    <${tagContent} id="case3-test1" hash="case3-location2">
      Location 2
    </${tagContent}>
    Case 3 - Location 1
  </${tagContent}>

  <${tagContent} id="case3-test2" hash="case3-location2">
    External location 2
  </${tagContent}>

  <${tagContent} id="case3-test3-1" hash="case3-nested1">
    nested 1
    <${tagContent} id="case3-test3-11" hash="case3-nested11">
      nested 11
      <${tagContent} id="case3-test3-111" hash="case3-nested111">
        nested 111
        <${tagContent} id="case3-test3-1111" hash="case3-nested1111">
          nested 1111
        </${tagContent}>
      </${tagContent}>
    </${tagContent}>
  </${tagContent}>

  <${tagContent} id="case3-test4-11" hash="case3-nested11">
    nested 11
    <${tagContent} id="case3-test4-111" hash="case3-nested111">
      nested 111
      <${tagContent} id="case3-test4-1111" hash="case3-nested1111">
        nested 1111
      </${tagContent}>
    </${tagContent}>
  </${tagContent}>

  <${tagContent} id="case3-test5-111" hash="case3-nested111">
    nested 111
    <${tagContent} id="case3-test5-1111" hash="case3-nested1111">
      nested 1111
    </${tagContent}>
  </${tagContent}>

  <${tagContent} id="case3-test6-1111" hash="case3-nested1111">
    nested 1111
  </${tagContent}>
  `;

  var async1 = async_test('Case 3: hash changed to content[hash="case3-location1/case3-location2"]');
  var async2 = async_test('Case 3: hash changed to content[hash="case3-location1"]');
  var async3 = async_test('Case 3: hash changed to content[hash="case3-location2"]');
  var async4 = async_test('Case 3: hash changed to content[hash="case3-nested1/case3-nested11/case3-nested111/case3-nested1111"]');

  var async5 = async_test('Case 3: hash changed to content[hash="case3-nested1111"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
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
      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
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
      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      var content3 = document.querySelector(`${tagContent}#case3-test2`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);

      async3.done();
      async4.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location2";
  });

  async4.next = async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';// still having problems with this tear-down
      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test2`);
      var content3 = document.querySelector(`${tagContent}#case3-test3-1`);
      var content4 = document.querySelector(`${tagContent}#case3-test3-11`);
      var content5 = document.querySelector(`${tagContent}#case3-test3-111`);
      var content6 = document.querySelector(`${tagContent}#case3-test3-1111`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);
      assert_false(content4.hidden);
      assert_false(content5.hidden);
      assert_false(content6.hidden);

      async4.done();
      async5.next();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested1/case3-nested11/case3-nested111/case3-nested1111";
  });

  async5.next = async5.step_func(_ => {
    var check_hash = async5.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      //window.location.hash = '';// still having problems with this tear-down
      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test2`);
      var content3 = document.querySelector(`${tagContent}#case3-test3-1`);
      var content4 = document.querySelector(`${tagContent}#case3-test4-11`);
      var content5 = document.querySelector(`${tagContent}#case3-test5-111`);
      var content6 = document.querySelector(`${tagContent}#case3-test6-1111`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);
      assert_true(content4.hidden);
      assert_true(content5.hidden);
      assert_false(content6.hidden);

      async5.done();
      document.body.removeChild(div);
      rc.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested1111";
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });

  });

})(window.routeCases);
