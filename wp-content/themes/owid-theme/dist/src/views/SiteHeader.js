"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.SiteHeader = function (props) {
    return React.createElement("header", { className: "SiteHeader" },
        React.createElement("div", { className: "container" },
            React.createElement("a", { className: "logo", href: "/" }, "Our World in Data"),
            React.createElement("nav", null,
                React.createElement("a", { href: "/blog" }, "Blog"),
                React.createElement("a", { href: "/about" }, "About"),
                React.createElement("a", { href: "/support" }, "Donate"))));
};
//# sourceMappingURL=SiteHeader.js.map