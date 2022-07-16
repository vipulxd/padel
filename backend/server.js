const express = require("express");
const app = express();
const cors =  require('cors')
require("dotenv").config();

const port = process.env.PORT;
app.use(cors())
app.use(express.json());

app.get("/", (r, s) => {
  s.send("RestAPI server for padel");
});

/**
 * AGENT ROUTES
 */
app.use('/api/agent',require('./route/agent') )
/**
 * ADMIN ROUTES
 */
app.use('/api/admin',require('./route/admin'))
// server config
app.listen(port, () => {
  `Server is live on port ${port}`;
});
