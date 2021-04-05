const { User } = require('../models');
const createError = require('http-errors');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    
    if(!createdUser) {
      const err = createError(400, 'Error, while creating user');
      return next(err);
    }

    res.status(201).send({
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { limit, offset } = req;

    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      limit,
      offset,
    });

    if(!users.length) {
      const err = createError(404, 'Users not found');
      return next(err);
    }

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if(!user) {
      const err = createError(404, 'User not found');
      return next(err);
    }

    res.status(200).send({ data: user });
  } catch (err) {
    next(err);
  }
};

// module.exports.updateUser = async (req, res, next) => {
//   try {
//     const {
//       params: { id },
//       body,
//     } = req;

//     const [rowsCount, [updatedUser]] = await User.update(body, {
//       where: { id },
//       returning: true,
//     });

//     // delete updatedUser.password;
//     updatedUser.password = undefined;

//     res.send({ data: updatedUser });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const updateduserInstance = await userInstance.update(body, {
      returning: true,
    });

    if(!updateduserInstance) {
      const err = createError(404, 'User not found');
      return next(err);
    }

    updateduserInstance.password = undefined;

    res.send({ data: updateduserInstance });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByPk(id);

    if(!user) {
      const err = createError(404, 'User not found');
      return next(err);
    }

    const result = await user.destroy();

    if(!result) {
      const err = createError(500, 'Cant delete user');
      return next(err);
    }
    console.log(result);
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
