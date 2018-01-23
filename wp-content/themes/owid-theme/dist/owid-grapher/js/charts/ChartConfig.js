"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var AxisConfig_1 = require("./AxisConfig");
var ChartType_1 = require("./ChartType");
var Util_2 = require("./Util");
var VariableData_1 = require("./VariableData");
var ChartData_1 = require("./ChartData");
var MapConfig_1 = require("./MapConfig");
var URLBinder_1 = require("./URLBinder");
var DiscreteBarTransform_1 = require("./DiscreteBarTransform");
var StackedAreaTransform_1 = require("./StackedAreaTransform");
var LineChartTransform_1 = require("./LineChartTransform");
var ScatterTransform_1 = require("./ScatterTransform");
var SlopeChartTransform_1 = require("./SlopeChartTransform");
var ChartView_1 = require("./ChartView");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var Bounds_1 = require("./Bounds");
var ChartDimension_1 = require("./ChartDimension");
var md5 = require("md5");
var isNode = require('detect-node');
var DimensionSlot = /** @class */ (function () {
    function DimensionSlot(chart, property) {
        this.chart = chart;
        this.property = property;
    }
    Object.defineProperty(DimensionSlot.prototype, "name", {
        get: function () {
            var names = {
                y: this.chart.isDiscreteBar ? "X axis" : "Y axis",
                x: "X axis",
                size: "Size",
                color: "Color",
                filter: "Filter"
            };
            return names[this.property] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionSlot.prototype, "allowMultiple", {
        get: function () {
            return this.property === "y" && !(this.chart.isScatter || this.chart.isSlopeChart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionSlot.prototype, "isOptional", {
        get: function () {
            return this.allowMultiple || this.property === "filter";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionSlot.prototype, "dimensions", {
        get: function () {
            var _this = this;
            return this.chart.dimensions.filter(function (d) { return d.property === _this.property; });
        },
        set: function (dims) {
            var _this = this;
            var newDimensions = [];
            this.chart.dimensionSlots.forEach(function (slot) {
                if (slot.property === _this.property)
                    newDimensions = newDimensions.concat(dims);
                else
                    newDimensions = newDimensions.concat(slot.dimensions);
            });
            this.chart.props.dimensions = newDimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionSlot.prototype, "dimensionsWithData", {
        get: function () {
            var _this = this;
            return this.chart.data.filledDimensions.filter(function (d) { return d.property === _this.property; });
        },
        enumerable: true,
        configurable: true
    });
    DimensionSlot.prototype.createDimension = function (variableId) {
        return new ChartDimension_1.default({ property: this.property, variableId: variableId });
    };
    __decorate([
        mobx_1.computed
    ], DimensionSlot.prototype, "name", null);
    __decorate([
        mobx_1.computed
    ], DimensionSlot.prototype, "allowMultiple", null);
    __decorate([
        mobx_1.computed
    ], DimensionSlot.prototype, "isOptional", null);
    __decorate([
        mobx_1.computed
    ], DimensionSlot.prototype, "dimensions", null);
    __decorate([
        mobx_1.computed
    ], DimensionSlot.prototype, "dimensionsWithData", null);
    return DimensionSlot;
}());
exports.DimensionSlot = DimensionSlot;
// This configuration represents the entire persistent state of a grapher chart
// Ideally, this is also all of the interaction state: when a chart is saved and loaded again
// under the same rendering conditions it ought to remain visually identical
var ChartConfigProps = /** @class */ (function () {
    function ChartConfigProps() {
        this.type = "LineChart";
        this.id = undefined;
        this.slug = undefined;
        this.title = undefined;
        this.subtitle = undefined;
        this.sourceDesc = undefined;
        this.note = undefined;
        this.hideTitleAnnotation = undefined;
        this.xAxis = new AxisConfig_1.AxisConfigProps();
        this.yAxis = new AxisConfig_1.AxisConfigProps();
        this.selectedData = [];
        this.minTime = undefined;
        this.maxTime = undefined;
        this.dimensions = [];
        this.addCountryMode = undefined;
        this.comparisonLine = undefined;
        this.highlightToggle = undefined;
        this.stackMode = "absolute";
        this.hideLegend = undefined;
        this.hideRelativeToggle = undefined;
        this.entityType = undefined;
        this.hasChartTab = true;
        this.hasMapTab = false;
        this.tab = "chart";
        this.overlay = undefined;
        this.internalNotes = undefined;
        this.originUrl = undefined;
        this.isPublished = undefined;
        this.baseColorScheme = undefined;
        this.invertColorScheme = undefined;
        // Currently scatterplot-specific options
        this.hideTimeline = undefined;
        this.hideLinesOutsideTolerance = undefined;
        this.compareEndPointsOnly = undefined;
        this.matchingEntitiesOnly = undefined;
        this.excludedEntities = undefined;
        this.map = undefined;
        this.lastEditedAt = undefined;
    }
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "type", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "id", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "slug", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "title", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "subtitle", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "sourceDesc", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "note", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hideTitleAnnotation", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "xAxis", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "yAxis", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "selectedData", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "minTime", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "maxTime", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "dimensions", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "addCountryMode", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "comparisonLine", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "highlightToggle", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "stackMode", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hideLegend", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hideRelativeToggle", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "entityType", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hasChartTab", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hasMapTab", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "tab", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "overlay", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "internalNotes", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "originUrl", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "isPublished", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "baseColorScheme", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "invertColorScheme", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hideTimeline", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "hideLinesOutsideTolerance", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "compareEndPointsOnly", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfigProps.prototype, "matchingEntitiesOnly", void 0);
    __decorate([
        mobx_1.observable.struct
    ], ChartConfigProps.prototype, "excludedEntities", void 0);
    __decorate([
        mobx_1.observable
    ], ChartConfigProps.prototype, "map", void 0);
    __decorate([
        mobx_1.observable
    ], ChartConfigProps.prototype, "lastEditedAt", void 0);
    return ChartConfigProps;
}());
exports.ChartConfigProps = ChartConfigProps;
// TODO: this really represents more than just the configuration state and should be split
// into multiple components. It's sort of the top-level chart state.
var ChartConfig = /** @class */ (function () {
    function ChartConfig(props, options) {
        if (options === void 0) { options = {}; }
        this.props = new ChartConfigProps();
        this.baseFontSize = 16;
        this.isEmbed = !!options.isEmbed;
        this.isMediaCard = !!options.isMediaCard;
        this.isNode = isNode;
        this.update(props || new ChartConfigProps());
        this.vardata = new VariableData_1.default(this);
        this.data = new ChartData_1.default(this);
        this.url = new URLBinder_1.default(this, options.queryStr);
        console.log(options.queryStr);
        if (this.isMediaCard)
            this.baseFontSize = 24;
        window.chart = this;
        if (!this.isNode)
            this.ensureValidConfig();
    }
    Object.defineProperty(ChartConfig.prototype, "isIframe", {
        get: function () {
            return window.self !== window.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isEditor", {
        get: function () {
            return App.isEditor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isNativeEmbed", {
        get: function () {
            return this.isEmbed && !this.isIframe && !this.isLocalExport;
        },
        enumerable: true,
        configurable: true
    });
    ChartConfig.prototype.ensureValidConfig = function () {
        var _this = this;
        mobx_1.autorun(function () {
            if (!Util_1.includes(_this.availableTabs, _this.props.tab)) {
                mobx_1.runInAction(function () { return _this.props.tab = _this.availableTabs[0]; });
            }
        });
        mobx_1.autorun(function () {
            if (_this.props.hasMapTab && !_this.props.map) {
                mobx_1.runInAction(function () { return _this.props.map = new MapConfig_1.MapConfigProps(); });
            }
        });
        mobx_1.autorun(function () {
            if (!Util_1.isEqual(_this.props.dimensions, _this.validDimensions)) {
                _this.props.dimensions = _this.validDimensions;
            }
        });
    };
    Object.defineProperty(ChartConfig.prototype, "subtitle", {
        get: function () { return Util_2.defaultTo(this.props.subtitle, ""); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "note", {
        get: function () { return Util_2.defaultTo(this.props.note, ""); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "internalNotes", {
        get: function () { return Util_2.defaultTo(this.props.internalNotes, ""); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "originUrl", {
        get: function () { return Util_2.defaultTo(this.props.originUrl, ""); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isPublished", {
        get: function () { return Util_2.defaultTo(this.props.isPublished, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "primaryTab", {
        get: function () { return this.props.tab; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "overlayTab", {
        get: function () { return this.props.overlay; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "addCountryMode", {
        get: function () { return this.props.addCountryMode || "add-country"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "comparisonLine", {
        get: function () { return this.props.comparisonLine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "highlightToggle", {
        get: function () { return this.props.highlightToggle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "hasChartTab", {
        get: function () { return this.props.hasChartTab; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "hasMapTab", {
        get: function () { return this.props.hasMapTab; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "hideLegend", {
        get: function () { return this.props.hideLegend; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "baseColorScheme", {
        get: function () { return this.props.baseColorScheme; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "entityType", {
        get: function () { return Util_2.defaultTo(this.props.entityType, "country"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "tab", {
        get: function () { return this.props.overlay ? this.props.overlay : this.props.tab; },
        set: function (value) {
            if (value === "chart" || value === "map") {
                this.props.tab = value;
                this.props.overlay = undefined;
            }
            else {
                this.props.overlay = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "timeDomain", {
        get: function () {
            return [this.props.minTime || undefined, this.props.maxTime || undefined];
        },
        set: function (value) {
            this.props.minTime = value[0] || undefined;
            this.props.maxTime = value[1] || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "xAxis", {
        get: function () {
            return new AxisConfig_1.default(this.props.xAxis);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "yAxis", {
        get: function () {
            return new AxisConfig_1.default(this.props.yAxis);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "dimensionSlots", {
        // Get the dimension slots appropriate for this type of chart
        get: function () {
            var xAxis = new DimensionSlot(this, "x");
            var yAxis = new DimensionSlot(this, "y");
            var color = new DimensionSlot(this, "color");
            var size = new DimensionSlot(this, "size");
            if (this.isScatter)
                return [yAxis, xAxis, size, color];
            else if (this.isSlopeChart)
                return [yAxis, size, color];
            else
                return [yAxis];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "validDimensions", {
        get: function () {
            var dimensions = this.props.dimensions;
            var validProperties = Util_1.map(this.dimensionSlots, "property");
            var validDimensions = Util_1.filter(dimensions, function (dim) { return Util_1.includes(validProperties, dim.property); });
            this.dimensionSlots.forEach(function (slot) {
                if (!slot.allowMultiple)
                    validDimensions = Util_1.uniqWith(validDimensions, function (a, b) { return a.property === slot.property && a.property === b.property; });
            });
            // Give scatterplots and slope charts a default color and size dimension if they don't have one
            if ((this.isScatter || this.isSlopeChart) && !Util_1.find(dimensions, { property: "color" })) {
                validDimensions = validDimensions.concat(new ChartDimension_1.default({ variableId: 123, property: "color" }));
            }
            if ((this.isScatter || this.isSlopeChart) && !Util_1.find(dimensions, { property: "size" })) {
                validDimensions = validDimensions.concat(new ChartDimension_1.default({ variableId: 72, property: "size" }));
            }
            return validDimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "dimensions", {
        get: function () {
            return this.props.dimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "availableTabs", {
        get: function () {
            return Util_1.filter([this.props.hasChartTab && "chart", this.props.hasMapTab && "map", "data", "sources", "download"]);
        },
        enumerable: true,
        configurable: true
    });
    ChartConfig.prototype.update = function (json) {
        for (var key in this.props) {
            if (key in json && key !== "xAxis" && key !== "yAxis") {
                this.props[key] = json[key];
            }
        }
        if (json.isAutoTitle)
            this.props.title = undefined;
        // Auto slug is only preserved for drafts in the editor
        // Once published, slug should stick around (we don't want to create too many redirects)
        if (json.isAutoSlug && App.isEditor && !json.isPublished)
            this.props.slug = undefined;
        this.props.map = new MapConfig_1.MapConfigProps(json.map);
        Util_1.extend(this.props.xAxis, json["xAxis"]);
        Util_1.extend(this.props.yAxis, json["yAxis"]);
        this.props.dimensions = (json.dimensions || []).map(function (j) { return new ChartDimension_1.default(j); });
        this.logosSVG = json["logosSVG"];
    };
    Object.defineProperty(ChartConfig.prototype, "json", {
        get: function () {
            var props = this.props;
            var json = mobx_1.toJS(this.props);
            // Chart title and slug may be autocalculated from data, in which case they won't be in props
            // But the server will need to know what we calculated in order to do its job
            if (!this.props.title) {
                json.title = this.data.title;
                json.isAutoTitle = true;
            }
            if (!this.props.slug) {
                json.slug = this.data.slug;
                json.isAutoSlug = true;
            }
            return json;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isLineChart", {
        get: function () { return this.props.type === ChartType_1.default.LineChart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isScatter", {
        get: function () { return this.props.type === ChartType_1.default.ScatterPlot; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isStackedArea", {
        get: function () { return this.props.type === ChartType_1.default.StackedArea; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isSlopeChart", {
        get: function () { return this.props.type === ChartType_1.default.SlopeChart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "isDiscreteBar", {
        get: function () { return this.props.type === ChartType_1.default.DiscreteBar; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "lineChart", {
        get: function () { return new LineChartTransform_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "scatter", {
        get: function () { return new ScatterTransform_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "stackedArea", {
        get: function () { return new StackedAreaTransform_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "slopeChart", {
        get: function () { return new SlopeChartTransform_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "discreteBar", {
        get: function () { return new DiscreteBarTransform_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "map", {
        get: function () { return new MapConfig_1.default(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "activeTransform", {
        get: function () {
            if (this.isLineChart)
                return this.lineChart;
            else if (this.isScatter)
                return this.scatter;
            else if (this.isStackedArea)
                return this.stackedArea;
            else if (this.isSlopeChart)
                return this.slopeChart;
            else if (this.isDiscreteBar)
                return this.discreteBar;
            else
                throw new Error("No transform found");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "idealBounds", {
        get: function () {
            return this.isMediaCard ? new Bounds_1.default(0, 0, 1200, 630) : new Bounds_1.default(0, 0, 1020, 720);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "staticSVG", {
        get: function () {
            var svg = ReactDOMServer.renderToStaticMarkup(React.createElement(ChartView_1.default, { chart: this, isExport: true, bounds: this.idealBounds }));
            return svg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartConfig.prototype, "cacheTag", {
        get: function () {
            return md5(JSON.stringify(this.props));
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "logosSVG", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "variableCacheTag", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "tooltip", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "isEmbed", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "isMediaCard", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "isNode", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "isLocalExport", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartConfig.prototype, "baseFontSize", void 0);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isIframe", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isNativeEmbed", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "subtitle", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "note", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "internalNotes", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "originUrl", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isPublished", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "primaryTab", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "overlayTab", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "addCountryMode", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "comparisonLine", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "highlightToggle", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "hasChartTab", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "hasMapTab", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "hideLegend", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "baseColorScheme", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "entityType", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "tab", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "timeDomain", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "yAxis", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "dimensionSlots", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "validDimensions", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "dimensions", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "availableTabs", null);
    __decorate([
        mobx_1.action.bound
    ], ChartConfig.prototype, "update", null);
    __decorate([
        mobx_1.computed.struct
    ], ChartConfig.prototype, "json", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isLineChart", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isScatter", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isStackedArea", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isSlopeChart", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "isDiscreteBar", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "lineChart", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "scatter", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "stackedArea", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "slopeChart", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "discreteBar", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "map", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "activeTransform", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "idealBounds", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "staticSVG", null);
    __decorate([
        mobx_1.computed
    ], ChartConfig.prototype, "cacheTag", null);
    return ChartConfig;
}());
exports.default = ChartConfig;
//# sourceMappingURL=ChartConfig.js.map