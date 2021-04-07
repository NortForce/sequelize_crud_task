const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const GroupController = require('../controller/group.controller');
const { STATIC_PATH } = require('../config/config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

const groupRouter = Router();

groupRouter.get('/:userId', GroupController.getUserGroups);
groupRouter.post('/', GroupController.createUserGroup);
groupRouter.put('/:groupId', GroupController.addUserToGroup);

groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  GroupController.createImage
);

module.exports = groupRouter;
