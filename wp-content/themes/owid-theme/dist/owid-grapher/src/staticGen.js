"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("./settings");
function embedSnippet(basePath, chartsJs, chartsCss) {
    return "\n        window.App = {};\n        window.Global = { rootUrl: '" + settings_1.BAKED_URL + basePath + "' };\n\n        var link = document.createElement('link');\n        link.type = 'text/css';\n        link.rel = 'stylesheet';\n        link.href = '" + chartsCss + "';\n        document.head.appendChild(link);\n\n        var hasPolyfill = false;\n        var hasGrapher = false;\n\n        var script = document.createElement('script');\n        script.type = 'text/javascript';\n        script.onload = function() {\n            hasPolyfill = true;\n            if (hasGrapher)\n                window.Grapher.embedAll();\n        }\n        script.src = \"https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,fetch\"\n        document.head.appendChild(script);\n\n        var script = document.createElement('script');\n        script.type = 'text/javascript';\n        script.onload = function() {\n            hasGrapher = true;\n            if (hasPolyfill)\n                window.Grapher.embedAll();\n        }\n        script.src = '" + chartsJs + "';\n        document.head.appendChild(script);\n    ";
}
exports.embedSnippet = embedSnippet;
//# sourceMappingURL=staticGen.js.map