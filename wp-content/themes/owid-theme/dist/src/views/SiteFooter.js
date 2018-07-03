"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("../settings");
var React = require("react");
exports.SiteFooter = function () {
    return React.createElement("footer", { className: "SiteFooter" },
        React.createElement("div", null,
            React.createElement("a", { href: "/", className: "logo" }, "Our World in Data"),
            " is a ",
            React.createElement("a", { href: "https://creativecommons.org/licenses/by-sa/4.0/" }, "creative commons"),
            " publication about human civilization at a global scale."),
        React.createElement("nav", null,
            React.createElement("a", { href: "/about" }, "About"),
            React.createElement("a", { href: "https://docs.google.com/forms/d/e/1FAIpQLScTaT03ggC7yo8KzRLvoCJY-5mtfuA6jOHheLLFtD5lSHkXlg/viewform" }, "Feedback"),
            React.createElement("a", { href: "/subscribe" }, "Subscribe"),
            React.createElement("a", { href: "https://twitter.com/OurWorldInData" }, "Twitter"),
            React.createElement("a", { href: "https://www.facebook.com/OurWorldinData" }, "Facebook"),
            React.createElement("a", { href: "https://github.com/owid" }, "GitHub"),
            React.createElement("a", { href: "/support" }, "Donate")),
        React.createElement("script", { src: settings.ASSETS_URL + "/js/owid.js" }),
        React.createElement("script", { src: settings.BAKED_URL + "/grapher/embedCharts.js" }));
};
//# sourceMappingURL=SiteFooter.js.map