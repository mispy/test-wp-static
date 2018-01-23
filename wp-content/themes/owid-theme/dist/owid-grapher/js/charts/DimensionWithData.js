"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Util_1 = require("./Util");
var DimensionWithData = /** @class */ (function () {
    function DimensionWithData(index, dimension, variable) {
        this.index = index;
        this.props = dimension;
        this.variable = variable;
    }
    Object.defineProperty(DimensionWithData.prototype, "variableId", {
        get: function () {
            return this.props.variableId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "property", {
        get: function () {
            return this.props.property;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "displayName", {
        get: function () {
            return Util_1.defaultTo(Util_1.defaultTo(this.props.displayName, this.variable.displayName), this.variable.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "unit", {
        get: function () {
            return Util_1.defaultTo(Util_1.defaultTo(this.props.unit, this.variable.displayUnit), this.variable.unit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "fullNameWithUnit", {
        // Full name of the variable with associated unit information, used for data export
        get: function () {
            return this.displayName + (this.unit ? " (" + this.unit + ")" : "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "unitConversionFactor", {
        get: function () {
            return Util_1.defaultTo(Util_1.defaultTo(this.props.conversionFactor, this.variable.displayUnitConversionFactor), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "isProjection", {
        get: function () {
            return !!Util_1.defaultTo(this.props.isProjection, this.variable.displayIsProjection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "targetYear", {
        get: function () {
            return this.props.targetYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "tolerance", {
        get: function () {
            return Util_1.defaultTo(Util_1.defaultTo(this.props.tolerance, this.variable.displayTolerance), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "shortUnit", {
        get: function () {
            var unit = this.unit;
            var shortUnit = Util_1.defaultTo(Util_1.defaultTo(this.props.shortUnit, this.variable.displayShortUnit), this.variable.shortUnit || undefined);
            if (shortUnit !== undefined)
                return shortUnit;
            if (!unit)
                return "";
            if (unit.length < 3)
                return unit;
            else {
                var commonShortUnits = ['$', '£', '€', '%'];
                if (Util_1.some(commonShortUnits, function (u) { return unit[0] === u; }))
                    return unit[0];
                else
                    return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "formatValueShort", {
        get: function () {
            var shortUnit = this.shortUnit;
            return function (value) {
                if (Util_1.isString(value))
                    return value;
                else
                    return Util_1.formatValue(value, { unit: shortUnit });
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "formatValueLong", {
        get: function () {
            var unit = this.unit;
            return function (value) {
                if (Util_1.isString(value))
                    return value;
                else
                    return Util_1.formatValue(value, { unit: unit });
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "values", {
        get: function () {
            var unitConversionFactor = this.unitConversionFactor;
            if (unitConversionFactor !== 1)
                return this.variable.values.map(function (v) { return v * unitConversionFactor; });
            else
                return this.variable.values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "numericValues", {
        get: function () {
            return Util_1.sortBy(this.values.filter(function (v) { return Util_1.isNumber(v); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "hasNumericValues", {
        get: function () {
            return this.numericValues.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "minValue", {
        get: function () {
            return this.variable.minValue * this.unitConversionFactor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "maxValue", {
        get: function () {
            return this.variable.maxValue * this.unitConversionFactor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "yearsUniq", {
        get: function () {
            return this.variable.yearsUniq;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "entitiesUniq", {
        get: function () {
            return this.variable.entitiesUniq;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "years", {
        get: function () {
            return this.variable.years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "entities", {
        get: function () {
            return this.variable.entities;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DimensionWithData.prototype, "valueByEntityAndYear", {
        get: function () {
            var valueByEntityAndYear = new Map();
            for (var i = 0; i < this.values.length; i++) {
                var entity = this.entities[i];
                var year = this.years[i];
                var value = this.values[i];
                var valueByYear = valueByEntityAndYear.get(entity);
                if (!valueByYear) {
                    valueByYear = new Map();
                    valueByEntityAndYear.set(entity, valueByYear);
                }
                valueByYear.set(year, value);
            }
            return valueByEntityAndYear;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable.ref
    ], DimensionWithData.prototype, "index", void 0);
    __decorate([
        mobx_1.observable.ref
    ], DimensionWithData.prototype, "variable", void 0);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "variableId", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "property", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "displayName", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "unit", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "fullNameWithUnit", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "unitConversionFactor", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "isProjection", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "targetYear", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "tolerance", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "shortUnit", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "formatValueShort", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "formatValueLong", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "values", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "numericValues", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "hasNumericValues", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "minValue", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "maxValue", null);
    __decorate([
        mobx_1.computed
    ], DimensionWithData.prototype, "valueByEntityAndYear", null);
    return DimensionWithData;
}());
exports.default = DimensionWithData;
//# sourceMappingURL=DimensionWithData.js.map