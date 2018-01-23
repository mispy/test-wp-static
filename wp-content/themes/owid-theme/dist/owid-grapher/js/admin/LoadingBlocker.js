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
var LoadingBlocker = /** @class */ (function (_super) {
    __extends(LoadingBlocker, _super);
    function LoadingBlocker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingBlocker.prototype.render = function () {
        var style = {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
            opacity: 0.5,
            zIndex: 2100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            color: 'white'
        };
        return React.createElement("div", { style: style },
            React.createElement("i", { className: "fa fa-spinner fa-spin" }));
    };
    return LoadingBlocker;
}(React.Component));
exports.default = LoadingBlocker;
//# sourceMappingURL=LoadingBlocker.js.map