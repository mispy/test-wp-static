"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./charts.entry");
// Admin only CSS
require("AdminLTE.min.css");
require("_all-skins.min.css");
require("../css/admin.css");
window.$ = window.jQuery = require('jquery');
require('./libs/bootstrap-treeview.min.js');
require('./libs/admin-lte-app.min');
require('./libs/bootstrap.min.js');
require('./admin/admin.global');
window.Admin = require('./admin/Admin').default;
// Importer code
window.Importer = require('./admin/Importer').default;
//# sourceMappingURL=admin.entry.js.map