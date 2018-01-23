"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_1 = require("mobx");
var TextWrap_1 = require("./TextWrap");
var Bounds_1 = require("./Bounds");
var parseUrl = require("url-parse");
var SourcesFooter = /** @class */ (function () {
    function SourcesFooter(props) {
        this.props = props;
    }
    Object.defineProperty(SourcesFooter.prototype, "maxWidth", {
        get: function () {
            return this.props.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "sourcesText", {
        get: function () {
            var sourcesLine = this.props.chart.data.sourcesLine;
            return sourcesLine ? "Source: " + sourcesLine : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "noteText", {
        get: function () {
            return this.props.chart.note ? "Note: " + this.props.chart.note : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "defaultLicenseSvg", {
        get: function () {
            return "<a target='_blank' style='fill: #777;' href='http://ourworldindata.org'>OurWorldInData.org</a> \u2022 <a style=\"fill: #777;\" href=\"http://creativecommons.org/licenses/by-sa/4.0/deed.en_US\" target=\"_blank\">CC BY-SA</a>";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "licenseSvg", {
        get: function () {
            if (this.props.chart.isNativeEmbed)
                return "";
            var originUrl = this.props.chart.data.originUrl;
            var licenseSvg = "*data-entry* \u2022 <a style=\"fill: #777;\" href=\"http://creativecommons.org/licenses/by-sa/4.0/deed.en_US\" target=\"_blank\">CC BY-SA</a>";
            // Make sure the link back to OWID is consistent
            // And don't show the full url if there isn't enough room
            if (originUrl && originUrl.toLowerCase().indexOf("ourworldindata.org") !== -1) {
                var url = parseUrl(originUrl);
                var finalUrl = "https://ourworldindata.org" + url.pathname;
                if (Bounds_1.default.forText(finalUrl, { fontSize: this.fontSize }).width > 0.7 * this.maxWidth)
                    return this.defaultLicenseSvg;
                licenseSvg = licenseSvg.replace(/\*data-entry\*/, "<a target='_blank' style='fill: #777;' href='" + finalUrl + "'>" + "OurWorldInData.org" + url.pathname + "</a>");
            }
            else {
                return this.defaultLicenseSvg;
            }
            return licenseSvg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "fontSize", {
        get: function () {
            return 0.7 * this.props.chart.baseFontSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "sources", {
        get: function () {
            var _a = this, maxWidth = _a.maxWidth, fontSize = _a.fontSize, sourcesText = _a.sourcesText;
            return new TextWrap_1.default({ maxWidth: maxWidth, fontSize: fontSize, text: sourcesText });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "note", {
        get: function () {
            var _a = this, maxWidth = _a.maxWidth, fontSize = _a.fontSize, noteText = _a.noteText;
            return new TextWrap_1.default({ maxWidth: maxWidth, fontSize: fontSize, text: noteText });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "license", {
        get: function () {
            var _a = this, maxWidth = _a.maxWidth, fontSize = _a.fontSize, licenseSvg = _a.licenseSvg;
            return new TextWrap_1.default({ maxWidth: maxWidth * 3, fontSize: fontSize, text: licenseSvg, raw: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "isCompact", {
        // Put the license stuff to the side if there's room
        get: function () {
            return this.maxWidth - this.sources.width - 5 > this.license.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "paraMargin", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourcesFooter.prototype, "height", {
        get: function () {
            if (this.props.chart.isMediaCard)
                return 0;
            var _a = this, sources = _a.sources, note = _a.note, license = _a.license, isCompact = _a.isCompact, paraMargin = _a.paraMargin;
            return sources.height + (note.height ? paraMargin + note.height : 0) + (isCompact ? 0 : paraMargin + license.height);
        },
        enumerable: true,
        configurable: true
    });
    SourcesFooter.prototype.onSourcesClick = function () {
        this.props.chart.tab = 'sources';
    };
    SourcesFooter.prototype.render = function (targetX, targetY) {
        if (this.props.chart.isMediaCard)
            return null;
        var _a = this, sources = _a.sources, note = _a.note, license = _a.license, maxWidth = _a.maxWidth, isCompact = _a.isCompact, paraMargin = _a.paraMargin, onSourcesClick = _a.onSourcesClick;
        return React.createElement("g", { className: "SourcesFooter", style: { fill: "#777" } },
            React.createElement("g", { className: "clickable", onClick: onSourcesClick, style: { fill: "#777" } }, sources.render(targetX, targetY)),
            note.render(targetX, targetY + sources.height + paraMargin),
            isCompact
                ? license.render(targetX + maxWidth - license.width, targetY)
                : license.render(targetX, targetY + sources.height + paraMargin + (note.height ? note.height + paraMargin : 0)));
    };
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "maxWidth", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "sourcesText", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "noteText", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "defaultLicenseSvg", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "licenseSvg", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "fontSize", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "sources", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "note", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "license", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "isCompact", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "paraMargin", null);
    __decorate([
        mobx_1.computed
    ], SourcesFooter.prototype, "height", null);
    __decorate([
        mobx_1.action.bound
    ], SourcesFooter.prototype, "onSourcesClick", null);
    return SourcesFooter;
}());
exports.default = SourcesFooter;
//# sourceMappingURL=SourcesFooter.js.map