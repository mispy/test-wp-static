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
var ReactDOM = require("react-dom");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var d3_selection_1 = require("d3-selection");
require("d3-transition");
var ChartConfig_1 = require("./ChartConfig");
var ControlsFooter_1 = require("./ControlsFooter");
var ChartTab_1 = require("./ChartTab");
var DataTab_1 = require("./DataTab");
var MapTab_1 = require("./MapTab");
var SourcesTab_1 = require("./SourcesTab");
var DownloadTab_1 = require("./DownloadTab");
var Util_1 = require("./Util");
var Bounds_1 = require("./Bounds");
var DataSelector_1 = require("./DataSelector");
var ChartView = /** @class */ (function (_super) {
    __extends(ChartView, _super);
    function ChartView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popups = [];
        _this.isSelectingData = false;
        _this.hasFadedIn = false;
        return _this;
    }
    ChartView_1 = ChartView;
    ChartView.bootstrap = function (_a) {
        var jsonConfig = _a.jsonConfig, containerNode = _a.containerNode, isEditor = _a.isEditor, isEmbed = _a.isEmbed, queryStr = _a.queryStr;
        d3_selection_1.select(containerNode).classed('chart-container', true);
        var chartView;
        var chart = new ChartConfig_1.default(jsonConfig, { isEmbed: isEmbed, queryStr: queryStr });
        function render() {
            var rect = containerNode.getBoundingClientRect();
            var containerBounds = Bounds_1.default.fromRect(rect);
            if (containerBounds.width <= 350)
                chart.baseFontSize = 14;
            else if (containerBounds.width >= 1080)
                chart.baseFontSize = 18;
            Bounds_1.default.baseFontFamily = "Helvetica, Arial";
            chartView = ReactDOM.render(React.createElement(ChartView_1, { bounds: containerBounds, chart: chart, isEditor: isEditor, isEmbed: isEmbed }), containerNode);
        }
        render();
        window.addEventListener('resize', Util_1.throttle(render));
        return chartView;
    };
    Object.defineProperty(ChartView.prototype, "chart", {
        get: function () { return this.props.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isExport", {
        get: function () { return !!this.props.isExport; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isEditor", {
        get: function () { return !!this.props.isEditor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isEmbed", {
        get: function () { return this.props.isEmbed || (!this.isExport && (window.self !== window.top || this.isEditor)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isMobile", {
        get: function () { return d3_selection_1.select('html').classed('touchevents'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "containerBounds", {
        get: function () { return this.props.bounds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isPortrait", {
        get: function () { return this.containerBounds.width < this.containerBounds.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "isLandscape", {
        get: function () { return !this.isPortrait; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "authorWidth", {
        get: function () { return this.isPortrait ? 400 : 850; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "authorHeight", {
        get: function () { return this.isPortrait ? 640 : 600; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "fitBounds", {
        // If the available space is very small, we use all of the space given to us
        get: function () {
            var _a = this, isEditor = _a.isEditor, isEmbed = _a.isEmbed, isExport = _a.isExport, containerBounds = _a.containerBounds, authorWidth = _a.authorWidth, authorHeight = _a.authorHeight;
            if (isEditor)
                return false;
            else
                return isEmbed || isExport || containerBounds.height < authorHeight || containerBounds.width < authorWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "paddedWidth", {
        // If we have a big screen to be in, we can define our own aspect ratio and sit in the center
        get: function () { return this.isPortrait ? this.containerBounds.width * 0.9 : this.containerBounds.width * 0.9; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "paddedHeight", {
        get: function () { return this.isPortrait ? this.containerBounds.height * 0.9 : this.containerBounds.height * 0.9; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "scaleToFitIdeal", {
        get: function () {
            return Math.min(this.paddedWidth / this.authorWidth, this.paddedHeight / this.authorHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "idealWidth", {
        get: function () { return this.authorWidth * this.scaleToFitIdeal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "idealHeight", {
        get: function () { return this.authorHeight * this.scaleToFitIdeal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "renderWidth", {
        // These are the final render dimensions
        get: function () { return this.fitBounds ? this.containerBounds.width - (this.isExport ? 0 : 5) : this.idealWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "renderHeight", {
        get: function () { return this.fitBounds ? this.containerBounds.height - (this.isExport ? 0 : 5) : this.idealHeight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "controlsFooter", {
        get: function () {
            var that = this;
            return new ControlsFooter_1.ControlsFooter({
                get chart() { return that.props.chart; },
                get chartView() { return that; },
                get width() { return that.renderWidth; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "svgBounds", {
        get: function () {
            return (new Bounds_1.default(0, 0, this.renderWidth, this.renderHeight)).padBottom(this.isExport ? 0 : this.controlsFooter.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "svgInnerBounds", {
        get: function () {
            return new Bounds_1.default(0, 0, this.svgBounds.width, this.svgBounds.height).pad(15);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartView.prototype, "classNames", {
        get: function () {
            var classNames = [
                "chart",
                this.isExport && "export",
                this.isEditor && "editor",
                this.isEmbed && "embed",
                this.isPortrait && "portrait",
                this.isLandscape && "landscape"
            ];
            return classNames.filter(function (n) { return !!n; }).join(' ');
        },
        enumerable: true,
        configurable: true
    });
    ChartView.prototype.addPopup = function (vnode) {
        this.popups.push(vnode);
    };
    ChartView.prototype.removePopup = function (vnodeType) {
        this.popups = this.popups.filter(function (d) { return !(d.nodeName === vnodeType); });
    };
    ChartView.prototype.getChildContext = function () {
        return {
            chart: this.chart,
            chartView: this,
            baseFontSize: this.chart.baseFontSize,
            isStatic: this.isExport,
            addPopup: this.addPopup.bind(this),
            removePopup: this.removePopup.bind(this)
        };
    };
    ChartView.prototype.renderPrimaryTab = function (bounds) {
        var chart = this.chart;
        if (chart.primaryTab === 'chart')
            return React.createElement(ChartTab_1.default, { bounds: bounds, chartView: this, chart: this.chart });
        else if (chart.primaryTab === 'map')
            return React.createElement(MapTab_1.default, { bounds: bounds, chart: this.chart });
        else
            return undefined;
    };
    ChartView.prototype.renderOverlayTab = function (bounds) {
        var chart = this.chart;
        if (chart.overlayTab === 'sources')
            return React.createElement(SourcesTab_1.default, { bounds: bounds, chart: chart });
        else if (chart.overlayTab === 'data')
            return React.createElement(DataTab_1.default, { bounds: bounds, chart: chart });
        else if (chart.overlayTab === 'download')
            return React.createElement(DownloadTab_1.default, { bounds: bounds, chart: chart });
        else
            return undefined;
    };
    ChartView.prototype.renderSVG = function () {
        var _this = this;
        var _a = this, chart = _a.chart, svgBounds = _a.svgBounds, svgInnerBounds = _a.svgInnerBounds;
        var svgStyle = {
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: chart.baseFontSize,
            backgroundColor: "white",
            "text-rendering": "optimizeLegibility",
            "-webkit-font-smoothing": "antialiased"
        };
        return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", style: svgStyle, width: svgBounds.width, height: svgBounds.height, ref: function (e) { return _this.svgNode = e; } }, this.renderPrimaryTab(svgInnerBounds));
    };
    ChartView.prototype.renderReady = function () {
        var _this = this;
        var _a = this, svgBounds = _a.svgBounds, chart = _a.chart;
        return [
            this.renderSVG(),
            React.createElement(ControlsFooter_1.ControlsFooterView, { controlsFooter: this.controlsFooter }),
            this.renderOverlayTab(svgBounds),
            this.popups,
            this.chart.tooltip,
            this.isSelectingData && React.createElement(DataSelector_1.default, { chart: chart, chartView: this, onDismiss: mobx_1.action(function () { return _this.isSelectingData = false; }) })
        ];
    };
    ChartView.prototype.render = function () {
        if (this.isExport) {
            return this.renderSVG();
        }
        else {
            var _a = this, renderWidth = _a.renderWidth, renderHeight = _a.renderHeight;
            var style = { width: renderWidth, height: renderHeight, fontSize: this.chart.baseFontSize };
            return this.chart.data.isReady && React.createElement("div", { className: this.classNames, style: style }, this.renderReady());
        }
    };
    ChartView.prototype.componentDidMount = function () {
        this.htmlNode = this.base;
        window.chartView = this;
    };
    ChartView.prototype.componentDidUpdate = function () {
        if (this.chart.data.isReady && !this.hasFadedIn) {
            d3_selection_1.select(this.base).selectAll(".chart > *").style('opacity', 0).transition().style('opacity', null);
            this.hasFadedIn = true;
        }
    };
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isExport", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isEditor", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isEmbed", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isMobile", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "containerBounds", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isPortrait", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "isLandscape", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "authorWidth", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "authorHeight", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "fitBounds", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "paddedWidth", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "paddedHeight", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "scaleToFitIdeal", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "idealWidth", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "idealHeight", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "renderWidth", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "renderHeight", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "controlsFooter", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "svgBounds", null);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "svgInnerBounds", null);
    __decorate([
        mobx_1.observable
    ], ChartView.prototype, "popups", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartView.prototype, "isSelectingData", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartView.prototype, "htmlNode", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartView.prototype, "svgNode", void 0);
    __decorate([
        mobx_1.computed
    ], ChartView.prototype, "classNames", null);
    ChartView = ChartView_1 = __decorate([
        mobx_react_1.observer
    ], ChartView);
    return ChartView;
    var ChartView_1;
}(React.Component));
exports.default = ChartView;
//# sourceMappingURL=ChartView.js.map