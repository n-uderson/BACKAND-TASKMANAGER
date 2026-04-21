const express = require("express");
const app = express();

const taskRouters = require("./routes/taskRouters");
const cors = require("./config/corsConfig");
const logger = require("./middlewares/logger");

app.use(express.json());
app.use(cors);
app.use(logger);

app.use(taskRouters);

module.exports = app;
