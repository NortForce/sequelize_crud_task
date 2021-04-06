const _ = require('lodash');
const createError = require('http-errors');
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

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      body: { userId },
      params: { groupId },
    } = req;

    const user = await User.findByPk(userId);

    if (!user) {
      return next(createError(404, 'User not Found'));
    }

    const group = await Group.findByPk(groupId);

    if (!group) {
      return next(createError(404, 'Group not found'));
    }

    await group.addUser(user);

    const groupWithUsers = await Group.findByPk(groupId, {
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

    // const groupWithUsers = await group.getUsers({
      
    //   include: [
    //     {
    //       model: User,
    //       attributes: {
    //         exclude: ['password'],
    //       },
    //       through: {
    //         attributes: [],
    //       },
    //     },
    //   ],
    // });

    res.send({ data: groupWithUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserFromGroup = async (req, res, next) => {
  try {
    const {params: {groupId, userId}} = req;

    const user = await User.findByPk(userId);

    if(!user) {
      return (createError(404, "User not found"));
    }

    const group = await Group.findByPk(groupId);

    if(!group) {
      return (createError(404, "Group not found"));
    }

    // const isUserInGroup = group.hasUser(user);

    // if(!isUserInGroup) {
    //   return (next(404, "No such user in group"));
    // }

    await group.removeUser(userId);

    const newGroup = await Group.findByPk(groupId, {
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


    res.send(newGroup);

  } catch (err) {
    next(err);
  }
}
