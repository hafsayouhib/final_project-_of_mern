const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const apiKey = process.env.SG_KEY;
if (!apiKey) {
  console.error("SendGrid API key is not set in the environment variables.");
  process.exit(1); // Exit the process if API key is not set
}

sgMail.setApiKey(apiKey);
const sendSGMail = async ({ to, sender, subject, html, attachments, text }) => {
  try {
    const from = "hafsayouhib6@gmail.com";

    const msg = {
      to,
      from,
      subject,
      html,
      text,
      attachments,
    };

    return sgMail.send(msg);
  } catch (error) {
    if (error.response) {
      console.error("Error response received from SendGrid:", error.response.body);
    } else {
      console.error("Error sending email:", error.message);
    }
    throw error;
  }
};

exports.sendEmail = async (args) => {
  try {
    return await sendSGMail(args);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
