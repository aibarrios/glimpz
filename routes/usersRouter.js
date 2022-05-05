const express = require('express');

//import our app logic for this route
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./../controllers/usersController');

const { signUp, login } = require('./../controllers/authController');

//creates a mini-app capable only of performing middleware and routing functions
const router = express.Router();

//router.route(<basePath>) returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware.
router.route('/signup').post(signUp);
router.route('/login').post(login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
