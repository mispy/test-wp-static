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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextWrap_1 = require("./TextWrap");
var Bounds_1 = require("./Bounds");
var AxisBoxHighlight = /** @class */ (function (_super) {
    __extends(AxisBoxHighlight, _super);
    function AxisBoxHighlight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisBoxHighlight.prototype.render = function () {
        var _a = this.props, axisBox = _a.axisBox, value = _a.value;
        var xScale = axisBox.xScale, yScale = axisBox.yScale, bounds = axisBox.bounds, innerBounds = axisBox.innerBounds, xAxis = axisBox.xAxis, yAxis = axisBox.yAxis;
        var xLabel = new TextWrap_1.default({ maxWidth: bounds.width, fontSize: 0.7, text: xScale.tickFormat(value.x) });
        var yLabel = new TextWrap_1.default({ maxWidth: bounds.width, fontSize: 0.7, text: yScale.tickFormat(value.y) });
        var highlightX = xScale.place(value.x);
        var highlightY = yScale.place(value.y);
        var xLabelBounds = new Bounds_1.default(highlightX - xLabel.width / 2, bounds.bottom - xAxis.labelOffset - xLabel.height, xLabel.width, xLabel.height);
        var yLabelBounds = new Bounds_1.default(bounds.left + yAxis.width - yLabel.width - 5, highlightY - yLabel.height / 2, yLabel.width, yLabel.height);
        return React.createElement("g", null,
            React.createElement("line", { x1: highlightX, y1: innerBounds.bottom, x2: highlightX, y2: highlightY, stroke: "#000", "stroke-dasharray": "3,2" }),
            React.createElement("rect", __assign({}, xLabelBounds.padWidth(-10).toProps(), { fill: "#fff" })),
            xLabel.render(xLabelBounds.x, xLabelBounds.y, { fill: "#333", fontWeight: "bold" }),
            React.createElement("line", { x1: innerBounds.left, y1: highlightY, x2: highlightX, y2: highlightY, stroke: "#000", "stroke-dasharray": "3,2" }),
            React.createElement("rect", __assign({}, yLabelBounds.padHeight(-10).toProps(), { fill: "#fff" })),
            yLabel.render(yLabelBounds.x, yLabelBounds.y, { fill: "#333", fontWeight: "bold" }));
    };
    return AxisBoxHighlight;
}(React.Component));
exports.default = AxisBoxHighlight;
//# sourceMappingURL=AxisBoxHighlight.js.map