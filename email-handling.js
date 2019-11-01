const nodemailer = require("nodemailer");

async function sendEmail(episodesForEmail, name) {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport("SMTP", {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
      user: "user,
      pass: "pass"
    },
    tls: {
      ciphers: "SSLv3"
    }
  });

  let info = await transporter.sendMail({
    from: '"Anime Alerter" <animekisa.tv@foo.com>', // sender address
    to: "willem.2@hotmail.com", // list of receivers
    subject: `${name} New Episode Alert!`, // Subject line
    text: `${name} has ${episodesForEmail} new episodes released on platforms such as animekisa.tv and kissanime.ru` // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}
sendEmail().catch(console.error);

module.exports = sendEmail;
