window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash2;

    let handler1 = this.step_func((e) => {
      hash2 = selectHash("fragment");
      hash2.addEventListener('show', handler2);
    });
    hash1.addEventListener('load', handler1);

    let handler2 = this.step_func((e) => {
      // [verify]
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      // [teardown]
      hash2.removeEventListener('load', handler1);
      teardown(resolve, handler2, e);
    });

    // [run]
    window.location.hash = "main/fragment";
  }); }, "Integrate");

});
