"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Build all charts into a static bundle
// Should support incremental builds for performance
var database_1 = require("./database");
var staticGen_1 = require("./staticGen");
var lodash_1 = require("lodash");
var fs = require("fs-extra");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var Variable_1 = require("./models/Variable");
var ChartPage_1 = require("./ChartPage");
var path = require("path");
var md5 = require("md5");
var glob = require("glob");
var shell = require("shelljs");
var svgPngExport_1 = require("./svgPngExport");
var settings_1 = require("./settings");
var ChartBaker = /** @class */ (function () {
    function ChartBaker(props) {
        // Keep a list of the files we've generated to add to git later
        this.stagedFiles = [];
        this.props = props;
        this.db = database_1.createConnection({ database: settings_1.DB_NAME });
        this.baseDir = path.join(this.props.repoDir, this.props.pathRoot);
        fs.mkdirpSync(this.baseDir);
    }
    ChartBaker.prototype.bakeAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pathRoot, chartsJs, chartsCss, buildDir, manifest, _a, _b, key, outPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pathRoot = this.props.pathRoot;
                        chartsJs = settings_1.WEBPACK_DEV_URL + "/charts.js";
                        chartsCss = settings_1.WEBPACK_DEV_URL + "/charts.css";
                        if (!(settings_1.ENV === "production")) return [3 /*break*/, 3];
                        buildDir = "grapher_admin/static/build";
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.readFile(buildDir + "/manifest.json", 'utf8')];
                    case 1:
                        manifest = _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, fs.mkdirp(path.join(this.baseDir, 'assets'))];
                    case 2:
                        _c.sent();
                        for (key in manifest) {
                            outPath = path.join(this.baseDir, "assets/" + manifest[key]);
                            fs.copySync(buildDir + "/" + manifest[key], outPath);
                            this.stage(outPath);
                        }
                        chartsJs = pathRoot + "/assets/" + manifest['charts.js'];
                        chartsCss = pathRoot + "/assets/" + manifest['charts.css'];
                        _c.label = 3;
                    case 3: return [4 /*yield*/, fs.writeFile(this.baseDir + "/embedCharts.js", staticGen_1.embedSnippet(pathRoot, chartsJs, chartsCss))];
                    case 4:
                        _c.sent();
                        this.stage(this.baseDir + "/embedCharts.js");
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeVariableData = function (variableIds, outPath) {
        return __awaiter(this, void 0, void 0, function () {
            var vardata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.mkdirp(this.baseDir + "/data/variables/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Variable_1.getVariableData(variableIds, this.db)];
                    case 2:
                        vardata = _a.sent();
                        return [4 /*yield*/, fs.writeFile(outPath, vardata)];
                    case 3:
                        _a.sent();
                        this.stage(outPath);
                        return [2 /*return*/, vardata];
                }
            });
        });
    };
    ChartBaker.prototype.bakeChartConfig = function (chart) {
        return __awaiter(this, void 0, void 0, function () {
            var outPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outPath = this.baseDir + "/" + chart.slug + ".config.json";
                        return [4 /*yield*/, fs.writeFile(outPath, JSON.stringify(chart))];
                    case 1:
                        _a.sent();
                        this.stage(outPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeChartPage = function (chart) {
        return __awaiter(this, void 0, void 0, function () {
            var outPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outPath = this.baseDir + "/" + chart.slug + ".html";
                        return [4 /*yield*/, fs.writeFile(outPath, ReactDOMServer.renderToStaticMarkup(React.createElement(ChartPage_1.ChartPage, { canonicalRoot: this.props.canonicalRoot, pathRoot: this.props.pathRoot, chart: chart })))];
                    case 1:
                        _a.sent();
                        this.stage(outPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeChart = function (chart) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, baseDir, props, configPath, isConfigIdentical, hash, fileHash, _b, err_1, variableIds, vardataPath, imagePath, vardata, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, baseDir = _a.baseDir, props = _a.props;
                        configPath = baseDir + "/" + chart.slug + ".config.json";
                        isConfigIdentical = false;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        hash = md5(JSON.stringify(chart));
                        _b = md5;
                        return [4 /*yield*/, fs.readFile(configPath, 'utf8')];
                    case 2:
                        fileHash = _b.apply(void 0, [_c.sent()]);
                        isConfigIdentical = (hash === fileHash);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        if (err_1.code !== 'ENOENT')
                            console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        variableIds = lodash_1.uniq(chart.dimensions.map(function (d) { return d.variableId; }));
                        if (!variableIds.length)
                            return [2 /*return*/];
                        vardataPath = this.baseDir + "/data/variables/" + variableIds.join("+");
                        if (!(!isConfigIdentical || props.regenData)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.bakeVariableData(variableIds, vardataPath)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        if (!(!isConfigIdentical || props.regenConfig)) return [3 /*break*/, 8];
                        return [4 /*yield*/, Promise.all([this.bakeChartConfig(chart), this.bakeChartPage(chart)])
                            // Twitter/fb cards are expensive to make and not super important, so we keep the old ones if we can
                        ];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 13, , 14]);
                        return [4 /*yield*/, fs.mkdirp(this.baseDir + "/exports/")];
                    case 9:
                        _c.sent();
                        imagePath = this.baseDir + "/exports/" + chart.slug + ".png";
                        if (!(!fs.existsSync(imagePath) || props.regenImages)) return [3 /*break*/, 12];
                        return [4 /*yield*/, fs.readFile(vardataPath, 'utf8')];
                    case 10:
                        vardata = _c.sent();
                        return [4 /*yield*/, svgPngExport_1.bakeMediaCard(this.baseDir + "/exports", chart, vardata)];
                    case 11:
                        _c.sent();
                        this.stage(imagePath);
                        _c.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_2 = _c.sent();
                        console.error(err_2);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeRedirects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pathRoot, repoDir, redirects, latestRows, _i, latestRows_1, row, idRows, _b, idRows_1, row, rows, _c, rows_1, row, trueSlug;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, pathRoot = _a.pathRoot, repoDir = _a.repoDir;
                        redirects = [];
                        return [4 /*yield*/, this.db.query("SELECT JSON_EXTRACT(config, \"$.slug\") as slug FROM charts where starred=1")];
                    case 1:
                        latestRows = _d.sent();
                        for (_i = 0, latestRows_1 = latestRows; _i < latestRows_1.length; _i++) {
                            row = latestRows_1[_i];
                            redirects.push(pathRoot + "/latest " + pathRoot + "/" + JSON.parse(row.slug) + " 302");
                        }
                        return [4 /*yield*/, this.db.query("SELECT id, JSON_EXTRACT(config, \"$.slug\") as slug FROM charts")];
                    case 2:
                        idRows = _d.sent();
                        for (_b = 0, idRows_1 = idRows; _b < idRows_1.length; _b++) {
                            row = idRows_1[_b];
                            redirects.push(pathRoot + "/" + row.id + ".config.json " + pathRoot + "/" + JSON.parse(row.slug) + ".config.json");
                            redirects.push(pathRoot + "/" + row.id + " " + pathRoot + "/" + JSON.parse(row.slug) + " 302");
                        }
                        return [4 /*yield*/, this.db.query("\n            SELECT chart_slug_redirects.slug, chart_id, JSON_EXTRACT(charts.config, \"$.slug\") as trueSlug\n            FROM chart_slug_redirects INNER JOIN charts ON charts.id=chart_id\n        ")];
                    case 3:
                        rows = _d.sent();
                        for (_c = 0, rows_1 = rows; _c < rows_1.length; _c++) {
                            row = rows_1[_c];
                            trueSlug = JSON.parse(row.trueSlug);
                            if (row.slug !== trueSlug) {
                                redirects.push(pathRoot + "/" + row.slug + ".config.json " + pathRoot + "/" + trueSlug + ".config.json 302");
                                redirects.push(pathRoot + "/" + row.slug + " " + pathRoot + "/" + trueSlug + " 302");
                            }
                        }
                        return [4 /*yield*/, fs.writeFile(repoDir + "/_redirects", redirects.join("\n"))];
                    case 4:
                        _d.sent();
                        this.stage(repoDir + "/_redirects");
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pathRoot, repoDir, headers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, pathRoot = _a.pathRoot, repoDir = _a.repoDir;
                        headers = pathRoot + "/data/variables/*\n  Cache-Control: public, max-age=31556926\n  Access-Control-Allow-Origin: *\n\n" + pathRoot + "/assets/*\n  Cache-Control: public, max-age=31556926\n\n" + pathRoot + "/exports/*\n  Cache-Control: public, max-age=31556926\n\n" + pathRoot + "/*.json\n  Access-Control-Allow-Origin: *\n";
                        return [4 /*yield*/, fs.writeFile(repoDir + "/_headers", headers)];
                    case 1:
                        _b.sent();
                        this.stage(repoDir + "/_headers");
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.bakeCharts = function (opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, db, baseDir, props, rows, newSlugs, requests, _i, rows_2, row, chart, oldSlugs, toRemove, _b, toRemove_1, slug, paths, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this, db = _a.db, baseDir = _a.baseDir, props = _a.props;
                        return [4 /*yield*/, db.query("SELECT id, config, updated_at FROM charts WHERE JSON_EXTRACT(config, \"$.isPublished\")=true ORDER BY slug ASC")];
                    case 1:
                        rows = _c.sent();
                        newSlugs = [];
                        requests = [];
                        _i = 0, rows_2 = rows;
                        _c.label = 2;
                    case 2:
                        if (!(_i < rows_2.length)) return [3 /*break*/, 5];
                        row = rows_2[_i];
                        chart = JSON.parse(row.config);
                        chart.id = row.id;
                        newSlugs.push(chart.slug);
                        requests.push(this.bakeChart(chart));
                        if (!(requests.length > 50)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(requests)];
                    case 3:
                        _c.sent();
                        requests = [];
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        oldSlugs = glob.sync(baseDir + "/*.config.json").map(function (slug) { return slug.replace(baseDir + "/", '').replace(".config.json", ""); });
                        toRemove = lodash_1.without.apply(void 0, [oldSlugs].concat(newSlugs));
                        _b = 0, toRemove_1 = toRemove;
                        _c.label = 6;
                    case 6:
                        if (!(_b < toRemove_1.length)) return [3 /*break*/, 11];
                        slug = toRemove_1[_b];
                        console.log("DELETING " + slug);
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        paths = [baseDir + "/" + slug + ".config.json", baseDir + "/" + slug + ".html", baseDir + "/exports/" + slug + ".png"] //, `${baseDir}/exports/${slug}.svg`]
                        ;
                        return [4 /*yield*/, Promise.all(paths.map(function (p) { return fs.unlink(p); }))];
                    case 8:
                        _c.sent();
                        paths.map(function (p) { return _this.stage(p); });
                        return [3 /*break*/, 10];
                    case 9:
                        err_3 = _c.sent();
                        console.error(err_3);
                        return [3 /*break*/, 10];
                    case 10:
                        _b++;
                        return [3 /*break*/, 6];
                    case 11: return [2 /*return*/, Promise.all(requests)];
                }
            });
        });
    };
    ChartBaker.prototype.bakeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bakeRedirects()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bakeHeaders()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bakeAssets()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.bakeCharts()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartBaker.prototype.exec = function (cmd) {
        console.log(cmd);
        shell.exec(cmd);
    };
    ChartBaker.prototype.stage = function (targetPath) {
        console.log(targetPath);
        this.stagedFiles.push(targetPath);
    };
    ChartBaker.prototype.deploy = function (authorEmail, authorName, commitMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var repoDir, _i, _a, files;
            return __generator(this, function (_b) {
                repoDir = this.props.repoDir;
                for (_i = 0, _a = lodash_1.chunk(this.stagedFiles, 100); _i < _a.length; _i++) {
                    files = _a[_i];
                    this.exec("cd " + repoDir + " && git add -A " + files.join(" "));
                }
                if (authorEmail && authorName && commitMsg) {
                    this.exec("cd " + repoDir + " && git commit --author='" + authorName + " <" + authorEmail + ">' -m '" + commitMsg + "' && git push origin master");
                }
                else {
                    this.exec("cd " + repoDir + " && git commit -m \"Automated update\" && git push origin master");
                }
                return [2 /*return*/];
            });
        });
    };
    ChartBaker.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.end()];
            });
        });
    };
    return ChartBaker;
}());
exports.ChartBaker = ChartBaker;
//# sourceMappingURL=ChartBaker.js.map