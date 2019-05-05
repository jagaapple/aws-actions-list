const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { getActions } = require("./actions-getter");

const supportedServiceNames = fs
  .readdirSync(path.join(__dirname, "source-definitions"))
  .map((filename) => filename.split(".")[0]);

(async () => {
  const { service } = await inquirer.prompt([
    {
      type: "list",
      name: "service",
      message: "Select a service (the following is supported services)",
      choices: supportedServiceNames,
    },
  ]);
  const sourceDefinition = require(path.join(__dirname, "source-definitions", `${service}.json`));
  const actions = await getActions(sourceDefinition);

  const { columns, outputType } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "columns",
      message: "Select columns",
      choices: Object.keys(actions[0]),
      default: ["name"],
    },
    {
      type: "list",
      name: "outputType",
      message: "Select an output type",
      choices: ["json", "yaml"],
      default: "json",
    },
  ]);

  const { convert } = require("./output-converter");

  let outputActions;
  if (columns.length === 1) {
    const column = columns[0];
    outputActions = actions.map((action) => action[column]);
  } else {
    outputActions = actions.map((action) => {
      return columns.reduce((object, column) => {
        object[column] = action[column];

        return object;
      }, {});
    });
  }

  console.log("\n");
  console.log(convert(outputType, outputActions));
})();
