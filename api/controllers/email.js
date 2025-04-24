
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.COMPANY_EMAIL,
//     pass: process.env.COMPANY_EMAIL_PASSWORD,
//   },
// });

// export const sendEmail = async (mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error("Email sending error:", error);
//     throw error;
//   }
// };
export const sendEmail = async (mailOptions) => {
  try {
    if (!mailOptions.to || !mailOptions.subject || !mailOptions.text) {
      throw new Error("Missing required email fields");
    }
    
    const result = await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      ...mailOptions
    });
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};