const request = require("request-promise-native");
const cheerio = require("cheerio");

const documentURIBasePath = "https://docs.aws.amazon.com/IAM/latest/UserGuide";
const listURI = `${documentURIBasePath}/reference_policies_actions-resources-contextkeys.html`;

const getServices = async () => {
  const rawHTML = await request({ method: "get", url: listURI });
  const $ = cheerio.load(rawHTML);

  const services = [];
  $(".highlights ul li a").each((_, element) => {
    const $element = $(element);

    const name = $element.text().trim();

    const code = (() => {
      const href = $element.attr("href");
      if (href == undefined) return;

      return href.match(/^list_(.*?)\.html$/)[1];
    })();
    if (code == undefined) return;

    const documentURI = (() => {
      const href = $element.attr("href");
      if (href == undefined) return;

      return `${documentURIBasePath}/${href.trim()}`;
    })();
    if (documentURI == undefined) return;

    services.push({ name, code, documentURI });
  });

  return services;
};

module.exports = { getServices, listURI };
