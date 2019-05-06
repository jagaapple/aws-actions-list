"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const convertUndefinedToNull = (_, value) => {
    if (value === undefined)
        return null;
    return value;
};
exports.convert = (type, body) => {
    switch (type) {
        case "json":
            return JSON.stringify(body, convertUndefinedToNull, 2);
        case "yaml":
            return yaml.safeDump(body);
        default:
    }
};
