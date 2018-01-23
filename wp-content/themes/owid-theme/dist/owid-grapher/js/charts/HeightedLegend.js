"use strict";
/* HeightedLegend.tsx
 * ================
 *
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
var Util_1 = require("./Util");
var Util_2 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var TextWrap_1 = require("./TextWrap");
var Bounds_1 = require("./Bounds");
var HeightedLegend = /** @class */ (function () {
    function HeightedLegend(props) {
        this.props = props;
    }
    Object.defineProperty(HeightedLegend.prototype, "fontSize", {
        get: function () { return 0.8 * this.props.fontSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegend.prototype, "rectSize", {
        get: function () { return 10; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegend.prototype, "rectPadding", {
        get: function () { return 5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegend.prototype, "maxWidth", {
        get: function () { return Util_2.defaultTo(this.props.maxWidth, Infinity); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegend.prototype, "marks", {
        get: function () {
            var _a = this, fontSize = _a.fontSize, rectSize = _a.rectSize, rectPadding = _a.rectPadding, maxWidth = _a.maxWidth;
            var maxTextWidth = maxWidth - rectSize - rectPadding;
            return this.props.items.map(function (item) {
                var textWrap = new TextWrap_1.default({ text: item.label, maxWidth: maxTextWidth, fontSize: fontSize });
                return {
                    item: item,
                    textWrap: textWrap,
                    width: rectSize + rectPadding + textWrap.width,
                    height: Math.max(textWrap.height, rectSize / 4)
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegend.prototype, "width", {
        get: function () {
            if (this.marks.length === 0)
                return 0;
            else
                return Util_2.defaultTo(Util_1.max(this.marks.map(function (d) { return d.width; })), 0);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], HeightedLegend.prototype, "fontSize", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegend.prototype, "rectSize", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegend.prototype, "rectPadding", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegend.prototype, "maxWidth", null);
    __decorate([
        mobx_1.computed.struct
    ], HeightedLegend.prototype, "marks", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegend.prototype, "width", null);
    return HeightedLegend;
}());
exports.default = HeightedLegend;
var HeightedLegendView = /** @class */ (function (_super) {
    __extends(HeightedLegendView, _super);
    function HeightedLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HeightedLegendView.prototype, "onMouseOver", {
        get: function () { return Util_2.defaultTo(this.props.onMouseOver, Util_1.noop); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "onMouseLeave", {
        get: function () { return Util_2.defaultTo(this.props.onMouseLeave, Util_1.noop); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "onClick", {
        get: function () { return Util_2.defaultTo(this.props.onClick, Util_1.noop); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "isFocusMode", {
        get: function () {
            var _this = this;
            return this.props.focusKeys.length !== this.props.legend.marks.length && Util_1.some(this.props.legend.marks, function (m) { return Util_1.includes(_this.props.focusKeys, m.item.key); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "initialMarks", {
        // Naive initial placement of each mark at the target height, before collision detection
        get: function () {
            var _a = this.props, legend = _a.legend, x = _a.x, yScale = _a.yScale;
            return Util_1.sortBy(legend.marks.map(function (m) {
                var y = yScale.place(m.item.yValue);
                // Don't let them go off the edge
                /*if (y+m.height > yScale.rangeMax) {
                    y = yScale.rangeMax-m.height
                } else if (y < yScale.rangeMin) {
                    y = yScale.rangeMin
                }*/
                var bounds = new Bounds_1.default(x, y - m.height / 2, m.width, m.height);
                return {
                    mark: m,
                    origBounds: bounds,
                    bounds: bounds,
                    isOverlap: false
                };
            }), function (m) { return m.bounds.y; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "topDownPlacement", {
        // Each mark starts at target height. When a conflict is detected, the lower label is pushed down a bit.
        get: function () {
            var initialMarks = this.initialMarks;
            var yScale = this.props.yScale;
            var marks = Util_1.cloneDeep(initialMarks);
            for (var i = 0; i < marks.length; i++) {
                for (var j = i + 1; j < marks.length; j++) {
                    var m1 = marks[i];
                    var m2 = marks[j];
                    var isOverlap = m1.bounds.intersects(m2.bounds);
                    if (isOverlap) {
                        var overlapHeight = (m1.bounds.y + m1.bounds.height) - m2.bounds.y;
                        var newBounds = m2.bounds.extend({ y: m2.bounds.y + overlapHeight });
                        // Don't push off the edge of the chart
                        if (newBounds.bottom > yScale.rangeMax) {
                            m2.isOverlap = true;
                        }
                        else {
                            m2.bounds = newBounds;
                        }
                    }
                }
            }
            return marks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "bottomUpPlacement", {
        // Inverse placement. Each mark starts at target height. When conflict is detected, upper label is pushed up.
        get: function () {
            var initialMarks = this.initialMarks;
            var yScale = this.props.yScale;
            var marks = Util_1.cloneDeep(initialMarks).reverse();
            for (var i = 0; i < marks.length; i++) {
                var m1 = marks[i];
                if (i === 0 && m1.bounds.bottom > yScale.rangeMax) {
                    m1.bounds = m1.bounds.extend({ y: yScale.rangeMax - m1.bounds.height });
                }
                for (var j = i + 1; j < marks.length; j++) {
                    var m2 = marks[j];
                    var isOverlap = m1.bounds.intersects(m2.bounds);
                    if (isOverlap) {
                        var overlapHeight = (m2.bounds.y + m2.bounds.height) - m1.bounds.y;
                        var newBounds = m2.bounds.extend({ y: m2.bounds.y - overlapHeight });
                        // Don't push off the edge of the chart
                        if (newBounds.top < yScale.rangeMin) {
                            m2.isOverlap = true;
                        }
                        else {
                            m2.bounds = newBounds;
                        }
                    }
                }
            }
            return marks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "overlappingPlacement", {
        // Overlapping placement, for when we really can't find a solution without overlaps.
        get: function () {
            var marks = Util_1.cloneDeep(this.initialMarks);
            for (var i = 0; i < marks.length; i++) {
                var m1 = marks[i];
                for (var j = i + 1; j < marks.length; j++) {
                    var m2 = marks[j];
                    var isOverlap = !m1.isOverlap && m1.bounds.intersects(m2.bounds);
                    if (isOverlap) {
                        m2.isOverlap = true;
                    }
                }
            }
            return marks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "placedMarks", {
        get: function () {
            var topOverlaps = this.topDownPlacement.filter(function (m) { return m.isOverlap; }).length;
            if (topOverlaps === 0)
                return this.topDownPlacement;
            var bottomOverlaps = this.bottomUpPlacement.filter(function (m) { return m.isOverlap; }).length;
            if (bottomOverlaps === 0)
                return this.bottomUpPlacement;
            return this.overlappingPlacement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "backgroundMarks", {
        get: function () {
            var focusKeys = this.props.focusKeys;
            var isFocusMode = this.isFocusMode;
            return this.placedMarks.filter(function (m) { return isFocusMode ? !Util_1.includes(focusKeys, m.mark.item.key) : m.isOverlap; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "focusMarks", {
        get: function () {
            var focusKeys = this.props.focusKeys;
            var isFocusMode = this.isFocusMode;
            return this.placedMarks.filter(function (m) { return isFocusMode ? Util_1.includes(focusKeys, m.mark.item.key) : !m.isOverlap; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeightedLegendView.prototype, "numMovesNeeded", {
        get: function () {
            return this.placedMarks.filter(function (m) { return m.isOverlap || !m.bounds.equals(m.origBounds); }).length;
        },
        enumerable: true,
        configurable: true
    });
    HeightedLegendView.prototype.renderBackground = function () {
        var _this = this;
        var _a = this.props, x = _a.x, legend = _a.legend;
        var rectSize = legend.rectSize, rectPadding = legend.rectPadding;
        var _b = this, backgroundMarks = _b.backgroundMarks, isFocusMode = _b.isFocusMode;
        return backgroundMarks.map(function (mark) {
            var result = React.createElement("g", { className: "legendMark", onMouseOver: function () { return _this.onMouseOver(mark.mark.item.key); }, onClick: function () { return _this.onClick(mark.mark.item.key); } },
                React.createElement("rect", { x: x, y: mark.bounds.y, width: mark.bounds.width, height: mark.bounds.height, fill: "#fff", opacity: 0 }),
                React.createElement("rect", { x: x, y: mark.bounds.centerY - rectSize / 8, width: rectSize, height: rectSize / 4, fill: isFocusMode ? "#ccc" : mark.mark.item.color }),
                mark.mark.textWrap.render(x + rectSize + rectPadding, mark.bounds.y, { fill: isFocusMode ? "#ccc" : "#eee" }));
            return result;
        });
    };
    HeightedLegendView.prototype.renderFocus = function () {
        var _this = this;
        var _a = this.props, x = _a.x, legend = _a.legend;
        var rectSize = legend.rectSize, rectPadding = legend.rectPadding;
        var focusMarks = this.focusMarks;
        return focusMarks.map(function (mark) {
            var result = React.createElement("g", { className: "legendMark", onMouseOver: function () { return _this.onMouseOver(mark.mark.item.key); }, onClick: function () { return _this.onClick(mark.mark.item.key); } },
                React.createElement("rect", { x: x, y: mark.bounds.y, width: mark.bounds.width, height: mark.bounds.height, fill: "#fff", opacity: 0 }),
                React.createElement("rect", { x: x, y: mark.bounds.centerY - rectSize / 8, width: rectSize, height: rectSize / 4, fill: mark.mark.item.color }),
                mark.mark.textWrap.render(x + rectSize + rectPadding, mark.bounds.y, { fill: "#333" }));
            return result;
        });
    };
    HeightedLegendView.prototype.render = function () {
        var _this = this;
        return React.createElement("g", { className: "HeightedLegend clickable", onMouseLeave: function () { return _this.onMouseLeave(); } },
            this.renderBackground(),
            this.renderFocus());
    };
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "onMouseOver", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "onMouseLeave", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "onClick", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "isFocusMode", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "initialMarks", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "topDownPlacement", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "bottomUpPlacement", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "overlappingPlacement", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "placedMarks", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "backgroundMarks", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "focusMarks", null);
    __decorate([
        mobx_1.computed
    ], HeightedLegendView.prototype, "numMovesNeeded", null);
    HeightedLegendView = __decorate([
        mobx_react_1.observer
    ], HeightedLegendView);
    return HeightedLegendView;
}(React.Component));
exports.HeightedLegendView = HeightedLegendView;
//# sourceMappingURL=HeightedLegend.js.map