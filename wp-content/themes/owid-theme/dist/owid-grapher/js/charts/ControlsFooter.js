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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Cookies = require("js-cookie");
var Util_2 = require("./Util");
var HTMLTimeline_1 = require("./HTMLTimeline");
var EmbedMenu = /** @class */ (function (_super) {
    __extends(EmbedMenu, _super);
    function EmbedMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmbedMenu.prototype.render = function () {
        var embedUrl = this.props.embedUrl;
        return React.createElement("div", { className: "embedMenu", onClick: function (evt) { return evt.stopPropagation(); } },
            React.createElement("h2", null, "Embed"),
            React.createElement("p", null, "Paste this into any HTML page:"),
            React.createElement("textarea", { onFocus: function (evt) { return evt.currentTarget.select(); } }, "<iframe src=\"" + embedUrl + "\" style=\"width: 100%; height: 600px; border: 0px none;\"></iframe>"));
    };
    EmbedMenu = __decorate([
        mobx_react_1.observer
    ], EmbedMenu);
    return EmbedMenu;
}(React.Component));
var ShareMenu = /** @class */ (function (_super) {
    __extends(ShareMenu, _super);
    function ShareMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEmbedMenuActive = false;
        return _this;
    }
    Object.defineProperty(ShareMenu.prototype, "title", {
        get: function () {
            return this.props.chart.data.currentTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareMenu.prototype, "editUrl", {
        get: function () {
            return Cookies.get('isAdmin') ? Global.rootUrl + "/admin/charts/" + this.props.chart.props.id + "/edit" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareMenu.prototype, "canonicalUrl", {
        get: function () {
            return this.props.chart.url.canonicalUrl;
        },
        enumerable: true,
        configurable: true
    });
    ShareMenu.prototype.onClickOutside = function () {
        this.props.chartView.removePopup(EmbedMenu);
        if (this.props.onDismiss)
            this.props.onDismiss();
    };
    ShareMenu.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            window.addEventListener('click', _this.onClickOutside);
        }, 50);
    };
    ShareMenu.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onClickOutside);
    };
    ShareMenu.prototype.onEmbed = function () {
        if (this.canonicalUrl)
            this.props.chartView.addPopup(React.createElement(EmbedMenu, { embedUrl: this.canonicalUrl }));
    };
    Object.defineProperty(ShareMenu.prototype, "twitterHref", {
        get: function () {
            var href = "https://twitter.com/intent/tweet/?text=" + encodeURIComponent(this.title);
            if (this.canonicalUrl)
                href += "&url=" + encodeURIComponent(this.canonicalUrl);
            return href;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareMenu.prototype, "facebookHref", {
        get: function () {
            var href = "https://www.facebook.com/dialog/share?app_id=1149943818390250&display=page";
            if (this.canonicalUrl)
                href += "&href=" + encodeURIComponent(this.canonicalUrl);
            return href;
        },
        enumerable: true,
        configurable: true
    });
    ShareMenu.prototype.render = function () {
        var _a = this, editUrl = _a.editUrl, twitterHref = _a.twitterHref, facebookHref = _a.facebookHref;
        return React.createElement("div", { className: "shareMenu", onClick: function (evt) { return evt.stopPropagation(); } },
            React.createElement("h2", null, "Share"),
            React.createElement("a", { className: "btn", target: "_blank", title: "Tweet a link", href: twitterHref },
                React.createElement("i", { className: "fa fa-twitter" }),
                " Twitter"),
            React.createElement("a", { className: "btn", target: "_blank", title: "Share on Facebook", href: facebookHref },
                React.createElement("i", { className: "fa fa-facebook" }),
                " Facebook"),
            React.createElement("a", { className: "btn", title: "Embed this visualization in another HTML document", onClick: this.onEmbed },
                React.createElement("i", { className: "fa fa-code" }),
                " Embed"),
            editUrl && React.createElement("a", { className: "btn", target: "_blank", title: "Edit chart", href: editUrl },
                React.createElement("i", { className: "fa fa-edit" }),
                " Edit"));
    };
    __decorate([
        mobx_1.computed
    ], ShareMenu.prototype, "title", null);
    __decorate([
        mobx_1.computed
    ], ShareMenu.prototype, "editUrl", null);
    __decorate([
        mobx_1.computed
    ], ShareMenu.prototype, "canonicalUrl", null);
    __decorate([
        mobx_1.observable
    ], ShareMenu.prototype, "isEmbedMenuActive", void 0);
    __decorate([
        mobx_1.action.bound
    ], ShareMenu.prototype, "onClickOutside", null);
    __decorate([
        mobx_1.action.bound
    ], ShareMenu.prototype, "onEmbed", null);
    __decorate([
        mobx_1.computed
    ], ShareMenu.prototype, "twitterHref", null);
    __decorate([
        mobx_1.computed
    ], ShareMenu.prototype, "facebookHref", null);
    ShareMenu = __decorate([
        mobx_react_1.observer
    ], ShareMenu);
    return ShareMenu;
}(React.Component));
var HighlightToggle = /** @class */ (function (_super) {
    __extends(HighlightToggle, _super);
    function HighlightToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HighlightToggle.prototype, "chart", {
        get: function () { return this.props.chart; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HighlightToggle.prototype, "highlight", {
        get: function () { return this.props.highlightToggle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HighlightToggle.prototype, "highlightParams", {
        get: function () {
            return Util_2.getQueryParams((this.highlight.paramStr || "").substring(1));
        },
        enumerable: true,
        configurable: true
    });
    HighlightToggle.prototype.onHighlightToggle = function (e) {
        if (e.currentTarget.checked) {
            var params = Util_2.getQueryParams();
            this.chart.url.populateFromURL(Util_1.extend(params, this.highlightParams));
        }
        else {
            this.chart.data.selectedKeys = [];
        }
    };
    Object.defineProperty(HighlightToggle.prototype, "isHighlightActive", {
        get: function () {
            var _this = this;
            var params = Util_2.getQueryParams();
            var isActive = true;
            Util_1.keys(this.highlightParams).forEach(function (key) {
                if (params[key] !== _this.highlightParams[key])
                    isActive = false;
            });
            return isActive;
        },
        enumerable: true,
        configurable: true
    });
    HighlightToggle.prototype.render = function () {
        var _a = this, highlight = _a.highlight, isHighlightActive = _a.isHighlightActive;
        return React.createElement("label", { className: "clickable HighlightToggle" },
            React.createElement("input", { type: "checkbox", checked: isHighlightActive, onChange: this.onHighlightToggle }),
            " ",
            highlight.description);
    };
    __decorate([
        mobx_1.computed
    ], HighlightToggle.prototype, "chart", null);
    __decorate([
        mobx_1.computed
    ], HighlightToggle.prototype, "highlight", null);
    __decorate([
        mobx_1.computed
    ], HighlightToggle.prototype, "highlightParams", null);
    __decorate([
        mobx_1.action.bound
    ], HighlightToggle.prototype, "onHighlightToggle", null);
    HighlightToggle = __decorate([
        mobx_react_1.observer
    ], HighlightToggle);
    return HighlightToggle;
}(React.Component));
var AbsRelToggle = /** @class */ (function (_super) {
    __extends(AbsRelToggle, _super);
    function AbsRelToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbsRelToggle.prototype.onToggle = function () {
        var stackedArea = this.props.chart.stackedArea;
        stackedArea.isRelative = !stackedArea.isRelative;
    };
    AbsRelToggle.prototype.render = function () {
        var chart = this.props.chart;
        return React.createElement("label", { className: "clickable" },
            React.createElement("input", { type: "checkbox", checked: chart.stackedArea.isRelative, onChange: this.onToggle }),
            " ",
            chart.isStackedArea ? "Relative" : "Average annual change");
    };
    __decorate([
        mobx_1.action.bound
    ], AbsRelToggle.prototype, "onToggle", null);
    AbsRelToggle = __decorate([
        mobx_react_1.observer
    ], AbsRelToggle);
    return AbsRelToggle;
}(React.Component));
var TimelineControl = /** @class */ (function (_super) {
    __extends(TimelineControl, _super);
    function TimelineControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineControl.prototype.onMapTargetChange = function (_a) {
        var targetStartYear = _a.targetStartYear;
        this.props.chart.map.targetYear = targetStartYear;
    };
    TimelineControl.prototype.onScatterTargetChange = function (_a) {
        var targetStartYear = _a.targetStartYear, targetEndYear = _a.targetEndYear;
        this.props.chart.timeDomain = [targetStartYear, targetEndYear];
    };
    TimelineControl.prototype.onTimelineStart = function () {
        this.props.chart.scatter.useTimelineDomains = true;
    };
    TimelineControl.prototype.onTimelineStop = function () {
        this.props.chart.scatter.useTimelineDomains = false;
    };
    TimelineControl.prototype.render = function () {
        var chart = this.props.chart;
        if (chart.props.tab === 'map') {
            var map = chart.map;
            return React.createElement(HTMLTimeline_1.default, { years: map.data.timelineYears, onTargetChange: this.onMapTargetChange, startYear: map.data.targetYear, endYear: map.data.targetYear, singleYearMode: true });
        }
        else {
            return React.createElement(HTMLTimeline_1.default, { years: chart.scatter.timelineYears, onTargetChange: this.onScatterTargetChange, startYear: chart.scatter.startYear, endYear: chart.scatter.endYear, onStartDrag: this.onTimelineStart, onStopDrag: this.onTimelineStop });
        }
    };
    __decorate([
        mobx_1.action.bound
    ], TimelineControl.prototype, "onMapTargetChange", null);
    __decorate([
        mobx_1.action.bound
    ], TimelineControl.prototype, "onScatterTargetChange", null);
    __decorate([
        mobx_1.action.bound
    ], TimelineControl.prototype, "onTimelineStart", null);
    __decorate([
        mobx_1.action.bound
    ], TimelineControl.prototype, "onTimelineStop", null);
    TimelineControl = __decorate([
        mobx_react_1.observer
    ], TimelineControl);
    return TimelineControl;
}(React.Component));
var ControlsFooter = /** @class */ (function () {
    function ControlsFooter(props) {
        this.isShareMenuActive = false;
        this.props = props;
    }
    Object.defineProperty(ControlsFooter.prototype, "addDataTerm", {
        get: function () {
            var chart = this.props.chart;
            return chart.data.isSingleEntity ? "data" : chart.entityType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlsFooter.prototype, "hasTimeline", {
        get: function () {
            var chart = this.props.chart;
            return (chart.tab === 'map' && chart.map.data.hasTimeline) || (chart.tab === 'chart' && chart.isScatter && chart.scatter.hasTimeline);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlsFooter.prototype, "hasExtraControls", {
        get: function () {
            var chart = this.props.chart;
            return chart.tab === 'chart' && (chart.data.canAddData || chart.isScatter || chart.data.canChangeEntity || (chart.isStackedArea && chart.stackedArea.canToggleRelative));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlsFooter.prototype, "hasSpace", {
        get: function () {
            return this.props.width > 700;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlsFooter.prototype, "numLines", {
        get: function () {
            var numLines = 1;
            if (this.hasTimeline)
                numLines += 1;
            if (this.hasExtraControls)
                numLines += 1;
            if (this.hasSpace && numLines > 1)
                numLines -= 1;
            return numLines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlsFooter.prototype, "height", {
        get: function () {
            return this.numLines * 40;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ControlsFooter.prototype, "isShareMenuActive", void 0);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "addDataTerm", null);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "hasTimeline", null);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "hasExtraControls", null);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "hasSpace", null);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "numLines", null);
    __decorate([
        mobx_1.computed
    ], ControlsFooter.prototype, "height", null);
    return ControlsFooter;
}());
exports.ControlsFooter = ControlsFooter;
var ControlsFooterView = /** @class */ (function (_super) {
    __extends(ControlsFooterView, _super);
    function ControlsFooterView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlsFooterView.prototype.onShareMenu = function () {
        this.props.controlsFooter.isShareMenuActive = !this.props.controlsFooter.isShareMenuActive;
    };
    ControlsFooterView.prototype.onDataSelect = function () {
        this.props.controlsFooter.props.chartView.isSelectingData = true;
    };
    ControlsFooterView.prototype.render = function () {
        var props = this.props;
        var _a = props.controlsFooter, isShareMenuActive = _a.isShareMenuActive, hasTimeline = _a.hasTimeline, hasExtraControls = _a.hasExtraControls, addDataTerm = _a.addDataTerm, hasSpace = _a.hasSpace;
        var _b = props.controlsFooter.props, chart = _b.chart, chartView = _b.chartView;
        var tabs = React.createElement("nav", { className: "tabs" },
            React.createElement("ul", null,
                chart.availableTabs.map(function (tabName) {
                    return tabName !== 'download' && React.createElement("li", { className: "tab clickable" + (tabName === chart.tab ? ' active' : ''), onClick: function () { return chart.tab = tabName; } },
                        React.createElement("a", null, tabName));
                }),
                React.createElement("li", { className: "tab clickable icon" + (chart.tab === 'download' ? ' active' : ''), onClick: function () { return chart.tab = 'download'; }, title: "Download as .png or .svg" },
                    React.createElement("a", null,
                        React.createElement("i", { className: "fa fa-download" }))),
                React.createElement("li", { className: "clickable icon" },
                    React.createElement("a", { title: "Share", onClick: this.onShareMenu },
                        React.createElement("i", { className: "fa fa-share-alt" }))),
                chartView.isEmbed && React.createElement("li", { className: "clickable icon" },
                    React.createElement("a", { title: "Open chart in new tab", href: chart.url.canonicalUrl, target: "_blank" },
                        React.createElement("i", { className: "fa fa-expand" })))));
        var timeline = hasTimeline && React.createElement(TimelineControl, { chart: chart });
        var extraControls = hasExtraControls && React.createElement("div", { className: "extraControls" },
            chart.data.canAddData && React.createElement("button", { onClick: this.onDataSelect }, chart.isScatter ? React.createElement("span", null,
                React.createElement("i", { className: "fa fa-search" }),
                " Search") : React.createElement("span", null,
                React.createElement("i", { className: "fa fa-plus" }),
                " Add ",
                addDataTerm)),
            chart.data.canChangeEntity && React.createElement("button", { onClick: this.onDataSelect },
                React.createElement("i", { className: "fa fa-exchange" }),
                " Change ",
                chart.entityType),
            chart.isScatter && chart.highlightToggle && React.createElement(HighlightToggle, { chart: chart, highlightToggle: chart.highlightToggle }),
            chart.isStackedArea && chart.stackedArea.canToggleRelative && React.createElement(AbsRelToggle, { chart: chart }),
            chart.isScatter && chart.scatter.canToggleRelative && React.createElement(AbsRelToggle, { chart: chart }));
        return React.createElement("div", { className: "ControlsFooter", style: { height: props.controlsFooter.height } },
            hasTimeline && (hasExtraControls || !hasSpace) && React.createElement("div", { className: "footerRowSingle" }, timeline),
            hasExtraControls && !hasSpace && React.createElement("div", { className: "footerRowSingle" }, extraControls),
            hasSpace && React.createElement("div", { className: "footerRowMulti" },
                React.createElement("div", null, hasExtraControls ? extraControls : timeline),
                tabs),
            !hasSpace && React.createElement("div", { className: "footerRowSingle" }, tabs),
            isShareMenuActive && React.createElement(ShareMenu, { chartView: chartView, chart: chart, onDismiss: this.onShareMenu }));
    };
    __decorate([
        mobx_1.action.bound
    ], ControlsFooterView.prototype, "onShareMenu", null);
    __decorate([
        mobx_1.action.bound
    ], ControlsFooterView.prototype, "onDataSelect", null);
    ControlsFooterView = __decorate([
        mobx_react_1.observer
    ], ControlsFooterView);
    return ControlsFooterView;
}(React.Component));
exports.ControlsFooterView = ControlsFooterView;
//# sourceMappingURL=ControlsFooter.js.map