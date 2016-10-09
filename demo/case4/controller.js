;(function() {
  'use strict';
  var content1   = document.querySelector('#r1');
  var content11  = document.querySelector('#r11');
  var content111 = document.querySelector('#r111');

  content1.addEventListener('show', function(e) {
    console.log('content 1 show');
  });
  content1.addEventListener('hide', function(e) {
    console.log('content 1 hide');
  });

  content11.addEventListener('show', function(e) {
    console.log('content 11 show');
  });
  content11.addEventListener('hide', function(e) {
    console.log('content 11 hide');
  });

  content111.addEventListener('show', function(e) {
    console.log('content 111 show');
  });
  content111.addEventListener('hide', function(e) {
    console.log('content 111 hide');
  });

})();
