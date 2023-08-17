import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const subjects = [
  "Your Hall Ticket and Successful Registration for Kodikas - Get Ready to Innovate Your Code! 🚀",
  "Yout entry confirmed",
  "Lunch",
  "Round qualified",
];

const texts = [
  "Hello <leaderName>,\n\nWe trust this message finds you well and excited for the upcoming event! 😄\n\nWe're thrilled to share the wonderful news that your team <teamName>'s registration for Kodikas 2K23 has been a success, and your team is now officially registered and complete! 🎉\nmTo make sure you're all set for the event, we have generated your personalized Hall Ticket. You can access your Hall Ticket by clicking on the link below:\n\nhttps://api.qrserver.com/v1/create-qr-code/?size=400x400&data=<teamid>\n\nYour Hall Ticket contains essential details, including the event schedule, venue information, and other important instructions. We kindly request you to review the information provided and ensure everything is accurate.\n\nThe entire Team Kodikas 2K23 is eagerly looking forward to your presence at the event. Prepare to showcase your coding skills, compete with the best, and aim for victory! 🏆💻\n\nShould you have any inquiries or need assistance, feel free to reach out to us. We're here to make your Kodikas experience exceptional.\n\nSee you soon at the event, and let the coding magic begin! 🚀\n\nBest Regards,\nTeam Kodikas 2K23",
  "Goy your entry",
  "Got your lunch",
  "Congratulations you nailed it",
];

// Send email to the team member
const sendConfirmationEmail = async (teamLeader, team, email, event) => {
  const subject = subjects[event.event];
  const text = texts[event.event];
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject.replace("<teamName>", team.teamName),
    text: text
      .replace("<leaderName>", teamLeader?.name)
      .replace("<teamName>", team?.teamName)
      .replace("<teamMember>", team?.teamMember?.name)
      .replace("<teamid>", team?._id),
  };
  await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
