"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var React = require("react");
var ReactDOM = require("react-dom");
var AdminApp_1 = require("./AdminApp");
var mobx_1 = require("mobx");
var urljoin = require("url-join");
// Entry point for the grapher admin
// Currently just the editor, but eventually should expand to cover everything
var Admin = /** @class */ (function () {
    function Admin(rootUrl, cacheTag, username) {
        this.currentRequests = [];
        this.grapherRoot = rootUrl;
        this.basePath = "/grapher/admin";
        this.cacheTag = cacheTag;
        this.username = username;
    }
    Object.defineProperty(Admin.prototype, "isLoading", {
        get: function () {
            return this.currentRequests.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Admin.prototype.start = function (containerNode) {
        ReactDOM.render(React.createElement(AdminApp_1.default, { admin: this }), containerNode);
    };
    Admin.prototype.url = function (path) {
        return urljoin(this.basePath, path);
    };
    Object.defineProperty(Admin.prototype, "csrfToken", {
        get: function () {
            var meta = document.querySelector("[name=_token]");
            if (!meta)
                throw new Error("Could not find csrf token");
            return meta.getAttribute("value");
        },
        enumerable: true,
        configurable: true
    });
    // Make a request with no error or response handling
    Admin.prototype.rawRequest = function (path, data, method) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetch(this.url(path), {
                        method: method,
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-CSRFToken': this.csrfToken
                        },
                        body: method !== 'GET' ? JSON.stringify(data) : undefined
                    })];
            });
        });
    };
    // Make a request and expect JSON in response
    // If we can't retrieve and parse JSON, it is treated as a fatal/unexpected error
    Admin.prototype.requestJSON = function (path, data, method, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var onFailure, response, text, json, request, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onFailure = opts.onFailure || 'show';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        request = this.rawRequest(path, data, method);
                        this.currentRequests.push(request);
                        return [4 /*yield*/, request];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _a.sent();
                        json = JSON.parse(text);
                        if (json.error) {
                            if (onFailure === 'show') {
                                this.errorMessage = { title: "Failed to " + method + " " + path + " (" + response.status + ")", content: json.error.message };
                            }
                            else if (onFailure !== 'continue') {
                                throw json.error;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        this.errorMessage = { title: "Failed to " + method + " " + path + (response ? " (" + response.status + ")" : ""), content: text || err_1, isFatal: true };
                        throw this.errorMessage;
                    case 5:
                        this.currentRequests.pop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/, json];
                }
            });
        });
    };
    Admin.prototype.getJSON = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requestJSON(path, {}, 'GET')];
            });
        });
    };
    __decorate([
        mobx_1.observable
    ], Admin.prototype, "errorMessage", void 0);
    __decorate([
        mobx_1.observable
    ], Admin.prototype, "currentRequests", void 0);
    __decorate([
        mobx_1.computed
    ], Admin.prototype, "isLoading", null);
    return Admin;
}());
exports.default = Admin;
//# sourceMappingURL=Admin.js.map