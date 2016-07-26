;((rc) => {
  'use strict';
  var tagContent = 'router2-content';
  var tagView = 'router2-view';

  var div = document.createElement('div');
  div.innerHTML = `
  <${tagContent} id="case5-1" hash="case5-1">
    Case 5-1
    <div>
      <div>
        <div>
          <${tagContent} id="case5-11" hash="case5-11">
            Case 5-11
          </${tagContent}>
        </div>
      </div>
    </div>
  </${tagContent}>
  `;

  var async1 = async_test('Case 5: hash changed to content[hash="case5-1/case5-11"]');

  async1.next = async1.step_func(_ => {
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector('#case5-1');
      var content2 = document.querySelector('#case5-11');
      //assert_false(content1.hidden);
      //assert_false(content2.hidden);

      //document.body.removeChild(div);
      async1.done();
      rc.next();

    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case5-1/case5-11";
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
