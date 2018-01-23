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
var cheerio = require("cheerio");
var urlSlug = require('url-slug');
var wpautop = require('wpautop');
var lodash_1 = require("lodash");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var settings_1 = require("./settings");
var wpdb_1 = require("./wpdb");
var Tablepress_1 = require("./views/Tablepress");
var path = require("path");
function romanize(num) {
    if (!+num)
        return "";
    var digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
function formatPost(post, grapherExports) {
    return __awaiter(this, void 0, void 0, function () {
        var html, footnotes, tables, $, sectionStarts, _i, sectionStarts_1, start, $start, $contents, $wrapNode, grapherIframes, _a, grapherIframes_1, el, src, chart, output, uploadDex, _b, _c, el, src, upload;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    html = post.content;
                    // Standardize spacing
                    html = html.replace(/\r\n/g, "\n").replace(/(\n\s*)(\n\s*)/g, "\n\n");
                    footnotes = [];
                    html = html.replace(/\[ref\]([\s\S]*?)\[\/ref\]/gm, function (_, footnote) {
                        footnotes.push(footnote);
                        var i = footnotes.length;
                        return "<a id=\"ref-" + i + "\" class=\"side-matter side-matter-ref\" href=\"#note-" + i + "\"><sup class=\"side-matter side-matter-sup\">" + i + "</sup></a>";
                    });
                    // Replicate wordpress formatting (thank gods there's an npm package)
                    if (!html.match(/<!--raw-->/))
                        html = wpautop(html);
                    // Standardize protocols used in links
                    if (settings_1.HTTPS_ONLY)
                        html = html.replace(new RegExp("http://", 'g'), "https://");
                    else
                        html = html.replace(new RegExp("https://", 'g'), "http://");
                    // Use relative urls wherever possible
                    html = html.replace(new RegExp(settings_1.WORDPRESS_URL, 'g'), "")
                        .replace(new RegExp("https?://ourworldindata.org", 'g'), "");
                    return [4 /*yield*/, wpdb_1.getTables()];
                case 1:
                    tables = _d.sent();
                    html = html.replace(/\[table\s+id=(\d+)\s*\/\]/g, function (match, tableId) {
                        var table = tables.get(tableId);
                        if (table)
                            return ReactDOMServer.renderToStaticMarkup(React.createElement(Tablepress_1.default, { data: table.data }));
                        else
                            return "UNKNOWN TABLE";
                    });
                    // These old things don't work with static generation, link them through to maxroser.com
                    html = html.replace(new RegExp("/wp-content/uploads/nvd3", 'g'), "https://www.maxroser.com/owidUploads/nvd3")
                        .replace(new RegExp("/wp-content/uploads/datamaps", 'g'), "https://www.maxroser.com/owidUploads/datamaps");
                    $ = cheerio.load(html);
                    sectionStarts = [$("body").children().get(0)].concat($("h2").toArray());
                    for (_i = 0, sectionStarts_1 = sectionStarts; _i < sectionStarts_1.length; _i++) {
                        start = sectionStarts_1[_i];
                        $start = $(start);
                        $contents = $start.nextUntil("h2");
                        $wrapNode = $("<section></section>");
                        $contents.remove();
                        $wrapNode.append($start.clone());
                        $wrapNode.append($contents);
                        $start.replaceWith($wrapNode);
                    }
                    // Replace grapher iframes with static previews
                    if (grapherExports) {
                        grapherIframes = $("iframe").toArray().filter(function (el) { return (el.attribs['src'] || '').match(/\/grapher\//); });
                        for (_a = 0, grapherIframes_1 = grapherIframes; _a < grapherIframes_1.length; _a++) {
                            el = grapherIframes_1[_a];
                            src = el.attribs['src'];
                            chart = grapherExports.get(src);
                            if (chart) {
                                output = "<div class=\"interactivePreview\"><a href=\"" + src + "\" target=\"_blank\"><div><img src=\"" + chart.svgUrl + "\" data-grapher-src=\"" + src + "\"/></div></a></div>";
                                $(el).replaceWith(output);
                            }
                        }
                    }
                    return [4 /*yield*/, wpdb_1.getUploadedImages()];
                case 2:
                    uploadDex = _d.sent();
                    for (_b = 0, _c = $("img").toArray(); _b < _c.length; _b++) {
                        el = _c[_b];
                        // Open full-size image in new tab
                        if (el.parent.tagName === "a") {
                            el.parent.attribs['target'] = '_blank';
                        }
                        src = el.attribs['src'] || "";
                        upload = uploadDex.get(path.basename(src));
                        if (upload && upload.variants.length) {
                            el.attribs['srcset'] = upload.variants.map(function (v) { return v.url + " " + v.width + "w"; }).join(", ");
                        }
                    }
                    return [2 /*return*/, {
                            id: post.id,
                            type: post.type,
                            slug: post.slug,
                            title: post.title,
                            date: post.date,
                            modifiedDate: post.modifiedDate,
                            authors: post.authors,
                            html: $.html(),
                            footnotes: footnotes,
                            excerpt: post.excerpt || $($("p")[0]).text(),
                            imageUrl: post.imageUrl,
                            tocHeadings: []
                        }];
            }
        });
    });
}
exports.formatPost = formatPost;
function formatAuthors(authors, requireMax) {
    if (requireMax && authors.indexOf("Max Roser") === -1)
        authors.push("Max Roser");
    var authorsText = authors.slice(0, -1).join(", ");
    if (authorsText.length == 0)
        authorsText = authors[0];
    else
        authorsText += " and " + lodash_1.last(authors);
    return authorsText;
}
exports.formatAuthors = formatAuthors;
function formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
}
exports.formatDate = formatDate;
//# sourceMappingURL=formatting.js.map