"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../css/style.scss");
require("./oldScripts.js");
var Analytics_1 = require("./Analytics");
var search = document.querySelector("form#search-nav");
if (search) {
    var input_1 = search.querySelector("input[type=search]");
    var lastQuery = "";
    search.addEventListener('submit', function (ev) {
        ev.preventDefault();
        Analytics_1.Analytics.logEvent("OWID_SITE_SEARCH", { query: input_1.value }).then(function () { return search.submit(); }).catch(function () { return search.submit(); });
    });
}
function getParent(el, condition) {
    var current = el;
    while (current) {
        if (condition(current))
            return current;
        current = current.parentElement;
    }
    return null;
}
var trackedLinkExists = !!document.querySelector("a[data-track-click]");
if (trackedLinkExists) {
    document.addEventListener("click", function (ev) {
        var targetElement = ev.target;
        var trackedElement = getParent(targetElement, function (el) { return el.getAttribute("data-track-click") != null; });
        if (trackedElement) {
            Analytics_1.Analytics.logEvent("OWID_SITE_CLICK", { text: trackedElement.innerText, href: trackedElement.getAttribute("href") });
        }
    });
}
//# sourceMappingURL=owid.entry.js.map