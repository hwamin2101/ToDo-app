const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');


exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    success: true,
    data: users,
  });
});


exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});


exports.test = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test API works!',
  });
});