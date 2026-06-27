export const resetPassword = (name, otp) => `
<!DOCTYPE html>

<html lang="en">

<body style="
      margin: 0;
      padding: 0;
      background-color: #020617;
      font-family: Arial, Helvetica, sans-serif;
      color: #ffffff;
    ">
  <div style="padding: 32px 16px;">
    <div style="
          max-width: 560px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          background-color: #0f172a;
        ">
      <div style="
            padding: 24px 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background-color: #020617;
          ">
        <div style="display: flex; align-items: center;">
          <div style="
                display: inline-flex;
                width: 40px;
                height: 40px;
                margin-right: 12px;
                align-items: center;
                justify-content: center;
                border-radius: 14px;
                background-color: #fbbf24;
                color: #020617;
                font-size: 20px;
                font-weight: bold;
              ">
            ♪
          </div>

          <div>
            <h1 style="margin: 0; font-size: 20px; color: #ffffff;">
              Piper
            </h1>
            <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">
              Music for everyone
            </p>
          </div>
        </div>
      </div>

      <div style="padding: 32px 30px;">
        <h2 style="margin: 0 0 14px; font-size: 24px; color: #ffffff;">
          Verify your account
        </h2>

        <p style="
          margin: 0 0 20px;
          font-size: 15px;
          line-height: 24px;
          color: #cbd5e1;
        ">
          Hi ${name}, use the verification code below to confirm your email address and activate your account.
        </p>

        <div style="
          margin: 24px 0;
          padding: 18px;
          border-radius: 14px;
          background-color: #1e293b;
          text-align: center;
        ">
          <p style="
            margin: 0;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #fbbf24;
          ">
            {{OTP}}
          </p>
        </div>

        <p style="
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 22px;
          color: #cbd5e1;
        ">
          This OTP will expire in <strong style="color: #ffffff;">10 minutes</strong>.
        </p>

        <p style="
          margin: 0;
          font-size: 13px;
          line-height: 21px;
          color: #94a3b8;
        ">
          Do not share this code with anyone. Piper will never ask for your OTP
          through a call, message, or social media.
        </p>
      </div>

      <div style="
        padding: 18px 30px; background-color: #020617;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
      ">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          This is an automatic message. Please do not respond to this email.
        </p>
      </div>
    </div>
  </div>

</body>

</html>
`;