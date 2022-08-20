const nodemailer = require('../config/nodemailer');
require('dotenv').config();
module.exports.verifyAccount = async function(user, link){
    try{
        
        let htmlString = nodemailer.renderTemplate({user: user, link: link}, '/verification_mail.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: `"Expense Manager" <${process.env.user}>`, // sender address
            to: user.email, // list of receivers
            subject: "Account verification", // Subject line
            html: htmlString, // html body
        });

        console.log(info);
    }catch(err){
        console.log(err);
    }
}