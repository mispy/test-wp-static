"use strict";
// A chart "dimension" represents a binding between a chart
// and a particular variable that it requests as data
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var ChartDimension = /** @class */ (function () {
    function ChartDimension(json) {
        this.displayName = undefined;
        this.unit = undefined;
        this.shortUnit = undefined;
        this.isProjection = undefined;
        this.conversionFactor = undefined;
        this.tolerance = undefined;
        // XXX move this somewhere else, it's only used for scatter x override
        this.targetYear = undefined;
        // If enabled, dimension settings will be saved onto variable as defaults
        // for future charts
        this.saveToVariable = undefined;
        for (var key in this) {
            if (key in json) {
                this[key] = json[key];
                // XXX migrate this away
                if (json[key] === "" || json[key] === null)
                    this[key] = undefined;
            }
        }
    }
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "property", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "variableId", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "displayName", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "unit", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "shortUnit", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "isProjection", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "conversionFactor", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "tolerance", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "targetYear", void 0);
    __decorate([
        mobx_1.observable
    ], ChartDimension.prototype, "saveToVariable", void 0);
    return ChartDimension;
}());
exports.default = ChartDimension;
//# sourceMappingURL=ChartDimension.js.map