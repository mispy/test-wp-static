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
var Forms_1 = require("./Forms");
var ColorSchemes_1 = require("../charts/ColorSchemes");
var mobx_1 = require("mobx");
var Colorpicker = /** @class */ (function (_super) {
    __extends(Colorpicker, _super);
    function Colorpicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Colorpicker.prototype.componentDidMount = function () {
        var _this = this;
        var textField = this.base.querySelector("input");
        textField.focus();
        setTimeout(function () { return window.addEventListener('click', _this.onClickOutside); }, 10);
    };
    Colorpicker.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onClickOutside);
    };
    Colorpicker.prototype.onClickOutside = function () {
        this.props.onClose();
    };
    Colorpicker.prototype.onColor = function (color) {
        if (color === "") {
            this.props.onColor(undefined);
        }
        else {
            this.props.onColor(color);
        }
    };
    Colorpicker.prototype.render = function () {
        var _this = this;
        var availableColors = Util_1.last(ColorSchemes_1.default['owid-distinct'].colorSets);
        return React.createElement("div", { className: "Colorpicker", tabIndex: 0, onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("ul", null, availableColors.map(function (color) {
                return React.createElement("li", { style: { backgroundColor: color }, onClick: function () { _this.props.onColor(color); _this.props.onClose(); } });
            })),
            React.createElement(Forms_1.TextField, { placeholder: "#xxxxxx", value: this.props.color, onValue: this.onColor, onEnter: this.props.onClose, onEscape: this.props.onClose }));
    };
    __decorate([
        mobx_1.action.bound
    ], Colorpicker.prototype, "onClickOutside", null);
    __decorate([
        mobx_1.action.bound
    ], Colorpicker.prototype, "onColor", null);
    return Colorpicker;
}(React.Component));
exports.default = Colorpicker;
//# sourceMappingURL=Colorpicker.js.map