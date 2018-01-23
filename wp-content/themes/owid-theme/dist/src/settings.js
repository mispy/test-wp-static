"use strict";
require('module-alias').addAliases({
    'react': 'preact-compat',
    'react-dom': 'preact-compat'
});
require('dotenv').config();
var env = process.env;
env.BLOG_POSTS_PER_PAGE = 21;
module.exports = env;
//# sourceMappingURL=settings.js.map