import request from "request-promise-native";
import cheerio from "cheerio";
import escapeStringRegexp from "escape-string-regexp";

import { Service } from "./services-getter";

export type Action = {
  name: string;
  description?: string;
  documentURI?: string;
};

export const getActions = async (service: Service) => {
  const rawHTML: string = await request({ method: "get", url: service.documentURI });
  const $ = cheerio.load(rawHTML);
  const prefix = `${service.code}-`;

  const servicePrefix = $("#main-col-body code.code")
    .first()
    .text();
  const actions: Action[] = [];

  $(`a[id^="${prefix}"]`).each((_: unknown, element: CheerioElement) => {
    const $element = $(element);
    const escapedRegExpString = escapeStringRegexp(prefix);

    const name = (() => {
      const actionName = $element
        .attr("id")
        .replace(new RegExp(`^${escapedRegExpString}`), "")
        .trim();
      if (actionName.length === 0) return;
      const isCamelCase = actionName[0] === actionName[0].toUpperCase();
      if (!isCamelCase) return;

      return `${servicePrefix}:${actionName}`;
    })();
    if (name == undefined) return;

    const description = (() => {
      const descriptionAnchorElement = $element.parent().next();
      const text = descriptionAnchorElement.text().replace(/[\n\s]+/g, " ");

      return text.trim() || undefined;
    })();

    const documentURI = (() => {
      const uriAnchorElement = $element.next();
      const href = uriAnchorElement.attr("href");

      return href.trim() || undefined;
    })();

    actions.push({ name, description, documentURI });
  });

  return actions;
};
