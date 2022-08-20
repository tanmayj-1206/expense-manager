const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');
require('dotenv').config()
let transporter = nodemailer.createTransport({
    // service: 'hotmail',
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.user, // generated ethereal user
      pass: process.env.password, // generated ethereal password
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