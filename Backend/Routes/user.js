const { body } = require('express-validator');
const { MESSAGES } = require('../status_messages');

const router = require('express').Router();
const userController = new (require('../Controllers/user.controller'));
const validate = (require('../Middleware/validator')).validate;

// User signup
router.route('/user/sign_up').post(validate([
    body('first_name').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.FIRST_NAME),
    body('last_name').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.LAST_NAME),
    body('username').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.USER_NAME),
    body('email').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.EMAIL_VALIDATE),
    body('email').isEmail().withMessage(MESSAGES.VALIDATION_MESSAGES.INVALID_EMAIL),
    body('password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.PASSWORD),
    body('password').isLength({ min: 8 }).withMessage(MESSAGES.VALIDATION_MESSAGES.PASSWORD_LENGTH),
    body('confirm_password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.CONFIRM_PASSWORD),
]), userController.signUp);

// User signin
router.route('/user/sign_in').post(validate([
    body('email').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.EMAIL_VALIDATE),
    body('email').isEmail().withMessage(MESSAGES.VALIDATION_MESSAGES.INVALID_EMAIL),
    body('password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.PASSWORD),
]), userController.signIn);

// Get user details
router.route('/user/details').get(userController.getUserDetails);

// Change user password
router.route('/user/change_password').post(validate([
    body('current_password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.CURRENT_PASS),
    body('new_password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.NEW_PASSWORD),
    body('new_password').isLength({ min: 8 }).withMessage(MESSAGES.VALIDATION_MESSAGES.NEW_PASSWORD_LENGTH),
    body('confirm_password').notEmpty().withMessage(MESSAGES.VALIDATION_MESSAGES.CONFIRM_PASSWORD),
]), userController.changePassword);

// User signout
router.route('/user/sign_out').get(userController.signOut);

module.exports = router;