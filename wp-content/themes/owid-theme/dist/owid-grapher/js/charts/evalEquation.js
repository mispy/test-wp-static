"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expr_eval_1 = require("expr-eval");
function evalEquation(equation, context, defaultOnError) {
    try {
        var parser = new expr_eval_1.Parser();
        var expr = parser.parse(equation);
        return expr.evaluate(context);
    }
    catch (e) {
        //console.error(e)
        return defaultOnError;
    }
}
exports.default = evalEquation;
//# sourceMappingURL=evalEquation.js.map