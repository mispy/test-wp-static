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
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var TextWrap_1 = require("./TextWrap");
var Util_2 = require("./Util");
var ScatterColorLegend = /** @class */ (function () {
    function ScatterColorLegend(props) {
        this.props = props;
    }
    Object.defineProperty(ScatterColorLegend.prototype, "fontSize", {
        get: function () { return 0.7 * this.props.fontSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "rectSize", {
        get: function () { return this.props.fontSize / 3; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "rectPadding", {
        get: function () { return 5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "lineHeight", {
        get: function () { return 5; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "labelMarks", {
        get: function () {
            var _a = this, props = _a.props, fontSize = _a.fontSize, rectSize = _a.rectSize, rectPadding = _a.rectPadding;
            return props.scale.domain().map(function (value) {
                var color = props.scale(value);
                if (props.colors.indexOf(color) === -1)
                    return null;
                var label = new TextWrap_1.default({ maxWidth: props.maxWidth, fontSize: fontSize, text: value });
                return {
                    label: label,
                    color: color,
                    width: rectSize + rectPadding + label.width,
                    height: Math.max(label.height, rectSize)
                };
            }).filter(function (v) { return !!v; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "width", {
        get: function () {
            if (this.labelMarks.length === 0)
                return 0;
            else
                return Util_2.defaultTo(Util_1.max(this.labelMarks.map(function (d) { return d.width; })), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterColorLegend.prototype, "height", {
        get: function () {
            return Util_1.sum(this.labelMarks.map(function (d) { return d.height; })) + this.lineHeight * this.labelMarks.length;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "fontSize", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "rectSize", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "rectPadding", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "lineHeight", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "labelMarks", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "width", null);
    __decorate([
        mobx_1.computed
    ], ScatterColorLegend.prototype, "height", null);
    return ScatterColorLegend;
}());
exports.default = ScatterColorLegend;
var ScatterColorLegendView = /** @class */ (function (_super) {
    __extends(ScatterColorLegendView, _super);
    function ScatterColorLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterColorLegendView.prototype.render = function () {
        var props = this.props;
        var focusColors = props.focusColors, activeColors = props.activeColors, onMouseOver = props.onMouseOver, onMouseLeave = props.onMouseLeave, onClick = props.onClick;
        var _a = props.legend, labelMarks = _a.labelMarks, rectSize = _a.rectSize, rectPadding = _a.rectPadding, lineHeight = _a.lineHeight;
        var offset = 0;
        return React.createElement("g", { className: "ScatterColorLegend clickable", style: { cursor: 'pointer' } }, labelMarks.map(function (mark) {
            var isActive = Util_1.includes(activeColors, mark.color);
            var isFocus = Util_1.includes(focusColors, mark.color);
            var mouseOver = onMouseOver ? function () { return onMouseOver(mark.color); } : undefined;
            var mouseLeave = onMouseLeave || undefined;
            var click = onClick ? function () { return onClick(mark.color); } : undefined;
            var result = React.createElement("g", { className: "legendMark", onMouseOver: mouseOver, onMouseLeave: mouseLeave, onClick: click, fill: !isActive ? "#ccc" : undefined },
                React.createElement("rect", { x: props.x, y: props.y + offset - lineHeight / 2, width: mark.width, height: mark.height + lineHeight, fill: "#fff", opacity: 0 }),
                ",",
                React.createElement("rect", { x: props.x, y: props.y + offset + rectSize / 2, width: rectSize, height: rectSize, fill: isActive ? mark.color : undefined }),
                ",",
                mark.label.render(props.x + rectSize + rectPadding, props.y + offset, isFocus ? { style: { fontWeight: 'bold' } } : undefined));
            offset += mark.height + lineHeight;
            return result;
        }));
    };
    ScatterColorLegendView = __decorate([
        mobx_react_1.observer
    ], ScatterColorLegendView);
    return ScatterColorLegendView;
}(React.Component));
exports.ScatterColorLegendView = ScatterColorLegendView;
//# sourceMappingURL=ScatterColorLegend.js.map