const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "harshv521",
      pass: process.env.GMAILPASS,
    },
  });

  const message = {
    from: `Harsh <harshv521@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //  transport.sendMail(message);

  transport.sendMail(message, function (error, info) {
    if (error) {
      console.log("error is " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
