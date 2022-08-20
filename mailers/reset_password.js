const nodemailer = require('../config/nodemailer');
const url = require('url');
// const urlObject = url.parse(req.url, true);
module.exports.resetPassword = async function(user, link){
    try{   
        // let link = `${req.protocol}://${req.host}/reset-password/${token}`;
        
        const htmlString = nodemailer.renderTemplate({user: user, link: link}, '/reset_password.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: '"Expense Manager" <expensemanager1206@outlook.com>', // sender address
            to: user.email, // list of receivers
            subject: "Reset Password", // Subject line
            html: htmlString, // html body
        });
        console.log(info);
    }catch(err){
        console.log(err);
    }

}