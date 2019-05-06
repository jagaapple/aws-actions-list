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
const inquirer = require("inquirer");
const ora_1 = require("ora");
const index_1 = require("./interactive-executor/index");
exports.executeInteractively = () => __awaiter(this, void 0, void 0, function* () {
    const servicesSpinner = ora_1.default("getting services...").start();
    const gotServices = yield index_1.servicesGetter.getServices();
    servicesSpinner.stop();
    const { service } = yield inquirer.prompt([
        {
            type: "list",
            name: "service",
            message: "Select a service (the following is supported services)",
            choices: gotServices.map((service) => ({ name: service.name, value: service, short: service.name })),
            pageSize: 20,
        },
    ]);
    const actionsSpinner = ora_1.default("getting actions...").start();
    const gotActions = yield index_1.actionsGetter.getActions(service);
    actionsSpinner.stop();
    const { isNeededChoice } = yield inquirer.prompt([
        {
            type: "confirm",
            name: "isNeededChoice",
            message: "Do you want to choose actions?",
            default: false,
        },
    ]);
    let actions = gotActions;
    if (isNeededChoice) {
        const result = yield inquirer.prompt([
            {
                type: "checkbox",
                name: "actions",
                message: "Select actions",
                choices: actions.map((action) => {
                    let uri = "";
                    if (action.documentURI != undefined)
                        uri = `  -  ${action.documentURI}`;
                    return { name: action.name + uri, value: action, short: action.name };
                }),
                pageSize: 20,
            },
        ]);
        actions = result.actions;
    }
    const { columns, outputType, } = yield inquirer.prompt([
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
    let outputActions;
    if (columns.length === 1) {
        const column = columns[0];
        outputActions = actions.map((action) => action[column]);
    }
    else {
        outputActions = actions.map((action) => columns.reduce((object, column) => {
            object[column] = action[column];
            return object;
        }, {}));
    }
    console.log("\n");
    console.log(index_1.outputConverter.convert(outputType, outputActions));
});
