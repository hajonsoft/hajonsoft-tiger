const puppeteer = require('puppeteer');
const fs = require('fs');



let page;
let mutamers;
let currentMutamer;
let pax;
let currentMutamerIndex = 0;
const displayButtonsContainer = '#aspnetForm > div.container-fluid.body-content > div.page-header';
automate();

async function automate() {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    page = await browser.newPage();
    await page.bringToFront();
    page.on('domcontentloaded', onContentLoaded);
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // if (!mutamers) {
    //     fs.readFile('./Mutamers.json', (err, data) => {
    //         if (err) throw err;
    //         mutamers = JSON.parse(data);
    //         pax = parseInt(mutamers.pax);
    //     });
    // }
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
     await page.goto('http://app2.babalumra.com/Security/login.aspx', { waitUntil: 'domcontentloaded' });
    // await login();
    // await createGroup();
};


async function login() {
    const usernameElement = await page.$('#txtUserName');
    if (usernameElement && mutamers.bauUsername) {
        await typeText('#txtUserName', mutamers.bauUsername);
    }
    const passwordElement = await page.$('#txtPassword');
    if (passwordElement && mutamers.bauPassword) {
        await typeText('#txtPassword', mutamers.bauPassword);
    }
    // if (usernameElement && mutamers.bauUsername && passwordElement && mutamers.bauPassword) {
    //     await page.click('#lnkLogin');
    //     await page.waitForNavigation();
    // }
}

async function createGroup(res) {
    const tripDate = DateTime.local().plus({ days: 10 });
    const url = await page.url();

    if (url.includes('/Security/MainPage.aspx')) {
        await page.goto('http://app2.babalumra.com/Groups/AddNewGroup.aspx?gMode=1', { waitUntil: 'domcontentloaded' });
    } else if (url.includes('http://app2.babalumra.com/Groups/AddNewGroup.aspx')) {
        const groupnameElement = await page.$('#ctl00_ContentHolder_TxtGroupName');
        if (groupnameElement) {
            await typeText('#ctl00_ContentHolder_TxtGroupName', decodeURI(mutamers.packageName));
            await page.type('#ctl00_ContentHolder_TxtExpectedArrivalDate_dateInput', mutamers.travelDate);
            const embassies = await page.evaluate(() => {
                const embassiesSelect = document.querySelectorAll('#ctl00_ContentHolder_LstConsulate > option');
                const embassyCodes = [];
                for (i = 0; i < embassiesSelect.length; i++) {
                    const embassyCode = embassiesSelect[i].value;
                    if (embassyCode && embassyCode !== '-1') {
                        embassyCodes.push(embassyCode);
                    }
                }
                return embassyCodes;
            });
            if (embassies) {
                if (embassies.includes(mutamers.embassy)) {
                    await page.select('#ctl00_ContentHolder_LstConsulate', mutamers.embassy);
                } else {
                    await page.select('#ctl00_ContentHolder_LstConsulate', embassies[0]);
                }
                if (embassies.length === 1) {
                    await page.click('#ctl00_ContentHolder_btnCreate');
                }
            }
        }
    }
}

async function onContentLoaded(res) {
    const url = await page.url();

    if (url.includes('com/Groups/EditMutamerNew.aspx')) {
        const data = fs.readFileSync('./Mutamers.json');
        const mutamersObject = JSON.parse(data);
        if (!mutamersObject.mutamerIndex) {
            mutamersObject.mutamerIndex = 0;
        }
        if (mutamersObject.mutamerIndex >= mutamersObject.pax) {
            mutamersObject.mutamerIndex = mutamersObject.pax - 1;
        }
        const thisMutamer = mutamersObject.mutamers[mutamersObject.mutamerIndex];
        await displayButtons(mutamersObject, displayButtonsContainer);
        await page.evaluate(() => {

            let createButton = document.querySelector('#aspnetForm > div.container-fluid.body-content > div.row > div > div:nth-child(9) > div');
            createButton.innerHTML = createButton.innerHTML + `<div style="height: 500px">Extra space</div>`;
        });
    } else if (url.includes('http://app2.babalumra.com/Security/login.aspx')) {
        await login();
    } else if (url.includes('http://app2.babalumra.com/Security/MainPage.aspx')) {
        createGroup();
    } else if (url.includes('http://app2.babalumra.com/Groups/AddNewGroup.aspx')) {
        createGroup();
    }

}

async function scanCurrentMutamer(useBlur) {
    const data = fs.readFileSync('./Mutamers.json');
    const mutamersObject = JSON.parse(data);
    if (!mutamersObject.mutamerIndex) {
        mutamersObject.mutamerIndex = 0;
    }
    const thisMutamer = mutamersObject.mutamers[mutamersObject.mutamerIndex];
    await typeText('#ctl00_ContentHolder_txtMutamerOcc', decodeURI(thisMutamer.Occupation));

    await selectByValue('#ctl00_ContentHolder_LstSocialState', '99');
    await selectByValue('#ctl00_ContentHolder_LstEducation', '99');
    await typeText('#ctl00_ContentHolder_TxtBirthCity', decodeURI(thisMutamer.PlaceOfBirth));
    await typeText('#ctl00_ContentHolder_TxtAddressCity', decodeURI(thisMutamer.PlaceOfBirth));
    await typeText('#ctl00_ContentHolder_calPassIssue_dateInput', thisMutamer.IssueDate);
    await typeText('#ctl00_ContentHolder_TxtCityIssuedAt', decodeURI(thisMutamer.IssuePlace));

    const content = await page.content();
    let isArabicInterface = false;
    if (!content.includes('Mutamer Birth Infromation')) {
        isArabicInterface = true;
    }
    if (thisMutamer.ArabicFirstName) {
        isArabicInterface ? await typeText('#ctl00_ContentHolder_TxtFirstName', decodeURI(thisMutamer.ArabicFirstName)) : await typeText('#ctl00_ContentHolder_TxtAltFirstName', decodeURI(thisMutamer.ArabicFirstName));

    }
    if (thisMutamer.ArabicLastName) {

        isArabicInterface ? await typeText('#ctl00_ContentHolder_TxtLastName', decodeURI(thisMutamer.ArabicLastName)) : await typeText('#ctl00_ContentHolder_TxtAltLastName', decodeURI(thisMutamer.ArabicLastName));
    }
    if (thisMutamer.ArabicGrandName) {

        isArabicInterface ? await typeText('#ctl00_ContentHolder_TxtGrandFatherName', decodeURI(thisMutamer.ArabicGrandName)) : await typeText('#ctl00_ContentHolder_TxtAltGrandFatherName', decodeURI(thisMutamer.ArabicGrandName));
    }
    if (thisMutamer.ArabicFatherName) {

        isArabicInterface ? await typeText('#ctl00_ContentHolder_TxtSecondName', decodeURI(thisMutamer.ArabicFatherName)) : await typeText('#ctl00_ContentHolder_TxtAltSecondName', decodeURI(thisMutamer.ArabicFatherName));
    }

    await page.click('#btnclick');
    await page.waitForSelector('#ctl00_ContentHolder_btngetValues');
    await typeText('#ctl00_ContentHolder_btngetValues', thisMutamer.CodeLine, { delay: 0 });
    await page.waitForNavigation();

    if (thisMutamer.Relationship) {
        await selectByValue('#ctl00_ContentHolder_LstCompRelationship', thisMutamer.Relationship);
    }
    let futureFileChooser = page.waitForFileChooser();
    await page.waitForSelector('#ctl00_ContentHolder_imgSelectedFile')
    await page.evaluate(() => document.querySelector('#ctl00_ContentHolder_ImageUploaderControl').click())
    let fileChooser = await futureFileChooser;
    await fileChooser.accept(['./' + thisMutamer.HajId + '.jpg']);
    let passportFile = './' + thisMutamer.HajId + '_MRZ1.jpg';
    if (useBlur) {
        passportFile = './' + thisMutamer.HajId + '_MRZ2.jpg';
    }
    if (fs.existsSync(passportFile)) {
        futureFileChooser = page.waitForFileChooser();
        await page.evaluate(() => document.querySelector('#ctl00_ContentHolder_ImageUploaderControlPassport').click())
        fileChooser = await futureFileChooser;
        await fileChooser.accept([passportFile]);
    }
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
    await displayButtons(mutamersObject, displayButtonsContainer);

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
    await displayButtons(mutamersObject, displayButtonsContainer);
}
async function typeText(selector, value) {
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.$eval(selector, el => el.value = '');
    await page.type(selector, value);
}
async function selectByValue(selector, value) {
    try {
        await page.waitForSelector(selector);
        await page.select(selector, value);
    } catch  { };
}
async function selectByText(selector, value) {
    try {
        const textValueId = await page.evaluate((p) => {
            try {
                const options = document.querySelectorAll(p[0] + ' > option');
                for (i = 0; i < options.length; i++) {
                    if (options[i].innerText === p[1]) {
                        return options[i].value;
                    }

                }
                return '';
            } catch (ex) {
                console.log(ex);
            }
        }, [selector, value]);

        if (textValueId) {
            await page.waitForSelector(selector);
            await page.select(selector, textValueId);
        }
    } catch (ex) {
        console.log(ex);
    }
}


async function displayButtons(mutamersObject, selector) {
    await page.evaluate((p) => {
        let buttonsDiv = document.querySelector(p[1]);
        if (!p[0].mutamerIndex) {
            p[0].mutamerIndex = 0;
        }
        if (p[0].mutamerIndex >= p[0].pax) {
            p[0].mutamerIndex = p[0].pax - 1;
        }

        let previousButton = '';
        let nextButton = ';'
        if (p[0].mutamerIndex > 0) {

            previousButton = `<button class="btn btn-success"  style="border-radius: 50%" type='button' onclick='previousMutamer()'> <<` + '' + `</button>`;
        } else {
            previousButton = `<button class="btn btn-success" style="border-radius: 50%" type='button' disabled> <<` + '' + `</button>`;

        }
        if (p[0].mutamerIndex < (parseInt(p[0].pax) - 1)) {
            nextButton = `<button class="btn btn-success" style="border-radius: 50%" type='button' onclick='nextMutamer()'>>>` + '' + `</button>`;
        } else {
            nextButton = `<button class="btn btn-success" type='button' style="border-radius: 50%" disabled> >>` + '' + `</button>`;

        }

        let currentButton = `<button class="btn btn-primary rounded" type='button' onclick='pasteCurrentMutamer()'> ` + p[0].mutamers[p[0].mutamerIndex].ShortName + ' [' + (parseInt(p[0].mutamerIndex) + 1) + '/' + p[0].pax + ']' + `</button>`;
        let children = '';
        buttonsDiv.innerHTML = children + `<div style="display: flex; width: 100%; justify-content: center">` + previousButton + currentButton + nextButton + '</div>';
    }, [mutamersObject, selector]);
}