;((rc) => {
  'use strict';
  var tagContent = 'router3';
  var tagConfig = 'router3-config';
  var hiddenAttr = 'hidden';
  var specialHideAttr = 'private-hidden';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagConfig} class-show="class-show0"
                  class-hide="class-hide0"
                  hidden-attribute="${hiddenAttr}">
      <!--
      By default, this config, if not given, will have the following
      values:
  class-show=""             // add to the element's class when showing
  class-hide=""             // remove from the element's class when hidding
  hidden-attribute="hidden" // put/remove this attribute when showing/hidding
                            // if (class-show === "" && class-hide === "")
  // removed because I want to dream in small steps :))
      -->
    </${tagConfig}>
    <${tagContent} hash="case9-1" class-show="class-show1" class-hide="class-hide1">
      Case 9-1
    </${tagContent}>

    <${tagContent} hash="case9-2" class-show="class-show1">
      Case 9-2
    </${tagContent}>

    <${tagContent} hash="case9-3" class-hide="class-hide1">
      Case 9-2
    </${tagContent}>

    <${tagContent} hash="case9-4">
      Case 9-2
    </${tagContent}>

    <${tagContent} hash="case9-5" class-show="" class-hide="">
      Case 9-2
    </${tagContent}>
  `;

  var async1 = async_test('Case 9: hash changed to content[hash="case9-1"]');

  async1.next = async1.step_func(_ => {
    var hash = 'case9-1';
    var content1 = document.querySelector(`${tagContent}[hash="case9-1"]`);
    var content2 = document.querySelector(`${tagContent}[hash="case9-2"]`);
    var content3 = document.querySelector(`${tagContent}[hash="case9-3"]`);
    var content4 = document.querySelector(`${tagContent}[hash="case9-4"]`);
    var content5 = document.querySelector(`${tagContent}[hash="case9-5"]`);

    var check_hash = async1.step_func(_ => {
      assert_equals(content1.getAttribute(specialHideAttr), null);
      assert_equals(content2.getAttribute(specialHideAttr), '');
      assert_equals(content3.getAttribute(specialHideAttr), '');
      assert_equals(content4.getAttribute(specialHideAttr), '');
      assert_equals(content5.getAttribute(specialHideAttr), '');

      assert_false(content1.hasAttribute(hiddenAttr));

      rc.next();
      document.body.removeChild(div);
      async1.done();
    });

    content1.addEventListener('show', check_hash);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  });

})(window.routeCases);
