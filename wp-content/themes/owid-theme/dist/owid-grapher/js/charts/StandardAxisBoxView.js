"use strict";
/* StandardAxisBoxView.tsx
 * ================
 *
 * Default axis UI given a box and chart state.
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
var AxisBox_1 = require("./AxisBox");
var mobx_1 = require("mobx");
var StandardAxisBoxView = /** @class */ (function (_super) {
    __extends(StandardAxisBoxView, _super);
    function StandardAxisBoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StandardAxisBoxView.prototype.onXScaleChange = function (scaleType) {
        this.props.chart.xAxis.scaleType = scaleType;
    };
    StandardAxisBoxView.prototype.onYScaleChange = function (scaleType) {
        this.props.chart.yAxis.scaleType = scaleType;
    };
    StandardAxisBoxView.prototype.render = function () {
        var axisBox = this.props.axisBox;
        return React.createElement(AxisBox_1.AxisBoxView, { axisBox: axisBox, onXScaleChange: this.onXScaleChange, onYScaleChange: this.onYScaleChange });
    };
    __decorate([
        mobx_1.action.bound
    ], StandardAxisBoxView.prototype, "onXScaleChange", null);
    __decorate([
        mobx_1.action.bound
    ], StandardAxisBoxView.prototype, "onYScaleChange", null);
    return StandardAxisBoxView;
}(React.Component));
exports.default = StandardAxisBoxView;
//# sourceMappingURL=StandardAxisBoxView.js.map