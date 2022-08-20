const mongoose = require('mongoose');
require('dotenv').config()
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function(){
    console.log('connected to database');
});

module.exports = db;