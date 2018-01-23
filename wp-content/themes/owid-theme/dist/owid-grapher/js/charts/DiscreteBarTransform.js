"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Util_1 = require("./Util");
var ColorSchemes_1 = require("./ColorSchemes");
// Responsible for translating chart configuration into the form
// of a discrete bar chart
var DiscreteBarTransform = /** @class */ (function () {
    function DiscreteBarTransform(chart) {
        this.chart = chart;
    }
    Object.defineProperty(DiscreteBarTransform.prototype, "isValidConfig", {
        get: function () {
            return Util_1.some(this.chart.dimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "failMessage", {
        get: function () {
            var filledDimensions = this.chart.data.filledDimensions;
            if (!Util_1.some(filledDimensions, function (d) { return d.property === 'y'; }))
                return "Missing variable";
            else if (Util_1.isEmpty(this.data))
                return "No matching data";
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "primaryDimension", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === "y"; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "targetYear", {
        get: function () {
            var maxYear = this.chart.timeDomain[1];
            if (!this.primaryDimension)
                return 1900;
            var variable = this.primaryDimension.variable;
            if (maxYear !== undefined)
                return Util_1.sortBy(variable.yearsUniq, function (year) { return Math.abs(year - maxYear); })[0];
            else
                return Util_1.max(variable.yearsUniq);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "barValueFormat", {
        get: function () {
            var _a = this, primaryDimension = _a.primaryDimension, targetYear = _a.targetYear;
            var formatValue = primaryDimension ? primaryDimension.formatValueShort : function (d) { return "" + d; };
            return function (datum) {
                return formatValue(datum.value) + (datum.year !== targetYear ? " (in " + datum.year + ")" : "");
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "tickFormat", {
        get: function () {
            var primaryDimension = this.primaryDimension;
            return primaryDimension ? primaryDimension.formatValueShort : function (d) { return "" + d; };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarTransform.prototype, "data", {
        get: function () {
            var _a = this, chart = _a.chart, targetYear = _a.targetYear;
            var _b = chart.data, filledDimensions = _b.filledDimensions, selectedKeysByKey = _b.selectedKeysByKey;
            var dataByKey = {};
            filledDimensions.forEach(function (dimension, dimIndex) {
                var tolerance = dimension.tolerance;
                for (var i = 0; i < dimension.years.length; i++) {
                    var year = dimension.years[i];
                    var entity = dimension.entities[i];
                    var datakey = chart.data.keyFor(entity, dimIndex);
                    if (year < targetYear - tolerance || year > targetYear + tolerance || !selectedKeysByKey[datakey])
                        continue;
                    var currentDatum = dataByKey[datakey];
                    // Make sure we use the closest value to the target year within tolerance (preferring later)
                    if (currentDatum && Math.abs(currentDatum.year - targetYear) < Math.abs(year - targetYear))
                        continue;
                    var datum = {
                        key: datakey,
                        value: +dimension.values[i],
                        year: year,
                        label: chart.data.formatKey(datakey),
                        color: "#F2585B"
                    };
                    dataByKey[datakey] = datum;
                }
            });
            var data = Util_1.sortBy(Util_1.values(dataByKey), function (d) { return d.value; });
            var colorScheme = chart.baseColorScheme && ColorSchemes_1.default[chart.baseColorScheme];
            var colors = colorScheme ? colorScheme.getColors(data.length) : [];
            if (chart.props.invertColorScheme)
                colors.reverse();
            data.forEach(function (d, i) {
                d.color = chart.data.keyColors[d.key] || colors[i] || d.color;
            });
            return Util_1.sortBy(data, function (d) { return -d.value; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "isValidConfig", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "primaryDimension", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "targetYear", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "barValueFormat", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "tickFormat", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarTransform.prototype, "data", null);
    return DiscreteBarTransform;
}());
exports.default = DiscreteBarTransform;
//# sourceMappingURL=DiscreteBarTransform.js.map