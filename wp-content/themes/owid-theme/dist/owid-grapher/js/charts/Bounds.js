"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Vector2_1 = require("./Vector2");
var pixelWidth = require('string-pixel-width');
var Bounds = /** @class */ (function () {
    function Bounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Bounds.fromProps = function (props) {
        var x = props.x, y = props.y, width = props.width, height = props.height;
        return new Bounds(x, y, width, height);
    };
    Bounds.fromBBox = function (bbox) {
        return this.fromProps(bbox);
    };
    Bounds.fromRect = function (rect) {
        return new Bounds(rect.left, rect.top, rect.width, rect.height);
    };
    Bounds.fromElement = function (el) {
        return Bounds.fromRect(el.getBoundingClientRect());
    };
    Bounds.fromCorners = function (p1, p2) {
        var x1 = Math.min(p1.x, p2.x);
        var x2 = Math.max(p1.x, p2.x);
        var y1 = Math.min(p1.y, p2.y);
        var y2 = Math.max(p1.y, p2.y);
        return new Bounds(x1, y1, x2 - x1, y2 - y1);
    };
    Bounds.empty = function () {
        return new Bounds(0, 0, 0, 0);
    };
    Bounds.forText = function (str, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d, _e = _b.fontSize, fontSize = _e === void 0 ? 16 : _e;
        var key = str + "-" + fontSize;
        var bounds = this.textBoundsCache[key];
        if (bounds) {
            if (bounds.x === x && bounds.y === y - bounds.height)
                return bounds;
            else
                return bounds.extend({ x: x, y: y - bounds.height });
        }
        if (str === "")
            bounds = Bounds.empty();
        else {
            var width = pixelWidth(str, { font: "Arial", size: fontSize });
            var height = fontSize;
            bounds = new Bounds(x, y - height, width, height);
        }
        this.textBoundsCache[key] = bounds;
        return bounds;
    };
    Object.defineProperty(Bounds.prototype, "left", {
        get: function () { return this.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "top", {
        get: function () { return this.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "right", {
        get: function () { return this.x + this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "bottom", {
        get: function () { return this.y + this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "centerX", {
        get: function () { return this.x + this.width / 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "centerY", {
        get: function () { return this.y + this.height / 2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "topLeft", {
        get: function () { return new Vector2_1.default(this.left, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "topRight", {
        get: function () { return new Vector2_1.default(this.right, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "bottomLeft", {
        get: function () { return new Vector2_1.default(this.left, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "bottomRight", {
        get: function () { return new Vector2_1.default(this.right, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Bounds.prototype.padLeft = function (amount) {
        return new Bounds(this.x + amount, this.y, this.width - amount, this.height);
    };
    Bounds.prototype.padRight = function (amount) {
        return new Bounds(this.x, this.y, this.width - amount, this.height);
    };
    Bounds.prototype.padBottom = function (amount) {
        return new Bounds(this.x, this.y, this.width, this.height - amount);
    };
    Bounds.prototype.padTop = function (amount) {
        return new Bounds(this.x, this.y + amount, this.width, this.height - amount);
    };
    Bounds.prototype.padWidth = function (amount) {
        return new Bounds(this.x + amount, this.y, this.width - amount * 2, this.height);
    };
    Bounds.prototype.padHeight = function (amount) {
        return new Bounds(this.x, this.y + amount, this.width, this.height - amount * 2);
    };
    Bounds.prototype.fromLeft = function (amount) {
        return this.padRight(this.width - amount);
    };
    Bounds.prototype.fromBottom = function (amount) {
        return this.padTop(this.height - amount);
    };
    Bounds.prototype.pad = function (amount) {
        return new Bounds(this.x + amount, this.y + amount, this.width - amount * 2, this.height - amount * 2);
    };
    Bounds.prototype.extend = function (props) {
        return Bounds.fromProps(Util_1.extend({}, this, props));
    };
    Bounds.prototype.scale = function (scale) {
        return new Bounds(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    };
    Bounds.prototype.intersects = function (otherBounds) {
        var r1 = this;
        var r2 = otherBounds;
        return !(r2.left > r1.right || r2.right < r1.left ||
            r2.top > r1.bottom || r2.bottom < r1.top);
    };
    Bounds.prototype.lines = function () {
        return [
            [this.topLeft, this.topRight],
            [this.topRight, this.bottomRight],
            [this.bottomRight, this.bottomLeft],
            [this.bottomLeft, this.topLeft]
        ];
    };
    Bounds.prototype.boundedPoint = function (p) {
        return new Vector2_1.default(Math.max(Math.min(p.x, this.right), this.left), Math.max(Math.min(p.y, this.bottom), this.top));
    };
    Bounds.prototype.containsPoint = function (x, y) {
        return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
    };
    Bounds.prototype.contains = function (p) {
        return this.containsPoint(p.x, p.y);
    };
    Bounds.prototype.encloses = function (bounds) {
        return this.containsPoint(bounds.left, bounds.top) && this.containsPoint(bounds.left, bounds.bottom) && this.containsPoint(bounds.right, bounds.top) && this.containsPoint(bounds.right, bounds.bottom);
    };
    Bounds.prototype.toCSS = function () {
        return { left: this.left + "px", top: this.top + "px", width: this.width + "px", height: this.height + "px" };
    };
    Bounds.prototype.toProps = function () {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    };
    Bounds.prototype.xRange = function () {
        return [this.left, this.right];
    };
    Bounds.prototype.yRange = function () {
        return [this.bottom, this.top];
    };
    Bounds.prototype.equals = function (bounds) {
        return this.x === bounds.x && this.y === bounds.y && this.width === bounds.width && this.height === bounds.height;
    };
    Bounds.textBoundsCache = {};
    Bounds.baseFontFamily = "Helvetica, Arial";
    return Bounds;
}());
exports.default = Bounds;
//# sourceMappingURL=Bounds.js.map