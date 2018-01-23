"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Tablepress(props) {
    var data = props.data;
    return React.createElement("table", { className: "tablepress" },
        React.createElement("thead", null,
            React.createElement("tr", null, data[0].map(function (title) { return React.createElement("th", { dangerouslySetInnerHTML: { __html: title } }); }))),
        React.createElement("tbody", { className: "row-hover" }, data.slice(1).map(function (row) {
            return React.createElement("tr", null, row.map(function (value) { return React.createElement("td", { dangerouslySetInnerHTML: { __html: value } }); }));
        })));
}
exports.default = Tablepress;
//# sourceMappingURL=Tablepress.js.map