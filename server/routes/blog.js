const express = require('express');
const router = express.Router();

const blogCtrl = require('../controllers/blog');
const authService = require('../services/auth');

router.get('/list', authService.checkJWT, authService.checkRole('admin'), blogCtrl.getUserBlogs);

router.post('', authService.checkJWT, authService.checkRole('admin'), blogCtrl.createBlog);

router.get('/:id', blogCtrl.getBlogById);

router.patch('/:id', authService.checkJWT, authService.checkRole('admin'), blogCtrl.updateBlog);

router.get('/s/:slug', blogCtrl.getBlogBySlug);
module.exports = router;
