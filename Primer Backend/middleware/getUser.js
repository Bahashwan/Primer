

const { User } = require('../db/models');

const getUser = async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findByPk(req.session.user);
    res.locals.user = { name: user.name, id: user.id };
  }
  next();
};

module.exports = {
  getUser,
};
