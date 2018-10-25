// let's just build a small server to test the PWA serviceWorker functionality in prod
var express = require('express');

var app = express();

app.use(express.static('build'));

app.get(['/'], function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get(['/*'], function (req, res) {
  res.redirect(req.baseUrl + '/');
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('node express frontend up on port ' + port);
});
