;((rc) => {
  'use strict';

  var div = document.createElement('div');
  div.innerHTML = `
  <router2-content hash="case3-location1">
    Case 3 - Location 1
  </router2-content>
  `;


  var async1 = async_test('Case 3: hash changed to content[hash="location1"]');
  async1.next = async1.step_func(_ => {
    window.location.hash = "case3-location1";
    setTimeout(_ => {
      async1.done();
      rc.next();
    }, 2000);
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });

  });

})(window.routeCases);
