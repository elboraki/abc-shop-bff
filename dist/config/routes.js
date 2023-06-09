"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _invoices = require("../api/controller/invoices.controller");

var _invoices2 = _interopRequireDefault(_invoices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();
router.get("/invoices", _invoices2.default.findAll);
router.post("/invoices", _invoices2.default.create);
//# sourceMappingURL=routes.js.map