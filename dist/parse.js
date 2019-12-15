"use strict";
/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/parsejs.js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var flat_1 = __importDefault(require("flat"));
exports.isLayered = function (obj) {
    var layerFound = false;
    for (var possibleLayer in obj) {
        if (!/^\$/.test(possibleLayer) && typeof obj[possibleLayer] === "object") {
            layerFound = true;
            break;
        }
    }
    return layerFound;
};
exports.addDotToClassName = function (className) {
    if (!/^(\.|\$)/.test(className))
        return "." + className;
    else
        return className;
};
exports.getParent = function (obj, delimiter) {
    var returnObj = {};
    Object.keys(obj).forEach(function (key) {
        var roots = key.split(delimiter);
        var root = roots[roots.length - 1];
        returnObj[root] = obj[key];
    });
    return returnObj;
};
exports.flattenObjectChildren = function (obj, id) {
    var delimiter = "|";
    var savedObject = obj;
    var callAllFunctions = function (obj) {
        var funcsExist = true;
        var callVisibileFunctions = function (obj) {
            funcsExist = false;
            var _loop_1 = function (key) {
                if (typeof obj[key] === "function") {
                    var rootKeys = key.split(delimiter);
                    var lastKey = rootKeys.pop();
                    var className = rootKeys[0].replace(/^\./, "");
                    var res_1 = obj[key]({
                        obj: savedObject,
                        parent: exports.getParent(obj, delimiter),
                        key: lastKey,
                        id: id,
                        className: className,
                        querySelector: "." + id + "." + className
                    });
                    // If last key starts with '&'...
                    if (lastKey && /^&/.test(lastKey)) {
                        // Spread it over the parent
                        delete obj[key];
                        if (typeof res_1 !== "object")
                            throw new Error("The value of all keys starting with an '&' symbol of type 'function' must return an object.");
                        var rootKey_1 = rootKeys.join(delimiter);
                        Object.keys(res_1).forEach(function (newKey) {
                            obj[rootKey_1 + "|" + newKey] = res_1[newKey];
                        });
                    }
                    // Otherwise
                    else {
                        // Carry on
                        obj[key] = res_1;
                    }
                    funcsExist = true;
                }
            };
            for (var key in obj) {
                _loop_1(key);
            }
            return obj;
        };
        while (funcsExist)
            obj = callVisibileFunctions(flat_1["default"](obj, { delimiter: delimiter }));
        return obj;
    };
    var changeKey = function (key) {
        var levels = key.split("|");
        var highestLevel = levels.pop();
        return levels.join("").replace(/\$/g, " ") + "|" + highestLevel;
    };
    var flatObj = callAllFunctions(obj);
    var newObj = {};
    for (var key in flatObj) {
        var value = flatObj[key];
        key = changeKey(key);
        newObj[key] = value;
    }
    return flat_1["default"].unflatten(newObj, { delimiter: delimiter });
};
exports.parse = function (obj, id) {
    if (obj === void 0) { obj = {}; }
    if (id === void 0) { id = 'svelte'; }
    var _a;
    // Check the types
    if (typeof obj !== "object")
        throw new Error("The first paramater must be of type 'object'.  Recieved type '" + typeof obj + "';");
    if (typeof id !== "string")
        throw new Error("The second paramater must be of type 'string'.  Recieved type '" + typeof id + "';");
    if (JSON.stringify(obj) === "{}")
        return { css: {}, classes: {} };
    // All the types are valid.  Carry on.
    if (!exports.isLayered(obj)) {
        var defaultName = "default";
        var defaultCSS = (_a = {}, _a[defaultName] = {}, _a);
        defaultCSS[defaultName] = obj;
        obj = defaultCSS;
    }
    var classes = {};
    for (var className in obj) {
        var dottedClassname = exports.addDotToClassName(className);
        obj[dottedClassname] = obj[className];
        classes[className] = id + " " + className;
        delete obj[className];
    }
    var css = exports.flattenObjectChildren(obj, id);
    return { css: css, classes: classes };
};
