;((rc) => {
  'use strict';
  var tagContent = 'router3';

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
  var async6 = async_test('Case 3: hash changed to content[hash="case3-nested111/case3-nested1111"]');
  var async7 = async_test('Case 3: hash changed to content[hash="case3-nested11/case3-nested111/case3-nested1111"]');
  var async8 = async_test('Case 3: hash changed to content[hash="case3-nested1/case3-nested11/case3-nested111/case3-nested1111"]');


  rc.push(async1.step_func(_ => {
    document.body.appendChild(div);
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      window.location.hash = '';
      async1.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location1/case3-location2";
  }));

  rc.push(async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      assert_false(content1.hidden);
      assert_true(content2.hidden);

      window.location.hash = '';
      async2.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location1";
  }));

  rc.push(async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test1`);
      var content3 = document.querySelector(`${tagContent}#case3-test2`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);

      window.location.hash = '';
      async3.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-location2";
  }));

  rc.push(async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

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

      window.location.hash = '';
      async4.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested1/case3-nested11/case3-nested111/case3-nested1111";
  }));

  rc.push(async5.step_func(_ => {
    var check_hash = async5.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

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

      window.location.hash = '';
      async5.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested1111";
  }));

  rc.push(async6.step_func(_ => {
    var check_hash = async6.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test2`);
      var content3 = document.querySelector(`${tagContent}#case3-test3-1`);
      var content4 = document.querySelector(`${tagContent}#case3-test4-11`);
      var content5 = document.querySelector(`${tagContent}#case3-test5-111`);
      var content6 = document.querySelector(`${tagContent}#case3-test6-1111`);
      var content7 = document.querySelector(`${tagContent}#case3-test5-1111`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);
      assert_true(content4.hidden);
      assert_false(content5.hidden);
      assert_true(content6.hidden);
      assert_false(content7.hidden);

      window.location.hash = '';
      async6.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested111/case3-nested1111";
  }));

  rc.push(async7.step_func(_ => {
    var check_hash = async7.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test2`);
      var content3 = document.querySelector(`${tagContent}#case3-test3-1`);
      var content4 = document.querySelector(`${tagContent}#case3-test4-11`);
      var content5 = document.querySelector(`${tagContent}#case3-test5-111`);
      var content6 = document.querySelector(`${tagContent}#case3-test6-1111`);
      var content7 = document.querySelector(`${tagContent}#case3-test4-111`);
      var content8 = document.querySelector(`${tagContent}#case3-test4-1111`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);
      assert_false(content4.hidden);
      assert_true(content5.hidden);
      assert_true(content6.hidden);
      assert_false(content7.hidden);
      assert_false(content8.hidden);

      window.location.hash = '';
      async7.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested11/case3-nested111/case3-nested1111";
  }));

  rc.push(async8.step_func(_ => {
    var check_hash = async8.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector(`${tagContent}#case3-test1-p`);
      var content2 = document.querySelector(`${tagContent}#case3-test2`);
      var content3 = document.querySelector(`${tagContent}#case3-test3-1`);
      var content4 = document.querySelector(`${tagContent}#case3-test4-11`);
      var content5 = document.querySelector(`${tagContent}#case3-test5-111`);
      var content6 = document.querySelector(`${tagContent}#case3-test6-1111`);
      var content7 = document.querySelector(`${tagContent}#case3-test3-11`);
      var content8 = document.querySelector(`${tagContent}#case3-test3-111`);
      var content9 = document.querySelector(`${tagContent}#case3-test3-1111`);
      assert_true(content1.hidden);
      assert_true(content2.hidden);
      assert_false(content3.hidden);
      assert_true(content4.hidden);
      assert_true(content5.hidden);
      assert_true(content6.hidden);
      assert_false(content7.hidden);
      assert_false(content8.hidden);
      assert_false(content9.hidden);

      document.body.removeChild(div);
      window.location.hash = '';
      async8.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case3-nested1/case3-nested11/case3-nested111/case3-nested1111";
  }));

})(window.routeCases);
