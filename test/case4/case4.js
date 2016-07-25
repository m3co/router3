;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} id="case4-1" hash="case4-1">
      case 4-1
    </${tagContent}>
  `;
  var async1 = async_test('Case 4: hash changed to content[hash="case4-1"]');

  async1.next = async1.step_func(_ => {
    async1.done();
    document.body.removeChild(div);
    rc.next();

  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
