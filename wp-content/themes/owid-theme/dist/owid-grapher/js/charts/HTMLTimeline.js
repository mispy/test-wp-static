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
var d3_selection_1 = require("d3-selection");
var Util_1 = require("./Util");
var React = require("react");
var Bounds_1 = require("./Bounds");
var Util_2 = require("./Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline(props) {
        var _this = _super.call(this, props) || this;
        _this.isPlaying = false;
        _this.dragOffsets = [0, 0];
        mobx_1.action(function () {
            _this.startYearInput = props.startYear;
            _this.endYearInput = props.endYear;
        })();
        return _this;
    }
    Object.defineProperty(Timeline.prototype, "isDragging", {
        get: function () {
            return !!this.dragTarget;
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.componentWillMount = function () {
        var _this = this;
        mobx_1.autorun(function () {
            var isPlaying = _this.isPlaying;
            if (isPlaying)
                _this.onStartPlaying();
            else
                _this.onStopPlaying();
        });
        var _a = this.props, onStartDrag = _a.onStartDrag, onStopDrag = _a.onStopDrag;
        mobx_1.autorun(function () {
            var _a = _this, isPlaying = _a.isPlaying, isDragging = _a.isDragging;
            if (isPlaying || isDragging) {
                _this.context.chart.url.debounceMode = true;
                if (onStartDrag)
                    onStartDrag();
            }
            else {
                _this.context.chart.url.debounceMode = false;
                if (onStopDrag)
                    onStopDrag();
            }
        });
        mobx_1.autorunAsync(function () {
            if (_this.props.onInputChange)
                _this.props.onInputChange({ startYear: _this.startYear, endYear: _this.endYear });
        });
        mobx_1.autorunAsync(function () {
            if (_this.props.onTargetChange)
                _this.props.onTargetChange({ targetStartYear: _this.targetStartYear, targetEndYear: _this.targetEndYear });
        });
    };
    Object.defineProperty(Timeline.prototype, "years", {
        get: function () {
            return this.props.years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "minYear", {
        get: function () {
            return Util_1.first(this.props.years);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "maxYear", {
        get: function () {
            return Util_1.last(this.props.years);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "startYear", {
        // Sanity check the input
        get: function () {
            var _a = this, startYearInput = _a.startYearInput, endYearInput = _a.endYearInput, minYear = _a.minYear, maxYear = _a.maxYear;
            return Math.min(maxYear, Math.max(minYear, Math.min(startYearInput, endYearInput)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "roundedStartYear", {
        // Closest year to the input start year
        // e.g. 1954 => 1955
        get: function () {
            var _a = this, years = _a.years, startYear = _a.startYear;
            return Util_1.sortBy(years, function (year) { return Math.abs(year - startYear); })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "targetStartYear", {
        // Previous year from the input start year
        // e.g. 1954 => 1950
        get: function () {
            var _a = this, years = _a.years, startYear = _a.startYear;
            return Util_1.find(Util_1.sortBy(years, function (year) { return Math.abs(year - startYear); }), function (year) { return year <= startYear; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "endYear", {
        get: function () {
            var _a = this, startYearInput = _a.startYearInput, endYearInput = _a.endYearInput, minYear = _a.minYear, maxYear = _a.maxYear;
            return Math.min(maxYear, Math.max(minYear, Math.max(startYearInput, endYearInput)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "roundedEndYear", {
        get: function () {
            var _a = this, years = _a.years, endYear = _a.endYear;
            return Util_1.sortBy(years, function (year) { return Math.abs(year - endYear); })[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "targetEndYear", {
        get: function () {
            var _a = this, years = _a.years, endYear = _a.endYear;
            return Util_1.find(Util_1.sortBy(years, function (year) { return Math.abs(year - endYear); }), function (year) { return year <= endYear; });
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this, isPlaying = _a.isPlaying, isDragging = _a.isDragging;
        if (!isPlaying && !isDragging) {
            this.startYearInput = nextProps.startYear;
            this.endYearInput = nextProps.endYear;
        }
    };
    Timeline.prototype.onStartPlaying = function () {
        var _this = this;
        var lastTime = null;
        var ticksPerSec = 5;
        var playFrame = mobx_1.action(function (time) {
            var _a = _this, isPlaying = _a.isPlaying, endYear = _a.endYear, years = _a.years, minYear = _a.minYear, maxYear = _a.maxYear;
            if (!isPlaying)
                return;
            if (lastTime === null) {
                // If we start playing from the end, loop around to beginning
                if (endYear >= maxYear) {
                    _this.startYearInput = minYear;
                    _this.endYearInput = minYear;
                }
            }
            else {
                var elapsed = time - lastTime;
                if (endYear >= maxYear) {
                    _this.isPlaying = false;
                }
                else {
                    var nextYear = years[years.indexOf(endYear) + 1];
                    var yearsToNext = nextYear - endYear;
                    _this.endYearInput = endYear + (Math.max(yearsToNext / 3, 1) * elapsed * ticksPerSec / 1000);
                    if (_this.props.singleYearMode)
                        _this.startYearInput = _this.endYearInput;
                }
            }
            lastTime = time;
            _this.animRequest = requestAnimationFrame(playFrame);
        });
        this.animRequest = requestAnimationFrame(playFrame);
    };
    Timeline.prototype.onStopPlaying = function () {
        cancelAnimationFrame(this.animRequest);
    };
    Object.defineProperty(Timeline.prototype, "sliderBounds", {
        get: function () {
            var slider = this.base.querySelector(".slider");
            return slider ? Bounds_1.default.fromRect(slider.getBoundingClientRect()) : new Bounds_1.default(0, 0, 100, 100);
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.getInputYearFromMouse = function (evt) {
        var slider = this.base.querySelector(".slider");
        var sliderBounds = slider.getBoundingClientRect();
        var _a = this, minYear = _a.minYear, maxYear = _a.maxYear;
        var mouseX = Util_2.getRelativeMouse(slider, evt).x;
        var fracWidth = mouseX / sliderBounds.width;
        var inputYear = minYear + fracWidth * (maxYear - minYear);
        return inputYear;
    };
    Timeline.prototype.onDrag = function (inputYear) {
        var _a = this, props = _a.props, dragTarget = _a.dragTarget, minYear = _a.minYear, maxYear = _a.maxYear;
        if (props.singleYearMode) {
            this.startYearInput = inputYear;
            this.endYearInput = inputYear;
        }
        else if (dragTarget === 'start')
            this.startYearInput = inputYear;
        else if (dragTarget === 'end')
            this.endYearInput = inputYear;
        else if (dragTarget === 'both') {
            this.startYearInput = this.dragOffsets[0] + inputYear;
            this.endYearInput = this.dragOffsets[1] + inputYear;
            if (this.startYearInput < minYear) {
                this.startYearInput = minYear;
                this.endYearInput = minYear + (this.dragOffsets[1] - this.dragOffsets[0]);
            }
            else if (this.endYearInput > maxYear) {
                this.startYearInput = maxYear + (this.dragOffsets[0] - this.dragOffsets[1]);
                this.endYearInput = maxYear;
            }
        }
    };
    Timeline.prototype.onMouseDown = function (e) {
        // Don't do mousemove if we clicked the play or pause button
        var targetEl = d3_selection_1.select(e.target);
        if (targetEl.classed('toggle'))
            return;
        var _a = this, startYear = _a.startYear, endYear = _a.endYear;
        var singleYearMode = this.props.singleYearMode;
        var inputYear = this.getInputYearFromMouse(e);
        if (startYear === endYear && (targetEl.classed('startMarker') || targetEl.classed('endMarker')))
            this.dragTarget = 'both';
        else if (!singleYearMode && (targetEl.classed('startMarker') || inputYear <= startYear))
            this.dragTarget = 'start';
        else if (!singleYearMode && (targetEl.classed('endMarker') || inputYear >= endYear))
            this.dragTarget = 'end';
        else
            this.dragTarget = 'both';
        if (this.dragTarget === 'both')
            this.dragOffsets = [this.startYearInput - inputYear, this.endYearInput - inputYear];
        this.onDrag(inputYear);
        e.preventDefault();
    };
    Timeline.prototype.onDoubleClick = function (e) {
        var inputYear = this.getInputYearFromMouse(e);
        this.startYearInput = inputYear;
        this.endYearInput = inputYear;
    };
    Timeline.prototype.onMouseMove = function (ev) {
        var _this = this;
        var _a = this, dragTarget = _a.dragTarget, mouseFrameQueued = _a.mouseFrameQueued;
        if (!dragTarget || mouseFrameQueued)
            return;
        this.mouseFrameQueued = true;
        requestAnimationFrame(function () {
            _this.onDrag(_this.getInputYearFromMouse(ev));
            _this.mouseFrameQueued = false;
        });
    };
    Timeline.prototype.onMouseUp = function () {
        this.dragTarget = null;
    };
    // Allow proper dragging behavior even if mouse leaves timeline area
    Timeline.prototype.componentDidMount = function () {
        var _this = this;
        document.documentElement.addEventListener('mouseup', this.onMouseUp);
        document.documentElement.addEventListener('mouseleave', this.onMouseUp);
        document.documentElement.addEventListener('mousemove', this.onMouseMove);
        document.documentElement.addEventListener('touchend', this.onMouseUp);
        document.documentElement.addEventListener('touchmove', this.onMouseMove);
        mobx_1.autorun(function () {
            // If we're not playing or dragging, lock the input to the closest year (no interpolation)
            var _a = _this, isPlaying = _a.isPlaying, isDragging = _a.isDragging, roundedStartYear = _a.roundedStartYear, roundedEndYear = _a.roundedEndYear;
            if (!isPlaying && !isDragging) {
                mobx_1.action(function () {
                    _this.startYearInput = roundedStartYear;
                    _this.endYearInput = roundedEndYear;
                })();
            }
        });
    };
    Timeline.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener('mouseup', this.onMouseUp);
        document.documentElement.removeEventListener('mouseleave', this.onMouseUp);
        document.documentElement.removeEventListener('mousemove', this.onMouseMove);
        document.documentElement.removeEventListener('touchend', this.onMouseUp);
        document.documentElement.removeEventListener('touchmove', this.onMouseMove);
    };
    Timeline.prototype.onTogglePlay = function () {
        this.isPlaying = !this.isPlaying;
    };
    Timeline.prototype.render = function () {
        var _a = this, minYear = _a.minYear, maxYear = _a.maxYear, isPlaying = _a.isPlaying, startYear = _a.startYear, endYear = _a.endYear;
        var startYearProgress = (startYear - minYear) / (maxYear - minYear);
        var endYearProgress = (endYear - minYear) / (maxYear - minYear);
        return React.createElement("div", { className: "clickable TimelineControl", onTouchStart: this.onMouseDown, onMouseDown: this.onMouseDown },
            React.createElement("div", { onMouseDown: function (e) { return e.stopPropagation(); }, onClick: this.onTogglePlay }, isPlaying ? React.createElement("i", { className: "fa fa-pause" }) : React.createElement("i", { className: "fa fa-play" })),
            React.createElement("div", null, Util_2.formatYear(minYear)),
            React.createElement("div", { className: "slider" },
                React.createElement("div", { className: "handle", style: { left: startYearProgress * 100 + "%" } }),
                React.createElement("div", { className: "interval", style: { left: startYearProgress * 100 + "%", right: 100 - (endYearProgress * 100) + "%" } }),
                React.createElement("div", { className: "handle", style: { left: endYearProgress * 100 + "%" } })),
            React.createElement("div", null, Util_2.formatYear(maxYear)));
    };
    __decorate([
        mobx_1.observable
    ], Timeline.prototype, "startYearInput", void 0);
    __decorate([
        mobx_1.observable
    ], Timeline.prototype, "endYearInput", void 0);
    __decorate([
        mobx_1.observable
    ], Timeline.prototype, "isPlaying", void 0);
    __decorate([
        mobx_1.observable
    ], Timeline.prototype, "dragTarget", void 0);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "isDragging", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "years", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "minYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "maxYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "startYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "roundedStartYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "targetStartYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "endYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "roundedEndYear", null);
    __decorate([
        mobx_1.computed
    ], Timeline.prototype, "targetEndYear", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "componentWillReceiveProps", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onStartPlaying", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onDrag", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onMouseDown", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onDoubleClick", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onMouseMove", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onMouseUp", null);
    __decorate([
        mobx_1.action.bound
    ], Timeline.prototype, "onTogglePlay", null);
    Timeline = __decorate([
        mobx_react_1.observer
    ], Timeline);
    return Timeline;
}(React.Component));
exports.default = Timeline;
//# sourceMappingURL=HTMLTimeline.js.map