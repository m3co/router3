window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash3 = selectHash("detached");

    let handler1 = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_false(hash3.hidden);

      // [teardown]
      hash3.removeEventListener('show', handler1);
      teardown(resolve, handler1, e)
    });
    hash3.addEventListener('show', handler1);

    assert_true(!!hash1.MaterialRouter3);
    assert_true(!!hash3.MaterialRouter3);

    // [run]
    hash3.querySelector('.mdl-fragment').MaterialFragment.loaded.then(() => {
      window.location.hash = "detached";
    });
  }); }, "Go to detached");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash3 = selectHash("detached");

    let handler1 = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash3.hidden);

      // [teardown]
      hash1.removeEventListener('show', handler1);
      teardown(resolve, handler1, e)
    });
    hash1.addEventListener('show', handler1);

    assert_true(!!hash1.MaterialRouter3);
    assert_true(!!hash3.MaterialRouter3);

    // [run]
    hash1.MaterialFragment.loaded.then(() => {
      window.location.hash = "main";
    });
  }); }, "Go to main");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash2 = selectHash(hash1, "fragment1");
    let hash3 = selectHash("detached");
    let hash4 = selectHash(hash3, "fragment");

    let handler2 = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_true(hash2.hidden);
      assert_false(hash3.hidden);
      assert_false(hash4.hidden);

      // [teardown]
      teardown(resolve, handler2, e);
    });
    hash4.addEventListener('show', handler2);

    assert_true(!!hash1.MaterialRouter3);
    assert_true(!!hash2.MaterialRouter3);
    assert_true(!!hash3.MaterialRouter3);
    assert_true(!!hash4.MaterialRouter3);

    // [run]
    hash3.querySelector('.mdl-fragment').MaterialFragment.loaded.then(() => {
      window.location.hash = "detached/fragment";
    });
  }); }, "Go to detached/fragment");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("main");
    let hash2 = selectHash(hash1, "fragment1");
    let hash3 = selectHash("detached");
    let hash4 = selectHash(hash3, "fragment");

    let handler2 = this.step_func((e) => {
      // [verify]
      assert_false(hash2.hidden);
      assert_false(hash1.hidden);
      assert_true(hash3.hidden);
      assert_true(hash4.hidden);

      // [teardown]
      teardown(resolve, handler2, e);
    });
    hash2.addEventListener('show', handler2);

    assert_true(!!hash1.MaterialRouter3);
    assert_true(!!hash2.MaterialRouter3);
    assert_true(!!hash3.MaterialRouter3);
    assert_true(!!hash4.MaterialRouter3);

    // [run]
    hash1.MaterialFragment.loaded.then(() => {
      window.location.hash = "main/fragment1";
    });
  }); }, "Go to main/fragment1");

});
