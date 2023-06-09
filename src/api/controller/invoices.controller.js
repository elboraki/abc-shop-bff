import InvoiceModel from "../model/invoice.model";

const invoices = [
    { id: 1, item: "Google X1", qte: 4, date: new Date() },
    { id: 2, item: "Amazon Lambda", qte: 3, date: new Date() },
    { id: 9, item: "Microsoft E1", qte: 8, date: new Date() }
];
export default {



    findAll(req, res) {
        res.json(invoices)
    },

    create(req,res){
        const {item,qte,date,due,rate,tax}=req.body;
        if(!item){
            return res.status(400).json({err:"item property is required"})
        }
        if(!date){
            return res.status(400).json({err:"date property is required"})
        }
        if(!qte){
            return res.status(400).json({err:"qte property is required"})
        }
        if(!due){
            return res.status(400).json({err:"due property is required"})
        }

        InvoiceModel.create({item,qte,date,due,rate,tax}).then(invoice=>{
            res.status(200).json({invoice})
        }).catch(error=>{
            res.status(500).json({msg:error})
        })
    }
}