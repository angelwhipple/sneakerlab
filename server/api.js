/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Shoe = require("./models/shoe");
const Collection = require("./models/collection");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// update user search history w/ last search query (works now)
router.post("/search", (req, res) => {
  User.findByIdAndUpdate(req.body.id, { $push: { searches: req.body.searchQuery } }).then(
    res.send({})
  );
});

// for rendering profile page
router.get("/usercollections", (req, res) => {
  Collection.find({ creator: req.query.creator }).then((collections) => {
    res.send(collections);
  });
});

router.get("/searchresults", (req, res) => {
  const getResults = async () => {
    await sneaks.getProducts(req.query.searchQuery, 10, (err, products) => {
      res.send(products);
    });
  };

  getResults();
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
