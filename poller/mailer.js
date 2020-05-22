"use strict";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { clientId, clientSecret, refreshToken } = require('./secret.js');

// async..await is not allowed in global scope, must use a wrapper
const send = async (html) => {

  const oauth2Client = new OAuth2(
    clientId, // ClientID
    clientSecret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );  

  oauth2Client.setCredentials({
    refresh_token: refreshToken  
  }); 
  
  const accessToken = oauth2Client.getAccessToken()

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "me@chris.dev", 
         clientId,
         clientSecret,
         refreshToken,
         accessToken
    }
  });

  // send mail with defined transport object
  let info = await smtpTransport.sendMail({
    from: '"me" <me@chris.dev>', // sender address
    to: "me@chris.dev", // list of receivers
    subject: "Hello ✔", // Subject line
    //text: "Hello world?", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  send
}