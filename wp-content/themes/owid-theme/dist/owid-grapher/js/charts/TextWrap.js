"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var mobx_1 = require("mobx");
var Util_2 = require("./Util");
var Bounds_1 = require("./Bounds");
var React = require("react");
function strip(html) {
    return html.replace(/<\/?[^>]+>/g, "");
}
var TextWrap = /** @class */ (function () {
    function TextWrap(props) {
        this.props = props;
    }
    Object.defineProperty(TextWrap.prototype, "maxWidth", {
        get: function () { return Util_2.defaultTo(this.props.maxWidth, Infinity); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "lineHeight", {
        get: function () { return Util_2.defaultTo(this.props.lineHeight, 1.1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "fontSize", {
        get: function () { return Util_2.defaultTo(this.props.fontSize, 1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "text", {
        get: function () { return this.props.text; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "lines", {
        get: function () {
            var _a = this, text = _a.text, maxWidth = _a.maxWidth, fontSize = _a.fontSize;
            var words = Util_1.isEmpty(text) ? [] : text.split(' ');
            var lines = [];
            var line = [];
            var lineBounds = Bounds_1.default.empty();
            words.forEach(function (word) {
                var nextLine = line.concat([word]);
                var nextBounds = Bounds_1.default.forText(strip(nextLine.join(' ')), { fontSize: fontSize });
                if (nextBounds.width > maxWidth && line.length >= 1) {
                    lines.push({ text: line.join(' '), width: lineBounds.width, height: lineBounds.height });
                    line = [word];
                    lineBounds = Bounds_1.default.forText(strip(word), { fontSize: fontSize });
                }
                else {
                    line = nextLine;
                    lineBounds = nextBounds;
                }
            });
            if (line.length > 0)
                lines.push({ text: line.join(' '), width: lineBounds.width, height: lineBounds.height });
            return lines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "height", {
        get: function () {
            return Util_1.reduce(this.lines, function (total, line) { return total + line.height; }, 0) + this.lineHeight * (this.lines.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextWrap.prototype, "width", {
        get: function () {
            return Util_2.defaultTo(Util_1.max(this.lines.map(function (l) { return l.width; })), 0);
        },
        enumerable: true,
        configurable: true
    });
    TextWrap.prototype.render = function (x, y, options) {
        var _a = this, props = _a.props, lines = _a.lines, fontSize = _a.fontSize, lineHeight = _a.lineHeight;
        if (lines.length === 0)
            return null;
        var yOffset = y + lines[0].height - lines[0].height * 0.2;
        return React.createElement("text", __assign({ fontSize: fontSize.toFixed(2), x: x.toFixed(1), y: yOffset.toFixed(1) }, options), Util_1.map(lines, function (line, i) {
            if (props.raw)
                return React.createElement("tspan", { x: x, y: yOffset + (i === 0 ? 0 : lineHeight * fontSize * i), dangerouslySetInnerHTML: { __html: line.text } });
            else
                return React.createElement("tspan", { x: x, y: yOffset + (i === 0 ? 0 : lineHeight * fontSize * i) }, strip(line.text));
        }));
    };
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "maxWidth", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "lineHeight", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "fontSize", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "text", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "lines", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "height", null);
    __decorate([
        mobx_1.computed
    ], TextWrap.prototype, "width", null);
    return TextWrap;
}());
exports.default = TextWrap;
//# sourceMappingURL=TextWrap.js.map