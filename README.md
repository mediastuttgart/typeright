# typeright

A simple javascript plugin for creating typewriter effects.

[mediastuttgart.github.io/typeright](http://mediastuttgart.github.io/typeright)

Code pattern and docs inspired by the wonderful [imagesLoaded plugin](http://desandro.github.io/imagesloaded/) from [David DeSandro](https://github.com/desandro)

## Latest version

0.1.0

## Documentation

08/04/13

## Install

Get a packaged source file:

+ [typeright.pkgd.js](https://raw.github.com/mediastuttgart/typeright/v0.1.0/dist/typeright.pkgd.js)
+ [typeright.pkgd.min.js](https://raw.github.com/mediastuttgart/typeright/v0.1.0/dist/typeright.pkgd.min.js)

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
typeRight(element, options, callback);
```

you can use `new` if you like

``` js
new typeRight(element, options, callback);
```

+ `element` _Element, NodeList, Array, or Selector String_
+ `options` _Object_, Object of options passed to the instance
+ `callback` _Function_ - Function triggered after all characters have been processed

Using a callback function is the same as binding it to the `always` event (see below).

### Element

``` js
typeRight(document.querySelector('#container'), options, function (instance) {
    console.log(instance);
});
```

### Selector string

``` js
typeRight('#container', options, function () {...});
```

### Multiple elements

``` js
var buttons = document.querySelectorAll('.button');
typeRight(buttons, options, function () {...});
```

### Type example

``` js
typeRight(element, {
    content: 'A simple javascript plugin for creating typewriter effects.',
    append: true,
    delay: 20,
    easing: true
});
```

### Erase example

``` js
typeRight(element, {
    erase: true,
    delay: 40,
    easing: true
});
```

## Options

| Value     | Type      | Default   | Description                                        |
| --------- | --------- | ----------| -------------------------------------------------- |
| erase     | `boolean` | `false`   | Type or erase characters within the given element  |
| content   | `string`  | _`empty`_ | Content to type within the given element           |
| append    | `boolean` | `false`   | Append characters to an existing content           |
| striptags | `boolean` | `true`    | Strip HTML-Tags from the given content             |
| delay     | `integer` | `100`     | Delay between each processed character             |
| easing    | `boolean` | `false`   | Enables easing when processing characters          |

## Events

typeRight is an Event Emitter. You can bind event listeners to events.

``` js
var typer = typeRight(element, options);
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
$('#container').typeRight(options, function () {
  // callback
});
```

### jQuery Deferred

The jQuery plugin returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/). This allows you to use `.always()`, `.done()` and `.progress()`, similarly to the emitted events.

``` js
$('#container').typeRight(options)
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
        "eventEmitter": "vendor/eventEmitter"
    }
});
```

## MIT License

typeRight is released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
