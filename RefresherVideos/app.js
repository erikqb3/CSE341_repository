const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => { //middleware
  console.log("In the middleware");
  next(); // skips to next middleware
});

app.use((req, res, next) => { //middleware
  console.log("In another middleware");
  // next();
});

const server = http.createServer(app);

server.listen(5000);


// console.log(routes.someText);
// const server = http.createServer(routes.handler)


// const fs = require('fs'); //file system


// function rqListener(req, res) { //req -> request, res - response
// }
// http.createServer(rqListener); //option1

// http.createServer(function(req,res){}); //option2

// const server = http.createServer((req,res) => {
  // console.log(req, req.url, req.method, req.headers);
  // process.exit(); //closes server
  // const url = req.url;
  // const method = req.method;

//  //moved to routes.js
//   if (url === '/') { //if there is not text after localhost:3000/
//     // console.log(req, req.url, req.method, req.headers);
//     res.write('<html>');
//     res.write('<head><title>Enter Message</title><head>');
//     res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
//     res.write('</html>');
//     return res.end();
//   }
//   if ((url === '/message') && (method === 'POST')) {
//     // console.log("HI")
//     // console.log(req, req.url, req.method, req.headers);
//     const body = [];
//     req.on('data',(chunk)=> { //listen for data event, will be fired whenever new check is to be read
//       console.log(chunk);
//       body.push(chunk); //editing the data of the object, not the value itself
//     }); //allows us to listen for certain events, the data event in this cas
//     return req.on('end', () => { //listen for end event, waits, is asynchronous
//       // return this so the stuff at the bottom doesn't come too early
//       const parsedBody = Buffer.concat(body).toString();
//       console.log(parsedBody);
//       const message = parsedBody.split('=')[1];
//       fs.writeFileSync('message.txt', message); //Sync will block code execution until file is created
//       fs.writeFile('message.txt', message, err => { // (err) = error response
//         res.statusCode = 302;
//         res.setHeader('Location', '/'); //automatically use host we are already running on
//         return res.end();
//       });
//     })
//   }
//   res.setHeader('Content-Type','text/html'); //attach header to response which passes metainfo which says the content that will be written is html
//   res.write('<html>')
//   res.write('<head><title>My First Page</title><head>')
//   res.write('<body><h1>Hellow from my Node.js Server!</h1></body>')
//   res.write('</html>')
//   res.end();
// });

// server.listen(3000); //localhost:3000