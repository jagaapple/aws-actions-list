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

  console.log(actions);
})();
