const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');
let transporter = nodemailer.createTransport({
    // service: 'hotmail',
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "expensemanager1206@outlook.com", // generated ethereal user
      pass: "Thanos12@", // generated ethereal password
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in renderin template', err);
                return;
            }
            mailHTML = template;

        }
    )
    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};