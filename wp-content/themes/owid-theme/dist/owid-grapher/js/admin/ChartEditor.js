"use strict";
/* ChartEditor.ts
 * ================
 *
 * Mobx store that represents the current editor state and governs non-UI-related operations.
 *
 */
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
var mobx_1 = require("mobx");
var Util_1 = require("../charts/Util");
var EditorFeatures_1 = require("./EditorFeatures");
var EditorDatabase = /** @class */ (function () {
    function EditorDatabase(json) {
        this.dataByNamespace = new Map();
        this.namespaces = json.namespaces;
    }
    __decorate([
        mobx_1.observable.ref
    ], EditorDatabase.prototype, "namespaces", void 0);
    __decorate([
        mobx_1.observable
    ], EditorDatabase.prototype, "dataByNamespace", void 0);
    return EditorDatabase;
}());
exports.EditorDatabase = EditorDatabase;
var ChartEditor = /** @class */ (function () {
    function ChartEditor(props) {
        var _this = this;
        // Whether the current chart state is saved or not
        this.isSaved = true;
        this.tab = 'basic';
        this.previewMode = 'mobile';
        this.props = props;
        mobx_1.reaction(function () { return _this.chart && _this.chart.json; }, function () { return _this.isSaved = false; });
    }
    Object.defineProperty(ChartEditor.prototype, "chart", {
        get: function () {
            return this.props.chart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartEditor.prototype, "database", {
        get: function () {
            return this.props.database;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartEditor.prototype, "availableTabs", {
        get: function () {
            if (!this.chart.activeTransform.isValidConfig) {
                return ['basic'];
            }
            else {
                var tabs = ['basic', 'data', 'text', 'customize'];
                if (this.chart.hasMapTab)
                    tabs.push('map');
                if (this.chart.isScatter)
                    tabs.push('scatter');
                return tabs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartEditor.prototype, "isNewChart", {
        get: function () {
            return this.chart.props.id === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartEditor.prototype, "features", {
        get: function () {
            return new EditorFeatures_1.default(this);
        },
        enumerable: true,
        configurable: true
    });
    // Load index of datasets and variables for the given namespace
    ChartEditor.prototype.loadNamespace = function (namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.admin.getJSON("editorData/" + namespace + "." + this.props.admin.cacheTag + ".json")];
                    case 1:
                        data = _a.sent();
                        mobx_1.runInAction(function () { return _this.database.dataByNamespace.set(namespace, data); });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartEditor.prototype.saveChart = function (_a) {
        var onError = (_a === void 0 ? {} : _a).onError;
        return __awaiter(this, void 0, void 0, function () {
            var _b, chart, isNewChart, targetUrl, json;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this, chart = _b.chart, isNewChart = _b.isNewChart;
                        targetUrl = isNewChart ? "charts" : "charts/" + chart.props.id;
                        return [4 /*yield*/, this.props.admin.requestJSON(targetUrl, chart.json, isNewChart ? 'POST' : 'PUT')];
                    case 1:
                        json = _c.sent();
                        if (json.success) {
                            if (isNewChart) {
                                window.location.assign(this.props.admin.url("charts/" + json.data.id + "/edit"));
                            }
                            else {
                                this.isSaved = true;
                            }
                        }
                        else {
                            if (onError)
                                onError();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartEditor.prototype.saveAsNewChart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chart, chartJson, w, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chart = this.chart;
                        chartJson = Util_1.extend({}, chart.json);
                        delete chartJson.id;
                        delete chartJson.isPublished;
                        w = window.open("/", "_blank");
                        return [4 /*yield*/, this.props.admin.requestJSON("charts", chartJson, 'POST')];
                    case 1:
                        json = _a.sent();
                        if (json.success)
                            w.location.assign(this.props.admin.url("charts/" + json.data.id + "/edit"));
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartEditor.prototype.publishChart = function () {
        var _this = this;
        var url = Global.rootUrl + "/" + this.chart.data.slug;
        if (window.confirm("Publish chart at " + url + "?")) {
            this.chart.props.isPublished = true;
            this.saveChart({ onError: function () { return _this.chart.props.isPublished = undefined; } });
        }
    };
    ChartEditor.prototype.unpublishChart = function () {
        var _this = this;
        if (window.confirm("Really unpublish chart?")) {
            this.chart.props.isPublished = undefined;
            this.saveChart({ onError: function () { return _this.chart.props.isPublished = true; } });
        }
    };
    __decorate([
        mobx_1.observable.ref
    ], ChartEditor.prototype, "isSaved", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartEditor.prototype, "currentRequest", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartEditor.prototype, "tab", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartEditor.prototype, "errorMessage", void 0);
    __decorate([
        mobx_1.observable.ref
    ], ChartEditor.prototype, "previewMode", void 0);
    __decorate([
        mobx_1.computed
    ], ChartEditor.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], ChartEditor.prototype, "database", null);
    __decorate([
        mobx_1.computed
    ], ChartEditor.prototype, "availableTabs", null);
    __decorate([
        mobx_1.computed
    ], ChartEditor.prototype, "isNewChart", null);
    __decorate([
        mobx_1.computed
    ], ChartEditor.prototype, "features", null);
    return ChartEditor;
}());
exports.default = ChartEditor;
//# sourceMappingURL=ChartEditor.js.map