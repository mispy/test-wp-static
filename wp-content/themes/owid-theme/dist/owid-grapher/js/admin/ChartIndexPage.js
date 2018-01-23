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
var React = require("react");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var Forms_1 = require("./Forms");
var Link_1 = require("./Link");
var Util_1 = require("../charts/Util");
var timeago = require('timeago.js')();
var fuzzysort = require("fuzzysort");
function showChartType(chart) {
    var displayNames = {
        LineChart: "Line Chart",
        ScatterPlot: "Scatter Plot",
        StackedArea: "Stacked Area",
        DiscreteBar: "Discrete Bar",
        SlopeChart: "Slope Chart"
    };
    var displayType = displayNames[chart.type] || "Unknown";
    if (chart.tab === "map") {
        if (chart.hasChartTab)
            return "Map + " + displayType;
        else
            return "Map";
    }
    else {
        if (chart.hasMapTab)
            return displayType + " + Map";
        else
            return displayType;
    }
}
var ChartRow = /** @class */ (function (_super) {
    __extends(ChartRow, _super);
    function ChartRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, chart = _a.chart, highlight = _a.highlight;
        var admin = this.context.admin;
        return React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement("a", { title: "Show this chart on the front page of the website.", onClick: function (_) { return _this.props.onStar(chart); } }, chart.isStarred ? React.createElement("i", { className: "fa fa-star" }) : React.createElement("i", { className: "fa fa-star-o" }))),
            chart.isPublished ? React.createElement("td", null,
                React.createElement("a", { href: admin.grapherRoot + "/" + chart.slug }, highlight(chart.title))) : React.createElement("td", null,
                React.createElement("span", { style: { color: 'red' } }, "Draft: "),
                " ",
                highlight(chart.title)),
            React.createElement("td", { style: { "min-width": "120px" } }, showChartType(chart)),
            React.createElement("td", null, chart.variables.map(function (v) { return [
                React.createElement(Link_1.default, { to: "/variables/" + v.id, native: true }, highlight(v.name)),
                React.createElement("br", null)
            ]; })),
            React.createElement("td", null, chart.internalNotes),
            React.createElement("td", null,
                chart.publishedAt && timeago.format(chart.publishedAt + '.000Z'),
                chart.publishedBy && React.createElement("span", null,
                    " by ",
                    chart.lastEditedBy)),
            React.createElement("td", null,
                timeago.format(chart.lastEditedAt + '.000Z'),
                " by ",
                chart.lastEditedBy),
            React.createElement("td", null,
                React.createElement(Link_1.default, { to: "/charts/" + chart.id + "/edit", className: "btn btn-primary" }, "Edit")),
            React.createElement("td", null,
                React.createElement("button", { className: "btn btn-danger", onClick: function (_) { return _this.props.onDelete(chart); } }, "Delete")));
    };
    ChartRow = __decorate([
        mobx_react_1.observer
    ], ChartRow);
    return ChartRow;
}(React.Component));
var ChartIndexPage = /** @class */ (function (_super) {
    __extends(ChartIndexPage, _super);
    function ChartIndexPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxVisibleCharts = 50;
        _this.charts = [];
        _this.numTotalCharts = 0;
        return _this;
    }
    Object.defineProperty(ChartIndexPage.prototype, "wantsSearch", {
        get: function () { return !!this.searchInput; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartIndexPage.prototype, "searchIndex", {
        get: function () {
            var searchIndex = [];
            for (var _i = 0, _a = this.charts; _i < _a.length; _i++) {
                var chart = _a[_i];
                searchIndex.push({
                    chart: chart,
                    term: fuzzysort.prepare(chart.title)
                });
                for (var _b = 0, _c = chart.variables; _b < _c.length; _b++) {
                    var variable = _c[_b];
                    searchIndex.push({
                        chart: chart,
                        term: fuzzysort.prepare(variable.name)
                    });
                }
            }
            return searchIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartIndexPage.prototype, "chartsToShow", {
        get: function () {
            var _a = this, searchInput = _a.searchInput, searchIndex = _a.searchIndex, maxVisibleCharts = _a.maxVisibleCharts;
            if (searchInput) {
                var results = fuzzysort.go(searchInput, searchIndex, {
                    limit: 50,
                    key: 'term'
                });
                return Util_1.uniq(results.map(function (result) { return result.obj.chart; }));
            }
            else {
                return this.charts.slice(0, maxVisibleCharts);
            }
        },
        enumerable: true,
        configurable: true
    });
    ChartIndexPage.prototype.onSearchInput = function (input) {
        this.searchInput = input;
    };
    ChartIndexPage.prototype.onShowMore = function () {
        this.maxVisibleCharts += 100;
    };
    ChartIndexPage.prototype.onDeleteChart = function (chart) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.confirm("Delete the chart " + chart.slug + "? This action cannot be undone!"))
                            return [2 /*return*/];
                        return [4 /*yield*/, this.context.admin.requestJSON("charts/" + chart.id, {}, "DELETE")];
                    case 1:
                        json = _a.sent();
                        if (json.success) {
                            mobx_1.runInAction(function () { return _this.charts.splice(_this.charts.indexOf(chart), 1); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartIndexPage.prototype.onStar = function (chart) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (chart.isStarred)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.context.admin.requestJSON("charts/" + chart.id + "/star", {}, 'POST')];
                    case 1:
                        json = _a.sent();
                        if (json.success) {
                            mobx_1.runInAction(function () {
                                for (var _i = 0, _a = _this.charts; _i < _a.length; _i++) {
                                    var otherChart = _a[_i];
                                    if (otherChart === chart) {
                                        otherChart.isStarred = true;
                                    }
                                    else if (otherChart.isStarred) {
                                        otherChart.isStarred = false;
                                    }
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ChartIndexPage.prototype, "isSearchReady", {
        get: function () {
            return this.charts.length >= this.numTotalCharts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartIndexPage.prototype, "needsMoreData", {
        get: function () {
            return !!(this.maxVisibleCharts > this.charts.length || (this.wantsSearch && !this.isSearchReady));
        },
        enumerable: true,
        configurable: true
    });
    ChartIndexPage.prototype.render = function () {
        var _this = this;
        var _a = this, chartsToShow = _a.chartsToShow, searchInput = _a.searchInput, numTotalCharts = _a.numTotalCharts, isSearchReady = _a.isSearchReady;
        var highlight = function (text) {
            if (_this.searchInput) {
                var html = fuzzysort.highlight(fuzzysort.single(_this.searchInput, text)) || text;
                return React.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
            }
            else
                return text;
        };
        return React.createElement("main", { className: "ChartIndexPage" },
            React.createElement("div", { className: "topRow" },
                React.createElement("span", null,
                    "Showing ",
                    chartsToShow.length,
                    " of ",
                    numTotalCharts,
                    " charts"),
                React.createElement(Forms_1.TextField, { placeholder: "Search all charts...", value: searchInput, onValue: this.onSearchInput, autofocus: true })),
            React.createElement("table", { className: "table table-bordered" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("i", { className: "fa fa-star" })),
                        React.createElement("th", null, "Title"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Variables"),
                        React.createElement("th", null, "Notes"),
                        React.createElement("th", null, "Published"),
                        React.createElement("th", null, "Last Updated"),
                        React.createElement("th", null),
                        React.createElement("th", null))),
                React.createElement("tbody", null, chartsToShow.map(function (chart) { return React.createElement(ChartRow, { chart: chart, highlight: highlight, onDelete: _this.onDeleteChart, onStar: _this.onStar }); }))),
            !searchInput && React.createElement("button", { className: "btn btn-secondary", onClick: this.onShowMore }, "Show more charts..."));
    };
    ChartIndexPage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var admin, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin = this.context.admin;
                        if (admin.currentRequests.length > 0)
                            return [2 /*return*/];
                        return [4 /*yield*/, admin.getJSON("/charts.json" + (this.wantsSearch ? "" : "?limit=" + this.maxVisibleCharts))];
                    case 1:
                        json = _a.sent();
                        mobx_1.runInAction(function () {
                            _this.charts = json.charts;
                            _this.numTotalCharts = json.numTotalCharts;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartIndexPage.prototype.componentDidMount = function () {
        var _this = this;
        this.dispose = mobx_1.reaction(function () { return _this.needsMoreData; }, function () {
            if (_this.needsMoreData)
                _this.getData();
        });
        this.getData();
    };
    ChartIndexPage.prototype.componentWillUnmount = function () {
        this.dispose();
    };
    __decorate([
        mobx_1.observable
    ], ChartIndexPage.prototype, "searchInput", void 0);
    __decorate([
        mobx_1.computed
    ], ChartIndexPage.prototype, "wantsSearch", null);
    __decorate([
        mobx_1.observable
    ], ChartIndexPage.prototype, "maxVisibleCharts", void 0);
    __decorate([
        mobx_1.observable
    ], ChartIndexPage.prototype, "charts", void 0);
    __decorate([
        mobx_1.observable
    ], ChartIndexPage.prototype, "numTotalCharts", void 0);
    __decorate([
        mobx_1.computed
    ], ChartIndexPage.prototype, "searchIndex", null);
    __decorate([
        mobx_1.computed
    ], ChartIndexPage.prototype, "chartsToShow", null);
    __decorate([
        mobx_1.action.bound
    ], ChartIndexPage.prototype, "onSearchInput", null);
    __decorate([
        mobx_1.action.bound
    ], ChartIndexPage.prototype, "onShowMore", null);
    __decorate([
        mobx_1.action.bound
    ], ChartIndexPage.prototype, "onDeleteChart", null);
    __decorate([
        mobx_1.action.bound
    ], ChartIndexPage.prototype, "onStar", null);
    __decorate([
        mobx_1.computed
    ], ChartIndexPage.prototype, "isSearchReady", null);
    __decorate([
        mobx_1.computed
    ], ChartIndexPage.prototype, "needsMoreData", null);
    ChartIndexPage = __decorate([
        mobx_react_1.observer
    ], ChartIndexPage);
    return ChartIndexPage;
}(React.Component));
exports.default = ChartIndexPage;
//# sourceMappingURL=ChartIndexPage.js.map