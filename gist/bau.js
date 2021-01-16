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
    url: "http://app2.babalumra.com/Security/login.aspx",
    details: [
      { selector: "#txtUserName", value: (system) => system.username },
      { selector: "#txtPassword", value: (system) => system.password },
    ],
  },
  {
    name: "main",
    url: "http://app2.babalumra.com/Security/MainPage.aspx",
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
    regex:
      "http://app2.babalumra.com/Groups/EditMutamerNew.aspx\\?GroupId=\\d+",
    url: "http://app2.babalumra.com/Groups/EditMutamerNew.aspx?GroupId=654",
    controller: {
      selector: "#aspnetForm > div.container-fluid.body-content > div.page-header",
    },
    details: [
      { selector: "#ctl00_ContentHolder_LstTitle", value: (row) => "99" },
      {
        selector: "#ctl00_ContentHolder_txtMutamerOcc",
        value: (row) => decodeURI(row.profession),
      },
      { selector: "#ctl00_ContentHolder_LstSocialState", value: (row) => "99" },
      { selector: "#ctl00_ContentHolder_LstEducation", value: (row) => "99" },
      {
        selector: "#ctl00_ContentHolder_TxtBirthCity",
        value: (row) => decodeURI(row.birthPlace),
      },
      {
        selector: "#ctl00_ContentHolder_TxtAddressCity",
        value: (row) => decodeURI(row.birthPlace),
      },
      {
        selector: "#ctl00_ContentHolder_TxtAltFirstName",
        value: (row) => row.nameArabic.first,
      },
      {
        selector: "#ctl00_ContentHolder_TxtAltLastName",
        value: (row) => row.nameArabic.last,
      },
      {
        selector: "#ctl00_ContentHolder_TxtAltGrandFatherName",
        value: (row) => row.nameArabic.grand,
      },
      {
        selector: "#ctl00_ContentHolder_TxtAltSecondName",
        value: (row) => row.nameArabic.father,
      },
      {
        selector: "#ctl00_ContentHolder_calPassIssue_dateInput",
        value: (row) => row.passIssueDt.dmy,
      },
      {
        selector: "#ctl00_ContentHolder_TxtCityIssuedAt",
        value: (row) => decodeURI(row.placeOfIssue),
      },
    ],
  },
];


 async function send(sendData) {
  data = sendData;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized", "--incognito"],
  });
  page = await browser.newPage();
  await page.bringToFront();
  page.on("domcontentloaded", onContentLoaded);
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
  );

  await page.goto(config[0].url, { waitUntil: "domcontentloaded" });

  // await page.exposeFunction('pasteCurrentMutamer', async (currentMutamer) => {
  //     try {
  //         scanCurrentMutamer();
  //     } catch (ex) {
  //         console.log(ex);
  //     }

  // });
  // await page.exposeFunction('pasteCurrentMutamerBlur', async (currentMutamer) => {
  //     try {
  //         scanCurrentMutamer(true);
  //     } catch (ex) {
  //         console.log(ex);
  //     }

  // });
  // await page.exposeFunction('nextMutamer', async () => {
  //     try {
  //         movetoNextMutamer();
  //     } catch (ex) {
  //         console.log(ex);
  //     }

  // });
  // await page.exposeFunction('previousMutamer', async () => {
  //     try {
  //         movetoPreviousMutamer();
  //     } catch (ex) {
  //         console.log(ex);
  //     }

  // });
}

async function onContentLoaded(res) {
  if (counter >= data.length) {
    return;
  }
  const currentConfig = util.findConfig(await page.url(), config);
  switch (currentConfig.name) {
    case "login":
      await util.commit(page, currentConfig.details, data.system);
      await page.waitForSelector("#rdCap_CaptchaTextBox");
      await page.focus("#rdCap_CaptchaTextBox");
      await page.waitForFunction(
        "document.querySelector('#rdCap_CaptchaTextBox').value.length === 5"
      );
      await page.click("#lnkLogin");
      break;
    case "main":
      await page.goto(
        "http://app2.babalumra.com/Groups/AddNewGroup.aspx?gMode=1"
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
      await util.controller(page,currentConfig);
      const passportNumber = await page.$eval(
        "#ctl00_ContentHolder_TxtNumber",
        (e) => e.value
      );
      // Do not continue if the passport number field is not empty
      if (passportNumber) {
        return;
      }

      await page.waitFor(3000);
      await page.waitForSelector("#btnclick");
      await page.evaluate(() => {
        const divBtn = document.querySelector("#btnclick");
        if (divBtn) {
          divBtn.click();
        }
      });

      await page.waitForSelector("#ctl00_ContentHolder_btngetValues");
      await page.type(
        "#ctl00_ContentHolder_btngetValues",
        data.travellers[counter].codeline,
        {
          delay: 0,
        }
      );

      await page.waitFor(2000);
      await util.commit(page, currentConfig.details, data.travellers[counter]);

      let photoFile = `./photos/${data.travellers[counter].passportNumber}.jpg`;
      await page.waitForSelector("#ctl00_ContentHolder_imgSelectedFile");
      let futureFileChooser = page.waitForFileChooser();
      await page.evaluate(() =>
        document
          .querySelector("#ctl00_ContentHolder_ImageUploaderControl")
          .click()
      );
      let fileChooser = await futureFileChooser;
      const resizedPhotoFile = `./photos/${data.travellers[counter].passportNumber}_200x200.jpg`;
      await sharp(photoFile)
        .resize(200,200)
        .toFile(resizedPhotoFile);
      await fileChooser.accept([resizedPhotoFile]);

      let passportFile = `./passports/${data.travellers[counter].passportNumber}.jpg`;
      if (fs.existsSync(passportFile)) {
        futureFileChooser = page.waitForFileChooser();
        await page.evaluate(() =>
          document
            .querySelector("#ctl00_ContentHolder_ImageUploaderControlPassport")
            .click()
        );
        fileChooser = await futureFileChooser;
        let resizedPassportFile = `./passports/${data.travellers[counter].passportNumber}_400x300.jpg`;
        await sharp(passportFile)
          .resize(400, 300)
          .toFile(resizedPassportFile);

        await fileChooser.accept([resizedPassportFile]);
      }
      await page.waitForSelector("#ctl00_ContentHolder_rdCap_CaptchaTextBox");
      await page.focus("#ctl00_ContentHolder_rdCap_CaptchaTextBox");
      await page.waitForFunction(
        "document.querySelector('#ctl00_ContentHolder_rdCap_CaptchaTextBox').value.length === 5"
      );
      await page.click("#ctl00_ContentHolder_BtnEdit");
      counter = counter + 1;
      break;
    default:
      break;
  }
}


async function displayButtons(mutamersObject, selector) {
  await page.evaluate(
    (p) => {
      let buttonsDiv = document.querySelector(p[1]);
      if (!p[0].mutamerIndex) {
        p[0].mutamerIndex = 0;
      }
      if (p[0].mutamerIndex >= p[0].pax) {
        p[0].mutamerIndex = p[0].pax - 1;
      }

      let previousButton = "";
      let nextButton = ";";
      if (p[0].mutamerIndex > 0) {
        previousButton =
          `<button class="btn btn-success"  style="border-radius: 50%" type='button' onclick='previousMutamer()'> <<` +
          "" +
          `</button>`;
      } else {
        previousButton =
          `<button class="btn btn-success" style="border-radius: 50%" type='button' disabled> <<` +
          "" +
          `</button>`;
      }
      if (p[0].mutamerIndex < parseInt(p[0].pax) - 1) {
        nextButton =
          `<button class="btn btn-success" style="border-radius: 50%" type='button' onclick='nextMutamer()'>>>` +
          "" +
          `</button>`;
      } else {
        nextButton =
          `<button class="btn btn-success" type='button' style="border-radius: 50%" disabled> >>` +
          "" +
          `</button>`;
      }

      let currentButton =
        `<button class="btn btn-primary rounded" type='button' onclick='pasteCurrentMutamer()'> ` +
        p[0].mutamers[p[0].mutamerIndex].ShortName +
        " [" +
        (parseInt(p[0].mutamerIndex) + 1) +
        "/" +
        p[0].pax +
        "]" +
        `</button>`;
      let children = "";
      buttonsDiv.innerHTML =
        children +
        `<div style="display: flex; width: 100%; justify-content: center">` +
        previousButton +
        currentButton +
        nextButton +
        "</div>";
    },
    [mutamersObject, selector]
  );
}

module.exports = {send}