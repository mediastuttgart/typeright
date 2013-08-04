/*!
 * typeright v0.1.0
 *
 * A simple javascript plugin for creating typewriter effects.
 *
 * Copyright (c) 2013, MEDIASTUTTGART, http://mediastuttgart.de
 *
 * This file is released under the terms of the MIT license.
 * You can find the complete text in the attached LICENSE
 * file or online at:
 *
 * http://www.opensource.org/licenses/mit-license.php
 */

(function (window) {

'use strict';

var $ = window.jQuery;

// helpers

function extend (a, b) {
	for (var prop in b) {
		a[prop] = b[prop];
	}

	return a;
}

var objToString = Object.prototype.toString;

function isArray (obj) {
	return objToString.call(obj) === '[object Array]';
}

function makeArray (obj) {
	var ary = [];

	if (isArray(obj)) {
		ary = obj;
	}
	else if (typeof obj.length === 'number') {
		for (var i=0, len = obj.length; i < len; i++) {
			ary.push(obj[i]);
		}
	}
	else {
		ary.push(obj);
	}

	return ary;
}

// core

function defineTypeRight (EventEmitter) {
	function TypeRight (element, options, callback) {
		var _this = this;

		if (!(_this instanceof TypeRight)) {
			return new TypeRight(element, options, callback);
		}

		if (typeof element === 'string') {
			element = document.querySelectorAll(element);
		}

		_this.elements = makeArray(element);

		_this.options = extend({
			erase: false,
			append: false,
			striptags: true,
			content: '',
			delay: 100,
			easing: false
		}, _this.options);

		if (typeof options === 'function') {
			callback = options;
		}
		else {
			extend(_this.options, options);
		}

		if (callback) {
			_this.on('always', callback);
		}

		if ($) {
			_this.jqDeferred = new $.Deferred();
		}

		if (_this.options.erase) {
			_this.erase();
		}
		else {
			_this.type(_this.options.content);
		}
	}

	TypeRight.prototype = new EventEmitter();

	TypeRight.prototype.type = function (content) {
		var _this = this, _timeout = [];

		var typeChar = function (content, element, length, i) {
			if (length === content.length) {
				clearTimeout(_timeout[i]);

				if (_this.elements.length === ++i) {
					_this.emit('done', _this);

					if (_this.jqDeferred) {
						_this.jqDeferred.resolve(_this);
					}
				}

				_this.emit('always', _this);
			}
			else {
				element.innerText = content.substr(0, ++length);

				_this.emit('progress', _this, length, element);

				if (_this.jqDeferred) {
					_this.jqDeferred.notify(_this, length, element);
				}

				_timeout[i] = setTimeout(function () {
					typeChar(content, element, length, i);
				}, _this.options.easing && !_this.options.append ? (_this.options.delay / content.length) * length : _this.options.delay);
			}
		};

		for (var i = 0, len = _this.elements.length; i < len; i++) {
			var element = _this.elements[i];
			var length  = 0;

			if (_this.options.striptags) {
				content = content.replace(/<[^>]*>?/g, '');
			}

			if (_this.options.append) {
				length  = element.innerText.length;
				content = element.innerText + content;
			}

			typeChar(content, element, length, i);
		}
	};

	TypeRight.prototype.erase = function () {
		var _this = this, _timeout = [];

		var eraseChar = function (content, element, length, i) {
			if (length === 0) {
				clearTimeout(_timeout[i]);

				if (_this.elements.length === ++i) {
					_this.emit('done', _this);

					if (_this.jqDeferred) {
						_this.jqDeferred.resolve(_this);
					}
				}

				_this.emit('always', _this);
			}
			else {
				element.innerText = content.substr(0, --length);

				_this.emit('progress', _this, length, element);

				if (_this.jqDeferred) {
					_this.jqDeferred.notify(_this, length, element);
				}

				_timeout[i] = setTimeout(function () {
					eraseChar(content, element, length, i);
				}, _this.options.easing ? (_this.options.delay / content.length) * length : _this.options.delay);
			}
		};

		for (var i = 0, len = _this.elements.length; i < len; i++) {
			var element = _this.elements[i];
			var content = element.textContent || element.innerText;
			var length  = content.length;

			eraseChar(content, element, length, i);
		}
	};

	if ($) {
		$.fn.typeRight = function (options, callback) {
			var instance = new TypeRight(this, options, callback);
			return instance.jqDeferred.promise($(this));
		};
	}

	return TypeRight;
}

// transport

if (typeof define === 'function' && define.amd) {
	define(['eventEmitter/EventEmitter'], defineTypeRight);
}
else {
	window.typeRight = defineTypeRight(window.EventEmitter);
}

})(window);
