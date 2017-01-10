;((rc) => {
  'use strict';
  var tagContent = 'router3';

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

  <${tagContent} id="case5-2" hash="case5-2">
    Case 5-2
    <div>
      <div>
        <${tagContent} id="case5-21" hash="case5-21">
          Case 5-21
          <div>
            <div>
              <${tagContent} id="case5-211" hash="case5-211">
                Case 5-211
              </${tagContent}>
            </div>
          </div>
        </${tagContent}>
      </div>
    </div>
  </${tagContent}>
  `;

  var async1 = async_test('Case 5: hash changed to content[hash="case5-1/case5-11"]');
  var async2 = async_test('Case 5: hash changed to content[hash="case5-2/case5-21/case5-211"]');
  var async3 = async_test('Case 5: hash changed to content[hash="case5-2/case5-21"]');
  var async4 = async_test('Case 5: hash changed to content[hash="case5-2"]');

  rc.push(async1.step_func(_ => {
    document.body.appendChild(div);
    var check_hash = async1.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector('#case5-1');
      var content2 = document.querySelector('#case5-11');
      assert_false(content1.hidden);
      assert_false(content2.hidden);

      window.location.hash = '';
      async1.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case5-1/case5-11";
  }));

  rc.push(async2.step_func(_ => {
    var check_hash = async2.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector('#case5-2');
      var content2 = document.querySelector('#case5-21');
      var content3 = document.querySelector('#case5-211');
      assert_false(content1.hidden);
      assert_false(content2.hidden);
      assert_false(content3.hidden);

      window.location.hash = '';
      async2.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case5-2/case5-21/case5-211";
  }));

  rc.push(async3.step_func(_ => {
    var check_hash = async3.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector('#case5-2');
      var content2 = document.querySelector('#case5-21');
      var content3 = document.querySelector('#case5-211');
      assert_false(content1.hidden);
      assert_false(content2.hidden);
      assert_true(content3.hidden);

      window.location.hash = '';
      async3.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case5-2/case5-21";
  }));

  rc.push(async4.step_func(_ => {
    var check_hash = async4.step_func((e) => {
      window.removeEventListener('hashchange', check_hash);

      var content1 = document.querySelector('#case5-2');
      var content2 = document.querySelector('#case5-21');
      var content3 = document.querySelector('#case5-211');
      assert_false(content1.hidden);
      assert_true(content2.hidden);
      assert_true(content3.hidden);

      document.body.removeChild(div);
      window.location.hash = '';
      async4.done();
    });
    window.addEventListener('hashchange', check_hash);
    window.location.hash = "case5-2";
  }));

})(window.routeCases);
