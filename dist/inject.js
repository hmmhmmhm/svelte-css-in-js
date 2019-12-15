"use strict";
exports.__esModule = true;
var ready_1 = require("./ready");
/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/string-to-head.js
 */
exports.inject = function (str, id) {
    ready_1.callOnReady(function () {
        id = id + "-styles";
        var element = document.getElementById(id);
        if (element) {
            element.textContent = str;
            return;
        }
        element = document.createElement("style");
        element.id = id;
        element.textContent = str;
        document.head.appendChild(element);
    });
};
