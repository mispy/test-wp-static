"use strict";
/* ScaleSelector.jsx
 * ================
 *
 * Small toggle component for switching between log/linear (or any other) scale types.
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-02-11
 */
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
var ScaleSelector = /** @class */ (function (_super) {
    __extends(ScaleSelector, _super);
    function ScaleSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ScaleSelector.prototype, "x", {
        get: function () { return this.props.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleSelector.prototype, "y", {
        get: function () { return this.props.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleSelector.prototype, "scaleTypeOptions", {
        get: function () {
            return this.props.scaleTypeOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleSelector.prototype, "scaleType", {
        get: function () {
            return this.props.scaleType;
        },
        enumerable: true,
        configurable: true
    });
    ScaleSelector.prototype.onClick = function () {
        var _a = this, scaleType = _a.scaleType, scaleTypeOptions = _a.scaleTypeOptions;
        var nextScaleTypeIndex = scaleTypeOptions.indexOf(scaleType) + 1;
        if (nextScaleTypeIndex >= scaleTypeOptions.length)
            nextScaleTypeIndex = 0;
        this.props.onChange(scaleTypeOptions[nextScaleTypeIndex]);
    };
    ScaleSelector.prototype.render = function () {
        var _a = this, x = _a.x, y = _a.y, onClick = _a.onClick, scaleType = _a.scaleType;
        if (this.context.isStatic)
            return null;
        var style = { 'font-size': '12px', 'text-transform': 'uppercase', 'cursor': 'pointer' };
        return React.createElement("text", { x: x, y: y, onClick: onClick, style: style, className: "clickable" },
            React.createElement("tspan", { style: { 'font-family': "FontAwesome" } }, '\uf013'),
            " ",
            scaleType);
    };
    __decorate([
        mobx_1.computed
    ], ScaleSelector.prototype, "x", null);
    __decorate([
        mobx_1.computed
    ], ScaleSelector.prototype, "y", null);
    __decorate([
        mobx_1.computed
    ], ScaleSelector.prototype, "scaleTypeOptions", null);
    __decorate([
        mobx_1.computed
    ], ScaleSelector.prototype, "scaleType", null);
    __decorate([
        mobx_1.action.bound
    ], ScaleSelector.prototype, "onClick", null);
    ScaleSelector = __decorate([
        mobx_react_1.observer
    ], ScaleSelector);
    return ScaleSelector;
}(React.Component));
exports.default = ScaleSelector;
//# sourceMappingURL=ScaleSelector.js.map