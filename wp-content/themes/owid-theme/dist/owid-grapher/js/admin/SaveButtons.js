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
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var SaveButtons = /** @class */ (function (_super) {
    __extends(SaveButtons, _super);
    function SaveButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveButtons.prototype.onSaveChart = function () {
        this.props.editor.saveChart();
    };
    SaveButtons.prototype.onSaveAsNew = function () {
        this.props.editor.saveAsNewChart();
    };
    SaveButtons.prototype.onPublishToggle = function () {
        if (this.props.editor.chart.isPublished)
            this.props.editor.unpublishChart();
        else
            this.props.editor.publishChart();
    };
    SaveButtons.prototype.render = function () {
        var editor = this.props.editor;
        var chart = editor.chart;
        return React.createElement("div", { className: "SaveButtons" },
            React.createElement("button", { className: "btn btn-success", onClick: this.onSaveChart }, chart.isPublished ? "Update chart" : "Save draft"),
            " ",
            React.createElement("button", { className: "btn btn-secondary", onClick: this.onSaveAsNew }, "Save as new"),
            " ",
            React.createElement("button", { className: "btn btn-danger", onClick: this.onPublishToggle }, chart.isPublished ? "Unpublish" : "Publish"));
        /*return <section className="form-section-submit">
            <button type="button" className="btn btn-lg btn-success btn-primary" onClick={this.onSaveChart}>
                {editor.isSaved ? "Saved" :
                    chart.isPublished ? "Update chart" : "Save draft"}
            </button>
            {" "}<button type="button" className="btn btn-lg btn-primary" onClick={this.onSaveAsNew}>Save as new</button>
            {" "}<button type="button" className="btn btn-lg btn-danger" onClick={this.onPublishToggle}>{chart.isPublished ? "Unpublish" : "Publish"}</button>
        </section>*/
    };
    __decorate([
        mobx_1.action.bound
    ], SaveButtons.prototype, "onSaveChart", null);
    __decorate([
        mobx_1.action.bound
    ], SaveButtons.prototype, "onSaveAsNew", null);
    __decorate([
        mobx_1.action.bound
    ], SaveButtons.prototype, "onPublishToggle", null);
    SaveButtons = __decorate([
        mobx_react_1.observer
    ], SaveButtons);
    return SaveButtons;
}(React.Component));
exports.default = SaveButtons;
//# sourceMappingURL=SaveButtons.js.map