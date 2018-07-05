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
var fs = require("fs-extra");
var path = require("path");
var glob = require("glob");
var lodash_1 = require("lodash");
var shell = require("shelljs");
var _ = require("lodash");
var cheerio = require("cheerio");
var wpdb = require("./wpdb");
var formatting_1 = require("./formatting");
var ArticlePage_1 = require("./views/ArticlePage");
var BlogPostPage_1 = require("./views/BlogPostPage");
var settings = require("./settings");
var BAKED_DIR = settings.BAKED_DIR, BAKED_URL = settings.BAKED_URL, WORDPRESS_URL = settings.WORDPRESS_URL, WORDPRESS_DIR = settings.WORDPRESS_DIR, BLOG_POSTS_PER_PAGE = settings.BLOG_POSTS_PER_PAGE;
var renderPage_1 = require("./renderPage");
var grapherUtil_1 = require("./grapherUtil");
var React = require("react");
var WordpressBaker = /** @class */ (function () {
    function WordpressBaker(props) {
        this.stagedFiles = [];
        this.props = props;
        settings.IS_BAKING = true;
    }
    WordpressBaker.prototype.bakeRedirects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var redirects, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redirects = [
                            // Let's Encrypt certbot verification 
                            "/.well-known/* https://owid.cloud/.well-known/:splat 200",
                            // RSS feed
                            "/feed /atom.xml 302",
                            // Backwards compatibility-- admin urls
                            "/wp-admin/* https://owid.cloud/wp-admin/:splat 302",
                            "/wp-login.php https://owid.cloud/wp-login.php 302",
                            "/grapher/admin/* https://owid.cloud/grapher/admin/:splat 302",
                            // Backwards compatibility-- old Max stuff that isn't static-friendly
                            "/roser/* https://www.maxroser.com/roser/:splat 302",
                            "/wp-content/uploads/nvd3/* https://www.maxroser.com/owidUploads/nvd3/:splat 302",
                            "/wp-content/uploads/datamaps/* https://www.maxroser.com/owidUploads/datamaps/:splat 302",
                            "/slides/Max_PPT_presentations/* https://www.maxroser.com/slides/Max_PPT_presentations/:splat 302",
                            "/slides/Max_Interactive_Presentations/* https://www.maxroser.com/slides/Max_Interactive_Presentations/:splat 302",
                            // Backwards compatibility-- public urls
                            "/entries /#entries 302",
                            "/data/food-agriculture/land-use-in-agriculture /yields-and-land-use-in-agriculture 301",
                            // Backwards compatibility-- grapher url style
                            "/chart-builder/* /grapher/:splat 301",
                            "/grapher/public/* /grapher/:splat 301",
                            "/grapher/view/* /grapher/:splat 301",
                            // Main grapher chart urls are proxied through to separate repo
                            "/grapher/* https://owid-grapher.netlify.com/grapher/:splat 200",
                            "/slides/* https://owid-slides.netlify.com/:splat 200"
                        ];
                        return [4 /*yield*/, wpdb.query("SELECT url, action_data, action_code FROM wp_redirection_items")];
                    case 1:
                        rows = _a.sent();
                        redirects.push.apply(redirects, rows.map(function (row) { return row.url + " " + row.action_data + " " + row.action_code; }));
                        return [4 /*yield*/, this.stageWrite(path.join(BAKED_DIR, "_redirects"), redirects.join("\n"))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeEmbeds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, grapherUrls, _i, rows_1, row, $, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, wpdb.query("SELECT post_content FROM wp_posts WHERE (post_type='page' OR post_type='post') AND post_status='publish'")];
                    case 1:
                        rows = _b.sent();
                        grapherUrls = [];
                        for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                            row = rows_1[_i];
                            $ = cheerio.load(row.post_content);
                            grapherUrls.push.apply(grapherUrls, $("iframe").toArray().filter(function (el) { return (el.attribs['src'] || '').match(/\/grapher\//); }).map(function (el) { return el.attribs['src']; }));
                        }
                        grapherUrls = _.uniq(grapherUrls);
                        // Now bake (the grapher handles versioning as only it knows the current version of charts)
                        return [4 /*yield*/, grapherUtil_1.bakeGrapherUrls(grapherUrls)];
                    case 2:
                        // Now bake (the grapher handles versioning as only it knows the current version of charts)
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, grapherUtil_1.getGrapherExportsByUrl()];
                    case 3:
                        _a.grapherExports = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Bake an individual post/page
    WordpressBaker.prototype.bakePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, formatted, html, outPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wpdb.getEntriesByCategory()];
                    case 1:
                        entries = _a.sent();
                        return [4 /*yield*/, formatting_1.formatPost(post, this.grapherExports)];
                    case 2:
                        formatted = _a.sent();
                        html = renderPage_1.renderToHtmlPage(post.type == 'post' ? React.createElement(BlogPostPage_1.BlogPostPage, { entries: entries, post: formatted }) : React.createElement(ArticlePage_1.ArticlePage, { entries: entries, post: formatted }));
                        outPath = path.join(BAKED_DIR, post.slug + ".html");
                        return [4 /*yield*/, fs.mkdirp(path.dirname(outPath))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.stageWrite(outPath, html)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Bake all Wordpress posts, both blog posts and entry pages
    WordpressBaker.prototype.bakePosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var postsQuery, rows, bakingPosts, postSlugs, _i, rows_2, row, post, existingSlugs, toRemove, _a, toRemove_1, slug, outPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        postsQuery = wpdb.query("SELECT * FROM wp_posts WHERE (post_type='page' OR post_type='post') AND post_status='publish'");
                        return [4 /*yield*/, postsQuery];
                    case 1:
                        rows = _b.sent();
                        bakingPosts = [];
                        postSlugs = [];
                        _i = 0, rows_2 = rows;
                        _b.label = 2;
                    case 2:
                        if (!(_i < rows_2.length)) return [3 /*break*/, 5];
                        row = rows_2[_i];
                        if (row.post_name === 'blog')
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, wpdb.getFullPost(row)];
                    case 3:
                        post = _b.sent();
                        postSlugs.push(post.slug);
                        bakingPosts.push(post);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, Promise.all(bakingPosts.map(function (post) { return _this.bakePost(post); }))
                        // Delete any previously rendered posts that aren't in the database
                    ];
                    case 6:
                        _b.sent();
                        existingSlugs = glob.sync(BAKED_DIR + "/**/*.html").map(function (path) { return path.replace(BAKED_DIR + "/", '').replace(".html", ""); })
                            .filter(function (path) { return !path.startsWith('wp-') && !path.startsWith('slides') && !path.startsWith('subscribe') && !path.startsWith('blog') && path !== "index" && path !== "identifyadmin" && path !== "404" && path !== "google8272294305985984"; });
                        toRemove = lodash_1.without.apply(void 0, [existingSlugs].concat(postSlugs));
                        _a = 0, toRemove_1 = toRemove;
                        _b.label = 7;
                    case 7:
                        if (!(_a < toRemove_1.length)) return [3 /*break*/, 10];
                        slug = toRemove_1[_a];
                        outPath = BAKED_DIR + "/" + slug + ".html";
                        return [4 /*yield*/, fs.unlink(outPath)];
                    case 8:
                        _b.sent();
                        this.stage(outPath, "DELETING " + outPath);
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeSpecialPages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.stageWrite;
                        _b = [BAKED_DIR + "/index.html"];
                        return [4 /*yield*/, renderPage_1.renderFrontPage()];
                    case 1: return [4 /*yield*/, _a.apply(this, _b.concat([_e.sent()]))];
                    case 2:
                        _e.sent();
                        _c = this.stageWrite;
                        _d = [BAKED_DIR + "/subscribe.html"];
                        return [4 /*yield*/, renderPage_1.renderSubscribePage()];
                    case 3: return [4 /*yield*/, _c.apply(this, _d.concat([_e.sent()]))];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeBlog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allPosts, numPages, i, slug, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wpdb.getBlogIndex()];
                    case 1:
                        allPosts = _a.sent();
                        numPages = Math.ceil(allPosts.length / BLOG_POSTS_PER_PAGE);
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i <= numPages)) return [3 /*break*/, 6];
                        slug = i === 1 ? 'blog' : "blog/page/" + i;
                        return [4 /*yield*/, renderPage_1.renderBlogByPageNum(i)];
                    case 3:
                        html = _a.sent();
                        return [4 /*yield*/, this.stageWrite(BAKED_DIR + "/" + slug + ".html", html)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeRSS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postRows, posts, _i, postRows_1, row, fullPost, _a, _b, feed;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, wpdb.query("SELECT * FROM wp_posts WHERE post_type='post' AND post_status='publish' ORDER BY post_date DESC LIMIT 10")];
                    case 1:
                        postRows = _c.sent();
                        posts = [];
                        _i = 0, postRows_1 = postRows;
                        _c.label = 2;
                    case 2:
                        if (!(_i < postRows_1.length)) return [3 /*break*/, 6];
                        row = postRows_1[_i];
                        return [4 /*yield*/, wpdb.getFullPost(row)];
                    case 3:
                        fullPost = _c.sent();
                        _b = (_a = posts).push;
                        return [4 /*yield*/, formatting_1.formatPost(fullPost)];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        feed = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<feed xmlns=\"http://www.w3.org/2005/Atom\">\n    <title>Our World in Data</title>\n    <subtitle>Living conditions around the world are changing rapidly. Explore how and why.</subtitle>\n    <id>" + BAKED_URL + "/</id>\n    <link type=\"text/html\" rel=\"alternate\" href=\"" + BAKED_URL + "\"/>\n    <link type=\"application/atom+xml\" rel=\"self\" href=\"" + BAKED_URL + "/atom.xml\"/>\n    <updated>" + posts[0].date.toISOString() + "</updated>\n    " + posts.map(function (post) { return "<entry>\n        <title>" + post.title + "</title>\n    <id>" + BAKED_URL + "/" + post.slug + "</id>\n        <link rel=\"alternate\" href=\"" + BAKED_URL + "/" + post.slug + "\"/>\n        <published>" + post.date.toISOString() + "</published>\n        <updated>" + post.modifiedDate.toISOString() + "</updated>\n        " + post.authors.map(function (author) { return "<author><name>" + author + "</name></author>"; }).join("") + "\n        <summary>" + post.excerpt + "</summary>\n    </entry>"; }).join("\n") + "\n</feed>\n";
                        return [4 /*yield*/, this.stageWrite(BAKED_DIR + "/atom.xml", feed)];
                    case 7:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/wp-content/themes/owid-theme/identifyadmin.html " + BAKED_DIR + "/");
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/wp-content " + BAKED_DIR + "/");
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/wp-includes " + BAKED_DIR + "/");
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/favicon* " + BAKED_DIR + "/");
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/slides/ " + BAKED_DIR + "/slides");
                shell.exec("rsync -havz --delete " + WORDPRESS_DIR + "/wp-content/themes/owid-theme/public/*  " + BAKED_DIR + "/");
                return [2 /*return*/];
            });
        });
    };
    WordpressBaker.prototype.bakeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bakeRedirects()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bakeEmbeds()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bakeBlog()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.bakeRSS()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.bakeAssets()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.bakeSpecialPages()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.bakePosts()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.stageWrite = function (outPath, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.mkdirp(path.dirname(outPath))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.writeFile(outPath, content)];
                    case 2:
                        _a.sent();
                        this.stage(outPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.stage = function (outPath, msg) {
        console.log(msg || outPath);
        this.stagedFiles.push(outPath);
    };
    WordpressBaker.prototype.exec = function (cmd) {
        console.log(cmd);
        shell.exec(cmd);
    };
    WordpressBaker.prototype.deploy = function (commitMsg, authorEmail, authorName) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, files;
            return __generator(this, function (_b) {
                for (_i = 0, _a = lodash_1.chunk(this.stagedFiles, 100); _i < _a.length; _i++) {
                    files = _a[_i];
                    this.exec("cd " + BAKED_DIR + " && git add -A " + files.join(" "));
                }
                if (authorEmail && authorName && commitMsg) {
                    this.exec("cd " + BAKED_DIR + " && git add -A . && git commit --author='" + authorName + " <" + authorEmail + ">' -a -m '" + commitMsg + "' && git push origin master");
                }
                else {
                    this.exec("cd " + BAKED_DIR + " && git add -A . && git commit -a -m '" + commitMsg + "' && git push origin master");
                }
                return [2 /*return*/];
            });
        });
    };
    WordpressBaker.prototype.end = function () {
        wpdb.end();
    };
    return WordpressBaker;
}());
exports.default = WordpressBaker;
//# sourceMappingURL=BakeWordpress.js.map