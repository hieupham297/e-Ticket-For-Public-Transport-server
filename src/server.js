const app = require("./app");

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "\n⚡ App is running at http://localhost:%d in %s mode ⚡\n",
    app.get("port"),
    app.get("env")
  );
  console.log("⚡ Press CTRL-C to stop ⚡\n");
});

module.exports = server;
