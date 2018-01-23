"use strict";
/* Forms.tsx
 * ================
 *
 * Reusable React components to keep admin form code succint and consistent
 */
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Util_1 = require("../charts/Util");
var decko_1 = require("decko");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Colorpicker_1 = require("./Colorpicker");
var FieldsRow = /** @class */ (function (_super) {
    __extends(FieldsRow, _super);
    function FieldsRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldsRow.prototype.render = function () {
        var props = this.props;
        return React.createElement("div", { className: "FieldsRow" }, props.children);
    };
    return FieldsRow;
}(React.Component));
exports.FieldsRow = FieldsRow;
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextField.prototype.onKeyDown = function (ev) {
        if (ev.key === "Enter" && this.props.onEnter) {
            this.props.onEnter();
        }
        else if (ev.key === "Escape" && this.props.onEscape) {
            this.props.onEscape();
        }
    };
    TextField.prototype.componentDidMount = function () {
        if (this.props.autofocus) {
            var input = this.base.querySelector("input");
            input.focus();
        }
    };
    TextField.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var passthroughProps = Util_1.pick(props, ['placeholder', 'title', 'disabled']);
        return React.createElement("div", { className: "form-group" },
            props.label && React.createElement("label", null, props.label),
            React.createElement("input", __assign({ className: "form-control", type: "text", value: props.value, onInput: function (e) { return _this.props.onValue(e.currentTarget.value); } }, passthroughProps)),
            props.helpText && React.createElement("small", { className: "form-text text-muted" }, props.helpText),
            props.softCharacterLimit && props.value && React.createElement(SoftCharacterLimit, { text: props.value, limit: props.softCharacterLimit }));
    };
    __decorate([
        decko_1.bind
    ], TextField.prototype, "onKeyDown", null);
    return TextField;
}(React.Component));
exports.TextField = TextField;
var TextAreaField = /** @class */ (function (_super) {
    __extends(TextAreaField, _super);
    function TextAreaField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaField.prototype.onInput = function (ev) {
        var value = ev.currentTarget.value;
        this.props.onValue(value);
    };
    TextAreaField.prototype.render = function () {
        var props = this.props;
        var passthroughProps = Util_1.pick(props, ['placeholder', 'title', 'disabled', 'label', 'helpText']);
        return React.createElement("div", { className: "form-group" },
            props.label && React.createElement("label", null, props.label),
            React.createElement("textarea", __assign({ className: "form-control", value: props.value, onInput: this.onInput, rows: 5 }, passthroughProps)),
            props.helpText && React.createElement("small", null, props.helpText),
            props.softCharacterLimit && props.value && React.createElement(SoftCharacterLimit, { text: props.value, limit: props.softCharacterLimit }));
    };
    __decorate([
        decko_1.bind
    ], TextAreaField.prototype, "onInput", null);
    return TextAreaField;
}(React.Component));
exports.TextAreaField = TextAreaField;
var NumberField = /** @class */ (function (_super) {
    __extends(NumberField, _super);
    function NumberField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberField.prototype.render = function () {
        var props = this.props;
        var textFieldProps = Util_1.extend({}, props, {
            value: props.value !== undefined ? props.value.toString() : undefined,
            onValue: function (value) {
                var asNumber = parseFloat(value);
                props.onValue(isNaN(asNumber) ? undefined : asNumber);
            }
        });
        return React.createElement(TextField, __assign({}, textFieldProps));
    };
    return NumberField;
}(React.Component));
exports.NumberField = NumberField;
var SelectField = /** @class */ (function (_super) {
    __extends(SelectField, _super);
    function SelectField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectField.prototype.render = function () {
        var props = this.props;
        var options = props.options.map(function (opt, i) {
            return {
                key: opt,
                value: opt,
                text: (props.optionLabels && props.optionLabels[i]) || opt
            };
        });
        return React.createElement("div", { className: "form-group" },
            props.label && React.createElement("label", null, props.label),
            React.createElement("select", { className: "form-control", onChange: function (e) { return props.onValue(e.currentTarget.value); } }, options.map(function (opt) {
                return React.createElement("option", { value: opt.value, selected: opt.value === props.value }, opt.text);
            })),
            props.helpText && React.createElement("small", { className: "form-text text-muted" }, props.helpText));
    };
    return SelectField;
}(React.Component));
exports.SelectField = SelectField;
var NumericSelectField = /** @class */ (function (_super) {
    __extends(NumericSelectField, _super);
    function NumericSelectField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericSelectField.prototype.render = function () {
        var _this = this;
        var props = Util_1.extend({}, this.props, {
            value: this.props.value !== undefined ? this.props.value.toString() : "",
            options: this.props.options.map(function (opt) { return opt.toString(); }),
            onValue: function (value) {
                var asNumber = parseFloat(value);
                _this.props.onValue(asNumber);
            }
        });
        return React.createElement(SelectField, __assign({}, props));
    };
    return NumericSelectField;
}(React.Component));
exports.NumericSelectField = NumericSelectField;
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toggle.prototype.render = function () {
        var props = this.props;
        /*return <div className="mdc-form-field">

        </div>*/
        return React.createElement("div", { className: "form-check" },
            React.createElement("label", { className: "form-check-label" },
                React.createElement("input", { className: "form-check-input", type: "checkbox", checked: props.value, onChange: function (e) { return props.onValue(!!e.currentTarget.checked); } }),
                props.label));
        /* return <FormField>
           <Checkbox checked={props.value} onChange={/> <label>{props.label}</label>
       </FormField>
       return <label className="Toggle clickable">
           <input type="checkbox" checked={props.value}  />
           {" " + props.label}
       </label>*/
    };
    return Toggle;
}(React.Component));
exports.Toggle = Toggle;
var EditableList = /** @class */ (function (_super) {
    __extends(EditableList, _super);
    function EditableList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditableList.prototype.render = function () {
        return this.props.children ? React.createElement("ul", __assign({}, this.props, { className: "list-group" + (this.props.className ? " " + this.props.className : "") })) : null;
    };
    return EditableList;
}(React.Component));
exports.EditableList = EditableList;
var EditableListItem = /** @class */ (function (_super) {
    __extends(EditableListItem, _super);
    function EditableListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditableListItem.prototype.render = function () {
        return React.createElement("li", __assign({}, this.props, { className: "list-group-item" + (this.props.className ? " " + this.props.className : "") }));
    };
    return EditableListItem;
}(React.Component));
exports.EditableListItem = EditableListItem;
var ColorBox = /** @class */ (function (_super) {
    __extends(ColorBox, _super);
    function ColorBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isChoosingColor = false;
        return _this;
    }
    ColorBox.prototype.onClick = function () {
        this.isChoosingColor = !this.isChoosingColor;
    };
    ColorBox.prototype.render = function () {
        var _this = this;
        var color = this.props.color;
        var isChoosingColor = this.isChoosingColor;
        var style = color !== undefined ? { backgroundColor: color } : undefined;
        return React.createElement("div", { className: "ColorBox", style: style, onClick: this.onClick },
            color === undefined && React.createElement("i", { className: "fa fa-paint-brush" }),
            isChoosingColor && React.createElement(Colorpicker_1.default, { color: color, onColor: this.props.onColor, onClose: function () { return _this.isChoosingColor = false; } }));
    };
    __decorate([
        mobx_1.observable.ref
    ], ColorBox.prototype, "isChoosingColor", void 0);
    __decorate([
        mobx_1.action.bound
    ], ColorBox.prototype, "onClick", null);
    ColorBox = __decorate([
        mobx_react_1.observer
    ], ColorBox);
    return ColorBox;
}(React.Component));
exports.ColorBox = ColorBox;
var Section = /** @class */ (function (_super) {
    __extends(Section, _super);
    function Section() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Section.prototype.render = function () {
        return React.createElement("section", null,
            React.createElement("h5", null, this.props.name),
            this.props.children);
    };
    return Section;
}(React.Component));
exports.Section = Section;
var SoftCharacterLimit = /** @class */ (function (_super) {
    __extends(SoftCharacterLimit, _super);
    function SoftCharacterLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoftCharacterLimit.prototype.render = function () {
        var _a = this.props, text = _a.text, limit = _a.limit;
        return React.createElement("div", { style: text.length > limit ? { color: 'red' } : { color: 'rgba(0,0,0,0.3)' } },
            text.length,
            " / ",
            limit,
            text.length > limit && React.createElement("p", null, "This text is long and may cause rendering issues in smaller viewports."));
    };
    SoftCharacterLimit = __decorate([
        mobx_react_1.observer
    ], SoftCharacterLimit);
    return SoftCharacterLimit;
}(React.Component));
var AutoTextField = /** @class */ (function (_super) {
    __extends(AutoTextField, _super);
    function AutoTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoTextField.prototype.render = function () {
        var props = this.props;
        return React.createElement("div", { className: "form-group AutoTextField" },
            props.label && React.createElement("label", null, props.label),
            React.createElement("div", { className: "input-group mb-2 mb-sm-0" },
                React.createElement("input", { type: "text", className: "form-control", value: props.value, placeholder: props.placeholder, onInput: function (e) { return props.onValue(e.currentTarget.value); } }),
                React.createElement("div", { className: "input-group-addon", onClick: function (_) { return props.onToggleAuto(!props.isAuto); }, title: props.isAuto ? "Automatic default" : "Manual input" }, props.isAuto ? React.createElement("i", { className: "fa fa-link" }) : React.createElement("i", { className: "fa fa-unlink" }))),
            props.helpText && React.createElement("small", { className: "form-text text-muted" }, props.helpText),
            props.softCharacterLimit && props.value && React.createElement(SoftCharacterLimit, { text: props.value, limit: props.softCharacterLimit }));
    };
    AutoTextField = __decorate([
        mobx_react_1.observer
    ], AutoTextField);
    return AutoTextField;
}(React.Component));
exports.AutoTextField = AutoTextField;
var BindString = /** @class */ (function (_super) {
    __extends(BindString, _super);
    function BindString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindString.prototype.onValue = function (value) {
        this.props.store[this.props.field] = value || undefined;
    };
    BindString.prototype.render = function () {
        var props = this.props;
        var field = props.field, store = props.store, label = props.label, textarea = props.textarea, rest = __rest(props, ["field", "store", "label", "textarea"]);
        var value = props.store[props.field];
        if (textarea)
            return React.createElement(TextAreaField, __assign({ label: label || Util_1.capitalize(field), value: value || "", onValue: this.onValue }, rest));
        else
            return React.createElement(TextField, __assign({ label: label || Util_1.capitalize(field), value: value || "", onValue: this.onValue }, rest));
    };
    __decorate([
        mobx_1.action.bound
    ], BindString.prototype, "onValue", null);
    BindString = __decorate([
        mobx_react_1.observer
    ], BindString);
    return BindString;
}(React.Component));
exports.BindString = BindString;
var BindAutoString = /** @class */ (function (_super) {
    __extends(BindAutoString, _super);
    function BindAutoString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindAutoString.prototype.onValue = function (value) {
        this.props.store[this.props.field] = value;
    };
    BindAutoString.prototype.onToggleAuto = function (value) {
        this.props.store[this.props.field] = value ? undefined : this.props.auto;
    };
    BindAutoString.prototype.render = function () {
        var _a = this.props, field = _a.field, store = _a.store, label = _a.label, auto = _a.auto, rest = __rest(_a, ["field", "store", "label", "auto"]);
        var value = store[field];
        return React.createElement(AutoTextField, __assign({ label: label || Util_1.capitalize(field), value: value === undefined ? auto : value, isAuto: value === undefined, onValue: this.onValue, onToggleAuto: this.onToggleAuto }, rest));
    };
    __decorate([
        mobx_1.action.bound
    ], BindAutoString.prototype, "onValue", null);
    __decorate([
        mobx_1.action.bound
    ], BindAutoString.prototype, "onToggleAuto", null);
    BindAutoString = __decorate([
        mobx_react_1.observer
    ], BindAutoString);
    return BindAutoString;
}(React.Component));
exports.BindAutoString = BindAutoString;
var AutoFloatField = /** @class */ (function (_super) {
    __extends(AutoFloatField, _super);
    function AutoFloatField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoFloatField.prototype.render = function () {
        var props = this.props;
        var textFieldProps = Util_1.extend({}, props, {
            value: props.isAuto ? undefined : props.value.toString(),
            onValue: function (value) {
                var asNumber = parseFloat(value);
                props.onValue(isNaN(asNumber) ? undefined : asNumber);
            },
            placeholder: props.isAuto ? props.value.toString() : undefined
        });
        return React.createElement(AutoTextField, __assign({}, textFieldProps));
    };
    return AutoFloatField;
}(React.Component));
exports.AutoFloatField = AutoFloatField;
var BindAutoFloat = /** @class */ (function (_super) {
    __extends(BindAutoFloat, _super);
    function BindAutoFloat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindAutoFloat.prototype.onValue = function (value) {
        this.props.store[this.props.field] = value;
    };
    BindAutoFloat.prototype.onToggleAuto = function (value) {
        this.props.store[this.props.field] = value ? undefined : this.props.auto;
    };
    BindAutoFloat.prototype.render = function () {
        var _a = this.props, field = _a.field, store = _a.store, label = _a.label, auto = _a.auto, rest = __rest(_a, ["field", "store", "label", "auto"]);
        var value = store[field];
        return React.createElement(AutoFloatField, __assign({ label: label || Util_1.capitalize(field), value: value === undefined ? auto : value, isAuto: value === undefined, onValue: this.onValue, onToggleAuto: this.onToggleAuto }, rest));
    };
    __decorate([
        mobx_1.action.bound
    ], BindAutoFloat.prototype, "onValue", null);
    __decorate([
        mobx_1.action.bound
    ], BindAutoFloat.prototype, "onToggleAuto", null);
    BindAutoFloat = __decorate([
        mobx_react_1.observer
    ], BindAutoFloat);
    return BindAutoFloat;
}(React.Component));
exports.BindAutoFloat = BindAutoFloat;
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.onClickOutside = function () {
        this.props.onClose();
    };
    Modal.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () { return document.body.addEventListener("click", _this.onClickOutside); }, 0);
    };
    Modal.prototype.componentWillUnmount = function () {
        document.body.removeEventListener("click", this.onClickOutside);
    };
    Modal.prototype.render = function () {
        var props = this.props;
        return React.createElement("div", { className: "modal" + (props.className ? " " + props.className : ""), style: { display: 'block' } },
            React.createElement("div", { className: "modal-dialog", role: "document", onClick: function (e) { return e.stopPropagation(); } },
                React.createElement("div", { className: "modal-content" }, this.props.children)));
    };
    __decorate([
        mobx_1.action.bound
    ], Modal.prototype, "onClickOutside", null);
    Modal = __decorate([
        mobx_react_1.observer
    ], Modal);
    return Modal;
}(React.Component));
exports.Modal = Modal;
var LoadingBlocker = /** @class */ (function (_super) {
    __extends(LoadingBlocker, _super);
    function LoadingBlocker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingBlocker.prototype.render = function () {
        return React.createElement("div", { className: "LoadingBlocker" },
            React.createElement("i", { className: "fa fa-cog fa-spin fa-3x fa-fw" }));
    };
    LoadingBlocker = __decorate([
        mobx_react_1.observer
    ], LoadingBlocker);
    return LoadingBlocker;
}(React.Component));
exports.LoadingBlocker = LoadingBlocker;
//# sourceMappingURL=Forms.js.map