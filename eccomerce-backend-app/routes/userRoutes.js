const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, updateUserById, blockUser, unBlockUser, handleRefreshToken } = require('../controllers/UserController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

router.get('/all-users', isAuthenticated, getAllUsers);
router.get('/findUserById/:id', isAuthenticated, isAdmin, getUserById);
router.delete('/deleteUserById/:id', isAuthenticated, deleteUserById);
router.put('/updateUserById/:id', isAuthenticated, updateUserById);
router.put('/block-user/:id', isAuthenticated, isAdmin, blockUser);
router.put('/unblock-user/:id', isAuthenticated, isAdmin, unBlockUser);
router.get('/refresh', handleRefreshToken);

module.exports = router;