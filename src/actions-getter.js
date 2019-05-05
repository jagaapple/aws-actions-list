const request = require("request-promise-native");
const cheerio = require("cheerio");
const escapeStringRegexp = require("escape-string-regexp");

const getSourceURI = (sourceDefinition) =>
  `https://docs.aws.amazon.com/IAM/latest/UserGuide/list_${sourceDefinition.serviceCode}.html`;

const getActions = async (sourceDefinition) => {
  const rawHTML = await request({ method: "get", url: getSourceURI(sourceDefinition) });
  const $ = cheerio.load(rawHTML);
  const prefix = `${sourceDefinition.serviceCode}-`;

  const actions = [];

  $(`a[id^="${prefix}"]`).each((_, element) => {
    const $element = $(element);
    const escapedRegExpString = escapeStringRegexp(prefix);

    const name = (() => {
      const actionName = $element.attr("id").replace(new RegExp(`^${escapedRegExpString}`), "").trim();
      if (actionName.length === 0) return;
      const isCamelCase = actionName[0] === actionName[0].toUpperCase();
      if (!isCamelCase) return;

      return `${sourceDefinition.servicePrefix}:${actionName}`;
    })();
    if (name == undefined) return;

    const description = (() => {
      const descriptionAnchorElement = $element.parent().next();
      if (descriptionAnchorElement == undefined) return;
      const text = descriptionAnchorElement.text().replace(/[\n\s]+/g, " ");

      return text.trim() || undefined;
    })();

    const documentURI = (() => {
      const uriAnchorElement = $element.next();
      if (uriAnchorElement == undefined) return;
      const href = uriAnchorElement.attr("href");
      if (href == undefined) return;

      return href.trim() || undefined;
    })();

    actions.push({ name, description, documentURI });
  });

  return actions;
};

module.exports = { getActions, getSourceURI };
