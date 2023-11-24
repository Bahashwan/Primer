const express = require('express');

const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {
  Post, User,
} = require('../../db/models');

const PostCard = require('../../Components/PostCard');

router.post('/', async (req, res) => {
  const { name, url, description } = req.body;
  try {
    if (name && url && description) {
      const post = await Post.create({
        name, url, description, userId: req.session.user,
      });
      const postInclude = await Post.findOne({
        where: { id: post.id },
        include: { model: User },
      });
      res.status(201).json({ html: res.renderComponent(PostCard, { post: postInclude }, { htmlOnly: true }) });
    } else {
      res.status(401).json({ message: 'заполните все поля' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:idPost', async (req, res) => {
  try {
    const postDel = await Post.destroy({
      where: { id: req.params.idPost, userId: req.session.user },
    });
    if (postDel) {
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(400).json({ message: 'сервер временно не работает', status: 400 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
