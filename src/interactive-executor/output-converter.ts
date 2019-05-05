import * as yaml from "js-yaml";

const convertUndefinedToNull = (_: unknown, value: undefined | null) => {
  if (value === undefined) return null;

  return value;
};

export type ConvertableType = "json" | "yaml";

export const convert = (type: ConvertableType, body: string[] | Record<string, any>) => {
  switch (type) {
    case "json":
      return JSON.stringify(body, convertUndefinedToNull, 2);
    case "yaml":
      return yaml.safeDump(body);
    default:
  }
};
