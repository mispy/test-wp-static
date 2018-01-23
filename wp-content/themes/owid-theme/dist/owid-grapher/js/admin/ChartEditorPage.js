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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChartEditor_1 = require("./ChartEditor");
var React = require("react");
var Util_1 = require("../charts/Util");
var ChartConfig_1 = require("../charts/ChartConfig");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var EditorBasicTab_1 = require("./EditorBasicTab");
var EditorDataTab_1 = require("./EditorDataTab");
var EditorTextTab_1 = require("./EditorTextTab");
var EditorCustomizeTab_1 = require("./EditorCustomizeTab");
var EditorScatterTab_1 = require("./EditorScatterTab");
var EditorMapTab_1 = require("./EditorMapTab");
var ChartView_1 = require("../charts/ChartView");
var Bounds_1 = require("../charts/Bounds");
var SaveButtons_1 = require("./SaveButtons");
var Forms_1 = require("./Forms");
var TabBinder = /** @class */ (function (_super) {
    __extends(TabBinder, _super);
    function TabBinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabBinder.prototype.componentDidMount = function () {
        var _this = this;
        //window.addEventListener("hashchange", this.onHashChange)
        this.onHashChange();
        this.dispose = mobx_1.autorun(function () {
            var tab = _this.props.editor.tab;
            //setTimeout(() => window.location.hash = `#${tab}-tab`, 100)
        });
    };
    TabBinder.prototype.componentDidUnmount = function () {
        //window.removeEventListener("hashchange", this.onHashChange)
        this.dispose();
    };
    TabBinder.prototype.onHashChange = function () {
        var match = window.location.hash.match(/#(.+?)-tab/);
        if (match) {
            var tab = match[1];
            if (this.props.editor.chart && Util_1.includes(this.props.editor.availableTabs, tab))
                this.props.editor.tab = tab;
        }
    };
    __decorate([
        mobx_1.action.bound
    ], TabBinder.prototype, "onHashChange", null);
    TabBinder = __decorate([
        mobx_react_1.observer
    ], TabBinder);
    return TabBinder;
}(React.Component));
var ChartEditorPage = /** @class */ (function (_super) {
    __extends(ChartEditorPage, _super);
    function ChartEditorPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartEditorPage.prototype.fetchChart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartId, admin, json, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        chartId = this.props.chartId;
                        admin = this.context.admin;
                        if (!(chartId === undefined)) return [3 /*break*/, 1];
                        _a = { yAxis: { min: 0 } };
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, admin.getJSON("charts/" + chartId + ".config.json")];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        json = _a;
                        mobx_1.runInAction(function () { return _this.chart = new ChartConfig_1.default(json); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartEditorPage.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var admin, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin = this.context.admin;
                        return [4 /*yield*/, admin.getJSON("editorData/namespaces." + admin.cacheTag + ".json")];
                    case 1:
                        json = _a.sent();
                        mobx_1.runInAction(function () { return _this.database = new ChartEditor_1.EditorDatabase(json); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ChartEditorPage.prototype, "editor", {
        get: function () {
            if (this.chart === undefined || this.database === undefined) {
                return undefined;
            }
            else {
                var that_1 = this;
                return new ChartEditor_1.default({
                    get admin() { return that_1.context.admin; },
                    get chart() { return that_1.chart; },
                    get database() { return that_1.database; }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    ChartEditorPage.prototype.refresh = function () {
        this.fetchChart();
        this.fetchData();
    };
    ChartEditorPage.prototype.componentDidMount = function () {
        var _this = this;
        this.dispose = mobx_1.reaction(function () { return _this.props.chartId; }, this.refresh);
        this.refresh();
    };
    ChartEditorPage.prototype.componentDidUnmount = function () {
        this.dispose();
    };
    ChartEditorPage.prototype.render = function () {
        return React.createElement("div", { className: "ChartEditorPage" },
            (this.editor === undefined || this.editor.currentRequest) && React.createElement(Forms_1.LoadingBlocker, null),
            this.editor !== undefined && this.renderReady(this.editor));
    };
    ChartEditorPage.prototype.renderReady = function (editor) {
        var chart = editor.chart, availableTabs = editor.availableTabs, previewMode = editor.previewMode;
        return [
            React.createElement(TabBinder, { editor: editor }),
            React.createElement("form", { onSubmit: function (e) { return e.preventDefault(); } },
                React.createElement("div", { className: "p-2" },
                    React.createElement("ul", { className: "nav nav-tabs" }, availableTabs.map(function (tab) {
                        return React.createElement("li", { className: "nav-item" },
                            React.createElement("a", { className: "nav-link" + (tab === editor.tab ? " active" : ""), onClick: function () { return editor.tab = tab; } }, Util_1.capitalize(tab)));
                    }))),
                React.createElement("div", { className: "innerForm container" },
                    editor.tab === 'basic' && React.createElement(EditorBasicTab_1.default, { editor: editor }),
                    editor.tab === 'text' && React.createElement(EditorTextTab_1.default, { editor: editor }),
                    editor.tab === 'data' && React.createElement(EditorDataTab_1.default, { editor: editor }),
                    editor.tab === 'customize' && React.createElement(EditorCustomizeTab_1.default, { editor: editor }),
                    editor.tab === 'scatter' && React.createElement(EditorScatterTab_1.default, { chart: chart }),
                    editor.tab === 'map' && React.createElement(EditorMapTab_1.default, { editor: editor })),
                React.createElement(SaveButtons_1.default, { editor: editor })),
            React.createElement("div", null,
                React.createElement("figure", { "data-grapher-src": true }, React.createElement(ChartView_1.default, { chart: chart, bounds: previewMode === "mobile" ? new Bounds_1.default(0, 0, 360, 500) : new Bounds_1.default(0, 0, 800, 600) })),
                React.createElement("div", { className: "btn-group", "data-toggle": "buttons" },
                    React.createElement("label", { className: "btn btn-light" + (previewMode === "mobile" ? " active" : ""), title: "Mobile preview", onClick: mobx_1.action(function (_) { return editor.previewMode = 'mobile'; }) },
                        React.createElement("input", { type: "radio", name: "previewSize", id: "mobile", checked: previewMode === "mobile" }),
                        React.createElement("i", { className: "fa fa-mobile" })),
                    React.createElement("label", { className: "btn btn-light" + (previewMode === "desktop" ? " active" : ""), title: "Desktop preview", onClick: mobx_1.action(function (_) { return editor.previewMode = 'desktop'; }) },
                        React.createElement("input", { type: "radio", name: "previewSize", id: "desktop", checked: previewMode === "desktop" }),
                        React.createElement("i", { className: "fa fa-desktop" }))))
        ];
    };
    __decorate([
        mobx_1.observable.ref
    ], ChartEditorPage.prototype, "chart", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartEditorPage.prototype, "database", void 0);
    __decorate([
        mobx_1.computed
    ], ChartEditorPage.prototype, "editor", null);
    __decorate([
        mobx_1.action.bound
    ], ChartEditorPage.prototype, "refresh", null);
    ChartEditorPage = __decorate([
        mobx_react_1.observer
    ], ChartEditorPage);
    return ChartEditorPage;
}(React.Component));
exports.default = ChartEditorPage;
//# sourceMappingURL=ChartEditorPage.js.map