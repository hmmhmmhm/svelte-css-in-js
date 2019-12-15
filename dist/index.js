"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var random_1 = require("./random");
var ready_1 = require("./ready");
var styles_1 = require("./styles");
var deepmerge_1 = __importDefault(require("deepmerge"));
exports.makeCSS = function (_a) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.theme, theme = _c === void 0 ? {} : _c, svelte = _a.svelte;
    if (!svelte || !svelte.afterUpdate)
        return;
    var cssId = "svelte-" + random_1.randomString(7);
    var css = {};
    var applyCSS = function () {
        ready_1.ready();
        var mergedStyle = deepmerge_1["default"](style, theme);
        css = styles_1.createStyles(JSON.parse(JSON.stringify(mergedStyle)), cssId);
    };
    applyCSS();
    svelte.afterUpdate(applyCSS);
    return css;
};
exports["default"] = exports.makeCSS;
