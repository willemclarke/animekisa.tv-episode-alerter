const nodemailer = require("nodemailer");

class Email {
  sendEmail(episodesForEmail, name) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      pool: true,
      secure: true,
      auth: {
        user: "testgmail@gmai.com",
        pass: "testpass"
      }
    });

    const mailOptions = {
      from: '"Anime Alerter " <testgmail@gmai.com>', // sender address (who sends)
      to: "testgmail@gmai.com", // list of receivers (who receives)
      subject: `${name} New Episode Alert!`,
      text: `${name} has ${episodesForEmail} new episodes released on platforms such as animekisa.tv and kissanime.ru` // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }

      console.log(`Message sent for ${name}: ` + info.response);
    });
  }
}

module.exports = Email;
