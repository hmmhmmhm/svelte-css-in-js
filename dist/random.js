"use strict";
exports.__esModule = true;
var nums = "1234567890".split('');
var letters = "abcdefghijklmnopqrstuvwxyz";
var specialChars = "-".split('');
var lowerCaseLetters = letters.split('');
var upperCaseLetters = letters.toUpperCase().split('');
var choices = nums.concat(lowerCaseLetters, upperCaseLetters, specialChars);
/**
 * MIT License
 * Copyright (c) 2019 Elijah Mooring
 *
 * @license MIT
 * @author Elijah Mooring
 * @file https://github.com/Vehmloewff/shineup/blob/master/lib/random.js
 */
exports.randomString = function (length) {
    if (length === void 0) { length = 7; }
    var getChar = function () { return choices[Math.floor(Math.random() * choices.length)]; };
    var chars = "";
    for (var cur = 0; cur < length; cur++)
        chars += getChar();
    return chars;
};
