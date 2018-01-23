"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var Variable = /** @class */ (function () {
    function Variable(meta) {
        this.displayName = undefined;
        this.displayUnit = undefined;
        this.displayShortUnit = undefined;
        this.displayUnitConversionFactor = undefined;
        this.displayTolerance = undefined;
        this.displayIsProjection = undefined;
        this.years = [];
        this.entities = [];
        this.values = [];
        Util_1.extend(this, meta);
    }
    Object.defineProperty(Variable.prototype, "hasNumericValues", {
        get: function () {
            return Util_1.some(this.values, function (v) { return isFinite(v); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "numericValues", {
        get: function () {
            return Util_1.sortBy(this.values.filter(function (v) { return Util_1.isNumber(v); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "categoricalValues", {
        get: function () {
            return Util_1.uniq(this.values.filter(function (v) { return Util_1.isString(v); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "hasCategoricalValues", {
        get: function () {
            return Util_1.some(this.values, function (v) { return Util_1.isString(v); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "entitiesUniq", {
        get: function () {
            return Util_1.uniq(this.entities);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "yearsUniq", {
        get: function () {
            return Util_1.uniq(this.years);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "minYear", {
        get: function () {
            return Util_1.min(this.yearsUniq);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "maxYear", {
        get: function () {
            return Util_1.max(this.yearsUniq);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "minValue", {
        get: function () {
            return Util_1.min(this.numericValues);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "maxValue", {
        get: function () {
            return Util_1.max(this.numericValues);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "isNumeric", {
        get: function () {
            return this.hasNumericValues && !this.hasCategoricalValues;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "id", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "name", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "description", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "unit", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "shortUnit", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "coverage", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "timespan", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "datasetName", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayName", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayUnit", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayShortUnit", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayUnitConversionFactor", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayTolerance", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "displayIsProjection", void 0);
    __decorate([
        mobx_1.observable.struct
    ], Variable.prototype, "source", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "years", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "entities", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Variable.prototype, "values", void 0);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "hasNumericValues", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "numericValues", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "categoricalValues", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "hasCategoricalValues", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "entitiesUniq", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "yearsUniq", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "minYear", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "maxYear", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "minValue", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "maxValue", null);
    __decorate([
        mobx_1.computed
    ], Variable.prototype, "isNumeric", null);
    return Variable;
}());
exports.Variable = Variable;
var VariableData = /** @class */ (function () {
    function VariableData(chart) {
        var _this = this;
        this.variablesById = {};
        this.entityMetaById = {};
        this.chart = chart;
        mobx_1.reaction(function () { return _this.variableIds; }, this.update);
        this.update();
    }
    Object.defineProperty(VariableData.prototype, "variableIds", {
        get: function () {
            return Util_1.uniq(this.chart.dimensions.map(function (d) { return d.variableId; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableData.prototype, "entityMetaByKey", {
        get: function () {
            return Util_1.keyBy(this.entityMetaById, 'name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableData.prototype, "cacheTag", {
        get: function () {
            return App.isEditor ? Date.now().toString() : this.chart.cacheTag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableData.prototype, "availableEntities", {
        get: function () {
            return Util_1.keys(this.entityMetaByKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VariableData.prototype, "variables", {
        get: function () {
            return Util_1.values(this.variablesById);
        },
        enumerable: true,
        configurable: true
    });
    VariableData.prototype.update = function () {
        var _this = this;
        var _a = this, variableIds = _a.variableIds, chart = _a.chart, cacheTag = _a.cacheTag;
        if (variableIds.length === 0 || this.chart.isNode) {
            // No data to download
            return;
        }
        if (window.admin) {
            window.admin.rawRequest("/api/data/variables/" + variableIds.join("+") + "?v=" + cacheTag, {}, "GET")
                .then(function (response) { return response.text(); })
                .then(function (rawData) { return _this.receiveData(rawData); });
        }
        else {
            fetch(Global.rootUrl + "/data/variables/" + variableIds.join("+") + "?v=" + cacheTag)
                .then(function (response) { return response.text(); })
                .then(function (rawData) { return _this.receiveData(rawData); });
        }
    };
    VariableData.prototype.receiveData = function (rawData) {
        var lines = rawData.split("\r\n");
        var variablesById = {};
        var entityMetaById = {};
        lines.forEach(function (line, i) {
            if (i === 0) {
                Util_1.each(JSON.parse(line).variables, function (d) {
                    variablesById[d.id] = new Variable(d);
                });
            }
            else if (i === lines.length - 1) {
                entityMetaById = JSON.parse(line);
            }
            else {
                var points = line.split(";");
                var variable_1;
                points.forEach(function (d, j) {
                    if (j === 0) {
                        variable_1 = variablesById[d];
                    }
                    else {
                        var spl = d.split(",");
                        variable_1.years.push(+spl[0]);
                        variable_1.entities.push(spl[1]);
                        var asNumber = parseFloat(spl[2]);
                        if (!isNaN(asNumber))
                            variable_1.values.push(asNumber);
                        else
                            variable_1.values.push(spl[2]);
                    }
                });
            }
        });
        Util_1.each(variablesById, function (v) { return v.entities = v.entities.map(function (id) { return entityMetaById[id].name; }); });
        Util_1.each(entityMetaById, function (e, id) { return e.id = +id; });
        this.variablesById = variablesById;
        this.entityMetaById = entityMetaById;
    };
    __decorate([
        mobx_1.observable.ref
    ], VariableData.prototype, "dataRequest", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableData.prototype, "variablesById", void 0);
    __decorate([
        mobx_1.observable.ref
    ], VariableData.prototype, "entityMetaById", void 0);
    __decorate([
        mobx_1.computed
    ], VariableData.prototype, "variableIds", null);
    __decorate([
        mobx_1.computed
    ], VariableData.prototype, "entityMetaByKey", null);
    __decorate([
        mobx_1.computed
    ], VariableData.prototype, "cacheTag", null);
    __decorate([
        mobx_1.computed
    ], VariableData.prototype, "availableEntities", null);
    __decorate([
        mobx_1.computed
    ], VariableData.prototype, "variables", null);
    __decorate([
        mobx_1.action.bound
    ], VariableData.prototype, "update", null);
    __decorate([
        mobx_1.action.bound
    ], VariableData.prototype, "receiveData", null);
    return VariableData;
}());
exports.default = VariableData;
//# sourceMappingURL=VariableData.js.map