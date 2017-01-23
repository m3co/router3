window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  promise_test(function() { return new Promise((resolve, reject) => {
    var router3 = document.querySelector(selRouter);

    assert_true(router3.MaterialRouter3 instanceof MaterialRouter3);

    resolve();
  }); }, "Check API");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash2.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "hash1";
  }); }, "Change route from '' to '#hash1'");


  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_false(hash2.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "hash2";
  }); }, "Change route from '' to '#hash2'");

});
