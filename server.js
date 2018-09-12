const express = require('express');
let app = null;

const init = () => {
  app = express();

  app.get('/', function (req, res) {
    res.send('hello world')
  });

  app.listen(3000, () => console.log('Example app listening on port 3000!'));
};

module.exports = {
  startServer: init,
  server: app
};
