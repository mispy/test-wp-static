"use strict";
/* ScatterPlot.tsx
 * ================
 *
 * Entry point for scatter charts
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-03-09
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_1 = require("mobx");
var Util_1 = require("./Util");
var mobx_react_1 = require("mobx-react");
var NoData_1 = require("./NoData");
var PointsWithLabels_1 = require("./PointsWithLabels");
var TextWrap_1 = require("./TextWrap");
var ConnectedScatterLegend_1 = require("./ConnectedScatterLegend");
var ScatterColorLegend_1 = require("./ScatterColorLegend");
var AxisBox_1 = require("./AxisBox");
var ComparisonLine_1 = require("./ComparisonLine");
var Util_2 = require("./Util");
var ScatterPlot = /** @class */ (function (_super) {
    __extends(ScatterPlot, _super);
    function ScatterPlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ScatterPlot.prototype, "chart", {
        get: function () {
            return this.props.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "transform", {
        get: function () {
            return this.chart.scatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.onTargetChange = function (_a) {
        var targetStartYear = _a.targetStartYear, targetEndYear = _a.targetEndYear;
        this.chart.timeDomain = [targetStartYear, targetEndYear];
    };
    ScatterPlot.prototype.onSelectEntity = function (datakey) {
        if (this.chart.addCountryMode !== 'disabled')
            this.chart.data.toggleKey(datakey);
    };
    Object.defineProperty(ScatterPlot.prototype, "legendColors", {
        // Only show colors on legend that are actually in use
        get: function () {
            return Util_1.uniq(this.transform.currentData.filter(function (g) { return g.isAutoColor; }).map(function (g) { return g.color; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "legend", {
        get: function () {
            var that = this;
            return new ScatterColorLegend_1.default({
                get maxWidth() { return that.sidebarMaxWidth; },
                get fontSize() { return that.chart.baseFontSize; },
                get colors() { return that.legendColors; },
                get scale() { return that.transform.colorScale; }
            });
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.onLegendMouseOver = function (color) {
        this.hoverColor = color;
    };
    ScatterPlot.prototype.onLegendMouseLeave = function () {
        this.hoverColor = undefined;
    };
    // When the color legend is clicked, toggle selection fo all associated keys
    ScatterPlot.prototype.onLegendClick = function () {
        var _a = this, chart = _a.chart, hoverColor = _a.hoverColor;
        if (chart.addCountryMode === 'disabled' || hoverColor === undefined)
            return;
        var transform = this.transform;
        var keysToToggle = transform.currentData.filter(function (g) { return g.color === hoverColor; }).map(function (g) { return g.key; });
        var allKeysActive = Util_1.intersection(keysToToggle, chart.data.selectedKeys).length === keysToToggle.length;
        if (allKeysActive)
            chart.data.selectedKeys = Util_1.without.apply(void 0, [chart.data.selectedKeys].concat(keysToToggle));
        else
            chart.data.selectedKeys = Util_1.uniq(chart.data.selectedKeys.concat(keysToToggle));
    };
    Object.defineProperty(ScatterPlot.prototype, "focusColors", {
        // Colors on the legend for which every matching group is focused
        get: function () {
            var _a = this, legendColors = _a.legendColors, transform = _a.transform, chart = _a.chart;
            return legendColors.filter(function (color) {
                var matchingKeys = transform.currentData.filter(function (g) { return g.color === color; }).map(function (g) { return g.key; });
                return Util_1.intersection(matchingKeys, chart.data.selectedKeys).length === matchingKeys.length;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "hoverKeys", {
        // All currently hovered group keys, combining the legend and the main UI
        get: function () {
            var _a = this, hoverColor = _a.hoverColor, hoverKey = _a.hoverKey, transform = _a.transform;
            var hoverKeys = hoverColor === undefined ? [] : Util_1.uniq(transform.currentData.filter(function (g) { return g.color === hoverColor; }).map(function (g) { return g.key; }));
            if (hoverKey !== undefined)
                hoverKeys.push(hoverKey);
            return hoverKeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "focusKeys", {
        get: function () {
            return this.chart.data.selectedKeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "arrowLegend", {
        get: function () {
            var transform = this.transform;
            var startYear = transform.startYear, endYear = transform.endYear;
            if (startYear === endYear || transform.isRelativeMode)
                return undefined;
            var that = this;
            return new ConnectedScatterLegend_1.default({
                get maxWidth() { return that.sidebarWidth; },
                get fontSize() { return that.chart.baseFontSize; },
                get startYear() { return that.transform.startYear; },
                get endYear() { return that.transform.endYear; },
                get endpointsOnly() { return that.transform.compareEndPointsOnly; }
            });
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.onScatterMouseOver = function (series) {
        this.hoverKey = series.key;
    };
    ScatterPlot.prototype.onScatterMouseLeave = function () {
        this.hoverKey = undefined;
    };
    Object.defineProperty(ScatterPlot.prototype, "tooltipSeries", {
        get: function () {
            var _a = this, hoverKey = _a.hoverKey, focusKeys = _a.focusKeys, transform = _a.transform;
            if (hoverKey !== undefined)
                return transform.currentData.find(function (g) { return g.key === hoverKey; });
            else if (focusKeys && focusKeys.length === 1)
                return transform.currentData.find(function (g) { return g.key === focusKeys[0]; });
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "sidebarMaxWidth", {
        get: function () { return this.bounds.width * 0.5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "sidebarMinWidth", {
        get: function () { return 100; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "sidebarWidth", {
        get: function () {
            var _a = this, sidebarMinWidth = _a.sidebarMinWidth, sidebarMaxWidth = _a.sidebarMaxWidth, legend = _a.legend;
            return Math.max(Math.min(legend.width, sidebarMaxWidth), sidebarMinWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterPlot.prototype, "axisBox", {
        get: function () {
            var that = this;
            return new AxisBox_1.default({
                get bounds() { return that.bounds.padRight(that.sidebarWidth + 20); },
                get fontSize() { return that.chart.baseFontSize; },
                get xAxis() { return that.transform.xAxis; },
                get yAxis() { return that.transform.yAxis; }
            });
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.onYScaleChange = function (scaleType) {
        this.chart.yAxis.scaleType = scaleType;
    };
    ScatterPlot.prototype.onXScaleChange = function (scaleType) {
        this.chart.xAxis.scaleType = scaleType;
    };
    Object.defineProperty(ScatterPlot.prototype, "comparisonLine", {
        get: function () {
            return this.chart.comparisonLine;
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.onToggleEndpoints = function () {
        this.transform.compareEndPointsOnly = !this.transform.compareEndPointsOnly;
    };
    Object.defineProperty(ScatterPlot.prototype, "activeColors", {
        // Colors currently on the chart and not greyed out
        get: function () {
            var _a = this, hoverKeys = _a.hoverKeys, focusKeys = _a.focusKeys, transform = _a.transform;
            var activeKeys = hoverKeys.concat(focusKeys);
            if (activeKeys.length === 0)
                return Util_1.uniq(transform.currentData.map(function (g) { return g.color; }));
            else
                return Util_1.uniq(transform.currentData.filter(function (g) { return activeKeys.indexOf(g.key) !== -1; }).map(function (g) { return g.color; }));
        },
        enumerable: true,
        configurable: true
    });
    ScatterPlot.prototype.render = function () {
        if (this.transform.failMessage)
            return React.createElement(NoData_1.default, { bounds: this.bounds, message: this.transform.failMessage });
        var _a = this, transform = _a.transform, bounds = _a.bounds, axisBox = _a.axisBox, legend = _a.legend, focusKeys = _a.focusKeys, hoverKeys = _a.hoverKeys, focusColors = _a.focusColors, activeColors = _a.activeColors, arrowLegend = _a.arrowLegend, sidebarWidth = _a.sidebarWidth, tooltipSeries = _a.tooltipSeries, comparisonLine = _a.comparisonLine;
        var currentData = transform.currentData, sizeDomain = transform.sizeDomain;
        return React.createElement("g", null,
            React.createElement(AxisBox_1.AxisBoxView, { axisBox: axisBox, onXScaleChange: this.onXScaleChange, onYScaleChange: this.onYScaleChange }),
            comparisonLine && React.createElement(ComparisonLine_1.default, { axisBox: axisBox, comparisonLine: comparisonLine }),
            React.createElement(PointsWithLabels_1.default, { data: currentData, bounds: axisBox.innerBounds, xScale: axisBox.xScale, yScale: axisBox.yScale, sizeDomain: sizeDomain, onSelectEntity: this.onSelectEntity, focusKeys: focusKeys, hoverKeys: hoverKeys, onMouseOver: this.onScatterMouseOver, onMouseLeave: this.onScatterMouseLeave }),
            React.createElement(ScatterColorLegend_1.ScatterColorLegendView, { legend: legend, x: bounds.right - sidebarWidth, y: bounds.top, onMouseOver: this.onLegendMouseOver, onMouseLeave: this.onLegendMouseLeave, onClick: this.onLegendClick, focusColors: focusColors, activeColors: activeColors }),
            (arrowLegend || tooltipSeries) && React.createElement("line", { x1: bounds.right - sidebarWidth, y1: bounds.top + legend.height + 2, x2: bounds.right - 5, y2: bounds.top + legend.height + 2, stroke: "#ccc" }),
            arrowLegend && React.createElement("g", { className: "clickable", onClick: this.onToggleEndpoints }, arrowLegend.render(bounds.right - sidebarWidth, bounds.top + legend.height + 11)),
            tooltipSeries && React.createElement(ScatterTooltip, { formatY: transform.yFormatTooltip, formatX: transform.xFormatTooltip, series: tooltipSeries, maxWidth: sidebarWidth, fontSize: this.chart.baseFontSize, x: bounds.right - sidebarWidth, y: bounds.top + legend.height + 11 + (arrowLegend ? arrowLegend.height + 10 : 0) }));
    };
    __decorate([
        mobx_1.observable
    ], ScatterPlot.prototype, "hoverKey", void 0);
    __decorate([
        mobx_1.observable
    ], ScatterPlot.prototype, "hoverColor", void 0);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "transform", null);
    __decorate([
        mobx_1.computed.struct
    ], ScatterPlot.prototype, "bounds", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onTargetChange", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onSelectEntity", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "legendColors", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "legend", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onLegendMouseOver", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onLegendMouseLeave", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onLegendClick", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "focusColors", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "hoverKeys", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "focusKeys", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "arrowLegend", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onScatterMouseOver", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onScatterMouseLeave", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "tooltipSeries", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "sidebarMaxWidth", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "sidebarMinWidth", null);
    __decorate([
        mobx_1.computed.struct
    ], ScatterPlot.prototype, "sidebarWidth", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "axisBox", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onYScaleChange", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onXScaleChange", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "comparisonLine", null);
    __decorate([
        mobx_1.action.bound
    ], ScatterPlot.prototype, "onToggleEndpoints", null);
    __decorate([
        mobx_1.computed
    ], ScatterPlot.prototype, "activeColors", null);
    ScatterPlot = __decorate([
        mobx_react_1.observer
    ], ScatterPlot);
    return ScatterPlot;
}(React.Component));
exports.default = ScatterPlot;
var ScatterTooltip = /** @class */ (function (_super) {
    __extends(ScatterTooltip, _super);
    function ScatterTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterTooltip.prototype.formatValueY = function (value) {
        return "Y Axis: " + this.props.formatY(value.y);
        //        if (value.year != value.time.y)
        //            s += " (data from " + value.time.y + ")"
        // return s
    };
    ScatterTooltip.prototype.formatValueX = function (value) {
        var s = "X Axis: " + this.props.formatX(value.x);
        if (!value.time.span && value.time.y !== value.time.x)
            s += " (data from " + value.time.x + ")";
        return s;
    };
    ScatterTooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, x = _a.x, y = _a.y, maxWidth = _a.maxWidth, fontSize = _a.fontSize, series = _a.series;
        var lineHeight = 5;
        var firstValue = Util_2.first(series.values);
        var lastValue = Util_2.last(series.values);
        var values = series.values.length === 1 ? [firstValue] : [firstValue, lastValue];
        var elements = [];
        var offset = 0;
        var heading = { x: x, y: y + offset, wrap: new TextWrap_1.default({ maxWidth: maxWidth, fontSize: 0.75 * fontSize, text: series.label }) };
        elements.push(heading);
        offset += heading.wrap.height + lineHeight;
        values.forEach(function (v) {
            var year = { x: x, y: y + offset, wrap: new TextWrap_1.default({ maxWidth: maxWidth, fontSize: 0.65 * fontSize, text: v.time.span ? Util_2.formatYear(v.time.span[0]) + " to " + Util_2.formatYear(v.time.span[1]) : Util_2.formatYear(v.time.y) }) };
            offset += year.wrap.height;
            var line1 = { x: x, y: y + offset, wrap: new TextWrap_1.default({ maxWidth: maxWidth, fontSize: 0.55 * fontSize, text: _this.formatValueY(v) }) };
            offset += line1.wrap.height;
            var line2 = { x: x, y: y + offset, wrap: new TextWrap_1.default({ maxWidth: maxWidth, fontSize: 0.55 * fontSize, text: _this.formatValueX(v) }) };
            offset += line2.wrap.height + lineHeight;
            elements.push.apply(elements, [year, line1, line2]);
        });
        return React.createElement("g", { className: "scatterTooltip" }, elements.map(function (el) { return el.wrap.render(el.x, el.y); }));
    };
    ScatterTooltip = __decorate([
        mobx_react_1.observer
    ], ScatterTooltip);
    return ScatterTooltip;
}(React.Component));
//# sourceMappingURL=ScatterPlot.js.map