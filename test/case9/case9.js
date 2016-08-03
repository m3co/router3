;((rc) => {
  'use strict';
  var tagContent = 'router3';
  var tagConfig = 'router3-config';
  var hiddenAttr = 'hidden';
  var specialHideAttr = 'private-hidden';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagConfig} class-show="class-show0"
                  class-hide="class-hide0">
      <!--
      By default, this config, if not given, will have the following
      values:
  class-show=""             // add to the element's class when showing
  class-hide=""             // remove from the element's class when hidding
  hidden-attribute="hidden" // put/remove this attribute when showing/hidding
                            // if (class-show === "" && class-hide === "")
      -->
    </${tagConfig}>
    <${tagContent} hash="case9-1" class-show="class-show1" class-hide="class-hide1">
      Case 9-1
    </${tagContent}>

    <${tagContent} hash="case9-2" class-show="class-show1">
      Case 9-2
    </${tagContent}>

    <${tagContent} hash="case9-3" class-hide="class-hide1">
      Case 9-3
    </${tagContent}>

    <${tagContent} hash="case9-4">
      Case 9-4
    </${tagContent}>

    <${tagContent} hash="case9-5" class-show="" class-hide="">
      Case 9-5
    </${tagContent}>
  `;

  var async1 = async_test('Case 9: hash changed to content[hash="case9-1"]');
  var async2 = async_test('Case 9: hash changed to content[hash="case9-2"]');
  var async3 = async_test('Case 9: hash changed to content[hash="case9-3"]');
  var async4 = async_test('Case 9: hash changed to content[hash="case9-4"]');
  var async5 = async_test('Case 9: hash changed to content[hash="case9-5"]');

  async1.next = async1.step_func(_ => {
    var hash = 'case9-1';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash = async1.step_func(_ => {
      content1.removeEventListener('show', check_hash);
      assert_false(content1.hasAttribute(specialHideAttr));
      assert_true(content2.hasAttribute(specialHideAttr));
      assert_true(content3.hasAttribute(specialHideAttr));
      assert_true(content4.hasAttribute(specialHideAttr));
      assert_true(content5.hasAttribute(specialHideAttr));

      assert_false(content1.hasAttribute(hiddenAttr));
      assert_false(content2.hasAttribute(hiddenAttr));
      assert_false(content3.hasAttribute(hiddenAttr));
      assert_false(content4.hasAttribute(hiddenAttr));
      assert_true(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-hide1'));
      assert_true(content1.classList.contains('class-show1'));

      async2.next();
      async1.done();
    });

    content1.addEventListener('show', check_hash);
    window.location.hash = hash;
  });

  async2.next = async2.step_func(_ => {
    var hash = 'case9-2';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash = async2.step_func(_ => {
      content2.removeEventListener('show', check_hash);
      assert_true(content1.hasAttribute(specialHideAttr));
      assert_false(content2.hasAttribute(specialHideAttr));
      assert_true(content3.hasAttribute(specialHideAttr));
      assert_true(content4.hasAttribute(specialHideAttr));
      assert_true(content5.hasAttribute(specialHideAttr));

      assert_false(content1.hasAttribute(hiddenAttr));
      assert_false(content2.hasAttribute(hiddenAttr));
      assert_false(content3.hasAttribute(hiddenAttr));
      assert_false(content4.hasAttribute(hiddenAttr));
      assert_true(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));
      assert_true(content2.classList.contains('class-show1'));
      assert_true(content3.classList.contains('class-hide1'));

      async3.next();
      async2.done();
    });

    content2.addEventListener('show', check_hash);
    window.location.hash = hash;
  });

  async3.next = async3.step_func(_ => {
    var hash = 'case9-3';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash_show = async3.step_func(_ => {
      content3.removeEventListener('show', check_hash_show);
      assert_true(content1.hasAttribute(specialHideAttr));
      assert_true(content2.hasAttribute(specialHideAttr));
      assert_false(content3.hasAttribute(specialHideAttr));
      assert_true(content4.hasAttribute(specialHideAttr));
      assert_true(content5.hasAttribute(specialHideAttr));

      assert_false(content1.hasAttribute(hiddenAttr));
      assert_false(content2.hasAttribute(hiddenAttr));
      assert_false(content3.hasAttribute(hiddenAttr));
      assert_false(content4.hasAttribute(hiddenAttr));
      assert_true(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_true(content3.classList.contains('class-show0'));

      content3.addEventListener('hide', check_hash_hide);
      window.location.hash = '';
    });
    var check_hash_hide = async3.step_func(_ => {
      content3.removeEventListener('hide', check_hash_hide);
      assert_true(content3.hasAttribute(specialHideAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_false(content3.classList.contains('class-show0'));
      assert_true(content3.classList.contains('class-hide1'));

      async4.next();
      async3.done();
    });

    content3.addEventListener('show', check_hash_show);
    window.location.hash = hash;
  });

  async4.next = async4.step_func(_ => {
    var hash = 'case9-4';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash_show = async4.step_func(_ => {
      content4.removeEventListener('show', check_hash_show);
      assert_true(content1.hasAttribute(specialHideAttr));
      assert_true(content2.hasAttribute(specialHideAttr));
      assert_true(content3.hasAttribute(specialHideAttr));
      assert_false(content4.hasAttribute(specialHideAttr));
      assert_true(content5.hasAttribute(specialHideAttr));

      assert_false(content1.hasAttribute(hiddenAttr));
      assert_false(content2.hasAttribute(hiddenAttr));
      assert_false(content3.hasAttribute(hiddenAttr));
      assert_false(content4.hasAttribute(hiddenAttr));
      assert_true(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_false(content3.classList.contains('class-show0'));
      assert_true(content3.classList.contains('class-hide1'));

      assert_true(content4.classList.contains('class-show0'));
      content4.addEventListener('hide', check_hash_hide);
      window.location.hash = '';
    });

    var check_hash_hide = async4.step_func(_ => {
      assert_true(content4.hasAttribute(specialHideAttr));
      content4.removeEventListener('hide', check_hash_hide);

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_false(content3.classList.contains('class-show0'));
      assert_true(content3.classList.contains('class-hide1'));

      assert_false(content4.classList.contains('class-show0'));
      assert_true(content4.classList.contains('class-hide0'));

      async5.next()
      async4.done();
    });

    content4.addEventListener('show', check_hash_show);
    window.location.hash = hash;
  });

  async5.next = async5.step_func(_ => {
    var hash = 'case9-5';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash_show = async5.step_func(_ => {
      content5.removeEventListener('show', check_hash_show);
      assert_true(content1.hasAttribute(specialHideAttr));
      assert_true(content2.hasAttribute(specialHideAttr));
      assert_true(content3.hasAttribute(specialHideAttr));
      assert_true(content4.hasAttribute(specialHideAttr));
      assert_false(content5.hasAttribute(specialHideAttr));

      assert_false(content1.hasAttribute(hiddenAttr));
      assert_false(content2.hasAttribute(hiddenAttr));
      assert_false(content3.hasAttribute(hiddenAttr));
      assert_false(content4.hasAttribute(hiddenAttr));
      assert_false(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_false(content3.classList.contains('class-show0'));
      assert_true(content3.classList.contains('class-hide1'));

      assert_false(content4.classList.contains('class-show0'));
      assert_true(content4.classList.contains('class-hide0'));

      assert_false(content5.classList.contains('class-show0'));
      assert_false(content5.classList.contains('class-hide0'));

      content5.addEventListener('hide', check_hash_hide);
      window.location.hash = '';
    });

    var check_hash_hide = async5.step_func(_ => {
      assert_true(content5.hasAttribute(specialHideAttr));
      content5.removeEventListener('hide', check_hash_hide);

      assert_true(content5.hasAttribute(hiddenAttr));

      assert_false(content1.classList.contains('class-show1'));
      assert_true(content1.classList.contains('class-hide1'));

      assert_false(content2.classList.contains('class-show1'));
      assert_true(content2.classList.contains('class-hide0'));

      assert_false(content3.classList.contains('class-show0'));
      assert_true(content3.classList.contains('class-hide1'));

      assert_false(content4.classList.contains('class-show0'));
      assert_true(content4.classList.contains('class-hide0'));

      assert_false(content5.classList.contains('class-show0'));
      assert_false(content5.classList.contains('class-hide0'));

      document.body.removeChild(div);
      rc.next();
      async5.done();
    });

    content5.addEventListener('show', check_hash_show);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  });

})(window.routeCases);
