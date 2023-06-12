"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _httpStatusCodes = require("http-status-codes");

var _invoice = require("../model/invoice.model");

var _invoice2 = _interopRequireDefault(_invoice);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res) {
        _invoice2.default.find().then(function (invoices) {
            res.json(invoices).catch(function (error) {
                res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            });
        });
    },
    create: function create(req, res) {
        var _req$body = req.body,
            item = _req$body.item,
            qte = _req$body.qte,
            date = _req$body.date,
            due = _req$body.due,
            rate = _req$body.rate,
            tax = _req$body.tax;

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required(),
            qte: _joi2.default.number().required(),
            date: _joi2.default.date().required(),
            due: _joi2.default.date().required(),
            rate: _joi2.default.number().optional(),
            tax: _joi2.default.number().optional()
        });

        var _schema$validate = schema.validate(req.body),
            error = _schema$validate.error,
            value = _schema$validate.value;

        if (error) {
            return res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json(error);
        }

        _invoice2.default.create(value).then(function (invoice) {
            res.status(_httpStatusCodes.StatusCodes.OK).json({ invoice: invoice });
        }).catch(function (error) {
            res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
        });
    },
    findOne: function findOne(req, res) {
        var id = req.params.id;

        _invoice2.default.findById(id).then(function (invoice) {
            if (!invoice) {
                return res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({ msg: "Invoice not found" });
            }
            return res.json(invoice);
        }).catch(function (error) {
            return res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
    },
    delete: function _delete(req, res) {
        var id = req.params.id;

        _invoice2.default.findByIdAndRemove(id).then(function (invoice) {
            if (!invoice) {
                return res.status(_httpStatusCodes.StatusCodes.NOT_FOUND).json({ msg: "Invoice not found" });
            }
            return res.json(invoice);
        }).catch(function (error) {
            return res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
    },
    update: function update(req, res) {
        var id = req.params.id;

        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().optional(),
            qte: _joi2.default.number().optional(),
            date: _joi2.default.date().optional(),
            due: _joi2.default.date().optional(),
            rate: _joi2.default.number().optional(),
            tax: _joi2.default.number().optional()
        });

        var _schema$validate2 = schema.validate(req.body),
            error = _schema$validate2.error,
            value = _schema$validate2.value;

        if (error) {
            return res.status(_httpStatusCodes.StatusCodes.BAD_REQUEST).json(error);
        }

        _invoice2.default.findByIdAndUpdate({ "_id": id }, value).then(function (invoice) {
            res.status(_httpStatusCodes.StatusCodes.OK).json({ invoice: invoice });
        }).catch(function (error) {
            res.status(_httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
        });
    }
};
//# sourceMappingURL=invoices.controller.js.map