import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

export const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Verify your email",
    html: `<div style="background-color: #f5f5f5; padding: 40px 0; font-family: Arial, sans-serif;">
    
    <div style="
      max-width: 480px;
      margin: auto;
      background: #ffffff;
      border-radius: 10px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    ">

      <h1 style="margin: 0; color: #222;">DR CSE A</h1>
      <p style="color: #777; font-size: 14px; font-style: italic;">
        Relive some memories
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <h2 style="color: #333; margin-bottom: 10px;">Verify your email</h2>

      <p style="color: #555; font-size: 14px;">
        Thanks for signing up! Please confirm your email address to continue.
      </p>

      <a href="${link}" 
        style="
          display: inline-block;
          margin-top: 20px;
          padding: 12px 24px;
          font-size: 14px;
          color: #fff;
          background-color: #333;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        ">
        Verify Email
      </a>

      <p style="margin-top: 20px; font-size: 12px; color: #888;">
        If the button doesn’t work, copy and paste this link:
      </p>

      <p style="word-break: break-all; font-size: 12px; color: #666;">
        ${link}
      </p>

      <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
        If you didn’t create this account, you can safely ignore this email.
      </p>

    </div>
  </div>
`,
  });
  console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
};
