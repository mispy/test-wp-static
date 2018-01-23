"use strict";
/*

WIP: eventual interface for split visualization library

Interface should be like...

const chart = new Chart({ config: foo, data: etc })
chart.interactive(domNode)

*/
Object.defineProperty(exports, "__esModule", { value: true });
var ChartConfig_1 = require("./ChartConfig");
var ChartView_1 = require("./ChartView");
var Bounds_1 = require("./Bounds");
var React = require("react");
var ReactDOM = require("react-dom");
var Chart = /** @class */ (function () {
    function Chart(props) {
        this.config = new ChartConfig_1.default(props);
    }
    Chart.testBootstrap = function () {
        var figure = document.getElementsByTagName("figure")[0];
        var chart = new Chart({ type: "LineChart" });
        chart.interactive(figure);
    };
    Chart.prototype.interactive = function (containerNode) {
        var containerBounds = new Bounds_1.default(0, 0, 800, 600);
        ReactDOM.render(React.createElement(ChartView_1.default, { bounds: containerBounds, chart: this.config, isEditor: false, isEmbed: false }), containerNode);
    };
    return Chart;
}());
exports.default = Chart;
//# sourceMappingURL=Chart.js.map