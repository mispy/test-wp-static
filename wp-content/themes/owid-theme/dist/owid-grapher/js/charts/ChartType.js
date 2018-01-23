"use strict";
// TODO make this a string enum in TypeScript 2.4
Object.defineProperty(exports, "__esModule", { value: true });
var ChartType = /** @class */ (function () {
    function ChartType() {
    }
    ChartType.LineChart = "LineChart";
    ChartType.ScatterPlot = "ScatterPlot";
    ChartType.StackedArea = "StackedArea";
    ChartType.DiscreteBar = "DiscreteBar";
    ChartType.SlopeChart = "SlopeChart";
    return ChartType;
}());
exports.default = ChartType;
exports.ChartTypeDefs = [
    {
        key: ChartType.LineChart,
        label: "Line Chart"
    },
    {
        key: ChartType.ScatterPlot,
        label: "Scatter Plot"
    },
    {
        key: ChartType.StackedArea,
        label: "Stacked Area"
    },
    {
        key: ChartType.DiscreteBar,
        label: "Discrete Bar"
    },
    {
        key: ChartType.SlopeChart,
        label: "Slope Chart"
    }
];
//# sourceMappingURL=ChartType.js.map