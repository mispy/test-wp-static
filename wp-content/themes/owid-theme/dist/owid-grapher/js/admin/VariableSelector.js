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
var Util_2 = require("../charts/Util");
var Forms_1 = require("./Forms");
var fuzzysort = require('fuzzysort');
var VariableSelector = /** @class */ (function (_super) {
    __extends(VariableSelector, _super);
    function VariableSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chosenVariables = [];
        _this.rowOffset = 0;
        _this.numVisibleRows = 15;
        _this.rowHeight = 32;
        return _this;
    }
    Object.defineProperty(VariableSelector.prototype, "database", {
        get: function () {
            return this.props.editor.database;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "currentNamespace", {
        get: function () {
            return Util_2.defaultTo(this.chosenNamespace, this.database.namespaces[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "editorData", {
        get: function () {
            return this.database.dataByNamespace.get(this.currentNamespace);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "datasets", {
        get: function () {
            if (!this.editorData)
                return [];
            var datasets = this.editorData.datasets;
            if (this.currentNamespace !== 'owid') {
                // The default temporal ordering has no real use for bulk imports
                return Util_1.sortBy(datasets, function (d) { return d.name; });
            }
            else {
                return datasets;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "availableVariables", {
        get: function () {
            var variables = [];
            this.datasets.forEach(function (dataset) {
                var sorted = Util_1.sortBy(dataset.variables, function (v) { return v.name; });
                sorted.forEach(function (variable) {
                    variables.push({
                        id: variable.id,
                        name: variable.name,
                        datasetName: dataset.name,
                        searchKey: fuzzysort.prepare(dataset.name + " - " + variable.name)
                        //name: variable.name.includes(dataset.name) ? variable.name : dataset.name + " - " + variable.name
                    });
                });
            });
            return variables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "unselectedVariables", {
        get: function () {
            var _this = this;
            return this.availableVariables.filter(function (v) { return !_this.chosenVariables.some(function (v2) { return v.id === v2.id; }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "searchResults", {
        get: function () {
            var results = this.searchInput && fuzzysort.go(this.searchInput, this.availableVariables, { key: 'searchKey' });
            return (results && results.length) ? results.map(function (result) { return result.obj; }) : this.unselectedVariables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "resultsByDataset", {
        get: function () {
            return Util_1.groupBy(this.searchResults, function (d) { return d.datasetName; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "searchResultRows", {
        get: function () {
            var resultsByDataset = this.resultsByDataset;
            var rows = [];
            Util_1.each(resultsByDataset, function (variables, datasetName) {
                rows.push(datasetName);
                for (var i = 0; i < variables.length; i += 2) {
                    rows.push(variables.slice(i, i + 2));
                }
            });
            return rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableSelector.prototype, "numTotalRows", {
        get: function () {
            return this.searchResultRows.length;
        },
        enumerable: true,
        configurable: true
    });
    VariableSelector.prototype.render = function () {
        var _this = this;
        var slot = this.props.slot;
        var database = this.props.editor.database;
        var _a = this, currentNamespace = _a.currentNamespace, searchInput = _a.searchInput, chosenVariables = _a.chosenVariables;
        var _b = this, rowHeight = _b.rowHeight, rowOffset = _b.rowOffset, numVisibleRows = _b.numVisibleRows, numTotalRows = _b.numTotalRows, searchResultRows = _b.searchResultRows;
        var highlight = function (text) {
            if (_this.searchInput) {
                var html = fuzzysort.highlight(fuzzysort.single(_this.searchInput, text)) || text;
                return React.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
            }
            else
                return text;
        };
        return React.createElement(Forms_1.Modal, { onClose: this.onDismiss, className: "VariableSelector" },
            React.createElement("div", { className: "modal-header" },
                React.createElement("h5", { className: "modal-title" },
                    "Set variable",
                    slot.allowMultiple && 's',
                    " for ",
                    slot.name)),
            React.createElement("div", { className: "modal-body" },
                React.createElement("form", null,
                    React.createElement("div", { className: "searchResults" },
                        React.createElement(Forms_1.FieldsRow, null,
                            React.createElement(Forms_1.SelectField, { label: "Database", options: database.namespaces, value: currentNamespace, onValue: this.onNamespace }),
                            React.createElement(Forms_1.TextField, { placeholder: "Search...", value: searchInput, onValue: this.onSearchInput, onEnter: this.onSearchEnter, autofocus: true })),
                        React.createElement("div", { style: { height: numVisibleRows * rowHeight, 'overflow-y': 'scroll' }, onScroll: this.onScroll, ref: function (e) { return _this.scrollElement = e; } },
                            React.createElement("div", { style: { height: numTotalRows * rowHeight, 'padding-top': rowHeight * rowOffset } },
                                React.createElement("ul", null, searchResultRows.slice(rowOffset, rowOffset + numVisibleRows).map(function (d) {
                                    if (Util_1.isString(d)) {
                                        return React.createElement("li", { key: d, style: { 'min-width': '100%' } },
                                            React.createElement("h5", null, highlight(d)));
                                    }
                                    else {
                                        return d.map(function (v) { return React.createElement("li", { key: v.id, style: { 'min-width': '50%' } },
                                            React.createElement(Forms_1.Toggle, { value: false, onValue: function () { return _this.selectVariable(v); }, label: highlight(v.name) })); });
                                    }
                                }))))),
                    React.createElement("div", { className: "selectedData" },
                        React.createElement("ul", null, chosenVariables.map(function (d) {
                            return React.createElement("li", null,
                                React.createElement(Forms_1.Toggle, { value: true, onValue: function () { return _this.unselectVariable(d); }, label: d.name }));
                        }))))),
            React.createElement("div", { className: "modal-footer" },
                React.createElement("button", { className: "btn", onClick: this.onDismiss }, "Close"),
                React.createElement("button", { className: "btn btn-success", onClick: this.onComplete },
                    "Set variable",
                    slot.allowMultiple && 's')));
    };
    VariableSelector.prototype.onScroll = function (ev) {
        var _a = ev.currentTarget, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight;
        var numTotalRows = this.numTotalRows;
        var rowOffset = Math.round(scrollTop / scrollHeight * numTotalRows);
        ev.currentTarget.scrollTop = Math.round(rowOffset / numTotalRows * scrollHeight);
        this.rowOffset = rowOffset;
    };
    VariableSelector.prototype.onNamespace = function (namespace) {
        this.chosenNamespace = namespace;
    };
    VariableSelector.prototype.onSearchInput = function (input) {
        this.searchInput = input;
        this.rowOffset = 0;
        this.scrollElement.scrollTop = 0;
    };
    VariableSelector.prototype.selectVariable = function (variable) {
        if (this.props.slot.allowMultiple)
            this.chosenVariables = this.chosenVariables.concat(variable);
        else
            this.chosenVariables = [variable];
    };
    VariableSelector.prototype.unselectVariable = function (variable) {
        this.chosenVariables = this.chosenVariables.filter(function (v) { return v.id !== variable.id; });
    };
    VariableSelector.prototype.onSearchEnter = function () {
        if (this.searchResults.length > 0) {
            this.selectVariable(this.searchResults[0]);
        }
    };
    VariableSelector.prototype.onDismiss = function () {
        this.props.onDismiss();
    };
    VariableSelector.prototype.componentDidMount = function () {
        var _this = this;
        this.dispose = mobx_1.autorun(function () {
            if (!_this.editorData)
                mobx_1.runInAction(function () { return _this.props.editor.loadNamespace(_this.currentNamespace); });
        });
        this.chosenVariables = this.props.slot.dimensionsWithData.map(function (d) { return ({
            name: d.displayName,
            id: d.variableId,
            datasetName: "",
            searchKey: ""
        }); });
    };
    VariableSelector.prototype.componentDidUnmount = function () {
        this.dispose();
    };
    VariableSelector.prototype.onComplete = function () {
        this.props.onComplete(this.chosenVariables.map(function (v) { return v.id; }));
    };
    __decorate([
        mobx_1.observable.ref
    ], VariableSelector.prototype, "chosenNamespace", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableSelector.prototype, "searchInput", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableSelector.prototype, "isProjection", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableSelector.prototype, "tolerance", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableSelector.prototype, "chosenVariables", void 0);
    __decorate([
        mobx_1.observable
    ], VariableSelector.prototype, "rowOffset", void 0);
    __decorate([
        mobx_1.observable
    ], VariableSelector.prototype, "numVisibleRows", void 0);
    __decorate([
        mobx_1.observable
    ], VariableSelector.prototype, "rowHeight", void 0);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "database", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "currentNamespace", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "editorData", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "datasets", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "availableVariables", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "unselectedVariables", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "searchResults", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "resultsByDataset", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "searchResultRows", null);
    __decorate([
        mobx_1.computed
    ], VariableSelector.prototype, "numTotalRows", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onScroll", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onNamespace", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onSearchInput", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "selectVariable", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "unselectVariable", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onSearchEnter", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onDismiss", null);
    __decorate([
        mobx_1.action.bound
    ], VariableSelector.prototype, "onComplete", null);
    VariableSelector = __decorate([
        mobx_react_1.observer
    ], VariableSelector);
    return VariableSelector;
}(React.Component));
exports.default = VariableSelector;
//# sourceMappingURL=VariableSelector.js.map