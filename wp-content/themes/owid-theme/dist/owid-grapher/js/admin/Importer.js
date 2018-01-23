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
var React = require("react");
var ReactDOM = require("react-dom");
var Util_1 = require("../charts/Util");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var parse = require("csv-parse");
var Forms_1 = require("../admin/Forms");
var styles = require('./Importer.css');
var Source = /** @class */ (function () {
    function Source(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? null : _c, _d = _b.name, name = _d === void 0 ? "" : _d, _e = _b.dataPublishedBy, dataPublishedBy = _e === void 0 ? "" : _e, _f = _b.dataPublisherSource, dataPublisherSource = _f === void 0 ? "" : _f, _g = _b.link, link = _g === void 0 ? "" : _g, _h = _b.retrievedDate, retrievedDate = _h === void 0 ? "" : _h, _j = _b.additionalInfo, additionalInfo = _j === void 0 ? "" : _j;
        this.id = id;
        this.name = name;
        this.dataPublishedBy = dataPublishedBy;
        this.dataPublisherSource = dataPublisherSource;
        this.link = link;
        this.retrievedDate = retrievedDate;
        this.additionalInfo = additionalInfo;
    }
    Source.template = "";
    __decorate([
        mobx_1.observable
    ], Source.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "name", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "dataPublishedBy", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "dataPublisherSource", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "link", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "retrievedDate", void 0);
    __decorate([
        mobx_1.observable
    ], Source.prototype, "additionalInfo", void 0);
    return Source;
}());
var Variable = /** @class */ (function () {
    function Variable(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.overwriteId, overwriteId = _c === void 0 ? null : _c, _d = _b.name, name = _d === void 0 ? "" : _d, _e = _b.description, description = _e === void 0 ? "" : _e, _f = _b.coverage, coverage = _f === void 0 ? "" : _f, _g = _b.timespan, timespan = _g === void 0 ? "" : _g, _h = _b.unit, unit = _h === void 0 ? "" : _h, _j = _b.source, source = _j === void 0 ? null : _j;
        this.overwriteId = overwriteId;
        this.name = name;
        this.unit = unit;
        this.coverage = coverage;
        this.timespan = timespan;
        this.description = description;
        this.source = source;
        this.values = [];
    }
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "overwriteId", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "name", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "unit", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "description", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "coverage", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "timespan", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "source", void 0);
    __decorate([
        mobx_1.observable
    ], Variable.prototype, "values", void 0);
    return Variable;
}());
var Dataset = /** @class */ (function () {
    function Dataset(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? null : _c, _d = _b.name, name = _d === void 0 ? "" : _d, _e = _b.description, description = _e === void 0 ? "" : _e, _f = _b.subcategoryId, subcategoryId = _f === void 0 ? null : _f;
        var _this = this;
        this.subcategoryId = null;
        this.existingVariables = [];
        this.newVariables = [];
        this.years = [];
        this.entities = [];
        this.entityNames = [];
        this.importError = null;
        this.importRequest = null;
        this.importSuccess = false;
        this.id = id;
        this.name = name;
        this.description = description;
        this.subcategoryId = subcategoryId;
        // When a single source becomes available (either from the database or added by user) we
        // should use it as the default for all variables without a soruce
        mobx_1.reaction(function () { return _this.sources[0] && _this.newVariables; }, function () {
            var defaultSource = _this.sources[0];
            if (!defaultSource)
                return;
            for (var _i = 0, _a = _this.newVariables; _i < _a.length; _i++) {
                var variable = _a[_i];
                if (!variable.source)
                    variable.source = defaultSource;
            }
        });
        mobx_1.autorun(function () {
            if (_this.id == null)
                return;
            App.fetchJSON("/admin/datasets/" + _this.id + ".json").then(function (data) {
                // todo error handling
                _this.existingVariables = data.variables;
            });
        });
        // Match existing to new variables
        mobx_1.reaction(function () { return _this.newVariables && _this.existingVariables; }, function () {
            if (!_this.newVariables || !_this.existingVariables)
                return;
            _this.newVariables.forEach(function (variable) {
                var match = _this.existingVariables.filter(function (v) { return v.name === variable.name; })[0];
                if (match) {
                    Util_1.keys(match).forEach(function (key) {
                        if (key === 'id')
                            variable.overwriteId = match[key];
                        else
                            variable[key] = match[key];
                    });
                }
            });
        });
    }
    Dataset.fromServer = function (d) {
        return new Dataset({ id: d.id, name: d.name, description: d.description, subcategoryId: d.fk_dst_subcat_id });
    };
    Object.defineProperty(Dataset.prototype, "isLoading", {
        get: function () {
            return this.id && !this.existingVariables.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dataset.prototype, "sources", {
        get: function () {
            var _a = this, newVariables = _a.newVariables, existingVariables = _a.existingVariables;
            var sources = Util_1.map(existingVariables, function (v) { return v.source; }).concat(Util_1.map(newVariables, function (v) { return v.source; }));
            return Util_1.uniqBy(Util_1.filter(sources), function (source) { return source.id; });
        },
        enumerable: true,
        configurable: true
    });
    Dataset.prototype.save = function () {
        var _this = this;
        var _a = this, newVariables = _a.newVariables, entityNames = _a.entityNames, entities = _a.entities, years = _a.years;
        var requestData = {
            dataset: {
                id: this.id,
                name: this.name,
                description: this.description,
                subcategoryId: this.subcategoryId
            },
            years: years, entityNames: entityNames, entities: entities,
            variables: newVariables
        };
        this.importError = null;
        this.importSuccess = false;
        this.importRequest = App.postJSON('/admin/import/variables', requestData).then(function (response) {
            if (response.status !== 200)
                return response.text().then(function (err) { return _this.importError = err; });
            else {
                return response.json().then(function (json) {
                    _this.importSuccess = true;
                    _this.id = json.datasetId;
                });
            }
        });
    };
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "name", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "description", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "subcategoryId", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "existingVariables", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "newVariables", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "years", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "entities", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "entityNames", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "importError", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "importRequest", void 0);
    __decorate([
        mobx_1.observable
    ], Dataset.prototype, "importSuccess", void 0);
    __decorate([
        mobx_1.computed
    ], Dataset.prototype, "isLoading", null);
    __decorate([
        mobx_1.computed
    ], Dataset.prototype, "sources", null);
    __decorate([
        mobx_1.action.bound
    ], Dataset.prototype, "save", null);
    return Dataset;
}());
var DataPreview = /** @class */ (function (_super) {
    __extends(DataPreview, _super);
    function DataPreview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rowOffset = 0;
        _this.visibleRows = 10;
        return _this;
    }
    Object.defineProperty(DataPreview.prototype, "numRows", {
        get: function () {
            return this.props.csv.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    DataPreview.prototype.onScroll = function (_a) {
        var target = _a.target;
        var scrollTop = target.scrollTop, scrollHeight = target.scrollHeight;
        var numRows = this.numRows;
        var rowOffset = Math.round(scrollTop / scrollHeight * numRows);
        target.scrollTop = Math.round(rowOffset / numRows * scrollHeight);
        this.rowOffset = rowOffset;
    };
    DataPreview.prototype.render = function () {
        var rows = this.props.csv.rows;
        var _a = this, rowOffset = _a.rowOffset, visibleRows = _a.visibleRows, numRows = _a.numRows;
        var height = 50;
        return React.createElement("div", { style: { height: height * visibleRows, 'overflow-y': 'scroll' }, onScroll: this.onScroll },
            React.createElement("div", { style: { height: height * numRows, 'padding-top': height * rowOffset } },
                React.createElement("table", { className: "table", style: { background: 'white' } }, Util_1.map(rows.slice(rowOffset, rowOffset + visibleRows), function (row, i) {
                    return React.createElement("tr", null,
                        React.createElement("td", null, rowOffset + i + 1),
                        Util_1.map(row, function (cell) { return React.createElement("td", { style: { height: height } }, cell); }));
                }))));
    };
    __decorate([
        mobx_1.observable
    ], DataPreview.prototype, "rowOffset", void 0);
    __decorate([
        mobx_1.observable
    ], DataPreview.prototype, "visibleRows", void 0);
    __decorate([
        mobx_1.computed
    ], DataPreview.prototype, "numRows", null);
    __decorate([
        mobx_1.action.bound
    ], DataPreview.prototype, "onScroll", null);
    DataPreview = __decorate([
        mobx_react_1.observer
    ], DataPreview);
    return DataPreview;
}(React.Component));
var EditName = /** @class */ (function (_super) {
    __extends(EditName, _super);
    function EditName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditName.prototype.onInput = function (e) {
        this.props.dataset.name = e.target.value;
    };
    EditName.prototype.render = function () {
        var dataset = this.props.dataset;
        return React.createElement("label", null,
            "Name",
            React.createElement("input", { type: "text", value: dataset.name, onInput: this.onInput, placeholder: "Short name for your dataset", required: true }));
    };
    __decorate([
        mobx_1.action.bound
    ], EditName.prototype, "onInput", null);
    EditName = __decorate([
        mobx_react_1.observer
    ], EditName);
    return EditName;
}(React.Component));
var EditDescription = /** @class */ (function (_super) {
    __extends(EditDescription, _super);
    function EditDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditDescription.prototype.onInput = function (e) {
        this.props.dataset.description = e.target.value;
    };
    EditDescription.prototype.render = function () {
        var dataset = this.props.dataset;
        return React.createElement("label", null,
            "Description",
            React.createElement("textarea", { value: dataset.description, onInput: this.onInput, placeholder: "Optional description for dataset" }));
    };
    __decorate([
        mobx_1.action.bound
    ], EditDescription.prototype, "onInput", null);
    EditDescription = __decorate([
        mobx_react_1.observer
    ], EditDescription);
    return EditDescription;
}(React.Component));
var EditCategory = function (_a) {
    var categories = _a.categories, dataset = _a.dataset;
    var categoriesByParent = Util_1.groupBy(categories, function (category) { return category.parent; });
    return React.createElement("label", null,
        "Category ",
        React.createElement("span", { className: "form-section-desc" }, "(Currently used only for internal organization)"),
        React.createElement("select", { onChange: function (e) { return dataset.subcategoryId = e.target.value; }, value: dataset.subcategoryId }, Util_1.map(categoriesByParent, function (subcats, parent) {
            return React.createElement("optgroup", { label: parent }, Util_1.map(subcats, function (category) {
                return React.createElement("option", { value: category.id }, category.name);
            }));
        })));
};
var EditVariable = /** @class */ (function (_super) {
    __extends(EditVariable, _super);
    function EditVariable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEditingSource = false;
        return _this;
    }
    EditVariable.prototype.onEditSource = function (e) {
        e.preventDefault();
        this.isEditingSource = !this.isEditingSource;
    };
    EditVariable.prototype.render = function () {
        var _this = this;
        var _a = this.props, variable = _a.variable, dataset = _a.dataset;
        var isEditingSource = this.isEditingSource;
        var sourceName = variable.source && (variable.source.id ? variable.source.name : "New: " + variable.source.name);
        return React.createElement("li", { className: styles.editVariable },
            React.createElement("div", { className: "variableProps" },
                React.createElement("label", { className: "name" },
                    "Name ",
                    React.createElement("br", null),
                    React.createElement("span", { className: "form-section-desc explanatory-notes" },
                        "The variable name will be displayed in charts ('Sources' tab). For charts with many variables, the name will be crucial for readers to understand which sources correspond to which variables. ",
                        React.createElement("br", null),
                        " Variable name should be of the format \"Minimal variable description (Source)\". For example: \"Top marignal income tax rate (Piketty 2014)\". Or \"Tax revenue as share of GDP (ICTD 2016)\""),
                    React.createElement("input", { value: variable.name, onInput: function (e) { return variable.name = e.currentTarget.value; }, placeholder: "Enter variable name" })),
                React.createElement("label", { className: "description" },
                    "Description ",
                    React.createElement("br", null),
                    React.createElement("span", { className: "form-section-desc explanatory-notes" },
                        "The variable  description will be displayed in charts (\u2018Sources\u2019 tab). It will be the first row in the table explaining the variable sources.",
                        React.createElement("br", null),
                        "Variable descriptions should be concise but clear and self-contained. They will correspond, roughly, to the information that will go in the subtitle of charts. ",
                        React.createElement("br", null),
                        "For example: \u201CPercentage of the population covered by health insurance (includes affiliated members of health insurance or estimation of the population having free access to health care services provided by the State)\u201D"),
                    React.createElement("textarea", { rows: 4, placeholder: "Short description of variable", value: variable.description, onInput: function (e) { return variable.description = e.currentTarget.value; } })),
                React.createElement("label", null,
                    "Unit ",
                    React.createElement("span", { className: "form-section-desc explanatory-notes" }, "(is displayed in axis-labels as suffix and in the legend of the map)"),
                    React.createElement("input", { value: variable.unit, onInput: function (e) { return variable.unit = e.currentTarget.value; }, placeholder: "e.g. % or $" })),
                React.createElement("label", null,
                    "Geographic Coverage",
                    React.createElement("input", { value: variable.coverage, onInput: function (e) { return variable.coverage = e.currentTarget.value; }, placeholder: "e.g. Global by country" })),
                React.createElement("label", null,
                    "Time Span",
                    React.createElement("input", { value: variable.timespan, onInput: function (e) { return variable.timespan = e.currentTarget.value; }, placeholder: "e.g. 1920-1990" })),
                React.createElement("label", null,
                    "Source",
                    React.createElement("button", { className: "clickable", onClick: this.onEditSource, style: { position: 'relative' } },
                        React.createElement("i", { className: "fa fa-pencil" }),
                        " ",
                        sourceName || 'Add source',
                        React.createElement("input", { type: "text", value: variable.source && variable.source.name, required: true, style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0 } }))),
                React.createElement("label", null,
                    "Action",
                    React.createElement("select", { onChange: function (e) { variable.overwriteId = e.target.value ? parseInt(e.target.value) : undefined; } },
                        React.createElement("option", { value: "", selected: variable.overwriteId == null }, "Create new variable"),
                        Util_1.map(dataset.existingVariables, function (v) {
                            return React.createElement("option", { value: v.id, selected: variable.overwriteId === v.id },
                                "Overwrite ",
                                v.name);
                        })))),
            isEditingSource && React.createElement(EditSource, { variable: variable, dataset: dataset, onSave: function () { return _this.isEditingSource = false; } }));
    };
    __decorate([
        mobx_1.observable
    ], EditVariable.prototype, "isEditingSource", void 0);
    __decorate([
        mobx_1.action.bound
    ], EditVariable.prototype, "onEditSource", null);
    EditVariable = __decorate([
        mobx_react_1.observer
    ], EditVariable);
    return EditVariable;
}(React.Component));
var EditVariables = /** @class */ (function (_super) {
    __extends(EditVariables, _super);
    function EditVariables() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditVariables.prototype.render = function () {
        var dataset = this.props.dataset;
        return React.createElement("section", { className: "form-section variables-section" },
            React.createElement("h3", null, "Variable names and descriptions"),
            React.createElement("p", { className: "form-section-desc" }, "Here you can configure the variables that will be stored for your dataset."),
            React.createElement("ol", null, Util_1.map(dataset.newVariables, function (variable) {
                return React.createElement(EditVariable, { variable: variable, dataset: dataset });
            })));
    };
    EditVariables = __decorate([
        mobx_react_1.observer
    ], EditVariables);
    return EditVariables;
}(React.Component));
var EditSource = /** @class */ (function (_super) {
    __extends(EditSource, _super);
    function EditSource(props) {
        var _this = _super.call(this, props) || this;
        _this.source = null;
        _this.source = props.variable.source || new Source();
        return _this;
    }
    EditSource.prototype.componentDidMount = function () {
        var _this = this;
        mobx_1.reaction(function () { return _this.props.variable.source; }, function () { return _this.source = _this.props.variable.source || _this.source; });
    };
    EditSource.prototype.onChangeSource = function (e) {
        var name = e.target.value;
        this.source = this.props.dataset.sources.filter(function (source) { return source.name === name; })[0] || new Source();
    };
    EditSource.prototype.onSave = function (e) {
        e.preventDefault();
        this.props.variable.source = this.source;
        this.props.onSave();
    };
    EditSource.prototype.render = function () {
        var dataset = this.props.dataset;
        var source = this.source;
        return React.createElement("form", { className: styles.editSource, onSubmit: this.onSave },
            React.createElement("hr", null),
            React.createElement("h4", null, "Edit source"),
            React.createElement("label", null,
                React.createElement("span", null, "Source:"),
                React.createElement("select", { onChange: this.onChangeSource },
                    React.createElement("option", { selected: !source.id }, "Create new"),
                    Util_1.map(dataset.sources, function (otherSource) {
                        return React.createElement("option", { value: otherSource.name, selected: source.name === otherSource.name }, otherSource.name);
                    }))),
            React.createElement("label", null,
                React.createElement("span", null, "Name:"),
                React.createElement("input", { type: "text", required: true, value: source.name, onInput: function (e) { return source.name = e.currentTarget.value; } })),
            React.createElement("p", { className: "form-section-desc" },
                "The source name will be displayed in charts (at the bottom of the \u2018Chart\u2019 and \u2018Map\u2019 tabs). For academic papers, the name of the source should be \u201CAuthors (year)\u201D. For example Arroyo-Abad and Lindert (2016). ",
                React.createElement("br", null),
                "For institutional projects or reports, the name should be \u201CInstitution, Project (year or vintage)\u201D. For example: U.S. Bureau of Labor Statistics, Consumer Expenditure Survey (2015 release). ",
                React.createElement("br", null),
                "For data that we have modified extensively, the name should be \"Our World In Data based on Author (year)\u201D. For example: Our World In Data based on Atkinson (2002) and Sen (2000)."),
            React.createElement("div", { className: "editSourceDescription" },
                React.createElement("label", { className: "description" },
                    React.createElement("label", null,
                        React.createElement("span", null, "Data published by:"),
                        React.createElement("input", { type: "text", value: source.dataPublishedBy, onInput: function (e) { return source.dataPublishedBy = e.currentTarget.value; } })),
                    React.createElement("label", null,
                        React.createElement("span", null, "Data publisher's source:"),
                        React.createElement("input", { type: "text", value: source.dataPublisherSource, onInput: function (e) { return source.dataPublisherSource = e.currentTarget.value; } })),
                    React.createElement("label", null,
                        React.createElement("span", null, "Link:"),
                        React.createElement("input", { type: "text", value: source.link, onInput: function (e) { return source.link = e.currentTarget.value; } })),
                    React.createElement("label", null,
                        React.createElement("span", null, "Retrieved:"),
                        React.createElement("input", { type: "text", value: source.retrievedDate, onInput: function (e) { return source.retrievedDate = e.currentTarget.value; } })),
                    React.createElement("label", null,
                        React.createElement("span", null, "Additional Information:"),
                        React.createElement("textarea", { rows: 5, value: source.additionalInfo, onInput: function (e) { return source.additionalInfo = e.currentTarget.value; } })))),
            React.createElement("p", { className: "form-section-desc" },
                "For academic papers, the first item in the description should be \u201CData published by: complete reference\u201D.  This should be followed by the authors underlying sources, a link to the paper, and the date on which the paper was accessed. ",
                React.createElement("br", null),
                "For institutional projects, the format should be similar, but detailing the corresponding project or report. ",
                React.createElement("br", null),
                "For data that we have modified extensively in order to change the meaning of the data, we should list OWID as publisher, and provide the name of the person in charge of the calculation.",
                React.createElement("br", null),
                "The field \u201CData publisher\u2019s source\u201D should give basic pointers (e.g. surveys data). Anything longer than a line should be relegated to the field \u201CAdditional information\u201D. ",
                React.createElement("br", null)),
            source.id && React.createElement("p", { className: "existing-source-warning text-warning" },
                React.createElement("i", { className: "fa fa-warning" }),
                " You are editing an existing source. Changes may also affect other variables."),
            React.createElement("input", { type: "submit", className: "btn btn-success", value: "Save" }));
    };
    __decorate([
        mobx_1.observable
    ], EditSource.prototype, "source", void 0);
    __decorate([
        mobx_1.action.bound
    ], EditSource.prototype, "onChangeSource", null);
    __decorate([
        mobx_1.action.bound
    ], EditSource.prototype, "onSave", null);
    EditSource = __decorate([
        mobx_react_1.observer
    ], EditSource);
    return EditSource;
}(React.Component));
var ImportProgressModal = /** @class */ (function (_super) {
    __extends(ImportProgressModal, _super);
    function ImportProgressModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImportProgressModal.prototype.onDismiss = function () {
        var dataset = this.props.dataset;
        dataset.importRequest = null;
    };
    ImportProgressModal.prototype.render = function () {
        var dataset = this.props.dataset;
        return React.createElement(Forms_1.Modal, { onClose: this.onDismiss },
            React.createElement("div", { className: "modal-header" },
                React.createElement("h4", { className: "modal-title" }, "Import progress")),
            React.createElement("div", { className: styles.importProgress + " modal-body" },
                React.createElement("div", { className: "progressInner" },
                    React.createElement("p", { className: "success" },
                        React.createElement("i", { className: "fa fa-check" }),
                        " Preparing import for ",
                        dataset.years.length,
                        " values..."),
                    dataset.importError && React.createElement("p", { className: "error" },
                        React.createElement("i", { className: "fa fa-times" }),
                        " Error: ",
                        dataset.importError),
                    dataset.importSuccess && React.createElement("p", { className: "success" },
                        React.createElement("i", { className: "fa fa-check" }),
                        " Import successful!"),
                    !dataset.importSuccess && !dataset.importError && React.createElement("div", { style: { 'text-align': 'center' } },
                        React.createElement("i", { className: "fa fa-spin fa-spinner" }))),
                dataset.importSuccess && React.createElement("a", { className: "btn btn-success", href: App.url("/admin/datasets/" + dataset.id) }, "Done"),
                dataset.importError && React.createElement("a", { className: "btn btn-warning", onClick: this.onDismiss }, "Dismiss")));
    };
    __decorate([
        mobx_1.action.bound
    ], ImportProgressModal.prototype, "onDismiss", null);
    ImportProgressModal = __decorate([
        mobx_react_1.observer
    ], ImportProgressModal);
    return ImportProgressModal;
}(React.Component));
var CSV = /** @class */ (function () {
    function CSV(_a) {
        var _b = _a.filename, filename = _b === void 0 ? "" : _b, _c = _a.rows, rows = _c === void 0 ? [] : _c, _d = _a.existingEntities, existingEntities = _d === void 0 ? [] : _d;
        this.filename = filename;
        this.rows = rows;
        this.existingEntities = existingEntities;
    }
    CSV.transformSingleLayout = function (rows) {
        var newRows = [['Entity', 'Year', this.basename]];
        for (var i = 1; i < rows.length; i++) {
            var entity = rows[i][0];
            for (var j = 1; j < rows[0].length; j++) {
                var year = rows[0][j];
                var value = rows[i][j];
                newRows.push([entity, year, value]);
            }
        }
        return newRows;
    };
    Object.defineProperty(CSV.prototype, "basename", {
        get: function () {
            return (this.filename.match(/(.*?)(.csv)?$/) || [])[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSV.prototype, "data", {
        get: function () {
            var rows = this.rows;
            var variables = [];
            var entityNameCheck = {};
            var entityNames = [];
            var entities = [];
            var years = [];
            var headingRow = rows[0];
            for (var _i = 0, _a = headingRow.slice(2); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                variables.push(new Variable({ name: name_1 }));
            }
            for (var i = 1; i < rows.length; i++) {
                var row = rows[i];
                var entityName = row[0], year = row[1];
                var entity = entityNameCheck[entityName];
                if (entity === undefined) {
                    entity = entityNames.length;
                    entityNames.push(entityName);
                    entityNameCheck[entityName] = entity;
                }
                entities.push(entity);
                years.push(+year);
                row.slice(2).forEach(function (value, j) {
                    variables[j].values.push(value);
                });
            }
            return {
                variables: variables,
                entityNames: entityNames,
                entities: entities,
                years: years
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSV.prototype, "validation", {
        get: function () {
            var validation = { results: [], passed: false };
            var rows = this.rows;
            // Check we actually have enough data
            if (rows[0].length < 3) {
                validation.results.push({
                    class: 'error',
                    message: "No variables detected. CSV should have at least 3 columns."
                });
            }
            // Make sure entities and years are valid
            var invalidLines = [];
            for (var i = 1; i < rows.length; i++) {
                var year = rows[i][1];
                if ((+year).toString() !== year || Util_1.isEmpty(rows[i][0])) {
                    invalidLines.push(i + 1);
                }
            }
            if (invalidLines.length) {
                validation.results.push({
                    class: 'error',
                    message: "Invalid or missing entity/year on lines: " + invalidLines.join(', ')
                });
            }
            // Check for duplicates
            var uniqCheck = {};
            for (var i = 1; i < rows.length; i++) {
                var row = rows[i];
                var entityName = row[0], year = row[1];
                var key = entityName + '-' + year;
                uniqCheck[key] = uniqCheck[key] || 0;
                uniqCheck[key] += 1;
            }
            Util_1.keys(uniqCheck).forEach(function (key) {
                var count = uniqCheck[key];
                if (count > 1) {
                    validation.results.push({
                        class: 'error',
                        message: "Duplicates detected: " + count + " instances of " + key + "."
                    });
                }
            });
            // Warn about non-numeric data
            var nonNumeric = [];
            for (var i = 1; i < rows.length; i++) {
                var row = rows[i];
                for (var j = 2; j < row.length; j++) {
                    if (row[j] !== '' && (isNaN(parseFloat(row[j])) || !row[j].match(/^[0-9.-]+$/)))
                        nonNumeric.push(i + 1 + " `" + row[j] + "`");
                }
            }
            if (nonNumeric.length)
                validation.results.push({
                    class: 'warning',
                    message: "Non-numeric data detected on line " + nonNumeric.join(", ")
                });
            // Warn if we're creating novel entities
            var newEntities = Util_1.difference(this.data.entityNames, this.existingEntities);
            if (newEntities.length >= 1) {
                validation.results.push({
                    class: 'warning',
                    message: "These entities were not found in the database and will be created: " + newEntities.join(', ')
                });
            }
            validation.passed = !Util_1.find(validation.results, function (result) { return result.class === "error"; });
            return validation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSV.prototype, "isValid", {
        get: function () {
            return this.validation.passed;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.computed
    ], CSV.prototype, "basename", null);
    __decorate([
        mobx_1.computed
    ], CSV.prototype, "data", null);
    __decorate([
        mobx_1.computed
    ], CSV.prototype, "validation", null);
    __decorate([
        mobx_1.computed
    ], CSV.prototype, "isValid", null);
    return CSV;
}());
var ValidationResults = /** @class */ (function (_super) {
    __extends(ValidationResults, _super);
    function ValidationResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidationResults.prototype.render = function () {
        var validation = this.props.validation;
        return React.createElement("section", { className: styles.validation }, Util_1.map(validation.results, function (v) {
            return React.createElement("div", { className: "alert alert-" + v.class }, v.message);
        }));
    };
    ValidationResults = __decorate([
        mobx_react_1.observer
    ], ValidationResults);
    return ValidationResults;
}(React.Component));
var CSVSelector = /** @class */ (function (_super) {
    __extends(CSVSelector, _super);
    function CSVSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.csv = null;
        return _this;
    }
    CSVSelector.prototype.onChooseCSV = function (_a) {
        var _this = this;
        var target = _a.target;
        var existingEntities = this.props.existingEntities;
        var file = target.files && target.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var csv = e.target.result;
            parse(csv, { relax_column_count: true, skip_empty_lines: true, rtrim: true }, function (_, rows) {
                // TODO error handling
                //console.log("Error?", err)
                if (rows[0][0].toLowerCase() === 'year')
                    rows = CSV.transformSingleLayout(rows);
                _this.csv = new CSV({ filename: file.name, rows: rows, existingEntities: existingEntities });
                _this.props.onCSV(_this.csv);
            });
        };
        reader.readAsText(file);
    };
    CSVSelector.prototype.render = function () {
        var csv = this.csv;
        return React.createElement("section", null,
            React.createElement("input", { type: "file", onChange: this.onChooseCSV }),
            csv && React.createElement(DataPreview, { csv: csv }),
            csv && React.createElement(ValidationResults, { validation: csv.validation }));
    };
    __decorate([
        mobx_1.observable
    ], CSVSelector.prototype, "csv", void 0);
    __decorate([
        mobx_1.action.bound
    ], CSVSelector.prototype, "onChooseCSV", null);
    CSVSelector = __decorate([
        mobx_react_1.observer
    ], CSVSelector);
    return CSVSelector;
}(React.Component));
var Importer = /** @class */ (function (_super) {
    __extends(Importer, _super);
    function Importer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataset = new Dataset();
        return _this;
    }
    Importer_1 = Importer;
    Importer.bootstrap = function (props) {
        ReactDOM.render(React.createElement(Importer_1, { datasets: props.datasets, categories: props.categories, sourceTemplate: props.sourceTemplate.meta_value, existingEntities: props.entityNames }), document.getElementById("import-view"));
    };
    Importer.prototype.onChooseDataset = function (_a) {
        var target = _a.target;
        var d = this.props.datasets[target.selectedIndex - 1];
        this.dataset = d ? Dataset.fromServer(d) : new Dataset();
        this.fillDataset(this.dataset);
    };
    Importer.prototype.onCSV = function (csv) {
        this.csv = csv;
        var match = Util_1.filter(this.props.datasets, function (d) { return d.name === csv.basename; })[0];
        this.dataset = match ? Dataset.fromServer(match) : new Dataset();
        this.fillDataset(this.dataset);
    };
    Importer.prototype.fillDataset = function (dataset) {
        var csv = this.csv;
        if (!dataset.name)
            dataset.name = csv.basename;
        dataset.newVariables = Util_1.map(csv.data.variables, Util_1.clone);
        dataset.entityNames = csv.data.entityNames;
        dataset.entities = csv.data.entities;
        dataset.years = csv.data.years;
    };
    Importer.prototype.onSubmit = function (e) {
        e.preventDefault();
        this.dataset.save();
    };
    Importer.prototype.render = function () {
        var _a = this, csv = _a.csv, dataset = _a.dataset;
        var _b = this.props, datasets = _b.datasets, categories = _b.categories, existingEntities = _b.existingEntities;
        /*if (App.isDebug) {
            window.Importer = this
            window.dataset = dataset
        }*/
        Source.template = this.props.sourceTemplate;
        if (dataset.subcategoryId == null) {
            dataset.subcategoryId = (Util_1.find(categories, function (c) { return c.name === "Uncategorized"; }) || {}).id;
        }
        return React.createElement("form", { className: styles.importer, onSubmit: this.onSubmit },
            React.createElement("h2", null, "Import CSV file"),
            React.createElement("p", null,
                "Examples of valid layouts: ",
                React.createElement("a", { href: "http://ourworldindata.org/wp-content/uploads/2016/02/ourworldindata_single-var.png" }, "single variable"),
                ", ",
                React.createElement("a", { href: "http://ourworldindata.org/wp-content/uploads/2016/02/ourworldindata_multi-var.png" }, "multiple variables"),
                ". The multivar layout is preferred. ",
                React.createElement("span", { className: "form-section-desc" },
                    "CSV files only: ",
                    React.createElement("a", { href: "https://ourworldindata.org/how-to-our-world-in-data-guide/#1-2-single-variable-datasets" }, "csv file format guide"))),
            React.createElement(CSVSelector, { onCSV: this.onCSV, existingEntities: existingEntities }),
            csv && csv.isValid && React.createElement("section", null,
                React.createElement("p", { style: { opacity: dataset.id ? 1 : 0 }, className: "updateWarning" }, "Updating existing dataset"),
                React.createElement("select", { className: "chooseDataset", onChange: this.onChooseDataset },
                    React.createElement("option", { selected: dataset.id == null }, "Create new dataset"),
                    Util_1.map(datasets, function (d) {
                        return React.createElement("option", { value: d.id, selected: d.id === dataset.id }, d.name);
                    })),
                React.createElement("hr", null),
                React.createElement("h3", null, "Dataset name and description"),
                React.createElement("p", null,
                    "The dataset name and description are for our own internal use and do not appear on the charts.",
                    React.createElement("br", null),
                    React.createElement("span", { className: "form-section-desc explanatory-notes" }, "Dataset name should include a basic description of the variables, followed by the source and year. For example: \"Government Revenue Data \u2013 ICTD (2016)\"")),
                React.createElement(EditName, { dataset: dataset }),
                React.createElement("hr", null),
                React.createElement(EditDescription, { dataset: dataset }),
                React.createElement("hr", null),
                React.createElement(EditCategory, { dataset: dataset, categories: categories }),
                React.createElement("hr", null),
                dataset.isLoading && React.createElement("i", { className: "fa fa-spinner fa-spin" }),
                !dataset.isLoading && [
                    React.createElement(EditVariables, { dataset: dataset }),
                    React.createElement("input", { type: "submit", className: "btn btn-success", value: dataset.id ? "Update dataset" : "Create dataset" }),
                    dataset.importRequest && React.createElement(ImportProgressModal, { dataset: dataset })
                ]));
    };
    __decorate([
        mobx_1.observable
    ], Importer.prototype, "csv", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Importer.prototype, "dataset", void 0);
    __decorate([
        mobx_1.action.bound
    ], Importer.prototype, "onChooseDataset", null);
    __decorate([
        mobx_1.action.bound
    ], Importer.prototype, "onCSV", null);
    __decorate([
        mobx_1.action.bound
    ], Importer.prototype, "onSubmit", null);
    Importer = Importer_1 = __decorate([
        mobx_react_1.observer
    ], Importer);
    return Importer;
    var Importer_1;
}(React.Component));
exports.default = Importer;
//# sourceMappingURL=Importer.js.map