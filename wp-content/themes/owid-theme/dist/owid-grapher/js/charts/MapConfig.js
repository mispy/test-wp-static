"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var MapData_1 = require("./MapData");
var Util_1 = require("./Util");
// MapConfig holds the data and underlying logic needed by MapTab.
// It wraps the map property on ChartConfig.
var MapConfigProps = /** @class */ (function () {
    function MapConfigProps(json) {
        // Minimum value shown on map legend
        this.colorSchemeMinValue = 0;
        this.colorSchemeValues = [];
        this.colorSchemeLabels = [];
        this.isManualBuckets = undefined;
        this.equalSizeBins = undefined;
        // Whether to reverse the color scheme on output
        this.colorSchemeInvert = undefined;
        this.customColorsActive = undefined;
        // e.g. ["#000", "#c00", "#0c0", "#00c", "#c0c"]
        this.customNumericColors = [];
        // e.g. { 'foo' => '#c00' }
        this.customCategoryColors = {};
        this.customCategoryLabels = {};
        // Allow hiding categories from the legend
        this.customHiddenCategories = {};
        this.projection = 'World';
        this.defaultProjection = 'World';
        this.legendDescription = undefined;
        this.binStepSize = undefined;
        if (json !== undefined) {
            for (var key in this) {
                if (key in json) {
                    this[key] = json[key];
                }
            }
        }
    }
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "variableId", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "targetYear", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "timeTolerance", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "hideTimeline", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "baseColorScheme", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "colorSchemeMinValue", void 0);
    __decorate([
        mobx_1.observable.struct
    ], MapConfigProps.prototype, "colorSchemeValues", void 0);
    __decorate([
        mobx_1.observable.struct
    ], MapConfigProps.prototype, "colorSchemeLabels", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "isManualBuckets", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "equalSizeBins", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "colorSchemeInvert", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "customColorsActive", void 0);
    __decorate([
        mobx_1.observable.struct
    ], MapConfigProps.prototype, "customNumericColors", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "customCategoryColors", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "customCategoryLabels", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "customHiddenCategories", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "projection", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "defaultProjection", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "legendDescription", void 0);
    __decorate([
        mobx_1.observable.ref
    ], MapConfigProps.prototype, "binStepSize", void 0);
    return MapConfigProps;
}());
exports.MapConfigProps = MapConfigProps;
var MapConfig = /** @class */ (function () {
    function MapConfig(chart) {
        this.chart = chart;
    }
    Object.defineProperty(MapConfig.prototype, "props", {
        get: function () {
            return this.chart.props.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "variableId", {
        get: function () { return this.props.variableId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "tolerance", {
        get: function () { return Util_1.defaultTo(this.props.timeTolerance, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "minBucketValue", {
        get: function () { return +Util_1.defaultTo(this.props.colorSchemeMinValue, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "colorSchemeValues", {
        get: function () { return Util_1.defaultTo(this.props.colorSchemeValues, []); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "isCustomColors", {
        get: function () { return Util_1.defaultTo(this.props.customColorsActive, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "customNumericColors", {
        get: function () { return Util_1.defaultTo(this.isCustomColors ? this.props.customNumericColors : [], []); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "customCategoryColors", {
        get: function () { return Util_1.defaultTo(this.isCustomColors ? this.props.customCategoryColors : {}, {}); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "customHiddenCategories", {
        get: function () { return Util_1.defaultTo(this.props.customHiddenCategories, {}); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "isColorSchemeInverted", {
        get: function () { return Util_1.defaultTo(this.props.colorSchemeInvert, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "customCategoryLabels", {
        get: function () { return Util_1.defaultTo(this.props.customCategoryLabels, {}); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "projection", {
        get: function () { return Util_1.defaultTo(this.props.projection, "World"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "baseColorScheme", {
        get: function () { return Util_1.defaultTo(this.props.baseColorScheme, "BuGn"); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "noDataColor", {
        get: function () {
            return Util_1.defaultTo(this.customCategoryColors['No data'], "#adacac");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "data", {
        get: function () {
            return new MapData_1.default(this.chart);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConfig.prototype, "targetYear", {
        set: function (value) {
            this.props.targetYear = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "variableId", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "tolerance", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "minBucketValue", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "colorSchemeValues", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "isCustomColors", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "customNumericColors", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "customCategoryColors", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "customHiddenCategories", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "isColorSchemeInverted", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "customCategoryLabels", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "projection", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "baseColorScheme", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "noDataColor", null);
    __decorate([
        mobx_1.computed
    ], MapConfig.prototype, "data", null);
    return MapConfig;
}());
exports.default = MapConfig;
//# sourceMappingURL=MapConfig.js.map