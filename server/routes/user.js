const express = require('express');
const router = express.Router();
const helpers = require('../helpers/user_helper.js');

// Middleware
router.use(express.json());
router.use('/:id', helpers.getSingleUser);

// User Routes
router.route('/').get(helpers.getUsers).post(helpers.createUser);

router
  .route('/:id')
  .get(helpers.getUser)
  .patch(helpers.updateUser)
  .delete(helpers.deleteUser);

module.exports = router;
