const puppeteer = require('puppeteer');
const fs = require('fs');

let page;
let emailPage;
let email;
let data;

const config = [
    {
        url: 'https://visa.visitsaudi.com/Registration/Verify',
        details: [
            { selector: '#PassportType', value: () => '1' },
            { selector: '#Nationality', value: (row) => row.nationality },
        ]
    },
    {
        url: 'https://visa.visitsaudi.com/Registration/Add',
        details: [
            { selector: '#FirstName', value: (row) => row.firstName },
            { selector: '#LastName', value: (row) => row.lastName },
            { selector: '#MobileNumber', value: (row) => row.mobileNumber },
            { selector: '#SecretQuestion', value: () => '1' },
            { selector: '#Answer', value: () => 'blue' },
            { selector: '#password', value: () => 'StrongPassword1' },
            { selector: '#ConfirmPassword', value: () => 'StrongPassword1' },
        ]
    },
    {
        url: 'https://visa.visitsaudi.com/Login',
        details: [
            { selector: '#EmailId', value: () => email },
            { selector: '#Password', value: (row) => 'StrongPassword1' },
        ]
    },
    {
        url: 'https://visa.visitsaudi.com/Login/OTPAuth',
    },
    {
        url: 'https://visa.visitsaudi.com/Visa/Index',
    },
    {
        url: 'https://visa.visitsaudi.com/Visa/PersonalInfo?gName',
        details: [
            {selector: '#FirstNameEnglish', value: (row)=> row.firstName},
            {selector: '#LastNameEnglish', value: (row)=> row.lastName},
            {selector: '#Gender', value: (row)=> row.gender},
            {selector: '#SocialStatus', value: (row)=> '1'},
            {selector: '#DateOfBirth', value: (row)=> row.dob},
            {selector: '#Nationality', value: (row)=> row.nationality},
            {selector: '#CountryOfBirth', value: (row)=> row.nationality},
            {selector: '#Country', value: (row)=> row.nationality},
            {selector: '#CityOfBirth', value: (row)=> row.birthPlace},
            {selector: '#Profession', value: (row)=> row.profession},
            {selector: '#City', value: (row)=> row.nationality},
            {selector: '#PostalCode', value: (row)=> '11821'},
            {selector: '#Address', value: (row)=> row.nationality},
        ]
    }

]

automate();

async function automate() {
    if (!fs.existsSync(__dirname + '/data.json')) {
        console.log('Data file does not exist')
        process.exit(1);
    }
    const content = fs.readFileSync(__dirname + '/data.json', 'utf8');
    data = JSON.parse(content)
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    page = await browser.newPage();
    await page.bringToFront();
    page.on('domcontentloaded', onContentLoaded);
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    await page.goto(config[0].url, { waitUntil: 'domcontentloaded' });
};

async function onContentLoaded(res) {
    let currentUrl = (await page.url()).toLowerCase()
    currentUrl = currentUrl.split('=')[0]
    const pageConfig = config.find(x => x.url.toLowerCase().includes(currentUrl))
    if (!pageConfig) {
        return;
    }

    switch (currentUrl) {
        case 'https://visa.visitsaudi.com/Registration/Verify'.toLowerCase():
            await commit(pageConfig.details, data[0])
            await page.waitForSelector('#CaptchaCode')
            await page.focus('#CaptchaCode')
            await page.waitForFunction("document.querySelector('#CaptchaCode').value.length === 5")
            await page.click('#btnVerify')
            break;
        case 'https://visa.visitsaudi.com/Registration/Add'.toLowerCase():
            await getEmailAddress()
            await commit(pageConfig.details, data[0])
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
        case 'https://visa.visitsaudi.com/Login'.toLowerCase():
            const isActive = await activateAccount()
            if (isActive) {

                await commit(pageConfig.details)
                await page.bringToFront();
                await page.waitForSelector('#CaptchaCode')
                await page.focus('#CaptchaCode')
                await page.waitForFunction("document.querySelector('#CaptchaCode').value.length === 5")
                await page.click('#btnSignIn')
            } else {
                console.log('unable to activate email', email)
            }
            break;
        case 'https://visa.visitsaudi.com/Login/OTPAuth'.toLowerCase():
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
        case 'https://visa.visitsaudi.com/Visa/Index'.toLowerCase():
            await page.waitForSelector('#btnApplyGroupVisa')
            await page.click('#btnApplyGroupVisa');
            await page.waitForSelector('#txtGroupName')
            await page.type('#txtGroupName', data[0].firstName + data[0].lastName + data[0].nationality + data[0].mobileNumber)
            await page.click('#btnCreateGroup');
            break;
        case 'https://visa.visitsaudi.com/Visa/PersonalInfo?gName='.toLowerCase():
            await page.waitForSelector('#ApplyingVisaForSomeoneElseYes')
            await page.click('#ApplyingVisaForSomeoneElseYes');
            await commit(pageConfig.details)
            // let futureFileChooser = page.waitForFileChooser();
            // await page.waitForSelector('#AttachmentPersonalPicture')
            // await page.evaluate(() => document.querySelector('#AttachmentPersonalPicture').click())
            // let fileChooser = await futureFileChooser;
            // await fileChooser.accept(['./' + thisMutamer.HajId + '.jpg']);
            break;
        default:
            break;
    }

}

async function commit(structure, info) {
    for (const element of structure) {
        await page.waitForSelector(element.selector)
        let value;
        if (element.value) {
            value = element.value(info)
        }
        const elementType = await page.$eval(element.selector, e => e.outerHTML.match(/<(.*?) /g)[0].replace(/</g, '').replace(/ /g, '').toLowerCase())
        switch (elementType) {
            case 'input':
                await page.type(element.selector, value)
                break;
            case 'select':
                await page.select(element.selector, value)
                break;
            default:
                break;
        }
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

async function movetoNextMutamer() {
    const data = fs.readFileSync('./Mutamers.json');
    const mutamersObject = JSON.parse(data);
    if (!mutamersObject.mutamerIndex) {
        mutamersObject.mutamerIndex = 1;
    } else {
        mutamersObject.mutamerIndex = parseInt(mutamersObject.mutamerIndex) + 1;
    }
    fs.writeFileSync('./Mutamers.json', JSON.stringify(mutamersObject));
    await displayButtons(mutamersObject);

}
async function movetoPreviousMutamer() {
    const data = fs.readFileSync('./Mutamers.json');
    const mutamersObject = JSON.parse(data);
    if (!mutamersObject.mutamerIndex || mutamersObject.mutamerIndex === "0") {
        return;
    } else {
        mutamersObject.mutamerIndex = parseInt(mutamersObject.mutamerIndex) - 1;
    }
    fs.writeFileSync('./Mutamers.json', JSON.stringify(mutamersObject));
    await displayButtons(mutamersObject);
}

async function typeDate(selector, value) {
    const inputArray = [];
    inputArray.push(selector);
    inputArray.push(value);
    try {
        await page.waitForSelector(selector);
        await page.evaluate((p) => {
            let element = document.querySelector(p[0]);
            element.removeAttribute("readonly");
            element.removeAttribute("disabled");
            return element;
        }, inputArray);
        await page.$eval(selector, el => el.value = '');
        await typeText(selector, value);
    } catch (ex) { console.log(ex); }
}

async function enableAllDateButtons() {
    try {
        await page.evaluate((p) => {
            let elements = document.querySelectorAll('input');
            for (num = 0; num < elements.length; num++) {
                elements[num].removeAttribute("readonly");
                elements[num].removeAttribute("disabled");
            }
        });
    } catch (ex) { console.log(ex); }
}

async function displayButtons(mutamersObject) {
    await page.evaluate((p) => {
        let dom = document.querySelector('#formPersonalInfo > div.form-fields > div.bg-label-gray.d-flex.justify-content-between');
        if (!p.mutamerIndex) {
            p.mutamerIndex = 0;
        }
        if (p.mutamerIndex >= p.pax) {
            return;
        }

        let previousButton = '';
        let nextButton = ';'
        if (p.mutamerIndex > 0) {

            previousButton = `<button class="btn btn-success"   style="border-radius: 50%" type='button' onclick='previousMutamer()'><<</button>`;
        } else {
            previousButton = `<button class="btn btn-success"   style="border-radius: 50%" type='button' disabled><<</button>`;

        }
        if (p.mutamerIndex < (parseInt(p.pax) - 1)) {
            nextButton = `<button class="btn btn-success"   style="border-radius: 50%" type='button' onclick='nextMutamer()'>>></button>`;
        } else {
            nextButton = `<button class="btn btn-success"   style="border-radius: 50%" type='button' disabled>>></button>`;
        }

        let currentButton = `<button class="btn btn-primary rounded" type='button' onclick='pasteCurrentMutamer()'> ` + p.mutamers[p.mutamerIndex].ShortName + ' [' + (parseInt(p.mutamerIndex) + 1) + '/' + p.pax + ']' + `</button>`;

        dom.innerHTML = dom.children[0].outerHTML + previousButton + currentButton + nextButton;
    }, mutamersObject);
}





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