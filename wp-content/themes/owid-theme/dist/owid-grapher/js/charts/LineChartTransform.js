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
var Util_2 = require("./Util");
var ColorSchemes_1 = require("./ColorSchemes");
// Responsible for translating chart configuration into the form
// of a line chart
var LineChartTransform = /** @class */ (function () {
    function LineChartTransform(chart) {
        this.chart = chart;
    }
    Object.defineProperty(LineChartTransform.prototype, "isValidConfig", {
        get: function () {
            return Util_1.some(this.chart.dimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "failMessage", {
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
    Object.defineProperty(LineChartTransform.prototype, "colorScheme", {
        get: function () {
            var colorScheme = ColorSchemes_1.default[this.chart.props.baseColorScheme];
            return colorScheme !== undefined ? colorScheme : ColorSchemes_1.default["owid-distinct"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "initialData", {
        get: function () {
            var chart = this.chart;
            var yAxis = chart.yAxis;
            var _a = chart.data, filledDimensions = _a.filledDimensions, selectedKeys = _a.selectedKeys, selectedKeysByKey = _a.selectedKeysByKey;
            var chartData = [];
            filledDimensions.forEach(function (dimension, dimIndex) {
                var seriesByKey = new Map();
                for (var i = 0; i < dimension.years.length; i++) {
                    var year = dimension.years[i];
                    var value = parseFloat(dimension.values[i]);
                    var entity = dimension.entities[i];
                    var datakey = chart.data.keyFor(entity, dimIndex);
                    var series = seriesByKey.get(datakey);
                    // Not a selected key, don't add any data for it
                    if (!selectedKeysByKey[datakey])
                        continue;
                    // Can't have values <= 0 on log scale
                    if (value <= 0 && yAxis.scaleType === 'log')
                        continue;
                    if (!series) {
                        series = {
                            values: [],
                            key: datakey,
                            isProjection: dimension.isProjection,
                            formatValue: dimension.formatValueLong,
                            color: "#000" // tmp
                        };
                        seriesByKey.set(datakey, series);
                    }
                    series.values.push({ x: year, y: value, time: year, gapYearsToNext: 0 });
                }
                chartData = chartData.concat(Array.from(seriesByKey.values()).slice());
            });
            // Color from lowest to highest
            chartData = Util_1.sortBy(chartData, function (series) { return series.values[series.values.length - 1].y; });
            var colors = this.colorScheme.getColors(chartData.length);
            if (this.chart.props.invertColorScheme)
                colors.reverse();
            chartData.forEach(function (series, i) {
                series.color = chart.data.keyColors[series.key] || colors[i];
            });
            // Preserve the original ordering for render. Note for line charts, the series order only affects the visual stacking order on overlaps.
            chartData = Util_1.sortBy(chartData, function (series) { return selectedKeys.indexOf(series.key); });
            return chartData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "timelineYears", {
        get: function () {
            var allYears = [];
            this.initialData.forEach(function (g) { return allYears.push.apply(allYears, g.values.map(function (d) { return d.x; })); });
            return Util_1.sortedUniq(Util_1.sortBy(allYears));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "minTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.min(this.timelineYears), 1900);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "maxTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.max(this.timelineYears), 2000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "startYear", {
        get: function () {
            var minYear = Util_2.defaultTo(this.chart.timeDomain[0], this.minTimelineYear);
            return Util_2.defaultTo(Util_2.findClosest(this.timelineYears, minYear), this.minTimelineYear);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "endYear", {
        get: function () {
            var maxYear = Util_2.defaultTo(this.chart.timeDomain[1], this.maxTimelineYear);
            return Util_2.defaultTo(Util_2.findClosest(this.timelineYears, maxYear), this.maxTimelineYear);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "allValues", {
        get: function () {
            var allValues = [];
            this.initialData.forEach(function (series) { return allValues.push.apply(allValues, series.values); });
            return allValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "xDomain", {
        get: function () {
            return [this.startYear, this.endYear];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "xAxis", {
        get: function () {
            var xDomain = this.xDomain;
            return {
                label: "",
                tickFormat: Util_2.formatYear,
                domain: xDomain,
                scaleType: 'linear',
                scaleTypeOptions: ['linear'],
                hideFractionalTicks: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "yDimensionFirst", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "yDomainDefault", {
        get: function () {
            var yValues = this.allValues.map(function (v) { return v.y; });
            return [
                Util_2.defaultTo(Util_1.min(yValues), 0),
                Util_2.defaultTo(Util_1.max(yValues), 100)
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "yDomain", {
        get: function () {
            var _a = this, chart = _a.chart, yDomainDefault = _a.yDomainDefault;
            return [
                Math.min(Util_2.defaultTo(chart.yAxis.domain[0], Infinity), yDomainDefault[0]),
                Math.max(Util_2.defaultTo(chart.yAxis.domain[1], -Infinity), yDomainDefault[1])
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "yAxis", {
        get: function () {
            var _a = this, chart = _a.chart, yDomain = _a.yDomain, yDimensionFirst = _a.yDimensionFirst;
            return {
                label: "",
                tickFormat: yDimensionFirst ? yDimensionFirst.formatValueShort : Util_1.identity,
                domain: yDomain,
                scaleType: chart.yAxis.scaleType,
                scaleTypeOptions: chart.yAxis.scaleTypeOptions
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChartTransform.prototype, "groupedData", {
        // Filter the data so it fits within the domains
        get: function () {
            var _a = this, initialData = _a.initialData, xAxis = _a.xAxis, yAxis = _a.yAxis;
            var groupedData = Util_1.cloneDeep(initialData);
            groupedData.forEach(function (g) {
                g.values = g.values.filter(function (d) { return d.x >= xAxis.domain[0] && d.x <= xAxis.domain[1] && d.y >= yAxis.domain[0] && d.y <= yAxis.domain[1]; });
            });
            return groupedData.filter(function (g) { return g.values.length > 0; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "isValidConfig", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "colorScheme", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "initialData", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "timelineYears", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "minTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "maxTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "startYear", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "endYear", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "allValues", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "xDomain", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "yDimensionFirst", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "yDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "yDomain", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "yAxis", null);
    __decorate([
        mobx_1.computed
    ], LineChartTransform.prototype, "groupedData", null);
    return LineChartTransform;
}());
exports.default = LineChartTransform;
//# sourceMappingURL=LineChartTransform.js.map