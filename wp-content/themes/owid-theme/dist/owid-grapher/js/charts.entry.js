"use strict";
// CSS
Object.defineProperty(exports, "__esModule", { value: true });
require("font-awesome/css/font-awesome.css");
require("../css/chart.scss");
// Enable mobx-formatters
var Mobx = require('mobx');
var mobxFormatters = require('mobx-formatters').default;
mobxFormatters(Mobx);
//Mobx.useStrict(true)
//import 'preact/devtools'
var Grapher_1 = require("./charts/Grapher");
var ChartView_1 = require("./charts/ChartView");
window.Grapher = Grapher_1.default;
window.ChartView = ChartView_1.default;
var Debug_1 = require("./charts/Debug");
Debug_1.default.expose();
//# sourceMappingURL=charts.entry.js.map