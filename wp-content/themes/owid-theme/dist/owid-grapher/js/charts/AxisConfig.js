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
// Represents the actual entered configuration state in the editor
var AxisConfigProps = /** @class */ (function () {
    function AxisConfigProps() {
        this.min = undefined;
        this.max = undefined;
        this.scaleType = 'linear';
        this.canChangeScaleType = undefined;
    }
    __decorate([
        mobx_1.observable.ref
    ], AxisConfigProps.prototype, "min", void 0);
    __decorate([
        mobx_1.observable.ref
    ], AxisConfigProps.prototype, "max", void 0);
    __decorate([
        mobx_1.observable.ref
    ], AxisConfigProps.prototype, "scaleType", void 0);
    __decorate([
        mobx_1.observable.ref
    ], AxisConfigProps.prototype, "canChangeScaleType", void 0);
    __decorate([
        mobx_1.observable.ref
    ], AxisConfigProps.prototype, "labelDistance", void 0);
    return AxisConfigProps;
}());
exports.AxisConfigProps = AxisConfigProps;
// Interface used to access configuration by charts
var AxisConfig = /** @class */ (function () {
    function AxisConfig(props) {
        this.props = props;
    }
    Object.defineProperty(AxisConfig.prototype, "min", {
        // A log scale domain cannot have values <= 0, so we
        // double check here
        get: function () {
            if (this.scaleType === 'log' && (this.props.min || 0) <= 0) {
                return undefined;
            }
            else {
                return this.props.min;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisConfig.prototype, "max", {
        get: function () {
            if (this.scaleType === 'log' && (this.props.max || 0) <= 0)
                return undefined;
            else
                return this.props.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisConfig.prototype, "scaleType", {
        get: function () { return this.props.scaleType; },
        set: function (scaleType) { this.props.scaleType = scaleType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisConfig.prototype, "canChangeScaleType", {
        get: function () { return Util_1.defaultTo(this.props.canChangeScaleType, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisConfig.prototype, "domain", {
        get: function () {
            return [this.min, this.max];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisConfig.prototype, "scaleTypeOptions", {
        get: function () {
            if (this.canChangeScaleType) {
                return ['linear', 'log'];
            }
            else {
                return [this.scaleType];
            }
        },
        enumerable: true,
        configurable: true
    });
    // Convert axis configuration to a finalized axis spec by supplying
    // any needed information calculated from the data
    AxisConfig.prototype.toSpec = function (_a) {
        var defaultDomain = _a.defaultDomain;
        return {
            label: "",
            tickFormat: function (d) { return "" + d; },
            domain: [Math.min(Util_1.defaultTo(this.domain[0], Infinity), defaultDomain[0]), Math.max(Util_1.defaultTo(this.domain[1], -Infinity), defaultDomain[1])],
            scaleType: this.scaleType,
            scaleTypeOptions: this.scaleTypeOptions
        };
    };
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "min", null);
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "max", null);
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "scaleType", null);
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "canChangeScaleType", null);
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "domain", null);
    __decorate([
        mobx_1.computed
    ], AxisConfig.prototype, "scaleTypeOptions", null);
    return AxisConfig;
}());
exports.default = AxisConfig;
//# sourceMappingURL=AxisConfig.js.map