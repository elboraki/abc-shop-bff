"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _invoice = require("../model/invoice.model");

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invoices = [{ id: 1, item: "Google X1", qte: 4, date: new Date() }, { id: 2, item: "Amazon Lambda", qte: 3, date: new Date() }, { id: 9, item: "Microsoft E1", qte: 8, date: new Date() }];
exports.default = {
    findAll: function findAll(req, res) {
        res.json(invoices);
    },
    create: function create(req, res) {
        var _req$body = req.body,
            item = _req$body.item,
            qte = _req$body.qte,
            date = _req$body.date,
            due = _req$body.due,
            rate = _req$body.rate,
            tax = _req$body.tax;

        if (!item) {
            return res.status(400).json({ err: "item property is required" });
        }
        if (!date) {
            return res.status(400).json({ err: "date property is required" });
        }
        if (!qte) {
            return res.status(400).json({ err: "qte property is required" });
        }
        if (!due) {
            return res.status(400).json({ err: "due property is required" });
        }

        _invoice2.default.create({ item: item, qte: qte, date: date, due: due, rate: rate, tax: tax }).then(function (invoice) {
            res.status(200).json({ invoice: invoice });
        }).catch(function (error) {
            res.status(500).json({ msg: error });
        });
    }
};
//# sourceMappingURL=invoices.controller.js.map