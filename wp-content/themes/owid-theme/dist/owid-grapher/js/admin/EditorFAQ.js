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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Forms_1 = require("./Forms");
var EditorFAQ = /** @class */ (function (_super) {
    __extends(EditorFAQ, _super);
    function EditorFAQ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorFAQ.prototype.render = function () {
        return React.createElement(Forms_1.Modal, { onClose: this.props.onClose, className: "EditorFAQ" },
            React.createElement("div", { className: "modal-header" },
                React.createElement("h3", { className: "modal-title" }, "Frequently Asked Questions")),
            React.createElement("div", { className: "modal-body" },
                React.createElement("h6", null, "How do I make a chart?"),
                React.createElement("p", null,
                    "See this ",
                    React.createElement("a", { target: "_blank", href: "https://ourworldindata.org/how-to-our-world-in-data-guide/#owid-grapher" }, "more in depth guide"),
                    " for the full process."),
                React.createElement("h6", null, "What are \"variables\" and \"entities\"?"),
                React.createElement("p", null, "They roughly correspond to columns and rows in a CSV file. For OWID, entities are usually but not always countries."),
                React.createElement("h6", null, "What do the little icons mean?"),
                React.createElement("p", null,
                    "If you see the ",
                    React.createElement("i", { className: "fa fa-link" }),
                    " link icon, it means a field is currently linked to the database and has its default value. By changing that field you break the link ",
                    React.createElement("i", { className: "fa fa-unlink" }),
                    " and set manual input for this particular chart."),
                React.createElement("h6", null, "When are charts updated?"),
                React.createElement("p", null, "The version of the chart you see in the editor is the \"canonical\" version that reflects the current data. When published, charts are bundled together in a static build process and sent to Netlify for distribution around the world. This process takes about a minute. An indicator will appear in the top right showing the current build status."),
                React.createElement("h6", null, "How much data can I put in one chart?"),
                React.createElement("p", null,
                    "The fewer variables the better. To allow for fast interactivity, the grapher preloads ",
                    React.createElement("strong", null, "all"),
                    " the data for each variable added to a chart, including every year and entity. If you have 10+ big variables on one chart it may be a little slow to load."),
                React.createElement("p", null, "Similarly, if you select many entities or have very long subtitles the chart will become visually cluttered. Make sure there's enough room for the chart to work well in the mobile preview, and if in doubt make two smaller charts rather than one big one."),
                React.createElement("h6", null, "Why does it say \"No matching data\"?"),
                React.createElement("p", null, "Check the data selection on the \"Data\" tab and the specified year range on the \"Customize\" tab. Alternatively, you might be trying to show a categorical variable on a numeric chart type or vice versa, which won't work."),
                React.createElement("h6", null, "Other questions or bug reports"),
                React.createElement("p", null,
                    "Fastest way to get support is to ask in ",
                    React.createElement("a", { href: "https://owid.slack.com/messages/tiny-tech-problems/" }, "#tiny-tech-problems"),
                    " on the OWID Slack!")));
    };
    return EditorFAQ;
}(React.Component));
exports.EditorFAQ = EditorFAQ;
//# sourceMappingURL=EditorFAQ.js.map