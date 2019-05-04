const { getActions } = require("./actions-getter");

(async () => {
  const sourceDefinition = require("./source-definitions/s3.json");
  const actions = await getActions(sourceDefinition);

  console.log(actions);
})();
