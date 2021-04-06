const { Router } = require('express');
const TaskController = require('../controller/task.controller');
const paginate = require('../middlewares/paginate.mw');
const { checkUser } = require('../middlewares/user.mw');

const taskRouter = Router();

taskRouter.get('/:id', paginate, checkUser, TaskController.getUserTasks);
taskRouter.post('/:id', checkUser, TaskController.createTask);

taskRouter.patch('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = taskRouter;
