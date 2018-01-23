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
var EditorScatterTab = /** @class */ (function (_super) {
    __extends(EditorScatterTab, _super);
    function EditorScatterTab(props) {
        var _this = _super.call(this, props) || this;
        _this.comparisonLine = { yEquals: undefined };
        _this.highlightToggle = { description: "", paramStr: "" };
        Util_1.extend(_this.comparisonLine, props.chart.comparisonLine);
        Util_1.extend(_this.highlightToggle, props.chart.highlightToggle);
        return _this;
    }
    Object.defineProperty(EditorScatterTab.prototype, "hasComparisonLine", {
        get: function () { return !!this.props.chart.comparisonLine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorScatterTab.prototype, "hasHighlightToggle", {
        get: function () { return !!this.props.chart.highlightToggle; },
        enumerable: true,
        configurable: true
    });
    EditorScatterTab.prototype.onToggleHideTimeline = function (value) {
        this.props.chart.props.hideTimeline = value || undefined;
    };
    EditorScatterTab.prototype.onToggleHideLinesOutsideTolerance = function (value) {
        this.props.chart.props.hideLinesOutsideTolerance = value || undefined;
    };
    EditorScatterTab.prototype.onXOverrideYear = function (value) {
        this.props.chart.scatter.xOverrideYear = value;
    };
    EditorScatterTab.prototype.onToggleComparisonLine = function (value) {
        if (value)
            this.props.chart.props.comparisonLine = this.comparisonLine;
        else
            this.props.chart.props.comparisonLine = undefined;
    };
    EditorScatterTab.prototype.onToggleHighlightToggle = function (value) {
        if (value)
            this.props.chart.props.highlightToggle = this.highlightToggle;
        else
            this.props.chart.props.highlightToggle = undefined;
    };
    EditorScatterTab.prototype.save = function () {
        if (this.hasComparisonLine)
            this.props.chart.props.comparisonLine = mobx_1.toJS(this.comparisonLine);
        if (this.hasHighlightToggle)
            this.props.chart.props.highlightToggle = mobx_1.toJS(this.highlightToggle);
    };
    Object.defineProperty(EditorScatterTab.prototype, "excludedEntityChoices", {
        get: function () {
            return this.props.chart.scatter.entitiesToShow;
        },
        enumerable: true,
        configurable: true
    });
    EditorScatterTab.prototype.onExcludeEntity = function (entity) {
        var chart = this.props.chart;
        if (chart.props.excludedEntities === undefined) {
            chart.props.excludedEntities = [];
        }
        var entityId = chart.vardata.entityMetaByKey[entity].id;
        if (chart.props.excludedEntities.indexOf(entityId) === -1)
            chart.props.excludedEntities.push(entityId);
    };
    EditorScatterTab.prototype.onUnexcludeEntity = function (entity) {
        var chart = this.props.chart;
        if (!chart.props.excludedEntities)
            return;
        var entityId = chart.vardata.entityMetaByKey[entity].id;
        chart.props.excludedEntities = chart.props.excludedEntities.filter(function (e) { return e !== entityId; });
    };
    EditorScatterTab.prototype.render = function () {
        var _this = this;
        var _a = this, hasComparisonLine = _a.hasComparisonLine, hasHighlightToggle = _a.hasHighlightToggle, comparisonLine = _a.comparisonLine, highlightToggle = _a.highlightToggle, excludedEntityChoices = _a.excludedEntityChoices;
        var chart = this.props.chart;
        return React.createElement("div", { className: "EditorScatterTab" },
            React.createElement(Forms_1.Section, { name: "Timeline" },
                React.createElement(Forms_1.Toggle, { label: "Hide timeline", value: !!chart.props.hideTimeline, onValue: this.onToggleHideTimeline }),
                React.createElement(Forms_1.Toggle, { label: "Hide entities without data for full time span (within tolerance)", value: !!chart.props.hideLinesOutsideTolerance, onValue: this.onToggleHideLinesOutsideTolerance }),
                React.createElement(Forms_1.NumberField, { label: "Override X axis target year", value: chart.scatter.xOverrideYear, onValue: Util_1.debounce(this.onXOverrideYear, 300) })),
            React.createElement(Forms_1.Section, { name: "Filtering" },
                React.createElement(Forms_1.Toggle, { label: "Exclude observations for entities that are not countries", value: !!chart.props.matchingEntitiesOnly, onValue: mobx_1.action(function (value) { return chart.props.matchingEntitiesOnly = value || undefined; }) }),
                React.createElement(Forms_1.SelectField, { label: "Exclude individual entities", value: "", onValue: function (v) { return v && _this.onExcludeEntity(v); }, options: excludedEntityChoices }),
                chart.scatter.excludedEntities && React.createElement("ul", { className: "excludedEntities" }, chart.scatter.excludedEntities.map(function (entity) { return React.createElement("li", null,
                    React.createElement("div", { className: "clickable", onClick: function () { return _this.onUnexcludeEntity(entity); } },
                        React.createElement("i", { className: "fa fa-remove" })),
                    entity); }))),
            React.createElement(Forms_1.Section, { name: "Comparison line" },
                React.createElement("p", null,
                    "Overlay a line onto the chart for comparison. Supports basic ",
                    React.createElement("a", { href: "https://github.com/silentmatt/expr-eval#expression-syntax" }, "mathematical expressions"),
                    "."),
                React.createElement(Forms_1.Toggle, { label: "Enable comparison line", value: !!hasComparisonLine, onValue: this.onToggleComparisonLine }),
                hasComparisonLine && React.createElement(Forms_1.TextField, { label: "y=", placeholder: "x", value: comparisonLine.yEquals, onValue: mobx_1.action(function (value) { _this.comparisonLine.yEquals = value || undefined; _this.save(); }) })),
            React.createElement(Forms_1.Section, { name: "Highlight toggle" },
                React.createElement("p", null, "Allow users to toggle a particular chart selection state to highlight certain entities."),
                React.createElement(Forms_1.Toggle, { label: "Enable highlight toggle", value: !!hasHighlightToggle, onValue: this.onToggleHighlightToggle }),
                hasHighlightToggle && React.createElement("div", null,
                    React.createElement(Forms_1.TextField, { label: "Description", value: highlightToggle.description, onValue: mobx_1.action(function (value) { _this.highlightToggle.description = value; _this.save(); }) }),
                    React.createElement(Forms_1.TextField, { label: "URL Params", placeholder: "e.g. ?country=AFG", value: highlightToggle.paramStr, onValue: mobx_1.action(function (value) { _this.highlightToggle.paramStr = value; _this.save(); }) }))));
    };
    __decorate([
        mobx_1.observable
    ], EditorScatterTab.prototype, "comparisonLine", void 0);
    __decorate([
        mobx_1.observable
    ], EditorScatterTab.prototype, "highlightToggle", void 0);
    __decorate([
        mobx_1.computed
    ], EditorScatterTab.prototype, "hasComparisonLine", null);
    __decorate([
        mobx_1.computed
    ], EditorScatterTab.prototype, "hasHighlightToggle", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onToggleHideTimeline", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onToggleHideLinesOutsideTolerance", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onXOverrideYear", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onToggleComparisonLine", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onToggleHighlightToggle", null);
    __decorate([
        mobx_1.computed
    ], EditorScatterTab.prototype, "excludedEntityChoices", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onExcludeEntity", null);
    __decorate([
        mobx_1.action.bound
    ], EditorScatterTab.prototype, "onUnexcludeEntity", null);
    EditorScatterTab = __decorate([
        mobx_react_1.observer
    ], EditorScatterTab);
    return EditorScatterTab;
}(React.Component));
exports.default = EditorScatterTab;
//# sourceMappingURL=EditorScatterTab.js.map