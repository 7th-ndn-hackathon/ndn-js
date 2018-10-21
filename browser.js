module.exports = Object.assign(
  require("./index.js"),
  {
    WebSocketTransport: require("./js/transport/web-socket-transport.js").WebSocketTransport,
  }
);
