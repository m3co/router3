;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
  `;

  var async1 = async_test('Case 5: hash changed to content[hash="case5-boilerplate"]');

  async1.next = async1.step_func(_ => {
    document.body.removeChild(div);
    async1.done();
    rc.next();
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
