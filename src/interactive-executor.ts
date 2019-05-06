import * as inquirer from "inquirer";
import ora from "ora";

import { actionsGetter, servicesGetter, outputConverter } from "./interactive-executor/index";

export const executeInteractively = async () => {
  const servicesSpinner = ora("getting services...").start();
  const gotServices = await servicesGetter.getServices();
  servicesSpinner.stop();

  const { service } = await inquirer.prompt([
    {
      type: "list",
      name: "service",
      message: "Select a service (the following is supported services)",
      choices: gotServices.map((service) => ({ name: service.name, value: service, short: service.name })),
      pageSize: 20,
    },
  ]);

  const actionsSpinner = ora("getting actions...").start();
  const gotActions = await actionsGetter.getActions(service);
  actionsSpinner.stop();

  const { isNeededChoice }: { isNeededChoice: boolean } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isNeededChoice",
      message: "Do you want to choose actions?",
      default: false,
    },
  ]);
  let actions = gotActions;
  if (isNeededChoice) {
    const result: { actions: actionsGetter.Action[] } = await inquirer.prompt([
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

  const {
    columns,
    outputType,
  }: { columns: (keyof actionsGetter.Action)[]; outputType: outputConverter.ConvertableType } = await inquirer.prompt([
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

  let outputActions: string[] | Record<keyof actionsGetter.Action, any>[];
  if (columns.length === 1) {
    const column = columns[0];
    outputActions = actions.map((action: actionsGetter.Action) => action[column]!);
  } else {
    outputActions = actions.map((action: actionsGetter.Action) =>
      columns.reduce<Record<keyof actionsGetter.Action, any>>(
        (object, column) => {
          object[column] = action[column];

          return object;
        },
        {} as any,
      ),
    );
  }

  console.log("\n");
  console.log(outputConverter.convert(outputType, outputActions));
};
