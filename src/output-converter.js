const convertUndefinedToNull = (_, value) => {
  if (value === undefined) return null;

  return value;
}

const convert = (type, body) => {
  switch (type) {
    case "json":
      return JSON.stringify(body, convertUndefinedToNull, 2);
    default:
  }
};

module.exports = { convert };
