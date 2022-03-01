const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    expenseType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Balance'
    }
},
{timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;