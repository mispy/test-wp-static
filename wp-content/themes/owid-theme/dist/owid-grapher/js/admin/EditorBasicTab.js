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
var ChartType_1 = require("../charts/ChartType");
var Forms_1 = require("./Forms");
var VariableSelector_1 = require("./VariableSelector");
var DimensionCard_1 = require("./DimensionCard");
var DimensionSlotView = /** @class */ (function (_super) {
    __extends(DimensionSlotView, _super);
    function DimensionSlotView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isSelectingVariables = false;
        return _this;
    }
    DimensionSlotView.prototype.onVariables = function (variableIds) {
        var slot = this.props.slot;
        slot.dimensions = variableIds.map(function (id) {
            var existingDimension = slot.dimensions.find(function (d) { return d.variableId === id; });
            return existingDimension || slot.createDimension(id);
        });
        this.isSelectingVariables = false;
        this.updateDefaults();
    };
    DimensionSlotView.prototype.onRemoveDimension = function (dim) {
        this.props.slot.dimensions = this.props.slot.dimensions.filter(function (d) { return d.variableId !== dim.variableId; });
        this.updateDefaults();
    };
    DimensionSlotView.prototype.updateDefaults = function () {
        var chart = this.props.editor.chart;
        if (this.dispose)
            this.dispose();
        this.dispose = mobx_1.reaction(function () { return chart.props.type && chart.data.primaryDimensions; }, function () {
            if (chart.isScatter || chart.isSlopeChart) {
                chart.data.selectedKeys = [];
            }
            else if (chart.data.primaryDimensions.length > 1) {
                var entity_1 = Util_1.includes(chart.data.availableEntities, "World") ? "World" : Util_1.sample(chart.data.availableEntities);
                chart.data.selectedKeys = chart.data.availableKeys.filter(function (key) { return chart.data.lookupKey(key).entity === entity_1; });
                chart.props.addCountryMode = 'change-country';
            }
            else {
                chart.data.selectedKeys = chart.data.availableKeys.length > 10 ? Util_1.sampleSize(chart.data.availableKeys, 3) : chart.data.availableKeys;
                chart.props.addCountryMode = 'add-country';
            }
        });
    };
    DimensionSlotView.prototype.componentWillUnmount = function () {
        if (this.dispose)
            this.dispose();
    };
    DimensionSlotView.prototype.render = function () {
        var _this = this;
        var isSelectingVariables = this.isSelectingVariables;
        var _a = this.props, slot = _a.slot, editor = _a.editor;
        var canAddMore = slot.allowMultiple || slot.dimensions.length === 0;
        return React.createElement("div", null,
            React.createElement("h5", null, slot.name),
            React.createElement(Forms_1.EditableList, null, slot.dimensionsWithData.map(function (dim) {
                return dim.property === slot.property && React.createElement(DimensionCard_1.default, { dimension: dim, editor: editor, onEdit: slot.allowMultiple ? undefined : mobx_1.action(function () { return _this.isSelectingVariables = true; }), onRemove: slot.isOptional ? function () { return _this.onRemoveDimension(dim); } : undefined });
            })),
            canAddMore && React.createElement("div", { className: "dimensionSlot", onClick: mobx_1.action(function () { return _this.isSelectingVariables = true; }) },
                "Add variable",
                slot.allowMultiple && 's'),
            isSelectingVariables && React.createElement(VariableSelector_1.default, { editor: editor, slot: slot, onDismiss: mobx_1.action(function () { return _this.isSelectingVariables = false; }), onComplete: this.onVariables }));
    };
    __decorate([
        mobx_1.observable.ref
    ], DimensionSlotView.prototype, "isSelectingVariables", void 0);
    __decorate([
        mobx_1.action.bound
    ], DimensionSlotView.prototype, "onVariables", null);
    __decorate([
        mobx_1.action.bound
    ], DimensionSlotView.prototype, "onRemoveDimension", null);
    DimensionSlotView = __decorate([
        mobx_react_1.observer
    ], DimensionSlotView);
    return DimensionSlotView;
}(React.Component));
var VariablesSection = /** @class */ (function (_super) {
    __extends(VariablesSection, _super);
    function VariablesSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAddingVariable = false;
        _this.unassignedVariables = [];
        return _this;
    }
    VariablesSection.prototype.render = function () {
        var props = this.props;
        var dimensionSlots = props.editor.chart.dimensionSlots;
        return React.createElement(Forms_1.Section, { name: "Add variables" }, dimensionSlots.map(function (slot) { return React.createElement(DimensionSlotView, { slot: slot, editor: props.editor }); }));
    };
    __decorate([
        mobx_1.observable.ref
    ], VariablesSection.prototype, "isAddingVariable", void 0);
    __decorate([
        mobx_1.observable.struct
    ], VariablesSection.prototype, "unassignedVariables", void 0);
    VariablesSection = __decorate([
        mobx_react_1.observer
    ], VariablesSection);
    return VariablesSection;
}(React.Component));
var EditorBasicTab = /** @class */ (function (_super) {
    __extends(EditorBasicTab, _super);
    function EditorBasicTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorBasicTab.prototype.onChartType = function (value) { this.props.editor.chart.props.type = value; };
    EditorBasicTab.prototype.render = function () {
        var editor = this.props.editor;
        var chart = editor.chart;
        return React.createElement("div", { className: "EditorBasicTab" },
            React.createElement(Forms_1.Section, { name: "Type of chart" },
                React.createElement(Forms_1.SelectField, { value: chart.props.type, onValue: this.onChartType, options: ChartType_1.ChartTypeDefs.map(function (def) { return def.key; }), optionLabels: ChartType_1.ChartTypeDefs.map(function (def) { return def.label; }) }),
                React.createElement(Forms_1.FieldsRow, null,
                    React.createElement(Forms_1.Toggle, { label: "Chart tab", value: chart.props.hasChartTab, onValue: function (value) { return chart.props.hasChartTab = value; } }),
                    React.createElement(Forms_1.Toggle, { label: "Map tab", value: chart.props.hasMapTab, onValue: function (value) { return chart.props.hasMapTab = value; } }))),
            React.createElement(VariablesSection, { editor: editor }));
    };
    __decorate([
        mobx_1.action.bound
    ], EditorBasicTab.prototype, "onChartType", null);
    EditorBasicTab = __decorate([
        mobx_react_1.observer
    ], EditorBasicTab);
    return EditorBasicTab;
}(React.Component));
exports.default = EditorBasicTab;
//# sourceMappingURL=EditorBasicTab.js.map