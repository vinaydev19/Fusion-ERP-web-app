import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "vinaykumarporandla19@gmail.com",
    pass: "wjrh ttyz djap fsfm",
  },
});
