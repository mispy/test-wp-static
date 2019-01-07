"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("../settings");
var React = require("react");
var Head_1 = require("./Head");
var SiteHeader_1 = require("./SiteHeader");
var SiteFooter_1 = require("./SiteFooter");
var formatting_1 = require("../formatting");
var _ = require("lodash");
exports.BlogIndexPage = function (props) {
    var entries = props.entries, posts = props.posts, pageNum = props.pageNum, numPages = props.numPages;
    var pageNums = _.range(1, numPages + 1);
    return React.createElement("html", null,
        React.createElement(Head_1.Head, { canonicalUrl: settings.BAKED_URL + "/blog" + (pageNum > 1 ? "/page/" + pageNum : ""), pageTitle: "Blog" }),
        React.createElement("body", { className: "blog" },
            React.createElement(SiteHeader_1.SiteHeader, { entries: entries }),
            React.createElement("main", null,
                React.createElement("div", { className: "site-content" },
                    React.createElement("h2", null, "Latest Posts"),
                    React.createElement("ul", { className: "posts" }, posts.map(function (post) {
                        return React.createElement("li", { key: post.slug, className: "post" },
                            React.createElement("a", { href: "/" + post.slug },
                                post.imageUrl && React.createElement("img", { src: post.imageUrl }),
                                React.createElement("h3", null, post.title),
                                React.createElement("div", { className: "entry-meta" },
                                    React.createElement("time", null, formatting_1.formatDate(post.date)),
                                    " by ",
                                    formatting_1.formatAuthors(post.authors))));
                    })),
                    React.createElement("nav", { className: "navigation pagination", role: "navigation" },
                        React.createElement("h2", { className: "screen-reader-text" }, "Posts navigation"),
                        React.createElement("div", { className: "nav-link" }, pageNums.map(function (num) {
                            return React.createElement("a", { key: num, className: "page-numbers" + (num === pageNum ? " current" : ""), href: num === 1 ? '/blog/' : "/blog/page/" + num }, num);
                        }))))),
            React.createElement(SiteFooter_1.SiteFooter, null)));
};
//# sourceMappingURL=BlogIndexPage.js.map