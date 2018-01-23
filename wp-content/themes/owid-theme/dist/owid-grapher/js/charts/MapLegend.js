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
var Util_1 = require("./Util");
var Bounds_1 = require("./Bounds");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Util_2 = require("./Util");
var MapData_1 = require("./MapData");
var TextWrap_1 = require("./TextWrap");
var NumericMapLegend = /** @class */ (function () {
    function NumericMapLegend(props) {
        this.props = props;
    }
    Object.defineProperty(NumericMapLegend.prototype, "focusBracket", {
        get: function () { return this.props.focusBracket; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "numericBins", {
        get: function () { return this.props.legendData.filter(function (l) { return l instanceof MapData_1.NumericBin; }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "rectHeight", {
        get: function () { return 10; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "tickFontSize", {
        get: function () { return 0.75 * this.props.fontSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "minValue", {
        // NumericMapLegend wants to map a range to a width. However, sometimes we are given
        // data without a clear min/max. So we must fit these scurrilous bins into the width somehow.
        get: function () { return Util_1.min(this.numericBins.map(function (d) { return d.min; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "maxValue", {
        get: function () { return Util_1.max(this.numericBins.map(function (d) { return d.max; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "rangeSize", {
        get: function () { return this.maxValue - this.minValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "categoryBinWidth", {
        get: function () {
            return Bounds_1.default.forText("No data", { fontSize: this.tickFontSize }).width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "categoryBinMargin", {
        get: function () { return this.rectHeight * 1.5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "totalDefaultWidth", {
        get: function () {
            var _this = this;
            return Util_1.reduce(this.props.legendData.map(function (d) { return d instanceof MapData_1.CategoricalBin ? _this.categoryBinWidth + _this.categoryBinMargin : 0; }), function (m, n) { return m + n; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "availableWidth", {
        get: function () {
            return this.props.width - this.totalDefaultWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "positionedBins", {
        get: function () {
            var _a = this, props = _a.props, rangeSize = _a.rangeSize, categoryBinWidth = _a.categoryBinWidth, categoryBinMargin = _a.categoryBinMargin, availableWidth = _a.availableWidth;
            var xOffset = 0;
            return Util_1.map(props.legendData, function (d) {
                var width = categoryBinWidth, margin = categoryBinMargin;
                if (d instanceof MapData_1.NumericBin) {
                    if (props.equalSizeBins)
                        width = availableWidth / props.legendData.length;
                    else
                        width = ((d.max - d.min) / rangeSize) * availableWidth;
                    margin = 0;
                }
                var x = xOffset;
                xOffset += width + margin;
                return {
                    x: x,
                    width: width,
                    margin: margin,
                    bin: d
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "numericLabels", {
        get: function () {
            var _a = this, rectHeight = _a.rectHeight, positionedBins = _a.positionedBins, tickFontSize = _a.tickFontSize;
            var makeBoundaryLabel = function (d, minOrMax, text) {
                var labelBounds = Bounds_1.default.forText(text, { fontSize: tickFontSize });
                var x = d.x + (minOrMax === 'min' ? 0 : d.width) - labelBounds.width / 2;
                var y = -rectHeight - labelBounds.height - 3;
                return {
                    text: text,
                    fontSize: tickFontSize,
                    bounds: labelBounds.extend({ x: x, y: y }),
                    hidden: false
                };
            };
            var makeRangeLabel = function (d) {
                var labelBounds = Bounds_1.default.forText(d.bin.text, { fontSize: tickFontSize });
                var x = d.x + d.width / 2 - labelBounds.width / 2;
                var y = -rectHeight - labelBounds.height - 3;
                return {
                    text: d.bin.text,
                    fontSize: tickFontSize,
                    bounds: labelBounds.extend({ x: x, y: y }),
                    priority: true,
                    hidden: false
                };
            };
            var labels = [];
            Util_1.each(positionedBins, function (d) {
                if (d.bin.text)
                    labels.push(makeRangeLabel(d));
                else if (d.bin instanceof MapData_1.NumericBin) {
                    labels.push(makeBoundaryLabel(d, 'min', d.bin.minText));
                    if (d === Util_1.last(positionedBins))
                        labels.push(makeBoundaryLabel(d, 'max', d.bin.maxText));
                }
            });
            for (var i = 0; i < labels.length; i++) {
                var l1 = labels[i];
                if (l1.hidden)
                    continue;
                for (var j = i + 1; j < labels.length; j++) {
                    var l2 = labels[j];
                    if (l1.bounds.right + 5 >= l2.bounds.centerX || l2.bounds.left - 5 <= l1.bounds.centerX && !l2.priority)
                        l2.hidden = true;
                }
            }
            labels = labels.filter(function (l) { return !l.hidden; });
            // If labels overlap, first we try alternating raised labels
            var raisedMode = false;
            for (var i = 1; i < labels.length; i++) {
                var l1 = labels[i - 1], l2 = labels[i];
                if (l1.bounds.right + 5 >= l2.bounds.left) {
                    raisedMode = true;
                    break;
                }
            }
            if (raisedMode) {
                for (var i = 1; i < labels.length; i++) {
                    var l = labels[i];
                    if (i % 2 !== 0) {
                        l.bounds = l.bounds.extend({ y: l.bounds.y - l.bounds.height - 1 });
                    }
                }
            }
            return labels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "height", {
        get: function () { return Math.abs(Util_1.min(this.numericLabels.map(function (l) { return l.bounds.y; }))); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegend.prototype, "width", {
        get: function () {
            return this.props.width;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "focusBracket", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "numericBins", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "rectHeight", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "tickFontSize", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "minValue", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "maxValue", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "rangeSize", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "categoryBinWidth", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "categoryBinMargin", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "totalDefaultWidth", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "availableWidth", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "positionedBins", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "numericLabels", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "height", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegend.prototype, "width", null);
    return NumericMapLegend;
}());
var NumericMapLegendView = /** @class */ (function (_super) {
    __extends(NumericMapLegendView, _super);
    function NumericMapLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NumericMapLegendView.prototype, "bounds", {
        get: function () {
            var props = this.props;
            return new Bounds_1.default(props.x, props.y, props.legend.width, props.legend.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericMapLegendView.prototype, "legend", {
        get: function () {
            return this.props.legend;
        },
        enumerable: true,
        configurable: true
    });
    NumericMapLegendView.prototype.onMouseMove = function (ev) {
        var _a = this, legend = _a.legend, props = _a.props, base = _a.base;
        var focusBracket = legend.focusBracket;
        var mouse = Util_2.getRelativeMouse(base, ev);
        if (!this.bounds.contains(mouse))
            if (focusBracket)
                return this.props.onMouseLeave();
            else
                return;
        var newFocusBracket = null;
        legend.positionedBins.forEach(function (d) {
            if (mouse.x >= props.x + d.x && mouse.x <= props.x + d.x + d.width)
                newFocusBracket = d.bin;
        });
        if (newFocusBracket)
            this.props.onMouseOver(newFocusBracket);
    };
    NumericMapLegendView.prototype.componentDidMount = function () {
        document.documentElement.addEventListener('mousemove', this.onMouseMove);
        document.documentElement.addEventListener('touchmove', this.onMouseMove);
    };
    NumericMapLegendView.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('touchmove', this.onMouseMove);
    };
    NumericMapLegendView.prototype.render = function () {
        var _a = this, props = _a.props, legend = _a.legend;
        var rectHeight = legend.rectHeight, numericLabels = legend.numericLabels, height = legend.height, positionedBins = legend.positionedBins, focusBracket = legend.focusBracket;
        //Bounds.debug([this.bounds])
        var borderColor = "#333";
        var bottomY = props.y + height;
        return React.createElement("g", { className: "numericMapLegend" },
            Util_1.map(numericLabels, function (label) {
                return React.createElement("line", { x1: props.x + label.bounds.x + label.bounds.width / 2, y1: bottomY - rectHeight, x2: props.x + label.bounds.x + label.bounds.width / 2, y2: bottomY + label.bounds.y + label.bounds.height, stroke: borderColor, strokeWidth: 0.3 });
            }),
            Util_1.sortBy(Util_1.map(positionedBins, function (d) {
                var isFocus = focusBracket && (d.bin.min === focusBracket.min || (d.bin.value != null && d.bin.value === focusBracket.value));
                return React.createElement("rect", { x: props.x + d.x, y: bottomY - rectHeight, width: d.width, height: rectHeight, fill: d.bin.color, stroke: isFocus ? "#FFEC38" : borderColor, strokeWidth: isFocus ? 2.5 : 0.3 });
            }), function (r) { return r.props['stroke-width']; }),
            Util_1.map(numericLabels, function (label) {
                return React.createElement("text", { x: props.x + label.bounds.x, y: bottomY + label.bounds.y, fontSize: label.fontSize, "dominant-baseline": "hanging" }, label.text);
            }));
    };
    __decorate([
        mobx_1.computed
    ], NumericMapLegendView.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], NumericMapLegendView.prototype, "legend", null);
    __decorate([
        mobx_1.action.bound
    ], NumericMapLegendView.prototype, "onMouseMove", null);
    NumericMapLegendView = __decorate([
        mobx_react_1.observer
    ], NumericMapLegendView);
    return NumericMapLegendView;
}(React.Component));
var CategoricalMapLegend = /** @class */ (function () {
    function CategoricalMapLegend(props) {
        this.props = props;
    }
    Object.defineProperty(CategoricalMapLegend.prototype, "markLines", {
        get: function () {
            var props = this.props, rectSize = 10 * props.scale, rectPadding = 5, markPadding = 5, fontSize = 0.6 * props.scale * this.props.fontSize;
            var lines = [];
            var marks = [], xOffset = 0, yOffset = 0;
            Util_1.each(props.legendData, function (d) {
                var labelBounds = Bounds_1.default.forText(d.text, { fontSize: fontSize });
                var markWidth = rectSize + rectPadding + labelBounds.width + markPadding;
                if (xOffset + markWidth > props.maxWidth) {
                    lines.push({ totalWidth: xOffset - markPadding, marks: marks });
                    marks = [];
                    xOffset = 0;
                    yOffset += rectSize + rectPadding;
                }
                var markX = xOffset, markY = yOffset;
                var label = {
                    text: d.text,
                    bounds: labelBounds.extend({ x: markX + rectSize + rectPadding, y: markY + 1.5 }),
                    fontSize: fontSize
                };
                marks.push({
                    x: markX,
                    y: markY,
                    rectSize: rectSize,
                    label: label,
                    bin: d
                });
                xOffset += markWidth;
            });
            if (marks.length > 0) {
                lines.push({ totalWidth: xOffset - markPadding, marks: marks });
            }
            return lines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalMapLegend.prototype, "width", {
        get: function () {
            return Util_1.max(this.markLines.map(function (l) { return l.totalWidth; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalMapLegend.prototype, "marks", {
        get: function () {
            var _this = this;
            var lines = this.markLines;
            // Center each line
            Util_1.each(lines, function (line) {
                var xShift = _this.width / 2 - line.totalWidth / 2;
                Util_1.each(line.marks, function (m) {
                    m.x += xShift;
                    m.label.bounds = m.label.bounds.extend({ x: m.label.bounds.x + xShift });
                });
            });
            return Util_1.flatten(Util_1.map(lines, function (l) { return l.marks; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalMapLegend.prototype, "height", {
        get: function () {
            return Util_1.max(this.marks.map(function (m) { return m.y + m.rectSize; }));
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], CategoricalMapLegend.prototype, "markLines", null);
    __decorate([
        mobx_1.computed
    ], CategoricalMapLegend.prototype, "width", null);
    __decorate([
        mobx_1.computed
    ], CategoricalMapLegend.prototype, "marks", null);
    __decorate([
        mobx_1.computed
    ], CategoricalMapLegend.prototype, "height", null);
    return CategoricalMapLegend;
}());
var CategoricalMapLegendView = /** @class */ (function (_super) {
    __extends(CategoricalMapLegendView, _super);
    function CategoricalMapLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoricalMapLegendView.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var marks = props.legend.marks;
        var focusBracket = props.legend.props.focusBracket;
        //Bounds.debug([this.bounds])
        //Bounds.debug(marks.map(m => m.label.bounds))
        return React.createElement("g", { className: "categoricalMapLegend" }, Util_1.map(marks, function (m) {
            var isFocus = focusBracket && m.bin.value === focusBracket.value;
            var stroke = isFocus ? "#FFEC38" : "#333";
            return React.createElement("g", { onMouseOver: function () { return _this.props.onMouseOver(m.bin); }, onMouseLeave: function () { return _this.props.onMouseLeave(); } },
                React.createElement("rect", { x: props.x + m.x, y: props.y + m.y, width: m.rectSize, height: m.rectSize, fill: m.bin.color, stroke: stroke, "stroke-width": 0.4 }),
                ",",
                React.createElement("text", { x: props.x + m.label.bounds.x, y: props.y + m.label.bounds.y, fontSize: m.label.fontSize, "dominant-baseline": "hanging" }, m.label.text));
        }));
    };
    CategoricalMapLegendView = __decorate([
        mobx_react_1.observer
    ], CategoricalMapLegendView);
    return CategoricalMapLegendView;
}(React.Component));
var MapLegend = /** @class */ (function () {
    function MapLegend(props) {
        this.props = props;
    }
    Object.defineProperty(MapLegend.prototype, "numericLegendData", {
        get: function () {
            if (this.hasCategorical || !Util_1.some(this.props.legendData, function (d) { return d.value === "No data" && !d.isHidden; })) {
                return this.props.legendData.filter(function (l) { return l instanceof MapData_1.NumericBin && !l.isHidden; });
            }
            else {
                var bin = this.props.legendData.filter(function (l) { return (l instanceof MapData_1.NumericBin || l.value === "No data") && !l.isHidden; });
                return Util_1.flatten([bin[bin.length - 1], bin.slice(0, -1)]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "hasNumeric", {
        get: function () { return this.numericLegendData.length > 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "categoricalLegendData", {
        get: function () {
            return this.props.legendData.filter(function (l) { return l instanceof MapData_1.CategoricalBin && !l.isHidden; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "hasCategorical", {
        get: function () { return this.categoricalLegendData.length > 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "mainLabel", {
        get: function () {
            return new TextWrap_1.default({ maxWidth: this.props.bounds.width, fontSize: 0.7 * this.props.fontSize, text: this.props.title });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "numericFocusBracket", {
        get: function () {
            var _a = this.props, focusBracket = _a.focusBracket, focusEntity = _a.focusEntity;
            var numericLegendData = this.numericLegendData;
            if (focusBracket)
                return focusBracket;
            else if (focusEntity)
                return Util_1.find(numericLegendData, function (bin) { return bin.contains(focusEntity.datum); });
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "categoricalFocusBracket", {
        get: function () {
            var _a = this.props, focusBracket = _a.focusBracket, focusEntity = _a.focusEntity;
            var categoricalLegendData = this.categoricalLegendData;
            if (focusBracket && focusBracket instanceof MapData_1.CategoricalBin)
                return focusBracket;
            else if (focusEntity)
                return Util_1.find(categoricalLegendData, function (bin) { return bin.contains(focusEntity.datum); });
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "categoryLegend", {
        get: function () {
            var that = this;
            return this.hasCategorical ? new CategoricalMapLegend({
                get legendData() { return that.categoricalLegendData; },
                get maxWidth() { return that.props.bounds.width * 0.8; },
                get scale() { return 1; },
                get fontSize() { return that.props.fontSize; }
            }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "categoryLegendHeight", {
        get: function () {
            return this.categoryLegend ? this.categoryLegend.height + 5 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "numericLegend", {
        get: function () {
            var that = this;
            return this.hasNumeric ? new NumericMapLegend({
                get legendData() { return that.numericLegendData; },
                get width() { return that.props.bounds.width * 0.5; },
                get equalSizeBins() { return that.props.equalSizeBins; },
                get focusBracket() { return that.numericFocusBracket; },
                get fontSize() { return that.props.fontSize; }
            }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "numericLegendHeight", {
        get: function () {
            return this.numericLegend ? this.numericLegend.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "height", {
        get: function () {
            return this.mainLabel.height + this.categoryLegendHeight + this.numericLegendHeight + 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegend.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "numericLegendData", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "hasNumeric", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "categoricalLegendData", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "hasCategorical", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "mainLabel", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "numericFocusBracket", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "categoricalFocusBracket", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "categoryLegend", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "categoryLegendHeight", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "numericLegend", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "numericLegendHeight", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "height", null);
    __decorate([
        mobx_1.computed
    ], MapLegend.prototype, "bounds", null);
    return MapLegend;
}());
exports.default = MapLegend;
var MapLegendView = /** @class */ (function (_super) {
    __extends(MapLegendView, _super);
    function MapLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapLegendView.prototype.render = function () {
        var _a = this.props, legend = _a.legend, onMouseOver = _a.onMouseOver, onMouseLeave = _a.onMouseLeave;
        var bounds = legend.bounds, mainLabel = legend.mainLabel, numericLegend = legend.numericLegend, categoryLegend = legend.categoryLegend, categoryLegendHeight = legend.categoryLegendHeight;
        return React.createElement("g", { className: "mapLegend" },
            numericLegend && React.createElement(NumericMapLegendView, { legend: numericLegend, x: bounds.centerX - numericLegend.width / 2, y: bounds.bottom - mainLabel.height - categoryLegendHeight - numericLegend.height - 4, onMouseOver: onMouseOver, onMouseLeave: onMouseLeave }),
            categoryLegend && React.createElement(CategoricalMapLegendView, { legend: categoryLegend, x: bounds.centerX - categoryLegend.width / 2, y: bounds.bottom - mainLabel.height - categoryLegendHeight, onMouseOver: onMouseOver, onMouseLeave: onMouseLeave }),
            "/>}",
            mainLabel.render(bounds.centerX - mainLabel.width / 2, bounds.bottom - mainLabel.height));
    };
    MapLegendView = __decorate([
        mobx_react_1.observer
    ], MapLegendView);
    return MapLegendView;
}(React.Component));
exports.MapLegendView = MapLegendView;
//# sourceMappingURL=MapLegend.js.map