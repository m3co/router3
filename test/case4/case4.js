;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} id="case4-1" hash="case4-1">
      case 4-1
      <${tagContent} id="case4-11" hash="case4-11">
        case 4-11
        <${tagContent} id="case4-111" hash="case4-111">
          case 4-111
        </${tagContent}>
        <${tagContent} id="case4-112" hash="case4-112">
          case 4-112
        </${tagContent}>
      </${tagContent}>

      <${tagContent} id="case4-111-e" hash="case4-111">
        case 4-111-e
      </${tagContent}>
      <${tagContent} id="case4-112-e" hash="case4-112">
        case 4-112-e
      </${tagContent}>

      <${tagContent} id="case4-121-e" hash="case4-121">
        case 4-121-e
      </${tagContent}>
      <${tagContent} id="case4-122-e" hash="case4-122">
        case 4-122-e
      </${tagContent}>

      <${tagContent} id="case4-12" hash="case4-12">
        case 4-12
        <${tagContent} id="case4-121" hash="case4-121">
          case 4-121
        </${tagContent}>
        <${tagContent} id="case4-122" hash="case4-122">
          case 4-122
        </${tagContent}>
      </${tagContent}>
    </${tagContent}>
  `;
  var async1 = async_test('Case 4: hash changed to content[hash="case4-1/case4-11/case4-111"]');
  var async2 = async_test('Case 4: hash changed to content[hash="case4-1/case4-111"]');
  var async3 = async_test('Case 4: hash changed to content[hash="case4-1/case4-112"]');
  //var async4 = async_test('Case 4: hash changed to content[hash="case4-1/case4-122"]');
  //var async5 = async_test('Case 4: hash changed to content[hash="case4-1/case4-121"]');
  //var async6 = async_test('Case 4: hash changed to content[hash="case4-1/case4-12/case4-121"]');
  //var async7 = async_test('Case 4: hash changed to content[hash="case4-1/case4-12/case4-122"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      var content1 = document.querySelector('#case4-1');
      var content2 = document.querySelector('#case4-11');
      var content3 = document.querySelector('#case4-111');
      var content4 = document.querySelector('#case4-111-e');
      assert_false(content1.hidden);
      assert_false(content2.hidden);
      assert_false(content3.hidden);
      assert_true(content4.hidden);

      async1.done();
      async2.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case4-1/case4-11/case4-111";
  });

  async2.next = async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      var content1 = document.querySelector('#case4-1');
      var content2 = document.querySelector('#case4-11');
      var content3 = document.querySelector('#case4-111');
      var content4 = document.querySelector('#case4-111-e');
      assert_false(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);
      assert_false(content4.hidden);

      async2.done();
      async3.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case4-1/case4-111";
  });

  async3.next = async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      var content1 = document.querySelector('#case4-1');
      var content2 = document.querySelector('#case4-11');
      var content3 = document.querySelector('#case4-112');
      var content4 = document.querySelector('#case4-112-e');
      assert_false(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);
      assert_false(content4.hidden);

      async3.done();
      document.body.removeChild(div);
      rc.next();

    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case4-1/case4-112";
  });


  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
