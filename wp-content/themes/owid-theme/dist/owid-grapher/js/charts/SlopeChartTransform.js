"use strict";
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
var Util_2 = require("./Util");
var Observations_1 = require("./Observations");
var Util_3 = require("./Util");
var ColorSchemes_1 = require("./ColorSchemes");
// Responsible for translating chart configuration into the form
// of a line chart
var SlopeChartTransform = /** @class */ (function () {
    function SlopeChartTransform(chart) {
        this.chart = chart;
    }
    Object.defineProperty(SlopeChartTransform.prototype, "isValidConfig", {
        get: function () {
            return Util_1.some(this.chart.dimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "failMessage", {
        get: function () {
            var filledDimensions = this.chart.data.filledDimensions;
            if (!Util_1.some(filledDimensions, function (d) { return d.property === 'y'; }))
                return "Missing Y axis variable";
            else if (Util_1.isEmpty(this.data))
                return "No matching data";
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "timelineYears", {
        get: function () {
            return Util_1.union.apply(void 0, this.chart.data.axisDimensions.map(function (d) { return d.variable.yearsUniq; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "minTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.min(this.timelineYears), 1900);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "maxTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.max(this.timelineYears), 2000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "startYear", {
        get: function () {
            var _this = this;
            var minYear = Util_2.defaultWith(this.chart.timeDomain[0], function () { return _this.minTimelineYear; });
            return Util_2.defaultWith(Util_2.findClosest(this.timelineYears, minYear), function () { return _this.minTimelineYear; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "endYear", {
        get: function () {
            var _this = this;
            var maxYear = Util_2.defaultWith(this.chart.timeDomain[1], function () { return _this.maxTimelineYear; });
            return Util_2.defaultWith(Util_2.findClosest(this.timelineYears, maxYear), function () { return _this.maxTimelineYear; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "xDomain", {
        get: function () {
            return [this.startYear, this.endYear];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "sizeDim", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'size'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "colorDim", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'color'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "yDimension", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "variableData", {
        get: function () {
            var filledDimensions = this.chart.data.filledDimensions;
            var obvs = [];
            filledDimensions.forEach(function (v) {
                for (var i = 0; i < v.years.length; i++) {
                    var d = { year: v.years[i], entity: v.entities[i] };
                    d[v.variable.id] = v.values[i];
                    obvs.push(d);
                }
            });
            return new Observations_1.default(obvs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "defaultColors", {
        get: function () {
            return [
                "#5675c1",
                "#aec7e8",
                "#d14e5b",
                "#ffd336",
                "#4d824b",
                "#a652ba",
                "#69c487",
                "#ff7f0e", "#1f77b4", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "c49c94", "e377c2", "f7b6d2", "7f7f7f", "c7c7c7", "bcbd22", "dbdb8d", "17becf", "9edae5", "1f77b4"
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "colorScheme", {
        get: function () {
            var baseColorScheme = this.chart.baseColorScheme;
            var colorDim = this.colorDim;
            var colorScheme = baseColorScheme && ColorSchemes_1.default[baseColorScheme];
            if (!colorScheme)
                return this.defaultColors;
            else if (!colorDim)
                return colorScheme.getColors(4);
            else
                return colorScheme.getColors(colorDim.variable.categoricalValues.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "colorScale", {
        get: function () {
            var colorDim = this.chart.data.dimensionsByField['color'];
            var colorScale = d3_scale_1.scaleOrdinal(this.colorScheme);
            if (colorDim) {
                colorScale.domain(colorDim.variable.categoricalValues);
            }
            return colorScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "yTickFormat", {
        get: function () {
            return this.yDimension ? this.yDimension.formatValueShort : function (d) { return "" + d; };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlopeChartTransform.prototype, "data", {
        get: function () {
            if (!this.yDimension)
                return [];
            var _a = this, variableData = _a.variableData, sizeDim = _a.sizeDim, yDimension = _a.yDimension, xDomain = _a.xDomain, colorDim = _a.colorDim, colorScale = _a.colorScale;
            var data = variableData;
            var entityKey = this.chart.vardata.entityMetaByKey;
            // Make sure we're using time bounds that actually contain data
            var longestRange = data.filter(function (d) { return isFinite(d[yDimension.variable.id]); })
                .mergeBy('entity', function (rows) { return rows.pluck('year'); })
                .sortBy(function (d) { return Util_3.last(d) - Util_3.first(d); })
                .last();
            var minYear = Math.max(xDomain[0] || -Infinity, Util_3.first(longestRange));
            var maxYear = Math.min(xDomain[1] || Infinity, Util_3.last(longestRange));
            data = data.mergeBy('entity', function (rows, entity) {
                return {
                    label: entityKey[entity].name,
                    key: Util_3.makeSafeForCSS(entityKey[entity].name),
                    color: colorScale(rows.first(colorDim.variable.id)),
                    size: rows.first(sizeDim.variable.id),
                    values: rows.filter(function (d) { return isFinite(d[yDimension.variable.id]) && (d.year === minYear || d.year === maxYear); }).mergeBy('year').map(function (d) {
                        return {
                            x: d.year,
                            y: d[yDimension.variable.id]
                        };
                    }).toArray()
                };
            }).filter(function (d) { return d.values.length >= 2; });
            return data.toArray();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "isValidConfig", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "timelineYears", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "minTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "maxTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "startYear", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "endYear", null);
    __decorate([
        mobx_1.computed.struct
    ], SlopeChartTransform.prototype, "xDomain", null);
    __decorate([
        mobx_1.computed.struct
    ], SlopeChartTransform.prototype, "sizeDim", null);
    __decorate([
        mobx_1.computed.struct
    ], SlopeChartTransform.prototype, "colorDim", null);
    __decorate([
        mobx_1.computed.struct
    ], SlopeChartTransform.prototype, "yDimension", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "variableData", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "defaultColors", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "colorScheme", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "colorScale", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "yTickFormat", null);
    __decorate([
        mobx_1.computed
    ], SlopeChartTransform.prototype, "data", null);
    return SlopeChartTransform;
}());
exports.default = SlopeChartTransform;
//# sourceMappingURL=SlopeChartTransform.js.map