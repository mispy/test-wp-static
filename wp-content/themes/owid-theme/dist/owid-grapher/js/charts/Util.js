"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.isEqual = lodash_1.isEqual;
exports.map = lodash_1.map;
exports.sortBy = lodash_1.sortBy;
exports.each = lodash_1.each;
exports.keys = lodash_1.keys;
exports.trim = lodash_1.trim;
exports.isNumber = lodash_1.isNumber;
exports.filter = lodash_1.filter;
exports.extend = lodash_1.extend;
exports.isEmpty = lodash_1.isEmpty;
exports.isFinite = lodash_1.isFinite;
exports.some = lodash_1.some;
exports.every = lodash_1.every;
exports.min = lodash_1.min;
exports.max = lodash_1.max;
exports.uniq = lodash_1.uniq;
exports.cloneDeep = lodash_1.cloneDeep;
exports.sum = lodash_1.sum;
exports.find = lodash_1.find;
exports.identity = lodash_1.identity;
exports.union = lodash_1.union;
exports.debounce = lodash_1.debounce;
exports.includes = lodash_1.includes;
exports.toString = lodash_1.toString;
exports.isString = lodash_1.isString;
exports.keyBy = lodash_1.keyBy;
exports.values = lodash_1.values;
exports.flatten = lodash_1.flatten;
exports.groupBy = lodash_1.groupBy;
exports.reverse = lodash_1.reverse;
exports.clone = lodash_1.clone;
exports.reduce = lodash_1.reduce;
exports.noop = lodash_1.noop;
exports.floor = lodash_1.floor;
exports.ceil = lodash_1.ceil;
exports.round = lodash_1.round;
exports.toArray = lodash_1.toArray;
exports.throttle = lodash_1.throttle;
exports.has = lodash_1.has;
exports.intersection = lodash_1.intersection;
exports.uniqWith = lodash_1.uniqWith;
exports.without = lodash_1.without;
exports.uniqBy = lodash_1.uniqBy;
exports.capitalize = lodash_1.capitalize;
exports.sample = lodash_1.sample;
exports.sampleSize = lodash_1.sampleSize;
exports.pick = lodash_1.pick;
exports.difference = lodash_1.difference;
exports.sortedUniq = lodash_1.sortedUniq;
var d3_format_1 = require("d3-format");
var d3_array_1 = require("d3-array");
var Vector2_1 = require("./Vector2");
function getRelativeMouse(node, event) {
    var clientX, clientY;
    if (event.clientX != null) {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    else {
        clientX = event.targetTouches[0].clientX;
        clientY = event.targetTouches[0].clientY;
    }
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = clientX, point.y = clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return new Vector2_1.default(point.x, point.y);
    }
    var rect = node.getBoundingClientRect();
    return new Vector2_1.default(clientX - rect.left - node.clientLeft, clientY - rect.top - node.clientTop);
}
exports.getRelativeMouse = getRelativeMouse;
// Make an arbitrary string workable as a css class name
function makeSafeForCSS(name) {
    return name.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c === 32)
            return '-';
        if (c === 95)
            return '_';
        if (c >= 65 && c <= 90)
            return s;
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
}
exports.makeSafeForCSS = makeSafeForCSS;
// Transform entity name to match counterpart in world.ids.json
// Covers e.g. Cote d'Ivoire -> Cote_d_Ivoire
// Also removes non-ascii characters which may break datamaps
function entityNameForMap(name) {
    return makeSafeForCSS(name.replace(/[ '&:\(\)\/]/g, "_"));
}
exports.entityNameForMap = entityNameForMap;
function formatYear(year) {
    if (isNaN(year)) {
        console.error("Invalid year '" + year + "'");
        return "";
    }
    if (year < 0)
        return Math.abs(year) + " BCE";
    else
        return year.toString();
}
exports.formatYear = formatYear;
function numberOnly(value) {
    var num = parseFloat(value);
    if (isNaN(num))
        return undefined;
    else
        return num;
}
exports.numberOnly = numberOnly;
// Bind a "mobx component"
// Still working out exactly how this pattern goes
function component(current, klass, props) {
    var instance = current || new klass();
    lodash_1.each(lodash_1.keys(props), function (key) {
        instance[key] = props[key];
    });
    return instance;
}
exports.component = component;
function formatValue(value, options) {
    var noTrailingZeroes = true;
    var maxDecimalPlaces = defaultTo(options.maxDecimalPlaces, 2);
    var unit = defaultTo(options.unit, "");
    var isNoSpaceUnit = unit[0] === "%";
    var output = value.toString();
    var absValue = Math.abs(value);
    if (!isNoSpaceUnit && absValue >= 1e6) {
        if (absValue >= 1e12)
            output = formatValue(value / 1e12, lodash_1.extend({}, options, { unit: "trillion" }));
        else if (absValue >= 1e9)
            output = formatValue(value / 1e9, lodash_1.extend({}, options, { unit: "billion" }));
        else if (absValue >= 1e6)
            output = formatValue(value / 1e6, lodash_1.extend({}, options, { unit: "million" }));
    }
    else {
        if (maxDecimalPlaces >= 0 && value % 1 !== 0) {
            var fixed = Math.min(20, maxDecimalPlaces);
            output = d3_format_1.format(",." + fixed + "f")(value);
        }
        else {
            output = d3_format_1.format(",")(value);
        }
        if (noTrailingZeroes) {
            var m = output.match(/([0-9,-]+.[0-9,]*?)0*$/);
            if (m)
                output = m[1];
            if (output[output.length - 1] === ".")
                output = output.slice(0, output.length - 1);
        }
    }
    if (unit === "$" || unit === "£")
        output = unit + output;
    else if (isNoSpaceUnit) {
        output = output + unit;
    }
    else if (unit.length > 0) {
        output = output + " " + unit;
    }
    return output;
}
exports.formatValue = formatValue;
function defaultTo(value, defaultValue) {
    if (value == null)
        return defaultValue;
    else
        return value;
}
exports.defaultTo = defaultTo;
function first(arr) { return arr[0]; }
exports.first = first;
function last(arr) { return arr[arr.length - 1]; }
exports.last = last;
function getQueryParams(queryStr) {
    queryStr = queryStr || window.location.search;
    if (queryStr[0] === "?")
        queryStr = queryStr.substring(1);
    var querySplit = lodash_1.filter(queryStr.split("&"), function (s) { return !lodash_1.isEmpty(s); });
    var params = {};
    for (var _i = 0, querySplit_1 = querySplit; _i < querySplit_1.length; _i++) {
        var param = querySplit_1[_i];
        var pair = param.split("=");
        params[pair[0]] = pair[1];
    }
    console.log(params);
    return params;
}
exports.getQueryParams = getQueryParams;
function queryParamsToStr(params) {
    var newQueryStr = "";
    lodash_1.each(params, function (v, k) {
        if (v === undefined)
            return;
        if (lodash_1.isEmpty(newQueryStr))
            newQueryStr += "?";
        else
            newQueryStr += "&";
        newQueryStr += k + '=' + v;
    });
    return newQueryStr;
}
exports.queryParamsToStr = queryParamsToStr;
function setQueryVariable(key, val) {
    var params = getQueryParams();
    if (val === null || val === "") {
        delete params[key];
    }
    else {
        params[key] = val;
    }
    setQueryStr(queryParamsToStr(params));
}
exports.setQueryVariable = setQueryVariable;
function setQueryStr(str) {
    history.replaceState(null, document.title, window.location.pathname + str + window.location.hash);
}
exports.setQueryStr = setQueryStr;
// Calculate the extents of a set of numbers, with safeguards for log scales
function domainExtent(numValues, scaleType) {
    var filterValues = scaleType === 'log' ? numValues.filter(function (v) { return v > 0; }) : numValues;
    var _a = d3_array_1.extent(filterValues), minValue = _a[0], maxValue = _a[1];
    if (lodash_1.isFinite(minValue) && lodash_1.isFinite(maxValue) && minValue !== maxValue) {
        return [minValue, maxValue];
    }
    else {
        return scaleType === 'log' ? [1, 100] : [-1, 1];
    }
}
exports.domainExtent = domainExtent;
// Take an arbitrary string and turn it into a nice url slug
function slugify(s) {
    s = s.toLowerCase().replace(/\s*\*.+\*/, '').replace(/[^\w- ]+/g, '');
    return lodash_1.trim(s).replace(/ +/g, '-');
}
exports.slugify = slugify;
function findClosest(numValues, targetValue) {
    return lodash_1.sortBy(numValues, function (value) { return Math.abs(value - targetValue); })[0];
}
exports.findClosest = findClosest;
// Unique number for this execution context
// Useful for coordinating between embeds to avoid conflicts in their ids
var n = 0;
function guid() {
    n += 1;
    return n;
}
exports.guid = guid;
// Take an array of points and make it into an SVG path specification string
function pointsToPath(points) {
    var path = "";
    for (var i = 0; i < points.length; i++) {
        if (i === 0)
            path += "M" + points[i][0] + " " + points[i][1];
        else
            path += "L" + points[i][0] + " " + points[i][1];
    }
    return path;
}
exports.pointsToPath = pointsToPath;
function defaultWith(value, defaultFunc) {
    return value !== undefined ? value : defaultFunc();
}
exports.defaultWith = defaultWith;
function keysOf(obj) {
    return Object.keys(obj);
}
exports.keysOf = keysOf;
//# sourceMappingURL=Util.js.map