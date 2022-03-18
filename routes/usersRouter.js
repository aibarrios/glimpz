const express = require('express');
const usersController = require('./../controllers/usersController');
const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  usersController;

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
