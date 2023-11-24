const express = require('express');

const router = express.Router();

const postsApiRouter = require('./api/posts.route');
const postsRouter = require('./views/posts.route');
const mainRouter = require('./views/main.route');
const likesRouter = require('./api/like.route');
const authRouter = require('./views/auth.route');
const authApiRouter = require('./api/auth.route');

router.use('/', mainRouter);
router.use('/api/posts', postsApiRouter);
router.use('/posts', postsRouter);
router.use('/api/likes', likesRouter);
router.use('/api/auth', authApiRouter);
router.use('/auth', authRouter);

module.exports = router;
