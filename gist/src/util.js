const fs = require("fs");
const puppeteer = require("puppeteer");
const _ = require("lodash");

let page;
const debug = false;
async function initPage(onContentLoaded) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--incognito"],
  });
  page = await browser.newPage();
  await page.bringToFront();
  page.on("domcontentloaded", onContentLoaded);
  if (debug) {
    page.on("console", (msg) => console.log(msg.text()));
  }
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36."
  );

  return page;
}

async function storeControls(url) {
  const folder = __dirname + "/../log/";
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  const fileName = folder + _.last(url.split("/"));
  const inputs = await page.$$eval("input", (inputs) =>
    inputs.filter((i) => i.type !== "hidden").map((i) => i.outerHTML)
  );
  const selects = await page.$$eval("select", (selects) =>
    selects.map((s) => s.outerHTML.replace(/\t/g, ""))
  );
  const frames = await page.$$eval("iframe", (frames) =>
    frames.map((f) => f.outerHTML)
  );
  if (inputs && inputs.length > 0) {
    const inputsString = `<html>${url}\n\n\n${inputs
      .toString()
      .replace(/,/g, "\n")}</html>`;
    fs.writeFileSync(fileName + "_inputs.html", inputsString);
  }
  if (selects && selects.length > 0) {
    const selectsString = `<html>${url}\n\n\n${selects
      .toString()
      .replace(/,/g, "\n")}</html>`;
    fs.writeFileSync(fileName + "_selects.html", selectsString);
  }

  if (frames && frames.length > 0) {
    const framesString = `<html>${url}\n\n\n${frames
      .toString()
      .replace(/,/g, "\n")}</html>`;
    fs.writeFileSync(fileName + "_frames.html", framesString);
  }
}
function findConfig(url, config) {
  let lowerUrl = url.toLowerCase();
  if (debug) {
    storeControls(lowerUrl);
  }

  const urlConfig = config.find(
    (x) =>
    (x.url && x.url.toLowerCase() === lowerUrl )||
      (x.regex && RegExp(x.regex.toLowerCase()).test(lowerUrl))
  );
  if (urlConfig) {
    console.log("Workflow: ", urlConfig.name);
    return urlConfig;
  }
  return {};
}

async function commit(page, structure, info) {
  for (const element of structure) {
    await page.waitForSelector(element.selector);
    let value;
    let txt;
    if (element.value) {
      value = element.value(info); // call value function and pass current row info
    }
    if (element.txt) {
      txt = element.txt(info); // call txt function and pass current row info
    }
    const elementType = await page.$eval(element.selector, (e) =>
      e.outerHTML
        .match(/<(.*?) /g)[0]
        .replace(/</g, "")
        .replace(/ /g, "")
        .toLowerCase()
    );
    switch (elementType) {
      case "input":
        await page.type(element.selector, value);
        break;
      case "select":
        if (value) {
          await page.select(element.selector, value);
          break;
        }
        if (txt) {
          const options = await page.$eval(
            element.selector,
            (e) => e.innerHTML
          );
          const pattern = new RegExp(`value="(\\d+)">${txt}`, "im");
          const match = pattern.exec(options.replace(/\n/gim, ""));
          if (match && match.length >= 2) {
            await page.select(element.selector, match[1]);
          }
          break;
        }
        break;
      default:
        break;
    }
    if (element.break) {
      throw new Error('break-here')
    }
  }
}

async function controller(page, structure, travellers) {
  const options =
    "<option>Select person and click send</option>" +
    travellers
      .map(
        (t, i) =>
          `<option value="${i}">${i} - ${t.name.full} - ${t.gender} - ${t.dob.age} years old</option>`
      )
      .join(" ");
  if (
    !structure.controller ||
    !structure.controller.selector ||
    !structure.controller.action
  ) {
    return;
  }
  try {
    await page.evaluate(
      (p) => {
        const controller = p[0].controller;
        const container = document.querySelector(controller.selector);
        container.outerHTML = `
  <div style='background-color: #CCCCCC; border: 2px solid black; border-radius: 16px; padding: 0.5rem; display: flex; align-items: center; width: 50%; justify-content: space-between'>  
  <img style='width: 32px; height: 32px; border-radius: 8px; margin-right: 0.5rem'  src='data:image/jpeg;base64,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'> </img> 
  <h6 style='margin-right: 0.5rem'> HAJonSoft </h6> 
  <select id="hajonsoft_select" style='flex-grow: 1; margin-right: 0.5rem ; height: 90%' > 
  ${p[1]}
  </select>  
  <button style='background-color: #666666; color: #ffffff; width: 5rem' type="button" onclick="handleSendClick();return false">Send</button> 
  </div>`;
      },
      [structure, options]
    );

    await page.exposeFunction("handleSendClick", structure.controller.action);
  } catch (err) {
    // if (debug) {
    //   console.log(
    //     "%c 🍡 err: ",
    //     "font-size:20px;background-color: #FCA650;color:#fff;",
    //     err
    //   );
    // }
  }
}

function counter(currentCounter) {
  let output = currentCounter;
  const fileName = "./selectedTraveller.txt";
  if (fs.existsSync(fileName)) {
    const selectedTraveller = fs.readFileSync(
      "./selectedTraveller.txt",
      "utf8"
    );
    output = parseInt(selectedTraveller);
    fs.unlinkSync(fileName);
  }
  return output;
}

async function commitFile(selector, fileName) {
  await page.waitForSelector(selector);
  let [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.evaluate((p) => document.querySelector(p[0]).click(),[selector]),
  ]);

  await fileChooser.accept([fileName]);
}
async function captchaClick(selector, numbers, actionSelector) {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.waitForFunction((args)=> 
  {
      document.querySelector(args[0]).value.length === args[1]
    }, 
    {timeout: 0}, 
    [selector, numbers]
  );
  await page.click(actionSelector);
}

module.exports = {
  findConfig,
  commit,
  controller,
  initPage,
  counter,
  commitFile,
  captchaClick
};
