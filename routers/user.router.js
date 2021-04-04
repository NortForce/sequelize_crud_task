const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const {setPagintion} = require('../middlewares/pagination.mw');
const taskRouter = require('./task.router');

userRouter.get('/',setPagintion, UserController.getAllUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.createUser);
//userRouter.patch('/:id', UserController.updateUser);
userRouter.patch('/:id', checkUser, UserController.updateUserInstance);
userRouter.delete('/:id', UserController.deleteUser);

userRouter.use('/:id/tasks', checkUser, taskRouter);

module.exports = userRouter;