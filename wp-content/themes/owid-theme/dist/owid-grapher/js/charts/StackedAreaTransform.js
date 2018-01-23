"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var d3_scale_1 = require("d3-scale");
var Util_1 = require("./Util");
var ColorSchemes_1 = require("./ColorSchemes");
var Util_2 = require("./Util");
// Responsible for translating chart configuration into the form
// of a stacked area chart
var StackedAreaTransform = /** @class */ (function () {
    function StackedAreaTransform(chart) {
        this.chart = chart;
    }
    Object.defineProperty(StackedAreaTransform.prototype, "isValidConfig", {
        get: function () {
            return Util_1.some(this.chart.dimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "failMessage", {
        get: function () {
            var filledDimensions = this.chart.data.filledDimensions;
            if (!Util_1.some(filledDimensions, function (d) { return d.property === 'y'; }))
                return "Missing Y axis variable";
            else if (Util_1.isEmpty(this.groupedData))
                return "No matching data";
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "initialData", {
        // Get the data for all years, before any time filtering
        get: function () {
            var chart = this.chart;
            var _a = chart.data, filledDimensions = _a.filledDimensions, selectedKeysByKey = _a.selectedKeysByKey;
            var chartData = [];
            filledDimensions.forEach(function (dimension, dimIndex) {
                var seriesByKey = new Map();
                for (var i = 0; i < dimension.years.length; i++) {
                    var year = dimension.years[i];
                    var value = +dimension.values[i];
                    var entity = dimension.entities[i];
                    var datakey = chart.data.keyFor(entity, dimIndex);
                    var series = seriesByKey.get(datakey);
                    // Not a selected key, don't add any data for it
                    if (!selectedKeysByKey[datakey])
                        continue;
                    // Must be numeric
                    if (isNaN(value))
                        continue;
                    // Stacked area chart can't go negative!
                    if (value < 0)
                        continue;
                    if (!series) {
                        series = {
                            values: [],
                            key: datakey,
                            isProjection: dimension.isProjection,
                            color: "#fff" // tmp
                        };
                        seriesByKey.set(datakey, series);
                    }
                    series.values.push({ x: year, y: value, time: year });
                }
                chartData = chartData.concat(Array.from(seriesByKey.values()).slice());
            });
            return chartData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "timelineYears", {
        get: function () {
            var allYears = [];
            this.initialData.forEach(function (g) { return allYears.push.apply(allYears, g.values.map(function (d) { return d.x; })); });
            return Util_1.sortedUniq(Util_1.sortBy(allYears));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "minTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.min(this.timelineYears), 1900);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "maxTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.max(this.timelineYears), 2000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "startYear", {
        get: function () {
            var minYear = Util_2.defaultTo(this.chart.timeDomain[0], this.minTimelineYear);
            return Util_2.defaultTo(Util_2.findClosest(this.timelineYears, minYear), this.minTimelineYear);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "endYear", {
        get: function () {
            var maxYear = Util_2.defaultTo(this.chart.timeDomain[1], this.maxTimelineYear);
            return Util_2.defaultTo(Util_2.findClosest(this.timelineYears, maxYear), this.maxTimelineYear);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "canToggleRelative", {
        get: function () {
            return !this.chart.props.hideRelativeToggle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "isRelative", {
        // Stacked area may display in either absolute or relative mode
        get: function () {
            return this.chart.props.stackMode === 'relative';
        },
        set: function (value) {
            this.chart.props.stackMode = value ? 'relative' : 'absolute';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "colorScheme", {
        get: function () {
            //return ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]
            var colorScheme = ColorSchemes_1.default[this.chart.props.baseColorScheme];
            return colorScheme !== undefined ? colorScheme : ColorSchemes_1.default["stackedAreaDefault"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "baseColors", {
        get: function () {
            var colors = this.colorScheme.getColors(this.initialData.length);
            if (this.chart.props.invertColorScheme)
                colors.reverse();
            return colors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "groupedData", {
        get: function () {
            var _a = this, chart = _a.chart, startYear = _a.startYear, endYear = _a.endYear;
            var selectedKeys = chart.data.selectedKeys;
            var groupedData = Util_1.cloneDeep(this.initialData);
            groupedData.forEach(function (series) {
                series.values = series.values.filter(function (d) { return d.x >= startYear && d.x <= endYear; });
            });
            // Ensure that every series has a value entry for every year in the data
            var allYears = [];
            groupedData.forEach(function (series) { return allYears.push.apply(allYears, series.values.map(function (d) { return d.x; })); });
            allYears = Util_1.sortedUniq(Util_1.sortBy(allYears));
            groupedData.forEach(function (series) {
                var i = 0;
                var isBeforeStart = true;
                while (i < allYears.length) {
                    var value = series.values[i];
                    var expectedYear = allYears[i];
                    if (value === undefined || value.x > allYears[i]) {
                        var fakeY = 0;
                        if (!isBeforeStart && i < series.values.length) {
                            // Missing data in the middle-- interpolate a value
                            var prevValue = series.values[i - 1];
                            var nextValue = series.values[i];
                            fakeY = (nextValue.y + prevValue.y) / 2;
                        }
                        series.values.splice(i, 0, { x: expectedYear, y: fakeY, time: expectedYear, isFake: true });
                    }
                    else {
                        isBeforeStart = false;
                    }
                    i += 1;
                }
            });
            // Preserve order
            groupedData = Util_1.sortBy(groupedData, function (series) { return -selectedKeys.indexOf(series.key); });
            // Assign colors
            var colorScale = d3_scale_1.scaleOrdinal(this.baseColors);
            groupedData.forEach(function (series) {
                series.color = chart.data.keyColors[series.key] || colorScale(series.key);
            });
            // In relative mode, transform data to be a percentage of the total for that year
            if (this.isRelative) {
                if (groupedData.length === 0)
                    return [];
                var _loop_1 = function (i) {
                    var total = Util_1.sum(groupedData.map(function (series) { return series.values[i].y; }));
                    for (var j = 0; j < groupedData.length; j++) {
                        groupedData[j].values[i].y = total === 0 ? 0 : (groupedData[j].values[i].y / total) * 100;
                    }
                };
                for (var i = 0; i < groupedData[0].values.length; i++) {
                    _loop_1(i);
                }
            }
            return groupedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "xDomainDefault", {
        get: function () {
            return [this.startYear, this.endYear];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "stackedData", {
        get: function () {
            var groupedData = this.groupedData;
            if (Util_1.some(groupedData, function (series) { return series.values.length !== groupedData[0].values.length; }))
                throw new Error("Unexpected variation in stacked area chart series: " + groupedData.map(function (series) { return series.values.length; }));
            var stackedData = Util_1.cloneDeep(groupedData);
            for (var i = 1; i < stackedData.length; i++) {
                for (var j = 0; j < stackedData[0].values.length; j++) {
                    stackedData[i].values[j].y += stackedData[i - 1].values[j].y;
                }
            }
            return stackedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "allStackedValues", {
        get: function () {
            var allValues = [];
            this.stackedData.forEach(function (series) { return allValues.push.apply(allValues, series.values); });
            return allValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "yDomainDefault", {
        get: function () {
            var yValues = this.allStackedValues.map(function (d) { return d.y; });
            return [
                0,
                Util_2.defaultTo(Util_1.max(yValues), 100)
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "xAxis", {
        get: function () {
            var _a = this, chart = _a.chart, xDomainDefault = _a.xDomainDefault;
            return Util_1.extend(chart.xAxis.toSpec({ defaultDomain: xDomainDefault }), { tickFormat: function (year) { return Util_2.formatYear(year); },
                hideFractionalTicks: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "yDimensionFirst", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaTransform.prototype, "yAxis", {
        get: function () {
            var _a = this, chart = _a.chart, yDomainDefault = _a.yDomainDefault, isRelative = _a.isRelative, yDimensionFirst = _a.yDimensionFirst;
            var tickFormat = yDimensionFirst ? yDimensionFirst.formatValueShort : Util_1.identity;
            return Util_1.extend(chart.yAxis.toSpec({ defaultDomain: yDomainDefault }), {
                domain: isRelative ? [0, 100] : [yDomainDefault[0], yDomainDefault[1]],
                tickFormat: isRelative ? function (v) { return Util_2.formatValue(v, { unit: "%" }); } : tickFormat
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "isValidConfig", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "initialData", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "timelineYears", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "minTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "maxTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "startYear", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "endYear", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "canToggleRelative", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "isRelative", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "colorScheme", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "baseColors", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "groupedData", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "xDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "stackedData", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "allStackedValues", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "yDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "yDimensionFirst", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaTransform.prototype, "yAxis", null);
    return StackedAreaTransform;
}());
exports.default = StackedAreaTransform;
//# sourceMappingURL=StackedAreaTransform.js.map