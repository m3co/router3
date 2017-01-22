(() => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  function selectHash(el, hash) {
    if (el instanceof HTMLDocument || el instanceof HTMLElement) {
      return el.querySelector(`[hash="${hash}"]`);
    }
    return document.querySelector(`[hash="${el}"]`);
  }

  onload_test(function() {
    var router3 = document.querySelector(selRouter);

    assert_true(router3.MaterialRouter3 instanceof MaterialRouter3);

    this.done();
  }, "Check API");


  onload_test(function() {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash2.hidden);

      // [teardown]
      this.done();
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "hash1";
  }, "Change route from '' to '#hash1'");

})();
