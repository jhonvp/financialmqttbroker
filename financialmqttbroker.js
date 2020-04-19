const mosca = require("mosca");
const path = require("path");
const moscaSettings = require(path.join(
  __dirname,
  "utils",
  "moscaConfiguration"
));
const log = require(path.join(__dirname, "utils", "logConfiguration"));

const server = new mosca.Server(moscaSettings);
server.on("ready", setup);

// fired when the mqtt server is ready
function setup() {
  log.debug("Mosca server is up and running");

  // fired when a client connects
  server.on("clientConnected", function (client) {
    log.debug("Client Connected:", client.id);
  });

  // fired when a client disconnects
  server.on("clientDisconnected", function (client) {
    log.debug("Client Disconnected:", client.id);
  });
}
