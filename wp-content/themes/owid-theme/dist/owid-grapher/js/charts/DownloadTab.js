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
var DownloadTab = /** @class */ (function (_super) {
    __extends(DownloadTab, _super);
    function DownloadTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isReady = false;
        return _this;
    }
    Object.defineProperty(DownloadTab.prototype, "targetWidth", {
        get: function () { return this.props.chart.idealBounds.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "targetHeight", {
        get: function () { return this.props.chart.idealBounds.height; },
        enumerable: true,
        configurable: true
    });
    DownloadTab.prototype.export = function () {
        var _this = this;
        if (!HTMLCanvasElement.prototype.toBlob) {
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function (callback, type, quality) {
                    var binStr = atob(this.toDataURL(type, quality).split(',')[1]);
                    var len = binStr.length;
                    var arr = new Uint8Array(len);
                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }
                    callback(new Blob([arr], { type: type || 'image/png' }));
                }
            });
        }
        var _a = this, targetWidth = _a.targetWidth, targetHeight = _a.targetHeight;
        var chart = this.props.chart;
        chart.isLocalExport = true;
        var staticSVG = chart.staticSVG;
        chart.isLocalExport = false;
        this.svgBlob = new Blob([staticSVG], { type: "image/svg+xml;charset=utf-8" });
        this.svgBlobUrl = URL.createObjectURL(this.svgBlob);
        var reader = new FileReader();
        reader.onload = function (ev) {
            _this.svgDataUri = ev.target.result;
            // Client-side SVG => PNG export. Somewhat experimental, so there's a lot of cross-browser fiddling and fallbacks here.
            var img = new Image();
            img.onload = function () {
                try {
                    var canvas = document.createElement("canvas");
                    // We draw the chart at 4x res then scale it down again -- much better text quality
                    canvas.width = targetWidth * 4;
                    canvas.height = targetHeight * 4;
                    var ctx = canvas.getContext("2d", { alpha: false });
                    ctx.imageSmoothingEnabled = false;
                    ctx.setTransform(4, 0, 0, 4, 0, 0);
                    ctx.drawImage(img, 0, 0);
                    _this.pngDataUri = canvas.toDataURL("image/png");
                    canvas.toBlob(function (blob) {
                        _this.pngBlob = blob;
                        _this.pngBlobUrl = URL.createObjectURL(blob);
                        _this.isReady = true;
                    });
                }
                catch (e) {
                    console.error(e);
                    _this.isReady = true;
                }
            };
            img.onerror = function (err) {
                console.error(JSON.stringify(err));
                _this.isReady = true;
            };
            img.src = _this.svgDataUri;
        };
        reader.readAsDataURL(this.svgBlob);
    };
    Object.defineProperty(DownloadTab.prototype, "fallbackPngUrl", {
        get: function () {
            return this.props.chart.url.baseUrl + ".png" + this.props.chart.url.queryStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "baseFilename", {
        get: function () { return this.props.chart.data.slug; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "svgPreviewUrl", {
        get: function () { return this.svgDataUri; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "pngPreviewUrl", {
        get: function () { return this.pngDataUri || this.fallbackPngUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "svgDownloadUrl", {
        get: function () { return this.svgBlobUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "pngDownloadUrl", {
        get: function () { return this.pngBlobUrl || this.pngDataUri || this.fallbackPngUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadTab.prototype, "isPortrait", {
        get: function () {
            return this.props.bounds.height > this.props.bounds.width;
        },
        enumerable: true,
        configurable: true
    });
    DownloadTab.prototype.onPNGDownload = function (ev) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(this.pngBlob, this.baseFilename + ".png");
            ev.preventDefault();
        }
    };
    DownloadTab.prototype.onSVGDownload = function (ev) {
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(this.svgBlob, this.baseFilename + ".svg");
            ev.preventDefault();
        }
    };
    DownloadTab.prototype.renderReady = function () {
        var _a = this, props = _a.props, targetWidth = _a.targetWidth, targetHeight = _a.targetHeight, pngPreviewUrl = _a.pngPreviewUrl, pngDownloadUrl = _a.pngDownloadUrl, svgPreviewUrl = _a.svgPreviewUrl, svgDownloadUrl = _a.svgDownloadUrl, isPortrait = _a.isPortrait, baseFilename = _a.baseFilename;
        var previewWidth;
        var previewHeight;
        if (isPortrait) {
            previewWidth = props.bounds.width * 0.6;
            previewHeight = (targetHeight / targetWidth) * previewWidth;
        }
        else {
            previewHeight = props.bounds.height * 0.4;
            previewWidth = (targetWidth / targetHeight) * previewHeight;
        }
        var imgStyle = { minWidth: previewWidth, minHeight: previewHeight, maxWidth: previewWidth, maxHeight: previewHeight, border: "1px solid #ccc", margin: "1em" };
        return [
            React.createElement("a", { href: pngDownloadUrl, download: baseFilename + ".png", onClick: this.onPNGDownload }, isPortrait
                ? React.createElement("div", null,
                    React.createElement("h2", null, "Save as .png"),
                    React.createElement("img", { src: pngPreviewUrl, style: imgStyle }),
                    React.createElement("p", null, "A standard image of the visualization that can be used in presentations or other documents."))
                : React.createElement("div", null,
                    React.createElement("img", { src: pngPreviewUrl, style: imgStyle }),
                    React.createElement("aside", null,
                        React.createElement("h2", null, "Save as .png"),
                        React.createElement("p", null, "A standard image of the visualization that can be used in presentations or other documents.")))),
            React.createElement("a", { href: svgDownloadUrl, download: baseFilename + ".svg", onClick: this.onSVGDownload }, isPortrait
                ? React.createElement("div", null,
                    React.createElement("h2", null, "Save as .svg"),
                    React.createElement("img", { src: svgPreviewUrl, style: imgStyle }),
                    React.createElement("p", null, "A vector format image useful for further redesigning the visualization with vector graphic software."))
                : React.createElement("div", null,
                    React.createElement("img", { src: svgPreviewUrl, style: imgStyle }),
                    React.createElement("aside", null,
                        React.createElement("h2", null, "Save as .svg"),
                        React.createElement("p", null, "A vector format image useful for further redesigning the visualization with vector graphic software."))))
        ];
    };
    DownloadTab.prototype.componentWillMount = function () {
        this.export();
    };
    DownloadTab.prototype.componentWillUnmount = function () {
        if (this.pngBlobUrl !== undefined)
            URL.revokeObjectURL(this.pngBlobUrl);
        if (this.svgBlobUrl !== undefined)
            URL.revokeObjectURL(this.svgBlobUrl);
    };
    DownloadTab.prototype.render = function () {
        return React.createElement("div", { className: 'downloadTab', style: Util_1.extend(this.props.bounds.toCSS(), { position: 'absolute' }) }, this.isReady ? this.renderReady() : React.createElement("div", { className: "loadingIcon" },
            React.createElement("i", { className: "fa fa-spinner fa-spin" })));
    };
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "targetWidth", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "targetHeight", null);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "svgBlob", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "svgBlobUrl", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "svgDataUri", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "pngBlob", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "pngBlobUrl", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "pngDataUri", void 0);
    __decorate([
        mobx_1.observable
    ], DownloadTab.prototype, "isReady", void 0);
    __decorate([
        mobx_1.action.bound
    ], DownloadTab.prototype, "export", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "fallbackPngUrl", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "baseFilename", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "svgPreviewUrl", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "pngPreviewUrl", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "svgDownloadUrl", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "pngDownloadUrl", null);
    __decorate([
        mobx_1.computed
    ], DownloadTab.prototype, "isPortrait", null);
    __decorate([
        mobx_1.action.bound
    ], DownloadTab.prototype, "onPNGDownload", null);
    __decorate([
        mobx_1.action.bound
    ], DownloadTab.prototype, "onSVGDownload", null);
    DownloadTab = __decorate([
        mobx_react_1.observer
    ], DownloadTab);
    return DownloadTab;
}(React.Component));
exports.default = DownloadTab;
//# sourceMappingURL=DownloadTab.js.map