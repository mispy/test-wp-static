"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var md5 = require("md5");
var urljoin = require("url-join");
exports.ChartPage = function (props) {
    var chart = props.chart, canonicalRoot = props.canonicalRoot, pathRoot = props.pathRoot;
    var pageTitle = chart.title;
    var pageDesc = chart.subtitle || "An interactive visualization from Our World in Data.";
    var canonicalUrl = urljoin(canonicalRoot, pathRoot, chart.slug);
    var imageUrl = urljoin(canonicalRoot, pathRoot, "exports", chart.slug + ".png?v=" + md5(JSON.stringify(chart)));
    return React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("title", null,
                pageTitle,
                " - Our World in Data"),
            React.createElement("meta", { name: "description", content: pageDesc }),
            React.createElement("link", { rel: "canonical", href: canonicalUrl }),
            React.createElement("meta", { property: "fb:app_id", content: "1149943818390250" }),
            React.createElement("meta", { property: "og:url", content: canonicalUrl }),
            React.createElement("meta", { property: "og:title", content: pageTitle }),
            React.createElement("meta", { property: "og:description", content: pageDesc }),
            React.createElement("meta", { property: "og:image", content: imageUrl }),
            React.createElement("meta", { property: "og:image:width", content: "1200" }),
            React.createElement("meta", { property: "og:image:height", content: "630" }),
            React.createElement("meta", { property: "og:site_name", content: "Our World in Data" }),
            React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
            React.createElement("meta", { name: "twitter:site", content: "@OurWorldInData" }),
            React.createElement("meta", { name: "twitter:creator", content: "@OurWorldInData" }),
            React.createElement("meta", { name: "twitter:title", content: pageTitle }),
            React.createElement("meta", { name: "twitter:description", content: pageDesc }),
            React.createElement("meta", { name: "twitter:image", content: imageUrl }),
            React.createElement("style", null, "html, body {\n                    height: 100%;\n                    margin: 0;\n                }\n\n                figure[data-grapher-src] {\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    margin: 0;\n                    width: 100%;\n                    height: 100%;\n                }"),
            React.createElement("script", { src: pathRoot + "/embedCharts.js" })),
        React.createElement("body", { className: "singleChart" },
            React.createElement("figure", { "data-grapher-src": pathRoot + "/" + chart.slug })));
};
//# sourceMappingURL=ChartPage.js.map