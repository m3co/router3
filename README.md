# router3
The second try for writting a normal and simple router tag

## How to?

Wanna see it in action? Check [the demos](http://router2-demo.m3c.space/demo)

Is it working? Check [the tests](http://router2-demo.m3c.space/test)


## TODO

Still I've to develop some things...

1. Add a relative tag. The idea is located at test/case2 (is it necessary?)
2. Set a name for params
3. Don't let the routers to rely on the order of appearance

## Demo

Check the demos' source code. They can give you a big picture about what I want to develop.

## Setup

```
<script src="bower_components/customevent-polyfill/customevent-polyfill.min.js"></script>
<script src="bower_components/es6-promise/es6-promise.min.js"></script>
<script src="bower_components/fetch/fetch.js"></script>
<script src="bower_components/pseudoimport-html/pseudoimport-html.js" defer></script>
<script src="bower_components/router3/router3.js"></script>
```

In fact, if you're using a recent browser then you may omit ```customevent-polyfill```, ```es6-promise``` and ```fetch``` scripts.


## Usage

_If you can express your idea in HTML then you can express it in JS_

A router is an HTML tag that defines a region that browser shows when ```window.location.hash``` matches the router's hash attribute.

Check this simple example:
```html
<router3 hash="page1">
  Some HTML content
</router3>
<a href="#page1">Show page1</a>
```

If click over the anchor then the router becomes visible. Otherwise it's hidden.

The full set of attributes that are present in the router3 tag are:

- hash [string] or "regexp"
- src [string] points to an absolute URL
- class-hide [string] the class that will appear instead of hidden
- class-show [string] the class that will appear when not hidden

A second example that allows to fetch HTML code from outside
```html
<router3 hash="page1" src="/page1.hml">
  Some default html code
  <router3-src></router3-src>
  More html code
</router3>
<a href="#page1">Show page1</a>
```

In this second example you should care about the __/absolute URL path__.
The tag ```<router3-src>``` holds everything that comes from ```/page1.html```.
If this tag is not indicated, by default it will be appended via ```appendChild``` [as indicated here](https://github.com/m3co/router3/blob/master/index.js#L53).


### Events

If src is defined for a router them it can accept the __load__ event, e.g.

```html
<router3 hash="page1" src="/page1.html"></router3>
<script>
  document
    .querySelector('router3[hash="page1"]')
    .addEventListener('load', e => {
    // this event will be executed after
    // the browser loads the url /page1.html
  });
</script>
```

When a router matches a ```window.location.hash``` then the __show / hide__ events are dispatched, e.g.

```html
<router3 hash="page1">
  some content
</router3>
<script>
  document
    .querySelector('router3[hash="page1"]')
    .addEventListener('show', e => {
    // this event will be executed after
    // the browser changes its hash to #page1
  });
  document
    .querySelector('router3[hash="page1"]')
    .addEventListener('hide', e => {
    // this event will be executed after
    // the browser changes its hash to something
    // different than #page1
  });
</script>
```

### Default router

The default router can be achieved if set ```hash=""```. E.g.

```html
<router3 hash="page1" src="/page1.html"></router3>
<router3 hash="">A default view</router3>
```

So, if ```window.location.hash === 'page1'``` then ```router[hash="page1"]``` is visible.

But, if ```window.location.hash === ''``` then ```router[hash=""]``` is visible and the other is hidden.

