# MDL router3
The second try for writting a normal and simple router tag

Check the [tests](/test)

## TODO

Still I've to develop some things...

2. Set a name for params
3. Don't let the routers to rely on the order of appearance

## Setup

```
<script src="bower_components/customevent-polyfill/customevent-polyfill.min.js"></script>
<script src="bower_components/promise-polyfill/promise.min.js"></script>
<script src="bower_components/fetch/fetch.js"></script>
<script src="bower_components/pseudoimport-html/pseudoimport-html.js" defer></script>
<script src="bower_components/router3/router3.js"></script>
```

In fact, if you're using a recent browser then you may omit ```customevent-polyfill```, ```promise-polyfill``` and ```fetch``` scripts.


## Usage

_If you can express your idea in HTML then you can express it in JS_

A router is an HTML tag that defines a region that browser shows when ```window.location.hash``` matches the router's hash attribute.

Check this simple example:
```html
<div class="mdl-router3" hash="page1">
  Some HTML content
</div>
<a href="#page1">Show page1</a>
```

If click over the anchor then the router becomes visible. Otherwise it's hidden.

The full set of attributes that are present in the router3 tag are:

- hash [string] or "regexp"
- src [string] points to an absolute URL *still under consideration*

A second example that allows to fetch HTML code from outside
```html
<div class="mdl-router3" hash="page1" src="/page1.hml">
  Some default html code
  More html code
</div>
<a href="#page1">Show page1</a>
```

### Events

If src is defined for a router them it can accept the __load__ event, e.g.

```html
<div class="mdl-router3" hash="page1" src="/page1.html"></div>
<script>
  document
    .querySelector('[hash="page1"]')
    .addEventListener('load', e => {
    // this event will be executed after
    // the browser loads the url /page1.html
  });
</script>
```

When a router matches a ```window.location.hash``` then the __show / hide__ events are dispatched, e.g.

```html
<div class="mdl-router3" hash="page1">
  some content
</div>
<script>
  document
    .querySelector('[hash="page1"]')
    .addEventListener('show', e => {
    // this event will be executed after
    // the browser changes its hash to #page1
  });
  document
    .querySelector('[hash="page1"]')
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
<div class="mdl-router3" hash="page1" src="/page1.html"></div>
<div class="mdl-router3" hash="">A default view</div>
```

So, if ```window.location.hash === 'page1'``` then ```[hash="page1"]``` is visible.

But, if ```window.location.hash === ''``` then ```[hash=""]``` is visible and the other is hidden.

