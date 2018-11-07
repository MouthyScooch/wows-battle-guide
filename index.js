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

  axios.get('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY + '&page_no=1')
    .then(function(response) {
      // console.log("WG response", response.data);
      return response;
    })
    .then(function(myJson) {
      console.log("myJson", myJson, "myJson");
      function convertObjectToList(myJson) {
          return Object.keys(myJson).map(function(k) {
            return [k, myJson[k]]
          });
// working to convert four sets of objects of objects to one big array of objects for response to front end
      }
      let resObj = convertObjectToList(myJson.data.data);
      console.log("resObj", resObj, "resObj");

      res.send(resObj);
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
});


// function getAllShips() {
//   axios.get('https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY + '&page_no=' + n)
//     .then(function(response) {
//       if (!response.error) {
//         allShips = Object.assign({}, response.data);
//         console.log("allShips", allShips, "allShips");
//         getAllShips();
//       } else {
//         res.send(allShips);
//       }
//     })
//     .catch(function(err) {
//       console.log('Fetch Error :-S', err);
//     });
// }
// var shipPageCount = 1;
// var allShips = {};
// app.get('/ships', function (req, res) {
//   //i want all the Ships
//   //have to ping their server an unspecified number of times
//   //break iteration on error response?
//   axios.get(url + '&page_no=' + '1'))
//   .then(function (response) {
//     // handle success
//     // allShips = Object.assign({}, response.data.data);
//     console.log(response.data.data[3760142160], "response.data.data");
//     shipPageCount++;
//
//   })
//   .then(
//     axios.get('/ships')
//   )
//   .catch(function (error) {
//     // handle error
//     res.send(allShips);
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// });

// catch all
app.get(['/*'], function (req, res) {
  console.log("base url redirect");
  res.redirect(req.baseUrl + '/');
});

var port = process.env.PORT || 3001 || 3000;
app.listen(port, function () {
  console.log('node express frontend up on port ' + port);
});
