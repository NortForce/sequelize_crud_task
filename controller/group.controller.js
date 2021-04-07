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
/* 
  Добавление пользователя в группу.

  1) Принимать id юзера и группы. id user -> req.body
  2) Найти юзера
  3) Найти группу
  4) ???
  5) Добавить юзера в группу 
  6) Вернуть эту группу со всеми её юзерами

*/
module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
      body: { userId },
    } = req;

    const user = await User.findByPk(userId);
    const group = await Group.findByPk(groupId);

    await group.addUser(user);

    const groupWithUsers = await Group.findAll({
      where: { id: groupId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send(groupWithUsers);
  } catch (err) {
    next(err);
  }
};
/* 
  req.file = {
    "fieldname": "image",
    "originalname": "logo.png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "destination": "/home/user/VSProjects/fe_sequelize/public/images",
    "filename": "a0f5209c6d7915ba0796d1b85a2aecc3",
    "path": "/home/user/VSProjects/fe_sequelize/public/images/a0f5209c6d7915ba0796d1b85a2aecc3",
    "size": 146878
} */
module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupId },
    } = req;

    const [count, [updatedGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: { id: groupId },
        returning: true,
      }
    );

    res.send(updatedGroup);
  } catch (err) {
    next(err);
  }
};
