"use strict";
/* LabelledSlopes.jsx
 * ================
 *
 * Decoupled view component that does the bulk rendering work for slope charts.
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var d3_scale_1 = require("d3-scale");
var d3_array_1 = require("d3-array");
var d3_selection_1 = require("d3-selection");
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Bounds_1 = require("./Bounds");
var Text_1 = require("./Text");
var TextWrap_1 = require("./TextWrap");
var NoData_1 = require("./NoData");
var ScaleSelector_1 = require("./ScaleSelector");
var Util_2 = require("./Util");
var SlopeChartAxis = /** @class */ (function (_super) {
    __extends(SlopeChartAxis, _super);
    function SlopeChartAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlopeChartAxis_1 = SlopeChartAxis;
    SlopeChartAxis.calculateBounds = function (containerBounds, props) {
        var scale = props.scale;
        var longestTick = Util_1.first(Util_1.sortBy(scale.ticks(6).map(props.tickFormat), function (tick) { return -tick.length; }));
        var axisWidth = Bounds_1.default.forText(longestTick).width;
        return new Bounds_1.default(containerBounds.x, containerBounds.y, axisWidth, containerBounds.height);
    };
    SlopeChartAxis.getTicks = function (scale, scaleType) {
        if (scaleType === 'log') {
            var minPower10 = Math.ceil(Math.log(scale.domain()[0]) / Math.log(10));
            if (!isFinite(minPower10))
                minPower10 = 0;
            var maxPower10 = Math.floor(Math.log(scale.domain()[1]) / Math.log(10));
            if (maxPower10 <= minPower10)
                maxPower10 += 1;
            var tickValues = [];
            for (var i = minPower10; i <= maxPower10; i++) {
                tickValues.push(Math.pow(10, i));
            }
            return tickValues;
        }
        else {
            return scale.ticks(6);
        }
    };
    Object.defineProperty(SlopeChartAxis.prototype, "ticks", {
        get: function () {
            return SlopeChartAxis_1.getTicks(this.props.scale, this.props.scaleType);
        },
        enumerable: true,
        configurable: true
    });
    SlopeChartAxis.prototype.render = function () {
        var _a = this.props, bounds = _a.bounds, scale = _a.scale, orient = _a.orient, tickFormat = _a.tickFormat;
        var ticks = this.ticks;
        var textColor = '#666';
        return React.createElement("g", { className: "axis", "font-size": "0.8em" }, ticks.map(function (tick) {
            return React.createElement("text", { x: orient === 'left' ? bounds.left : bounds.right, y: scale(tick), fill: textColor, "dominant-baseline": "middle", "text-anchor": orient === 'left' ? 'start' : 'end' }, tickFormat(tick));
        }));
    };
    __decorate([
        mobx_1.computed
    ], SlopeChartAxis.prototype, "ticks", null);
    SlopeChartAxis = SlopeChartAxis_1 = __decorate([
        mobx_react_1.observer
    ], SlopeChartAxis);
    return SlopeChartAxis;
    var SlopeChartAxis_1;
}(React.Component));
var Slope = /** @class */ (function (_super) {
    __extends(Slope, _super);
    function Slope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Slope.prototype.render = function () {
        var _this = this;
        var _a = this.props, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, color = _a.color, size = _a.size, hasLeftLabel = _a.hasLeftLabel, hasRightLabel = _a.hasRightLabel, leftValueStr = _a.leftValueStr, rightValueStr = _a.rightValueStr, leftLabel = _a.leftLabel, rightLabel = _a.rightLabel, labelFontSize = _a.labelFontSize, leftLabelBounds = _a.leftLabelBounds, rightLabelBounds = _a.rightLabelBounds, isFocused = _a.isFocused;
        var lineColor = color; //'#89C9CF'
        var labelColor = '#333';
        var opacity = isFocused ? 1 : 0.5;
        var leftValueLabelBounds = Bounds_1.default.forText(leftValueStr, { fontSize: labelFontSize });
        var rightValueLabelBounds = Bounds_1.default.forText(rightValueStr, { fontSize: labelFontSize });
        return React.createElement("g", { className: "slope" },
            hasLeftLabel && leftLabel.render(leftLabelBounds.x + leftLabelBounds.width, leftLabelBounds.y, { textAnchor: 'end', fill: labelColor, fontWeight: isFocused ? 'bold' : undefined }),
            hasLeftLabel && React.createElement(Text_1.default, { x: x1 - 8, y: y1 - leftValueLabelBounds.height / 2, "text-anchor": "end", fontSize: labelFontSize, fill: labelColor, "font-weight": isFocused && 'bold' }, leftValueStr),
            React.createElement("circle", { cx: x1, cy: y1, r: isFocused ? 4 : 2, fill: lineColor, opacity: opacity }),
            React.createElement("line", { ref: function (el) { return _this.line = el; }, x1: x1, y1: y1, x2: x2, y2: y2, stroke: lineColor, "stroke-width": isFocused ? 2 * size : size, opacity: opacity }),
            React.createElement("circle", { cx: x2, cy: y2, r: isFocused ? 4 : 2, fill: lineColor, opacity: opacity }),
            hasRightLabel && React.createElement(Text_1.default, { x: x2 + 8, y: y2 - rightValueLabelBounds.height / 2, "dominant-baseline": "middle", fontSize: labelFontSize, fill: labelColor, "font-weight": isFocused && 'bold' }, rightValueStr),
            hasRightLabel && rightLabel.render(rightLabelBounds.x, rightLabelBounds.y, { fill: 'labelColor', fontWeight: isFocused ? 'bold' : undefined }));
    };
    Slope = __decorate([
        mobx_react_1.observer
    ], Slope);
    return Slope;
}(React.Component));
var LabelledSlopes = /** @class */ (function (_super) {
    __extends(LabelledSlopes, _super);
    function LabelledSlopes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LabelledSlopes.prototype, "data", {
        get: function () {
            return this.props.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "yTickFormat", {
        get: function () {
            return this.props.yTickFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "isPortrait", {
        get: function () {
            return this.bounds.width < 400;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "allValues", {
        get: function () {
            var values = [];
            this.props.data.forEach(function (g) { return values.push.apply(values, g.values); });
            return values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "xDomainDefault", {
        get: function () {
            return Util_2.domainExtent(this.allValues.map(function (v) { return v.x; }), 'linear');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "yDomainDefault", {
        get: function () {
            return Util_2.domainExtent(this.allValues.map(function (v) { return v.y; }), this.props.yScaleType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "xDomain", {
        get: function () {
            return this.xDomainDefault;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "yDomain", {
        get: function () {
            return [
                this.props.yDomain[0] === undefined ? this.yDomainDefault[0] : this.props.yDomain[0],
                this.props.yDomain[1] === undefined ? this.yDomainDefault[1] : this.props.yDomain[1]
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "sizeScale", {
        get: function () {
            return d3_scale_1.scaleLinear().domain(d3_array_1.extent(this.props.data.map(function (d) { return d.size; }))).range([1, 4]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "yScaleConstructor", {
        get: function () {
            return this.props.yScaleType === 'log' ? d3_scale_1.scaleLog : d3_scale_1.scaleLinear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "yScale", {
        get: function () {
            return this.yScaleConstructor().domain(this.yDomain).range(this.props.bounds.padBottom(50).yRange());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "xScale", {
        get: function () {
            var _a = this, bounds = _a.bounds, isPortrait = _a.isPortrait, xDomain = _a.xDomain, yScale = _a.yScale;
            var padding = isPortrait ? 0 : SlopeChartAxis.calculateBounds(bounds, { orient: 'left', scale: yScale, tickFormat: this.props.yTickFormat }).width;
            return d3_scale_1.scaleLinear().domain(xDomain).range(bounds.padWidth(padding).xRange());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "colorScale", {
        get: function () {
            var colorScheme = [
                "#5675c1",
                "#aec7e8",
                "#d14e5b",
                "#ffd336",
                "#4d824b",
                "#a652ba",
                "#69c487",
                "#ff7f0e", "#1f77b4", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "c49c94", "e377c2", "f7b6d2", "7f7f7f", "c7c7c7", "bcbd22", "dbdb8d", "17becf", "9edae5", "1f77b4"
            ];
            return d3_scale_1.scaleOrdinal(colorScheme).domain(Util_1.uniq(this.props.data.map(function (d) { return d.color; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "maxLabelWidth", {
        get: function () {
            return this.bounds.width / 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "initialSlopeData", {
        get: function () {
            var _this = this;
            var _a = this, data = _a.data, isPortrait = _a.isPortrait, xScale = _a.xScale, yScale = _a.yScale, sizeScale = _a.sizeScale, yTickFormat = _a.yTickFormat, maxLabelWidth = _a.maxLabelWidth;
            var slopeData = [];
            var yDomain = yScale.domain();
            data.forEach(function (series) {
                // Ensure values fit inside the chart
                if (!Util_1.every(series.values, function (d) { return d.y >= yDomain[0] && d.y <= yDomain[1]; }))
                    return;
                var _a = series.values, v1 = _a[0], v2 = _a[1];
                var _b = [xScale(v1.x), xScale(v2.x)], x1 = _b[0], x2 = _b[1];
                var _c = [yScale(v1.y), yScale(v2.y)], y1 = _c[0], y2 = _c[1];
                var fontSize = (isPortrait ? 0.6 : 0.65) * _this.props.fontSize;
                var leftValueStr = yTickFormat(v1.y);
                var rightValueStr = yTickFormat(v2.y);
                var leftValueWidth = Bounds_1.default.forText(leftValueStr, { fontSize: fontSize }).width;
                var rightValueWidth = Bounds_1.default.forText(rightValueStr, { fontSize: fontSize }).width;
                var leftLabel = new TextWrap_1.default({ maxWidth: maxLabelWidth, fontSize: fontSize, text: series.label });
                var rightLabel = new TextWrap_1.default({ maxWidth: maxLabelWidth, fontSize: fontSize, text: series.label });
                slopeData.push({
                    x1: x1, y1: y1, x2: x2, y2: y2, color: series.color,
                    size: sizeScale(series.size) || 1,
                    leftValueStr: leftValueStr, rightValueStr: rightValueStr,
                    leftValueWidth: leftValueWidth, rightValueWidth: rightValueWidth,
                    leftLabel: leftLabel, rightLabel: rightLabel,
                    labelFontSize: fontSize, key: series.key, isFocused: false,
                    hasLeftLabel: true, hasRightLabel: true
                });
            });
            return slopeData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "maxValueWidth", {
        get: function () {
            return Util_1.max(this.initialSlopeData.map(function (s) { return s.leftValueWidth; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "labelAccountedSlopeData", {
        get: function () {
            var _a = this, maxLabelWidth = _a.maxLabelWidth, maxValueWidth = _a.maxValueWidth;
            return this.initialSlopeData.map(function (slope) {
                // Squish slopes to make room for labels
                var x1 = slope.x1 + maxLabelWidth + maxValueWidth + 8;
                var x2 = slope.x2 - maxLabelWidth - maxValueWidth - 8;
                // Position the labels
                var leftLabelBounds = new Bounds_1.default(x1 - slope.leftValueWidth - 12 - slope.leftLabel.width, slope.y1 - slope.leftLabel.height / 2, slope.leftLabel.width, slope.leftLabel.height);
                var rightLabelBounds = new Bounds_1.default(x2 + slope.rightValueWidth + 12, slope.y2 - slope.rightLabel.height / 2, slope.rightLabel.width, slope.rightLabel.height);
                return Util_1.extend({}, slope, {
                    x1: x1,
                    x2: x2,
                    leftLabelBounds: leftLabelBounds,
                    rightLabelBounds: rightLabelBounds
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabelledSlopes.prototype, "slopeData", {
        // Get the final slope data with hover focusing and collision detection
        get: function () {
            var focusKey = this.focusKey;
            var slopeData = this.labelAccountedSlopeData;
            slopeData = slopeData.map(function (slope) {
                return Util_1.extend({}, slope, {
                    isFocused: slope.key === focusKey,
                });
            });
            // How to work out which of two slopes to prioritize for labelling conflicts
            function chooseLabel(s1, s2) {
                if (s1.isFocused && !s2.isFocused)
                    return s1;
                else if (!s1.isFocused && s2.isFocused)
                    return s2;
                else if (s1.hasLeftLabel && !s2.hasLeftLabel)
                    return s1;
                else if (!s1.hasLeftLabel && s2.hasLeftLabel)
                    return s2;
                else if (s1.size > s2.size)
                    return s1;
                else if (s2.size > s1.size)
                    return s2;
                else
                    return s1; // Equal priority, just do the first one
            }
            // Eliminate overlapping labels, one pass for each side
            slopeData.forEach(function (s1) {
                slopeData.forEach(function (s2) {
                    if (s1 !== s2 && s1.hasLeftLabel && s2.hasLeftLabel && s1.leftLabelBounds.intersects(s2.leftLabelBounds)) {
                        if (chooseLabel(s1, s2) === s1)
                            s2.hasLeftLabel = false;
                        else
                            s1.hasLeftLabel = false;
                    }
                });
            });
            slopeData.forEach(function (s1) {
                slopeData.forEach(function (s2) {
                    if (s1 !== s2 && s1.hasRightLabel && s2.hasRightLabel && s1.rightLabelBounds.intersects(s2.rightLabelBounds)) {
                        if (chooseLabel(s1, s2) === s1)
                            s2.hasRightLabel = false;
                        else
                            s1.hasRightLabel = false;
                    }
                });
            });
            // Order by focus and size for draw order
            slopeData = Util_1.sortBy(slopeData, function (slope) { return slope.size; });
            slopeData = Util_1.sortBy(slopeData, function (slope) { return slope.isFocused ? 1 : 0; });
            return slopeData;
        },
        enumerable: true,
        configurable: true
    });
    LabelledSlopes.prototype.onMouseMove = function (ev) {
        var _this = this;
        var mouse = Util_2.getRelativeMouse(this.base, ev);
        requestAnimationFrame(function () {
            if (!_this.props.bounds.contains(mouse))
                _this.focusKey = undefined;
            else {
                var slope = Util_1.sortBy(_this.slopeData, function (s) {
                    var distToLine = Math.abs((s.y2 - s.y1) * mouse.x - (s.x2 - s.x1) * mouse.y + s.x2 * s.y1 - s.y2 * s.x1) / Math.sqrt(Math.pow((s.y2 - s.y1), 2) + Math.pow((s.x2 - s.x1), 2));
                    return distToLine;
                })[0];
                _this.focusKey = slope.key;
            }
        });
    };
    LabelledSlopes.prototype.componentDidMount = function () {
        // Nice little intro animation
        d3_selection_1.select(this.base).select(".slopes").attr('stroke-dasharray', "100%").attr('stroke-dashoffset', "100%").transition().attr('stroke-dashoffset', "0%");
    };
    LabelledSlopes.prototype.render = function () {
        var _a = this.props, yTickFormat = _a.yTickFormat, yScaleType = _a.yScaleType, yScaleTypeOptions = _a.yScaleTypeOptions, onScaleTypeChange = _a.onScaleTypeChange, fontSize = _a.fontSize;
        var _b = this, bounds = _b.bounds, slopeData = _b.slopeData, isPortrait = _b.isPortrait, xDomain = _b.xDomain, yScale = _b.yScale;
        if (Util_1.isEmpty(slopeData))
            return React.createElement(NoData_1.default, { bounds: bounds });
        var _c = slopeData[0], x1 = _c.x1, x2 = _c.x2;
        var _d = yScale.range(), y1 = _d[0], y2 = _d[1];
        var onMouseMove = Util_1.throttle(this.onMouseMove, 100);
        return React.createElement("g", { className: "LabelledSlopes", onMouseMove: onMouseMove, onTouchMove: onMouseMove, onTouchStart: onMouseMove, onMouseLeave: onMouseMove },
            React.createElement("rect", { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height, fill: "rgba(0,0,0,0)", opacity: 0 }),
            React.createElement("g", { className: "gridlines" }, SlopeChartAxis.getTicks(yScale, yScaleType).map(function (tick) {
                return React.createElement("line", { x1: x1, y1: yScale(tick), x2: x2, y2: yScale(tick), stroke: "#eee", "stroke-dasharray": "3,2" });
            })),
            !isPortrait && React.createElement(SlopeChartAxis, { orient: "left", tickFormat: yTickFormat, scale: yScale, scaleType: yScaleType, bounds: bounds }),
            !isPortrait && React.createElement(SlopeChartAxis, { orient: "right", tickFormat: yTickFormat, scale: yScale, scaleType: yScaleType, bounds: bounds }),
            React.createElement("line", { x1: x1, y1: y1, x2: x1, y2: y2, stroke: "#333" }),
            React.createElement("line", { x1: x2, y1: y1, x2: x2, y2: y2, stroke: "#333" }),
            yScaleTypeOptions.length > 1 && React.createElement(ScaleSelector_1.default, { x: x1 + 5, y: y2 - 8, scaleType: yScaleType, scaleTypeOptions: yScaleTypeOptions, onChange: onScaleTypeChange }),
            React.createElement(Text_1.default, { x: x1, y: y1 + 10, textAnchor: "middle", fill: "#666", fontSize: fontSize }, xDomain[0].toString()),
            React.createElement(Text_1.default, { x: x2, y: y1 + 10, textAnchor: "middle", fill: "#666", fontSize: fontSize }, xDomain[1].toString()),
            React.createElement("g", { className: "slopes" }, slopeData.map(function (slope) {
                return React.createElement(Slope, __assign({ key: slope.key }, slope));
            })));
    };
    __decorate([
        mobx_1.observable
    ], LabelledSlopes.prototype, "focusKey", void 0);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "data", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "yTickFormat", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "isPortrait", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "allValues", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "xDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "yDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "xDomain", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "yDomain", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "sizeScale", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "yScaleConstructor", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "yScale", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "xScale", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "colorScale", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "maxLabelWidth", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "initialSlopeData", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "maxValueWidth", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "labelAccountedSlopeData", null);
    __decorate([
        mobx_1.computed
    ], LabelledSlopes.prototype, "slopeData", null);
    __decorate([
        mobx_1.action.bound
    ], LabelledSlopes.prototype, "onMouseMove", null);
    LabelledSlopes = __decorate([
        mobx_react_1.observer
    ], LabelledSlopes);
    return LabelledSlopes;
}(React.Component));
exports.default = LabelledSlopes;
//# sourceMappingURL=LabelledSlopes.js.map