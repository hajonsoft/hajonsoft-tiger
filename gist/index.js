const { send: sendBau } = require("./bau");
const path = require("path");
const fs = require("fs");

let dataFileName = path.join(__dirname, "data.json");
if (!fs.existsSync(dataFileName)) {
  console.log(`Data file does not exist in ${dataFileName}`);
  dataFileName = path.join("c:\\snapshot", __dirname, "data.json");
}
if (!fs.existsSync(dataFileName)) {
  console.log(`Data file does not exist in ${dataFileName}`);
  process.exit(1);
}
const content = fs.readFileSync(dataFileName, "utf8");
const data = JSON.parse(content);

switch (data.system.name) {
  case "bau":
    return sendBau(data);
  case "wtu":
    return sendBau(data);
  case "gma":
    return sendBau(data);
  case "twf":
    return sendBau(data);
  case "mot":
    return sendBau(data);
  case "vst":
    return sendBau(data);
  default:
    console.log("unknown system");
}
