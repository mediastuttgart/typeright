# typeright

A simple javascript plugin for creating typewriter effects.

Everything heavily inspired by the wonderful [imagesLoaded plugin](http://desandro.github.io/imagesloaded/) from [David DeSandro](https://github.com/desandro)

## Install

Get a packaged source file:

+ [typeright.pkgd.min.js](http://github.com/mediastuttgart/typeright/blob/v0.1.0/dist/typeright.pkgd.min.js)
+ [typeright.pkgd.js](http://github.com/mediastuttgart/typeright/blob/v0.1.0/dist/typeright.pkgd.js)

Or install via [Bower](http://bower.io):

``` bash
bower install typeright
```

## Build

First, clone a copy of the main typeRight git repository by running:

``` bash
git clone git://github.com/mediastuttgart/typeright.git
```

Install the grunt-cli and bower packages if you haven't before. These should be done as global installs:

``` bash
npm install -g grunt-cli bower
```

Make sure you have grunt and bower installed by testing:

``` bash
grunt -version
bower -version
```

Enter the typeRight directory and install the Node and Bower dependencies:

``` bash
cd typeright && npm install && bower install
```

Then run grunt to build typeRight:

``` bash
grunt
```

The built version of typeRight will be put in the `dist/` subdirectory, along with the minified copy and packaged version including dependencies.

## Usage

``` js
typeRight(element, callback);
```

you can use `new` if you like

``` js
new typeRight(element, callback);
```

+ `element` _Element, NodeList, Array, or Selector String_
+ `callback` _Function_ - function triggered after all characters have been processed

Using a callback function is the same as binding it to the `always` event (see below).

### Element

``` js
typeRight(document.querySelector('#container'), function (instance) {
    console.log(instance);
});
```

### Selector string

``` js
typeRight('#container', function () {...});
```

### Multiple elements

``` js
var buttons = document.querySelectorAll('.button');
typeRight(buttons, function () {...});
```

## Options

``` js
typeRight(element, options, callback);
```

| Value     | Type      | Default   | Description                                        |
| --------- | --------- | ----------| -------------------------------------------------- |
| erase     | `boolean` | `false`   | Type or erase characters within the given element  |
| content   | `string`  | `_empty_` | Content to type within the given element           |
| append    | `boolean` | `false`   | Append characters to an existing content           |
| striptags | `boolean` | `true`    | Strip HTML-Tags from the given content             |
| delay     | `integer` | `100`     | Delay between each processed character             |
| easing    | `boolean` | `false`   | Enables easing when processing characters          |

### Type

``` js
typeRight(element, {
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit ...',
    append: true,
    delay: 20,
    easing: true
});
```

### Erase

``` js
typeRight(element, {
    erase: true,
    delay: 40,
    easing: true
});
```

## Events

typeRight is an Event Emitter. You can bind event listeners to events.

``` js
var typer = typeRight(element);
function onAlways (instance) {
    console.log('always');
}
```

Bind with `.on()`

```js
typer.on('always', onAlways);
```

Unbind with `.off()`

```js
typer.off('always', onAlways);
```

### always

``` js
typer.on('always', function (instance) {
    console.log('always - all characters have been processed');
});
```

Triggered after all characters have been processed.

+ `instance` _TypeRight_ - typeRight instance

### done

``` js
typer.on('done', function (instance) {
    console.log('always - all characters have been successfully processed');
});
```

Triggered after all characters have been successfully processed.

+ `instance` _TypeRight_ - typeRight instance

### progress

``` js
typer.on('progress', function (instance, position, element) {
    console.log('current caret position: ' + position);
});
```

Triggered after a single character has been processed.

+ `instance` _TypeRight_ - typeRight instance
+ `position` _number_ - current position of the caret
+ `element` _object_ - element with which typeRight operates

## jQuery

If you include jQuery, typeRight can be used as a jQuery Plugin.

``` js
$('#container').typeRight(function () {
  // callback
});
```

### jQuery Deferred

The jQuery plugin returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/). This allows you to use `.always()`, `.done()` and `.progress()`, similarly to the emitted events.

``` js
$('#container').typeRight()
    .always(function (instance) {
        console.log('always - all characters have been processed');
    })
    .done(function (instance) {
        console.log('always - all characters have been successfully processed');
    })
    .progress(function (instance, position, element) {
        console.log('current caret position: ' + position);
    });
```

## RequireJS

typeRight works with RequireJS.

1. Install typeRight and its dependencies
2. Update your [RequireJS paths config](http://requirejs.org/docs/api.html#config-paths) so it can find those modules

``` js
requirejs.config({
  paths: {
    "eventEmitter": "bower_components/eventEmitter"
  }
});
```

## MIT License

typeRight is released under the [MIT License](http://desandro.mit-license.org/).
