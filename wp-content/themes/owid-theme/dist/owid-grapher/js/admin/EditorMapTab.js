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
var Util_1 = require("../charts/Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Forms_1 = require("./Forms");
var ColorSchemes_1 = require("../charts/ColorSchemes");
var MapData_1 = require("../charts/MapData");
var VariableSection = /** @class */ (function (_super) {
    __extends(VariableSection, _super);
    function VariableSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VariableSection.prototype.onVariableId = function (variableId) {
        this.props.mapConfig.props.variableId = variableId;
    };
    VariableSection.prototype.onProjection = function (projection) {
        this.props.mapConfig.props.projection = projection;
    };
    VariableSection.prototype.render = function () {
        var mapConfig = this.props.mapConfig;
        var filledDimensions = mapConfig.chart.data.filledDimensions;
        if (Util_1.isEmpty(filledDimensions))
            return React.createElement("section", null,
                React.createElement("h2", null, "Add some variables on data tab first"));
        var projections = ['World', 'Africa', 'NorthAmerica', 'SouthAmerica', 'Asia', 'Europe', 'Australia'];
        var labels = ['World', 'Africa', 'North America', 'South America', 'Asia', 'Europe', 'Australia'];
        return React.createElement(Forms_1.Section, { name: "Map" },
            React.createElement(Forms_1.NumericSelectField, { label: "Variable", value: mapConfig.variableId, options: filledDimensions.map(function (d) { return d.variableId; }), optionLabels: filledDimensions.map(function (d) { return d.displayName; }), onValue: this.onVariableId }),
            React.createElement(Forms_1.SelectField, { label: "Region", value: mapConfig.props.projection, options: projections, optionLabels: labels, onValue: this.onProjection }));
    };
    __decorate([
        mobx_1.action.bound
    ], VariableSection.prototype, "onVariableId", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSection.prototype, "onProjection", null);
    VariableSection = __decorate([
        mobx_react_1.observer
    ], VariableSection);
    return VariableSection;
}(React.Component));
var TimelineSection = /** @class */ (function (_super) {
    __extends(TimelineSection, _super);
    function TimelineSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineSection.prototype.onToggleHideTimeline = function (value) {
        this.props.mapConfig.props.hideTimeline = value || undefined;
    };
    TimelineSection.prototype.onTolerance = function (tolerance) {
        this.props.mapConfig.props.timeTolerance = tolerance;
    };
    TimelineSection.prototype.render = function () {
        var mapConfig = this.props.mapConfig;
        return React.createElement(Forms_1.Section, { name: "Timeline" },
            React.createElement(Forms_1.Toggle, { label: "Hide timeline", value: !!mapConfig.props.hideTimeline, onValue: this.onToggleHideTimeline }),
            React.createElement(Forms_1.NumberField, { label: "Tolerance of data", value: mapConfig.props.timeTolerance, onValue: this.onTolerance, helpText: "Specify a range of years from which to pull data. For example, if the map shows 1990 and tolerance is set to 1, then data from 1989 or 1991 will be shown if no data is available for 1990." }));
    };
    __decorate([
        mobx_1.action.bound
    ], TimelineSection.prototype, "onToggleHideTimeline", null);
    __decorate([
        mobx_1.action.bound
    ], TimelineSection.prototype, "onTolerance", null);
    TimelineSection = __decorate([
        mobx_react_1.observer
    ], TimelineSection);
    return TimelineSection;
}(React.Component));
var NumericBinView = /** @class */ (function (_super) {
    __extends(NumericBinView, _super);
    function NumericBinView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericBinView.prototype.onColor = function (color) {
        var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
        if (!mapConfig.isCustomColors) {
            // Creating a new custom color scheme
            mapConfig.props.customCategoryColors = {};
            mapConfig.props.customNumericColors = [];
            mapConfig.props.customColorsActive = true;
        }
        while (mapConfig.props.customNumericColors.length < mapConfig.data.numBins)
            mapConfig.props.customNumericColors.push(undefined);
        mapConfig.props.customNumericColors[index] = color;
    };
    NumericBinView.prototype.onMaximumValue = function (value) {
        var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
        if (value !== undefined)
            mapConfig.props.colorSchemeValues[index] = value;
    };
    NumericBinView.prototype.onLabel = function (value) {
        var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
        while (mapConfig.props.colorSchemeLabels.length < mapConfig.data.numBins)
            mapConfig.props.colorSchemeLabels.push(undefined);
        mapConfig.props.colorSchemeLabels[index] = value;
    };
    NumericBinView.prototype.onRemove = function () {
        var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
        mapConfig.props.colorSchemeValues.splice(index, 1);
        mapConfig.props.customNumericColors.splice(index, 1);
    };
    NumericBinView.prototype.onAddAfter = function () {
        var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
        var _b = mapConfig.props, colorSchemeValues = _b.colorSchemeValues, customNumericColors = _b.customNumericColors;
        var currentValue = colorSchemeValues[index];
        if (index === colorSchemeValues.length - 1)
            colorSchemeValues.push(currentValue + mapConfig.data.binStepSizeDefault);
        else {
            var newValue = (currentValue + colorSchemeValues[index + 1]) / 2;
            colorSchemeValues.splice(index + 1, 0, newValue);
            customNumericColors.splice(index + 1, 0, undefined);
        }
    };
    NumericBinView.prototype.render = function () {
        var _a = this.props, mapConfig = _a.mapConfig, bin = _a.bin;
        return React.createElement(Forms_1.EditableListItem, { className: "numeric" },
            React.createElement("div", { className: "clickable", onClick: this.onAddAfter },
                React.createElement("i", { className: "fa fa-plus" })),
            React.createElement(Forms_1.ColorBox, { color: bin.color, onColor: this.onColor }),
            React.createElement(Forms_1.NumberField, { value: bin.max, onValue: this.onMaximumValue }),
            mapConfig.props.colorSchemeValues.length > 2 && React.createElement("div", { className: "clickable", onClick: this.onRemove },
                React.createElement("i", { className: "fa fa-remove" })));
    };
    __decorate([
        mobx_1.action.bound
    ], NumericBinView.prototype, "onColor", null);
    __decorate([
        mobx_1.action.bound
    ], NumericBinView.prototype, "onMaximumValue", null);
    __decorate([
        mobx_1.action.bound
    ], NumericBinView.prototype, "onLabel", null);
    __decorate([
        mobx_1.action.bound
    ], NumericBinView.prototype, "onRemove", null);
    __decorate([
        mobx_1.action.bound
    ], NumericBinView.prototype, "onAddAfter", null);
    NumericBinView = __decorate([
        mobx_react_1.observer
    ], NumericBinView);
    return NumericBinView;
}(React.Component));
var CategoricalBinView = /** @class */ (function (_super) {
    __extends(CategoricalBinView, _super);
    function CategoricalBinView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalBinView.prototype.onColor = function (color) {
        var _a = this.props, mapConfig = _a.mapConfig, bin = _a.bin;
        if (!mapConfig.isCustomColors) {
            // Creating a new custom color scheme
            mapConfig.props.customCategoryColors = {};
            mapConfig.props.customNumericColors = [];
            mapConfig.props.customColorsActive = true;
        }
        var customCategoryColors = Util_1.clone(mapConfig.props.customCategoryColors);
        if (color === undefined)
            delete customCategoryColors[bin.value];
        else
            customCategoryColors[bin.value] = color;
        mapConfig.props.customCategoryColors = customCategoryColors;
    };
    CategoricalBinView.prototype.onLabel = function (value) {
        var _a = this.props, mapConfig = _a.mapConfig, bin = _a.bin;
        var customCategoryLabels = Util_1.clone(mapConfig.props.customCategoryLabels);
        customCategoryLabels[bin.value] = value;
        mapConfig.props.customCategoryLabels = customCategoryLabels;
    };
    CategoricalBinView.prototype.onToggleHidden = function () {
        var _a = this.props, mapConfig = _a.mapConfig, bin = _a.bin;
        var customHiddenCategories = Util_1.clone(mapConfig.props.customHiddenCategories);
        if (bin.isHidden)
            delete customHiddenCategories[bin.value];
        else
            customHiddenCategories[bin.value] = true;
        mapConfig.props.customHiddenCategories = customHiddenCategories;
    };
    CategoricalBinView.prototype.render = function () {
        var bin = this.props.bin;
        return React.createElement(Forms_1.EditableListItem, { className: "categorical" },
            React.createElement(Forms_1.ColorBox, { color: bin.color, onColor: this.onColor }),
            React.createElement(Forms_1.TextField, { value: bin.value, disabled: true, onValue: Util_1.noop }),
            React.createElement(Forms_1.Toggle, { label: "Hide", value: bin.isHidden, onValue: this.onToggleHidden }));
    };
    __decorate([
        mobx_1.action.bound
    ], CategoricalBinView.prototype, "onColor", null);
    __decorate([
        mobx_1.action.bound
    ], CategoricalBinView.prototype, "onLabel", null);
    __decorate([
        mobx_1.action.bound
    ], CategoricalBinView.prototype, "onToggleHidden", null);
    CategoricalBinView = __decorate([
        mobx_react_1.observer
    ], CategoricalBinView);
    return CategoricalBinView;
}(React.Component));
var ColorSchemeEditor = /** @class */ (function (_super) {
    __extends(ColorSchemeEditor, _super);
    function ColorSchemeEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorSchemeEditor.prototype.render = function () {
        var mapConfig = this.props.map;
        var dimension = mapConfig.data.dimension;
        if (!dimension)
            return null;
        return React.createElement("div", null,
            React.createElement(Forms_1.BindAutoFloat, { field: "colorSchemeMinValue", store: mapConfig.props, auto: 0, label: "Minimum value" }),
            React.createElement(Forms_1.EditableList, { className: "ColorSchemeEditor" }, mapConfig.data.legendData.map(function (bin, index) {
                if (bin instanceof MapData_1.NumericBin) {
                    return React.createElement(NumericBinView, { mapConfig: mapConfig, bin: bin, index: index });
                }
                else {
                    return React.createElement(CategoricalBinView, { mapConfig: mapConfig, bin: bin });
                }
            })));
    };
    ColorSchemeEditor = __decorate([
        mobx_react_1.observer
    ], ColorSchemeEditor);
    return ColorSchemeEditor;
}(React.Component));
var ColorsSection = /** @class */ (function (_super) {
    __extends(ColorsSection, _super);
    function ColorsSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorsSection.prototype.onColorScheme = function (schemeKey) {
        var mapConfig = this.props.mapConfig;
        if (schemeKey === 'custom') {
            mapConfig.props.customColorsActive = true;
        }
        else {
            mapConfig.props.baseColorScheme = schemeKey;
            mapConfig.props.customColorsActive = undefined;
        }
    };
    ColorsSection.prototype.onInvert = function (invert) {
        this.props.mapConfig.props.colorSchemeInvert = invert || undefined;
    };
    ColorsSection.prototype.onAutomatic = function (isAutomatic) {
        this.props.mapConfig.props.isManualBuckets = isAutomatic ? undefined : true;
    };
    ColorsSection.prototype.render = function () {
        var mapConfig = this.props.mapConfig;
        var availableColorSchemes = Util_1.map(ColorSchemes_1.default, function (v, k) { return Util_1.extend({}, v, { key: k }); }).filter(function (v) { return !!v.name; });
        var currentColorScheme = mapConfig.isCustomColors ? 'custom' : mapConfig.baseColorScheme;
        return React.createElement(Forms_1.Section, { name: "Colors" },
            React.createElement(Forms_1.FieldsRow, null,
                React.createElement(Forms_1.SelectField, { label: "Color scheme", value: currentColorScheme, options: availableColorSchemes.map(function (d) { return d.key; }).concat(['custom']), optionLabels: availableColorSchemes.map(function (d) { return d.name; }).concat(['custom']), onValue: this.onColorScheme }),
                React.createElement(Forms_1.Toggle, { label: "Invert colors", value: mapConfig.props.colorSchemeInvert || false, onValue: this.onInvert })),
            React.createElement(Forms_1.FieldsRow, null,
                React.createElement(Forms_1.Toggle, { label: "Automatic classification", value: !mapConfig.props.isManualBuckets, onValue: this.onAutomatic })),
            mapConfig.props.isManualBuckets && React.createElement(ColorSchemeEditor, { map: mapConfig }),
            !mapConfig.props.isManualBuckets && React.createElement(Forms_1.BindAutoFloat, { label: "Step size", field: "binStepSize", store: mapConfig.props, auto: mapConfig.data.binStepSizeDefault }));
    };
    __decorate([
        mobx_1.action.bound
    ], ColorsSection.prototype, "onColorScheme", null);
    __decorate([
        mobx_1.action.bound
    ], ColorsSection.prototype, "onInvert", null);
    __decorate([
        mobx_1.action.bound
    ], ColorsSection.prototype, "onAutomatic", null);
    ColorsSection = __decorate([
        mobx_react_1.observer
    ], ColorsSection);
    return ColorsSection;
}(React.Component));
var BinLabelView = /** @class */ (function (_super) {
    __extends(BinLabelView, _super);
    function BinLabelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BinLabelView.prototype.onLabel = function (value) {
        if (this.props.bin instanceof MapData_1.NumericBin) {
            var _a = this.props, mapConfig = _a.mapConfig, index = _a.index;
            while (mapConfig.props.colorSchemeLabels.length < mapConfig.data.numBins)
                mapConfig.props.colorSchemeLabels.push(undefined);
            mapConfig.props.colorSchemeLabels[index] = value;
        }
        else {
            var _b = this.props, mapConfig = _b.mapConfig, bin = _b.bin;
            var customCategoryLabels = Util_1.clone(mapConfig.props.customCategoryLabels);
            customCategoryLabels[bin.value] = value;
            mapConfig.props.customCategoryLabels = customCategoryLabels;
        }
    };
    BinLabelView.prototype.render = function () {
        var _a = this.props, mapConfig = _a.mapConfig, bin = _a.bin;
        return React.createElement(Forms_1.EditableListItem, { className: "BinLabelView" },
            React.createElement(Forms_1.FieldsRow, null,
                bin instanceof MapData_1.NumericBin ? React.createElement(Forms_1.NumberField, { value: bin.max, onValue: function () { return null; }, disabled: true }) : React.createElement(Forms_1.TextField, { value: bin.value, onValue: function () { return null; }, disabled: true }),
                React.createElement(Forms_1.TextField, { placeholder: "Custom label", value: bin.label, onValue: this.onLabel })));
    };
    __decorate([
        mobx_1.action.bound
    ], BinLabelView.prototype, "onLabel", null);
    BinLabelView = __decorate([
        mobx_react_1.observer
    ], BinLabelView);
    return BinLabelView;
}(React.Component));
var MapLegendSection = /** @class */ (function (_super) {
    __extends(MapLegendSection, _super);
    function MapLegendSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapLegendSection.prototype.onEqualSizeBins = function (isEqual) {
        this.props.mapConfig.props.equalSizeBins = isEqual ? true : undefined;
    };
    MapLegendSection.prototype.render = function () {
        var mapConfig = this.props.mapConfig;
        return React.createElement(Forms_1.Section, { name: "Legend" },
            React.createElement(Forms_1.Toggle, { label: "Disable visual scaling of legend bins", value: !!mapConfig.props.equalSizeBins, onValue: this.onEqualSizeBins }),
            mapConfig.props.isManualBuckets && React.createElement(Forms_1.EditableList, null, mapConfig.data.legendData.map(function (bin, index) {
                return React.createElement(BinLabelView, { mapConfig: mapConfig, bin: bin, index: index });
            })));
    };
    __decorate([
        mobx_1.action.bound
    ], MapLegendSection.prototype, "onEqualSizeBins", null);
    MapLegendSection = __decorate([
        mobx_react_1.observer
    ], MapLegendSection);
    return MapLegendSection;
}(React.Component));
var EditorMapTab = /** @class */ (function (_super) {
    __extends(EditorMapTab, _super);
    function EditorMapTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EditorMapTab.prototype, "chart", {
        get: function () { return this.props.editor.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorMapTab.prototype, "mapConfig", {
        get: function () { return this.chart.map; },
        enumerable: true,
        configurable: true
    });
    EditorMapTab.prototype.render = function () {
        var mapConfig = this.mapConfig;
        return React.createElement("div", { className: "EditorMapTab tab-pane" },
            React.createElement(VariableSection, { mapConfig: mapConfig }),
            mapConfig.data.isReady &&
                [React.createElement(TimelineSection, { mapConfig: mapConfig }),
                    React.createElement(ColorsSection, { mapConfig: mapConfig }),
                    React.createElement(MapLegendSection, { mapConfig: mapConfig })]);
    };
    __decorate([
        mobx_1.computed
    ], EditorMapTab.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], EditorMapTab.prototype, "mapConfig", null);
    EditorMapTab = __decorate([
        mobx_react_1.observer
    ], EditorMapTab);
    return EditorMapTab;
}(React.Component));
exports.default = EditorMapTab;
//# sourceMappingURL=EditorMapTab.js.map