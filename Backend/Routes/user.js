const router = require('express').Router();
const userController = new (require('../Controllers/user.controller'));

// User signup
router.route('/user/sign_up').post(userController.signUp)

// User signin
router.route('/user/sign_in').post(userController.signIn)

// Get user details
router.route('/user/details').get(userController.getUserDetails);

// Change user password
router.route('/user/change_password').post(userController.changePassword);

// User signout
router.route('/user/sign_out').get(userController.signOut);

module.exports = router;