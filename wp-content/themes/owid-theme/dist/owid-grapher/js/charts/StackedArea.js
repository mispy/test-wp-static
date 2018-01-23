"use strict";
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
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var AxisBox_1 = require("./AxisBox");
var StandardAxisBoxView_1 = require("./StandardAxisBoxView");
var Util_2 = require("./Util");
var HeightedLegend_1 = require("./HeightedLegend");
var NoData_1 = require("./NoData");
var Tooltip_1 = require("./Tooltip");
var d3_selection_1 = require("d3-selection");
var d3_ease_1 = require("d3-ease");
var d3_color_1 = require("d3-color");
var Areas = /** @class */ (function (_super) {
    __extends(Areas, _super);
    function Areas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Areas.prototype.onMouseMove = function (ev) {
        var _a = this.props, axisBox = _a.axisBox, data = _a.data;
        var mouse = Util_2.getRelativeMouse(this.base, ev);
        if (axisBox.innerBounds.contains(mouse)) {
            var closestPoint = Util_1.sortBy(data[0].values, function (d) { return Math.abs(axisBox.xScale.place(d.x) - mouse.x); })[0];
            var index = data[0].values.indexOf(closestPoint);
            this.hoverIndex = index;
        }
        else {
            this.hoverIndex = undefined;
        }
        this.props.onHover(this.hoverIndex);
    };
    Object.defineProperty(Areas.prototype, "areas", {
        get: function () {
            var _this = this;
            var _a = this.props, axisBox = _a.axisBox, data = _a.data;
            var xScale = axisBox.xScale, yScale = axisBox.yScale;
            var xBottomLeft = [xScale.range[0], yScale.range[0]];
            var xBottomRight = [xScale.range[1], yScale.range[0]];
            // Stacked area chart stacks each series upon the previous series, so we must keep track of the last point set we used
            var prevPoints = [xBottomLeft, xBottomRight];
            return data.map(function (series) {
                var mainPoints = series.values.map(function (v) { return [xScale.place(v.x), yScale.place(v.y)]; });
                var points = mainPoints.concat(Util_1.reverse(Util_1.clone(prevPoints)));
                prevPoints = mainPoints;
                return React.createElement("path", { className: Util_2.makeSafeForCSS(series.key) + '-area', key: series.key + '-area', strokeLinecap: "round", d: Util_1.pointsToPath(points), fill: series.color, fillOpacity: 0.7, clipPath: _this.props.clipPath });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Areas.prototype, "borders", {
        get: function () {
            var _this = this;
            var _a = this.props, axisBox = _a.axisBox, data = _a.data;
            var xScale = axisBox.xScale, yScale = axisBox.yScale;
            // Stacked area chart stacks each series upon the previous series, so we must keep track of the last point set we used
            return data.map(function (series) {
                var points = series.values.map(function (v) { return [xScale.place(v.x), yScale.place(v.y)]; });
                return React.createElement("path", { className: Util_2.makeSafeForCSS(series.key) + '-border', key: series.key + '-border', strokeLinecap: "round", d: Util_1.pointsToPath(points), stroke: d3_color_1.rgb(series.color).darker(0.5).toString(), strokeOpacity: 0.7, strokeWidth: 0.5, fill: "none", clipPath: _this.props.clipPath });
            });
        },
        enumerable: true,
        configurable: true
    });
    Areas.prototype.render = function () {
        var _a = this.props, axisBox = _a.axisBox, data = _a.data;
        var xScale = axisBox.xScale, yScale = axisBox.yScale;
        var hoverIndex = this.hoverIndex;
        return React.createElement("g", { className: "Areas", onMouseMove: this.onMouseMove, onMouseLeave: this.onMouseMove },
            React.createElement("rect", { x: xScale.range[0], y: yScale.range[1], width: xScale.range[1] - xScale.range[0], height: yScale.range[0] - yScale.range[1], opacity: 0, fill: "rgba(255,255,255,0)" }),
            this.areas,
            this.borders,
            hoverIndex !== undefined && React.createElement("g", { className: "hoverIndicator" },
                data.map(function (series) {
                    return React.createElement("circle", { cx: xScale.place(series.values[hoverIndex].x), cy: yScale.place(series.values[hoverIndex].y), r: 5, fill: series.color });
                }),
                React.createElement("line", { x1: xScale.place(data[0].values[hoverIndex].x), y1: yScale.range[0], x2: xScale.place(data[0].values[hoverIndex].x), y2: yScale.range[1], stroke: "#ccc" })));
    };
    __decorate([
        mobx_1.observable
    ], Areas.prototype, "hoverIndex", void 0);
    __decorate([
        mobx_1.action.bound
    ], Areas.prototype, "onMouseMove", null);
    __decorate([
        mobx_1.computed
    ], Areas.prototype, "areas", null);
    __decorate([
        mobx_1.computed
    ], Areas.prototype, "borders", null);
    Areas = __decorate([
        mobx_react_1.observer
    ], Areas);
    return Areas;
}(React.Component));
exports.Areas = Areas;
var StackedAreaChart = /** @class */ (function (_super) {
    __extends(StackedAreaChart, _super);
    function StackedAreaChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StackedAreaChart.prototype, "chart", {
        get: function () { return this.props.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "bounds", {
        get: function () { return this.props.bounds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "transform", {
        get: function () { return this.props.chart.stackedArea; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "midpoints", {
        get: function () {
            var prevY = 0;
            return this.transform.stackedData.map(function (series) {
                var lastValue = Util_1.last(series.values);
                var middleY = prevY + (lastValue.y - prevY) / 2;
                prevY = lastValue.y;
                return middleY;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "legendItems", {
        get: function () {
            var _this = this;
            var _a = this, transform = _a.transform, midpoints = _a.midpoints;
            var items = transform.stackedData.map(function (d, i) { return ({
                color: d.color,
                key: d.key,
                label: _this.chart.data.formatKey(d.key),
                yValue: midpoints[i]
            }); });
            return Util_1.sortBy(items, function (d) { return d.yValue; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "legend", {
        get: function () {
            if (this.chart.hideLegend)
                return undefined;
            var that = this;
            return new HeightedLegend_1.default({
                get maxWidth() { return 150; },
                get fontSize() { return that.chart.baseFontSize; },
                get items() { return that.legendItems; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackedAreaChart.prototype, "axisBox", {
        get: function () {
            var _a = this, bounds = _a.bounds, transform = _a.transform, legend = _a.legend, chart = _a.chart;
            var xAxis = transform.xAxis, yAxis = transform.yAxis;
            return new AxisBox_1.default({ bounds: bounds.padRight(legend ? legend.width + 5 : 20), fontSize: chart.baseFontSize, xAxis: xAxis, yAxis: yAxis });
        },
        enumerable: true,
        configurable: true
    });
    StackedAreaChart.prototype.onHover = function (hoverIndex) {
        this.hoverIndex = hoverIndex;
    };
    Object.defineProperty(StackedAreaChart.prototype, "tooltip", {
        get: function () {
            if (this.hoverIndex === undefined)
                return undefined;
            var _a = this, transform = _a.transform, hoverIndex = _a.hoverIndex, axisBox = _a.axisBox, chart = _a.chart;
            // Grab the first value to get the year from
            var refValue = transform.stackedData[0].values[hoverIndex];
            // If some data is missing, don't calculate a total
            var someMissing = transform.stackedData.some(function (g) { return !!g.values[hoverIndex].isFake; });
            return React.createElement(Tooltip_1.default, { x: axisBox.xScale.place(refValue.x), y: axisBox.yScale.rangeMin + axisBox.yScale.rangeSize / 2, style: { padding: "0.3em" } },
                React.createElement("table", { style: { fontSize: "0.9em", lineHeight: "1.4em" } },
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("strong", null, refValue.x)),
                        React.createElement("td", null, !transform.isRelative && !someMissing && React.createElement("span", null,
                            React.createElement("strong", null, transform.yAxis.tickFormat(transform.stackedData[transform.stackedData.length - 1].values[hoverIndex].y))))),
                    Util_1.reverse(Util_1.clone(transform.groupedData)).map(function (series) {
                        var value = series.values[hoverIndex];
                        return React.createElement("tr", null,
                            React.createElement("td", { style: { paddingRight: "0.8em", fontSize: "0.9em" } },
                                React.createElement("div", { style: { width: '10px', height: '10px', backgroundColor: series.color, border: "1px solid #ccc", display: 'inline-block' } }),
                                " ",
                                chart.data.formatKey(series.key)),
                            React.createElement("td", null, value.isFake ? "No data" : transform.yAxis.tickFormat(value.y)));
                    })));
        },
        enumerable: true,
        configurable: true
    });
    StackedAreaChart.prototype.componentDidMount = function () {
        // Fancy intro animation
        var _this = this;
        var base = d3_selection_1.select(this.base);
        base.selectAll("clipPath > rect")
            .attr("width", 0)
            .transition()
            .duration(800)
            .ease(d3_ease_1.easeLinear)
            .attr("width", this.bounds.width)
            .on("end", function () { return _this.forceUpdate(); }); // Important in case bounds changes during transition
    };
    Object.defineProperty(StackedAreaChart.prototype, "renderUid", {
        get: function () {
            return Util_1.guid();
        },
        enumerable: true,
        configurable: true
    });
    StackedAreaChart.prototype.render = function () {
        if (this.transform.failMessage)
            return React.createElement(NoData_1.default, { bounds: this.props.bounds, message: this.transform.failMessage });
        var _a = this, chart = _a.chart, bounds = _a.bounds, axisBox = _a.axisBox, legend = _a.legend, transform = _a.transform, renderUid = _a.renderUid;
        return React.createElement("g", { className: "StackedArea" },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "boundsClip-" + renderUid },
                    React.createElement("rect", { x: axisBox.innerBounds.x, y: 0, width: bounds.width, height: bounds.height * 2 }))),
            React.createElement(StandardAxisBoxView_1.default, { axisBox: axisBox, chart: chart }),
            React.createElement("g", { clipPath: "url(#boundsClip-" + renderUid + ")" },
                legend && React.createElement(HeightedLegend_1.HeightedLegendView, { legend: legend, x: bounds.right - legend.width, yScale: axisBox.yScale, focusKeys: [] }),
                React.createElement(Areas, { axisBox: axisBox, data: transform.stackedData, onHover: this.onHover })),
            this.tooltip);
    };
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "transform", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "midpoints", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "legendItems", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "legend", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "axisBox", null);
    __decorate([
        mobx_1.observable
    ], StackedAreaChart.prototype, "hoverIndex", void 0);
    __decorate([
        mobx_1.action.bound
    ], StackedAreaChart.prototype, "onHover", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "tooltip", null);
    __decorate([
        mobx_1.computed
    ], StackedAreaChart.prototype, "renderUid", null);
    StackedAreaChart = __decorate([
        mobx_react_1.observer
    ], StackedAreaChart);
    return StackedAreaChart;
}(React.Component));
exports.default = StackedAreaChart;
//# sourceMappingURL=StackedArea.js.map