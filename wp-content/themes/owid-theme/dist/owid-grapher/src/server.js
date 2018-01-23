"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("./database");
var lodash_1 = require("lodash");
var async = require("async");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var AdminSPA_1 = require("./AdminSPA");
var app = express();
app.use(express.json());
app.get('/grapher/admin/editorData.:cacheTag.json', function (req, res) {
    var datasets = [];
    database_1.db.query("SELECT v.name, v.id, d.name as datasetName, d.namespace FROM variables as v JOIN datasets as d ON v.fk_dst_id = d.id ORDER BY d.id", function (err, rows) {
        if (err)
            throw err;
        var dataset;
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            if (!dataset || row.datasetName !== dataset.name) {
                if (dataset)
                    datasets.push(dataset);
                dataset = { name: row.datasetName, namespace: row.namespace, variables: [] };
            }
            dataset.variables.push({ name: row.name, id: row.id });
        }
        res.json({
            datasets: datasets,
            namespaces: lodash_1.uniq(datasets.map(function (d) { return d.namespace; }))
        });
    });
});
app.get('/grapher/admin/charts/:chartId.config.json', function (req, res) {
    var chartId = req.params.chartId;
    database_1.db.query("SELECT * FROM charts WHERE id=?", chartId, function (err, rows) {
        if (err)
            throw err;
        if (rows.length === 0) {
            res.status(404).send("No chart found for id " + chartId);
            return;
        }
        var row = rows[0];
        var config = JSON.parse(row.config);
        res.json(config);
        //        config['logosSVG'] = [LOGO]
        //        config.variableCacheTag = cacheTag
    });
});
app.get('/grapher/data/variables/:variableIds', function (req, res) {
    var variableIds = req.params.variableIds.split("+").map(function (s) { return parseInt(s); });
    var meta = { variables: {} };
    var variableQuery = "\n        SELECT v.*, v.short_unit as shortUnit, d.name as datasetName, s.id as s_id, s.name as s_name, s.description as s_description FROM variables as v\n            JOIN datasets as d ON v.fk_dst_id = d.id\n            JOIN sources as s on v.sourceId = s.id\n            WHERE v.id IN (?)\n    ";
    database_1.db.query(variableQuery, variableIds, function (err, variables) {
        if (err)
            throw err;
        for (var _i = 0, variables_1 = variables; _i < variables_1.length; _i++) {
            var row = variables_1[_i];
            row.shortUnit = row.short_unit;
            delete row.short_unit;
            var sourceDescription = JSON.parse(row.s_description);
            delete row.s_description;
            row.source = {
                id: row.s_id,
                name: row.s_name,
                dataPublishedBy: sourceDescription.dataPublishedBy || "",
                dataPublisherSource: sourceDescription.dataPublisherSource || "",
                link: sourceDescription.link || "",
                retrievedData: sourceDescription.retrievedData || "",
                additionalInfo: sourceDescription.additionalInfo || ""
            };
            meta.variables[row.id] = row;
        }
        var dataQuery = "\n            SELECT value, year, fk_var_id as variableId, entities.id as entityId,\n            entities.name as entityName, entities.code as entityCode\n            FROM data_values\n            LEFT JOIN entities ON data_values.fk_ent_id = entities.id\n            WHERE data_values.fk_var_id IN (?)\n            ORDER BY variableId ASC, year ASC\n        ";
        database_1.db.query(dataQuery, variableIds, function (err, results) {
            if (err)
                throw err;
            res.write(JSON.stringify(meta));
            var entityKey = {};
            var seenVariables = {};
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var row = results_1[_i];
                if (seenVariables[row.variableId] === undefined) {
                    seenVariables[row.variableId] = true;
                    res.write("\r\n");
                    res.write(row.variableId.toString());
                }
                res.write(";" + row.year + "," + row.entityId + "," + row.value);
                if (entityKey[row.entityId] === undefined) {
                    entityKey[row.entityId] = { name: row.entityName, code: row.entityCode };
                }
            }
            res.write("\r\n");
            res.write(JSON.stringify(entityKey));
            res.end();
        });
    });
});
app.put('/grapher/admin/charts/:chartId', function (req, res) {
    var chart = req.body;
    function doSave() {
    }
    if (chart.isPublished) {
        var check1 = function (callback) {
            database_1.db.query("SELECT * FROM chart_slug_redirects WHERE chart_id != ? AND slug = ?", [chart.id, chart.slug], function (err, rows) {
                if (err)
                    throw err;
                if (rows.length > 0) {
                    res.status(402).send("This chart slug was previously used by another chart: " + chart.slug);
                    callback(false);
                }
                else {
                    callback(true);
                }
            });
        };
        var check2 = function (callback) {
            database_1.db.query("SELECT * FROM charts WHERE id != ? AND config->\"$.slug\" = ? AND config->\"$.isPublished\" IS TRUE", [chart.id, chart.slug], function (err, rows) {
                if (err)
                    throw err;
                if (rows.length > 0) {
                    res.status(402).send("This chart slug is currently in use by another chart: " + chart.slug);
                    callback(false);
                }
                else {
                    callback(true);
                }
            });
        };
        async.every([check1, check2], function (check, callback) { return check(callback); }, function (err, result) {
            if (err)
                throw err;
            if (result)
                doSave();
        });
    }
    /*def savechart(chart: Chart, data: Dict, user: User):
    isExisting = chart.id != None

    if data.get('published'):
        if ChartSlugRedirect.objects.filter(~Q(chart_id=chart.pk)).filter(Q(slug=data['slug'])):
            return HttpResponse("This chart slug was previously used by another chart: %s" % data["slug"], status=402)
        elif Chart.objects.filter(~Q(pk=chart.pk)).filter(config__slug=data['slug'], config__isPublished=True):
            return HttpResponse("This chart slug is currently in use by another chart: %s" % data["slug"], status=402)
        elif chart.config.get('isPublished') and chart.config.get('slug') and chart.config.get('slug') != data['slug']:
            # Changing the slug of an already published chart-- create a redirect
            try:
                old_chart_redirect = ChartSlugRedirect.objects.get(slug=chart.slug)
                old_chart_redirect.chart_id = chart.pk
                old_chart_redirect.save()
            except ChartSlugRedirect.DoesNotExist:
                new_chart_redirect = ChartSlugRedirect()
                new_chart_redirect.chart_id = chart.pk
                new_chart_redirect.slug = chart.slug
                new_chart_redirect.save()

    data.pop("logosSVG", None)

    dims = []

    chart.config = json.dumps(data)
    chart.last_edited_at = timezone.now()
    chart.last_edited_by = user
    chart.save()

    for i, dim in enumerate(data["dimensions"]):
        variable = Variable.objects.get(id=dim["variableId"])

        newdim = ChartDimension()
        newdim.chartId = chart
        newdim.variableId = variable
        newdim.property = dim.get('property', None)
        newdim.order = i

        newdim.displayName = dim.get('displayName', None)
        newdim.unit = dim.get('unit', None)
        newdim.shortUnit = dim.get('shortUnit', None)
        newdim.conversionFactor = dim.get('conversionFactor', None)
        newdim.tolerance = dim.get('tolerance', None)
        newdim.isProjection = dim.get('isProjection', None)
        newdim.targetYear = dim.get('targetYear', None)


        if dim.get('saveToVariable'):
            if newdim.displayName:
                variable.displayName = newdim.displayName
            if newdim.unit:
                variable.displayUnit = newdim.unit
            if newdim.shortUnit:
                variable.displayShortUnit = newdim.shortUnit
            if newdim.conversionFactor:
                variable.displayUnitConversionFactor = newdim.conversionFactor
            if 'tolerance' in dim:
                variable.displayTolerance = newdim.tolerance
            variable.displayIsProjection = bool(newdim.isProjection)
            variable.save()*/
});
// Default route: single page admin app
app.get('*', function (req, res) {
    var baseUrl = "http://l:3000/grapher";
    var cacheTag = "waffles";
    var currentUser = "jaiden";
    var isDebug = true;
    res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(AdminSPA_1.default, { currentUser: "jaiden" })));
});
app.listen(3000, function () { return console.log("Express started"); });
//# sourceMappingURL=server.js.map