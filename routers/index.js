const { Router } = require('express');
const router = Router();
const userRouter = require('./user.router');


router.use('/users', userRouter);

module.exports = router;
