// let's just build a small server to test the PWA serviceWorker functionality in prod
var express = require('express');
var axios = require('axios');

var app = express();
var url = 'https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY;

require('dotenv').config();

app.use(express.static('build'));

app.get(['/'], function (req, res) {
  console.log("entry url");
  res.sendFile(__dirname + '/build/index.html');
});


// data routes
app.get('/api/ships', function (req, res) {
  console.log("get ships pinged");
  let shipStore = [];
  let pageCount = 1;

  axios.get('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY + '&page_no=1')
    .then((resJson) => {
      function convertObjectToArray(resJsonData) {
        return Object.keys(resJsonData).map(function(k) {
          return resJsonData[k]
        });
      }
      return convertObjectToArray(resJson.data.data);
    }).then((shipList) => {
      shipStore = shipStore.concat(shipList);
      if (shipList.length < 100) {
        console.log("sending ships");
        res.send(shipStore);
      } else {
        pageCount++;
        getNextPage(pageCount);
      }
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
    // refactor to pick up data from dedicated DB, GET WG API data and transpose to dedicated DB
    function getNextPage(n) {
      axios.get('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY + '&page_no=' + n)
        .then((resJson) => {
          function convertObjectToArray(resJsonData) {
            return Object.keys(resJsonData).map(function(k) {
              return resJsonData[k]
            });
          }
          return convertObjectToArray(resJson.data.data);
        }).then((shipList) => {
          shipStore = shipStore.concat(shipList);
          if (shipList.length < 100) {
            console.log("sending ships");
            res.send(shipStore);
          } else {
            pageCount++;
            getNextPage(pageCount);
          }
        })
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    }
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
