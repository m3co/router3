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
    <${tagContent} id="def" hash="">
      case 10-default
    </${tagContent}>
  `;

  var async1 = async_test('Case 1: hash changed to content[hash="case10-1"]');

  async1.next = async1.step_func(_ => {
    var hash = "case10-1";
    var content = document.querySelector(`${tagContent}[hash="${hash}"]`);
    assert_true(content.hidden);

    var check_hash = async1.step_func((e) => {
      assert_false(content.hidden);

      window.removeEventListener('hashchange', check_hash);
      document.body.removeChild(div);

      async1.done();
      rc.next();
    });

    window.addEventListener('hashchange', check_hash);
    window.location.hash = hash;
  });

  rc.push(_ => {
    async1.step(_ => {
      document.body.appendChild(div);
      async1.next();
    });
  })

})(window.routeCases);
