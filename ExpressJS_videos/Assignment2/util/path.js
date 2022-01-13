const path = require('path');
module.exports = path.dirname(require.main.filename);
// I have this path.js file becuase I had a body-parser warning:
// "body-parser deprecated undefined extended: provide extended option assignment2.js:12:20"