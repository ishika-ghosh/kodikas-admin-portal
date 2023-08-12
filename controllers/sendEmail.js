import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (email, messageData) => {
  if (!email || !messageData) {
    return { success: false };
  }
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Kodikas 2k23 Round Qualified",
      text: `Congratulations team ${messageData.team} for qualifing the ${messageData.round} Round `,
    };
    const res = await transporter.sendMail(mailOptions);
    if (res?.rejected?.length === 0) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
