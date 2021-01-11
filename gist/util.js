function findConfig(url, config) {
    let lowerUrl = url.toLowerCase();
    const urlConfig = config.find(
      (x) =>
        x.url.toLowerCase() === lowerUrl ||
        (x.regex && RegExp(x.regex.toLowerCase()).test(lowerUrl))
    );
    if (urlConfig) {
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
  module.exports = {findConfig, commit}