const path = require("path");
const mqtt = require("mqtt");
const MQTT_URL = "mqtt://localhost:4883";
const assert = require("assert");
let moscaServer;
let moscaClient;

describe("Testing mqqt broker", function () {
  this.timeout(10000);

  before((done) => {
    moscaServer = require(path.join(__dirname, "..", "financialmqttbroker"));
    moscaServer.on("ready", () => {
      moscaClient = mqtt.connect(MQTT_URL);
      moscaClient.on("error", (err) => {
        done(err);
      });
      moscaClient.on("connect", () => {
        done();
      });
    });
  });

  after((done) => {
    moscaClient.end(true, () => {
      moscaClient = null;
      moscaServer.close(() => {
        moscaServer = null;
        done();
      });
    });
  });

  it("Subscribe, publish and receive message via mqqt server", (done) => {
    moscaClient.on("message", function (topic, message) {
      assert.equal("Testing Message", message.toString());
      done();
    });
    moscaClient.subscribe("#", { qos: 1 }, function (err, granted) {
      if (err) {
        done(err);
      } else {
        moscaClient.publish("#", "Testing Message");
      }
    });
  });
});
