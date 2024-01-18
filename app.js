const express = require("express");
const apiRouter = require('./routers/api');

const {
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler
} = require("./error-handler")


const app = express();
app.use(express.json());

app.use('/api', apiRouter);


app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;