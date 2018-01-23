"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../settings");
var React = require("react");
var Head_1 = require("./Head");
var SiteHeader_1 = require("./SiteHeader");
var SiteFooter_1 = require("./SiteFooter");
var formatting_1 = require("../formatting");
var urlSlug = require('url-slug');
exports.ArticlePage = function (props) {
    var entries = props.entries, post = props.post;
    var authorsText = formatting_1.formatAuthors(post.authors, true);
    var pageTitle = post.title;
    var canonicalUrl = settings_1.BAKED_URL + "/" + post.slug;
    var pageDesc = post.excerpt;
    var publishedYear = post.modifiedDate.getFullYear();
    return React.createElement("html", null,
        React.createElement(Head_1.Head, { pageTitle: pageTitle, pageDesc: pageDesc, canonicalUrl: canonicalUrl, imageUrl: post.imageUrl }),
        React.createElement("body", null,
            React.createElement(SiteHeader_1.SiteHeader, { entries: entries }),
            React.createElement("main", null,
                React.createElement("article", { className: "page" },
                    React.createElement("header", { className: "article-header" },
                        React.createElement("h1", { className: "entry-title" }, post.title),
                        React.createElement("p", null, "Global access to education has expanded rapidly over the last century, as governments have made public schooling a priority.")),
                    React.createElement("div", { className: "article-byline" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "byline-block" },
                                React.createElement("h3", null, "Authors"),
                                post.authors.map(function (author) { return React.createElement("p", { className: "author" }, author); })),
                            React.createElement("div", { className: "byline-block" },
                                React.createElement("h3", null, "Affiliations"),
                                React.createElement("p", null, "University of Oxford")),
                            React.createElement("div", { className: "byline-block" },
                                React.createElement("h3", null, "Published"),
                                React.createElement("p", null, post.date.toDateString())),
                            React.createElement("div", { className: "byline-block" },
                                React.createElement("h3", null, "DOI"),
                                React.createElement("p", null, "10.23915/owid.00008")))),
                    React.createElement("div", { className: "article-content", dangerouslySetInnerHTML: { __html: post.html } }),
                    post.footnotes.length > 0 && React.createElement("footer", { className: "article-footer" },
                        React.createElement("section", { className: "footnotes" },
                            React.createElement("h3", { id: "footnotes" }, "Footnotes"),
                            React.createElement("ol", { className: "side-matter side-matter-list", style: { 'list-style-type': 'decimal', opacity: 1 } }, post.footnotes.map(function (footnote, i) {
                                return React.createElement("li", { id: "note-" + (i + 1), className: "side-matter side-matter-note", style: { 'margin-top': '0px' } },
                                    React.createElement("div", { className: "side-matter side-matter-text" },
                                        React.createElement("p", { dangerouslySetInnerHTML: { __html: footnote } })));
                            })))))),
            React.createElement("div", { id: "wpadminbar", style: { display: 'none' } },
                React.createElement("div", { className: "quicklinks", id: "wp-toolbar", role: "navigation", "aria-label": "Toolbar" },
                    React.createElement("ul", { id: "wp-admin-bar-root-default", className: "ab-top-menu" },
                        React.createElement("li", { id: "wp-admin-bar-site-name", className: "menupop" },
                            React.createElement("a", { className: "ab-item", "aria-haspopup": "true", href: "/wp-admin/" }, "Our World In Data")),
                        React.createElement("li", { id: "wp-admin-bar-edit" },
                            React.createElement("a", { className: "ab-item", href: settings_1.WORDPRESS_URL + "/wp-admin/post.php?post=" + post.id + "&action=edit" }, "Edit Page"))))),
            React.createElement(SiteFooter_1.SiteFooter, null)));
};
//# sourceMappingURL=ArticlePage.js.map