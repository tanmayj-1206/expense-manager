const mongoose = require('mongoose');
// require('dotenv').config()

async function main() {
  await mongoose.connect("mongodb+srv://tanmayj-1206:hbsCP47fuXxHjFEF@cluster0.v2kjinn.mongodb.net/?retryWrites=true&w=majority");
}

main().catch(err => console.log(err));


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function(){
    console.log('connected to database');
});

module.exports = db;