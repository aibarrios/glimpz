const express = require('express');
const {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  updateUser,
  deleteUser,
  getMe,
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

const router = express.Router();

//router.route(<basePath>) returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware.
router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').patch(resetPassword);

router.use(protect);

router.route('/updatePassword').patch(updatePassword);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/me').get(getMe, getUser);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
