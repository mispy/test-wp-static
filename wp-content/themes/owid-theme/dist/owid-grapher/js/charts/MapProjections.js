"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_geo_1 = require("d3-geo");
var mobx_1 = require("mobx");
var geoRobinson = require('d3-geo-projection').geoRobinson;
var MapProjections = /** @class */ (function () {
    function MapProjections() {
    }
    Object.defineProperty(MapProjections.prototype, "World", {
        get: function () {
            var projection = geoRobinson();
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "Africa", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([-25, 0])
                .center([0, 0])
                .parallels([30, -20]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "NorthAmerica", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([98, 0])
                .center([0, 38])
                .parallels([29.5, 45.5]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "SouthAmerica", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([68, 0])
                .center([0, -14])
                .parallels([10, -30]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "Asia", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([-105, 0])
                .center([0, 37])
                .parallels([10, 60]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "Europe", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([-15, 0])
                .center([0, 55])
                .parallels([60, 40]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapProjections.prototype, "Australia", {
        get: function () {
            //empiric
            var projection = d3_geo_1.geoConicConformal()
                .rotate([-135, 0])
                .center([0, -20])
                .parallels([-10, -30]);
            var path = d3_geo_1.geoPath().projection(projection);
            return path;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "World", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "Africa", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "NorthAmerica", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "SouthAmerica", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "Asia", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "Europe", null);
    __decorate([
        mobx_1.computed
    ], MapProjections.prototype, "Australia", null);
    return MapProjections;
}());
exports.default = new MapProjections();
//# sourceMappingURL=MapProjections.js.map