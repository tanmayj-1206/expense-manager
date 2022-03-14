const Balance = require('../model/balance') 
const Expense = require('../model/expense')

module.exports.home = async function(req, res){
    try{

        if(req.isAuthenticated()){
            return res.redirect('/dashboard')
        }
        
        return res.render('home', {title: 'Expense Manager | Home'});
    }catch(err){
        console.log(err)
    }
}