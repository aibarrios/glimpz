const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not yet implemented',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not yet implemented',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not yet implemented',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'Not yet implemented',
  });
};
