;((rc) => {
  'use strict';
  var tagContent = 'router3';

  var div = document.createElement('div');
  div.innerHTML = `
    <${tagContent} hash="case10-1" hidden>
      case 10-1
      <${tagContent} hash="case10-11">
        case 10-11

        <!-- Default -->
        <${tagContent} id="defA" hash="">
          Default 10-default A
        </${tagContent}>

        <${tagContent} hash="case10-111">
          case 10-111
        </${tagContent}>

        <!-- Default -->
        <${tagContent} id="defB" hash="">
          Default 10-default B
        </${tagContent}>
      </${tagContent}>

      <!-- Default -->
      <${tagContent} id="defC" hash="">
        case 10-default C
      </${tagContent}>
    </${tagContent}>

    <!-- Default -->
    <${tagContent} id="def" hash="" hidden>
      case 10-default
    </${tagContent}>
  `;

  var async1 = async_test('Case 1: hash changed to content[hash="case10-1"]');

  async1.next = async1.step_func(_ => {
    var hash = "case10-1";
    var content1 = document.querySelector(`${tagContent}[hash="${hash}"]`);
    var content2 = document.querySelector(`${tagContent}#def`);

    assert_true(content1.hidden);

    var check_hash_1 = async1.step_func((e) => {
      assert_false(content1.hidden);
      assert_true(content2.hidden);

      content1.removeEventListener('show', check_hash_1);
      content1.addEventListener('hide', check_hash_def);
      window.location.hash = '';
    });

    var check_hash_def = async1.step_func(e => {
      setTimeout(_ => {
        assert_false(content2.hidden);
        async1.done();

        document.body.removeChild(div);
        rc.next();
      }, 10);
      content1.removeEventListener('hide', check_hash_def);
    });

    content1.addEventListener('show', check_hash_1);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
