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
                  hidden-attribute="${hiddenAttr}"
                  special-hide-attribute="${specialHideAttr}">
      <!--
      By default, this config, if not given, will have the following
      values:
  class-show=""             // add to the element's class when showing
  class-hide=""             // remove from the element's class when hidding
  hidden-attribute="hidden" // put/remove this attribute when showing/hidding
                            // if (class-show === "" && class-hide === "")
  special-hide-attribute="reserved-hidden" // put this attribute when hidding
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

    <${tagContent} hash="case9-3">
      Case 9-2
    </${tagContent}>

    <${tagContent} hash="case9-3" class-show="" class-hide="">
      Case 9-2
    </${tagContent}>
  `;

})(window.routeCases);
