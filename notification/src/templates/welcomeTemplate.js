export const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #020617;
      font-family: Arial, Helvetica, sans-serif;
      color: #ffffff;
    "
  >
    <div style="padding: 32px 16px;">
      <div
        style="
          max-width: 560px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          background-color: #0f172a;
        "
      >
        <!-- Header -->
        <div
          style="
            padding: 24px 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background-color: #020617;
          "
        >
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-collapse: collapse;"
          >
            <tr>
              <td
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 14px;
                  background-color: #fbbf24;
                  color: #020617;
                  text-align: center;
                  vertical-align: middle;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ♪
              </td>

              <td style="padding-left: 12px; vertical-align: middle;">
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 20px;
                    font-weight: 700;
                  "
                >
                  Piper
                </h1>

                <p
                  style="
                    margin: 4px 0 0;
                    color: #94a3b8;
                    font-size: 12px;
                  "
                >
                  Music for everyone
                </p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Content -->
        <div style="padding: 32px 30px;">
          <h2
            style="
              margin: 0 0 14px;
              color: #ffffff;
              font-size: 24px;
              line-height: 32px;
            "
          >
            Welcome to Piper! 🎉
          </h2>

          <p
            style="
              margin: 0 0 18px;
              color: #cbd5e1;
              font-size: 15px;
              line-height: 24px;
            "
          >
            Hi {{name}}, your Piper account has been created successfully. You are now ready
            to discover music, build playlists, and enjoy your favourite tracks.
          </p>

          <div
            style="
              margin: 24px 0;
              padding: 20px;
              border: 1px solid rgba(251, 191, 36, 0.2);
              border-radius: 14px;
              background-color: rgba(251, 191, 36, 0.08);
            "
          >
            <h3
              style="
                margin: 0 0 10px;
                color: #fbbf24;
                font-size: 16px;
              "
            >
              What you can do next
            </h3>

            <p
              style="
                margin: 0 0 8px;
                color: #cbd5e1;
                font-size: 14px;
                line-height: 21px;
              "
            >
              • Explore music across different genres.
            </p>

            <p
              style="
                margin: 0 0 8px;
                color: #cbd5e1;
                font-size: 14px;
                line-height: 21px;
              "
            >
              • Create and manage your favourite playlists.
            </p>

            <p
              style="
                margin: 0;
                color: #cbd5e1;
                font-size: 14px;
                line-height: 21px;
              "
            >
              • Discover new artists and tracks.
            </p>
          </div>

          <p
            style="
              margin: 0;
              color: #94a3b8;
              font-size: 13px;
              line-height: 21px;
            "
          >
            We are glad to have you with us. Start listening and make Piper your
            music space.
          </p>
          
          <p
            style="
              margin-top: 16px;
              font-size: 15px;
              line-height: 24px;
              color: #cbd5e1;
            "
          >
            Thank you,<br />
            <strong style="color: #ffffff;">The Piper Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div
          style="
            padding: 18px 30px; background-color: #020617;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
          "
        >
          <p
            style="
              margin: 0;
              color: #64748b;
              font-size: 12px;
              line-height: 18px;
            "
          >
            This is an automatic message. Please do not respond to this email.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;