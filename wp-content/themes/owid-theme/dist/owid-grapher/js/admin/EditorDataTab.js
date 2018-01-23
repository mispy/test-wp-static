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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Util_1 = require("../charts/Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Forms_1 = require("./Forms");
var DataKeyItem = /** @class */ (function (_super) {
    __extends(DataKeyItem, _super);
    function DataKeyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isChoosingColor = false;
        return _this;
    }
    Object.defineProperty(DataKeyItem.prototype, "color", {
        get: function () { return this.props.chart.data.keyColors[this.props.datakey]; },
        enumerable: true,
        configurable: true
    });
    DataKeyItem.prototype.onColor = function (color) {
        this.props.chart.data.setKeyColor(this.props.datakey, color);
    };
    DataKeyItem.prototype.onRemove = function () {
        var _this = this;
        this.props.chart.data.selectedKeys = this.props.chart.data.selectedKeys.filter(function (e) { return e !== _this.props.datakey; });
    };
    DataKeyItem.prototype.render = function () {
        var _a = this, props = _a.props, color = _a.color;
        var chart = props.chart, datakey = props.datakey, rest = __rest(props, ["chart", "datakey"]);
        var meta = chart.data.keyData.get(datakey);
        return React.createElement(Forms_1.EditableListItem, __assign({ className: "DataKeyItem", key: datakey }, rest),
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("i", { className: "fa fa-arrows-v" })),
                React.createElement(Forms_1.ColorBox, { color: color, onColor: this.onColor }),
                meta ? meta.fullLabel : datakey),
            React.createElement("div", { className: "clickable", onClick: this.onRemove },
                React.createElement("i", { className: "fa fa-remove" })));
    };
    __decorate([
        mobx_1.observable.ref
    ], DataKeyItem.prototype, "isChoosingColor", void 0);
    __decorate([
        mobx_1.computed
    ], DataKeyItem.prototype, "color", null);
    __decorate([
        mobx_1.action.bound
    ], DataKeyItem.prototype, "onColor", null);
    __decorate([
        mobx_1.action.bound
    ], DataKeyItem.prototype, "onRemove", null);
    DataKeyItem = __decorate([
        mobx_react_1.observer
    ], DataKeyItem);
    return DataKeyItem;
}(React.Component));
var KeysSection = /** @class */ (function (_super) {
    __extends(KeysSection, _super);
    function KeysSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeysSection.prototype.onAddKey = function (key) {
        this.props.chart.data.selectKey(key);
    };
    KeysSection.prototype.onStartDrag = function (key) {
        var _this = this;
        this.dragKey = key;
        var onDrag = mobx_1.action(function () {
            _this.dragKey = undefined;
            window.removeEventListener('mouseup', onDrag);
        });
        window.addEventListener('mouseup', onDrag);
    };
    KeysSection.prototype.onMouseEnter = function (targetKey) {
        if (!this.dragKey || targetKey === this.dragKey)
            return;
        var selectedKeys = Util_1.clone(this.props.chart.data.selectedKeys);
        var dragIndex = selectedKeys.indexOf(this.dragKey);
        var targetIndex = selectedKeys.indexOf(targetKey);
        selectedKeys.splice(dragIndex, 1);
        selectedKeys.splice(targetIndex, 0, this.dragKey);
        this.props.chart.data.selectedKeys = selectedKeys;
    };
    KeysSection.prototype.render = function () {
        var _this = this;
        var chart = this.props.chart;
        var _a = chart.data, selectedKeys = _a.selectedKeys, remainingKeys = _a.remainingKeys;
        var keyLabels = remainingKeys.map(function (key) { return chart.data.lookupKey(key).fullLabel; });
        return React.createElement(Forms_1.Section, { name: "Data to show" },
            React.createElement(Forms_1.SelectField, { onValue: this.onAddKey, value: "Select data", options: ["Select data"].concat(remainingKeys), optionLabels: ["Select data"].concat(keyLabels) }),
            React.createElement(Forms_1.EditableList, null, Util_1.map(selectedKeys, function (datakey) {
                return React.createElement(DataKeyItem, { chart: chart, datakey: datakey, onMouseDown: function () { return _this.onStartDrag(datakey); }, onMouseEnter: function () { return _this.onMouseEnter(datakey); } });
            })));
    };
    __decorate([
        mobx_1.observable.ref
    ], KeysSection.prototype, "dragKey", void 0);
    __decorate([
        mobx_1.action.bound
    ], KeysSection.prototype, "onAddKey", null);
    __decorate([
        mobx_1.action.bound
    ], KeysSection.prototype, "onStartDrag", null);
    __decorate([
        mobx_1.action.bound
    ], KeysSection.prototype, "onMouseEnter", null);
    KeysSection = __decorate([
        mobx_react_1.observer
    ], KeysSection);
    return KeysSection;
}(React.Component));
var EditorDataTab = /** @class */ (function (_super) {
    __extends(EditorDataTab, _super);
    function EditorDataTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorDataTab.prototype.render = function () {
        var editor = this.props.editor;
        var chart = editor.chart;
        return React.createElement("div", { className: "EditorDataTab" },
            React.createElement(Forms_1.Section, { name: "Can user add/change data?" },
                React.createElement("div", { className: "form-check" },
                    React.createElement("label", { className: "form-check-label" },
                        React.createElement("input", { className: "form-check-input", type: "radio", name: "add-country-mode", value: "add-country", checked: chart.addCountryMode === "add-country", onClick: function (_) { return chart.props.addCountryMode = "add-country"; } }),
                        "User can add and remove data")),
                React.createElement("div", { className: "form-check" },
                    React.createElement("label", { className: "form-check-label" },
                        React.createElement("input", { className: "form-check-input", type: "radio", name: "add-country-mode", value: "change-country", checked: chart.addCountryMode === "change-country", onClick: function (_) { return chart.props.addCountryMode = "change-country"; } }),
                        "User can change entity")),
                React.createElement("div", { className: "form-check" },
                    React.createElement("label", { className: "form-check-label" },
                        React.createElement("input", { className: "form-check-input", type: "radio", name: "add-country-mode", value: "disabled", checked: chart.addCountryMode === "disabled", onClick: function (_) { return chart.props.addCountryMode = "disabled"; } }),
                        "User cannot change/add data"))),
            React.createElement(KeysSection, { chart: editor.chart }));
    };
    EditorDataTab = __decorate([
        mobx_react_1.observer
    ], EditorDataTab);
    return EditorDataTab;
}(React.Component));
exports.default = EditorDataTab;
//# sourceMappingURL=EditorDataTab.js.map