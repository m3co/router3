'use strict';
window.addEventListener('popstate', function(e) {
  console.log(e);
  window.location.href = "/trunk/test2/";
  e.preventDefault();
}, true);

window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
});

function changeState(e) {
  console.log(e);
}

Array
  .prototype
  .slice
  .call(document.querySelectorAll('a'))
  .forEach(item => {
    item.addEventListener('click', e => changeState(e));
  });
