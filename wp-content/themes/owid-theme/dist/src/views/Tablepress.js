"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Tablepress(props) {
    var data = props.data;
    return React.createElement("table", { className: "tablepress" },
        React.createElement("thead", null,
            React.createElement("tr", null, data[0].map(function (title, i) { return React.createElement("th", { key: i, dangerouslySetInnerHTML: { __html: title } }); }))),
        React.createElement("tbody", { className: "row-hover" }, data.slice(1).map(function (row, i) {
            return React.createElement("tr", { key: i }, row.map(function (value, j) { return React.createElement("td", { key: j, dangerouslySetInnerHTML: { __html: value } }); }));
        })));
}
exports.default = Tablepress;
//# sourceMappingURL=Tablepress.js.map