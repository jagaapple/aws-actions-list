"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const cheerio = require("cheerio");
const escapeStringRegexp = require("escape-string-regexp");
exports.getActions = (service) => __awaiter(this, void 0, void 0, function* () {
    const rawHTML = yield request({ method: "get", url: service.documentURI });
    const $ = cheerio.load(rawHTML);
    const prefix = `${service.code}-`;
    const servicePrefix = $("#main-col-body code.code")
        .first()
        .text();
    const actions = [];
    $(`a[id^="${prefix}"]`).each((_, element) => {
        const $element = $(element);
        const escapedRegExpString = escapeStringRegexp(prefix);
        const name = (() => {
            const actionName = $element
                .attr("id")
                .replace(new RegExp(`^${escapedRegExpString}`), "")
                .trim();
            if (actionName.length === 0)
                return;
            const isCamelCase = actionName[0] === actionName[0].toUpperCase();
            if (!isCamelCase)
                return;
            return `${servicePrefix}:${actionName}`;
        })();
        if (name == undefined)
            return;
        const description = (() => {
            const descriptionAnchorElement = $element.parent().next();
            const text = descriptionAnchorElement.text().replace(/[\n\s]+/g, " ");
            return text.trim() || undefined;
        })();
        const documentURI = (() => {
            const uriAnchorElement = $element.next();
            const href = uriAnchorElement.attr("href");
            if (href == undefined)
                return;
            return href.trim() || undefined;
        })();
        actions.push({ name, description, documentURI });
    });
    return actions;
});
