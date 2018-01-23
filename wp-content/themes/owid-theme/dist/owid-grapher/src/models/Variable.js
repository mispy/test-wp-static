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
function getVariableData(variableIds, db) {
    return __awaiter(this, void 0, void 0, function () {
        function write(s) {
            output += s;
        }
        var meta, variableQuery, dataQuery, variables, _i, variables_1, row, sourceDescription, results, output, entityKey, seenVariables, _a, results_1, row;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    meta = { variables: {} };
                    variableQuery = db.query("\n        SELECT v.*, v.short_unit as shortUnit, d.name as datasetName, s.id as s_id, s.name as s_name, s.description as s_description FROM variables as v\n            JOIN datasets as d ON v.fk_dst_id = d.id\n            JOIN sources as s on v.sourceId = s.id\n            WHERE v.id IN (?)\n    ", [variableIds]);
                    dataQuery = db.query("\n            SELECT value, year, fk_var_id as variableId, entities.id as entityId,\n            entities.name as entityName, entities.code as entityCode\n            FROM data_values\n            LEFT JOIN entities ON data_values.fk_ent_id = entities.id\n            WHERE data_values.fk_var_id IN (?)\n            ORDER BY variableId ASC, year ASC\n    ", [variableIds]);
                    return [4 /*yield*/, variableQuery];
                case 1:
                    variables = _b.sent();
                    for (_i = 0, variables_1 = variables; _i < variables_1.length; _i++) {
                        row = variables_1[_i];
                        row.shortUnit = row.short_unit;
                        delete row.short_unit;
                        sourceDescription = JSON.parse(row.s_description);
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
                    return [4 /*yield*/, dataQuery];
                case 2:
                    results = _b.sent();
                    output = "";
                    write(JSON.stringify(meta));
                    entityKey = {};
                    seenVariables = {};
                    for (_a = 0, results_1 = results; _a < results_1.length; _a++) {
                        row = results_1[_a];
                        if (seenVariables[row.variableId] === undefined) {
                            seenVariables[row.variableId] = true;
                            write("\r\n");
                            write(row.variableId.toString());
                        }
                        write(";" + row.year + "," + row.entityId + "," + row.value);
                        if (entityKey[row.entityId] === undefined) {
                            entityKey[row.entityId] = { name: row.entityName, code: row.entityCode };
                        }
                    }
                    write("\r\n");
                    write(JSON.stringify(entityKey));
                    return [2 /*return*/, output];
            }
        });
    });
}
exports.getVariableData = getVariableData;
//# sourceMappingURL=Variable.js.map