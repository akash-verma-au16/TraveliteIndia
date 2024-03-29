const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Tour = require('../models/Tour');

// GET /users/:id
exports.getUser = asyncHandler(async (req, res, next) => {
  let data = {};

  if (req.cookies.error) {
    data.error = req.cookies.error;
  } else {
    data.error = 'empty';
  }

  if (req.user) {
    data.username = req.user.name;
    data.useremail = req.user.email;
    data.id = req.user._id;
    data.userrole = req.user.role;
    data.myTours = req.user.myTours;
  }

  res.render('profile', data);
  res.cookie('error', 'empty');
});

// PUT /users/:id/deleteTour
exports.deleteTour = asyncHandler(async (req, res, next) => {
  let user;

  if (req.user) {
    user = await User.findById(req.user._id);
    user.myTours = user.myTours.filter((tour) => tour._id.toString() !== req.params.id);
    await user.save();
  }
  res.send();
});

// DELETE /users/:id
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
