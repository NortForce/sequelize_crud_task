const { Router } = require('express');
const GroupController = require('../controller/group.controller');
const groupRouter = Router();

groupRouter.get('/:userId', GroupController.getUserGroups);
groupRouter.post('/', GroupController.createUserGroup);

module.exports = groupRouter;
