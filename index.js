// let's just build a small server to test the PWA serviceWorker functionality in prod
// this whole file/server struture will be refactored when data begins to get more complex and with graphQL
var express = require('express');
var axios = require('axios');

var app = express();
var url = 'https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=' + process.env.REACT_APP_WG_KEY;

require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
  'mongodb://localhost/wows-battle-guide2');

app.use(express.static('build'));

app.get(['/'], function (req, res) {
  console.log("entry url");
  res.sendFile(__dirname + '/build/index.html');
});


// data routes
app.get('/api/ships', function (req, res) {
  console.log("get ships from mongo db");
  db
    .find({})
    .exec(function(err, ships){
      if (err || !ships || !ships.length) {
        return res.status(404).send({message: 'Ships not found.'});
      }
      res.send(ships);
    });
});

app.get('/api/artillaryModules', function (req, res) {
  console.log("get artillary from mongo db");
  db
    .find({})
    .exec(function(err, artillary){
      if (err || !artillary || !artillary.length) {
        return res.status(404).send({message: 'Ships not found.'});
      }
      res.send(artillary);
    });
});


app.get('/api/updateShips', function (req, res) {
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
        createShip(shipStore);
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
            createShip(shipStore);
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

app.get('/api/updateArtillaryModules', function (req, res) {
  console.log("get artillary modules pinged");
  //need to finish updating terminology from ship to artillary module
  let artillaryStore = [];
  let pageCount = 1;

  axios.get('https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id=' + process.env.REACT_APP_WG_KEY + '&type=Artillery&page_no=1')
    .then((resJson) => {
      console.log("axios through", resJson);
      function convertObjectToArray(resJsonData) {
        return Object.keys(resJsonData).map(function(k) {
          return resJsonData[k]
        });
      }
      return convertObjectToArray(resJson.data.data);
    }).then((artillaryList) => {
      artillaryStore = artillaryStore.concat(artillaryList);
      if (artillaryList.length < 100) {
        console.log("sending artillary");
        res.send(artillaryStore);
        createArtillary(artillaryStore);
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
      axios.get('https://api.worldofwarships.com/wows/encyclopedia/modules/?application_id=' + process.env.REACT_APP_WG_KEY + '&type=Artillery&page_no=' + n)
        .then((resJson) => {
          function convertObjectToArray(resJsonData) {
            return Object.keys(resJsonData).map(function(k) {
              return resJsonData[k]
            });
          }
          return convertObjectToArray(resJson.data.data);
        }).then((artillaryList) => {
          artillaryStore = artillaryStore.concat(artillaryList);
          if (artillaryList.length < 100) {
            console.log("sending artillary");
            createArtillary(artillaryStore);
            res.send(artillaryStore);
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

var db = require('./models/ship');
var dba = require('./models/artillary');
    // Ship = db.Ship;

function index(req, res) {
  db
    .find({})
    .populate('user')
    .exec(function(err, ship){
      if (err || !ship || !ship.length) {
        return res.status(404).send({message: 'Ships not found.'});
      }
      res.send(ship);
    });
}

function createShip(ships_list) {
db.remove({}, function(err, ships){
  if(err) {
    console.log('Error occurred in ships remove', err);
  } else {
    console.log('removed all ships');
console.log("ships list", db.Ship, "ships list");
    db.create(ships_list, function(err, ships){
      if (err) { return console.log('err', err); }
      console.log("created", ships.length, "ships");
      // process.exit();
    });
  }
});
}

function createArtillary(artillary_list) {
dba.remove({}, function(err, artillary){
  if(err) {
    console.log('Error occurred in artillary remove', err);
  } else {
    console.log('removed all artillary');
console.log("artillary list", artillary_list, "artillary list");
    dba.create(artillary_list, function(err, artillary){
      if (err) { return console.log('err', err); }
      console.log("created", artillary.length, "artillary");
      // process.exit();
    });
  }
});
}

// catch all
app.get(['/*'], function (req, res) {
  console.log("base url redirect");
  res.redirect(req.baseUrl + '/');
});

var port = process.env.PORT || 3001 || 3000;
app.listen(port, function () {
  console.log('node express frontend up on port ' + port);
});
