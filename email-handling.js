const nodemailer = require("nodemailer");

class Email {
  sendEmail(episodesForEmail, name) {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3"
      },
      auth: {
        user: "outlookemail@hotmail.com",
        pass: "outlookmailpass@hotmail.com"
      }
    });

    const mailOptions = {
      from: '"Anime Alerter " <placeholder@hotmail.com>', // sender address (who sends)
      to: "placeholder@hotmail.com", // list of receivers (who receives)
      subject: `${name} New Episode Alert!`, // Subject line
      text: `${name} has ${episodesForEmail} new episodes released on platforms such as animekisa.tv and kissanime.ru` // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }

      console.log("Message sent: " + info.response);
    });
  }
}

module.exports = Email;
