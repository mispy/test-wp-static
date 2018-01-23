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
var Vector2_1 = require("./Vector2");
var Util_2 = require("./Util");
var Bounds_1 = require("./Bounds");
var Lines = /** @class */ (function (_super) {
    __extends(Lines, _super);
    function Lines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hover = null;
        return _this;
    }
    Object.defineProperty(Lines.prototype, "renderUid", {
        get: function () {
            return Util_1.guid();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "renderData", {
        get: function () {
            var _a = this.props, data = _a.data, xScale = _a.xScale, yScale = _a.yScale, focusKeys = _a.focusKeys;
            return Util_1.map(data, function (series) {
                return {
                    key: series.key,
                    displayKey: "key-" + Util_2.makeSafeForCSS(series.key),
                    color: series.color,
                    values: series.values.map(function (v) {
                        return new Vector2_1.default(Math.round(xScale.place(v.x)), Math.round(yScale.place(v.y)));
                    }),
                    isFocus: Util_1.includes(focusKeys, series.key),
                    isProjection: series.isProjection
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "isFocusMode", {
        get: function () {
            return Util_1.some(this.renderData, function (d) { return d.isFocus; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "hoverData", {
        get: function () {
            var data = this.props.data;
            return Util_1.flatten(Util_1.map(this.renderData, function (series, i) {
                return Util_1.map(series.values, function (v, j) {
                    return {
                        pos: v,
                        series: data[i],
                        value: data[i].values[j]
                    };
                });
            }));
        },
        enumerable: true,
        configurable: true
    });
    Lines.prototype.onMouseMove = function (ev) {
        var mouse = Util_2.getRelativeMouse(this.base, ev);
        var hoverData = this.hoverData;
        var value = Util_1.sortBy(hoverData, function (v) { return Vector2_1.default.distanceSq(v.pos, mouse); })[0];
        if (Vector2_1.default.distance(value.pos, mouse) < 100) {
            this.hover = value;
            if (this.props.onHoverPoint)
                this.props.onHoverPoint(value);
        }
        else {
            this.onMouseLeave();
        }
    };
    Lines.prototype.onMouseLeave = function () {
        if (this.hover && this.props.onHoverStop)
            this.props.onHoverStop();
        this.hover = null;
    };
    Object.defineProperty(Lines.prototype, "bounds", {
        get: function () {
            var _a = this.props, xScale = _a.xScale, yScale = _a.yScale;
            return Bounds_1.default.fromCorners(new Vector2_1.default(xScale.range[0], yScale.range[0]), new Vector2_1.default(xScale.range[1], yScale.range[1]));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "focusGroups", {
        get: function () {
            return Util_1.filter(this.renderData, function (g) { return g.isFocus; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "backgroundGroups", {
        get: function () {
            return Util_1.filter(this.renderData, function (g) { return !g.isFocus; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lines.prototype, "hasMarkers", {
        // Don't display point markers if there are very many of them for performance reasons
        // Note that we're using circle elements instead of marker-mid because marker performance in Safari 10 is very poor for some reason
        get: function () {
            return Util_1.sum(this.renderData.map(function (g) { return g.values.length; })) < 500;
        },
        enumerable: true,
        configurable: true
    });
    Lines.prototype.renderFocusGroups = function () {
        var _this = this;
        return Util_1.map(this.focusGroups, function (series) {
            return React.createElement("g", { className: series.displayKey },
                React.createElement("path", { stroke: series.color, strokeLinecap: "round", d: Util_2.pointsToPath(series.values.map(function (v) { return [v.x, v.y]; })), fill: "none", strokeWidth: 1.5, "stroke-dasharray": series.isProjection && "1,4" }),
                _this.hasMarkers && !series.isProjection && React.createElement("g", { fill: series.color }, series.values.map(function (v) { return React.createElement("circle", { cx: v.x, cy: v.y, r: 2 }); })));
        });
    };
    Lines.prototype.renderBackgroundGroups = function () {
        return Util_1.map(this.backgroundGroups, function (series) {
            return React.createElement("g", { className: series.displayKey },
                React.createElement("path", { key: series.key + '-line', strokeLinecap: "round", stroke: "#ccc", d: Util_2.pointsToPath(series.values.map(function (v) { return [v.x, v.y]; })), fill: "none", strokeWidth: 1 }));
        });
    };
    Lines.prototype.render = function () {
        var _a = this, hover = _a.hover, bounds = _a.bounds;
        return React.createElement("g", { className: "Lines", onMouseMove: this.onMouseMove, onMouseLeave: this.onMouseLeave },
            React.createElement("rect", { x: Math.round(bounds.x), y: Math.round(bounds.y), width: Math.round(bounds.width), height: Math.round(bounds.height), fill: "rgba(255,255,255,0)", opacity: 0 }),
            this.renderBackgroundGroups(),
            this.renderFocusGroups(),
            hover && React.createElement("circle", { cx: hover.pos.x, cy: hover.pos.y, r: 5, fill: hover.series.color }));
    };
    __decorate([
        mobx_1.observable.ref
    ], Lines.prototype, "hover", void 0);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "renderUid", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "renderData", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "isFocusMode", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "hoverData", null);
    __decorate([
        mobx_1.action.bound
    ], Lines.prototype, "onMouseMove", null);
    __decorate([
        mobx_1.action.bound
    ], Lines.prototype, "onMouseLeave", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "focusGroups", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "backgroundGroups", null);
    __decorate([
        mobx_1.computed
    ], Lines.prototype, "hasMarkers", null);
    Lines = __decorate([
        mobx_react_1.observer
    ], Lines);
    return Lines;
}(React.Component));
exports.default = Lines;
//# sourceMappingURL=Lines.js.map