export const socialLoginResetPassword = (name, otp) => `
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
          Sign in to your Piper account
        </h2>

        <p style="
          margin: 0 0 20px;
          font-size: 15px;
          line-height: 24px;
          color: #cbd5e1;
        ">
          Hi ${name}, following your reset password request, please use your social login provider to sign in to your Piper account.
        </p>

        <p style="
          margin: 0 0 20px;
          font-size: 15px;
          line-height: 24px;
          color: #cbd5e1;
        ">
          This Piper account does not currently have a password for login.
        </p>

        <p style="
          margin: 0 0 20px;
          font-size: 15px;
          line-height: 24px;
          color: #cbd5e1;
        ">
          Once you sign in using Google, you may set a password from your account
          settings if that option is available.
        </p>

        <p style="
              margin-top: 16px;
              font-size: 15px;
              line-height: 24px;
              color: #cbd5e1;
            ">
          Thank you,<br />
          <strong style="color: #ffffff;">The Piper Team</strong>
        </p>
      </div>

      <div style="
        padding: 18px 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        background-color: #020617;
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
`