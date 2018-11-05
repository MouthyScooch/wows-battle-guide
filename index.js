// let's just build a small server to test the PWA serviceWorker functionality in prod
var express = require('express');
var axios = require('axios');

var app = express();

require('dotenv').config();

app.use(express.static('build'));

app.get(['/'], function (req, res) {
  console.log("entry url");
  res.sendFile(__dirname + '/build/index.html');
});


// data routes
app.get('/ships', function (req, res) {
  console.log("get ships pinged");
  axios.get('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY)
    .then(function(response) {
      console.log("WG response", response);
      return response;
    })
    .then(function(myJson) {
      res.send(myJson.data.data);
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
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
