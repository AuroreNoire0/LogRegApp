const protect = require('../middlewares/authMiddleware.js');
const express = require('express');
const {
  registerUser,
  authUser,
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  lastLoginUpdate,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/lastLogin/:id').post(lastLoginUpdate);
router.route('/').get(protect, getUsers);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id').post(blockUser);
router.route('/unblock/:id').post(unblockUser);

module.exports = router;
