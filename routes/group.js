const { Router } = require('express');
const GroupController = require('../controller/group.controller');
const groupRouter = Router();

groupRouter.get('/:userId', GroupController.getUserGroups);
groupRouter.post('/', GroupController.createUserGroup);
groupRouter.patch('/:groupId', GroupController.addUserToGroup);
groupRouter.delete('/:groupId/user/:userId', GroupController.deleteUserFromGroup);

module.exports = groupRouter;
