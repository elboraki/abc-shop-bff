import {StatusCodes} from "http-status-codes"
import InvoiceModel from "../model/invoice.model";
import Joi from "joi"
const invoices = [
    { id: 1, item: "Google X1", qte: 4, date: new Date() },
    { id: 2, item: "Amazon Lambda", qte: 3, date: new Date() },
    { id: 9, item: "Microsoft E1", qte: 8, date: new Date() }
];
export default {



    findAll(req, res) {
        InvoiceModel.find().then(invoices=>{
            res.json(invoices).catch(error=>{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
            })
        })
    },

    create(req,res){
        const {item,qte,date,due,rate,tax}=req.body;
        const schema=Joi.object().keys({
            item:Joi.string().required(),
            qte:Joi.number().required(),
            date:Joi.date().required(),
            due:Joi.date().required(),
            rate:Joi.number().optional(),
            tax:Joi.number().optional(),
        })

        const {error,value}=schema.validate(req.body);

        if(error){
           return  res.status(StatusCodes.BAD_REQUEST).json(error)
        }


        InvoiceModel.create(value).then(invoice=>{
            res.status(StatusCodes.OK).json({invoice})
        }).catch(error=>{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
        })
    }
}