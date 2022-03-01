const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    balanceAmount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
},{timestamps: true});

const Balance = mongoose.model('Balance', balanceSchema);
module.exports = Balance;