const express = require('express');

const router = require('./routers');

const app = express();

app.use(express.json());

app.use(router.barberServicesRouter);

module.exports = app;