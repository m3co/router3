;((rc) => {
  'use strict';
  var tagContent = 'router2-content';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} id="case6-1" hash="case\\d+">
    Case 6 via RegExp
  </${tagContent}>
  `;

  var async1 = async_test('Case 6: hash changed to content[hash="case(\d+)"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);
      var content1 = document.querySelector('#case6-1');
      assert_false(content1.hidden);

      document.body.removeChild(div);
      async1.done();
      rc.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case6";
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
