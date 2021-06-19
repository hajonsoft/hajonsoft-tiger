const { send: sendBau } = require("./src/bau");
const { send: sendWtu } = require("./src/wtu");
const { send: sendGma } = require("./src/gma");
const { send: sendVst } = require("./src/vst");

const path = require("path");
const fs = require("fs");
var unzipper = require("unzipper");
const downloadsFolder = require("downloads-folder");

if (process.argv.length > 2) {
  const urlParts = process.argv[2].split("/");
  if (urlParts) {
    let fileName = urlParts.find((x) => x.toLowerCase().endsWith(".zip"));
    fileName = path.join(downloadsFolder(), fileName);
    console.log('%c 🌭 fileName: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', fileName);
    fs.createReadStream(fileName).pipe(unzipper.Extract({ path: __dirname }));
  }
} else {
  console.log("no file name found in URL Handler");
}

let dataFileName = path.join(__dirname, "data.json");
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
    return sendWtu(data);
  case "gma":
    return sendGma(data);
  case "twf":
    return sendBau(data);
  case "mot":
    return sendBau(data);
  case "vst":
    return sendVst(data);
  default:
    console.log("unknown system");
}
