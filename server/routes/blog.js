const express = require('express');
const router = express.Router();

const blogCtrl = require('../controllers/blog');
const authService = require('../services/auth');

router.get('/me', authService.checkJWT, authService.checkRole('admin'), blogCtrl.getUserBlogs);

router.post('', authService.checkJWT, authService.checkRole('admin'), blogCtrl.createBlog);

module.exports = router;