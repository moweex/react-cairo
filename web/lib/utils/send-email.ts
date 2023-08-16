import nodemailer from 'nodemailer';
import { ConfUser } from '../types';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

export const sendEmail = async ({
  user,
  url,
}: {
  user: ConfUser;
  url: string;
}) => {
  await transporter.sendMail({
    from: 'registeration@react-cairo.com',
    to: user.email,
    subject: 'Complete your registration to React Cairo',
    html: `<div class="">
      <div class="aHl"></div>
      <div id=":c4" tabindex="-1"></div>
      <div
        id=":bt"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc3MTAwNTI1OTkyNTc3MjA2MSIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW11d; 4:WyIjbXNnLWY6MTc3MTAxODQ4NjY3MjMxODQ2MyIsbnVsbCxbXV0."
      >
        <div id=":bs" class="a3s aiL">
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="width: 100% !important"
          >
            <tbody>
              <tr>
                <td align="center">
                  <table
                    width="600"
                    border="0"
                    cellspacing="0"
                    cellpadding="40"
                    style="
                      border: 1px solid #eaeaea;
                      border-radius: 5px;
                      margin: 40px 0;
                    "
                  >
                    <tbody>
                      <tr>
                        <td align="center">
                          <div
                            style="
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                'Cantarell', 'Fira Sans', 'Droid Sans',
                                'Helvetica Neue', sans-serif;
                              text-align: left;
                              width: 465px;
                            "
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              style="width: 100% !important"
                            >
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <div>
                                      <img
                                        src="https://ci5.googleusercontent.com/proxy/_Xjz8lbogB2EaT5ihUmo119J4weltNtLVoTEs1MgZ1EF47f3QG769wswJrIYWc8Nk0yZjHUq3mlQg8Ityw=s0-d-e1-ft#https://assets.vercel.com/email/vercel.png"
                                        width="40"
                                        height="37"
                                        alt="Vercel"
                                        class="CToWUd"
                                        data-bit="iit"
                                        style="display: none"
                                      />
                                    </div>
                                    <h1
                                      style="
                                        color: #000;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                                          'Oxygen', 'Ubuntu', 'Cantarell',
                                          'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-size: 24px;
                                        font-weight: normal;
                                        margin: 30px 0;
                                        padding: 0;
                                      "
                                    >
                                      Complete your registration
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              id="m_-51757279327415905168e7e1112-7980-4bdd-9db6-cdb6e0a4d77b"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 8px;
                                      padding-left: 4px;
                                      padding-right: 4px;
                                      padding-top: 8px;
                                    "
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <p
                                              style="
                                                color: #000;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            >
                                              <span
                                                style="
                                                  color: #000;
                                                  font-family: -apple-system,
                                                    system-ui, BlinkMacSystemFont,
                                                    'Segoe UI', 'Roboto', 'Oxygen',
                                                    'Ubuntu', 'Cantarell',
                                                    'Fira Sans', 'Droid Sans',
                                                    'Helvetica Neue', sans-serif;
                                                  font-size: 14px;
                                                  line-height: 24px;
                                                  word-break: break-all;
                                                "
                                                >Hi ${user.name}</span
                                              >
                                            </p>
                                            <p
                                              style="
                                                color: #000;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            ></p>
                                            <p
                                              style="
                                                color: #000;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            >
                                              Thank you for signing up to the next React Cairo event! </br>
                                              Please click the button below to complete your registration.
                                            </p>
                                            <p
                                              style="
                                                color: #f00;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            >
                                              Make sure to show the ticket code at the entrance.
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              id="m_-5175727932741590516bfb32045-b4b4-429b-923e-c694ab9dc192"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 8px;
                                      padding-left: 4px;
                                      padding-right: 4px;
                                      padding-top: 8px;
                                    "
                                  >
                                    <table
                                      align="center"
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td align="left">
                                            <table
                                              width="100%"
                                              border="0"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td align="center">
                                                    <table
                                                      border="0"
                                                      cellspacing="0"
                                                      cellpadding="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            id="m_-5175727932741590516cfa16f4e-0d1c-480e-a0ab-446aa6cf9e3e"
                                                          >
                                                            <a
                                                              href="${url}"
                                                              style="
                                                                background-color: #E88A2B;
                                                                border-radius: 5px;
                                                                color: #000;
                                                                display: inline-block;
                                                                font-family: -apple-system,
                                                                  system-ui,
                                                                  BlinkMacSystemFont,
                                                                  'Segoe UI',
                                                                  'Roboto', 'Oxygen',
                                                                  'Ubuntu',
                                                                  'Cantarell',
                                                                  'Fira Sans',
                                                                  'Droid Sans',
                                                                  'Helvetica Neue',
                                                                  sans-serif;
                                                                font-size: 12px;
                                                                font-weight: 500;
                                                                line-height: 50px;
                                                                text-align: center;
                                                                text-decoration: none;
                                                                width: 200px;
                                                              "
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=${url}&amp;source=gmail&amp;ust=1689094373955000&amp;usg=AOvVaw1DBJrmjQRpta6kbIHe83UP"
                                                            >
                                                              Get your ticket
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              id="m_-51757279327415905161124cb37-6584-4367-a035-801c7f37af79"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding-bottom: 8px;
                                      padding-left: 4px;
                                      padding-right: 4px;
                                      padding-top: 8px;
                                    "
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <p
                                              style="
                                                color: #000;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            >
                                              You may also copy and paste the URL
                                              below:
                                            </p>
                                            <p
                                              style="
                                                color: #000;
                                                font-family: -apple-system,
                                                  system-ui, BlinkMacSystemFont,
                                                  'Segoe UI', 'Roboto', 'Oxygen',
                                                  'Ubuntu', 'Cantarell', 'Fira Sans',
                                                  'Droid Sans', 'Helvetica Neue',
                                                  sans-serif;
                                                font-size: 14px;
                                                line-height: 24px;
                                              "
                                            >
                                              <a
                                                href=${url}
                                                style="
                                                  color: #067df7;
                                                  text-decoration: none;
                                                "
                                                target="_blank"
                                                data-saferedirecturl="https://www.google.com/url?q=${url}&amp;source=gmail&amp;ust=1689094373955000&amp;usg=AOvVaw3R7kNaZsAnbWinh-Ftp2JC"
                                                ><code
                                                  style="
                                                    color: rgb(189, 16, 224);
                                                    font-family: Menlo, Monaco,
                                                      'Lucida Console',
                                                      'Liberation Mono',
                                                      'DejaVu Sans Mono',
                                                      'Bitstream Vera Sans Mono',
                                                      'Courier New', monospace,
                                                      serif;
                                                    font-size: 0.9em;
                                                    text-decoration: none;
                                                  "
                                                  >${url}</code
                                                ></a
                                              ><br />
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <hr
                              style="
                                border: none;
                                border-top: 1px solid #eaeaea;
                                margin: 26px 0;
                                width: 100%;
                              "
                            />
                            <p
                              style="
                                color: #666666;
                                font-family: -apple-system, system-ui,
                                  BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                                  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                                  'Helvetica Neue', sans-serif;
                                font-size: 12px;
                                line-height: 24px;
                              "
                            >
                              React Cairo -
                              <a
                                href="https://www.react-cairo.com"
                                style="color: #E88A2B; text-decoration: none"
                                target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.react-cairo.com&amp;source=gmail&amp;ust=1689094373955000&amp;usg=AOvVaw1bNVE1klP73iPd5tlnxmde"
                                >React Cairo</a
                              >
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <img
            src="https://ci6.googleusercontent.com/proxy/KyaknIR5BPRzs73TomzpufBTMYorvtziyLp6XmwfDMou0T849gdjWfgv-K8F9E6nrMoQlG49Qb1yJwPgepM7uHG296f5pEgJQnJmZokZKXQi-JSX4vzxeGJjSqcF4yGqfYa3SLEl3rGsjR8RRzcRX0FBZlX_mMYaJvgyZd8MOArOp7k-HgZzfR2mdWPkuW9ZOaM0j9AuOhF-QuLhUnlIV92FV-ScpzTsWIniPLlkAY-wiRZK3RB7uInKlZa4E4tzeY8Uc0cYgsguC-9yazmTAOs=s0-d-e1-ft#https://c.knock.app/t/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg5NzQ4NDM1NzE3NDgsIm1pZCI6IjJTTjZsY0I2QUxvRzhWb2U5MVRUaWx3WTdYeSJ9.JkzDASrjNAURDxaF1fEaezoLeG54wtmSsClwbNQmxIo/k.png"
            width="1px"
            height="1px"
            class="CToWUd"
            data-bit="iit"
            jslog="138226; u014N:xr6bB; 53:WzAsMl0."
          />
        </div>
      </div>
      <div id=":c8" class="ii gt" style="display: none">
        <div id=":c9" class="a3s aiL"></div>
      </div>
    </div>
    `,
  });
};
