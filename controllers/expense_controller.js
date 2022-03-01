const Expense = require('../model/expense');
const Balance = require('../model/balance');
const e = require('express');

module.exports.create = async function(req, res){
    try{
        let balance = await Balance.findById(req.body.balance);

        if(balance){
            // req.body.amount = eval(`${req.body.expenseIncome} ${req.body.amount}`);

            let newExpense = await Expense.create({
                description: req.body.description,
                category: req.body.category,
                amount: req.body.amount,
                date: req.body.date,
                expenseType: req.body.expenseIncome,
                user: req.user._id,
                balance: req.body.balance
            });

            balance.expenses.push(newExpense);


            let newBalance = eval(`${balance.balanceAmount} ${req.body.expenseIncome} ${req.body.amount}`);
            console.log(newBalance);
            balance.updateOne({$set: {balanceAmount: newBalance}}).exec();
            balance.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('error', err);
    }
}

module.exports.delete = async function(req, res){

    try{

        let expense = await Expense.findById(req.params.id);
        
        let balanceId = expense.balance;
        let expenseAmount = expense.amount;
        let expenseType = expense.expenseType;
        expense.remove();
        
        let balance = await Balance.findByIdAndUpdate(balanceId, {$pull: {expenses: req.params.id}});
        let newBalance = eval(`${balance.balanceAmount} - (${expenseType} ${expenseAmount})`);
        balance.updateOne({$set: {balanceAmount: newBalance}}).exec();
        
        return res.redirect('back');
    }catch(err){
        console.log('error', err);
    }
}