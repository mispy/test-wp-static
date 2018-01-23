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
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var LabelledSlopes_1 = require("./LabelledSlopes");
var NoData_1 = require("./NoData");
var SlopeChart = /** @class */ (function (_super) {
    __extends(SlopeChart, _super);
    function SlopeChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SlopeChart.prototype, "transform", {
        get: function () {
            return this.props.chart.slopeChart;
        },
        enumerable: true,
        configurable: true
    });
    SlopeChart.prototype.render = function () {
        if (this.transform.failMessage)
            return React.createElement(NoData_1.default, { bounds: this.props.bounds, message: this.transform.failMessage });
        var _a = this.props, bounds = _a.bounds, chart = _a.chart;
        var yAxis = chart.yAxis;
        var data = this.transform.data;
        return React.createElement(LabelledSlopes_1.default, { bounds: bounds, yDomain: yAxis.domain, yTickFormat: this.transform.yTickFormat, yScaleType: yAxis.scaleType, yScaleTypeOptions: yAxis.scaleTypeOptions, onScaleTypeChange: function (scaleType) { chart.yAxis.scaleType = scaleType; }, data: data, fontSize: chart.baseFontSize });
    };
    __decorate([
        mobx_1.computed
    ], SlopeChart.prototype, "transform", null);
    SlopeChart = __decorate([
        mobx_react_1.observer
    ], SlopeChart);
    return SlopeChart;
}(React.Component));
exports.default = SlopeChart;
//# sourceMappingURL=SlopeChart.js.map