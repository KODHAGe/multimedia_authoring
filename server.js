var fs = require('fs');
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 8079
  });
console.log("Listening on port 8079");

var count = 0;
wss.on('connection', function connection(ws) {
  count++;
  console.log(count);
  ws.on('message', function incoming(message) {
    if (message == "controller") {
      console.log("controller connected")
    }
    console.log('received: %s', message);
    wss.clients.forEach(function each(
      client) {
      console.log("broadcasting: " + message);
      client.send(message);
    });
  });
});

wss.on('disconnect', function() {
  count--;
})
