"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseArgs = require("minimist");
var fs = require("fs");
var sharp = require("sharp");
var argv = parseArgs(process.argv.slice(2));
var baseUrl = argv.baseUrl;
var targetSrc = argv.targetSrc;
var outputPath = argv.output;
require('isomorphic-fetch');
global.Global = { rootUrl: baseUrl };
global.window = { location: { search: "" } };
global.App = { isEditor: false };
require('module-alias').addAliases({
    'react': 'preact-compat',
    'react-dom': 'preact-compat'
});
var ChartConfig_1 = require("./charts/ChartConfig");
var mobx_1 = require("mobx");
var _a = targetSrc.split(/\?/), configUrl = _a[0], queryStr = _a[1];
fetch(configUrl + ".config.json").then(function (data) { return data.json(); }).then(function (jsonConfig) {
    var chart = new ChartConfig_1.default(jsonConfig, { isMediaCard: true });
    mobx_1.when(function () { return chart.data.isReady; }, function () {
        setTimeout(function () {
            var svgPath = outputPath.replace('.png', '.svg');
            fs.writeFileSync(svgPath, chart.staticSVG);
            sharp(svgPath, { density: 144 }).png().resize(chart.idealBounds.width, chart.idealBounds.height).flatten().background('#ffffff').toFile(outputPath);
        }, 0);
    });
});
//# sourceMappingURL=exportChart.js.map