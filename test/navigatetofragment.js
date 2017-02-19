window.addEventListener('load', () => {

  const classAsString = "MaterialRouter3";
  const cssRouter = "mdl-router3";
  const selRouter = `.${cssRouter}`;

  promise_test(function() { return new Promise((resolve, reject) => {
    // [setup]
    let hash = selectHash('detached');
    hash.addEventListener('show', this.step_func(e => {
      resolve();
    }));
    window.addEventListener('error', this.step_func(e => {
      reject();
    }));
  }); }, "Navigate to detached/fragment at first time");

});
