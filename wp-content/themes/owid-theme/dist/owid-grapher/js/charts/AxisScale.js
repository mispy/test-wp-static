"use strict";
/* AxisScale.ts
 * ================
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-02-11
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_scale_1 = require("d3-scale");
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var AxisScale = /** @class */ (function () {
    function AxisScale(_a) {
        var _b = _a.scaleType, scaleType = _b === void 0 ? 'linear' : _b, _c = _a.scaleTypeOptions, scaleTypeOptions = _c === void 0 ? ['linear'] : _c, _d = _a.tickFormat, tickFormat = _d === void 0 ? (function (d) { return d.toString(); }) : _d, _e = _a.domain, domain = _e === void 0 ? [0, 0] : _e, _f = _a.range, range = _f === void 0 ? [0, 0] : _f, _g = _a.hideFractionalTicks, hideFractionalTicks = _g === void 0 ? false : _g;
        this.scaleType = scaleType;
        this.scaleTypeOptions = scaleTypeOptions;
        this.tickFormat = tickFormat;
        this.domain = domain;
        this.range = range;
        this.hideFractionalTicks = hideFractionalTicks;
    }
    Object.defineProperty(AxisScale.prototype, "d3_scaleConstructor", {
        get: function () {
            return this.scaleType === 'log' ? d3_scale_1.scaleLog : d3_scale_1.scaleLinear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisScale.prototype, "d3_scale", {
        get: function () {
            return this.d3_scaleConstructor().domain(this.domain).range(this.range);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisScale.prototype, "rangeSize", {
        get: function () {
            return Math.abs(this.range[1] - this.range[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisScale.prototype, "rangeMax", {
        get: function () {
            return Math.max(this.range[1], this.range[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisScale.prototype, "rangeMin", {
        get: function () {
            return Math.min(this.range[1], this.range[0]);
        },
        enumerable: true,
        configurable: true
    });
    AxisScale.prototype.getTickValues = function () {
        var _a = this, scaleType = _a.scaleType, domain = _a.domain, d3_scale = _a.d3_scale;
        var ticks = [];
        if (scaleType === 'log') {
            var minPower10 = Math.ceil(Math.log(domain[0]) / Math.log(10));
            if (!isFinite(minPower10))
                minPower10 = 0;
            var maxPower10 = Math.floor(Math.log(domain[1]) / Math.log(10));
            if (maxPower10 <= minPower10)
                maxPower10 += 1;
            for (var i = minPower10; i <= maxPower10; i++) {
                ticks.push(Math.pow(10, i));
            }
        }
        else {
            ticks = d3_scale.ticks(6);
        }
        if (this.hideFractionalTicks)
            ticks = ticks.filter(function (t) { return t % 1 === 0; });
        return ticks;
    };
    AxisScale.prototype.getFormattedTicks = function () {
        return Util_1.map(this.getTickValues(), this.tickFormat);
    };
    AxisScale.prototype.place = function (value) {
        if (!this.range) {
            console.error("Can't place value on scale without a defined output range");
            return value;
        }
        else if (this.scaleType === 'log' && value <= 0) {
            console.error("Can't have values <= 0 on a log scale");
            return value;
        }
        return parseFloat(this.d3_scale(value).toFixed(1));
    };
    AxisScale.prototype.extend = function (props) {
        return new AxisScale(Util_1.extend(mobx_1.toJS(this), props));
    };
    __decorate([
        mobx_1.observable
    ], AxisScale.prototype, "scaleType", void 0);
    __decorate([
        mobx_1.observable.struct
    ], AxisScale.prototype, "scaleTypeOptions", void 0);
    __decorate([
        mobx_1.observable
    ], AxisScale.prototype, "tickFormat", void 0);
    __decorate([
        mobx_1.observable.struct
    ], AxisScale.prototype, "domain", void 0);
    __decorate([
        mobx_1.observable.struct
    ], AxisScale.prototype, "range", void 0);
    __decorate([
        mobx_1.observable
    ], AxisScale.prototype, "hideFractionalTicks", void 0);
    __decorate([
        mobx_1.computed
    ], AxisScale.prototype, "d3_scaleConstructor", null);
    __decorate([
        mobx_1.computed
    ], AxisScale.prototype, "d3_scale", null);
    __decorate([
        mobx_1.computed
    ], AxisScale.prototype, "rangeSize", null);
    __decorate([
        mobx_1.computed
    ], AxisScale.prototype, "rangeMax", null);
    __decorate([
        mobx_1.computed
    ], AxisScale.prototype, "rangeMin", null);
    return AxisScale;
}());
exports.default = AxisScale;
//# sourceMappingURL=AxisScale.js.map