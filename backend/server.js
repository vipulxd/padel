const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());

app.get("/", (r, s) => {
  s.send("RestAPI server for padel");
});
// server config
app.listen(port, () => {
  `Server is live on port ${port}`;
});
