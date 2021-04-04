const taskRouter = require('express').Router();
const TaskController = require('../controller/task.controller');
const { setPagintion } = require('../middlewares/pagination.mw');

// путь localhost:3000/users/1/tasks

//создай таску юзеру
taskRouter.post('/', TaskController.createTask);
// все таски юзера
taskRouter.get('/',setPagintion, TaskController.getUserTasks);
// определенная таска юзера
taskRouter.get('/:id', TaskController.getUserTask);
// обнови таску юзеру
taskRouter.patch('/:id', TaskController.updateUserTask);
//удали таску юзеру
taskRouter.delete('/:id', TaskController.deleteUserTask);

module.exports = taskRouter;
