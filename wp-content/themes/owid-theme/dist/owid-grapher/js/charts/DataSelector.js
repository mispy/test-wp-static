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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var React = require("react");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
var FuzzySearch_1 = require("./FuzzySearch");
var DataSelectorMulti = /** @class */ (function (_super) {
    __extends(DataSelectorMulti, _super);
    function DataSelectorMulti() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataSelectorMulti.prototype, "availableData", {
        get: function () {
            var chart = this.props.chart;
            return chart.data.availableKeys.map(function (key) { return chart.data.lookupKey(key); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorMulti.prototype, "selectedData", {
        get: function () {
            var _this = this;
            return this.availableData.filter(function (d) { return _this.props.chart.data.selectedKeysByKey[d.key]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorMulti.prototype, "unselectedData", {
        get: function () {
            var _this = this;
            return this.availableData.filter(function (d) { return !_this.props.chart.data.selectedKeysByKey[d.key]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorMulti.prototype, "fuzzy", {
        get: function () {
            return new FuzzySearch_1.default(this.unselectedData, 'label');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorMulti.prototype, "searchResults", {
        get: function () {
            return this.searchInput ? this.fuzzy.search(this.searchInput) : this.unselectedData;
        },
        enumerable: true,
        configurable: true
    });
    DataSelectorMulti.prototype.onClickOutside = function (e) {
        if (this.base && !this.base.contains(e.target))
            this.props.onDismiss();
    };
    DataSelectorMulti.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return document.addEventListener("click", _this.onClickOutside); }, 1);
        if (!this.props.chartView.isMobile)
            this.searchField.focus();
    };
    DataSelectorMulti.prototype.componentDidUnmount = function () {
        document.removeEventListener("click", this.onClickOutside);
    };
    DataSelectorMulti.prototype.onSearchKeyDown = function (e) {
        if (e.key === "Enter" && this.searchResults.length > 0) {
            this.props.chart.data.toggleKey(this.searchResults[0].key);
            this.searchInput = "";
        }
        else if (e.key === "Escape")
            this.props.onDismiss();
    };
    DataSelectorMulti.prototype.render = function () {
        var _this = this;
        var chart = this.props.chart;
        var _a = this, selectedData = _a.selectedData, searchResults = _a.searchResults, searchInput = _a.searchInput;
        return React.createElement("div", { className: "DataSelectorMulti", onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("h2", null,
                "Choose data to show ",
                React.createElement("button", { onClick: this.props.onDismiss },
                    React.createElement("i", { className: "fa fa-times" }))),
            React.createElement("div", null,
                React.createElement("div", { className: "searchResults" },
                    React.createElement("input", { type: "search", placeholder: "Search...", value: searchInput, onInput: function (e) { return _this.searchInput = e.currentTarget.value; }, onKeyDown: this.onSearchKeyDown, ref: function (e) { return _this.searchField = e; } }),
                    React.createElement("ul", null, searchResults.map(function (d) {
                        return React.createElement("li", null,
                            React.createElement("label", { className: "clickable" },
                                React.createElement("input", { type: "checkbox", checked: false, onChange: function () { return chart.data.toggleKey(d.key); } }),
                                " ",
                                d.label));
                    }))),
                React.createElement("div", { className: "selectedData" },
                    React.createElement("ul", null, selectedData.map(function (d) {
                        return React.createElement("li", null,
                            React.createElement("label", { className: "clickable" },
                                React.createElement("input", { type: "checkbox", checked: true, onChange: function () { return chart.data.toggleKey(d.key); } }),
                                " ",
                                d.label));
                    })))));
    };
    __decorate([
        mobx_1.observable
    ], DataSelectorMulti.prototype, "searchInput", void 0);
    __decorate([
        mobx_1.computed
    ], DataSelectorMulti.prototype, "availableData", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorMulti.prototype, "selectedData", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorMulti.prototype, "unselectedData", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorMulti.prototype, "fuzzy", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorMulti.prototype, "searchResults", null);
    __decorate([
        mobx_1.action.bound
    ], DataSelectorMulti.prototype, "onClickOutside", null);
    __decorate([
        mobx_1.action.bound
    ], DataSelectorMulti.prototype, "onSearchKeyDown", null);
    DataSelectorMulti = __decorate([
        mobx_react_1.observer
    ], DataSelectorMulti);
    return DataSelectorMulti;
}(React.Component));
exports.DataSelectorMulti = DataSelectorMulti;
var DataSelectorSingle = /** @class */ (function (_super) {
    __extends(DataSelectorSingle, _super);
    function DataSelectorSingle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataSelectorSingle.prototype, "availableItems", {
        get: function () {
            var availableItems = [];
            this.props.chart.data.keyData.forEach(function (meta) {
                availableItems.push({
                    id: meta.entityId,
                    label: meta.entity
                });
            });
            return Util_1.uniqBy(availableItems, function (d) { return d.label; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorSingle.prototype, "fuzzy", {
        get: function () {
            return new FuzzySearch_1.default(this.availableItems, 'label');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSelectorSingle.prototype, "searchResults", {
        get: function () {
            return this.searchInput ? this.fuzzy.search(this.searchInput) : this.availableItems;
        },
        enumerable: true,
        configurable: true
    });
    DataSelectorSingle.prototype.onClickOutside = function (e) {
        if (this.base && !this.base.contains(e.target))
            this.props.onDismiss();
    };
    DataSelectorSingle.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return document.addEventListener("click", _this.onClickOutside); }, 1);
        if (!this.props.chartView.isMobile)
            this.searchField.focus();
    };
    DataSelectorSingle.prototype.componentDidUnmount = function () {
        document.removeEventListener("click", this.onClickOutside);
    };
    DataSelectorSingle.prototype.onSearchKeyDown = function (e) {
        if (e.key === "Enter" && this.searchResults.length > 0) {
            this.onSelect(this.searchResults[0].id);
            this.searchInput = "";
        }
        else if (e.key === "Escape")
            this.props.onDismiss();
    };
    DataSelectorSingle.prototype.onSelect = function (entityId) {
        this.props.chart.data.switchEntity(entityId);
        this.props.onDismiss();
    };
    DataSelectorSingle.prototype.render = function () {
        var _this = this;
        var _a = this, searchResults = _a.searchResults, searchInput = _a.searchInput;
        return React.createElement("div", { className: "DataSelectorSingle", onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("input", { type: "search", placeholder: "Search...", value: searchInput, onInput: function (e) { return _this.searchInput = e.currentTarget.value; }, onKeyDown: this.onSearchKeyDown, ref: function (e) { return _this.searchField = e; } }),
            React.createElement("ul", null, searchResults.map(function (d) {
                return React.createElement("li", { className: "clickable", onClick: function () { return _this.onSelect(d.id); } }, d.label);
            })));
    };
    __decorate([
        mobx_1.observable
    ], DataSelectorSingle.prototype, "searchInput", void 0);
    __decorate([
        mobx_1.computed
    ], DataSelectorSingle.prototype, "availableItems", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorSingle.prototype, "fuzzy", null);
    __decorate([
        mobx_1.computed
    ], DataSelectorSingle.prototype, "searchResults", null);
    __decorate([
        mobx_1.action.bound
    ], DataSelectorSingle.prototype, "onClickOutside", null);
    __decorate([
        mobx_1.action.bound
    ], DataSelectorSingle.prototype, "onSearchKeyDown", null);
    __decorate([
        mobx_1.action.bound
    ], DataSelectorSingle.prototype, "onSelect", null);
    DataSelectorSingle = __decorate([
        mobx_react_1.observer
    ], DataSelectorSingle);
    return DataSelectorSingle;
}(React.Component));
exports.DataSelectorSingle = DataSelectorSingle;
var DataSelector = /** @class */ (function (_super) {
    __extends(DataSelector, _super);
    function DataSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSelector.prototype.render = function () {
        var chart = this.props.chart;
        if (chart.data.canChangeEntity)
            return React.createElement(DataSelectorSingle, __assign({}, this.props));
        else
            return React.createElement(DataSelectorMulti, __assign({}, this.props));
    };
    DataSelector = __decorate([
        mobx_react_1.observer
    ], DataSelector);
    return DataSelector;
}(React.Component));
exports.default = DataSelector;
//# sourceMappingURL=DataSelector.js.map