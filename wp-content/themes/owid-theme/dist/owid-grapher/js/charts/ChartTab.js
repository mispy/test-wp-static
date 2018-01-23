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
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Header_1 = require("./Header");
var SourcesFooter_1 = require("./SourcesFooter");
var SlopeChart_1 = require("./SlopeChart");
var ScatterPlot_1 = require("./ScatterPlot");
var LineChart_1 = require("./LineChart");
var StackedArea_1 = require("./StackedArea");
var DiscreteBarChart_1 = require("./DiscreteBarChart");
var ChartTab = /** @class */ (function (_super) {
    __extends(ChartTab, _super);
    function ChartTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChartTab.prototype, "header", {
        get: function () {
            var that = this;
            return new Header_1.default({
                get chart() { return that.props.chart; },
                get maxWidth() { return that.props.bounds.width; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTab.prototype, "footer", {
        get: function () {
            var that = this;
            return new SourcesFooter_1.default({
                get chart() { return that.props.chart; },
                get maxWidth() { return that.props.bounds.width; }
            });
        },
        enumerable: true,
        configurable: true
    });
    ChartTab.prototype.renderChart = function () {
        var _a = this.props, chart = _a.chart, chartView = _a.chartView;
        var _b = this, header = _b.header, footer = _b.footer;
        var bounds = this.props.bounds.padTop(header.height).padBottom(footer.height);
        if (chart.isSlopeChart)
            return React.createElement(SlopeChart_1.default, { bounds: bounds.padTop(20), chart: chart });
        else if (chart.isScatter)
            return React.createElement(ScatterPlot_1.default, { bounds: bounds.padTop(20).padBottom(15), config: chart, isStatic: chartView.isExport });
        else if (chart.isLineChart)
            return React.createElement(LineChart_1.default, { bounds: bounds.padTop(20).padBottom(15), chart: chart });
        else if (chart.isStackedArea)
            return React.createElement(StackedArea_1.default, { bounds: bounds.padTop(20).padBottom(15), chart: chart });
        else if (chart.isDiscreteBar)
            return React.createElement(DiscreteBarChart_1.default, { bounds: bounds.padTop(20).padBottom(15), chart: chart });
        else
            return null;
    };
    ChartTab.prototype.render = function () {
        var _a = this, header = _a.header, footer = _a.footer, props = _a.props;
        return React.createElement("g", { className: "ChartTab" },
            header.render(props.bounds.x, props.bounds.y),
            this.renderChart(),
            footer.render(props.bounds.x, props.bounds.bottom - footer.height));
    };
    __decorate([
        mobx_1.computed
    ], ChartTab.prototype, "header", null);
    __decorate([
        mobx_1.computed
    ], ChartTab.prototype, "footer", null);
    ChartTab = __decorate([
        mobx_react_1.observer
    ], ChartTab);
    return ChartTab;
}(React.Component));
exports.default = ChartTab;
//# sourceMappingURL=ChartTab.js.map