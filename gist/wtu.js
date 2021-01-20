const puppeteer = require("puppeteer");
const fs = require("fs");
const util = require("./util");
const moment = require("moment");
const sharp = require("sharp");
let page;
let data;
let counter = 0;
const config = [
  {
    name: "login",
    url: "https://www.waytoumrah.com/prj_umrah/eng/Eng_frmlogin.aspx",
    details: [
      { selector: "#txtUserName", value: (system) => system.username },
      { selector: "#txtPwd", value: (system) => system.password },
    ],
  },
  {
    name: "main",
    url: "https://www.waytoumrah.com/prj_umrah/Eng/Eng_Waytoumrah_EA.aspx",
  },
  {
    name: "create-group",
    url: "http://app2.babalumra.com/Groups/AddNewGroup.aspx?gMode=1",
    details: [
      {
        selector: "#ctl00_ContentHolder_TxtGroupName",
        value: (row) => (row.name.full + row.passportNumber).replace(/ /g, ""),
      },
      {
        selector: "#ctl00_ContentHolder_TxtNotes",
        value: () => new Date().toString(),
      },
      {
        selector: "#ctl00_ContentHolder_TxtExpectedArrivalDate_dateInput",
        value: () =>
          moment()
            .add(7, "days")
            .format("DD/MM/YYYY"),
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
        const selectedTraveller = await page.$eval("#hajonsoft_select", el=> el.value);
        if (selectedTraveller) {
          fs.writeFileSync("./selectedTraveller.txt", selectedTraveller);
          await page.goto(await page.url())
        }
      },
    },
    details: [
      { selector: "#ddlgroupname", value: (row) => "152522" },
      { selector: "#ddltitle", value: (row) => "99" },
      { selector: "#ddlpptype", value: (row) => "1" },
      { selector: "#ddlbirthcountry", value: (row) => row.nationality.telCode },
      { selector: "#ddladdcountry", value: (row) => row.nationality.telCode },
      { selector: "#ddlhealth", value: (row) => "0" },
      {
        selector: "#txtprofession",
        value: (row) => decodeURI(row.profession),
      },
      { selector: "#ddlmstatus", value: (row) => "99" },
      { selector: "#ddleducation", value: (row) => "99" },
      {
        selector: "#txtbirthcity",
        value: (row) => decodeURI(row.birthPlace),
      },
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
        value: (row) => 'city',
      },
            {
        selector: "#txtstreet",
        value: (row) => 'txtstreet',
      },
            {
        selector: "#txtstate",
        value: (row) => 'txtstate',
      },
            {
        selector: "#txtzipcode",
        value: (row) => 'txtzipcode',
      }
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
      await page.waitForSelector("#txtImagetext");
      await page.focus("#txtImagetext");
      await page.waitForFunction(
        "document.querySelector('#txtImagetext').value.length === 6"
      );
      await page.click("#cmdlogin");
      break;
    case "main":
      await page.goto(
        "https://www.waytoumrah.com/prj_umrah/Eng/Eng_MutamerEntry.aspx"
      );
      break;
    case "create-group":
      await util.commit(page, currentConfig.details, data.travellers[0]);
      await page.evaluate(() => {
        const consulate = document.querySelector(
          "#ctl00_ContentHolder_LstConsulate"
        );
        const consulateOptions = consulate.querySelectorAll("option");
        const consulateOptionsCount = [...consulateOptions].length;
        if (consulateOptionsCount === 2) {
          consulateOptions[1].selected = true;
        }
      });
      await page.click("#ctl00_ContentHolder_btnCreate");
      break;
    case "create-mutamer":
      await util.controller(page, currentConfig, data.travellers);
      await page.select('#ddlgroupname', '152522');
      const passportNumber = await page.$eval(
        "#txtppno",
        (e) => e.value
      );
      // Do not continue if the passport number field is not empty - This could be a manual page refresh
      if (passportNumber) {
        return;
      }
      await page.waitFor(3000);
      await page.waitForSelector("#btnppscan");
      await page.evaluate(() => {
        const divBtn = document.querySelector("#btnppscan");
        if (divBtn) {
          divBtn.click();
        }
      });

      await page.waitForSelector("#divshowmsg");
      await page.type(
        "#divshowmsg",
        data.travellers[counter].codeline,
        {
          delay: 0,
        }
      );
      await page.waitFor(2000);
      await util.commit(page, currentConfig.details, data.travellers[counter]);

      // let photoFile = `./photos/${data.travellers[counter].passportNumber}.jpg`;
      // await page.waitForSelector("#file_photo_upload");
      // let futureFileChooser = page.waitForFileChooser();
      // await page.evaluate(() =>
      //   document
      //     .querySelector("#ctl00_ContentHolder_ImageUploaderControl")
      //     .click()
      // );
      // let fileChooser = await futureFileChooser;
      // const resizedPhotoFile = `./photos/${data.travellers[counter].passportNumber}_200x200.jpg`;
      // await sharp(photoFile)
      //   .resize(200, 200)
      //   .toFile(resizedPhotoFile);
      // await fileChooser.accept([resizedPhotoFile]);

      // let passportFile = `./passports/${data.travellers[counter].passportNumber}.jpg`;
      // if (fs.existsSync(passportFile)) {
      //   futureFileChooser = page.waitForFileChooser();
      //   await page.evaluate(() =>
      //     document
      //       .querySelector("#fuppcopy")
      //       .click()
      //   );
      //   fileChooser = await futureFileChooser;
      //   let resizedPassportFile = `./passports/${data.travellers[counter].passportNumber}_400x300.jpg`;
      //   await sharp(passportFile)
      //     .resize(400, 300)
      //     .toFile(resizedPassportFile);

      //   await fileChooser.accept([resizedPassportFile]);
      // }
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
