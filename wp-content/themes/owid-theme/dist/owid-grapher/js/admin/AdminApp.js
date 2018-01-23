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
var ChartEditorPage_1 = require("./ChartEditorPage");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var EditorFAQ_1 = require("./EditorFAQ");
var ChartIndexPage_1 = require("./ChartIndexPage");
var AdminSidebar_1 = require("./AdminSidebar");
var react_router_dom_1 = require("react-router-dom");
var Link_1 = require("./Link");
var Forms_1 = require("./Forms");
var GrapherBuildStatus_1 = require("./GrapherBuildStatus");
var FixedOverlay = /** @class */ (function (_super) {
    __extends(FixedOverlay, _super);
    function FixedOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FixedOverlay.prototype.onClick = function (e) {
        if (e.target === this.base)
            this.props.onDismiss();
    };
    FixedOverlay.prototype.render = function () {
        return React.createElement("div", { className: "FixedOverlay", onClick: this.onClick }, this.props.children);
    };
    __decorate([
        mobx_1.action.bound
    ], FixedOverlay.prototype, "onClick", null);
    FixedOverlay = __decorate([
        mobx_react_1.observer
    ], FixedOverlay);
    return FixedOverlay;
}(React.Component));
var AdminErrorMessage = /** @class */ (function (_super) {
    __extends(AdminErrorMessage, _super);
    function AdminErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminErrorMessage.prototype.render = function () {
        var admin = this.props.admin;
        var error = admin.errorMessage;
        return error ? React.createElement(Forms_1.Modal, { className: "errorMessage", onClose: mobx_1.action(function () { error.isFatal ? window.location.reload() : admin.errorMessage = undefined; }) },
            React.createElement("div", { className: "modal-header" },
                React.createElement("div", null,
                    React.createElement("h5", { className: "modal-title", style: error.isFatal ? { color: 'red' } : undefined }, error.title),
                    error.isFatal && React.createElement("p", null,
                        "Please screenshot this error message and report it in ",
                        React.createElement("a", { href: "https://owid.slack.com/messages/tiny-tech-problems/" }, "#tiny-tech-problems")))),
            React.createElement("div", { className: "modal-body", dangerouslySetInnerHTML: { __html: error.content } })) : null;
    };
    AdminErrorMessage = __decorate([
        mobx_react_1.observer
    ], AdminErrorMessage);
    return AdminErrorMessage;
}(React.Component));
var AdminLoader = /** @class */ (function (_super) {
    __extends(AdminLoader, _super);
    function AdminLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminLoader.prototype.render = function () {
        var admin = this.props.admin;
        return admin.isLoading ? React.createElement(Forms_1.LoadingBlocker, null) : null;
    };
    AdminLoader = __decorate([
        mobx_react_1.observer
    ], AdminLoader);
    return AdminLoader;
}(React.Component));
var AdminApp = /** @class */ (function (_super) {
    __extends(AdminApp, _super);
    function AdminApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFAQ = false;
        _this.isSidebar = false;
        return _this;
    }
    AdminApp.prototype.onToggleFAQ = function () {
        this.isFAQ = !this.isFAQ;
    };
    AdminApp.prototype.onToggleSidebar = function () {
        this.isSidebar = !this.isSidebar;
    };
    AdminApp.prototype.getChildContext = function () {
        return { admin: this.props.admin };
    };
    AdminApp.prototype.render = function () {
        var admin = this.props.admin;
        var _a = this, isFAQ = _a.isFAQ, isSidebar = _a.isSidebar;
        return React.createElement(react_router_dom_1.BrowserRouter, { basename: admin.basePath },
            React.createElement("div", { className: "AdminApp" },
                React.createElement("nav", { className: "navbar navbar-dark bg-dark flex-row navbar-expand-lg" },
                    React.createElement("button", { className: "navbar-toggler", type: "button", onClick: this.onToggleSidebar },
                        React.createElement("span", { className: "navbar-toggler-icon" })),
                    React.createElement(Link_1.default, { className: "navbar-brand", to: "/" }, "owid-grapher"),
                    React.createElement("ul", { className: "navbar-nav" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(Link_1.default, { className: "nav-link", to: "/charts/create", native: true },
                                React.createElement("i", { className: "fa fa-plus" }),
                                " New chart")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link", onClick: this.onToggleFAQ }, "FAQ"))),
                    React.createElement("ul", { className: "navbar-nav ml-auto" },
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(GrapherBuildStatus_1.default, null)),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(Link_1.default, { className: "nav-link logout", to: "/logout", native: true }, admin.username))),
                    React.createElement("iframe", { src: "https://ourworldindata.org/identifyadmin", style: { display: 'none' } })),
                isFAQ && React.createElement(EditorFAQ_1.EditorFAQ, { onClose: this.onToggleFAQ }),
                React.createElement(AdminErrorMessage, { admin: admin }),
                React.createElement(AdminLoader, { admin: admin }),
                isSidebar && React.createElement(FixedOverlay, { onDismiss: this.onToggleSidebar },
                    React.createElement(AdminSidebar_1.default, null)),
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { path: "/charts/create", component: ChartEditorPage_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/charts/:chartId/edit", render: function (_a) {
                            var match = _a.match;
                            return React.createElement(ChartEditorPage_1.default, { chartId: parseInt(match.params.chartId) });
                        } }),
                    React.createElement(react_router_dom_1.Route, { path: "/", component: ChartIndexPage_1.default }))));
    };
    __decorate([
        mobx_1.observable
    ], AdminApp.prototype, "isFAQ", void 0);
    __decorate([
        mobx_1.observable
    ], AdminApp.prototype, "isSidebar", void 0);
    __decorate([
        mobx_1.action.bound
    ], AdminApp.prototype, "onToggleFAQ", null);
    __decorate([
        mobx_1.action.bound
    ], AdminApp.prototype, "onToggleSidebar", null);
    AdminApp = __decorate([
        mobx_react_1.observer
    ], AdminApp);
    return AdminApp;
}(React.Component));
exports.default = AdminApp;
//# sourceMappingURL=AdminApp.js.map