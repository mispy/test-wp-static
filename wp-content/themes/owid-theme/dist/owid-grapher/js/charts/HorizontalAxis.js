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
var Bounds_1 = require("./Bounds");
var ScaleSelector_1 = require("./ScaleSelector");
var TextWrap_1 = require("./TextWrap");
// Axis layout model. Computes the space needed for displaying an axis.
var HorizontalAxis = /** @class */ (function () {
    function HorizontalAxis(props) {
        this.props = props;
    }
    Object.defineProperty(HorizontalAxis.prototype, "tickFontSize", {
        get: function () {
            return 0.9 * this.props.fontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "labelFontSize", {
        get: function () {
            return 0.7 * this.props.fontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "label", {
        get: function () {
            var _a = this, props = _a.props, width = _a.width;
            return props.labelText ? new TextWrap_1.default({ maxWidth: width, fontSize: this.labelFontSize, text: props.labelText }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "labelOffset", {
        get: function () {
            return this.label ? this.label.height + HorizontalAxis.labelPadding * 2 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "width", {
        get: function () {
            return this.props.scale.rangeSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "height", {
        get: function () {
            var _a = this, props = _a.props, labelOffset = _a.labelOffset;
            return Bounds_1.default.forText(props.scale.getFormattedTicks()[0], { fontSize: this.tickFontSize }).height + labelOffset + 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "scale", {
        get: function () {
            return this.props.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "baseTicks", {
        get: function () {
            var domain = this.scale.domain;
            var ticks = this.scale.getTickValues();
            // Make sure the start and end values are present, if they're whole numbers
            if (domain[0] % 1 === 0)
                ticks = [domain[0]].concat(ticks);
            if (domain[1] % 1 === 0)
                ticks = ticks.concat([domain[1]]);
            return Util_1.uniq(ticks);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "tickPlacements", {
        get: function () {
            var _this = this;
            var _a = this, scale = _a.scale, labelOffset = _a.labelOffset;
            return this.baseTicks.map(function (tick) {
                var bounds = Bounds_1.default.forText(scale.tickFormat(tick), { fontSize: _this.tickFontSize });
                return {
                    tick: tick,
                    bounds: bounds.extend({ x: scale.place(tick) - bounds.width / 2, y: bounds.bottom - labelOffset }),
                    isHidden: false
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalAxis.prototype, "ticks", {
        get: function () {
            var tickPlacements = this.tickPlacements;
            for (var i = 0; i < tickPlacements.length; i++) {
                for (var j = 1; j < tickPlacements.length; j++) {
                    var t1 = tickPlacements[i], t2 = tickPlacements[j];
                    if (t1 === t2 || t1.isHidden || t2.isHidden)
                        continue;
                    if (t1.bounds.intersects(t2.bounds.padWidth(-5))) {
                        if (i === 0)
                            t2.isHidden = true;
                        else if (j === tickPlacements.length - 1)
                            t1.isHidden = true;
                        else
                            t2.isHidden = true;
                    }
                }
            }
            return tickPlacements.filter(function (t) { return !t.isHidden; }).map(function (t) { return t.tick; });
        },
        enumerable: true,
        configurable: true
    });
    HorizontalAxis.labelPadding = 5;
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "tickFontSize", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "labelFontSize", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "label", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "labelOffset", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "width", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "height", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "scale", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "baseTicks", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "tickPlacements", null);
    __decorate([
        mobx_1.computed
    ], HorizontalAxis.prototype, "ticks", null);
    return HorizontalAxis;
}());
exports.default = HorizontalAxis;
var HorizontalAxisView = /** @class */ (function (_super) {
    __extends(HorizontalAxisView, _super);
    function HorizontalAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorizontalAxisView.prototype.render = function () {
        var _a = this.props, bounds = _a.bounds, axis = _a.axis, onScaleTypeChange = _a.onScaleTypeChange;
        var scale = axis.scale, ticks = axis.ticks, label = axis.label, labelOffset = axis.labelOffset;
        var textColor = '#666';
        return React.createElement("g", { className: "HorizontalAxis" },
            label && label.render(bounds.centerX - label.width / 2, bounds.bottom - label.height),
            ticks.map(function (tick) {
                return React.createElement("text", { x: scale.place(tick), y: bounds.bottom - labelOffset, fill: textColor, textAnchor: "middle", fontSize: axis.tickFontSize }, scale.tickFormat(tick));
            }),
            scale.scaleTypeOptions.length > 1 && onScaleTypeChange &&
                React.createElement(ScaleSelector_1.default, { x: bounds.right, y: bounds.bottom - 5, scaleType: scale.scaleType, scaleTypeOptions: scale.scaleTypeOptions, onChange: onScaleTypeChange }));
    };
    return HorizontalAxisView;
}(React.Component));
exports.HorizontalAxisView = HorizontalAxisView;
//# sourceMappingURL=HorizontalAxis.js.map