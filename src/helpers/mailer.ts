import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId.toString(), {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bf7abebdd22c4b",
        pass: "5d0d432895ddf6",
      },
    });

    const mailOptions = {
      from: "abc@gmail.com",
      to: email,
      subject:
        emailType === "Verify" ? "Verify your email" : "Reset your password",
      html: `<p>
      Click <a href="${
        process.env.DOMAIN +
        `${
          emailType === "Verify"
            ? `/verifyemail?token=${hashedToken}`
            : `/forgotPassword?token=${hashedToken}`
        }`
      }" >here</a> to 
        ${
          emailType === "Verify" ? " verify your email" : " reset your password"
        }.
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
