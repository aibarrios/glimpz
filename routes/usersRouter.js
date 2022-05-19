const express = require('express');

//import our app logic for this route
const {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  updateUser,
  deleteUser,
} = require('./../controllers/usersController');

const {
  signUp,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('./../controllers/authController');

//creates a mini-app capable only of performing middleware and routing functions
const router = express.Router();

//router.route(<basePath>) returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware.
router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').patch(resetPassword);
router.route('/updatePassword').patch(protect, updatePassword);

router.route('/updateMe').patch(protect, updateMe);
router.route('/deleteMe').delete(protect, deleteMe);
router.route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
