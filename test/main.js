window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  setup({allow_uncaught_exception:true});
  promise_test(function() { return new Promise((resolve, reject) => {
    var router3 = document.querySelector(selRouter);

    assert_true(router3.MaterialRouter3 instanceof MaterialRouter3);

    resolve();
  }); }, "Check API");

  promise_test(function() { return new Promise((resolve, reject) => {
    var hash1 = selectHash('');

    assert_false(hash1.hidden);

    window.location.hash = '';
    resolve();
  }); }, "Default hash at body hash=''");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hashRE1 = selectHash("hash-exp([0-9]+)");
    let hashRE2 = selectHash("hash1-exp([0-9]+)");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashRE1.hidden);
      assert_false(hashRE2.hidden);
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      assert_equals(e.detail.param1, "123");
      assert_equals(e.detail.param2, "456");

      // [teardown]
      teardown(resolve, handler, e);
    });
    hashRE2.addEventListener('show', handler);
    assert_true(hashRE1.hidden);
    assert_true(hashRE2.hidden);
    assert_true(hash2.hidden);
    assert_true(hash1.hidden);

    // [run]
    window.location.hash = "hash-exp123/hash1-exp456";
  }); }, "Catch route's param if go from '' to '#hash-exp123/hash1-exp456' that matches /hash-exp([0-9]+)/hash1-exp([0-9]+) with param1=123 and param2=456");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hashRE1 = selectHash("hash-exp([0-9]+)");
    let hashRE2 = selectHash("hash1-exp([0-9]+)");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashRE1.hidden);
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hashRE1.hidden);
    assert_true(hash2.hidden);
    assert_true(hash1.hidden);

    // [run]
    window.location.hash = "hash-exp123/hash1-exp456";
  }); }, "Change route from '' to '#hash-exp123/hash1-exp456' that matches /hash-exp([0-9]+)/hash1-exp([0-9]+)");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hashRE1 = selectHash("hash-exp([0-9]+)");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashRE1.hidden);
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hashRE1.hidden);
    assert_true(hash2.hidden);
    assert_true(hash1.hidden);

    // [run]
    window.location.hash = "hash-exp123";
  }); }, "Change route from '' to '#hash-exp123' that matches /hash-exp([0-9]+)/");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hashRE1 = selectHash("hash-exp([0-9]+)-([0-9]+)");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashRE1.hidden);
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      assert_equals(e.detail.router, hashRE1);
      assert_equals(e.detail.param1, "123");
      assert_equals(e.detail.param2, "456");

      // [teardown]
      teardown(resolve, handler, e);
    });
    hashRE1.addEventListener('show', handler);
    assert_true(hashRE1.hidden);
    assert_true(hash2.hidden);
    assert_true(hash1.hidden);

    // [run]
    window.location.hash = "hash-exp123-456";
  }); }, "Catch route's param if go from '' to '#hash-exp123-456' that matches /hash-exp([0-9]+)-([0-9]+)/ with param1=123 and param2=456");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hashRE1 = selectHash("hash-exp([0-9]+)");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashRE1.hidden);
      assert_true(hash2.hidden);
      assert_true(hash1.hidden);

      assert_equals(e.detail.router, hashRE1);
      assert_equals(e.detail.param1, "123");

      // [teardown]
      teardown(resolve, handler, e);
    });
    hashRE1.addEventListener('show', handler);
    assert_true(hashRE1.hidden);
    assert_true(hash2.hidden);
    assert_true(hash1.hidden);

    // [run]
    window.location.hash = "hash-exp123";
  }); }, "Catch route's param if go '' to '#hash-exp123' that matches /hash-exp([0-9]+)/ with param1=123");

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
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hash1.hidden);
      assert_true(hash2.hidden);
      assert_equals(e.detail.router, hash1);

      // [teardown]
      teardown(resolve, handler, e);
    });
    hash1.addEventListener('show', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "hash1";
  }); }, "Catch router's show event if go from '' to '#hash1'");

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
      assert_equals(e.detail.router, hash7);

      // [teardown]
      teardown(resolve, handler, e);
    });
    hash7.addEventListener('show', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash7.hidden);
    assert_true(hash8.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash5/hash7";
  }); }, "Catch router's show event if go from '' to #hash1/hash3/hash5/hash7");

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
      assert_equals(e.detail.router, hash7);

      // [teardown]
      teardown(resolve, handler, e);
    });
    hash1.addEventListener('show', handler);
    assert_true(hash1.hidden);
    assert_true(hash3.hidden);
    assert_true(hash5.hidden);
    assert_true(hash7.hidden);
    assert_true(hash8.hidden);

    // [run]
    window.location.hash = "hash1/hash3/hash5/hash7";
  }); }, "Catch router's show event if go from '' to #hash1/hash3/hash5/hash7");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_false(hash2.hidden);

      // [teardown]
      teardown(resolve, handler, e);
    });
    hash1.addEventListener('hide', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "hash1";
    window.location.hash = "hash2";
  }); }, "Catch router's hide event if go from '#hash1' to '#hash2'");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");
    let hash3 = selectHash("hash3");

    let handler1 = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_false(hash2.hidden);
    });
    let handler2 = this.step_func((e) => {
      // [verify]
      assert_unreach();
    });
    let handler3 = this.step_func((e) => {
      // [verify]
      assert_true(hash1.hidden);
      assert_false(hash2.hidden);
      assert_true(hash3.hidden);

      // [teardown]
      hash1.removeEventListener(e.type, handler1);
      hash2.removeEventListener(e.type, handler2);
      teardown(resolve, handler3, e);
    });
    hash1.addEventListener('hide', handler1);
    hash2.addEventListener('hide', handler2);
    hash3.addEventListener('hide', handler3);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);
    assert_true(hash3.hidden);

    // [run]
    window.location.hash = "hash1/hash3";
    window.location.hash = "hash2";
  }); }, "Catch router's hide event if go from '#hash1/hash3' to '#hash2'");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hashREB = selectHash("hash-mix-([0-9]+)");
    let hashSB = selectHash("hash-mix-123");

    let handler1 = this.step_func((e) => {
      // [verify]
      assert_false(hashSB.hidden);
      assert_true(hashREB.hidden);

      // [teardown]
      hashREB.removeEventListener(e.type, handler2);
      teardown(resolve, handler1);
    });
    let handler2 = this.step_func((e) => {
      assert_unreach();
    });
    hashREB.addEventListener('show', handler2);
    hashSB.addEventListener('show', handler1);
    assert_true(hashREB.hidden);
    assert_true(hashSB.hidden);

    // [run]
    window.location.hash = "hash-mix-123";
  }); }, "String-based route goes before any RegExp-based. Catch route's show from '' to '#hash-mix-123'");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hashREB = selectHash("hash-mix-([0-9]+)");
    let hashSB = selectHash("hash-mix-123");

    let handler = this.step_func((e) => {
      // [verify]
      assert_false(hashSB.hidden);
      assert_true(hashREB.hidden);

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('hashchange', handler);
    assert_true(hashREB.hidden);
    assert_true(hashSB.hidden);

    // [run]
    window.location.hash = "hash-mix-123";
  }); }, "String-based route goes before any RegExp-based. Change route from '' to '#hash-mix-123'");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash5 = selectHash("hash5");
    let hash7 = selectHash("hash7");

    let handler1 = this.step_func((e) => {
      // [setup]
      window.addEventListener('error', handler2);
      hash7.removeEventListener('show', handler1);
      hash7.addEventListener('show', handler3)

      // [run]
      window.location.hash = "absent-hash";
    });
    let handler2 = this.step_func((e) => {
      // [verify]
      assert_equals(e.message, "Uncaught Error: Cannot navigate to absent-hash");
      assert_equals(window.location.hash.slice(1), "hash1/hash3/hash5/hash7");

      // [teardown]
      hash7.removeEventListener('show', handler3);
      window.removeEventListener('error', handler2);
      teardown(resolve, handler1, e);
    });
    let handler3 = this.step_func((e) => {
      // [verify]
      assert_unreached();
    });
    hash7.addEventListener('show', handler1);

    // [run]
    window.location.hash = "hash1/hash3/hash5/hash7";
  }); }, "Check that router's show event does not dispatch twice if go from '#hash1/hash3/hash5/hash7' to #absent-hash");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hashRE2 = selectHash("hash1-exp([0-9]+)");
    let handler1 = this.step_func((e) => {
      // [teardown]
      hashRE2.removeEventListener('show', handler1);
      window.location.hash = "absent-hash";

      // [setup]
      window.addEventListener('error', handler2);
    });
    let handler2 = this.step_func((e) => {
      // [verify]
      assert_equals(window.location.hash[0] === "#" ?
        window.location.hash.slice(1) : window.location.hash,
        "hash-exp123/hash1-exp456");

      // [teardown]
      teardown(resolve, handler2, e);
    });
    hashRE2.addEventListener('show', handler1);

    // [run]
    window.location.hash = "hash-exp123/hash1-exp456";
  }); }, "Restore lastURL if go from '#hash-exp123/hash1-exp456' to an absent hash");

  /**
   * This test goes before:
   *   "Change route from '#hash1/hash3/hash6' to absent '#hash1/hash!3' see an error and stay at oldURL"
   */
  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash2 = selectHash("hash2");

    let handler = this.step_func((e) => {
      // [verify]
      assert_equals(e.message, "Uncaught Error: Cannot navigate to hash!1");

      // [teardown]
      window.removeEventListener('error', handler);
      window.location.hash = "#hash1/hash3/hash6";
      setTimeout(() => resolve(), 0);
      // This teardown navigates to a concrete location.hash
    });
    window.addEventListener('error', handler);
    assert_true(hash1.hidden);
    assert_true(hash2.hidden);

    // [run]
    window.location.hash = "#hash!1";
  }); }, "Change route from '' to absent '#hash!1' and see an error");

  /**
   * This test goes after:
   *   "Change route from '' to absent '#hash!1' and see an error"
   */
  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash1 = selectHash("hash1");
    let hash3 = selectHash("hash3");
    let hash6 = selectHash("hash6");

    let handler = this.step_func((e) => {
      // [verify]
      assert_equals(e.message, "Uncaught Error: Cannot navigate to hash1/hash!3");

      // [teardown]
      teardown(resolve, handler, e);
    });
    window.addEventListener('error', handler);
    assert_false(hash1.hidden);
    assert_false(hash3.hidden);
    assert_false(hash6.hidden);

    // [run]
    window.location.hash = "#hash1/hash!3";
  }); }, "Change route from '#hash1/hash3/hash6' to absent '#hash1/hash!3' see an error and stay at oldURL");

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash7 = selectHash("hash7");

    let handler = this.step_func((e) => {
      // [verify]
      assert_equals(e.message, "Uncaught Error: Cannot navigate to hash7");

      // [teardown]
      teardown(resolve, handler);
    });
    window.addEventListener('error', handler);
    assert_true(hash7.hidden);

    // [run]
    window.location.hash = "hash7";
  }); }, "Change route from '' to #hash7");

});
