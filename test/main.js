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

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash4 = selectHash("hash4");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_false(hash3.hidden);
      assert_true(hash4.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash4.hidden);

    // [run]
    window.location.hash = "hash1/hash3";
  }); }, "Change route from '' to #hash1/hash3");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash4 = selectHash("hash4");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash3.hidden);
      assert_false(hash4.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash4.hidden);

    // [run]
    window.location.hash = "hash1/hash4";
  }); }, "Change route from '' to #hash1/hash4");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash5 = selectHash("hash5");
    let hash6 = selectHash("hash6");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_false(hash3.hidden);
      assert_false(hash5.hidden);
      assert_true(hash6.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash6.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash5";
  }); }, "Change route from '' to #hash1/hash3/hash5");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash5 = selectHash("hash5");
    let hash6 = selectHash("hash6");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_false(hash3.hidden);
      assert_true(hash5.hidden);
      assert_false(hash6.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash6.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash6";
  }); }, "Change route from '' to #hash1/hash3/hash6");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash5 = selectHash("hash5");
    let hash7 = selectHash("hash7");
    let hash8 = selectHash("hash8");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_false(hash3.hidden);
      assert_false(hash5.hidden);
      assert_false(hash7.hidden);
      assert_true(hash8.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash7.hidden);
    assert_true(hash8.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash5/hash7";
  }); }, "Change route from '' to #hash1/hash3/hash5/hash7");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash5 = selectHash("hash5");
    let hash7 = selectHash("hash7");
    let hash8 = selectHash("hash8");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_false(hash3.hidden);
      assert_false(hash5.hidden);
      assert_true(hash7.hidden);
      assert_false(hash8.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash7.hidden);
    assert_true(hash8.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash5/hash8";
  }); }, "Change route from '' to #hash1/hash3/hash5/hash8");

});
