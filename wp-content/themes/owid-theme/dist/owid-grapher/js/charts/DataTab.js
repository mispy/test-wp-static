"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
function csvEscape(value) {
    var valueStr = Util_1.toString(value);
    if (Util_1.includes(valueStr, ","))
        return "\"" + value.replace(/\"/g, "\"\"") + "\"";
    else
        return value;
}
// Client-side data export from chart
var DataTab = /** @class */ (function (_super) {
    __extends(DataTab, _super);
    function DataTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataTab.prototype, "bounds", {
        get: function () {
            return this.props.bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTab.prototype, "csvBlob", {
        // Here's where the actual CSV is made
        get: function () {
            var chart = this.props.chart;
            var vardata = chart.vardata;
            var dimensions = chart.data.filledDimensions.filter(function (d) { return d.property !== 'color'; });
            var entitiesUniq = Util_1.sortBy(Util_1.uniq(Util_1.flatten(dimensions.map(function (d) { return d.entitiesUniq; }))));
            var yearsUniq = Util_1.sortBy(Util_1.uniq(Util_1.flatten(dimensions.map(function (d) { return d.yearsUniq; }))));
            var rows = [];
            var titleRow = ["Entity", "Code", "Year"];
            dimensions.forEach(function (dim) {
                titleRow.push(csvEscape(dim.fullNameWithUnit));
            });
            rows.push(titleRow.join(","));
            entitiesUniq.forEach(function (entity) {
                yearsUniq.forEach(function (year) {
                    var row = [entity, vardata.entityMetaByKey[entity].code || "", year];
                    var rowHasSomeValue = false;
                    dimensions.forEach(function (dim) {
                        var valueByYear = dim.valueByEntityAndYear.get(entity);
                        var value = valueByYear ? valueByYear.get(year) : null;
                        if (value == null)
                            row.push("");
                        else {
                            row.push(value);
                            rowHasSomeValue = true;
                        }
                    });
                    // Only add rows which actually have some data in them
                    if (rowHasSomeValue)
                        rows.push(row.map(csvEscape).join(","));
                });
            });
            return new Blob([rows.join("\n")], { type: "text/csv" });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTab.prototype, "csvDataUri", {
        get: function () {
            return window.URL.createObjectURL(this.csvBlob);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTab.prototype, "csvFilename", {
        get: function () {
            return this.props.chart.data.slug + ".csv";
        },
        enumerable: true,
        configurable: true
    });
    // IE11 compatibility
    DataTab.prototype.onDownload = function (ev) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(this.csvBlob, this.csvFilename);
            ev.preventDefault();
        }
    };
    DataTab.prototype.render = function () {
        var _a = this, bounds = _a.bounds, csvDataUri = _a.csvDataUri, csvFilename = _a.csvFilename;
        return React.createElement("div", { className: "dataTab", style: Util_1.extend(bounds.toCSS(), { position: 'absolute' }) },
            React.createElement("div", { style: { "max-width": "100%" } },
                React.createElement("p", null, "Download a CSV file containing all data used in this visualization:"),
                React.createElement("a", { href: csvDataUri, download: csvFilename, className: "btn btn-primary", target: "_blank", onClick: this.onDownload },
                    React.createElement("i", { className: "fa fa-download" }),
                    " ",
                    csvFilename)));
    };
    __decorate([
        mobx_1.computed
    ], DataTab.prototype, "bounds", null);
    __decorate([
        mobx_1.computed
    ], DataTab.prototype, "csvBlob", null);
    __decorate([
        mobx_1.computed
    ], DataTab.prototype, "csvDataUri", null);
    __decorate([
        mobx_1.computed
    ], DataTab.prototype, "csvFilename", null);
    __decorate([
        mobx_1.action.bound
    ], DataTab.prototype, "onDownload", null);
    DataTab = __decorate([
        mobx_react_1.observer
    ], DataTab);
    return DataTab;
}(React.Component));
exports.default = DataTab;
//# sourceMappingURL=DataTab.js.map