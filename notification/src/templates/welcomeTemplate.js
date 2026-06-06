export const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Piper</title>
</head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden;">
    
    <div style="background:#111827; padding:30px; text-align:center;">
      <h1 style="color:white; margin:0;">Welcome to Piper</h1>
    </div>

    <div style="padding:30px;">
      <h2>Hello ${name},</h2>

      <p>
        Thank you for joining Piper. Your account has been successfully created.
      </p>

      <p>
        We're excited to have you with us and can't wait for you to explore everything our platform offers.
      </p>

      <p>
        If you have any questions, feel free to contact our support team.
      </p>

      <p>Best Regards,<br><strong>Piper Team</strong></p>
    </div>

  </div>
</body>
</html>
`;