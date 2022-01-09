const { rejects } = require('assert');
const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url; //localhost url?
  const method = req.method; 

  
  if (url === '/') { //blank input
    res.setHeader('Content-Type','text-html');
    res.write('<html>');
    res.write('<head><title>Greetings</title></head>');
    res.write('<body>\
    <h1>Hellow User!</h1>\
    <h3>Please input your name!</h3>\
    Name<form action="/create-user" method="POST">\
    <input type="text" name="username">\
    <button type="submit">Create Username</button>\
    </input>\
    </form>\
    </body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type','text-html');
    res.write('<html>');
    res.write('<head><title>List of Users</title></head>');
    res.write('<body>\
    <h1>Users</h1>\
    <ul>\
    <li>User1</li>\
    <li>User2</li>\
    <li>User3</li>\
    <li>User4</li>\
    <li>User5</li>\
    </ul>\
    </body>')
    res.write('</html>')
  }
  if ((url === '/create-user') && (method === 'POST')) {
    const body = [];
    req.on('data',(inputFrag) => {
      body.push(inputFrag);
      console.log(inputFrag, 'inputFrag');
      console.log(body, 'body');
    });
    return req.on('end', ()=> {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1]; // username=what-the-user-entered
      console.log(message);
      res.setHeader('Content-Type','text-html');
      res.write('<html>')
      res.write(`<h1>Hellow ${message}</h1>`)
      res.write('<form action=" cd.. /user" method="POST">\
      <button type="submit">See Other Users</button>\
      <p>Note: the button does not work. Just go back to localhost:5000 page and add "/users" to the URL </p>\
      </form>'
      )
      res.write('</html>')
      // fs.writeFile('message.txt', message, err => {
      //   res.statusCode = 302;
      //   res.setHeader('Locatioin','/create-user')
      return res.end();
      // })
    })
  }
};

module.exports = requestHandler;