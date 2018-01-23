"use strict";
/* LineChart.tsx
 * ================
 *
 * A standard line chart.
 *
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
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var AxisBox_1 = require("./AxisBox");
var StandardAxisBoxView_1 = require("./StandardAxisBoxView");
var Lines_1 = require("./Lines");
var HeightedLegend_1 = require("./HeightedLegend");
var Tooltip_1 = require("./Tooltip");
var NoData_1 = require("./NoData");
var Util_2 = require("./Util");
var d3_selection_1 = require("d3-selection");
var d3_ease_1 = require("d3-ease");
var LineChart = /** @class */ (function (_super) {
    __extends(LineChart, _super);
    function LineChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LineChart.prototype, "chart", {
        get: function () { return this.props.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "bounds", {
        get: function () { return this.props.bounds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "transform", {
        get: function () { return this.props.chart.lineChart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "legendItems", {
        // Order of the legend items on a line chart should visually correspond
        // to the order of the lines as the approach the legend
        get: function () {
            var _this = this;
            // Only show projection legends if there are any projections
            // Bit of a hack
            var toShow = this.transform.groupedData;
            if (toShow.some(function (g) { return !!g.isProjection; }))
                toShow = this.transform.groupedData.filter(function (g) { return g.isProjection; });
            return toShow.map(function (d) { return ({
                color: d.color,
                key: d.key,
                label: _this.chart.data.formatKey(d.key),
                yValue: Util_1.last(d.values).y
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "legend", {
        get: function () {
            if (this.chart.hideLegend)
                return undefined;
            var that = this;
            return new HeightedLegend_1.default({
                get maxWidth() { return that.bounds.width / 3; },
                get fontSize() { return that.chart.baseFontSize; },
                get items() { return that.legendItems; }
            });
        },
        enumerable: true,
        configurable: true
    });
    LineChart.prototype.onHoverPoint = function (target) {
        this.hoverTarget = target;
        this.hoverKey = target.series.key;
    };
    LineChart.prototype.onHoverStop = function () {
        this.hoverTarget = undefined;
        this.hoverKey = undefined;
    };
    Object.defineProperty(LineChart.prototype, "focusKeys", {
        get: function () {
            return this.hoverKey ? [this.hoverKey] : this.chart.data.selectedKeys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "tooltip", {
        get: function () {
            var _a = this, hoverTarget = _a.hoverTarget, chart = _a.chart;
            if (hoverTarget === undefined)
                return;
            return React.createElement(Tooltip_1.default, { x: hoverTarget.pos.x, y: hoverTarget.pos.y, style: { textAlign: "center" } },
                React.createElement("h3", { style: { padding: "0.3em 0.9em", margin: 0, backgroundColor: "#fcfcfc", borderBottom: "1px solid #ebebeb", fontWeight: "normal", fontSize: "1em" } }, chart.data.formatKey(hoverTarget.series.key)),
                React.createElement("p", { style: { margin: 0, padding: "0.3em 0.9em", fontSize: "0.8em" } },
                    React.createElement("span", null, hoverTarget.series.formatValue(hoverTarget.value.y)),
                    React.createElement("br", null),
                    "in",
                    React.createElement("br", null),
                    React.createElement("span", null, Util_2.formatYear(hoverTarget.value.x))));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineChart.prototype, "axisBox", {
        get: function () {
            var that = this;
            return new AxisBox_1.default({
                get bounds() { return that.bounds.padRight(10).padRight(that.legend ? that.legend.width : 0); },
                get fontSize() { return that.chart.baseFontSize; },
                get yAxis() { return that.transform.yAxis; },
                get xAxis() { return that.transform.xAxis; }
            });
        },
        enumerable: true,
        configurable: true
    });
    LineChart.prototype.onLegendClick = function (datakey) {
        if (this.chart.addCountryMode === 'add-country') {
            this.chart.data.toggleKey(datakey);
            this.onLegendMouseLeave();
        }
    };
    LineChart.prototype.onLegendMouseOver = function (datakey) {
        this.hoverKey = datakey;
    };
    LineChart.prototype.onLegendMouseLeave = function () {
        this.hoverKey = undefined;
    };
    LineChart.prototype.componentDidMount = function () {
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
    Object.defineProperty(LineChart.prototype, "renderUid", {
        get: function () {
            return Util_1.guid();
        },
        enumerable: true,
        configurable: true
    });
    LineChart.prototype.render = function () {
        if (this.transform.failMessage)
            return React.createElement(NoData_1.default, { bounds: this.props.bounds, message: this.transform.failMessage });
        var _a = this, chart = _a.chart, transform = _a.transform, bounds = _a.bounds, legend = _a.legend, tooltip = _a.tooltip, focusKeys = _a.focusKeys, axisBox = _a.axisBox, renderUid = _a.renderUid;
        var groupedData = transform.groupedData;
        return React.createElement("g", { className: "LineChart" },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "boundsClip-" + renderUid },
                    React.createElement("rect", { x: axisBox.innerBounds.x - 10, y: 0, width: bounds.width + 10, height: bounds.height * 2 }))),
            React.createElement(StandardAxisBoxView_1.default, { axisBox: axisBox, chart: chart }),
            React.createElement("g", { clipPath: "url(#boundsClip-" + renderUid + ")" },
                legend && React.createElement(HeightedLegend_1.HeightedLegendView, { x: bounds.right - legend.width, legend: legend, focusKeys: focusKeys, yScale: axisBox.yScale, onClick: this.onLegendClick, onMouseOver: this.onLegendMouseOver, onMouseLeave: this.onLegendMouseLeave }),
                React.createElement(Lines_1.default, { xScale: axisBox.xScale, yScale: axisBox.yScale, data: groupedData, onHoverPoint: this.onHoverPoint, onHoverStop: this.onHoverStop, focusKeys: focusKeys })),
            tooltip);
    };
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "transform", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "legendItems", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "legend", null);
    __decorate([
        mobx_1.observable
    ], LineChart.prototype, "hoverTarget", void 0);
    __decorate([
        mobx_1.observable
    ], LineChart.prototype, "hoverKey", void 0);
    __decorate([
        mobx_1.action.bound
    ], LineChart.prototype, "onHoverPoint", null);
    __decorate([
        mobx_1.action.bound
    ], LineChart.prototype, "onHoverStop", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "focusKeys", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "tooltip", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "axisBox", null);
    __decorate([
        mobx_1.action.bound
    ], LineChart.prototype, "onLegendClick", null);
    __decorate([
        mobx_1.action.bound
    ], LineChart.prototype, "onLegendMouseOver", null);
    __decorate([
        mobx_1.action.bound
    ], LineChart.prototype, "onLegendMouseLeave", null);
    __decorate([
        mobx_1.computed
    ], LineChart.prototype, "renderUid", null);
    LineChart = __decorate([
        mobx_react_1.observer
    ], LineChart);
    return LineChart;
}(React.Component));
exports.default = LineChart;
//# sourceMappingURL=LineChart.js.map