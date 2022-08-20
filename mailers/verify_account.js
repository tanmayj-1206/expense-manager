const nodemailer = require('../config/nodemailer');

module.exports.verifyAccount = async function(user, relLink){
    try{

        let link = `http://localhost:3000${relLink}`;
        
        let htmlString = nodemailer.renderTemplate({user: user, link: link}, '/verification_mail.ejs');
        
        let info = await nodemailer.transporter.sendMail({
            from: '"Expense Manager" <expensemanager1206@outlook.com>', // sender address
            to: user.email, // list of receivers
            subject: "Account verification", // Subject line
            html: htmlString, // html body
        });

        console.log(info);
    }catch(err){
        console.log(err);
    }
}