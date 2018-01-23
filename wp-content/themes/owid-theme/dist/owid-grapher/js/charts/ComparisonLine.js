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
var d3_scale_1 = require("d3-scale");
var d3_shape_1 = require("d3-shape");
var Util_1 = require("./Util");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var evalEquation_1 = require("./evalEquation");
var ComparisonLine = /** @class */ (function (_super) {
    __extends(ComparisonLine, _super);
    function ComparisonLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComparisonLine.prototype, "lineData", {
        get: function () {
            var _a = this.props, comparisonLine = _a.comparisonLine, axisBox = _a.axisBox;
            var xScale = axisBox.xScale, yScale = axisBox.yScale;
            var yEquals = Util_1.defaultTo(comparisonLine.yEquals, "x");
            var yFunc = function (x) { return evalEquation_1.default(yEquals, { x: x, e: Math.E, pi: Math.PI }, x); };
            // Construct control data by running the equation across sample points
            var numPoints = 100;
            var scale = d3_scale_1.scaleLinear().domain([0, 100]).range(xScale.domain);
            var controlData = [];
            for (var i = 0; i < numPoints; i++) {
                var x = scale(i);
                var y = yFunc(x);
                if (xScale.scaleType === 'log' && x <= 0)
                    continue;
                if (yScale.scaleType === 'log' && y <= 0)
                    continue;
                controlData.push([x, y]);
            }
            var line = d3_shape_1.line().curve(d3_shape_1.curveLinear).x(function (d) { return xScale.place(d[0]); }).y(function (d) { return yScale.place(d[1]); });
            return line(controlData);
        },
        enumerable: true,
        configurable: true
    });
    ComparisonLine.prototype.componentWillMount = function () {
        this.renderUid = Util_1.guid();
    };
    ComparisonLine.prototype.render = function () {
        var innerBounds = this.props.axisBox.innerBounds;
        var _a = this, lineData = _a.lineData, renderUid = _a.renderUid;
        return React.createElement("g", { className: "ComparisonLine" },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "axisBounds-" + renderUid },
                    React.createElement("rect", { x: innerBounds.x, y: innerBounds.y, width: innerBounds.width, height: innerBounds.height }))),
            React.createElement("path", { d: lineData || undefined, clipPath: "url(#axisBounds-" + renderUid + ")", fill: "none", stroke: "#ccc" }));
    };
    __decorate([
        mobx_1.computed
    ], ComparisonLine.prototype, "lineData", null);
    ComparisonLine = __decorate([
        mobx_react_1.observer
    ], ComparisonLine);
    return ComparisonLine;
}(React.Component));
exports.default = ComparisonLine;
//# sourceMappingURL=ComparisonLine.js.map