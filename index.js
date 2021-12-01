const express = require('express');
const app = express();

const mainRouter = require('./routes/main')

app.use(mainRouter)

app.listen(4000, () => console.log("Server is running on port 4000"))