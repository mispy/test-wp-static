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
var slugify = require('slugify');
var EditorTextTab = /** @class */ (function (_super) {
    __extends(EditorTextTab, _super);
    function EditorTextTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorTextTab.prototype.onSlug = function (slug) {
        this.props.editor.chart.props.slug = slugify(slug).toLowerCase();
    };
    EditorTextTab.prototype.render = function () {
        var chart = this.props.editor.chart;
        return React.createElement("div", null,
            React.createElement(Forms_1.Section, { name: "Header" },
                React.createElement(Forms_1.BindAutoString, { field: "title", store: chart.props, auto: chart.data.title, softCharacterLimit: 100 }),
                React.createElement(Forms_1.Toggle, { label: "Hide automatic time/entity", value: !!chart.props.hideTitleAnnotation, onValue: mobx_1.action(function (value) { return chart.props.hideTitleAnnotation = value || undefined; }) }),
                React.createElement(Forms_1.AutoTextField, { label: "/grapher", value: chart.data.slug, onValue: this.onSlug, isAuto: chart.props.slug === undefined, onToggleAuto: function (_) { return chart.props.slug = chart.props.slug === undefined ? chart.data.slug : undefined; }, helpText: "Human-friendly URL for this chart" }),
                React.createElement(Forms_1.BindString, { field: "subtitle", store: chart.props, placeholder: "Briefly describe the context of the data. It's best to avoid duplicating any information which can be easily inferred from other visual elements of the chart.", textarea: true, softCharacterLimit: 280 })),
            React.createElement(Forms_1.Section, { name: "Footer" },
                React.createElement(Forms_1.BindAutoString, { label: "Source", field: "sourceDesc", store: chart.props, auto: chart.data.sourcesLine, helpText: "Short comma-separated list of source names", softCharacterLimit: 60 }),
                React.createElement(Forms_1.BindString, { label: "Origin url", field: "originUrl", store: chart.props, placeholder: chart.data.originUrl, helpText: "The page containing this chart where more context can be found" }),
                React.createElement(Forms_1.BindString, { label: "Footer note", field: "note", store: chart.props, helpText: "Any important clarification needed to avoid miscommunication", softCharacterLimit: 140 })),
            React.createElement(Forms_1.Section, { name: "Misc" },
                React.createElement(Forms_1.BindString, { label: "Internal author notes", field: "internalNotes", store: chart.props, placeholder: "e.g. WIP, needs review, etc", textarea: true })));
    };
    __decorate([
        mobx_1.action.bound
    ], EditorTextTab.prototype, "onSlug", null);
    EditorTextTab = __decorate([
        mobx_react_1.observer
    ], EditorTextTab);
    return EditorTextTab;
}(React.Component));
exports.default = EditorTextTab;
//# sourceMappingURL=EditorTextTab.js.map