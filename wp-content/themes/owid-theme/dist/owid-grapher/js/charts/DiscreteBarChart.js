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
var d3_selection_1 = require("d3-selection");
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Bounds_1 = require("./Bounds");
var AxisScale_1 = require("./AxisScale");
var HorizontalAxis_1 = require("./HorizontalAxis");
var AxisBox_1 = require("./AxisBox");
var NoData_1 = require("./NoData");
var DiscreteBarChart = /** @class */ (function (_super) {
    __extends(DiscreteBarChart, _super);
    function DiscreteBarChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscreteBarChart.prototype, "chart", {
        get: function () { return this.props.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "bounds", {
        get: function () { return this.props.bounds.padRight(10); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "failMessage", {
        get: function () {
            return this.chart.discreteBar.failMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "data", {
        get: function () {
            return this.chart.discreteBar.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "legendFontSize", {
        get: function () {
            return 0.85 * this.props.chart.baseFontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "legendWidth", {
        // Account for the width of the legend
        get: function () {
            var longestLabel = Util_1.sortBy(this.data, function (d) { return -d.label.length; })[0].label;
            return Bounds_1.default.forText(longestLabel, { fontSize: this.legendFontSize }).width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "valueFontSize", {
        // Account for the width of the little value labels at the end of bars
        get: function () {
            return 0.75 * this.props.chart.baseFontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "maxValueWidth", {
        get: function () {
            var _this = this;
            var maxValue = Util_1.sortBy(this.data, function (d) { return -_this.barValueFormat(d).length; })[0];
            return Bounds_1.default.forText(this.barValueFormat(maxValue), { fontSize: this.valueFontSize }).width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "hasNegative", {
        get: function () {
            return Util_1.some(this.data, function (d) { return d.value < 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "xDomainDefault", {
        // Now we can work out the main x axis scale
        get: function () {
            var allValues = this.data.map(function (d) { return d.value; });
            var minX = Math.min(0, Util_1.min(allValues));
            var maxX = Util_1.max(allValues);
            return [minX, maxX];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "xRange", {
        get: function () {
            return [this.bounds.left + this.legendWidth + (this.hasNegative ? this.maxValueWidth : 0), this.bounds.right - this.maxValueWidth];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "xScale", {
        get: function () {
            var xAxis = this.chart.yAxis.toSpec({ defaultDomain: this.xDomainDefault }); // XXX
            return new AxisScale_1.default(xAxis).extend({
                domain: this.xDomainDefault,
                range: this.xRange,
                tickFormat: this.chart.discreteBar.tickFormat
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "xAxis", {
        get: function () {
            var that = this;
            return new HorizontalAxis_1.default({
                get scale() { return that.xScale; },
                get fontSize() { return that.chart.baseFontSize; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "innerBounds", {
        get: function () {
            return this.bounds.padLeft(this.legendWidth).padBottom(this.xAxis.height).padRight(this.maxValueWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "barHeight", {
        get: function () {
            return 0.8 * this.innerBounds.height / this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "barSpacing", {
        get: function () {
            return (this.innerBounds.height / this.data.length) - this.barHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscreteBarChart.prototype, "barPlacements", {
        get: function () {
            var _a = this, data = _a.data, xScale = _a.xScale;
            return data.map(function (d) {
                var isNegative = d.value < 0;
                var barX = isNegative ? xScale.place(d.value) : xScale.place(0);
                var barWidth = isNegative ? xScale.place(0) - barX : xScale.place(d.value) - barX;
                return { x: barX, width: barWidth };
            });
        },
        enumerable: true,
        configurable: true
    });
    DiscreteBarChart.prototype.componentDidMount = function () {
        var _this = this;
        this.dispose = mobx_1.autorun(function () {
            if (_this.failMessage)
                return;
            var widths = _this.barPlacements.map(function (b) { return b.width; });
            mobx_1.runInAction(function () {
                var bars = d3_selection_1.select(_this.base).selectAll("g.bar > rect");
                bars.attr('width', 0).transition().attr('width', function (_, i) { return widths[i]; });
            });
        });
    };
    DiscreteBarChart.prototype.componentDidUnmount = function () {
        this.dispose();
    };
    Object.defineProperty(DiscreteBarChart.prototype, "barValueFormat", {
        get: function () {
            return this.chart.discreteBar.barValueFormat;
        },
        enumerable: true,
        configurable: true
    });
    DiscreteBarChart.prototype.render = function () {
        if (this.failMessage)
            return React.createElement(NoData_1.default, { bounds: this.bounds, message: this.failMessage });
        var _a = this, data = _a.data, bounds = _a.bounds, legendWidth = _a.legendWidth, xAxis = _a.xAxis, xScale = _a.xScale, innerBounds = _a.innerBounds, barHeight = _a.barHeight, barSpacing = _a.barSpacing, valueFontSize = _a.valueFontSize, barValueFormat = _a.barValueFormat;
        var yOffset = innerBounds.top + barHeight / 2;
        return React.createElement("g", { className: "DiscreteBarChart" },
            React.createElement("rect", { x: bounds.left, y: bounds.top, width: bounds.width, height: bounds.height, opacity: 0, fill: "rgba(255,255,255,0)" }),
            React.createElement(HorizontalAxis_1.HorizontalAxisView, { bounds: bounds, axis: xAxis }),
            React.createElement(AxisBox_1.AxisGridLines, { orient: "bottom", scale: xScale, bounds: innerBounds }),
            data.map(function (d) {
                var isNegative = d.value < 0;
                var barX = isNegative ? xScale.place(d.value) : xScale.place(0);
                var barWidth = isNegative ? xScale.place(0) - barX : xScale.place(d.value) - barX;
                var result = React.createElement("g", { className: "bar" },
                    React.createElement("text", { x: bounds.left + legendWidth - 5, y: yOffset, fill: "#666", "dominant-baseline": "middle", textAnchor: "end", fontSize: valueFontSize }, d.label),
                    React.createElement("rect", { x: barX, y: yOffset - barHeight / 2, width: barWidth, height: barHeight, fill: d.color, opacity: 0.85 }),
                    React.createElement("text", { x: xScale.place(d.value) + (isNegative ? -5 : 5), y: yOffset, fill: "#666", "dominant-baseline": "middle", textAnchor: isNegative ? "end" : "start", fontSize: valueFontSize }, barValueFormat(d)));
                yOffset += barHeight + barSpacing;
                return result;
            }));
    };
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "chart", null);
    __decorate([
        mobx_1.computed.struct
    ], DiscreteBarChart.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "data", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "legendFontSize", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "legendWidth", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "valueFontSize", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "maxValueWidth", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "hasNegative", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "xDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "xRange", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "xScale", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "innerBounds", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "barHeight", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "barSpacing", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "barPlacements", null);
    __decorate([
        mobx_1.computed
    ], DiscreteBarChart.prototype, "barValueFormat", null);
    DiscreteBarChart = __decorate([
        mobx_react_1.observer
    ], DiscreteBarChart);
    return DiscreteBarChart;
}(React.Component));
exports.default = DiscreteBarChart;
//# sourceMappingURL=DiscreteBarChart.js.map