"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../settings");
var React = require("react");
exports.Head = function (props) {
    var canonicalUrl = props.canonicalUrl;
    var pageTitle = props.pageTitle || "Our World in Data";
    var fullPageTitle = props.pageTitle ? props.pageTitle + " - Our World in Data" : "Our World in Data";
    var pageDesc = props.pageDesc || "Living conditions around the world are changing rapidly. Explore how and why.";
    var imageUrl = props.imageUrl || settings_1.BAKED_URL + "/wp-content/uploads/2016/06/OurWorldInData.png";
    return React.createElement("head", null,
        React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        React.createElement("title", null, fullPageTitle),
        React.createElement("meta", { name: "description", content: pageDesc }),
        React.createElement("link", { rel: "canonical", href: canonicalUrl }),
        React.createElement("link", { rel: "alternate", type: "application/atom+xml", href: "/atom.xml" }),
        React.createElement("meta", { property: "fb:app_id", content: "1149943818390250" }),
        React.createElement("meta", { property: "og:url", content: canonicalUrl }),
        React.createElement("meta", { property: "og:title", content: pageTitle }),
        React.createElement("meta", { property: "og:description", content: pageDesc }),
        React.createElement("meta", { property: "og:image", content: imageUrl }),
        React.createElement("meta", { property: "og:site_name", content: "Our World in Data" }),
        React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
        React.createElement("meta", { name: "twitter:site", content: "@OurWorldInData" }),
        React.createElement("meta", { name: "twitter:creator", content: "@OurWorldInData" }),
        React.createElement("meta", { name: "twitter:title", content: pageTitle }),
        React.createElement("meta", { name: "twitter:description", content: pageDesc }),
        React.createElement("meta", { name: "twitter:image", content: imageUrl }),
        React.createElement("link", { rel: "stylesheet", href: settings_1.ASSETS_URL + "/owid.css" }),
        props.children);
};
//# sourceMappingURL=Head.js.map