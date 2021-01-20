
async function createGroup(mutamersObject) {
    const tripDate = DateTime.local().plus({ days: 10 });
    const url = await page.url();
    await typeText('#txtGrpdesc', decodeURI(mutamersObject.packageName));
    await typeText('#txtEADate', mutamersObject.travelDate);
    await selectByValue('#cmbEmb', mutamersObject.embassy);
    await page.click('#BtnSave');
}

async function onPageLoaded() {
    const url = await page.url();
    if (url.includes('https://www.waytoumrah.com/prj_umrah/Eng/Eng_MutamerEntry.aspx') || url.includes('https://www.waytoumrah.com/prj_umrah/arb/arb_MutamerEntry.aspx')) {
        const selector = '#btnppscan';
        const selectorValue = await page.$(selector);
        return;
    } else if (url.includes('https://www.waytoumrah.com/prj_umrah/Eng/Eng_Waytoumrah_EA.aspx')) {
        // await page.goto('https://www.waytoumrah.com/prj_umrah/Eng/Eng_frmGroup.aspx?PageId=M');
        await page.goto('https://www.waytoumrah.com/prj_umrah/Eng/Eng_MutamerEntry.aspx');
    } else if (url.includes('https://www.waytoumrah.com/prj_umrah/arb/arb_Waytoumrah_EA.aspx')) {
        await page.goto('https://www.waytoumrah.com/prj_umrah/arb/arb_MutamerEntry.aspx');
    } else if (url.includes('https://www.waytoumrah.com/prj_umrah/Eng/Eng_frmGroup.aspx?PageId=M')) {

   

}

async function onDialogLoaded(dlg){
    console.log(dlg);
}

async function scanCurrentMutamer(useBlur) {
    const url = await page.url();
    const data = fs.readFileSync('./Mutamers.json');
    const mutamersObject = JSON.parse(data);
    if (!mutamersObject.mutamerIndex) {
        mutamersObject.mutamerIndex = 0;
    }
    const thisMutamer = mutamersObject.mutamers[mutamersObject.mutamerIndex];
    if (thisMutamer.ArabicFirstName) {
        await typeText('#txtAfirstname', decodeURI(thisMutamer.ArabicFirstName));
    }
    if (thisMutamer.ArabicLastName) {
        await typeText('#txtAfamilyname', decodeURI(thisMutamer.ArabicLastName));
    }
    if (thisMutamer.ArabicGrandName) {
        await typeText('#txtAgfathername', decodeURI(thisMutamer.ArabicGrandName));
    }
    if (thisMutamer.ArabicFatherName) {
        await typeText('#txtAfathername', decodeURI(thisMutamer.ArabicFatherName));
    }
    await typeText('#txtprofession', decodeURI(thisMutamer.Occupation));

    await selectByValue('#ddlmstatus', '99');
    await selectByValue('#ddleducation', '99');
    await selectByText('#ddlbirthcountry', thisMutamer.PreviousNationality);
    await selectByText('#ddladdcountry', mutamersObject.Country);
    await typeText('#txtbirthcity', decodeURI(thisMutamer.PlaceOfBirth));
    await typeText('#txtstreet', decodeURI(thisMutamer.PlaceOfBirth));
    await typeText('#txtppisscity', decodeURI(thisMutamer.IssuePlace));

    await typeText('#txtppissdd', thisMutamer.IssueDate.substring(0, 2));
    await typeText('#txtppissyy', thisMutamer.IssueDate.substring(6));
    const month = thisMutamer.IssueDate.substring(3, 5);
    if (month.startsWith('0')) {
        await selectByValue('#ddlppissmm', month.substring(1));
    } else {
        await selectByValue('#ddlppissmm', month);
    }




    await page.waitForNavigation();

    if (thisMutamer.Relationship) {
        await page.select('#ddlrelation', thisMutamer.Relationship);
    }

        await page.click('#btn_uploadImage');



        await page.waitForSelector('#btnClose_photo');
        try {
            await page.click('#btnClose_photo');
            await page.waitForNavigation();
        } catch (error) {
            console.log(error);
        }
        

       
    }

}

