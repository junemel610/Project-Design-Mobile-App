const express  = require('express');
const router = express.Router();

// For Users 
const { createUser, userSignIn, getUserData, updateUserProfile } = require('../controllers/userController');
const { sendVerificationCode, verifyCode, resetPassword } = require('../controllers/forgotPasswordController');
const { validateUserSignUp, userValidation, validateUserSignIn, validatePassReset } = require('../middleware/validation/user');

// For Woods
const { createWoodprof, getWoodData} = require('../controllers/woodController')


const { isAuth } = require('../middleware/validation/auth');

// For Users 
router.post('/create-user', validateUserSignUp, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.get('/user-data', isAuth, getUserData); 
router.post('/create-post', isAuth, (req, res) => {
    res.send('Token Authentication path');
});
router.patch('/update-user', isAuth, updateUserProfile);
router.post('/send-code', sendVerificationCode);
router.post('/verify-code', verifyCode);
router.patch('/reset-password', resetPassword);


// For Woods
router.post('/create-wood', createWoodprof);
router.get('/wood-data', isAuth, getWoodData); 

module.exports = router;
