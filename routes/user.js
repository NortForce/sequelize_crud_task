const { Router } = require('express');
const UserController = require('../controller/user.controller');
const paginate = require('../middlewares/paginate.mw');

const userRouter = Router();

userRouter.get('/', paginate, UserController.getAllUsers);
userRouter.post('/', UserController.createUser);

userRouter.get('/:id', UserController.getUser);
userRouter.patch('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
