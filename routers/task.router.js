const taskRouter = require('express').Router();
const TaskController = require('../controller/task.controller');

// путь localhost:3000/users/1/tasks

//создай таску юзеру
taskRouter.post('/', TaskController.createTask);
// все таски юзера
taskRouter.get('/', TaskController.getUserTasks);
// определенная таска юзера
taskRouter.get('/:id', TaskController.getUserTask);
// обнови таску юзеру
taskRouter.patch('/:id', TaskController.updateUserTask);
//удали таску юзеру
taskRouter.delete('/:id', TaskController.deleteUserTask);

module.exports = taskRouter;
