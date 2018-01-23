"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var fuzzysort = require("fuzzysort");
var FuzzySearch = /** @class */ (function () {
    function FuzzySearch(data, key) {
        this.datamap = Util_1.keyBy(data, key);
        this.strings = data.map(function (d) { return fuzzysort.prepare(d[key]); });
    }
    FuzzySearch.prototype.search = function (input) {
        var _this = this;
        console.log(fuzzysort.go(input, this.strings));
        return fuzzysort.go(input, this.strings).map(function (result) { return _this.datamap[result.target]; });
    };
    FuzzySearch.prototype.highlight = function (input, target) {
        var result = fuzzysort.single(input, target);
        return result ? result.highlighted : target;
    };
    return FuzzySearch;
}());
exports.default = FuzzySearch;
//# sourceMappingURL=FuzzySearch.js.map