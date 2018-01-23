"use strict";
/* PointsWithLabels.tsx
 * ================
 *
 * Core scatterplot renderer
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-03-09
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
var d3_scale_1 = require("d3-scale");
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Bounds_1 = require("./Bounds");
var NoData_1 = require("./NoData");
var Util_2 = require("./Util");
var Vector2_1 = require("./Vector2");
var Marks_1 = require("./Marks");
var d3_selection_1 = require("d3-selection");
var PointsWithLabels = /** @class */ (function (_super) {
    __extends(PointsWithLabels, _super);
    function PointsWithLabels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverKey = null;
        return _this;
    }
    Object.defineProperty(PointsWithLabels.prototype, "data", {
        get: function () {
            return this.props.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "isConnected", {
        get: function () {
            return Util_1.some(this.data, function (g) { return g.values.length > 1; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "focusKeys", {
        get: function () {
            return Util_2.intersection(this.props.focusKeys || [], this.data.map(function (g) { return g.key; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "hoverKeys", {
        get: function () {
            return this.props.hoverKeys.concat(this.hoverKey ? [this.hoverKey] : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "isLayerMode", {
        // Layered mode occurs when any entity on the chart is hovered or focused
        // Then, a special "foreground" set of entities is rendered over the background
        get: function () {
            return this.focusKeys.length > 0 || this.hoverKeys.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "xScale", {
        get: function () {
            return this.props.xScale.extend({ range: this.bounds.xRange() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "yScale", {
        get: function () {
            return this.props.yScale.extend({ range: this.bounds.yRange() });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "isSubtleForeground", {
        // When focusing multiple entities, we hide some information to declutter
        get: function () {
            return this.focusKeys.length > 1 && Util_1.some(this.props.data, function (series) { return series.values.length > 2; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "sizeScale", {
        get: function () {
            var sizeScale = d3_scale_1.scaleLinear().range([10, 1000]).domain(this.props.sizeDomain);
            return sizeScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "fontScale", {
        get: function () {
            return d3_scale_1.scaleLinear().range([10, 13]).domain(this.sizeScale.domain());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "labelFontFamily", {
        get: function () {
            return "Arial Narrow, Arial, sans-serif";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "defaultColorScale", {
        // Used if no color is specified for a series
        get: function () {
            return d3_scale_1.scaleOrdinal(d3_scale_1.schemeCategory20);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "initialRenderData", {
        // Pre-transform data for rendering
        get: function () {
            var _a = this, data = _a.data, xScale = _a.xScale, yScale = _a.yScale, defaultColorScale = _a.defaultColorScale, sizeScale = _a.sizeScale, fontScale = _a.fontScale;
            return Util_1.sortBy(data.map(function (d) {
                var values = Util_1.map(d.values, function (v) {
                    var area = sizeScale(v.size || 1);
                    return {
                        position: new Vector2_1.default(Math.floor(xScale.place(v.x)), Math.floor(yScale.place(v.y))),
                        size: Math.sqrt(area / Math.PI),
                        fontSize: fontScale(d.size || 1),
                        time: v.time
                    };
                });
                return {
                    key: d.key,
                    displayKey: "key-" + Util_2.makeSafeForCSS(d.key),
                    color: d.color || defaultColorScale(d.key),
                    size: Util_1.last(values).size,
                    values: values,
                    text: d.label,
                    midLabels: [],
                    allLabels: [],
                    offsetVector: Vector2_1.default.zero
                };
            }), function (d) { return d.size; });
        },
        enumerable: true,
        configurable: true
    });
    PointsWithLabels.prototype.labelPriority = function (l) {
        var priority = l.fontSize;
        if (l.series.isHover)
            priority += 10000;
        if (l.series.isFocus)
            priority += 1000;
        if (l.isEnd)
            priority += 100;
        return priority;
    };
    // Create the start year label for a series
    PointsWithLabels.prototype.makeStartLabel = function (series) {
        // No room to label the year if it's a single point
        if (!series.isForeground || series.values.length <= 1)
            return undefined;
        var labelFontFamily = this.labelFontFamily;
        var fontSize = series.isForeground ? (this.isSubtleForeground ? 8 : 9) : 7;
        var firstValue = series.values[0];
        var nextValue = series.values[1];
        var nextSegment = nextValue.position.subtract(firstValue.position);
        var pos = firstValue.position.subtract(nextSegment.normalize().times(5));
        var bounds = Bounds_1.default.forText(firstValue.time.y.toString(), { x: pos.x, y: pos.y, fontSize: fontSize, fontFamily: labelFontFamily });
        if (pos.x < firstValue.position.x)
            bounds = new Bounds_1.default(bounds.x - bounds.width + 2, bounds.y, bounds.width, bounds.height);
        if (pos.y > firstValue.position.y)
            bounds = new Bounds_1.default(bounds.x, bounds.y + bounds.height / 2, bounds.width, bounds.height);
        return {
            text: firstValue.time.y.toString(),
            fontSize: fontSize,
            pos: firstValue.position,
            bounds: bounds,
            series: series,
            isStart: true
        };
    };
    // Make labels for the points between start and end on a series
    // Positioned using normals of the line segments
    PointsWithLabels.prototype.makeMidLabels = function (series) {
        if (!series.isForeground || series.values.length <= 1 || (!series.isHover && this.isSubtleForeground))
            return [];
        var fontSize = series.isForeground ? (this.isSubtleForeground ? 8 : 9) : 7;
        var labelFontFamily = this.labelFontFamily;
        return Util_1.map(series.values.slice(1, -1), function (v, i) {
            var prevPos = i > 0 && series.values[i - 1].position;
            var prevSegment = prevPos && v.position.subtract(prevPos);
            var nextPos = series.values[i + 1].position;
            var nextSegment = nextPos.subtract(v.position);
            var pos = v.position;
            if (prevPos && prevSegment) {
                var normals = prevSegment.add(nextSegment).normalize().normals().map(function (x) { return x.times(5); });
                var potentialSpots = Util_1.map(normals, function (n) { return v.position.add(n); });
                pos = Util_1.sortBy(potentialSpots, function (p) {
                    return -(Vector2_1.default.distance(p, prevPos) + Vector2_1.default.distance(p, nextPos));
                })[0];
            }
            else {
                pos = v.position.subtract(nextSegment.normalize().times(5));
            }
            var bounds = Bounds_1.default.forText(v.time.y.toString(), { x: pos.x, y: pos.y, fontSize: fontSize, fontFamily: labelFontFamily });
            if (pos.x < v.position.x)
                bounds = new Bounds_1.default(bounds.x - bounds.width + 2, bounds.y, bounds.width, bounds.height);
            if (pos.y > v.position.y)
                bounds = new Bounds_1.default(bounds.x, bounds.y + bounds.height / 2, bounds.width, bounds.height);
            return {
                text: v.time.y.toString(),
                fontSize: fontSize,
                pos: v.position,
                bounds: bounds,
                series: series,
                isMid: true
            };
        });
    };
    // Make the end label (entity label) for a series. Will be pushed
    // slightly out based on the direction of the series if multiple values
    // are present
    PointsWithLabels.prototype.makeEndLabel = function (series) {
        var _a = this, isSubtleForeground = _a.isSubtleForeground, labelFontFamily = _a.labelFontFamily;
        var lastValue = Util_1.last(series.values);
        var lastPos = lastValue.position;
        var fontSize = lastValue.fontSize * (series.isForeground ? (isSubtleForeground ? 1.2 : 1.3) : 1.1);
        var offsetVector = Vector2_1.default.up;
        if (series.values.length > 1) {
            var prevValue = series.values[series.values.length - 2];
            var prevPos = prevValue.position;
            offsetVector = lastPos.subtract(prevPos);
        }
        series.offsetVector = offsetVector;
        var labelPos = lastPos.add(offsetVector.normalize().times(series.values.length === 1 ? lastValue.size + 1 : 5));
        var labelBounds = Bounds_1.default.forText(series.text, { x: labelPos.x, y: labelPos.y, fontSize: fontSize, fontFamily: labelFontFamily });
        if (labelPos.x < lastPos.x)
            labelBounds = labelBounds.extend({ x: labelBounds.x - labelBounds.width });
        if (labelPos.y > lastPos.y)
            labelBounds = labelBounds.extend({ y: labelBounds.y + labelBounds.height / 2 });
        return {
            text: series.text,
            fontSize: fontSize,
            bounds: labelBounds,
            series: series,
            pos: labelPos,
            isEnd: true
        };
    };
    Object.defineProperty(PointsWithLabels.prototype, "renderData", {
        get: function () {
            var _this = this;
            var _a = this, initialRenderData = _a.initialRenderData, hoverKeys = _a.hoverKeys, focusKeys = _a.focusKeys, labelPriority = _a.labelPriority, bounds = _a.bounds;
            // Draw the largest points first so that smaller ones can sit on top of them
            var renderData = Util_1.cloneDeep(Util_1.sortBy(initialRenderData, function (d) { return -d.size; }));
            Util_1.each(renderData, function (series) {
                series.isHover = Util_1.includes(hoverKeys, series.key);
                series.isFocus = Util_1.includes(focusKeys, series.key);
                series.isForeground = series.isHover || series.isFocus;
                if (series.isHover)
                    series.size += 1;
            });
            Util_1.each(renderData, function (series) {
                series.startLabel = _this.makeStartLabel(series);
                series.midLabels = _this.makeMidLabels(series);
                series.endLabel = _this.makeEndLabel(series);
                series.allLabels = Util_1.filter([series.startLabel].concat(series.midLabels).concat([series.endLabel]));
            });
            var allLabels = Util_1.flatten(Util_1.map(renderData, function (series) { return series.allLabels; }));
            // Ensure labels fit inside bounds
            // Must do before collision detection since it'll change the positions
            Util_1.each(allLabels, function (l) {
                if (l.bounds.left < bounds.left - 1) {
                    l.bounds = l.bounds.extend({ x: l.bounds.x + l.bounds.width });
                }
                else if (l.bounds.right > bounds.right + 1) {
                    l.bounds = l.bounds.extend({ x: l.bounds.x - l.bounds.width });
                }
                if (l.bounds.top < bounds.top - 1) {
                    l.bounds = l.bounds.extend({ y: bounds.top });
                }
                else if (l.bounds.bottom > bounds.bottom + 1) {
                    l.bounds = l.bounds.extend({ y: bounds.bottom - l.bounds.height });
                }
            });
            // Main collision detection
            var labelsByPriority = Util_1.sortBy(allLabels, function (l) { return -labelPriority(l); });
            for (var i = 0; i < labelsByPriority.length; i++) {
                var l1 = labelsByPriority[i];
                if (l1.isHidden)
                    continue;
                for (var j = i + 1; j < labelsByPriority.length; j++) {
                    var l2 = labelsByPriority[j];
                    if (l2.isHidden)
                        continue;
                    if (l1.bounds.intersects(l2.bounds)) {
                        l2.isHidden = true;
                    }
                }
            }
            return renderData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "allColors", {
        get: function () {
            return Util_1.uniq(Util_1.map(this.renderData, 'color'));
        },
        enumerable: true,
        configurable: true
    });
    PointsWithLabels.prototype.onMouseLeave = function () {
        if (this.mouseFrame !== undefined)
            cancelAnimationFrame(this.mouseFrame);
        this.hoverKey = null;
        if (this.props.onMouseLeave)
            this.props.onMouseLeave();
    };
    PointsWithLabels.prototype.onMouseMove = function (ev) {
        var _this = this;
        if (this.mouseFrame !== undefined)
            cancelAnimationFrame(this.mouseFrame);
        this.mouseFrame = requestAnimationFrame(function () {
            var mouse = Util_2.getRelativeMouse(_this.base, ev);
            var closestSeries = Util_1.sortBy(_this.renderData, function (series) {
                /*if (some(series.allLabels, l => !l.isHidden && l.bounds.contains(mouse)))
                    return -Infinity*/
                if (series.values.length > 1) {
                    return Util_1.min(Util_1.map(series.values.slice(0, -1), function (d, i) {
                        return Vector2_1.default.distanceFromPointToLineSq(mouse, d.position, series.values[i + 1].position);
                    }));
                }
                else {
                    return Util_1.min(Util_1.map(series.values, function (v) { return Vector2_1.default.distanceSq(v.position, mouse); }));
                }
            })[0];
            if (closestSeries)
                _this.hoverKey = closestSeries.key;
            else
                _this.hoverKey = null;
            if (_this.props.onMouseOver) {
                var datum = Util_1.find(_this.data, function (d) { return d.key === _this.hoverKey; });
                if (datum)
                    _this.props.onMouseOver(datum);
            }
        });
    };
    PointsWithLabels.prototype.onClick = function () {
        if (this.hoverKey)
            this.props.onSelectEntity(this.hoverKey);
    };
    Object.defineProperty(PointsWithLabels.prototype, "backgroundGroups", {
        get: function () {
            return Util_1.filter(this.renderData, function (group) { return !group.isForeground; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointsWithLabels.prototype, "foregroundGroups", {
        get: function () {
            return Util_1.filter(this.renderData, function (group) { return !!group.isForeground; });
        },
        enumerable: true,
        configurable: true
    });
    PointsWithLabels.prototype.renderBackgroundLines = function () {
        var _a = this, backgroundGroups = _a.backgroundGroups, isLayerMode = _a.isLayerMode, isConnected = _a.isConnected;
        return Util_1.map(backgroundGroups, function (series) {
            var firstValue = Util_1.first(series.values);
            var color = !isLayerMode ? series.color : "#e2e2e2";
            if (series.values.length === 1) {
                var size = isConnected ? 1 + firstValue.size / 16 : firstValue.size;
                return React.createElement("circle", { key: series.displayKey + '-end', cx: firstValue.position.x, cy: firstValue.position.y, r: size, fill: color, opacity: 0.8 });
            }
            else {
                var lastValue = Util_1.last(series.values);
                var rotation = Vector2_1.default.angle(series.offsetVector, Vector2_1.default.up);
                if (series.offsetVector.x < 0)
                    rotation = -rotation;
                return React.createElement("g", { key: series.displayKey, className: series.displayKey },
                    React.createElement("circle", { cx: firstValue.position.x, cy: firstValue.position.y, r: 1 + firstValue.size / 16, fill: !isLayerMode ? series.color : "#e2e2e2", stroke: "#ccc", opacity: 0.6 }),
                    React.createElement("polyline", { strokeLinecap: "round", stroke: isLayerMode ? "#ccc" : series.color, points: Util_1.map(series.values, function (v) { return v.position.x + "," + v.position.y; }).join(' '), fill: "none", strokeWidth: 0.3 + (series.size / 16), opacity: 0.6 }),
                    React.createElement(Marks_1.Triangle, { transform: "rotate(" + rotation + ", " + lastValue.position.x + ", " + lastValue.position.y + ")", cx: lastValue.position.x, cy: lastValue.position.y, r: 1 + lastValue.size / 16, fill: color, stroke: "#ccc", strokeWidth: 0.2, opacity: 0.6 }));
            }
        });
    };
    PointsWithLabels.prototype.renderBackgroundLabels = function () {
        var _a = this, backgroundGroups = _a.backgroundGroups, isLayerMode = _a.isLayerMode, labelFontFamily = _a.labelFontFamily;
        return Util_1.map(backgroundGroups, function (series) {
            return Util_1.map(series.allLabels, function (l) {
                return !l.isHidden && React.createElement("text", { key: series.displayKey + '-endLabel', x: l.bounds.x, y: l.bounds.y + l.bounds.height, fontSize: l.fontSize, fontFamily: labelFontFamily, fill: !isLayerMode ? "#666" : "#aaa" }, l.text);
            });
        });
    };
    Object.defineProperty(PointsWithLabels.prototype, "renderUid", {
        get: function () {
            return Util_1.guid();
        },
        enumerable: true,
        configurable: true
    });
    PointsWithLabels.prototype.renderForegroundLines = function () {
        var _a = this, foregroundGroups = _a.foregroundGroups, isSubtleForeground = _a.isSubtleForeground, renderUid = _a.renderUid;
        return Util_1.map(foregroundGroups, function (series) {
            var lastValue = Util_1.last(series.values);
            var strokeWidth = (series.isHover ? 3 : (isSubtleForeground ? 0.8 : 2)) + lastValue.size * 0.05;
            if (series.values.length === 1) {
                var v = series.values[0];
                if (series.isFocus) {
                    return React.createElement("g", { key: series.displayKey },
                        React.createElement("circle", { cx: v.position.x, cy: v.position.y, fill: "none", stroke: series.color, r: series.size + 2 }),
                        React.createElement("circle", { cx: v.position.x, cy: v.position.y, fill: series.color, r: series.size }));
                }
                else {
                    return React.createElement("circle", { key: series.displayKey, cx: v.position.x, cy: v.position.y, fill: series.color, r: series.size });
                }
            }
            else {
                var firstValue = series.values[0];
                return React.createElement("g", { key: series.displayKey, className: series.displayKey },
                    React.createElement("defs", null,
                        React.createElement("marker", { id: series.displayKey + "-arrow-" + renderUid, fill: series.color, viewBox: "0 -5 10 10", refX: 5, refY: 0, markerWidth: 4, markerHeight: 4, orient: "auto" },
                            React.createElement("path", { d: "M0,-5L10,0L0,5" })),
                        React.createElement("marker", { id: series.displayKey + "-circle-" + renderUid, viewBox: "0 0 12 12", refX: 4, refY: 4, orient: "auto", fill: series.color },
                            React.createElement("circle", { cx: 4, cy: 4, r: 4 }))),
                    series.isFocus && React.createElement("circle", { cx: firstValue.position.x, cy: firstValue.position.y, r: strokeWidth + 1, fill: "none", stroke: series.color, opacity: 0.6 }),
                    React.createElement("polyline", { strokeLinecap: "round", stroke: series.color, points: Util_1.map(series.values, function (v) { return v.position.x + "," + v.position.y; }).join(' '), fill: "none", strokeWidth: strokeWidth, opacity: isSubtleForeground ? 0.6 : 1, markerStart: "url(#" + series.displayKey + "-circle-" + renderUid + ")", markerMid: "url(#" + series.displayKey + "-circle-" + renderUid + ")", markerEnd: "url(#" + series.displayKey + "-arrow-" + renderUid + ")" }));
            }
        });
    };
    PointsWithLabels.prototype.renderForegroundLabels = function () {
        var _a = this, foregroundGroups = _a.foregroundGroups, labelFontFamily = _a.labelFontFamily;
        return Util_1.map(foregroundGroups, function (series) {
            return Util_1.map(series.allLabels, function (l, i) {
                return !l.isHidden && React.createElement("text", { key: series.displayKey + "-label-" + i, x: l.bounds.x, y: l.bounds.y + l.bounds.height, fontSize: l.fontSize, fontFamily: labelFontFamily, fill: "#333" }, l.text);
            });
        });
    };
    PointsWithLabels.prototype.componentDidMount = function () {
        var _this = this;
        var radiuses = [];
        d3_selection_1.select(this.base).selectAll("circle").each(function () {
            var circle = this;
            radiuses.push(circle.getAttribute('r'));
            circle.setAttribute('r', "0");
        }).transition().duration(500).attr('r', function (_, i) { return radiuses[i]; })
            .on("end", function () { return _this.forceUpdate(); });
    };
    PointsWithLabels.prototype.render = function () {
        //Bounds.debug(flatten(map(this.renderData, d => map(d.labels, 'bounds'))))
        var _a = this, bounds = _a.bounds, renderData = _a.renderData, renderUid = _a.renderUid;
        var clipBounds = bounds.pad(-10);
        if (Util_1.isEmpty(renderData))
            return React.createElement(NoData_1.default, { bounds: bounds });
        return React.createElement("g", { className: "PointsWithLabels clickable", clipPath: "url(#scatterBounds-" + renderUid + ")", onMouseMove: this.onMouseMove, onMouseLeave: this.onMouseLeave, onClick: this.onClick },
            React.createElement("rect", { key: "background", x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height, fill: "rgba(255,255,255,0)" }),
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "scatterBounds-" + renderUid },
                    React.createElement("rect", { x: clipBounds.x, y: clipBounds.y, width: clipBounds.width, height: clipBounds.height }))),
            this.renderBackgroundLines(),
            this.renderBackgroundLabels(),
            this.renderForegroundLines(),
            this.renderForegroundLabels());
    };
    __decorate([
        mobx_1.observable
    ], PointsWithLabels.prototype, "hoverKey", void 0);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "data", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "isConnected", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "focusKeys", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "hoverKeys", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "isLayerMode", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "xScale", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "yScale", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "isSubtleForeground", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "sizeScale", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "fontScale", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "labelFontFamily", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "defaultColorScale", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "initialRenderData", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "renderData", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "allColors", null);
    __decorate([
        mobx_1.action.bound
    ], PointsWithLabels.prototype, "onMouseLeave", null);
    __decorate([
        mobx_1.action.bound
    ], PointsWithLabels.prototype, "onMouseMove", null);
    __decorate([
        mobx_1.action.bound
    ], PointsWithLabels.prototype, "onClick", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "backgroundGroups", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "foregroundGroups", null);
    __decorate([
        mobx_1.computed
    ], PointsWithLabels.prototype, "renderUid", null);
    PointsWithLabels = __decorate([
        mobx_react_1.observer
    ], PointsWithLabels);
    return PointsWithLabels;
}(React.Component));
exports.default = PointsWithLabels;
//# sourceMappingURL=PointsWithLabels.js.map