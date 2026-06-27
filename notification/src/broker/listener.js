import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";
import { welcomeTemplate } from "../templates/welcomeTemplate.js";

function startListener() {

  /* Welcome email queue */
  subscribeToQueue("user_created", async (msg) => {
    const {
      fullName: { firstName, middleName, lastName },
      email,
    } = msg;

    await sendEmail(
      email,
      "Welcome to Piper🎉",
      null,
      welcomeTemplate(firstName),
    );
  });


  /* Reset password OTP queue */
  subscribeToQueue("reset_password", async (msg) => {
    const { email, fullName, otp } = msg;

    const firstName = fullName?.firstName || "there";

    await sendEmail(
      email,
      "Reset Your Piper Password",
      null,
      resetPasswordTemplate(firstName, otp),
    );
  });


  
  /* Social login reset Password queue */
  subscribeToQueue("social_login_reset_password", async (msg) => {
    const { email, fullName } = msg;

    const firstName = fullName?.firstName || "there";

    await sendEmail(
      email,
      "Sign in to your Piper account",
      null,
      socialLoginResetTemplate(firstName),
    );
  });


  console.log("RabbitMQ listeners started");
}

export default startListener;
