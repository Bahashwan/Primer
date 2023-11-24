const express = require('express');

const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {
  Post, User, Comment, Like,
} = require('../../db/models');
const PostsList = require('../../Components/PostsList');
const PostInfo = require('../../Components/PostInfo');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
      },
      { model: Like },
      ],
    });
    res.status(200).renderComponent(PostsList, { title: 'PostList', posts });
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/:idPost', async (req, res) => {
  const { idPost } = req.params;
  try {
    const post = await Post.findOne({
      where: { id: idPost },
      include: [{
        model: User,
      },
      { model: Comment },
      ],
    });

    res.status(200).renderComponent(PostInfo, { title: 'PostInfo', post });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
