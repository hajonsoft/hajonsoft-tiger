const puppeteer = require("puppeteer");
const fs = require("fs");
const util = require("./util");
const moment = require("moment");
const sharp = require("sharp");

let page;
let data;
let counter = 0;
let groupNumber;
const config = [
  {
    name: "login",
    url: "https://eumra.com/login.aspx",
    details: [
      { selector: "#LoginName", value: (system) => system.username },
      { selector: "#password", value: (system) => system.password },
    ],
  },
  {
    name: "main",
    url: "https://eumra.com/homepage.aspx?P=DashboardClassic",
  },
  {
    name: "create-group",
    url:
      "https://eumra.com/homepage.aspx?P=auploader",
    details: [
      {
        selector: "#txt_GroupName",
        value: (row) =>
          (row.name.full + row.passportNumber).replace(/ /g, "") +
          parseInt(moment().format("DDMMYYYYHHmmss")).toString(32),
      },
    ],
  },
  {
    name: "create-mutamer",
    url: "https://www.waytoumrah.com/prj_umrah/eng/eng_mutamerentry.aspx",
    controller: {
      selector:
        "#Table2 > tbody > tr > td > div > div > div > div.widget-title",
      action: async () => {
        const selectedTraveller = await page.$eval(
          "#hajonsoft_select",
          (el) => el.value
        );
        if (selectedTraveller) {
          fs.writeFileSync("./selectedTraveller.txt", selectedTraveller);
          await page.goto(await page.url());
        }
      },
    },
    details: [
      { selector: "#ddlgroupname", value: (row) => groupNumber },
      { selector: "#ddltitle", value: (row) => "99" },
      { selector: "#ddlpptype", value: (row) => "1" },
      { selector: "#ddlbirthcountry", value: (row) => row.nationality.telCode },
      { selector: "#ddladdcountry", value: (row) => row.nationality.telCode },
      { selector: "#ddlhealth", value: (row) => "0" },
      {
        selector: "#txtprofession",
        value: (row) => decodeURI(row.profession || "unknown"),
      },
      { selector: "#ddlmstatus", value: (row) => "99" },
      { selector: "#ddleducation", value: (row) => "99" },
      {
        selector: "#txtbirthcity",
        value: (row) => decodeURI(row.birthPlace),
      },
      {
        selector: "#txtAfirstname",
        value: (row) => row.nameArabic.first,
      },
      {
        selector: "#txtAfamilyname",
        value: (row) => row.nameArabic.last,
      },
      {
        selector: "#txtAgfathername",
        value: (row) => row.nameArabic.grand,
      },
      {
        selector: "#txtAfathername",
        value: (row) => row.nameArabic.father,
      },
      {
        selector: "#txtppissdd",
        value: (row) => row.passIssueDt.dd,
      },
      {
        selector: "#ddlppissmm",
        txt: (row) => row.passIssueDt.mmm,
      },
      {
        selector: "#txtppissyy",
        value: (row) => row.passIssueDt.yyyy,
      },
      {
        selector: "#txtppisscity",
        value: (row) => decodeURI(row.placeOfIssue),
      },
      {
        selector: "#txtcity",
        value: (row) => "",
      },
      {
        selector: "#txtstreet",
        value: (row) => "",
      },
      {
        selector: "#txtstate",
        value: (row) => "",
      },
      {
        selector: "#txtzipcode",
        value: (row) => "",
      },
    ],
  },
];

async function send(sendData) {
  data = sendData;
  page = await util.initPage(onContentLoaded);
  await page.goto(config[0].url, { waitUntil: "domcontentloaded" });
}

async function onContentLoaded(res) {
  counter = util.counter(counter);
  if (counter >= data.travellers.length) {
    return;
  }
  const currentConfig = util.findConfig(await page.url(), config);
  try {
    await pageContentHandler(currentConfig);
  } catch (err) {
    console.log(err);
  }
}

async function pageContentHandler(currentConfig) {
  switch (currentConfig.name) {
    case "login":
      await util.commit(page, currentConfig.details, data.system);
      await util.captchaClick("#CodeNumberTextBox", 5, "#btn_Login");
      break;
    case "main":
      await page.goto(
        "https://eumra.com/homepage.aspx?P=auploader"
      );
      break;
    case "create-group":
      await util.commit(page, currentConfig.details, data.travellers[0]);
      // const embassyCount = await page.evaluate(() => {
      //   const consulate = document.querySelector("#cmbEmb");
      //   const consulateOptions = consulate.querySelectorAll("option");
      //   const consulateOptionsCount = [...consulateOptions].length;
      //   if (consulateOptionsCount === 2) {
      //     consulateOptions[1].selected = true;
      //   }

      //   return consulateOptionsCount;
      // });
      // if (embassyCount == 2) {
      //   await page.click("#BtnSave");
      // }
      // const confirmationTextSelector =
      //   "body > div.lobibox.lobibox-success.animated-super-fast.zoomIn > div.lobibox-body > div.lobibox-body-text-wrapper > span";
      // await page.waitForSelector(confirmationTextSelector, {
      //   visible: true,
      //   timeout: 0,
      // });
      // const confirmationText = await page.$eval(
      //   confirmationTextSelector,
      //   (el) => el.innerText
      // );
      // groupNumber = confirmationText.match(/\d+/g)[0];
      // console.log(
      //   "%c 🥒 groupNumber: ",
      //   "font-size:20px;background-color: #FCA650;color:#fff;",
      //   groupNumber
      // );
      // await page.goto(
      //   "https://www.waytoumrah.com/prj_umrah/eng/eng_mutamerentry.aspx"
      // );
      break;
    case "create-mutamer":
      await util.controller(page, currentConfig, data.travellers);
      await page.waitForSelector("#txtppno");
      const passportNumber = await page.$eval("#txtppno", (e) => e.value);
      // Do not continue if the passport number field is not empty - This could be a manual page refresh
      if (passportNumber) {
        return;
      }
      await page.waitForSelector("#ddlgroupname");
      await page.select("#ddlgroupname", groupNumber);
      await page.waitFor(3000);
      await page.waitForSelector("#btnppscan");
      await page.evaluate(() => {
        const divBtn = document.querySelector("#btnppscan");
        if (divBtn) {
          divBtn.click();
        }
      });

      await page.waitForSelector("#divshowmsg");
      await page.type("#divshowmsg", data.travellers[counter].codeline, {
        delay: 0,
      });
      await page.waitFor(2000);
      await util.commit(page, currentConfig.details, data.travellers[counter]);

      await page.click("#btn_uploadImage");
      let photoFile = `./photos/${data.travellers[counter].passportNumber}.jpg`;
      const resizedPhotoFile = `./photos/${data.travellers[counter].passportNumber}_200x200.jpg`;
      await sharp(photoFile)
        .resize(200, 200)
        .toFile(resizedPhotoFile);
      await util.commitFile("#file_photo_upload", resizedPhotoFile);
      await page.waitForNavigation();

      await page.waitForSelector("#imgppcopy");
      const ppSrc = await page.$eval("#imgppcopy", (e) =>
        e.getAttribute("src")
      );
      console.log(
        "%c 🍅 ppSrc: ",
        "font-size:20px;background-color: #465975;color:#fff;",
        ppSrc
      );

      if (!ppSrc) {
        let passportFile =
          __dirname +
          `/../passports/${data.travellers[counter].passportNumber}.jpg`;
        if (fs.existsSync(passportFile)) {
          let resizedPassportFile =
            __dirname +
            `../passports/${data.travellers[counter].passportNumber}_400x300.jpg`;
          await sharp(passportFile)
            .resize(400, 300)
            .toFile(resizedPassportFile);
          await util.commitFile("#fuppcopy", resizedPassportFile);
        } else {
          // let pngFile = __dirname +  `/../passports/${data.travellers[counter].passportNumber}.png`;
          // const pad = " ".repeat(4);
          // const height = "\n".repeat(10);
          // const codeline = `${height}${pad}${data.travellers[
          //   counter
          // ].codeline.substring(0, 44)}${pad}${"\n"}${pad}${data.travellers[
          //   counter
          // ].codeline.substring(44)}${pad}${"\n".repeat(1)}`;
          // fs.writeFileSync(
          //   pngFile,
          //   text2png(codeline, {
          //     font: '30px sans-serif',
          //     color: "black",
          //     bgColor: "white",
          //     lineSpacing: 20,
          //   })
          // );
          // await util.commitFile("#fuppcopy", pngFile);
        }
      }
      await page.waitForSelector("#txtImagetext");
      await page.focus("#txtImagetext");
      await page.waitForFunction(
        "document.querySelector('#txtImagetext').value.length === 5"
      );
      await page.click("#btnsave");
      counter = counter + 1;
      break;
    default:
      break;
  }
}

module.exports = { send };
