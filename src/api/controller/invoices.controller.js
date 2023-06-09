import { StatusCodes } from "http-status-codes"
import InvoiceModel from "../model/invoice.model";
import Joi from "joi"

export default {



    findAll(req, res) {
        InvoiceModel.find().then(invoices => {
            res.json(invoices).catch(error => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
            })
        })
    },

    create(req, res) {
        const { item, qte, date, due, rate, tax } = req.body;
        const schema = Joi.object().keys({
            item: Joi.string().required(),
            qte: Joi.number().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            rate: Joi.number().optional(),
            tax: Joi.number().optional(),
        })

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }


        InvoiceModel.create(value).then(invoice => {
            res.status(StatusCodes.OK).json({ invoice })
        }).catch(error => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error })
        })
    },
    findOne(req, res) {
        let { id } = req.params
        InvoiceModel.findById(id).then(invoice => {
            if (!invoice) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Invoice not found" })
            }
            return res.json(invoice)
        }).catch(error => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        })

    },
    delete(req, res) {
        let { id } = req.params
        InvoiceModel.findByIdAndRemove(id).then(invoice => {
            if (!invoice) {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "Invoice not found" })
            }
            return res.json(invoice)
        }).catch(error => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        })

    },
    update(req,res){
        let {id}=req.params
        const schema = Joi.object().keys({
            item: Joi.string().optional(),
            qte: Joi.number().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            rate: Joi.number().optional(),
            tax: Joi.number().optional(),
        })

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }


        InvoiceModel.findByIdAndUpdate({"_id":id},value).then(invoice => {
            res.status(StatusCodes.OK).json({ invoice })
        }).catch(error => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error })
        })
    }
}