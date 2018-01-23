"use strict";
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
var mobx_1 = require("mobx");
var Marks_1 = require("./Marks");
var TextWrap_1 = require("./TextWrap");
var Util_1 = require("./Util");
var ConnectedScatterLegend = /** @class */ (function () {
    function ConnectedScatterLegend(props) {
        this.props = props;
    }
    Object.defineProperty(ConnectedScatterLegend.prototype, "fontSize", {
        get: function () { return 0.7 * this.props.fontSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "fontColor", {
        get: function () { return "#333"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "maxLabelWidth", {
        get: function () { return this.props.maxWidth / 3; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "startLabel", {
        get: function () {
            var _a = this, props = _a.props, maxLabelWidth = _a.maxLabelWidth, fontSize = _a.fontSize;
            return new TextWrap_1.default({ text: Util_1.formatYear(props.startYear), fontSize: fontSize, maxWidth: maxLabelWidth });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "endLabel", {
        get: function () {
            var _a = this, props = _a.props, maxLabelWidth = _a.maxLabelWidth, fontSize = _a.fontSize;
            return new TextWrap_1.default({ text: Util_1.formatYear(props.endYear), fontSize: fontSize, maxWidth: maxLabelWidth });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "width", {
        get: function () {
            return this.props.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedScatterLegend.prototype, "height", {
        get: function () {
            return Math.max(this.startLabel.height, this.endLabel.height);
        },
        enumerable: true,
        configurable: true
    });
    ConnectedScatterLegend.prototype.render = function (targetX, targetY, options) {
        if (options === void 0) { options = {}; }
        var _a = this, props = _a.props, startLabel = _a.startLabel, endLabel = _a.endLabel, fontColor = _a.fontColor;
        var lineLeft = targetX + startLabel.width + 5;
        var lineRight = targetX + props.maxWidth - endLabel.width - 5;
        var lineY = targetY + this.height / 2 - 0.5;
        return React.createElement("g", __assign({ className: "ConnectedScatterLegend" }, options),
            React.createElement("rect", { x: targetX, y: targetY, width: this.width, height: this.height, fill: "#fff", opacity: 0 }),
            startLabel.render(targetX, targetY, { fill: fontColor }),
            endLabel.render(targetX + props.maxWidth - endLabel.width, targetY, { fill: fontColor }),
            React.createElement("line", { x1: lineLeft, y1: lineY, x2: lineRight, y2: lineY, stroke: "#666", strokeWidth: 1 }),
            React.createElement("circle", { cx: lineLeft, cy: lineY, r: 2, fill: "#666", stroke: "#ccc", strokeWidth: 0.2 }),
            !props.endpointsOnly && [
                React.createElement("circle", { cx: lineLeft + (lineRight - lineLeft) / 3, cy: lineY, r: 2, fill: "#666", stroke: "#ccc", strokeWidth: 0.2 }),
                React.createElement("circle", { cx: lineLeft + 2 * (lineRight - lineLeft) / 3, cy: lineY, r: 2, fill: "#666", stroke: "#ccc", strokeWidth: 0.2 })
            ],
            React.createElement(Marks_1.Triangle, { cx: lineRight, cy: lineY, r: 3, fill: "#666", stroke: "#ccc", strokeWidth: 0.2, transform: "rotate(" + 90 + ", " + lineRight + ", " + lineY + ")" }));
    };
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "fontSize", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "fontColor", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "maxLabelWidth", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "startLabel", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "endLabel", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "width", null);
    __decorate([
        mobx_1.computed
    ], ConnectedScatterLegend.prototype, "height", null);
    return ConnectedScatterLegend;
}());
exports.default = ConnectedScatterLegend;
//# sourceMappingURL=ConnectedScatterLegend.js.map