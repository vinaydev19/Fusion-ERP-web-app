import { mailTransporter } from "./EmailConfig.js";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./EmailTemplate.js";

const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await mailTransporter.sendMail({
      from: `"Fusion ERP" <vinaykumarporandla19@gmail.com>`,
      to: email,
      subject: "Verify your Email",
      text: "verify your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log(
      `something want wrong while send the verification code || ${error}`
    );
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await mailTransporter.sendMail({
      from: `"Fusion ERP" <vinaykumarporandla19@gmail.com>`,
      to: email,
      subject: "Welcome Email",
      text: "Welcome Email",
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log(
      `something want wrong while send the welcome email || ${error}`
    );
  }
};

const resetPasswordEmail = async (email, resetLink) => {
  try {
    const response = await mailTransporter.sendMail({
      from: `"Fusion ERP" <vinaykumarporandla19@gmail.com>`,
      to: email,
      subject: "Reset Your Password",
      text: "Reset Your Password",
      html: resetPasswordEmail.replace("{resetLink}", resetLink),
    });
    console.log("password reset link send to your email", response);
  } catch (error) {
    console.log(
      `something want wrong while send the reset password link || ${error}`
    );
  }
};

const resetPasswordConfirmationEmail = async (email, name) => {
  try {
    const response = await mailTransporter.sendMail({
      from: `"Fusion ERP" <vinaykumarporandla19@gmail.com>`,
      to: email,
      subject: "Password Reset Successful",
      text: "Password Reset Successful",
      html: resetPasswordEmail.replace("{name}", name),
    });
    console.log("password reset successful", response);
  } catch (error) {
    console.log(
      `something want wrong while send the reset password link || ${error}`
    );
  }
};

export {
  sendVerificationCode,
  sendWelcomeEmail,
  resetPasswordEmail,
  resetPasswordConfirmationEmail,
};
