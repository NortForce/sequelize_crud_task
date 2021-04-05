const { Task } = require('../models');
const createError = require('http-errors');


module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    // const task = await Task.create({ ...body, userId: id });
    const task = await userInstance.createTask(body);

    if(!task) {
      const err = createError(400, 'Cant create task');
      return next(err);
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, limit, offset } = req;

    const tasks = await userInstance.getTasks({limit, offset});

    if(!tasks) {
      const err = createError(404, 'Tasks not found');
      return next(err);
    }

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
    if(!task) {
      const err = createError(404, 'Task not found');
      return next(err);
    }

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

    if(!tasks.length) {
      const err = createError(404, 'Task not found');
      return next(err);
    }

    const updatedTask = await task.update(body, {
      returning: true,
    });

    if(!updatedTask) {
      const err = createError(500, 'Coudnt update task');
      return next(err);
    }

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

    if(!task) {
      const err = createError(404, 'Task not found');
      return next(err);
    }

    if(!task.destroy()) {
      const err = createError(500, 'Coudnt delete task');
      return next(err);
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};
