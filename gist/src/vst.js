const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require("./util");
const moment = require("moment");
const sharp = require("sharp");

let page;
let emailPage;
let email;
let data;
let counter = 0;
const config = [
    {
        name: 'main',
        url: 'https://visa.visitsaudi.com/Registration/Verify',
        details: [
            { selector: '#PassportType', value: () => '1' },
            { selector: '#Nationality', txt: (row) => row.nationality.name},
        ]
    },
    {
        name: 'add',
        url: 'https://visa.visitsaudi.com/Registration/Add',
        details: [
            { selector: '#FirstName', value: (row) => row.name.first },
            { selector: '#LastName', value: (row) => row.name.last},
            { selector: '#MobileNumber', value: (row) => row.mobileNumber },
            { selector: '#SecretQuestion', value: () => '1' },
            { selector: '#Answer', value: () => 'blue' },
            { selector: '#password', value: () => 'StrongPassword1' },
            { selector: '#ConfirmPassword', value: () => 'StrongPassword1' },
        ]
    },
    {
        name: 'login',
        url: 'https://visa.visitsaudi.com/Login',
        details: [
            { selector: '#EmailId', value: () => email },
            { selector: '#Password', value: (row) => 'StrongPassword1' },
        ]
    },
    {
        name: 'otp',
        url: 'https://visa.visitsaudi.com/Login/OTPAuth',
    },
    {
        name: 'index',
        url: 'https://visa.visitsaudi.com/Visa/Index',
    },
    {
        name: 'personal',
        regex: 'https://visa.visitsaudi.com/Visa/PersonalInfo\\?g',
        url: 'https://visa.visitsaudi.com/Visa/PersonalInfo?gName',
        details: [
            { selector: '#FirstNameEnglish', value: (row) => row.name.firstName },
            { selector: '#LastNameEnglish', value: (row) => row.name.lastName },
            { selector: '#FatherNameEnglish', value: (row) => row.name.father },
            { selector: '#Gender', value: (row) => row.gender },
            { selector: '#SocialStatus', value: () => '5' },
            { selector: '#Nationality', value: (row) => row.nationality.name },
            { selector: '#CountryOfBirth', value: (row) => row.nationality.name },
            { selector: '#Country', value: (row) => row.nationality.name },
            { selector: '#CityOfBirth', value: (row) => row.birthPlace },
            { selector: '#Profession', value: (row) => row.profession },
            { selector: '#City', value: (row) => row.address },
            { selector: '#PostalCode', value: (row) => '11821' },
            { selector: '#Address', value: (row) => row.address },
        ]
    },
    {
        name: 'passport',
        url: 'https://visa.visitsaudi.com/Visa/PassportInfo',
        details: [
            { selector: '#PassportNumber', value: (row) => row.passportNumber },
            { selector: '#PassportIssuePlace', value: (row) => row.placeOfIssue },
            { selector: '#PlaceOfResidence', value: (row) => 'friend' },
            { selector: '#CityId', value: (row) => '33' },
            { selector: '#Address1', value: (row) => 'address in madinah' },
        ]
    },
    {
        name: 'insurance',
        url: 'https://visa.visitsaudi.com/Insurance/ChooseInsurance',
    },
    {
        name: 'terms',
        url: 'https://visa.visitsaudi.com/Visa/Terms',
    },
        {
        name: 'review',
        url: 'https://visa.visitsaudi.com/Visa/Review',
    }

]

getEmailAddress()

async function send(sendData) {
    data = sendData;
    page = await util.initPage(onContentLoaded);
    await page.goto(config[0].url, { waitUntil: "domcontentloaded" });
};

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
        case 'main':
            await util.commit(page, currentConfig.details, data.travellers[counter])
            await util.captchaClick("#CaptchaCode", 5, "#btnVerify");
            break;
        case 'add':
            await util.commit(currentConfig.details, data[counter])
            await page.waitForSelector('#Email')
            await page.type('#Email', email)
            await page.waitForSelector('#AlternativeEmail')
            await page.type('#AlternativeEmail', email)
            await page.bringToFront();
            await page.waitForSelector('#CaptchaCode')
            await page.focus('#CaptchaCode')
            await page.waitForFunction("document.querySelector('#CaptchaCode').value.length === 5")
            await page.click('#btnAdd')
            break;
        case 'login':
            const isActive = await activateAccount()
            if (isActive) {
                await util.commit(currentConfig.details)
                await page.bringToFront();
                await page.waitForSelector('#CaptchaCode')
                await page.focus('#CaptchaCode')
                await page.waitForFunction("document.querySelector('#CaptchaCode').value.length === 5")
                await page.click('#btnSignIn')
            } else {
                console.log('unable to activate email', email)
            }
            break;
        case 'otp':
            if (await page.$('#resendOtp')) {
                await page.waitForSelector('#resendOtp')
                await page.click('#resendOtp')
                const code = await receiveActivationCode()
                console.log('%c 🌶 code: ', 'font-size:20px;background-color: #465975;color:#fff;', code);
                await page.waitForSelector('#Otp')
                await page.type('#Otp', code)
                await page.waitForSelector('#btnSubmit')
                await page.click('#btnSubmit')
            }
            break;
        case 'index':
            await page.waitForSelector('#btnApplyGroupVisa')
            await page.click('#btnApplyGroupVisa');
            await page.waitForSelector('#txtGroupName')
            await page.type('#txtGroupName', (data[counter].name.full + data[counter].nationality.name + data[counter].mobileNumber).replace(/ /g,''))
            await page.click('#btnCreateGroup');
            break;
        case 'personal':
            await page.waitForSelector('#ApplyingVisaForSomeoneElseYes')
            await page.click('#ApplyingVisaForSomeoneElseYes');
            await commit(currentConfig.details, data[counter])
            await page.waitForSelector('#DateOfBirth')
            await page.$eval('#DateOfBirth', e => {
                e.removeAttribute("readonly");
                e.removeAttribute("disabled");
            })
            await page.type('#DateOfBirth', data[counter].dob.dmy)

            let futureFileChooser = page.waitForFileChooser();
            await page.waitForSelector('#AttachmentPersonalPicture')
            await page.evaluate(() => document.querySelector('#AttachmentPersonalPicture').click())
            let fileChooser = await futureFileChooser;
            const photoFile = `./photos/${data[counter].passportNumber}.jpg`
            await fileChooser.accept([photoFile]);
            await page.waitForSelector('#divPhotoCroper > div > div > div.modal-footer > button.rounded-button.upload-result')
            await page.click('#divPhotoCroper > div > div > div.modal-footer > button.rounded-button.upload-result')

            //#btnNext
            break;
        case 'passport':
            await util.commit(currentConfig.details, data[counter])
            await page.click('#chk_4')
            await page.waitForSelector('#PassportIssueDate')
            await page.$eval('#PassportIssueDate', e => {
                e.removeAttribute("readonly");
                e.removeAttribute("disabled");
            })
            await page.type('#PassportIssueDate', data[counter].passIssueDt.dmy)

            await page.waitForSelector('#PassportExpiryDate')
            await page.$eval('#PassportExpiryDate', e => {
                e.removeAttribute("readonly");
                e.removeAttribute("disabled");
            })
            await page.type('#PassportExpiryDate', data[counter].passExpireDt.dmy)

            // var entryDate = new Date();
            // entryDate.setDate(entryDate.getDate() + 3); 

            // await page.waitForSelector('#ExpectedDateOfEntry')
            // await page.$eval('#ExpectedDateOfEntry', e => {
            //     e.removeAttribute("readonly");
            //     e.removeAttribute("disabled");
            // })
            // await page.type('#ExpectedDateOfEntry', entryDate.toLocaleDateString())

            // var returnDate = new Date();
            // returnDate.setDate(returnDate.getDate() + 10); 
            // await page.waitForSelector('#ExpectedDateOfLeave')
            // await page.$eval('#ExpectedDateOfLeave', e => {
            //     e.removeAttribute("readonly");
            //     e.removeAttribute("disabled");
            // })
            // await page.type('#ExpectedDateOfLeave', returnDate.toLocaleDateString())
            break;
        case 'insurance':
            await page.waitForSelector('#chkInsurance')
            await page.click('#chkInsurance')
            await page.click('#btnNext')
            break;
        case 'terms':
            await page.waitForSelector('#chkSelectDeselectAll')
            await page.click('#chkSelectDeselectAll')
            await page.click('#btnNext')
            break;
        case 'review':
            if (data.length > counter + 1)
            {
                counter = counter + 1
                await page.waitForSelector('#btnAddMoreToGroup')
                await page.click('#btnAddMoreToGroup')
            }
            break;
        default:
            break;
    }

}

async function getEmailAddress() {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null, args: ['--start-maximized'] });
    emailPage = await browser.newPage();
    await emailPage.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    await emailPage.goto('https://www.minuteinbox.com/', { waitUntil: 'domcontentloaded' });
    await emailPage.waitForSelector('#email')
    email = await emailPage.$eval('#email', e => e.innerText)
    console.log('%c 🍱 email: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', email);
}

async function activateAccount() {
    const activationElement = 'body > table > tbody > tr:nth-child(4) > td > a'
    try {
        for (let i = 0; i < 10; i++) {
            await emailPage.waitForTimeout(3000)
            const response = await emailPage.goto('https://www.minuteinbox.com/email/id/2', { waitUntil: 'domcontentloaded' })
            if (response.ok() && await emailPage.$(activationElement)) {
                await emailPage.click(activationElement)
                console.log('activated', email)
                return true;
            }
        }
    } catch (err) {
        return false;
    }
    return false;
}

async function receiveActivationCode() {

    const codeElement = 'body > table > tbody > tr:nth-child(6) > td:nth-child(3)'
    try {
        for (let i = 0; i < 10; i++) {
            await emailPage.waitForTimeout(3000)
            const response = await emailPage.goto('https://www.minuteinbox.com/email/id/3', { waitUntil: 'domcontentloaded' })
            if (response.ok() && await emailPage.$(codeElement)) {
                const code = await emailPage.$eval(codeElement, e => e.innerText)
                return code;
            }
        }
    } catch (err) {
        return false;
    }
    return false;
}


module.exports = { send };


    // await page.exposeFunction('pasteCurrentMutamer', async () => {
    //     try {
    //         fillPersonalInfo();
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
















    // const data = fs.readFileSync('./Mutamers.json'); // Must read here because onContentLoaded is async function and can't access global variables
    // const mutamersObject = JSON.parse(data);
    // if (!mutamersObject.mutamerIndex) {
    //     mutamersObject.mutamerIndex = 0;
    // }
    // if (mutamersObject.mutamerIndex >= mutamersObject.pax) {
    //     return;
    // }
    // const thisMutamer = mutamersObject.mutamers[mutamersObject.mutamerIndex];

    // if (url.includes('/Visa/PersonalInfo')) { // Only add button on this page and fill the fields only when the user press that button
    //     await displayButtons(mutamersObject);

    //     await page.evaluate((p) => {
    //         let dom = document.querySelector('#DateOfBirth');
    //         dom.removeAttribute("readonly");
    //     }, thisMutamer);
    // } else if (url.includes('Visa/PassportInfo')) {
    //     const presentPassNo = await page.$eval('#PassportNumber', p => p.value);
    //     if (presentPassNo == '') {

    //         await typeText('#PassportNumber', thisMutamer.PassportNumber);

    //         await typeText('#PassportIssuePlace', thisMutamer.IssuePlace);
    //         await typeDate('#PassportIssueDate', thisMutamer.IssueDate);
    //         await typeDate('#PassportExpiryDate', thisMutamer.ExpireDate);
    //         await typeDate('#ExpectedDateOfEntry', mutamersObject.travelDate);
    //         await typeDate('#ExpectedDateOfLeave', mutamersObject.returnDate);
    //         await typeText('#PlaceOfResidence', 'Hotel');
    //         await selectByValue('#CityId', "33");
    //         await typeText('#Address1', 'Madinah City');
    //         await page.click('#chk_4');
    //     }

    //     await enableAllDateButtons();


    // } else if (url.includes('Insurance/ChooseInsurance')) {
    //     await page.click('#chkInsurance');
    //     await page.click('#btnNext');
    // } else if (url.includes('Visa/Terms/')) {
    //     await page.click('#chkSelectDeselectAll');
    //     await page.click('#btnNext');
    // } else if (url.includes('Visa/Review/')) {
    //     await page.click('#chkPay');
    // } else if (url.includes('com/Visa/Index')) {
    //     await page.click('#btnApplyGroupVisa');
    //     await typeText('#txtGroupName', decodeURI(mutamersObject.packageName) + DateTime.local().toFormat('mmss'));
    //     await page.click('#btnCreateGroup');

    // }