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
var Forms_1 = require("./Forms");
var ColorSchemes_1 = require("../charts/ColorSchemes");
var Util_1 = require("../charts/Util");
var ColorSchemeSelector = /** @class */ (function (_super) {
    __extends(ColorSchemeSelector, _super);
    function ColorSchemeSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorSchemeSelector.prototype.onValue = function (value) {
        this.props.chart.props.baseColorScheme = value === 'default' ? undefined : value;
    };
    ColorSchemeSelector.prototype.onInvertColorScheme = function (value) {
        this.props.chart.props.invertColorScheme = value || undefined;
    };
    ColorSchemeSelector.prototype.render = function () {
        var chart = this.props.chart;
        var availableColorSchemes = Util_1.keysOf(ColorSchemes_1.default);
        var colorSchemeLabels = availableColorSchemes.map(function (scheme) { return ColorSchemes_1.default[scheme].name; });
        return React.createElement(Forms_1.FieldsRow, null,
            React.createElement(Forms_1.SelectField, { label: "Color scheme", value: chart.baseColorScheme || "default", onValue: this.onValue, options: ["default"].concat(availableColorSchemes), optionLabels: ["Default"].concat(colorSchemeLabels) }),
            React.createElement("br", null),
            React.createElement(Forms_1.Toggle, { label: "Invert colors", value: !!chart.props.invertColorScheme, onValue: this.onInvertColorScheme }));
    };
    __decorate([
        mobx_1.action.bound
    ], ColorSchemeSelector.prototype, "onValue", null);
    __decorate([
        mobx_1.action.bound
    ], ColorSchemeSelector.prototype, "onInvertColorScheme", null);
    ColorSchemeSelector = __decorate([
        mobx_react_1.observer
    ], ColorSchemeSelector);
    return ColorSchemeSelector;
}(React.Component));
var TimeSection = /** @class */ (function (_super) {
    __extends(TimeSection, _super);
    function TimeSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TimeSection.prototype, "chart", {
        get: function () { return this.props.editor.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSection.prototype, "isDynamicTime", {
        get: function () {
            return this.chart.timeDomain[0] === undefined && this.chart.timeDomain[1] === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSection.prototype, "minTime", {
        get: function () { return this.chart.props.minTime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSection.prototype, "maxTime", {
        get: function () { return this.chart.props.maxTime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSection.prototype, "minPossibleTime", {
        get: function () {
            return this.chart.data.primaryVariable ? this.chart.data.primaryVariable.minYear : 1900;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSection.prototype, "maxPossibleTime", {
        get: function () {
            return this.chart.data.primaryVariable ? this.chart.data.primaryVariable.maxYear : 2015;
        },
        enumerable: true,
        configurable: true
    });
    TimeSection.prototype.onToggleDynamicTime = function () {
        if (this.isDynamicTime) {
            this.chart.timeDomain = [this.minPossibleTime, this.maxPossibleTime];
        }
        else {
            this.chart.timeDomain = [undefined, undefined];
        }
    };
    TimeSection.prototype.onMinTime = function (value) {
        this.chart.props.minTime = value;
    };
    TimeSection.prototype.onMaxTime = function (value) {
        this.chart.props.maxTime = value;
    };
    TimeSection.prototype.render = function () {
        var features = this.props.editor.features;
        var chart = this.chart;
        return React.createElement(Forms_1.Section, { name: "Time range" },
            React.createElement(Forms_1.FieldsRow, null,
                features.timeDomain && React.createElement(Forms_1.NumberField, { label: "Min year", value: chart.props.minTime, onValue: Util_1.debounce(this.onMinTime) }),
                React.createElement(Forms_1.NumberField, { label: features.timeDomain ? "Max year" : "Target year", value: chart.props.maxTime, onValue: Util_1.debounce(this.onMaxTime) })));
    };
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "isDynamicTime", null);
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "minTime", null);
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "maxTime", null);
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "minPossibleTime", null);
    __decorate([
        mobx_1.computed
    ], TimeSection.prototype, "maxPossibleTime", null);
    __decorate([
        mobx_1.action.bound
    ], TimeSection.prototype, "onToggleDynamicTime", null);
    __decorate([
        mobx_1.action.bound
    ], TimeSection.prototype, "onMinTime", null);
    __decorate([
        mobx_1.action.bound
    ], TimeSection.prototype, "onMaxTime", null);
    TimeSection = __decorate([
        mobx_react_1.observer
    ], TimeSection);
    return TimeSection;
}(React.Component));
var EditorCustomizeTab = /** @class */ (function (_super) {
    __extends(EditorCustomizeTab, _super);
    function EditorCustomizeTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EditorCustomizeTab.prototype, "xAxis", {
        get: function () { return this.props.editor.chart.xAxis.props; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorCustomizeTab.prototype, "yAxis", {
        get: function () { return this.props.editor.chart.yAxis.props; },
        enumerable: true,
        configurable: true
    });
    EditorCustomizeTab.prototype.renderForAxis = function (_, axis) {
        return React.createElement("div", null,
            React.createElement(Forms_1.FieldsRow, null,
                React.createElement(Forms_1.NumberField, { label: "Min", value: axis.min, onValue: function (value) { return axis.min = value; } }),
                React.createElement(Forms_1.NumberField, { label: "Max", value: axis.max, onValue: function (value) { return axis.max = value; } })),
            React.createElement(Forms_1.Toggle, { label: "Enable log/linear selector", value: axis.canChangeScaleType || false, onValue: function (value) { return axis.canChangeScaleType = value || undefined; } }));
    };
    EditorCustomizeTab.prototype.render = function () {
        var _a = this, xAxis = _a.xAxis, yAxis = _a.yAxis;
        var features = this.props.editor.features;
        var chart = this.props.editor.chart;
        return React.createElement("div", null,
            features.customYAxis && React.createElement(Forms_1.Section, { name: "Y Axis" }, this.renderForAxis('Y', yAxis)),
            features.customXAxis && React.createElement(Forms_1.Section, { name: "X Axis" }, this.renderForAxis('X', xAxis)),
            !chart.isScatter && React.createElement(TimeSection, { editor: this.props.editor }),
            React.createElement(Forms_1.Section, { name: "Colors" },
                React.createElement(ColorSchemeSelector, { chart: chart })),
            (features.hideLegend || features.relativeModeToggle) && React.createElement(Forms_1.Section, { name: "Legend" },
                React.createElement(Forms_1.FieldsRow, null,
                    features.hideLegend && React.createElement(Forms_1.Toggle, { label: "Hide legend", value: !!chart.hideLegend, onValue: function (value) { return chart.props.hideLegend = value || undefined; } }),
                    features.relativeModeToggle && React.createElement(Forms_1.Toggle, { label: "Hide relative toggle", value: !!chart.props.hideRelativeToggle, onValue: function (value) { return chart.props.hideRelativeToggle = value || undefined; } })),
                features.entityType && React.createElement(Forms_1.BindAutoString, { label: "Entity name", field: "entityType", store: chart.props, auto: "country" })));
    };
    __decorate([
        mobx_1.computed
    ], EditorCustomizeTab.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], EditorCustomizeTab.prototype, "yAxis", null);
    EditorCustomizeTab = __decorate([
        mobx_react_1.observer
    ], EditorCustomizeTab);
    return EditorCustomizeTab;
}(React.Component));
exports.default = EditorCustomizeTab;
//# sourceMappingURL=EditorCustomizeTab.js.map