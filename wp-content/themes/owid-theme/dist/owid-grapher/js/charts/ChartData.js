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
var Util_2 = require("./Util");
var DimensionWithData_1 = require("./DimensionWithData");
// This component computes useful information using both the chart configuration and the actual data
// Where possible, code should go in the individual chart type transforms instead and be exposed via interface
var ChartData = /** @class */ (function () {
    function ChartData(chart) {
        this.chart = chart;
    }
    Object.defineProperty(ChartData.prototype, "vardata", {
        get: function () {
            return this.chart.vardata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "isReady", {
        // ChartData is ready to go iff we have retrieved data for every variable associated with the chart
        get: function () {
            var _a = this, chart = _a.chart, vardata = _a.vardata;
            return Util_1.every(chart.dimensions, function (dim) { return !!vardata.variablesById[dim.variableId]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "filledDimensions", {
        get: function () {
            var _this = this;
            if (!this.isReady)
                return [];
            return Util_1.map(this.chart.dimensions, function (dim, i) {
                var variable = _this.vardata.variablesById[dim.variableId];
                return new DimensionWithData_1.default(i, dim, variable);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "primaryDimensions", {
        get: function () {
            return this.filledDimensions.filter(function (dim) { return dim.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "axisDimensions", {
        get: function () {
            return this.filledDimensions.filter(function (dim) { return dim.property === 'y' || dim.property === 'x'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "defaultTitle", {
        get: function () {
            if (this.chart.isScatter)
                return this.axisDimensions.map(function (d) { return d.displayName; }).join(" vs. ");
            else if (this.primaryDimensions.length > 1 && Util_1.uniq(Util_1.map(this.primaryDimensions, function (d) { return d.variable.datasetName; })).length === 1)
                return this.primaryDimensions[0].variable.datasetName;
            else if (this.primaryDimensions.length === 2)
                return this.primaryDimensions.map(function (d) { return d.displayName; }).join(" and ");
            else
                return this.primaryDimensions.map(function (d) { return d.displayName; }).join(", ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "title", {
        get: function () {
            return this.chart.props.title !== undefined ? this.chart.props.title : this.defaultTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "minYear", {
        // XXX refactor into the transforms
        get: function () {
            var chart = this.chart;
            //if (chart.isScatter && !chart.scatter.failMessage && chart.scatter.xOverrideYear != null)
            //    return null
            if (chart.tab === "map")
                return chart.map.data.targetYear;
            else if (chart.isScatter && !chart.scatter.failMessage)
                return chart.scatter.startYear;
            else if (chart.isDiscreteBar && !chart.discreteBar.failMessage)
                return chart.discreteBar.targetYear;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "maxYear", {
        get: function () {
            var chart = this.chart;
            //if (chart.isScatter && !chart.scatter.failMessage && chart.scatter.xOverrideYear != null)
            //    return null
            if (chart.tab === "map")
                return chart.map.data.targetYear;
            else if (chart.isScatter && !chart.scatter.failMessage)
                return chart.scatter.endYear;
            else if (chart.isDiscreteBar && !chart.discreteBar.failMessage)
                return chart.discreteBar.targetYear;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "currentTitle", {
        get: function () {
            var chart = this.chart;
            var text = this.title;
            if (!chart.props.hideTitleAnnotation) {
                var _a = this, minYear = _a.minYear, maxYear = _a.maxYear;
                if (chart.props.tab === "chart" && chart.addCountryMode !== "add-country" && chart.data.selectedEntities.length === 1) {
                    var selectedEntities = chart.data.selectedEntities;
                    var entityStr = selectedEntities.join(', ');
                    if (entityStr.length > 0) {
                        text = text + ", " + entityStr;
                    }
                }
                if (minYear !== null) {
                    var timeFrom = Util_1.formatYear(minYear);
                    var timeTo = Util_1.formatYear(maxYear !== null ? maxYear : minYear);
                    var time = timeFrom === timeTo ? timeFrom : timeFrom + " to " + timeTo;
                    text = text + ", " + time;
                }
            }
            return text.trim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "defaultSlug", {
        get: function () {
            return Util_2.slugify(this.title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "slug", {
        get: function () {
            return Util_2.defaultTo(this.chart.props.slug, this.defaultSlug);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "originUrl", {
        get: function () {
            var url = this.chart.props.originUrl || "ourworldindata.org";
            if (!url.startsWith("http"))
                url = "https://" + url;
            return url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "defaultSourcesLine", {
        get: function () {
            var sourceNames = this.sources.map(function (source) { return source.name; });
            // Shorten automatic source names for certain major sources
            sourceNames = sourceNames.map(function (sourceName) {
                for (var _i = 0, _a = ["World Bank – WDI", "World Bank", "ILOSTAT"]; _i < _a.length; _i++) {
                    var majorSource = _a[_i];
                    if (sourceName.startsWith(majorSource))
                        return majorSource;
                }
                return sourceName;
            });
            return Util_1.uniq(sourceNames).join(", ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "sourcesLine", {
        get: function () {
            return this.chart.props.sourceDesc !== undefined ? this.chart.props.sourceDesc : this.defaultSourcesLine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "isSingleEntity", {
        get: function () {
            return this.vardata.availableEntities.length === 1 || this.chart.addCountryMode === "change-country";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "isSingleVariable", {
        get: function () {
            return this.primaryDimensions.length === 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "isShowingTimeline", {
        get: function () {
            return !!(this.chart.primaryTab === 'map' || (this.chart.isScatter && this.chart.scatter.hasTimeline));
        },
        enumerable: true,
        configurable: true
    });
    // Make a unique string key for an entity on a variable
    ChartData.prototype.keyFor = function (entity, dimensionIndex) {
        return entity + "_" + dimensionIndex;
    };
    Object.defineProperty(ChartData.prototype, "dimensionsByField", {
        get: function () {
            return Util_1.keyBy(this.filledDimensions, 'property');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "selectionData", {
        get: function () {
            var _this = this;
            var _a = this, chart = _a.chart, vardata = _a.vardata, primaryDimensions = _a.primaryDimensions;
            var validSelections = chart.props.selectedData.filter(function (sel) {
                // Must be a dimension that's on the chart
                var dimension = primaryDimensions[sel.index];
                if (dimension == null)
                    return false;
                // Entity must be within that dimension
                var entityMeta = vardata.entityMetaById[sel.entityId];
                if (entityMeta == null || !Util_1.includes(dimension.variable.entitiesUniq, entityMeta.name))
                    return false;
                // "change entity" charts can only have one entity selected
                if (chart.addCountryMode === "change-country" && sel.entityId !== Util_2.last(chart.props.selectedData).entityId)
                    return false;
                return true;
            });
            validSelections = Util_1.uniqWith(validSelections, function (a, b) { return a.entityId === b.entityId && a.index === b.index; });
            return Util_1.map(validSelections, function (sel) {
                return {
                    key: _this.keyFor(vardata.entityMetaById[sel.entityId].name, sel.index),
                    color: sel.color
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    ChartData.prototype.selectKey = function (key) {
        this.selectedKeys = this.selectedKeys.concat([key]);
    };
    Object.defineProperty(ChartData.prototype, "keyColors", {
        get: function () {
            var keyColors = {};
            this.selectionData.forEach(function (d) {
                if (d.color)
                    keyColors[d.key] = d.color;
            });
            return keyColors;
        },
        enumerable: true,
        configurable: true
    });
    ChartData.prototype.setKeyColor = function (datakey, color) {
        var meta = this.lookupKey(datakey);
        var selectedData = Util_1.cloneDeep(this.chart.props.selectedData);
        selectedData.forEach(function (d) {
            if (d.entityId === meta.entityId && d.index === meta.index) {
                d.color = color;
            }
        });
        this.chart.props.selectedData = selectedData;
    };
    Object.defineProperty(ChartData.prototype, "selectedEntities", {
        get: function () {
            var _this = this;
            return Util_1.uniq(this.selectedKeys.map(function (key) { return _this.lookupKey(key).entity; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "availableEntities", {
        get: function () {
            var _this = this;
            var entitiesForDimensions = this.axisDimensions.map(function (dim) {
                return _this.availableKeys.map(function (key) { return _this.lookupKey(key); }).filter(function (d) { return d.dimension.variableId === dim.variableId; }).map(function (d) { return d.entity; });
            });
            return Util_1.intersection.apply(void 0, entitiesForDimensions);
        },
        enumerable: true,
        configurable: true
    });
    ChartData.prototype.switchEntity = function (entityId) {
        var selectedData = Util_1.cloneDeep(this.chart.props.selectedData);
        selectedData.forEach(function (d) { return d.entityId = entityId; });
        this.chart.props.selectedData = selectedData;
    };
    Object.defineProperty(ChartData.prototype, "selectedKeys", {
        get: function () {
            return this.selectionData.map(function (d) { return d.key; });
        },
        // Map keys back to their components for storage
        set: function (keys) {
            var _this = this;
            var _a = this, chart = _a.chart, vardata = _a.vardata;
            if (!this.isReady)
                return;
            var selection = Util_1.map(keys, function (datakey) {
                var _a = _this.lookupKey(datakey), entity = _a.entity, index = _a.index;
                return {
                    entityId: vardata.entityMetaByKey[entity].id,
                    index: index,
                    color: _this.keyColors[datakey]
                };
            });
            chart.props.selectedData = selection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "selectedKeysByKey", {
        get: function () {
            return Util_1.keyBy(this.selectedKeys);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "keyData", {
        // Calculate the available datakeys and their associated info
        get: function () {
            var _this = this;
            if (!this.isReady)
                return new Map();
            var _a = this, chart = _a.chart, isSingleEntity = _a.isSingleEntity, isSingleVariable = _a.isSingleVariable, primaryDimensions = _a.primaryDimensions;
            var keyData = new Map();
            Util_1.each(primaryDimensions, function (dim, index) {
                var variable = dim.variable;
                Util_1.each(variable.entitiesUniq, function (entity) {
                    var entityMeta = chart.vardata.entityMetaByKey[entity];
                    var key = _this.keyFor(entity, index);
                    // Full label completely represents the data in the key and is used in the editor
                    var fullLabel = entity + " - " + dim.displayName;
                    // The output label however is context-dependent
                    var label = fullLabel;
                    if (isSingleVariable) {
                        label = entity;
                    }
                    else if (isSingleEntity) {
                        label = "" + dim.displayName;
                    }
                    keyData.set(key, {
                        key: key,
                        entityId: entityMeta.id,
                        entity: entity,
                        dimension: dim,
                        index: index,
                        fullLabel: fullLabel,
                        label: label,
                        shortCode: (primaryDimensions.length > 1 && chart.addCountryMode !== "change-country") ? (entityMeta.code || entityMeta.name) + "-" + dim.index : (entityMeta.code || entityMeta.name)
                    });
                });
            });
            return keyData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "canAddData", {
        get: function () {
            return this.chart.addCountryMode === "add-country" && this.availableKeys.length > 1 && !this.chart.isSlopeChart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "canChangeEntity", {
        get: function () {
            return !this.chart.isScatter && this.chart.addCountryMode === "change-country" && this.availableEntities.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "availableKeys", {
        get: function () {
            return Util_1.sortBy(Array.from(this.keyData.keys()).slice());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "remainingKeys", {
        get: function () {
            var _a = this, availableKeys = _a.availableKeys, selectedKeys = _a.selectedKeys;
            return Util_1.without.apply(void 0, [availableKeys].concat(selectedKeys));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "availableKeysByEntity", {
        get: function () {
            var keysByEntity = new Map();
            this.keyData.forEach(function (info, key) {
                var keys = keysByEntity.get(info.entity) || [];
                keys.push(key);
                keysByEntity.set(info.entity, keys);
            });
            return keysByEntity;
        },
        enumerable: true,
        configurable: true
    });
    ChartData.prototype.lookupKey = function (key) {
        var keyDatum = this.keyData.get(key);
        if (keyDatum !== undefined)
            return keyDatum;
        else
            throw new Error("Unknown data key: " + key);
    };
    ChartData.prototype.formatKey = function (key) {
        return this.lookupKey(key).label;
    };
    ChartData.prototype.toggleKey = function (key) {
        if (Util_1.includes(this.selectedKeys, key)) {
            this.selectedKeys = this.selectedKeys.filter(function (k) { return k !== key; });
        }
        else {
            this.selectedKeys = this.selectedKeys.concat([key]);
        }
    };
    Object.defineProperty(ChartData.prototype, "primaryVariable", {
        get: function () {
            var yDimension = Util_1.find(this.chart.dimensions, { property: 'y' });
            return yDimension ? this.vardata.variablesById[yDimension.variableId] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "sources", {
        get: function () {
            var filledDimensions = this.filledDimensions;
            var sources = [];
            Util_1.each(filledDimensions, function (dim) {
                var variable = dim.variable;
                // HACK (Mispy): Ignore the default color source on scatterplots.
                if (variable.name !== "Countries Continents" && variable.name !== "Total population (Gapminder)")
                    sources.push(Util_1.extend({}, variable.source, { dimension: dim }));
            });
            return sources;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "vardata", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "isReady", null);
    __decorate([
        mobx_1.computed.struct
    ], ChartData.prototype, "filledDimensions", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "primaryDimensions", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "axisDimensions", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "defaultTitle", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "title", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "minYear", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "maxYear", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "currentTitle", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "defaultSlug", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "slug", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "originUrl", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "defaultSourcesLine", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "sourcesLine", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "isSingleEntity", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "isSingleVariable", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "isShowingTimeline", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "dimensionsByField", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "selectionData", null);
    __decorate([
        mobx_1.computed.struct
    ], ChartData.prototype, "keyColors", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "selectedEntities", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "availableEntities", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "selectedKeys", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "selectedKeysByKey", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "keyData", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "canAddData", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "canChangeEntity", null);
    __decorate([
        mobx_1.computed.struct
    ], ChartData.prototype, "availableKeys", null);
    __decorate([
        mobx_1.computed.struct
    ], ChartData.prototype, "remainingKeys", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "availableKeysByEntity", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "primaryVariable", null);
    __decorate([
        mobx_1.computed
    ], ChartData.prototype, "sources", null);
    return ChartData;
}());
exports.default = ChartData;
//# sourceMappingURL=ChartData.js.map