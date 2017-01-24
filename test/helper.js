'use strict';
function onload_test(f, m) {
  window.addEventListener('load', async_test(m).step_func(f));
}

function selectHash(el, hash) {
  if (el instanceof HTMLDocument || el instanceof HTMLElement) {
    return el.querySelector(`[hash="${hash}"]`);
  }
  return document.querySelector(`[hash="${el}"]`);
}

function teardown(resolve, handler) {
  window.removeEventListener('hashchange', handler);
  window.location.hash = "";
  setTimeout(() => resolve(), 0);
}
