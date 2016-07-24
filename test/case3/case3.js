;((rc) => {
  'use strict';

  var div = document.createElement('div');
  div.innerHTML = `

  `;

  var async1 = async_test('Case 3: hash changed to content[hash="location1"]');
  async1.next = async1.step_func(_ => {
    async1.done();
    rc.next();
  });

  rc.push(_ => {
    async1.step(_ => {
      async1.next();
    });

  });

})(window.routeCases);
