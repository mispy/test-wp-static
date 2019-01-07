"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _ = require("lodash");
// XXX this menu is pretty old and should be redone at some stage
exports.SiteHeader = function (props) {
    var entries = props.entries;
    var activeCategories = [];
    var activeEntry = undefined;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var category = entries_1[_i];
        for (var _a = 0, _b = category.entries; _a < _b.length; _a++) {
            var entry = _b[_a];
            if (entry.slug === props.activeSlug) {
                activeCategories.push(category);
                if (!activeEntry)
                    activeEntry = entry;
            }
        }
    }
    var mainCategory = activeCategories[0];
    return React.createElement("header", { className: "SiteHeader" },
        React.createElement("nav", { id: "owid-topbar" },
            React.createElement("a", { className: "logo", href: "/" }, "Our World in Data"),
            React.createElement("ul", { className: "desktop" },
                React.createElement("li", null,
                    React.createElement("form", { id: "search-nav", action: "https://google.com/search", method: "GET" },
                        React.createElement("input", { type: "hidden", name: "sitesearch", value: "ourworldindata.org" }),
                        React.createElement("input", { type: "search", name: "q", placeholder: "Search..." }))),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://sdg-tracker.org", title: "Sustainable Development Goals" }, "SDGs")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/blog" }, "Blog")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/about" }, "About")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/teaching" }, "Teaching")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/support" }, "Donate"))),
            React.createElement("ul", { className: "mobile" },
                React.createElement("li", { className: "nav-button" },
                    React.createElement("a", { href: "https://google.com/search?q=site:ourworldindata.org", "data-expand": "#search-dropdown" },
                        React.createElement("i", { className: 'fac fac-search' }))),
                React.createElement("li", { className: "nav-button" },
                    React.createElement("a", { href: "/", "data-expand": "#topics-dropdown", className: 'mobile' },
                        React.createElement("i", { className: 'fac fac-bars' }))))),
        React.createElement("div", { id: "topics-dropdown", className: "mobile" },
            React.createElement("ul", null,
                React.createElement("li", { className: "header" },
                    React.createElement("h2", null, "Entries")),
                entries.map(function (category) {
                    return React.createElement("li", { key: category.slug, className: "category" },
                        React.createElement("a", { href: "/#" + category.slug },
                            React.createElement("span", null, category.name)),
                        React.createElement("div", { className: "subcategory-menu" },
                            React.createElement("div", { className: "submenu-title" }, category.name),
                            React.createElement("ul", null, category.entries.map(function (entry) {
                                return React.createElement("li", { key: entry.slug },
                                    React.createElement("a", { className: entry.starred ? "starred" : undefined, title: entry.starred ? "Starred pages are our best and most complete entries." : undefined, href: "/" + entry.slug }, entry.title));
                            }))));
                }),
                React.createElement("li", { className: "end-link" },
                    React.createElement("a", { href: "https://sdg-tracker.org" }, "SDGs")),
                React.createElement("li", { className: "end-link" },
                    React.createElement("a", { href: "/blog" }, "Blog")),
                React.createElement("li", { className: 'end-link' },
                    React.createElement("a", { href: '/about' }, "About")),
                React.createElement("li", { className: 'end-link' },
                    React.createElement("a", { href: '/support' }, "Donate")))),
        React.createElement("div", { id: "search-dropdown", className: "mobile" },
            React.createElement("form", { id: "search-nav", action: "https://google.com/search", method: "GET" },
                React.createElement("input", { type: "hidden", name: "sitesearch", value: "ourworldindata.org" }),
                React.createElement("input", { type: "search", name: "q", placeholder: "Search..." }))),
        React.createElement("div", { id: "category-nav", className: "desktop" },
            React.createElement("ul", null, entries.map(function (category) {
                return React.createElement("li", { key: category.slug, className: "category" + (_.includes(activeCategories, category) ? " active" : ""), title: category.name },
                    React.createElement("a", { href: "/#" + category.slug },
                        React.createElement("span", null, category.name)),
                    React.createElement("ul", { className: "entries" },
                        React.createElement("li", null,
                            React.createElement("hr", null)),
                        category.entries.map(function (entry) {
                            return React.createElement("li", { key: entry.slug },
                                React.createElement("a", { className: entry.starred ? "starred" : undefined, title: entry.starred ? "Starred pages are our best and most complete entries." : undefined, href: "/" + entry.slug }, entry.title));
                        })));
            }))),
        React.createElement("div", { id: "entries-nav", className: "desktop" }, mainCategory && [
            React.createElement("li", { key: 0 },
                React.createElement("hr", null)),
            mainCategory.entries.map(function (entry) {
                var classes = [];
                return React.createElement("li", { key: entry.slug, className: entry === activeEntry ? "active" : undefined },
                    React.createElement("a", { className: entry.starred ? "starred" : undefined, title: entry.starred ? "Starred pages are our best and most complete entries." : undefined, href: "/" + entry.slug }, entry.title));
            })
        ]));
};
//# sourceMappingURL=SiteHeader.js.map