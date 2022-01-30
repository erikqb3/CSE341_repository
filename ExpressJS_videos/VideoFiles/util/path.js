const path = require('path');

// module.exports = path.dirname(process.mainModule.filename); //Warning: 'mainModule' is deprecated. switch to (require.main.filename)
// module.exports = path.dirname(process.mainModule.filename) //The inner text gives us the path that is responsible for the fact that our application is running
module.exports = path.dirname(require.main.filename);
// console.log(path.dirname(require.main.filename), "PATH.DIRNAME, Path.js, 6");