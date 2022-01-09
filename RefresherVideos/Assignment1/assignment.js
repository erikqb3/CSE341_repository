const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);

console.log("I used localhost:5000")

server.listen(5000);
