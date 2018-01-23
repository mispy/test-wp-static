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
var Util_1 = require("./Util");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var linkifyHtml = require('linkifyjs/html');
var Cookies = require("js-cookie");
function linkify(s) {
    return linkifyHtml(s).replace(/(?:\r\n|\r|\n)/g, '<br/>');
}
var SourcesTab = /** @class */ (function (_super) {
    __extends(SourcesTab, _super);
    function SourcesTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SourcesTab.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesTab.prototype, "sources", {
        get: function () {
            return this.props.chart.data.sources;
        },
        enumerable: true,
        configurable: true
    });
    SourcesTab.prototype.renderSource = function (source) {
        var dimension = source.dimension;
        var variable = dimension.variable;
        var editUrl = Cookies.get('isAdmin') ? Global.rootUrl + "/admin/sources/" + source.id + "/edit" : undefined;
        return React.createElement("div", { className: "datasource-wrapper" },
            React.createElement("h2", null,
                variable.name,
                " ",
                editUrl && React.createElement("a", { href: editUrl, target: "_blank" },
                    React.createElement("i", { className: "fa fa-pencil" }))),
            React.createElement("table", { className: "variable-desc" },
                variable.description && React.createElement("tr", null,
                    React.createElement("td", null, "Variable description"),
                    React.createElement("td", { dangerouslySetInnerHTML: { __html: linkify(variable.description) } })),
                variable.coverage && React.createElement("tr", null,
                    React.createElement("td", null, "Variable geographic coverage"),
                    React.createElement("td", null, variable.coverage)),
                variable.timespan && React.createElement("tr", null,
                    React.createElement("td", null, "Variable time span"),
                    React.createElement("td", null, variable.timespan)),
                dimension.unitConversionFactor !== 1 && React.createElement("tr", null,
                    React.createElement("td", null, "Unit conversion factor for chart"),
                    React.createElement("td", null, dimension.unitConversionFactor)),
                source.dataPublishedBy && React.createElement("tr", null,
                    React.createElement("td", null, "Data published by"),
                    React.createElement("td", { dangerouslySetInnerHTML: { __html: linkify(source.dataPublishedBy) } })),
                source.dataPublisherSource && React.createElement("tr", null,
                    React.createElement("td", null, "Data publisher's source"),
                    React.createElement("td", { dangerouslySetInnerHTML: { __html: linkify(source.dataPublisherSource) } })),
                source.link && React.createElement("tr", null,
                    React.createElement("td", null, "Link"),
                    React.createElement("td", { dangerouslySetInnerHTML: { __html: linkify(source.link) } })),
                source.retrievedDate && React.createElement("tr", null,
                    React.createElement("td", null, "Retrieved"),
                    React.createElement("td", null, source.retrievedDate))),
            source.additionalInfo && React.createElement("p", { dangerouslySetInnerHTML: { __html: linkify(source.additionalInfo) } }));
    };
    SourcesTab.prototype.render = function () {
        var _this = this;
        var bounds = this.bounds;
        return React.createElement("div", { className: "sourcesTab", style: Util_1.extend(bounds.toCSS(), { position: 'absolute' }) },
            React.createElement("div", null,
                React.createElement("h2", null, "Sources"),
                React.createElement("div", null, this.sources.map(function (source) { return _this.renderSource(source); }))));
    };
    __decorate([
        mobx_1.computed
    ], SourcesTab.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], SourcesTab.prototype, "sources", null);
    SourcesTab = __decorate([
        mobx_react_1.observer
    ], SourcesTab);
    return SourcesTab;
}(React.Component));
exports.default = SourcesTab;
//# sourceMappingURL=SourcesTab.js.map