import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";
import { welcomeTemplate } from "../templates/welcomeTemplate.js";

function startListener() {
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
}

export default startListener;
