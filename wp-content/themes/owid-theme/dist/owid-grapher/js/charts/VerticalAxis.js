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
var Util_1 = require("./Util");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Bounds_1 = require("./Bounds");
var ScaleSelector_1 = require("./ScaleSelector");
var TextWrap_1 = require("./TextWrap");
// Axis layout model. Computes the space needed for displaying an axis.
var VerticalAxis = /** @class */ (function () {
    function VerticalAxis(props) {
        this.props = props;
    }
    Object.defineProperty(VerticalAxis.prototype, "tickFontSize", {
        get: function () {
            return 0.9 * this.props.fontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "label", {
        get: function () {
            var _a = this, props = _a.props, height = _a.height;
            return props.labelText ? new TextWrap_1.default({ maxWidth: height, fontSize: 0.7 * props.fontSize, text: props.labelText }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "labelOffset", {
        get: function () {
            return this.label ? this.label.height + 10 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "width", {
        get: function () {
            var _a = this, props = _a.props, labelOffset = _a.labelOffset;
            var longestTick = Util_1.sortBy(props.scale.getFormattedTicks(), function (tick) { return -tick.length; })[0];
            return Bounds_1.default.forText(longestTick, { fontSize: this.tickFontSize }).width + labelOffset + 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "height", {
        get: function () {
            return this.props.scale.rangeSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "scale", {
        get: function () {
            return this.props.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalAxis.prototype, "ticks", {
        get: function () {
            return this.scale.getTickValues();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "tickFontSize", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "label", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "labelOffset", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "width", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "height", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "scale", null);
    __decorate([
        mobx_1.computed
    ], VerticalAxis.prototype, "ticks", null);
    return VerticalAxis;
}());
exports.default = VerticalAxis;
var VerticalAxisView = /** @class */ (function (_super) {
    __extends(VerticalAxisView, _super);
    function VerticalAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalAxisView.prototype.render = function () {
        var _a = this.props, bounds = _a.bounds, axis = _a.axis, onScaleTypeChange = _a.onScaleTypeChange;
        var scale = axis.scale, ticks = axis.ticks, label = axis.label;
        var textColor = '#666';
        return React.createElement("g", { className: "VerticalAxis" },
            label && label.render(-bounds.centerY - label.width / 2, bounds.left, { transform: "rotate(-90)" }),
            ticks.map(function (tick) {
                return React.createElement("text", { x: (bounds.left + axis.width - 5).toFixed(2), y: scale.place(tick), fill: textColor, "dominant-baseline": "middle", textAnchor: "end", fontSize: axis.tickFontSize }, scale.tickFormat(tick));
            }),
            scale.scaleTypeOptions.length > 1 && onScaleTypeChange &&
                React.createElement(ScaleSelector_1.default, { x: bounds.left, y: bounds.top - 8, scaleType: scale.scaleType, scaleTypeOptions: scale.scaleTypeOptions, onChange: onScaleTypeChange }));
    };
    VerticalAxisView = __decorate([
        mobx_react_1.observer
    ], VerticalAxisView);
    return VerticalAxisView;
}(React.Component));
exports.VerticalAxisView = VerticalAxisView;
//# sourceMappingURL=VerticalAxis.js.map