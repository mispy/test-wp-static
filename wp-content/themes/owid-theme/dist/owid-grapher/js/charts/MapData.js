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
var ColorSchemes_1 = require("./ColorSchemes");
var Util_3 = require("./Util");
var MapTopology_1 = require("./MapTopology");
var NumericBin = /** @class */ (function () {
    function NumericBin(props) {
        this.props = props;
    }
    Object.defineProperty(NumericBin.prototype, "min", {
        get: function () { return this.props.min; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "max", {
        get: function () { return this.props.max; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "color", {
        get: function () { return this.props.color; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "minText", {
        get: function () { return this.props.format(this.props.min); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "maxText", {
        get: function () {
            var str = this.props.format(this.props.max);
            if (this.props.isOpenEnded)
                return ">" + str;
            else
                return str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "label", {
        get: function () { return this.props.label; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "text", {
        get: function () { return this.props.label || ""; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericBin.prototype, "isHidden", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    NumericBin.prototype.contains = function (d) {
        if (!d)
            return false;
        else if (this.props.isOpenEnded)
            return d.value > this.min;
        else if (this.props.isFirst)
            return d.value >= this.min && d.value <= this.max;
        else
            return d.value > this.min && d.value <= this.max;
    };
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "min", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "max", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "color", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "minText", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "maxText", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "label", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "text", null);
    __decorate([
        mobx_1.computed
    ], NumericBin.prototype, "isHidden", null);
    return NumericBin;
}());
exports.NumericBin = NumericBin;
var CategoricalBin = /** @class */ (function () {
    function CategoricalBin(_a) {
        var index = _a.index, value = _a.value, color = _a.color, label = _a.label, isHidden = _a.isHidden;
        this.index = index;
        this.value = value;
        this.color = color;
        this.label = label;
        this.isHidden = isHidden;
    }
    Object.defineProperty(CategoricalBin.prototype, "text", {
        get: function () { return this.label || this.value; },
        enumerable: true,
        configurable: true
    });
    CategoricalBin.prototype.contains = function (d) {
        return (d === null && this.value === 'No data') || (d !== null && d.value === this.value);
    };
    return CategoricalBin;
}());
exports.CategoricalBin = CategoricalBin;
var MapData = /** @class */ (function () {
    function MapData(chart) {
        this.chart = chart;
        if (!chart.isNode)
            this.ensureValidConfig();
    }
    MapData.prototype.ensureValidConfig = function () {
        var _this = this;
        var chart = this.chart;
        // Validate the map variable id selection to something on the chart
        mobx_1.autorun(function () {
            var hasVariable = chart.map.variableId && chart.vardata.variablesById[chart.map.variableId];
            if (!hasVariable && chart.data.primaryVariable) {
                var variableId_1 = chart.data.primaryVariable.id;
                mobx_1.runInAction(function () { return chart.map.props.variableId = variableId_1; });
            }
        });
        // When automatic classification is turned off, assign defaults
        mobx_1.reaction(function () { return _this.map.props.isManualBuckets; }, function () {
            if (_this.map.props.isManualBuckets) {
                var autoBinMaximums = _this.autoBinMaximums;
                var colorSchemeValues = mobx_1.toJS(_this.map.props.colorSchemeValues) || [];
                for (var i = 0; i < autoBinMaximums.length; i++) {
                    if (i >= colorSchemeValues.length)
                        colorSchemeValues.push(autoBinMaximums[i]);
                }
                _this.map.props.colorSchemeValues = colorSchemeValues;
            }
        });
    };
    Object.defineProperty(MapData.prototype, "map", {
        get: function () { return this.chart.map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "vardata", {
        get: function () { return this.chart.vardata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "isReady", {
        // Make sure map has an assigned variable and the data is ready
        get: function () {
            var _a = this, map = _a.map, vardata = _a.vardata;
            return map.variableId !== undefined && !!vardata.variablesById[map.variableId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "dimension", {
        get: function () {
            var _this = this;
            return this.chart.data.filledDimensions.find(function (d) { return d.variableId === _this.map.variableId; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "knownMapEntities", {
        // Figure out which entities in the variable can be shown on the map
        // (we can't render data for things that aren't countries)
        get: function () {
            if (!this.dimension)
                return {};
            var idLookup = Util_1.keyBy(MapTopology_1.default.objects.world.geometries.map(function (g) { return g.id; }));
            var entities = this.dimension.variable.entitiesUniq.filter(function (e) { return !!idLookup[Util_3.entityNameForMap(e)]; });
            return Util_1.keyBy(entities);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "timelineYears", {
        // All available years with data for the map
        get: function () {
            var _this = this;
            var dimension = this.dimension;
            if (!dimension)
                return [1900, 2000];
            return Util_1.sortedUniq(dimension.years.filter(function (_, i) { return !!_this.knownMapEntities[dimension.entities[i]]; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "hasTimeline", {
        get: function () {
            return !this.map.props.hideTimeline && this.timelineYears.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "targetYear", {
        get: function () {
            var targetYear = Util_2.defaultTo(this.map.props.targetYear, Util_2.last(this.timelineYears));
            return Util_2.defaultTo(Util_2.findClosest(this.timelineYears, targetYear), Util_2.last(this.timelineYears));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "legendTitle", {
        get: function () {
            return ""; // Disabled for now; redundant with chart title
            //const {legendDescription} = this.map.props
            //return legendDescription !== undefined ? legendDescription : (this.dimension ? this.dimension.displayName : "")
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "numAutoBins", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "numBins", {
        get: function () {
            return this.map.props.isManualBuckets ? this.map.props.colorSchemeValues.length : this.numAutoBins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "customBucketLabels", {
        get: function () {
            var labels = mobx_1.toJS(this.map.props.colorSchemeLabels) || [];
            while (labels.length < this.numBins)
                labels.push(undefined);
            return labels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "minBinValue", {
        get: function () {
            return this.map.props.colorSchemeMinValue !== undefined ? this.map.props.colorSchemeMinValue : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "binStepSizeDefault", {
        get: function () {
            var dimension = this.dimension;
            if (!dimension)
                return 10;
            var _a = this, numAutoBins = _a.numAutoBins, minBinValue = _a.minBinValue;
            var median95 = dimension.numericValues[Math.floor(dimension.numericValues.length * 0.95)];
            var stepSizeInitial = (median95 - minBinValue) / numAutoBins;
            var stepMagnitude = Math.floor(Math.log(stepSizeInitial) / Math.log(10));
            var stepSize = Util_1.round(stepSizeInitial, -stepMagnitude);
            return stepSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "binStepSize", {
        get: function () {
            return this.map.props.binStepSize !== undefined ? this.map.props.binStepSize : this.binStepSizeDefault;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "manualBinMaximums", {
        get: function () {
            if (!this.dimension || !this.dimension.hasNumericValues || this.numBins <= 0)
                return [];
            var numBins = this.numBins;
            var colorSchemeValues = this.map.colorSchemeValues;
            var values = Util_1.toArray(colorSchemeValues);
            while (values.length < numBins)
                values.push(0);
            while (values.length > numBins)
                values = values.slice(0, numBins);
            return values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "autoBinMaximums", {
        // When automatic classification is turned on, this takes the numeric map data
        // and works out some discrete ranges to assign colors to
        get: function () {
            if (!this.dimension || !this.dimension.hasNumericValues || this.numAutoBins <= 0)
                return [];
            var _a = this, binStepSize = _a.binStepSize, numAutoBins = _a.numAutoBins, minBinValue = _a.minBinValue;
            var bucketMaximums = [];
            var nextMaximum = minBinValue + binStepSize;
            for (var i = 0; i < numAutoBins; i++) {
                bucketMaximums.push(nextMaximum);
                nextMaximum += binStepSize;
            }
            return bucketMaximums;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "bucketMaximums", {
        get: function () {
            if (this.map.props.isManualBuckets)
                return this.manualBinMaximums;
            else
                return this.autoBinMaximums;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "defaultColorScheme", {
        get: function () {
            return ColorSchemes_1.default[Util_1.keys(ColorSchemes_1.default)[0]];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "colorScheme", {
        get: function () {
            var colorScheme = ColorSchemes_1.default[this.map.baseColorScheme];
            return colorScheme !== undefined ? colorScheme : this.defaultColorScheme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "baseColors", {
        get: function () {
            var _a = this, dimension = _a.dimension, colorScheme = _a.colorScheme, bucketMaximums = _a.bucketMaximums;
            var isColorSchemeInverted = this.map.isColorSchemeInverted;
            var numColors = bucketMaximums.length + (dimension ? dimension.variable.categoricalValues.length : 0);
            var colors = colorScheme.getColors(numColors);
            if (isColorSchemeInverted) {
                Util_1.reverse(colors);
            }
            return colors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "categoricalValues", {
        // Add default 'No data' category
        get: function () {
            var dimension = this.dimension;
            var categoricalValues = dimension ? dimension.variable.categoricalValues : [];
            if (!Util_1.includes(categoricalValues, "No data"))
                return ["No data"].concat(categoricalValues);
            else
                return categoricalValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "customCategoryColors", {
        // Ensure there's always a custom color for "No data"
        get: function () {
            return Util_1.extend({}, this.map.customCategoryColors, { 'No data': this.map.noDataColor });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "legendData", {
        get: function () {
            // Will eventually produce something like this:
            // [{ min: 10, max: 20, minText: "10%", maxText: "20%", color: '#faeaef' },
            //  { min: 20, max: 30, minText: "20%", maxText: "30%", color: '#fefabc' },
            //  { value: 'Foobar', text: "Foobar Boop", color: '#bbbbbb'}]
            var dimension = this.dimension;
            if (!dimension)
                return [];
            var legendData = [];
            var _a = this, map = _a.map, bucketMaximums = _a.bucketMaximums, baseColors = _a.baseColors, categoricalValues = _a.categoricalValues, customCategoryColors = _a.customCategoryColors, customBucketLabels = _a.customBucketLabels, minBinValue = _a.minBinValue;
            var customNumericColors = map.customNumericColors, customCategoryLabels = map.customCategoryLabels, customHiddenCategories = map.customHiddenCategories;
            /*var unitsString = chart.model.get("units"),
                units = !isEmpty(unitsString) ? JSON.parse(unitsString) : {},
                yUnit = find(units, { property: 'y' });*/
            // Numeric 'buckets' of color
            var minValue = minBinValue;
            for (var i = 0; i < bucketMaximums.length; i++) {
                var baseColor = baseColors[i];
                var color = Util_2.defaultTo(customNumericColors.length > i ? customNumericColors[i] : undefined, baseColor);
                var maxValue = +bucketMaximums[i];
                var label = customBucketLabels[i];
                legendData.push(new NumericBin({ isFirst: i === 0, isOpenEnded: i === bucketMaximums.length - 1 && maxValue < dimension.maxValue, min: minValue, max: maxValue, color: color, label: label, format: dimension ? dimension.formatValueShort : function () { return ""; } }));
                minValue = maxValue;
            }
            // Categorical values, each assigned a color
            for (var i = 0; i < categoricalValues.length; i++) {
                var value = categoricalValues[i];
                var boundingOffset = Util_1.isEmpty(bucketMaximums) ? 0 : bucketMaximums.length - 1;
                var baseColor = baseColors[i + boundingOffset];
                var color = customCategoryColors[value] || baseColor;
                var label = customCategoryLabels[value] || "";
                legendData.push(new CategoricalBin({ index: i, value: value, color: color, label: label, isHidden: customHiddenCategories[value] }));
            }
            return legendData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "valuesByEntity", {
        // Get values for the current year, without any color info yet
        get: function () {
            var _a = this, map = _a.map, dimension = _a.dimension, targetYear = _a.targetYear;
            if (!dimension)
                return {};
            var tolerance = map.tolerance;
            var years = dimension.years, values = dimension.values, entities = dimension.entities;
            var currentValues = {};
            for (var i = 0; i < values.length; i++) {
                var year = years[i];
                if (year < targetYear - tolerance || year > targetYear + tolerance)
                    continue;
                // Make sure we use the closest year within tolerance (favoring later years)
                var entityName = Util_3.entityNameForMap(entities[i]);
                var existing = currentValues[entityName];
                if (existing && Math.abs(existing.year - targetYear) < Math.abs(year - targetYear))
                    continue;
                currentValues[entityName] = {
                    entity: entities[i],
                    year: years[i],
                    value: values[i],
                };
            }
            return currentValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "choroplethData", {
        // Get the final data incorporating the binning colors
        get: function () {
            var _a = this, valuesByEntity = _a.valuesByEntity, legendData = _a.legendData;
            var choroplethData = {};
            Util_1.each(valuesByEntity, function (datum, entity) {
                var bin = Util_1.find(legendData, function (b) { return b.contains(datum); });
                if (!bin)
                    return;
                choroplethData[entity] = Util_1.extend({}, datum, {
                    color: bin.color,
                    highlightFillColor: bin.color
                });
            });
            return choroplethData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapData.prototype, "formatTooltipValue", {
        get: function () {
            var formatValueLong = this.dimension && this.dimension.formatValueLong;
            return formatValueLong ?
                function (d) {
                    if (Util_2.isString(d))
                        return d;
                    else
                        return formatValueLong(d);
                } : function () { return ""; };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "map", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "vardata", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "isReady", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "dimension", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "knownMapEntities", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "timelineYears", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "hasTimeline", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "targetYear", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "legendTitle", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "numAutoBins", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "numBins", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "customBucketLabels", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "minBinValue", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "binStepSizeDefault", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "binStepSize", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "manualBinMaximums", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "autoBinMaximums", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "bucketMaximums", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "defaultColorScheme", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "colorScheme", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "baseColors", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "categoricalValues", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "customCategoryColors", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "legendData", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "valuesByEntity", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "choroplethData", null);
    __decorate([
        mobx_1.computed
    ], MapData.prototype, "formatTooltipValue", null);
    return MapData;
}());
exports.default = MapData;
//# sourceMappingURL=MapData.js.map