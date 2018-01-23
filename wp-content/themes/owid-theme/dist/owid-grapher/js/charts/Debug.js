"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bounds_1 = require("./Bounds");
var ColorSchemes_1 = require("./ColorSchemes");
var colorbrewer = require('colorbrewer');
// This module handles exposing various libraries to the console
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.expose = function () {
        window.Bounds = Bounds_1.default;
        window.ColorSchemes = ColorSchemes_1.default;
        window.colorbrewer = colorbrewer;
    };
    return Debug;
}());
exports.default = Debug;
//# sourceMappingURL=Debug.js.map