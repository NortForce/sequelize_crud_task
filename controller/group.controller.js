const _ = require('lodash');
const { Group, User } = require('../models');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;

    const values = _.pick(body, ['name', 'imagePath', 'description']);

    const group = await Group.create({
      ...values,
      userId: body.userId,
    });

    const user = await User.findByPk(body.userId, {
      attributes: { exclude: ['password'] },
    });

    await group.addUser(user);

    res.send({ data: group });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const userWithGroups = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
          // as: 'group',
        },
      ],
    });

    if (!userWithGroups) {
      return next(createError(404));
    }

    res.send(userWithGroups);
  } catch (err) {
    next(err);
  }
};
