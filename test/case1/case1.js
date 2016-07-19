;(_ => {
  'use strict';
  var tagContent = 'router2-content';

  test(_ => {
    var router2content = document.createElement(tagContent);
    assert_equals(router2content.TAG_NAME, tagContent);
  }, `check definition of ${tagContent}`);

})();
