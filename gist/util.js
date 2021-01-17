function findConfig(url, config) {
  let lowerUrl = url.toLowerCase();
  const urlConfig = config.find(
    (x) =>
      x.url.toLowerCase() === lowerUrl ||
      (x.regex && RegExp(x.regex.toLowerCase()).test(lowerUrl))
  );
  if (urlConfig) {
    console.log(
      "%c 🍾 urlConfig: ",
      "font-size:20px;background-color: #B03734;color:#fff;",
      urlConfig.name
    );
    return urlConfig;
  }
  return {};
}

async function commit(page, structure, info) {
  for (const element of structure) {
    await page.waitForSelector(element.selector);
    let value;
    if (element.value) {
      value = element.value(info);
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
        await page.select(element.selector, value);
        break;
      default:
        break;
    }
  }
}

async function controller(page, structure, travellers) {

  const options = travellers.map((t,i)=> `<option value="${i}">${i} - ${t.name.full}</option>`).join(' ')
  if (!structure.controller || !structure.controller.selector) {
    return;
  }
await page.evaluate((p)=> {
  const controller = p[0].controller;
  const container = document.querySelector(controller.selector);
  container.innerHTML = `<div style='background-color: #CCCCCC; border: 1px solid black; border-radius: 16px; display: flex; align-items: center;width: 100%; justify-content: space-between'> <h6> HAJonSoft </h6> <select onchange="">` + 
  p[1] +
  `</select>` + 
  `<button style='background-color: #666666; color: #ffffff'>Send</button> </div>`

},[structure, options])

}
module.exports = { findConfig, commit, controller };
