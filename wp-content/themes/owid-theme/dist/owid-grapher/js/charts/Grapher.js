"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartView_1 = require("./ChartView");
var Util_1 = require("./Util");
var MultiEmbedder = /** @class */ (function () {
    function MultiEmbedder() {
        var _this = this;
        this.figuresToLoad = [];
        Array.from(document.getElementsByTagName("figure")).forEach(function (element) {
            var dataSrc = element.getAttribute('data-grapher-src');
            if (dataSrc) {
                var _a = dataSrc.split(/\?/), configUrl = _a[0], queryStr = _a[1];
                var figure_1 = { configUrl: configUrl, queryStr: queryStr, element: element };
                _this.figuresToLoad.push(figure_1);
                fetch(configUrl + ".config.json").then(function (data) { return data.json(); }).then(function (jsonConfig) {
                    figure_1.jsonConfig = jsonConfig;
                    _this.update();
                });
            }
        });
        window.addEventListener('scroll', Util_1.throttle(function () { return _this.update(); }, 100));
    }
    // Check for figures which are available to load and load them
    MultiEmbedder.prototype.update = function () {
        var preloadDistance = window.innerHeight * 4;
        this.figuresToLoad.forEach(function (figure) {
            if (!figure.isActive && figure.jsonConfig) {
                var windowTop = window.pageYOffset;
                var windowBottom = window.pageYOffset + window.innerHeight;
                var figureRect = figure.element.getBoundingClientRect();
                var bodyRect = document.body.getBoundingClientRect();
                var figureTop = figureRect.top - bodyRect.top;
                var figureBottom = figureRect.bottom - bodyRect.top;
                if (windowBottom + preloadDistance >= figureTop && windowTop - preloadDistance <= figureBottom) {
                    figure.isActive = true;
                    ChartView_1.default.bootstrap({ jsonConfig: figure.jsonConfig, containerNode: figure.element, isEmbed: figure.element.parentNode !== document.body || undefined, queryStr: figure.queryStr });
                }
            }
        });
    };
    return MultiEmbedder;
}());
exports.MultiEmbedder = MultiEmbedder;
// Global entry point for initializing charts
var Grapher = /** @class */ (function () {
    function Grapher() {
    }
    Grapher.embedAll = function () {
        this.embedder = new MultiEmbedder();
    };
    return Grapher;
}());
exports.default = Grapher;
//# sourceMappingURL=Grapher.js.map