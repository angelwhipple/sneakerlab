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
const { ProgressPlugin } = require("webpack");
const { response } = require("express");

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

// get product results from sneakers API
router.get("/searchresults", (req, res) => {
  sneaks.getProducts(req.query.searchQuery, 100, (err, products) => {
    res.send(products);
  });
});

// get a user by ID
router.get("/getuser", (req, res) => {
  User.findOne({ _id: req.query.id }).then((userObj) => {
    res.send(userObj);
  });
});

// update user search history w/ last search query
router.post("/search", (req, res) => {
  User.findByIdAndUpdate(req.body.id, { $push: { searchHistory: req.body.searchQuery } }).then(
    res.send({})
  );
});

// find & send users with names matching search query
router.get("/userresults", (req, res) => {
  User.find({ displayName: { $regex: req.query.searchQuery, $options: "-i" } }).then((userObjs) => {
    res.send(userObjs);
  });
});

// update user profile info
router.post("/updateprofile", (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $set: { displayName: req.body.newName, about: req.body.newAbout, pfp: req.body.newPfp },
  }).then((user) => {
    socketManager
      .getIo()
      .emit("profile", { name: req.body.newName, about: req.body.newAbout, pfp: req.body.newPfp });
    res.send({});
  });
});

// get a user's collection data
router.get("/usercollections", (req, res) => {
  Collection.find({ creator: req.query.id }).then((collectionObjs) => {
    res.send(collectionObjs);
  });
});

// create new collection
router.post("/createcollection", (req, res) => {
  const newCollection = new Collection({
    creator: req.body.id,
    name: req.body.name,
    shoes: [],
  });
  newCollection.save();
  socketManager.getIo.emit("collection", newCollection);
  res.send({});
});

// save a shoe to user view history
router.post("/savetoclickhistory", (req, res) => {
  const newShoe = new Shoe({
    shoeName: req.body.shoeName,
    release: req.body.release,
    colorway: req.body.colorway,
    image: req.body.image,
  });
  newShoe.save().then((shoe) => {
    User.findByIdAndUpdate(req.body.id, {
      $push: { clickHistory: shoe._id },
    }).then(res.send({}));
  });
});

// save a shoe to collection
router.post("/savetocollection", (req, res) => {
  const newShoe = new Shoe({
    shoeName: req.body.shoeName,
    release: req.body.release,
    colorway: req.body.colorway,
    image: req.body.image,
  });
  newShoe.save().then((shoe) => {
    Collection.findOneAndUpdate(
      { creator: req.body.id, name: req.body.collectionName },
      {
        $push: { shoes: shoe._id },
      }
    ).then(res.send({}));
  });
});

// get shoe details from the database
router.get("/getshoe", (req, res) => {
  Shoe.findById(req.query.id).then((shoe) => {
    res.send(shoe);
  });
});

// follow another user, update followers/following arrays
router.post("/followuser", (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $push: { following: req.body.otherId },
  }).then(
    User.findByIdAndUpdate(req.body.otherId, {
      $push: { followers: req.body.id },
    }).then(res.send({}))
  );
});

// unfollow another user, update followers/following arrays
router.post("/unfollowuser", (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $pull: { following: req.body.otherId },
  }).then(
    User.findByIdAndUpdate(req.body.otherId, {
      $pull: { followers: req.body.id },
    }).then(res.send({}))
  );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
