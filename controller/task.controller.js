const createError = require('http-errors');
const _ = require('lodash');
const { Task } = require('../models');

const checkBody = body => _.pick(body, ['isDone', 'deadline', 'body']);

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const values = checkBody(body);

    const task = await userInstance.createTask(values);

    if (!task) {
      return next(createError(400));
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance: user, pagination } = req;

    const tasks = await user.getTasks({
      ...pagination,
    });

    if (!tasks.length) {
      return next(createError(404, 'User without tasks'));
    }

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
      body,
    } = req;

    const values = checkBody(body);

    const [count, [updatedTask]] = await Task.update(values, {
      where: { id: taskId },
      returning: true,
    });

    if (!updatedTask) {
      return next(createError(400));
    }

    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const rowsCount = await Task.destroy({ where: { id: taskId } });

    if (rowsCount !== 1) {
      return next(createError(404));
    }
    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
