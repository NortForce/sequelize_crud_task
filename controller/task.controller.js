const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    // const task = await Task.create({ ...body, userId: id });
    const task = await userInstance.createTask(body);

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, limit, offset } = req;

    const tasks = await userInstance.getTasks({limit, offset});

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { id },
    } = req;

    const task = await userInstance.getTasks({ where: { id } });

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { id },
      body,
    } = req;

    const task = await Task.findOne({ where: { id, userId: userInstance.id } });

    const updatedTask = await task.update(body, {
      returning: true,
    });

    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { id },
    } = req;

    const task = await Task.findOne({ where: { id, userId: userInstance.id } });

    task.destroy();
    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};
