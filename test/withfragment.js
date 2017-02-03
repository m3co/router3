window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash3 = selectHash("detached");

    let handler1 = this.step_func((e) => { this.step_timeout(() => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash3.hidden);

      // [teardown]
      hash1.removeEventListener('show', handler1);
      teardown(resolve, handler1, e)
    }, 100); });
    hash1.addEventListener('show', handler1);

    // [run]
    window.location.hash = "main";
  }); }, "Go to main");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash2 = selectHash(hash1, "fragment");
    let hash3 = selectHash("detached");
    let hash4 = selectHash(hash3, "fragment");

    let handler2 = this.step_func((e) => { this.step_timeout(() => {
      // [verify]
      assert_false(hash2.hidden);
      assert_false(hash1.hidden);
      assert_true(hash3.hidden);
      assert_true(hash4.hidden);

      // [teardown]
      teardown(resolve, handler2, e);
    }, 100); });
    hash2.addEventListener('show', handler2);

    // [run]
    window.location.hash = "main/fragment";
  }); }, "Go to main/fragment");

});
