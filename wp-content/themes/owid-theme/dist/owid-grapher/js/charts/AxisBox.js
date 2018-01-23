"use strict";
/* AxisBox.tsx
 * ================
 *
 * Standard axis box layout model. Precompute before rendering and pass it around.
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
var AxisScale_1 = require("./AxisScale");
var VerticalAxis_1 = require("./VerticalAxis");
var HorizontalAxis_1 = require("./HorizontalAxis");
var Util_1 = require("./Util");
// AxisBox has the important task of coordinating two axes so that they work together!
// There is a *two-way dependency* between the bounding size of each axis.
// e.g. if the y axis becomes wider because a label is present, the x axis then has less
// space to work with, and vice versa
var AxisBox = /** @class */ (function () {
    function AxisBox(props) {
        this.targetYDomain = [1, 100];
        this.targetXDomain = [1, 100];
        this.prevYDomain = [1, 100];
        this.prevXDomain = [1, 100];
        this.props = props;
    }
    Object.defineProperty(AxisBox.prototype, "currentYDomain", {
        get: function () {
            if (this.animProgress === undefined)
                return this.props.yAxis.domain;
            var _a = this.prevYDomain, prevMinY = _a[0], prevMaxY = _a[1];
            var _b = this.targetYDomain, targetMinY = _b[0], targetMaxY = _b[1];
            return [
                prevMinY + (targetMinY - prevMinY) * this.animProgress,
                prevMaxY + (targetMaxY - prevMaxY) * this.animProgress
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "currentXDomain", {
        get: function () {
            if (this.animProgress === undefined)
                return this.props.xAxis.domain;
            var _a = this.prevXDomain, prevMinX = _a[0], prevMaxX = _a[1];
            var _b = this.targetXDomain, targetMinX = _b[0], targetMaxX = _b[1];
            return [
                prevMinX + (targetMinX - prevMinX) * this.animProgress,
                prevMaxX + (targetMaxX - prevMaxX) * this.animProgress
            ];
        },
        enumerable: true,
        configurable: true
    });
    AxisBox.prototype.setupAnimation = function () {
        var _this = this;
        this.targetYDomain = this.props.yAxis.domain;
        this.targetXDomain = this.props.xAxis.domain;
        this.animProgress = 1;
        mobx_1.reaction(function () { return [_this.props.yAxis.domain, _this.props.xAxis.domain]; }, function () {
            _this.prevXDomain = _this.currentXDomain;
            _this.prevYDomain = _this.currentYDomain;
            _this.targetYDomain = _this.props.yAxis.domain;
            _this.targetXDomain = _this.props.xAxis.domain;
            _this.animProgress = 0;
            requestAnimationFrame(_this.frame);
        });
    };
    AxisBox.prototype.frame = function (timestamp) {
        if (this.animProgress === undefined)
            return;
        if (!this.frameStart)
            this.frameStart = timestamp;
        this.animProgress = Math.min(1, this.animProgress + (timestamp - this.frameStart) / 300);
        if (this.animProgress < 1)
            requestAnimationFrame(this.frame);
        else
            this.frameStart = undefined;
    };
    Object.defineProperty(AxisBox.prototype, "yAxisSpec", {
        get: function () {
            return Util_1.extend({}, this.props.yAxis, { domain: this.currentYDomain });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "xAxisSpec", {
        get: function () {
            return Util_1.extend({}, this.props.xAxis, { domain: this.currentXDomain });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "xAxisHeight", {
        // We calculate an initial width/height for the axes in isolation
        get: function () {
            return new HorizontalAxis_1.default({
                scale: new AxisScale_1.default(this.xAxisSpec).extend({ range: [0, this.props.bounds.width] }),
                labelText: this.xAxisSpec.label,
                fontSize: this.props.fontSize
            }).height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "yAxisWidth", {
        get: function () {
            return new VerticalAxis_1.default({
                scale: new AxisScale_1.default(this.yAxisSpec).extend({ range: [0, this.props.bounds.height] }),
                labelText: this.yAxisSpec.label,
                fontSize: this.props.fontSize
            }).width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "innerBounds", {
        // Now we can determine the "true" inner bounds of the axis box
        get: function () {
            return this.props.bounds.padBottom(this.xAxisHeight).padLeft(this.yAxisWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "xScale", {
        get: function () {
            return new AxisScale_1.default(this.xAxisSpec).extend({ range: this.innerBounds.xRange() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "yScale", {
        get: function () {
            return new AxisScale_1.default(this.yAxisSpec).extend({ range: this.innerBounds.yRange() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "xAxis", {
        get: function () {
            var that = this;
            return new HorizontalAxis_1.default({
                get scale() { return that.xScale; },
                get labelText() { return that.xAxisSpec.label; },
                get fontSize() { return that.props.fontSize; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "yAxis", {
        get: function () {
            var that = this;
            return new VerticalAxis_1.default({
                get scale() { return that.yScale; },
                get labelText() { return that.yAxisSpec.label; },
                get fontSize() { return that.props.fontSize; }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisBox.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], AxisBox.prototype, "targetYDomain", void 0);
    __decorate([
        mobx_1.observable
    ], AxisBox.prototype, "targetXDomain", void 0);
    __decorate([
        mobx_1.observable
    ], AxisBox.prototype, "prevYDomain", void 0);
    __decorate([
        mobx_1.observable
    ], AxisBox.prototype, "prevXDomain", void 0);
    __decorate([
        mobx_1.observable
    ], AxisBox.prototype, "animProgress", void 0);
    __decorate([
        mobx_1.computed.struct
    ], AxisBox.prototype, "currentYDomain", null);
    __decorate([
        mobx_1.computed.struct
    ], AxisBox.prototype, "currentXDomain", null);
    __decorate([
        mobx_1.action.bound
    ], AxisBox.prototype, "setupAnimation", null);
    __decorate([
        mobx_1.action.bound
    ], AxisBox.prototype, "frame", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "yAxisSpec", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "xAxisSpec", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "xAxisHeight", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "yAxisWidth", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "innerBounds", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "xScale", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "yScale", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "yAxis", null);
    __decorate([
        mobx_1.computed
    ], AxisBox.prototype, "bounds", null);
    return AxisBox;
}());
exports.default = AxisBox;
var AxisGridLines = /** @class */ (function (_super) {
    __extends(AxisGridLines, _super);
    function AxisGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisGridLines.prototype.render = function () {
        var _a = this.props, orient = _a.orient, bounds = _a.bounds;
        var scale = this.props.scale.extend({ range: orient === 'left' ? bounds.yRange() : bounds.xRange() });
        return React.createElement("g", { className: "AxisGridLines" }, scale.getTickValues().map(function (v) {
            if (orient === 'left')
                return React.createElement("line", { x1: bounds.left.toFixed(2), y1: scale.place(v), x2: bounds.right.toFixed(2), y2: scale.place(v), stroke: v === 0 ? "#ccc" : "#ddd", "stroke-dasharray": v !== 0 && "3,2" });
            else
                return React.createElement("line", { x1: scale.place(v), y1: bounds.bottom.toFixed(2), x2: scale.place(v), y2: bounds.top.toFixed(2), stroke: v === 0 ? "#ccc" : "#ddd", "stroke-dasharray": v !== 0 && "3,2" });
        }));
    };
    AxisGridLines = __decorate([
        mobx_react_1.observer
    ], AxisGridLines);
    return AxisGridLines;
}(React.Component));
exports.AxisGridLines = AxisGridLines;
var AxisBoxView = /** @class */ (function (_super) {
    __extends(AxisBoxView, _super);
    function AxisBoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisBoxView.prototype.componentDidMount = function () {
        requestAnimationFrame(this.props.axisBox.setupAnimation);
    };
    AxisBoxView.prototype.render = function () {
        var _a = this.props, axisBox = _a.axisBox, onYScaleChange = _a.onYScaleChange, onXScaleChange = _a.onXScaleChange;
        var bounds = axisBox.bounds, xScale = axisBox.xScale, yScale = axisBox.yScale, xAxis = axisBox.xAxis, yAxis = axisBox.yAxis, innerBounds = axisBox.innerBounds;
        return React.createElement("g", { className: "AxisBoxView" },
            React.createElement(HorizontalAxis_1.HorizontalAxisView, { bounds: bounds, axis: xAxis, onScaleTypeChange: onXScaleChange }),
            React.createElement(VerticalAxis_1.VerticalAxisView, { bounds: bounds, axis: yAxis, onScaleTypeChange: onYScaleChange }),
            React.createElement(AxisGridLines, { orient: "left", scale: yScale, bounds: innerBounds }),
            React.createElement(AxisGridLines, { orient: "bottom", scale: xScale, bounds: innerBounds }));
    };
    AxisBoxView = __decorate([
        mobx_react_1.observer
    ], AxisBoxView);
    return AxisBoxView;
}(React.Component));
exports.AxisBoxView = AxisBoxView;
//# sourceMappingURL=AxisBox.js.map