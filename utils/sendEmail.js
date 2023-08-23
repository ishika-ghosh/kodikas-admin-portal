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
  "Qualification for round <round> of Kodikas - Innovate Your Code! 🚀",
];

const texts = [
  "Hello <leaderName>,\n\nWe trust this message finds you well and excited for the upcoming event! 😄\n\nWe're thrilled to share the wonderful news that your team <teamName>'s registration for Kodikas 2K23 has been a success, and your team is now officially registered and complete! 🎉\nmTo make sure you're all set for the event, we have generated your personalized Hall Ticket. You can access your Hall Ticket by clicking on the link below:\n\nhttps://api.qrserver.com/v1/create-qr-code/?size=400x400&data=<teamid>\n\nYour Hall Ticket contains essential details, including the event schedule, venue information, and other important instructions. We kindly request you to review the information provided and ensure everything is accurate.\n\nThe entire Team Kodikas 2K23 is eagerly looking forward to your presence at the event. Prepare to showcase your coding skills, compete with the best, and aim for victory! 🏆💻\n\nShould you have any inquiries or need assistance, feel free to reach out to us. We're here to make your Kodikas experience exceptional.\n\nSee you soon at the event, and let the coding magic begin! 🚀\n\nBest Regards,\nTeam Kodikas 2K23",
  "Hello <leaderName>,\n\nHope this finds you in great spirit and buckled up for upcoming rounds! ✨\n\nWe're pleased to share with you that your team <teamName> has qualified for the round of Kodikas 2K23. Your hard work has paid off. The entire team of Kodikas 2k23 congratulates you and we will be delighted to see you perform in further rounds.💻🎉\n\nWe wish you All the Best for the next round when you take a step closer towards your victory!💫\n\nBest Regards,Team Kodikas 2K23 🖥",
];

// Send email to the team member
const sendConfirmationEmail = async (teamLeader, team, email, event) => {
  const subject = subjects[event.event];
  const text = texts[event.event];
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject.replace("<round>",event?.round),
    text: text
      .replace("<leaderName>", teamLeader?.name)
      .replace("<teamName>", team?.teamName)
      .replace("<teamid>", team?._id),
  };
  await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
