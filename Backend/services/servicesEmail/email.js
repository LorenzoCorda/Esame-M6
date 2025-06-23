const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class EmailServices {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async send(to, subject, message) {
    try {
      const messageOption = {
        to,
        from: "cordalorenzowork@gmail.com",
        subject,
        html: message,
      };
      await sgMail.send(messageOption).then(() => console.log("email sent"));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = EmailServices;
