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

  module.exports = {findConfig}