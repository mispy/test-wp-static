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
var Bounds_1 = require("./Bounds");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var topojson = require("topojson");
var MapProjections_1 = require("./MapProjections");
var MapTopology_1 = require("./MapTopology");
var Vector2_1 = require("./Vector2");
var ChoroplethMap = /** @class */ (function (_super) {
    __extends(ChoroplethMap, _super);
    function ChoroplethMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChoroplethMap.prototype, "uid", {
        get: function () {
            return Util_1.guid();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "geoData", {
        get: function () {
            return topojson.feature(MapTopology_1.default, MapTopology_1.default.objects.world).features.filter(function (feature) { return feature.id !== "ATA"; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "projection", {
        get: function () {
            return this.props.projection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "choroplethData", {
        get: function () {
            return this.props.choroplethData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "defaultFill", {
        get: function () {
            return this.props.defaultFill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "geoPath", {
        get: function () {
            return MapProjections_1.default[this.projection];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "geoBounds", {
        get: function () {
            var _a = this, geoData = _a.geoData, geoPath = _a.geoPath;
            var allBounds = Util_1.map(geoData, geoPath.bounds);
            var x1 = Util_1.min(Util_1.map(allBounds, function (b) { return b[0][0]; }));
            var y1 = Util_1.min(Util_1.map(allBounds, function (b) { return b[0][1]; }));
            var x2 = Util_1.max(Util_1.map(allBounds, function (b) { return b[1][0]; }));
            var y2 = Util_1.max(Util_1.map(allBounds, function (b) { return b[1][1]; }));
            return Bounds_1.default.fromCorners(new Vector2_1.default(x1, y1), new Vector2_1.default(x2, y2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "pathData", {
        get: function () {
            var _a = this, geoData = _a.geoData, geoPath = _a.geoPath;
            var pathData = {};
            Util_1.each(geoData, function (d) {
                var s = geoPath(d);
                var paths = s.split(/Z/).filter(Util_1.identity);
                var newPaths = paths.map(function (path) {
                    var points = path.split(/[MLZ]/).filter(function (f) { return f; });
                    var rounded = points.map(function (p) { return p.split(/,/).map(function (v) { return parseFloat(v).toFixed(1); }).join(','); });
                    return "M" + rounded.join("L");
                });
                pathData[d.id] = newPaths.join("Z") + "Z";
            });
            return pathData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "focusBracket", {
        get: function () {
            return this.props.focusBracket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChoroplethMap.prototype, "focusEntity", {
        get: function () {
            return this.props.focusEntity;
        },
        enumerable: true,
        configurable: true
    });
    // Check if a geo entity is currently focused, either directly or via the bracket
    ChoroplethMap.prototype.hasFocus = function (geo) {
        var _a = this, choroplethData = _a.choroplethData, focusBracket = _a.focusBracket, focusEntity = _a.focusEntity;
        if (focusEntity && focusEntity.id === geo.id)
            return true;
        else if (!focusBracket)
            return false;
        var datum = choroplethData[geo.id] || null;
        if (focusBracket.contains(datum))
            return true;
        else
            return false;
    };
    Object.defineProperty(ChoroplethMap.prototype, "matrixTransform", {
        get: function () {
            var _a = this, bounds = _a.bounds, projection = _a.projection, geoBounds = _a.geoBounds;
            var viewports = {
                "World": { x: 0.565, y: 0.5, width: 1, height: 1 },
                "Africa": { x: 0.48, y: 0.70, width: 0.21, height: 0.38 },
                "NorthAmerica": { x: 0.49, y: 0.40, width: 0.19, height: 0.32 },
                "SouthAmerica": { x: 0.52, y: 0.815, width: 0.10, height: 0.26 },
                "Asia": { x: 0.49, y: 0.52, width: 0.22, height: 0.38 },
                "Australia": { x: 0.51, y: 0.77, width: 0.1, height: 0.12 },
                "Europe": { x: 0.54, y: 0.54, width: 0.05, height: 0.15 },
            };
            var viewport = viewports[projection];
            // Calculate our reference dimensions. All of these values are independent of the current
            // map translation and scaling.
            var mapX = geoBounds.x + 1;
            var mapY = geoBounds.y + 1;
            var viewportWidth = viewport.width * geoBounds.width;
            var viewportHeight = viewport.height * geoBounds.height;
            // Calculate what scaling should be applied to the untransformed map to match the current viewport to the container
            var scale = Math.min(bounds.width / viewportWidth, bounds.height / viewportHeight);
            // Work out how to center the map, accounting for the new scaling we've worked out
            var newWidth = geoBounds.width * scale;
            var newHeight = geoBounds.height * scale;
            var boundsCenterX = bounds.left + bounds.width / 2;
            var boundsCenterY = bounds.top + bounds.height / 2;
            var newCenterX = mapX + (scale - 1) * geoBounds.x + viewport.x * newWidth;
            var newCenterY = mapY + (scale - 1) * geoBounds.y + viewport.y * newHeight;
            var newOffsetX = boundsCenterX - newCenterX;
            var newOffsetY = boundsCenterY - newCenterY;
            var matrixStr = "matrix(" + scale + ",0,0," + scale + "," + newOffsetX + "," + newOffsetY + ")";
            return matrixStr;
        },
        enumerable: true,
        configurable: true
    });
    ChoroplethMap.prototype.render = function () {
        var _this = this;
        var _a = this, uid = _a.uid, bounds = _a.bounds, choroplethData = _a.choroplethData, defaultFill = _a.defaultFill, geoData = _a.geoData, pathData = _a.pathData, matrixTransform = _a.matrixTransform;
        var focusColor = "#FFEC38";
        var focusStrokeWidth = 2.5;
        return React.createElement("g", { className: "ChoroplethMap", "clip-path": "url(#boundsClip-" + uid + ")" },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "boundsClip-" + uid },
                    React.createElement("rect", { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }))),
            React.createElement("g", { className: "subunits", transform: matrixTransform },
                Util_1.map(geoData.filter(function (d) { return !choroplethData[d.id]; }), function (d) {
                    var isFocus = _this.hasFocus(d);
                    var stroke = isFocus ? focusColor : "#333";
                    return React.createElement("path", { key: d.id, d: pathData[d.id], "stroke-width": isFocus ? focusStrokeWidth : 0.3, stroke: stroke, cursor: "pointer", fill: defaultFill, onMouseEnter: function (ev) { return _this.props.onHover(d, ev); }, onMouseLeave: _this.props.onHoverStop, onClick: function () { return _this.props.onClick(d); } });
                }),
                Util_1.sortBy(Util_1.map(geoData.filter(function (d) { return choroplethData[d.id]; }), function (d) {
                    var isFocus = _this.hasFocus(d);
                    var datum = choroplethData[d.id];
                    var stroke = isFocus ? focusColor : "#333";
                    var fill = datum ? datum.color : defaultFill;
                    return [
                        React.createElement("path", { key: d.id, d: pathData[d.id], "stroke-width": isFocus ? focusStrokeWidth : 0.5, stroke: stroke, cursor: "pointer", fill: fill, onMouseEnter: function (ev) { return _this.props.onHover(d, ev); }, onMouseLeave: _this.props.onHoverStop, onClick: function () { return _this.props.onClick(d); } })
                    ];
                }), function (p) { return p[0].props['stroke-width']; })));
    };
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "uid", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "geoData", null);
    __decorate([
        mobx_1.computed.struct
    ], ChoroplethMap.prototype, "projection", null);
    __decorate([
        mobx_1.computed.struct
    ], ChoroplethMap.prototype, "bounds", null);
    __decorate([
        mobx_1.computed.struct
    ], ChoroplethMap.prototype, "choroplethData", null);
    __decorate([
        mobx_1.computed.struct
    ], ChoroplethMap.prototype, "defaultFill", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "geoPath", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "geoBounds", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "pathData", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "focusBracket", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "focusEntity", null);
    __decorate([
        mobx_1.computed
    ], ChoroplethMap.prototype, "matrixTransform", null);
    ChoroplethMap = __decorate([
        mobx_react_1.observer
    ], ChoroplethMap);
    return ChoroplethMap;
}(React.Component));
exports.default = ChoroplethMap;
//# sourceMappingURL=ChoroplethMap.js.map