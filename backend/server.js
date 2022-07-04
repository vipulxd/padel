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
app.use('/api/location',require('./route/locations') )
// server config
app.listen(port, () => {
  `Server is live on port ${port}`;
});