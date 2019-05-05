const convertUndefinedToNull = (_, value) => {
  if (value === undefined) return null;

  return value;
}

const convert = (type, body) => {
  switch (type) {
    case "json":
      return JSON.stringify(body, convertUndefinedToNull, 2);
    case "yaml":
      const YAML = require("yaml");
      const { strOptions } = require("yaml/types");

      strOptions.fold.lineWidth = 0;

      return YAML.stringify(body);
    default:
  }
};

module.exports = { convert };
