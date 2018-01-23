"use strict";
/* Vector2.jsx
 * ================
 *
 * Vector utility class
 * Partly based on the Unity vector: https://docs.unity3d.com/ScriptReference/Vector2.html
 * Wraps the Victor library, mainly so we can do type hinting
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-03-15
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2, "epsilon", {
        get: function () {
            return 1E-05;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.distanceSq = function (a, b) {
        return Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2);
    };
    Vector2.distance = function (a, b) {
        return Math.sqrt(Vector2.distanceSq(a, b));
    };
    Vector2.angle = function (a, b) {
        return Math.acos(Math.max(Math.min(Vector2.dot(a.normalize(), b.normalize()), 1), -1)) * 57.29578;
    };
    Vector2.dot = function (lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    };
    // From: http://stackoverflow.com/a/1501725/1983739
    Vector2.distanceFromPointToLineSq = function (p, v, w) {
        var l2 = Vector2.distanceSq(v, w);
        if (l2 === 0)
            return Vector2.distanceSq(p, v);
        var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Vector2.distanceSq(p, new Vector2(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
    };
    Vector2.distanceFromPointToLine = function (p, v, w) {
        return Math.sqrt(Vector2.distanceFromPointToLineSq(p, v, w));
    };
    Vector2.fromArray = function (a) {
        return new Vector2(a[0], a[1]);
    };
    Vector2.fromObject = function (o) {
        return new Vector2(o.x, o.y);
    };
    Vector2.prototype.subtract = function (v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    };
    Vector2.prototype.add = function (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    };
    Vector2.prototype.times = function (n) {
        return new Vector2(this.x * n, this.y * n);
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Object.defineProperty(Vector2.prototype, "magnitude", {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.normalize = function () {
        var magnitude = this.magnitude;
        if (magnitude > 1E-05) {
            return new Vector2(this.x / magnitude, this.y / magnitude);
        }
        else {
            return new Vector2(0, 0);
        }
    };
    Vector2.prototype.normals = function () {
        return [new Vector2(-this.y, this.x), new Vector2(this.y, -this.x)];
    };
    Vector2.prototype.invert = function () {
        return this.times(-1);
    };
    Vector2.prototype.toString = function () {
        return "Vector2<" + this.x + ", " + this.y + ">";
    };
    Vector2.left = new Vector2(-1, 0);
    Vector2.right = new Vector2(1, 0);
    Vector2.up = new Vector2(0, -1);
    Vector2.down = new Vector2(0, -1);
    Vector2.zero = new Vector2(0, 0);
    return Vector2;
}());
exports.default = Vector2;
//# sourceMappingURL=Vector2.js.map