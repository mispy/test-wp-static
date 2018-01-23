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
var DimensionCard = /** @class */ (function (_super) {
    __extends(DimensionCard, _super);
    function DimensionCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isExpanded = false;
        return _this;
    }
    Object.defineProperty(DimensionCard.prototype, "hasExpandedOptions", {
        get: function () {
            return this.props.dimension.property === 'y' || this.props.dimension.property === 'x';
        },
        enumerable: true,
        configurable: true
    });
    DimensionCard.prototype.onToggleExpand = function () {
        this.isExpanded = !this.isExpanded;
    };
    DimensionCard.prototype.onIsProjection = function (value) {
        this.props.dimension.props.isProjection = value || undefined;
    };
    DimensionCard.prototype.onSaveToVariable = function (value) {
        this.props.dimension.props.saveToVariable = value || undefined;
    };
    DimensionCard.prototype.render = function () {
        var _a = this.props, dimension = _a.dimension, editor = _a.editor;
        var chart = editor.chart;
        return React.createElement(Forms_1.EditableListItem, { className: "DimensionCard" },
            React.createElement("header", null,
                React.createElement("div", null, this.hasExpandedOptions && React.createElement("span", { className: "clickable", onClick: this.onToggleExpand },
                    React.createElement("i", { className: "fa fa-chevron-" + (this.isExpanded ? 'up' : 'down') }))),
                React.createElement("div", null, dimension.variable.name),
                React.createElement("div", null,
                    this.props.onEdit && React.createElement("div", { className: "clickable", onClick: this.props.onEdit },
                        React.createElement("i", { className: "fa fa-exchange" })),
                    this.props.onRemove && React.createElement("div", { className: "clickable", onClick: this.props.onRemove },
                        React.createElement("i", { className: "fa fa-times" })))),
            this.isExpanded && React.createElement("div", null,
                React.createElement(Forms_1.BindAutoString, { label: "Display name", field: "displayName", store: dimension.props, auto: dimension.displayName }),
                React.createElement(Forms_1.BindAutoString, { label: "Unit of measurement", field: "unit", store: dimension.props, auto: dimension.unit, helpText: "Original database unit: " + dimension.variable.unit }),
                React.createElement(Forms_1.BindAutoString, { label: "Short (axis) unit", field: "shortUnit", store: dimension.props, auto: dimension.shortUnit }),
                React.createElement(Forms_1.BindAutoFloat, { label: "Unit conversion factor", field: "conversionFactor", store: dimension.props, auto: dimension.unitConversionFactor }),
                (chart.isScatter || chart.isDiscreteBar) && React.createElement(Forms_1.BindAutoFloat, { field: "tolerance", store: dimension.props, auto: dimension.tolerance }),
                chart.isLineChart && React.createElement(Forms_1.Toggle, { label: "Is projection", value: dimension.isProjection, onValue: this.onIsProjection }),
                React.createElement("hr", { className: "ui divider" }),
                React.createElement(Forms_1.Toggle, { label: "Use these settings as defaults for future charts", value: !!dimension.props.saveToVariable, onValue: this.onSaveToVariable })));
    };
    __decorate([
        mobx_1.observable.ref
    ], DimensionCard.prototype, "isExpanded", void 0);
    __decorate([
        mobx_1.computed
    ], DimensionCard.prototype, "hasExpandedOptions", null);
    __decorate([
        mobx_1.action.bound
    ], DimensionCard.prototype, "onToggleExpand", null);
    __decorate([
        mobx_1.action.bound
    ], DimensionCard.prototype, "onIsProjection", null);
    __decorate([
        mobx_1.action.bound
    ], DimensionCard.prototype, "onSaveToVariable", null);
    DimensionCard = __decorate([
        mobx_react_1.observer
    ], DimensionCard);
    return DimensionCard;
}(React.Component));
exports.default = DimensionCard;
//# sourceMappingURL=DimensionCard.js.map