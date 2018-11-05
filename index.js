// let's just build a small server to test the PWA serviceWorker functionality in prod
var express = require('express');

var app = express();

app.use(express.static('build'));

app.get(['/'], function (req, res) {
  console.log("entry url");
  res.sendFile(__dirname + '/build/index.html');
});


// data routes
app.get('/ships', function (req, res) {
  let ship = {ship: "ships"};
  let shipjson = JSON.stringify(ship);

  res.send(shipjson);
});

// catch all
app.get(['/*'], function (req, res) {
  console.log("base url redirect");
  res.redirect(req.baseUrl + '/');
});

var port = process.env.PORT || 3001 || 3000;
app.listen(port, function () {
  console.log('node express frontend up on port ' + port);
});
