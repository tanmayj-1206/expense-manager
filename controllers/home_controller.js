const Balance = require('../model/balance') 
const Expense = require('../model/expense')

module.exports.home = async function(req, res){
    if(req.isAuthenticated())
    {
        let balance = await Balance.findOne({user: req.user.id}).populate({
            path: 'expenses',
            options: {
                sort: '-date'
            }
        });
        return res.render('home', {title: 'Home', balance: balance});
    }
    
    res.render('home', {title: 'Home'});
}