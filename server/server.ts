// npm i express @types/express ;must install both packages to make TS work with express
import express = require('express');

// TS way to set the variable for app
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

// NOTES
// 'npm run tsc' to create the build folder with JS files
// then 'node build/server/server.js' to display on browser
// run without transpiling 'npm install ts-node-dev -D' and use 'npm run dev' works similar to nodemon
