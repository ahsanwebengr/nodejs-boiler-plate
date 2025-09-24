export const generateOtpEmail = (otp) => `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">

      <!-- Header -->
      <div style="background-color: #FF0000; padding: 30px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 26px; font-weight: bold;">🔐 Email Verification</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333333; line-height: 1.6; font-size: 16px;">
        <p>Hi </p>
        <p>We noticed a login attempt to your <strong>YouTube Finder</strong> account. Use the OTP below to verify your email and complete your login:</p>
        
        <!-- OTP Code -->
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #ffe6e6; color: #FF0000; font-size: 32px; font-weight: bold; padding: 18px 36px; border-radius: 10px; letter-spacing: 6px;">
          ${otp}</span>
        </div>

        <p style="font-size: 14px; color: #555555;">
          This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
        </p>

        <p style="font-size: 14px; color: #555555;">
          If you did not attempt this login, we recommend changing your password immediately.
        </p>

        <!-- Optional CTA Button -->
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://yourwebsite.com/login" style="display: inline-block; background-color: #FF0000; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-size: 16px;">Go to Login</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f6f8; padding: 20px; text-align: center; font-size: 12px; color: #888888;">
        Sent by YouTube Finder • &copy; ${new Date().getFullYear()} All Rights Reserved
      </div>
    </div>
  </div>
`;
