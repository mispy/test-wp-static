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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var settings_1 = require("./settings");
var glob = require("glob");
var parseUrl = require("url-parse");
var exec = require('child-process-promise').exec;
var path = require("path");
var _ = require("lodash");
var md5 = require("md5");
// Given a grapher url with query string, create a key to match export filenames
function grapherUrlToFilekey(grapherUrl) {
    var url = parseUrl(grapherUrl);
    var slug = _.last(url.pathname.split('/'));
    var queryStr = url.query;
    return "" + slug + (queryStr ? "-" + md5(queryStr) : "");
}
exports.grapherUrlToFilekey = grapherUrlToFilekey;
function bakeGrapherUrls(urls, opts) {
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var args, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = [settings_1.GRAPHER_DIR + "/dist/src/bakeChartsToImages.js"];
                    args.push.apply(args, urls);
                    args.push(settings_1.BAKED_DIR + "/exports");
                    promise = exec("cd " + settings_1.GRAPHER_DIR + " && node " + args.map(function (arg) { return JSON.stringify(arg); }).join(" "));
                    if (!opts.silent)
                        promise.childProcess.stdout.on('data', function (data) { return console.log(data.toString().trim()); });
                    return [4 /*yield*/, promise];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.bakeGrapherUrls = bakeGrapherUrls;
function getGrapherExportsByUrl() {
    return __awaiter(this, void 0, void 0, function () {
        var files, exportsByKey, _i, files_1, filepath, filename, _a, key, version, dims, versionNumber, _b, width, height, current;
        return __generator(this, function (_c) {
            files = glob.sync(settings_1.BAKED_DIR + "/exports/*.svg");
            exportsByKey = new Map();
            for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                filepath = files_1[_i];
                filename = path.basename(filepath);
                _a = filename.split("_"), key = _a[0], version = _a[1], dims = _a[2];
                versionNumber = parseInt(version.split('v')[1]);
                _b = dims.split("x"), width = _b[0], height = _b[1];
                current = exportsByKey.get(key);
                if (!current || current.version < versionNumber) {
                    exportsByKey.set(key, {
                        key: key,
                        svgUrl: "/exports/" + filename,
                        version: versionNumber,
                        width: parseInt(width),
                        height: parseInt(height)
                    });
                }
            }
            return [2 /*return*/, {
                    get: function (grapherUrl) {
                        return exportsByKey.get(grapherUrlToFilekey(grapherUrl));
                    }
                }];
        });
    });
}
exports.getGrapherExportsByUrl = getGrapherExportsByUrl;
//# sourceMappingURL=grapherUtil.js.map