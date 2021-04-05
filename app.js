const express = require('express');
const router = require('./routers/index');

const app = express();

app.use(express.json()); // data stream -> json -> js object -> req.body
/* 
  http://localhost:3000/api/*
 */
app.use('/api', router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send({
    errors: [{ message: err.message || 'Server error'}],
  });
});

module.exports = app;
