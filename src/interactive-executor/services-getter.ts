import * as request from "request-promise-native";
import * as cheerio from "cheerio";

const documentURIBasePath = "https://docs.aws.amazon.com/IAM/latest/UserGuide";
export const listURI = `${documentURIBasePath}/reference_policies_actions-resources-contextkeys.html`;

export type Service = {
  name: string;
  code: string;
  documentURI: string;
};

export const getServices = async () => {
  const rawHTML: string = await request({ method: "get", url: listURI });
  const $ = cheerio.load(rawHTML);

  const services: Service[] = [];
  $(".highlights ul li a").each((_: unknown, element: CheerioElement) => {
    const $element = $(element);

    const name = $element
      .text()
      .replace(/^(AWS|Amazon)\s*/, "")
      .trim();

    const code = (() => {
      const href = $element.attr("href");
      const matches = href.match(/^list_(.*?)\.html$/);
      if (matches == undefined) return;

      return matches[1];
    })();
    if (code == undefined) return;

    const documentURI = (() => {
      const href = $element.attr("href");

      return `${documentURIBasePath}/${href.trim()}`;
    })();

    services.push({ name, code, documentURI });
  });

  return services;
};
