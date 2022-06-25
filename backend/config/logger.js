const fs = require("fs");

const logger = new console.Console(
  fs.createWriteStream(__dirname + "./../logs/logs.txt")
);

module.exports = logger;
