/*global __dirname*/

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { cli } = require("cli-ux");
const { getActions, getSourceURI } = require("./actions-getter");

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

  cli.action.start(`getting actions (from ${getSourceURI(sourceDefinition)} )`);
  const gotActions = await getActions(sourceDefinition);
  cli.action.stop();

  const { isNeededChoice } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isNeededChoice",
      message: "Do you want to choose actions?",
      default: false,
    },
  ]);
  let actions = gotActions;
  if (isNeededChoice) {
    const result = await inquirer.prompt([
      {
        type: "checkbox",
        name: "actions",
        message: "Select actions",
        choices: actions.map((action) => {
          let uri = "";
          if (action.documentURI != undefined) uri = `  -  ${action.documentURI}`;

          return { name: action.name + uri, value: action, short: action.name };
        }),
        pageSize: 20,
      },
    ]);
    actions = result.actions;
  }

  const { columns, outputType } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "columns",
      message: "Select columns",
      choices: Object.keys(gotActions[0]),
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
