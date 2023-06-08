
const invoices = [
    { id: 1, item: "Google X1", qte: 4, date: new Date() },
    { id: 2, item: "Amazon Lambda", qte: 3, date: new Date() },
    { id: 9, item: "Microsoft E1", qte: 8, date: new Date() }
];
export default {



    findAll(req, res) {
        res.json(invoices)
    }
}