const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());

// server config
app.listen(port, () => {
  `Server is live on port ${port}`;
});
