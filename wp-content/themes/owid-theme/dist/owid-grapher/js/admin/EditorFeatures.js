"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
// Responsible for determining what parts of the editor should be shown, based on the
// type of chart being edited
var EditorFeatures = /** @class */ (function () {
    function EditorFeatures(editor) {
        this.editor = editor;
    }
    Object.defineProperty(EditorFeatures.prototype, "chart", {
        get: function () {
            return this.editor.chart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "customYAxis", {
        get: function () {
            return !this.chart.isStackedArea && !this.chart.isDiscreteBar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "customXAxis", {
        get: function () {
            return this.chart.isScatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "timeDomain", {
        get: function () { return !this.chart.isDiscreteBar; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "hideLegend", {
        get: function () {
            return this.chart.isLineChart || this.chart.isStackedArea;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "stackedArea", {
        get: function () {
            return this.chart.isStackedArea;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "entityType", {
        get: function () {
            return (!this.chart.isScatter && this.chart.addCountryMode === 'add-country') || this.chart.addCountryMode === 'change-country';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFeatures.prototype, "relativeModeToggle", {
        get: function () {
            return this.chart.isStackedArea || (this.chart.isScatter && this.chart.scatter.hasTimeline);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "customYAxis", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "customXAxis", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "timeDomain", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "hideLegend", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "stackedArea", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "entityType", null);
    __decorate([
        mobx_1.computed
    ], EditorFeatures.prototype, "relativeModeToggle", null);
    return EditorFeatures;
}());
exports.default = EditorFeatures;
//# sourceMappingURL=EditorFeatures.js.map