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
const Collection = require("./models/collection");
const Shoe = require("./models/item");

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

router.get("/collections", (req, res) => {
  Collection.find({ id: req.query.id }).then((collections) => {
    res.send(collections);
  });
});

router.get("/trending", (req, res) => {
  Shoe.find({ tag: "trending" }).then((trending) => {
    res.send(trending);
  });
});

router.get("/latest", (req, res) => {
  Shoe.find({ tag: "latest" }).then((latest) => {
    res.send(latest);
  });
});

router.get("/recommended", (req, res) => {
  Shoe.find({ tag: "recommended", userId: req.query.id }).then((recommended) => {
    res.send(recommended);
  });
});

router.get("/recents", (req, res) => {
  Shoe.find({ tag: "recents", userId: req.query.id }).then((recents) => {
    res.send(recents);
  });
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
