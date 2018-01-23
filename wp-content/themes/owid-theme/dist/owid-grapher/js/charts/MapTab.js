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
var ChoroplethMap_1 = require("./ChoroplethMap");
var MapLegend_1 = require("./MapLegend");
var Util_1 = require("./Util");
var Header_1 = require("./Header");
var SourcesFooter_1 = require("./SourcesFooter");
var Tooltip_1 = require("./Tooltip");
var NoData_1 = require("./NoData");
var d3_selection_1 = require("d3-selection");
var d3_ease_1 = require("d3-ease");
var MapWithLegend = /** @class */ (function (_super) {
    __extends(MapWithLegend, _super);
    function MapWithLegend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focusEntity = null;
        _this.tooltip = null;
        return _this;
    }
    MapWithLegend.prototype.onMapMouseOver = function (d, ev) {
        var datum = d.id === undefined ? undefined : this.props.choroplethData[d.id];
        this.focusEntity = { id: d.id, datum: datum || { value: "No data" } };
        var chart = this.context.chart;
        var mouse = Util_1.getRelativeMouse(this.base, ev);
        if (datum) {
            var specifyYear = datum.year !== this.props.inputYear;
            this.tooltip = React.createElement(Tooltip_1.default, { x: mouse.x, y: mouse.y, style: { textAlign: "center" } },
                React.createElement("h3", { style: { padding: "0.3em 0.9em", margin: 0, backgroundColor: "#fcfcfc", borderBottom: "1px solid #ebebeb", fontWeight: "normal", fontSize: "1em" } }, datum.entity),
                React.createElement("p", { style: { margin: 0, padding: "0.3em 0.9em", fontSize: "0.8em" } },
                    React.createElement("span", null, chart.map.data.formatTooltipValue(datum.value)),
                    React.createElement("br", null),
                    specifyYear && React.createElement("div", null,
                        "in",
                        React.createElement("br", null),
                        React.createElement("span", null, datum.year))));
        }
    };
    MapWithLegend.prototype.onMapMouseLeave = function () {
        this.focusEntity = null;
        this.tooltip = null;
    };
    MapWithLegend.prototype.onClick = function (d) {
        var _a = this.context, chartView = _a.chartView, chart = _a.chart;
        if (chartView.isMobile || !chart.hasChartTab)
            return;
        var datum = this.props.choroplethData[d.id];
        if (datum) {
            chart.tab = 'chart';
            chart.data.selectedKeys = chart.data.availableKeysByEntity.get(datum.entity) || [];
        }
    };
    MapWithLegend.prototype.componentWillUnmount = function () {
        this.onMapMouseLeave();
        this.onLegendMouseLeave();
    };
    MapWithLegend.prototype.onLegendMouseOver = function (d) {
        this.focusBracket = d;
    };
    MapWithLegend.prototype.onTargetChange = function (_a) {
        var targetStartYear = _a.targetStartYear;
        this.context.chart.map.targetYear = targetStartYear;
    };
    MapWithLegend.prototype.onLegendMouseLeave = function () {
        this.focusBracket = null;
    };
    Object.defineProperty(MapWithLegend.prototype, "hasTimeline", {
        get: function () {
            return !this.context.chart.map.props.hideTimeline && this.props.years.length > 1 && !this.context.chartView.isExport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapWithLegend.prototype, "mapLegend", {
        get: function () {
            var that = this;
            return new MapLegend_1.default({
                get bounds() { return that.props.bounds.padBottom(15); },
                get legendData() { return that.props.legendData; },
                get equalSizeBins() { return that.context.chart.map.props.equalSizeBins; },
                get title() { return that.props.legendTitle; },
                get focusBracket() { return that.focusBracket; },
                get focusEntity() { return that.focusEntity; },
                get fontSize() { return that.context.chart.baseFontSize; }
            });
        },
        enumerable: true,
        configurable: true
    });
    MapWithLegend.prototype.componentDidMount = function () {
        d3_selection_1.select(this.base).selectAll("path")
            .attr("data-fill", function () { return this.getAttribute("fill"); })
            .attr("fill", this.context.chart.map.noDataColor)
            .transition()
            .duration(500)
            .ease(d3_ease_1.easeCubic)
            .attr("fill", function () { return this.getAttribute("data-fill"); })
            .attr("data-fill", function () { return this.getAttribute("fill"); });
    };
    MapWithLegend.prototype.render = function () {
        var _a = this.props, choroplethData = _a.choroplethData, projection = _a.projection, defaultFill = _a.defaultFill;
        var _b = this.props, bounds = _b.bounds, years = _b.years, inputYear = _b.inputYear;
        var _c = this, focusBracket = _c.focusBracket, focusEntity = _c.focusEntity, mapLegend = _c.mapLegend, tooltip = _c.tooltip;
        return React.createElement("g", { className: "mapTab" },
            React.createElement(ChoroplethMap_1.default, { bounds: bounds.padBottom(mapLegend.height + 15), choroplethData: choroplethData, projection: projection, defaultFill: defaultFill, onHover: this.onMapMouseOver, onHoverStop: this.onMapMouseLeave, onClick: this.onClick, focusBracket: focusBracket, focusEntity: focusEntity }),
            React.createElement(MapLegend_1.MapLegendView, { legend: mapLegend, onMouseOver: this.onLegendMouseOver, onMouseLeave: this.onLegendMouseLeave }),
            tooltip);
    };
    __decorate([
        mobx_1.observable
    ], MapWithLegend.prototype, "focusEntity", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapWithLegend.prototype, "tooltip", void 0);
    __decorate([
        mobx_1.observable
    ], MapWithLegend.prototype, "focusBracket", void 0);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onMapMouseOver", null);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onMapMouseLeave", null);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onClick", null);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onLegendMouseOver", null);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onTargetChange", null);
    __decorate([
        mobx_1.action.bound
    ], MapWithLegend.prototype, "onLegendMouseLeave", null);
    __decorate([
        mobx_1.computed
    ], MapWithLegend.prototype, "hasTimeline", null);
    __decorate([
        mobx_1.computed
    ], MapWithLegend.prototype, "mapLegend", null);
    MapWithLegend = __decorate([
        mobx_react_1.observer
    ], MapWithLegend);
    return MapWithLegend;
}(React.Component));
var MapTab = /** @class */ (function (_super) {
    __extends(MapTab, _super);
    function MapTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MapTab.prototype, "map", {
        get: function () { return this.props.chart.map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapTab.prototype, "header", {
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
    Object.defineProperty(MapTab.prototype, "footer", {
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
    MapTab.prototype.render = function () {
        var map = this.map;
        if (!map.data.isReady)
            return React.createElement(NoData_1.default, { bounds: this.props.bounds });
        var bounds = this.props.bounds;
        var _a = this, header = _a.header, footer = _a.footer;
        return React.createElement("g", { className: "mapTab" },
            header.render(bounds.x, bounds.y),
            React.createElement(MapWithLegend, { bounds: bounds.padTop(header.height + 5).padBottom(footer.height), choroplethData: map.data.choroplethData, years: map.data.timelineYears, inputYear: map.data.targetYear, legendData: map.data.legendData, legendTitle: map.data.legendTitle, projection: map.projection, defaultFill: map.noDataColor }),
            footer.render(bounds.x, bounds.bottom - footer.height));
    };
    __decorate([
        mobx_1.computed
    ], MapTab.prototype, "map", null);
    __decorate([
        mobx_1.computed
    ], MapTab.prototype, "header", null);
    __decorate([
        mobx_1.computed
    ], MapTab.prototype, "footer", null);
    MapTab = __decorate([
        mobx_react_1.observer
    ], MapTab);
    return MapTab;
}(React.Component));
exports.default = MapTab;
//# sourceMappingURL=MapTab.js.map