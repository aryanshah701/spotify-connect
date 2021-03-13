const db = require('../models');
const User = db.User;

// List all the users
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a single user
exports.createUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single user by id
exports.getUser = (_req, res) => {
  res.status(200).json(res.user);
};

// Updates a single user given the id
exports.updateUser = async (req, res) => {
  // Update the name
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  // Save the updates
  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a single user givent the id
exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Middleware

// Middleware that gets a single user and adds the user to the response
exports.getSingleUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);

    // User not found
    if (user == null) {
      return res.status(404).json({ message: 'The given user does not exist' });
    }
  } catch (err) {
    // Server error
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
};

module.exports = exports;
