"use strict";
// Because react-modal doesn't work so well with Preact.
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
var ReactDOM = require("react-dom");
var EditorModal = /** @class */ (function (_super) {
    __extends(EditorModal, _super);
    function EditorModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorModal.prototype.componentDidMount = function () {
        var modalContainer = document.createElement('div');
        modalContainer.className = "modalContainer";
        document.body.appendChild(modalContainer);
        this.modalContainer = modalContainer;
        this.componentDidUpdate();
    };
    EditorModal.prototype.componentWillUnmount = function () {
        document.body.removeChild(this.modalContainer);
    };
    EditorModal.prototype.componentDidUpdate = function () {
        ReactDOM.render(this.props.children, this.modalContainer);
    };
    return EditorModal;
}(React.Component));
exports.default = EditorModal;
//# sourceMappingURL=EditorModal.js.map