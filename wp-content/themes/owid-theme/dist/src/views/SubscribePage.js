"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("../settings");
var React = require("react");
var Head_1 = require("./Head");
function SubscribePage() {
    var style = "\n        body {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            height: 100%;\n        }\n        main {\n            max-width: 1080px;\n            padding: 40px 20px;\n            margin: auto;\n            min-height: 0;\n        }\n        h1 {\n            line-height: 1.1em;\n        }\n\n        input[type=email] {\n            width: 100%;\n            padding: 10px;\n            border: 1px solid #ccc;\n        }\n\n        input[type=submit] {\n            margin-top: 10px;\n            background: #5d5d5d;\n            color: #fff;\n            padding: 10px 22px;\n            cursor: pointer;\n        }\n    ";
    return React.createElement("html", null,
        React.createElement(Head_1.Head, { pageTitle: "Subscribe", canonicalUrl: settings.BAKED_URL + "/subscribe" },
            React.createElement("style", { dangerouslySetInnerHTML: { __html: style } })),
        React.createElement("body", { className: "SubscribePage" },
            React.createElement("main", null,
                React.createElement("h1", null, "Subscribe to Our World in Data"),
                React.createElement("p", null, "Want to keep up with new data? Sign up for email updates."),
                React.createElement("form", { action: "https://ourworldindata.us8.list-manage.com/subscribe/post?u=18058af086319ba6afad752ec&id=2e166c1fc1", method: "post", id: "mc-embedded-subscribe-form", name: "mc-embedded-subscribe-form", target: "_blank" },
                    React.createElement("input", { type: "email", placeholder: "Email", name: "EMAIL", className: "required email", id: "mce-EMAIL", "aria-label": "Email" }),
                    React.createElement("input", { type: "submit", value: "Subscribe", name: "subscribe", id: "mc-embedded-subscribe", className: "button" }),
                    React.createElement("div", { style: { position: 'absolute', left: '-5000px' } },
                        React.createElement("input", { type: "text", name: "b_18058af086319ba6afad752ec_2e166c1fc1", tabIndex: -1 }))),
                React.createElement("p", null,
                    "You can also subscribe using our ",
                    React.createElement("a", { href: "/feed" }, "RSS feed"),
                    "."))));
}
exports.default = SubscribePage;
//# sourceMappingURL=SubscribePage.js.map