const nodemailer = require("nodemailer");
require("dotenv").config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

class Email {
  sendEmail(episodesForEmail, name) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      pool: true,
      secure: true,
      auth: {
        user: `${emailUser}`,
        pass: `${emailPass}`
      }
    });

    const mailOptions = {
      from: `Anime Episode Alerter: ${emailUser}`, // sender address (who sends)
      to: `${emailUser}`, // list of receivers (who receives)
      subject: `${name} New Episode Alert!`,
      text: `${name} has ${episodesForEmail} new episodes released on anime platforms! E.g: crunchyroll.com/en-gb | animelab.com | animekisa.tv | kissanime.ru` // plaintext body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log(`Message sent for ${name}: ` + info.response);
    });
  }
}

module.exports = Email;
