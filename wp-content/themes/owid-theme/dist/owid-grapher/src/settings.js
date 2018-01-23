"use strict";
require('module-alias').addAliases({
    'react': 'preact-compat',
    'react-dom': 'preact-compat'
});
require('dotenv').config();
var env = process.env;
env.ENV = env.ENV === "production" ? "production" : "development";
module.exports = env;
//# sourceMappingURL=settings.js.map