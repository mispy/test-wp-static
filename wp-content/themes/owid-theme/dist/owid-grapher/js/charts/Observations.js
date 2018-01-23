"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var Observations = /** @class */ (function () {
    function Observations(data) {
        this.data = data;
    }
    Observations.prototype.mergeBy = function (key, mergeFMaybe) {
        var mergeF = mergeFMaybe || (function (rows) {
            var merged = {};
            rows.each(function (row) {
                Util_1.extend(merged, row);
            });
            return merged;
        });
        return new Observations(Util_1.map(Util_1.groupBy(this.data, function (d) { return d[key]; }), function (arr, k) { return mergeF(new Observations(arr), k); }));
    };
    Observations.prototype.sortBy = function (sortF) {
        return new Observations(Util_1.sortBy(this.data, sortF));
    };
    Observations.prototype.filter = function (filterF) {
        return new Observations(Util_1.filter(this.data, filterF));
    };
    Observations.prototype.map = function (mapF) {
        return new Observations(Util_1.map(this.data, mapF));
    };
    Observations.prototype.each = function (eachF) {
        Util_1.each(this.data, eachF);
    };
    Observations.prototype.minValue = function (key) {
        return Util_1.min(Util_1.map(this.data, key));
    };
    Observations.prototype.maxValue = function (key) {
        return Util_1.max(Util_1.map(this.data, key));
    };
    Observations.prototype.first = function (key) {
        if (key == null)
            return Util_1.first(this.data);
        else
            return (Util_1.find(this.data, function (d) { return d[key] !== undefined; }) || {})[key];
    };
    Observations.prototype.last = function (key) {
        if (key == null)
            return Util_1.last(this.data);
        else
            return undefined;
        //		else
        //			return (find(this.data, (d) => d[key] !== undefined)||{})[key]
    };
    Observations.prototype.toArray = function () {
        return this.data;
    };
    Observations.prototype.pluck = function (key) {
        return Util_1.map(this.data, key);
    };
    return Observations;
}());
exports.default = Observations;
//# sourceMappingURL=Observations.js.map