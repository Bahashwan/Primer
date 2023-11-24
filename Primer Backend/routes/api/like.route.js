const express = require('express');

const router = express.Router();
const { Like } = require('../../db/models');

router.post('/:postId', async (req, res) => {
  try {
    const like = await Like.findOne({
      where: { postIdLike: Number(req.params.postId), userIdLike: 2 },
    });
    if (like) {
      await Like.destroy({
        where: { postIdLike: Number(req.params.postId), userIdLike: 2 },
      });
    } else {
      await Like.create({
        postIdLike: Number(req.params.postId), userIdLike: 2,
      });
      res.cookie('like', req.params.postId);
    }
    const likeArr = await Like.findAll({
      raw: true, where: { postIdLike: Number(req.params.postId) },
    });
    res.status(200).json({ quantityLikes: likeArr.length, message: 'ok' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});
module.exports = router;
