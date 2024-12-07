const inMemoryStore = {}; // Temporary in-memory store for codes
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Create a Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp@gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
      from: {
        name: 'Nebula Recovery',
        address: 'nebularecovery@gmail.com',
      },
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };
  

  exports.sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Email not found in the database.' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await sendVerificationEmail(email, verificationCode);
        inMemoryStore[email] = verificationCode;
        return res.json({ success: true, message: 'Verification code sent successfully.' });
    } catch (error) {
        console.error('Error sending verification code:', error);
        return res.json({ success: false, message: 'Failed to send verification code.' });
    }
};


exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;

  // Validate inputs
  if (!email || code === undefined) {
    return res.json({ success: false, message: 'Email and code are required.' });
  }

  // Retrieve the stored code from in-memory store
  const storedCode = inMemoryStore[email];

  console.log('Email:', email);
  console.log('Entered Code:', code);
  console.log('Stored Code for', email, ':', storedCode);

  // Check if storedCode exists
  if (storedCode === undefined) {
    return res.json({ success: false, message: 'No verification code found for this email.' });
  }

  // Ensure both codes are numbers for comparison
  if (Number(code) === Number(storedCode)) {
    // Successful verification
    res.json({ success: true });

    // Remove the code from memory after successful verification
    delete inMemoryStore[email];
  } else {
    // Invalid code
    res.json({ success: false, message: 'Invalid verification code.' });
  }
};
  
const validatePassword = (password) => {
    const validationResult = check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is empty.')
      .isLength({ min: 8, max: 255 })  // Minimum length of 8 characters
      .withMessage('Password must be between 8 and 255 characters.')
      .run({ body: { password } });
  
    // Check for minimum length separately
    if (password.length < 8) {
      validationResult.errors.push({
        location: 'body',
        param: 'password',
        value: password,
        msg: 'Password must be at least 8 characters long.',
      });
    }
  
    return validationResult;
  };
  
  exports.resetPassword = [
    async (req, res) => {
      try {
        const { email, password, confirmPassword } = req.body;
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.json({ success: false, message: 'Email not found in the database.' });
        }
  
        validatePassword(password);
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.json({ success: false, message: errors.array()[0].msg });
        }
  
        if (password !== confirmPassword) {
          return res.json({ success: false, message: 'Passwords do not match.' });
        }
  
        user.password = password;
        await user.save();
  
        console.log(`Password reset for ${email}: ${password}`);
        res.json({ success: true, message: 'Password reset successful.' });
      } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
    }
  ];
  