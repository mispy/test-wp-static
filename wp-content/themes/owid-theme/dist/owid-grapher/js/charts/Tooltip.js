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
var TooltipView = /** @class */ (function (_super) {
    __extends(TooltipView, _super);
    function TooltipView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TooltipView.prototype, "rendered", {
        get: function () {
            var _a = this, props = _a.props, bounds = _a.bounds;
            var chartView = this.context.chartView;
            var x = props.x;
            var y = props.y;
            // Ensure tooltip remains inside chart
            if (bounds) {
                if (x + bounds.width > chartView.renderWidth)
                    x -= bounds.width;
                if (y + bounds.height > chartView.renderHeight)
                    y -= bounds.height;
                if (x < 0)
                    x = 0;
                if (y < 0)
                    y = 0;
            }
            var style = { position: 'absolute', whiteSpace: 'nowrap', pointerEvents: 'none', left: x + "px", top: y + "px", backgroundColor: "white", border: "1px solid #ccc", textAlign: 'left', fontSize: "0.9em", zIndex: 100 };
            return React.createElement("div", { style: Util_1.extend(style, props.style || {}) }, props.children);
        },
        enumerable: true,
        configurable: true
    });
    TooltipView.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    TooltipView.prototype.componentDidUpdate = function () {
        this.bounds = Bounds_1.default.fromElement(this.base);
    };
    TooltipView.prototype.render = function () {
        return this.rendered;
    };
    __decorate([
        mobx_1.computed
    ], TooltipView.prototype, "rendered", null);
    __decorate([
        mobx_1.observable.struct
    ], TooltipView.prototype, "bounds", void 0);
    TooltipView = __decorate([
        mobx_react_1.observer
    ], TooltipView);
    return TooltipView;
}(React.Component));
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.componentDidMount = function () {
        this.componentDidUpdate();
    };
    Tooltip.prototype.componentDidUpdate = function () {
        this.context.chartView.chart.tooltip = React.createElement(TooltipView, __assign({}, this.props), this.props.children);
    };
    Tooltip.prototype.componentWillUnmount = function () {
        this.context.chartView.chart.tooltip = null;
    };
    Tooltip = __decorate([
        mobx_react_1.observer
    ], Tooltip);
    return Tooltip;
}(React.Component));
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map