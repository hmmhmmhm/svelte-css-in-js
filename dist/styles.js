"use strict";
/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/attach-styles.js
 */
exports.__esModule = true;
var inject_1 = require("./inject");
var parse_1 = require("./parse");
var css_in_js_utils_1 = require("css-in-js-utils");
exports.attachStyles = function (styles, key) {
    if (styles === void 0) { styles = {}; }
    if (!styles || typeof styles !== "object")
        throw new Error("'styles' must be a defined object.");
    if (!key || typeof key !== "string" || key.length < 1)
        throw new Error("'key' must be a defined string and not be empty.");
    inject_1.inject((function () {
        var str = "";
        Object.keys(styles).forEach(function (key) {
            str += key + "{" + css_in_js_utils_1.cssifyObject(styles[key]) + "}";
        });
        return str;
    })(), key);
};
exports.createStyles = function (obj, key) {
    if (obj === void 0) { obj = {}; }
    if (key === void 0) { key = 'svelte'; }
    var _a = parse_1.parse(obj, key), css = _a.css, classes = _a.classes;
    var newParsed = {};
    var length = 0;
    for (var className in css) {
        var selector = "." + key + className;
        newParsed[selector] = css[className];
        length++;
    }
    classes.get = function (className) { return classes[className]; };
    exports.attachStyles(newParsed, key);
    if (length === 1 && classes["default"])
        return classes["default"];
    else
        return classes;
};
