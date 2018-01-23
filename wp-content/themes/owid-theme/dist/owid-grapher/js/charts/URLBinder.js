"use strict";
/* URLBinder.ts
 * ================
 *
 * This component is responsible for handling data binding between the
 * the chart and url parameters, to enable nice linking support
 * for specific countries and years.
 *
 */
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
var Util_3 = require("./Util");
var URLBinder = /** @class */ (function () {
    function URLBinder(chart, queryStr) {
        var _this = this;
        this.chartQueryStr = "?";
        this.mapQueryStr = "?";
        this.debounceMode = false;
        this.chart = chart;
        this.origChartProps = mobx_1.toJS(chart.props);
        if (!chart.isNode && !chart.isEmbed) {
            // Only work with the actual url if we're not an embed
            this.populateFromURL(Util_3.getQueryParams());
            // There is a surprisingly considerable performance overhead to updating the url
            // while animating, so we debounce to allow e.g. smoother timelines
            var pushParams_1 = function () { return Util_3.setQueryStr(Util_3.queryParamsToStr(_this.params)); };
            var debouncedPushParams_1 = Util_1.debounce(pushParams_1, 100);
            mobx_1.reaction(function () { return _this.params; }, function () { return _this.debounceMode ? debouncedPushParams_1() : pushParams_1(); });
        }
        else if (queryStr !== undefined) {
            this.populateFromURL(Util_3.getQueryParams(queryStr));
        }
    }
    Object.defineProperty(URLBinder.prototype, "origChart", {
        get: function () {
            if (App.isEditor) {
                // In the editor, the current chart state is always the "original" state
                return mobx_1.toJS(this.chart.props);
            }
            else {
                return this.origChartProps;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "params", {
        // Autocomputed url params to reflect difference between current chart state
        // and original config state
        get: function () {
            var params = {};
            var _a = this, chart = _a.chart, origChart = _a.origChart;
            params.tab = chart.props.tab === origChart.tab ? undefined : chart.props.tab;
            params.overlay = chart.props.overlay === origChart.overlay ? undefined : chart.props.overlay;
            params.xScale = chart.props.xAxis.scaleType === origChart.xAxis.scaleType ? undefined : chart.xAxis.scaleType;
            params.yScale = chart.props.yAxis.scaleType === origChart.yAxis.scaleType ? undefined : chart.yAxis.scaleType;
            params.stackMode = chart.props.stackMode === origChart.stackMode ? undefined : chart.props.stackMode;
            params.endpointsOnly = chart.props.compareEndPointsOnly === origChart.compareEndPointsOnly ? undefined : (chart.props.compareEndPointsOnly ? "1" : "0");
            params.year = this.yearParam;
            params.time = this.timeParam;
            params.country = this.countryParam;
            if (chart.props.map && origChart.map && chart.props.map.projection !== origChart.map.projection)
                params.region = chart.props.map.projection;
            return params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "queryStr", {
        get: function () {
            return Util_3.queryParamsToStr(this.params);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "baseUrl", {
        get: function () {
            if (this.chart.isPublished)
                return Global.rootUrl + "/" + this.chart.data.slug;
            else
                return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "canonicalUrl", {
        // Get the full url representing the canonical location of this chart state
        get: function () {
            return this.baseUrl ? this.baseUrl + this.queryStr : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "yearParam", {
        get: function () {
            var _a = this, chart = _a.chart, origChart = _a.origChart;
            if (chart.props.map && origChart.map && chart.props.map.targetYear !== origChart.map.targetYear) {
                return Util_1.toString(chart.props.map.targetYear);
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "timeParam", {
        get: function () {
            var _a = this, chart = _a.chart, origChart = _a.origChart;
            var _b = chart.props, minTime = _b.minTime, maxTime = _b.maxTime;
            if (minTime !== origChart.minTime || maxTime !== origChart.maxTime) {
                if (Util_1.isFinite(minTime) && Util_1.isFinite(maxTime) && minTime !== maxTime) {
                    return minTime + ".." + maxTime;
                }
                else if (Util_1.isNumber(minTime)) {
                    return Util_1.toString(minTime);
                }
                else {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URLBinder.prototype, "countryParam", {
        get: function () {
            var _a = this, chart = _a.chart, origChart = _a.origChart;
            if (chart.data.isReady && JSON.stringify(chart.props.selectedData) !== JSON.stringify(origChart.selectedData)) {
                return Util_1.uniq(chart.data.selectedKeys.map(function (k) { return chart.data.lookupKey(k).shortCode; }).map(encodeURIComponent)).join("+");
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set e.g. &shown=Africa when the user selects Africa on a stacked area chartView or other
     * toggle-based legend chartView.
     */
    /*updateLegendKeys() {
        var activeLegendKeys = chartView.model.get("activeLegendKeys");
        if (activeLegendKeys === null)
            setQueryVariable("shown", null);
        else {
            var keys = map(activeLegendKeys, function(key) {
                return encodeURIComponent(key);
            });
            setQueryVariable("shown", keys.join("+"));
        }
    }*/
    /**
     * Apply any url parameters on chartView startup
     */
    URLBinder.prototype.populateFromURL = function (params) {
        var chart = this.chart;
        // Set tab if specified
        var tab = params.tab;
        if (tab) {
            if (!Util_1.includes(chart.availableTabs, tab))
                console.error("Unexpected tab: " + tab);
            else
                chart.props.tab = tab;
        }
        var overlay = params.overlay;
        if (overlay) {
            if (!Util_1.includes(chart.availableTabs, overlay))
                console.error("Unexpected overlay: " + overlay);
            else
                chart.props.overlay = overlay;
        }
        // Stack mode for bar and stacked area charts
        chart.props.stackMode = Util_2.defaultTo(params.stackMode, chart.props.stackMode);
        // Axis scale mode
        var xScaleType = params.xScale;
        if (xScaleType) {
            if (xScaleType === 'linear' || xScaleType === 'log')
                chart.xAxis.scaleType = xScaleType;
            else
                console.error("Unexpected xScale: " + xScaleType);
        }
        var yScaleType = params.yScale;
        if (yScaleType) {
            if (yScaleType === 'linear' || yScaleType === 'log')
                chart.yAxis.scaleType = yScaleType;
            else
                console.error("Unexpected xScale: " + yScaleType);
        }
        var time = params.time;
        if (time !== undefined) {
            var m = time.match(/^(\d+)\.\.(\d+)$/);
            if (m) {
                chart.timeDomain = [parseInt(m[1]), parseInt(m[2])];
            }
            else {
                chart.timeDomain = [parseInt(time), parseInt(time)];
            }
        }
        var endpointsOnly = params.endpointsOnly;
        if (endpointsOnly !== undefined) {
            chart.props.compareEndPointsOnly = endpointsOnly === "1" ? true : undefined;
        }
        // Map stuff below
        if (chart.props.map) {
            var year = parseInt(params.year || "");
            if (!isNaN(year)) {
                chart.props.map.targetYear = year;
            }
            var region = params.region;
            if (region !== undefined) {
                chart.props.map.projection = region;
            }
        }
        // Selected countries -- we can't actually look these up until we have the data
        var country = params.country;
        mobx_1.when(function () { return chart.data.isReady; }, function () {
            mobx_1.runInAction(function () {
                if (country) {
                    var entityCodes_1 = country.split('+').map(decodeURIComponent);
                    if (chart.data.canChangeEntity) {
                        chart.data.availableEntities.forEach(function (entity) {
                            var entityMeta = chart.vardata.entityMetaByKey[entity];
                            if (entityMeta.code === entityCodes_1[0] || entityMeta.name === entityCodes_1[0])
                                chart.data.switchEntity(entityMeta.id);
                        });
                    }
                    else {
                        chart.data.selectedKeys = Util_1.filter(chart.data.availableKeys, function (datakey) {
                            var meta = chart.data.lookupKey(datakey);
                            var entityMeta = chart.vardata.entityMetaByKey[meta.entity];
                            return Util_1.includes(entityCodes_1, meta.shortCode) || Util_1.includes(entityCodes_1, entityMeta.code) || Util_1.includes(entityCodes_1, entityMeta.name);
                        });
                    }
                }
            });
        });
        // Set shown legend keys for chartViews with toggleable series
        /*var shown = params.shown;
         if (isString(shown)) {
             var keys = map(shown.split("+"), function(key) {
                 return decodeURIComponent(key);
             });

             chart.activeLegendKeys = keys
         }*/
    };
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "origChart", null);
    __decorate([
        mobx_1.computed.struct
    ], URLBinder.prototype, "params", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "queryStr", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "baseUrl", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "canonicalUrl", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "yearParam", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "timeParam", null);
    __decorate([
        mobx_1.computed
    ], URLBinder.prototype, "countryParam", null);
    return URLBinder;
}());
exports.default = URLBinder;
//# sourceMappingURL=URLBinder.js.map