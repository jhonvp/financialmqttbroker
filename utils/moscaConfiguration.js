var mosca = require("mosca");

module.exports = {
  port: 4883,
  // host: "127.0.0.1", // specify an host to bind to a single interface
  id: "stock", // used to publish in the $SYS/<id> topicspace
  stats: true, // publish stats in the $SYS/<id> topicspace
  logger: {
    level: "info",
  },
  backend: {
    type: "mongo",
    url:
      "mongodb://financialchatapp:test1234@ds013848.mlab.com:13848/financialchat",
    pubsubCollection: "mqtt",
    mongo: {},
  },
  persistence: {
    factory: mosca.persistence.Mongo,
    url:
      "mongodb://financialchatapp:test1234@ds013848.mlab.com:13848/financialchat",
  },
};
