const nodemailer = require('../config/nodemailer');
module.exports.resetPassword = async function(user, link){
    try{   
        
        const htmlString = nodemailer.renderTemplate({user: user, link: link}, '/reset_password.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: `"Expense Manager" <expensemanager1206@outlook.com>`, // sender address
            to: user.email, // list of receivers
            subject: "Reset Password", // Subject line
            html: htmlString, // html body
        });
        console.log(info);
    }catch(err){
        console.log(err);
    }

}