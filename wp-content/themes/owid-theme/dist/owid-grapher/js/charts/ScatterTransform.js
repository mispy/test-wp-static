"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_scale_1 = require("d3-scale");
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var Util_2 = require("./Util");
var Util_3 = require("./Util");
var ColorSchemes_1 = require("./ColorSchemes");
// Responsible for translating chart configuration into the form
// of a scatter plot
var ScatterTransform = /** @class */ (function () {
    function ScatterTransform(chart) {
        this.useTimelineDomains = false;
        this.chart = chart;
    }
    Object.defineProperty(ScatterTransform.prototype, "isValidConfig", {
        get: function () {
            return Util_1.some(this.chart.dimensions, function (d) { return d.property === 'y'; }) && Util_1.some(this.chart.dimensions, function (d) { return d.property === 'x'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "failMessage", {
        get: function () {
            var filledDimensions = this.chart.data.filledDimensions;
            if (!Util_1.some(filledDimensions, function (d) { return d.property === 'y'; }))
                return "Missing Y axis variable";
            else if (!Util_1.some(filledDimensions, function (d) { return d.property === 'x'; }))
                return "Missing X axis variable";
            else if (Util_1.isEmpty(this.possibleEntities))
                return "No entities with data for both X and Y";
            else if (Util_1.isEmpty(this.timelineYears))
                return "No years with data for both X and Y";
            else if (Util_1.isEmpty(this.currentData))
                return "No matching data";
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yDimension", {
        // Scatterplot should have exactly one dimension for each of x and y
        // The y dimension is treated as the "primary" variable
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'y'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xDimension", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'x'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "colorDimension", {
        get: function () {
            return Util_1.find(this.chart.data.filledDimensions, function (d) { return d.property === 'color'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "axisDimensions", {
        get: function () {
            var dimensions = [];
            if (this.yDimension)
                dimensions.push(this.yDimension);
            if (this.xDimension)
                dimensions.push(this.xDimension);
            return dimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xOverrideYear", {
        // Possible to override the x axis dimension to target a special year
        // In case you want to graph say, education in the past and democracy today https://ourworldindata.org/grapher/correlation-between-education-and-democracy
        get: function () {
            return this.xDimension && this.xDimension.targetYear;
        },
        set: function (value) {
            this.xDimension.props.targetYear = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "isRelativeMode", {
        // In relative mode, the timeline scatterplot calculates changes relative
        // to the lower bound year rather than creating an arrow chart
        get: function () {
            return this.chart.props.stackMode === 'relative';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "canToggleRelative", {
        get: function () {
            return this.hasTimeline && !this.chart.props.hideRelativeToggle && this.xOverrideYear === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "hideBackgroundEntities", {
        // Unlike other charts, the scatterplot shows all available data by default, and the selection
        // is just for emphasis. But this behavior can be disabled.
        get: function () {
            return this.chart.addCountryMode === 'disabled';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "possibleEntities", {
        get: function () {
            var yEntities = this.yDimension ? this.yDimension.variable.entitiesUniq : [];
            var xEntities = this.xDimension ? this.xDimension.variable.entitiesUniq : [];
            return Util_1.intersection(yEntities, xEntities);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "excludedEntities", {
        get: function () {
            var _this = this;
            var entityIds = this.chart.props.excludedEntities || [];
            return entityIds.map(function (id) {
                var meta = _this.chart.vardata.entityMetaById[id];
                return meta && meta.name;
            }).filter(function (d) { return d; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "entitiesToShow", {
        get: function () {
            var _this = this;
            var entities = this.hideBackgroundEntities ? this.chart.data.selectedEntities : this.possibleEntities;
            if (this.chart.props.matchingEntitiesOnly && this.colorDimension)
                entities = Util_1.intersection(entities, this.colorDimension.variable.entitiesUniq);
            if (this.excludedEntities)
                entities = entities.filter(function (entity) { return !Util_1.includes(_this.excludedEntities, entity); });
            return entities;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "timelineYears", {
        get: function () {
            var yDimensionYears = this.yDimension ? this.yDimension.variable.yearsUniq : [];
            var xDimensionYears = this.xDimension ? this.xDimension.variable.yearsUniq : [];
            if (this.xOverrideYear !== undefined)
                return yDimensionYears;
            else
                return Util_1.intersection(yDimensionYears, xDimensionYears);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "minTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.min(this.timelineYears), 1900);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "maxTimelineYear", {
        get: function () {
            return Util_2.defaultTo(Util_1.max(this.timelineYears), 2000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "hasTimeline", {
        get: function () {
            return this.minTimelineYear !== this.maxTimelineYear && !this.chart.props.hideTimeline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "startYear", {
        get: function () {
            var _this = this;
            var minYear = this.chart.timeDomain[0];
            if (minYear !== undefined)
                return Util_2.defaultWith(Util_3.findClosest(this.timelineYears, minYear), function () { return _this.minTimelineYear; });
            else
                return this.maxTimelineYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "endYear", {
        get: function () {
            var _this = this;
            var maxYear = this.chart.timeDomain[1];
            if (maxYear !== undefined)
                return Util_2.defaultWith(Util_3.findClosest(this.timelineYears, maxYear), function () { return _this.maxTimelineYear; });
            else
                return this.maxTimelineYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "compareEndPointsOnly", {
        get: function () {
            return !!this.chart.props.compareEndPointsOnly;
        },
        set: function (value) {
            this.chart.props.compareEndPointsOnly = value || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yearsToCalculate", {
        get: function () {
            var _this = this;
            if (this.hasTimeline) {
                return this.timelineYears;
            }
            else {
                return this.timelineYears.filter(function (y) { return y >= _this.startYear && y <= _this.endYear; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "colorSchemeName", {
        get: function () {
            return Util_2.defaultTo(this.chart.props.baseColorScheme, "continents");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "colorSet", {
        get: function () {
            var _a = this, colorSchemeName = _a.colorSchemeName, colorDimension = _a.colorDimension;
            var colorScheme = ColorSchemes_1.default[colorSchemeName];
            var numColors = colorDimension ? colorDimension.variable.categoricalValues.length : 4;
            var colors = colorScheme.getColors(numColors);
            if (this.chart.props.invertColorScheme)
                colors.reverse();
            return colors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "colorScale", {
        get: function () {
            var colorDim = this.chart.data.dimensionsByField['color'];
            var colorScale = d3_scale_1.scaleOrdinal(this.colorSet);
            if (colorDim) {
                colorScale.domain(colorDim.variable.categoricalValues);
            }
            return colorScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "dataByEntityAndYear", {
        // Precompute the data transformation for every timeline year (so later animation is fast)
        // If there's no timeline, this uses the same structure but only computes for a single year
        get: function () {
            var _a = this, chart = _a.chart, yearsToCalculate = _a.yearsToCalculate, colorScale = _a.colorScale, entitiesToShow = _a.entitiesToShow, xOverrideYear = _a.xOverrideYear;
            var _b = chart.data, filledDimensions = _b.filledDimensions, keyColors = _b.keyColors;
            var validEntityLookup = Util_1.keyBy(entitiesToShow);
            var dataByEntityAndYear = new Map();
            // The data values
            filledDimensions.forEach(function (dimension) {
                var tolerance = (dimension.property === 'color' || dimension.property === 'size') ? Infinity : dimension.tolerance;
                yearsToCalculate.forEach(function (outputYear) {
                    for (var i = 0; i < dimension.years.length; i++) {
                        var year = dimension.years[i];
                        var value = dimension.values[i];
                        var entity = dimension.entities[i];
                        // Since scatterplots interrelate two variables via entity overlap, their datakeys are solely entity-based
                        var datakey = chart.data.keyFor(entity, 0);
                        if (!validEntityLookup[entity])
                            continue;
                        if ((dimension.property === 'x' || dimension.property === 'y') && !Util_1.isNumber(value))
                            continue;
                        var targetYear = (dimension.property === 'x' && xOverrideYear !== undefined) ? xOverrideYear : outputYear;
                        // Skip years that aren't within tolerance of the target
                        if (year < targetYear - tolerance || year > targetYear + tolerance)
                            continue;
                        var dataByYear = dataByEntityAndYear.get(entity);
                        if (!dataByYear) {
                            dataByYear = new Map();
                            dataByEntityAndYear.set(entity, dataByYear);
                        }
                        var series = dataByYear.get(outputYear);
                        if (!series) {
                            series = {
                                key: datakey,
                                label: chart.data.formatKey(datakey),
                                values: [{ year: outputYear, time: {} }],
                                color: keyColors[datakey] || "#000"
                            };
                            dataByYear.set(outputYear, series);
                        }
                        var d = series.values[0];
                        // Ensure we use the closest year to the target
                        var originYear = d.time[dimension.property];
                        if (isFinite(originYear) && Math.abs(originYear - targetYear) < Math.abs(year - targetYear))
                            continue;
                        d.time[dimension.property] = year;
                        if (dimension.property === 'color') {
                            series.color = keyColors[datakey] || colorScale(value);
                            series.isAutoColor = true;
                        }
                        else {
                            d[dimension.property] = value;
                        }
                    }
                });
            });
            // Exclude any with data for only one axis
            dataByEntityAndYear.forEach(function (dataByYear, entity) {
                var newDataByYear = new Map();
                dataByYear.forEach(function (series, year) {
                    var datum = series.values[0];
                    if (Util_1.has(datum, 'x') && Util_1.has(datum, 'y'))
                        newDataByYear.set(year, series);
                });
                dataByEntityAndYear.set(entity, newDataByYear);
            });
            return dataByEntityAndYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "allGroups", {
        get: function () {
            var allGroups = [];
            this.dataByEntityAndYear.forEach(function (dataByYear) {
                dataByYear.forEach(function (group) {
                    allGroups.push(group);
                });
            });
            return allGroups;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "allValues", {
        get: function () {
            var allValues = [];
            this.allGroups.forEach(function (group) { return allValues.push.apply(allValues, group.values); });
            return allValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "currentValues", {
        get: function () {
            var currentValues = [];
            this.currentData.forEach(function (group) { return currentValues.push.apply(currentValues, group.values); });
            return currentValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xDomainDefault", {
        // domains across the entire timeline
        get: function () {
            if (!this.useTimelineDomains) {
                return Util_3.domainExtent(this.currentValues.map(function (d) { return d.x; }), this.xScaleType);
            }
            if (this.isRelativeMode) {
                var minChange_1 = 0;
                var maxChange_1 = 0;
                this.dataByEntityAndYear.forEach(function (dataByYear) {
                    var values = Array.from(dataByYear.values()).map(function (g) { return g.values[0]; }).filter(function (v) { return v.x !== 0 && v.y !== 0; });
                    for (var i = 0; i < values.length; i++) {
                        var indexValue = values[i];
                        for (var j = i; j < values.length; j++) {
                            var targetValue = values[j];
                            var change = cagrX(indexValue, targetValue);
                            if (change < minChange_1)
                                minChange_1 = change;
                            if (change > maxChange_1)
                                maxChange_1 = change;
                        }
                    }
                });
                return [minChange_1, maxChange_1];
            }
            else {
                return Util_3.domainExtent(this.allValues.map(function (v) { return v.x; }), this.xScaleType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yDomainDefault", {
        get: function () {
            if (!this.useTimelineDomains) {
                return Util_3.domainExtent(this.currentValues.map(function (d) { return d.y; }), this.yScaleType);
            }
            if (this.isRelativeMode) {
                var minChange_2 = 0;
                var maxChange_2 = 0;
                this.dataByEntityAndYear.forEach(function (dataByYear) {
                    var values = Array.from(dataByYear.values()).map(function (g) { return g.values[0]; }).filter(function (v) { return v.x !== 0 && v.y !== 0; });
                    for (var i = 0; i < values.length; i++) {
                        var indexValue = values[i];
                        for (var j = i; j < values.length; j++) {
                            var targetValue = values[j];
                            var change = cagrY(indexValue, targetValue);
                            if (change < minChange_2)
                                minChange_2 = change;
                            if (change > maxChange_2)
                                maxChange_2 = change;
                        }
                    }
                });
                return [minChange_2, maxChange_2];
            }
            else {
                return Util_3.domainExtent(this.allValues.map(function (v) { return v.y; }), this.yScaleType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "sizeDomain", {
        get: function () {
            var sizeValues = [];
            this.allGroups.forEach(function (g) { return g.values[0].size && sizeValues.push(g.values[0].size); });
            if (sizeValues.length === 0)
                return [1, 1];
            else
                return Util_3.domainExtent(sizeValues, 'linear');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yScaleType", {
        get: function () {
            return this.isRelativeMode ? 'linear' : this.chart.yAxis.scaleType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yAxisLabelBase", {
        get: function () {
            return this.yDimension && this.yDimension.displayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yAxis", {
        get: function () {
            var _a = this, chart = _a.chart, yDomainDefault = _a.yDomainDefault, yDimension = _a.yDimension, isRelativeMode = _a.isRelativeMode, yScaleType = _a.yScaleType, yAxisLabelBase = _a.yAxisLabelBase;
            var props = {};
            props.scaleType = yScaleType;
            if (isRelativeMode) {
                props.domain = yDomainDefault;
                props.scaleTypeOptions = ['linear'];
                var label = yAxisLabelBase;
                if (label && label.length > 1) {
                    props.label = "Average annual change in " + (label.charAt(1).match(/[A-Z]/) ? label : label.charAt(0).toLowerCase() + label.slice(1));
                }
                props.tickFormat = function (v) { return Util_3.formatValue(v, { unit: "%" }); };
            }
            else {
                props.label = yAxisLabelBase;
                props.tickFormat = yDimension && yDimension.formatValueShort;
            }
            return Util_1.extend(chart.yAxis.toSpec({ defaultDomain: yDomainDefault }), props);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xScaleType", {
        get: function () {
            return this.isRelativeMode ? 'linear' : this.chart.xAxis.scaleType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xAxisLabelBase", {
        get: function () {
            var xDimName = this.xDimension && this.xDimension.displayName;
            if (this.xOverrideYear !== undefined)
                return xDimName + " in " + this.xOverrideYear;
            else
                return xDimName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xAxis", {
        get: function () {
            var _a = this, chart = _a.chart, xDomainDefault = _a.xDomainDefault, xDimension = _a.xDimension, isRelativeMode = _a.isRelativeMode, xScaleType = _a.xScaleType, xAxisLabelBase = _a.xAxisLabelBase;
            var props = {};
            props.scaleType = xScaleType;
            if (isRelativeMode) {
                props.domain = xDomainDefault;
                props.scaleTypeOptions = ['linear'];
                var label = xAxisLabelBase;
                if (label && label.length > 1) {
                    props.label = "Average annual change in " + (label.charAt(1).match(/[A-Z]/) ? label : label.charAt(0).toLowerCase() + label.slice(1));
                }
                props.tickFormat = function (v) { return Util_3.formatValue(v, { unit: "%" }); };
            }
            else {
                props.label = xAxisLabelBase;
                props.tickFormat = xDimension && xDimension.formatValueShort;
            }
            return Util_1.extend(chart.xAxis.toSpec({ defaultDomain: xDomainDefault }), props);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "yFormatTooltip", {
        get: function () {
            return (this.isRelativeMode || !this.yDimension) ? this.yAxis.tickFormat : this.yDimension.formatValueLong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "xFormatTooltip", {
        get: function () {
            return (this.isRelativeMode || !this.xDimension) ? this.xAxis.tickFormat : this.xDimension.formatValueLong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterTransform.prototype, "currentData", {
        get: function () {
            var _this = this;
            if (!this.chart.data.isReady)
                return [];
            var _a = this, dataByEntityAndYear = _a.dataByEntityAndYear, startYear = _a.startYear, endYear = _a.endYear, xScaleType = _a.xScaleType, yScaleType = _a.yScaleType, isRelativeMode = _a.isRelativeMode, compareEndPointsOnly = _a.compareEndPointsOnly, xOverrideYear = _a.xOverrideYear;
            var currentData = [];
            // As needed, join the individual year data points together to create an "arrow chart"
            dataByEntityAndYear.forEach(function (dataByYear) {
                var group;
                dataByYear.forEach(function (groupForYear, year) {
                    if (year < startYear || year > endYear)
                        return;
                    group = group || Util_1.extend({}, groupForYear, { values: [] });
                    group.values = group.values.concat(groupForYear.values);
                    // Use most recent size and color values
                    group.color = groupForYear.color || group.color;
                    if (Util_1.isNumber(groupForYear.values[0].size))
                        group.size = groupForYear.values[0].size;
                });
                if (group && group.values.length) {
                    group.size = Util_2.last(group.values.map(function (v) { return v.size; }).filter(function (s) { return Util_1.isNumber(s); }));
                    currentData.push(group);
                }
            });
            currentData = currentData.map(function (series) {
                // Only allow tolerance data to occur once in any given chart (no duplicate data points)
                // Prioritize the start and end years first, then the "true" year
                var values = series.values;
                values = Util_1.map(Util_1.groupBy(values, function (v) { return v.time.y; }), function (vals) {
                    return Util_1.sortBy(vals, function (v) { return (v.year === startYear || v.year === endYear) ? -Infinity : Math.abs(v.year - v.time.y); })[0];
                });
                if (xOverrideYear === undefined) {
                    values = Util_1.map(Util_1.groupBy(values, function (v) { return v.time.x; }), function (vals) {
                        return Util_1.sortBy(vals, function (v) { return (v.year === startYear || v.year === endYear) ? -Infinity : Math.abs(v.year - v.time.x); })[0];
                    });
                }
                // Don't allow values <= 0 for log scales
                if (yScaleType === 'log')
                    values = values.filter(function (v) { return v.y > 0; });
                if (xScaleType === 'log')
                    values = values.filter(function (v) { return v.x > 0; });
                // Don't allow values *equal* to zero for CAGR mode
                if (isRelativeMode)
                    values = values.filter(function (v) { return v.y !== 0 && v.x !== 0; });
                return Util_1.extend({}, series, {
                    values: values
                });
            });
            currentData = currentData.filter(function (series) {
                // No point trying to render series with no valid points!
                if (series.values.length === 0)
                    return false;
                // Hide lines which don't cover the full span
                if (_this.chart.props.hideLinesOutsideTolerance)
                    return Util_2.first(series.values).year === startYear && Util_2.last(series.values).year === endYear;
                return true;
            });
            if (compareEndPointsOnly) {
                currentData.forEach(function (series) {
                    series.values = series.values.length === 1 ? series.values : [Util_2.first(series.values), Util_2.last(series.values)];
                });
            }
            if (isRelativeMode) {
                currentData.forEach(function (series) {
                    var indexValue = Util_2.first(series.values);
                    var targetValue = Util_2.last(series.values);
                    series.values = [{
                            x: cagrX(indexValue, targetValue),
                            y: cagrY(indexValue, targetValue),
                            size: targetValue.size,
                            year: targetValue.year,
                            time: {
                                y: targetValue.time.y,
                                x: targetValue.time.x,
                                span: [indexValue.time.y, targetValue.time.y]
                            }
                        }];
                });
            }
            return currentData;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable.ref
    ], ScatterTransform.prototype, "useTimelineDomains", void 0);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "isValidConfig", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "failMessage", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yDimension", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xDimension", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "colorDimension", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "axisDimensions", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xOverrideYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "isRelativeMode", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "canToggleRelative", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "hideBackgroundEntities", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "possibleEntities", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "excludedEntities", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "entitiesToShow", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "timelineYears", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "minTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "maxTimelineYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "hasTimeline", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "startYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "endYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "compareEndPointsOnly", null);
    __decorate([
        mobx_1.computed.struct
    ], ScatterTransform.prototype, "yearsToCalculate", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "colorSchemeName", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "colorSet", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "colorScale", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "dataByEntityAndYear", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "allGroups", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "allValues", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "currentValues", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yDomainDefault", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "sizeDomain", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yScaleType", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yAxisLabelBase", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yAxis", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xScaleType", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xAxisLabelBase", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xAxis", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "yFormatTooltip", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "xFormatTooltip", null);
    __decorate([
        mobx_1.computed
    ], ScatterTransform.prototype, "currentData", null);
    return ScatterTransform;
}());
exports.default = ScatterTransform;
function cagrX(indexValue, targetValue) {
    if (targetValue.year - indexValue.year === 0)
        return 0;
    else {
        var frac = targetValue.x / indexValue.x;
        if (frac < 0)
            return -(Math.pow(-frac, 1 / (targetValue.year - indexValue.year)) - 1) * 100;
        else
            return (Math.pow(frac, 1 / (targetValue.year - indexValue.year)) - 1) * 100;
    }
}
function cagrY(indexValue, targetValue) {
    if (targetValue.year - indexValue.year === 0)
        return 0;
    else {
        var frac = targetValue.y / indexValue.y;
        if (frac < 0)
            return -(Math.pow(-frac, 1 / (targetValue.year - indexValue.year)) - 1) * 100;
        else
            return (Math.pow(frac, 1 / (targetValue.year - indexValue.year)) - 1) * 100;
    }
}
//# sourceMappingURL=ScatterTransform.js.map