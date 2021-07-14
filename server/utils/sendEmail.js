const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      clientId:
        "314706053914-bq7bp70b6m4bu9fn0p9mp3sast66o0c0.apps.googleusercontent.com",
      clientSecret: "BKNcSWWiG9F0LOAkkQiSyFR_",
    },
  });
  transporter.on("token", (token) => {
    console.log("A new access token was generated");
    console.log("User: %s", token.user);
    console.log("Access Token: %s", token.accessToken);
    console.log("Expires: %s", new Date(token.expires));
  });
  // setup e-mail data with unicode symbols
  let mailOptions = {
    from: "harshv521@gmail.com", // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ?", // plaintext body
    html: "<b>Hello world ?</b>", // html body

    auth: {
      user: "harshv521@gmail.com",
      refreshToken:
        "1//04Dwr3MTxhYiRCgYIARAAGAQSNwF-L9IrECNtHsbn5pxD8rEU6VFF9eV7llOcZzFZJkhw2z4LnMNJVolN9CmJrHVSQpFq-hhzCiI",
      accessToken:
        "ya29.a0ARrdaM8oMP8beEqE6bIGgPetJcNjVvGSPsEEekYOMV9qWzb2ibMrAlcSpn0u2m-eFxhyjL72nzgRDIYQpH8u-tRSa9U75PMvC9gVVUvwK7eLA5UOmFSD15sFGGGLZ5pZblK16MljeeBIMwR_XHWCP6Zsj4UK",
      expires: 1494388182480,
    },
  };

  //  transport.sendMail(message);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error is-> " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
