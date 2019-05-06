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
const documentURIBasePath = "https://docs.aws.amazon.com/IAM/latest/UserGuide";
exports.listURI = `${documentURIBasePath}/reference_policies_actions-resources-contextkeys.html`;
exports.getServices = () => __awaiter(this, void 0, void 0, function* () {
    const rawHTML = yield request({ method: "get", url: exports.listURI });
    const $ = cheerio.load(rawHTML);
    const services = [];
    $(".highlights ul li a").each((_, element) => {
        const $element = $(element);
        const name = $element.text().trim();
        const code = (() => {
            const href = $element.attr("href");
            const matches = href.match(/^list_(.*?)\.html$/);
            if (matches == undefined)
                return;
            return matches[1];
        })();
        if (code == undefined)
            return;
        const documentURI = (() => {
            const href = $element.attr("href");
            return `${documentURIBasePath}/${href.trim()}`;
        })();
        services.push({ name, code, documentURI });
    });
    return services;
});
