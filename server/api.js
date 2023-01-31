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
const Trade = require("./models/trade");
const Message = require("./models/message");
const Chat = require("./models/chat");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
const date = new Date();

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
  sneaks.getProducts(req.query.searchQuery, 250, (err, products) => {
    res.send(products);
  });
});

// find & send users with names matching search query, return all if empty query
router.get("/userresults", (req, res) => {
  User.find({ displayName: { $regex: req.query.searchQuery, $options: "-i" } }).then((userObjs) => {
    res.send(userObjs);
  });
});

// get trending products
router.get("/trending", (req, res) => {
  sneaks.getMostPopular(100, (err, products) => {
    res.send(products);
  });
});

// get newly released products
router.get("/newreleases", (req, res) => {
  sneaks.getProducts("", 250, (err, products) => {
    const year = date.getFullYear();
    // filter shoes released within the year
    const newReleases = products.filter(
      (shoe) => parseInt(shoe.releaseDate.substring(0, 4)) == year
    );
    res.send(newReleases);
  });
});

// get a user by ID
router.get("/getuser", (req, res) => {
  User.findOne({ _id: req.query.id }).then((userObj) => {
    res.send(userObj);
  });
});

// set to google profile pic on login
router.post("/setpfp", (req, res) => {
  User.findByIdAndUpdate(req.body.id, { $set: { pfp: req.body.pfp } }).then((user) => {
    socketManager.getIo().emit("setpfp", user);
    res.send({});
  });
});

// update user search history w/ last search query
router.post("/search", (req, res) => {
  User.findByIdAndUpdate(req.body.id, { $push: { searchHistory: req.body.searchQuery } }).then(
    () => {
      // socketManager.getIo().emit("newsearch", req.body.searchQuery);
      res.send({});
    }
  );
});

// update user profile info
router.post("/updateprofile", (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $set: { displayName: req.body.newName, about: req.body.newAbout },
  }).then((user) => {
    socketManager.getIo().emit("profile", { name: req.body.newName, about: req.body.newAbout });
    res.send({});
  });
});

// get a user's collection data
router.get("/usercollections", (req, res) => {
  Collection.find({ creator: req.query.id }).then((collectionObjs) => {
    res.send(collectionObjs);
  });
});

// generate & send a random featured collection
router.get("/featured", (req, res) => {
  Collection.find({}).then((collections) => {
    let featured = collections[Math.floor(Math.random() * collections.length)];
    res.send(featured);
  });
});

// create new collection
router.post("/createcollection", (req, res) => {
  const newCollection = new Collection({
    creator: req.body.id,
    name: req.body.name,
    shoes: [],
  });
  newCollection.save().then(res.send({}));
});

// delete a collection
router.post("/deletecollection", (req, res) => {
  Collection.findByIdAndDelete(req.body.collectionId).then(() => {
    socketManager.getIo().emit("deletedcollection", req.body.collectionId);
  });
});

// save a shoe to user view history
router.post("/savetoclickhistory", (req, res) => {
  const newShoe = new Shoe({
    shoeName: req.body.shoeName,
    release: req.body.release,
    colorway: req.body.colorway,
    image: req.body.image,
    styleId: req.body.styleId,
  });
  newShoe.save().then((shoe) => {
    User.findByIdAndUpdate(req.body.id, {
      $push: { clickHistory: req.body.styleId },
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
    styleId: req.body.styleId,
  });
  newShoe.save().then((shoe) => {
    Collection.findOneAndUpdate(
      { creator: req.body.id, name: req.body.collectionName },
      {
        $push: { shoes: req.body.styleId },
      }
    ).then(res.send({}));
  });
});

// create a shoe in the database
router.post("/createshoe", (req, res) => {
  const newShoe = new Shoe({
    shoeName: req.body.shoeName,
    release: req.body.release,
    colorway: req.body.colorway,
    image: req.body.image,
    styleId: req.body.styleId,
  });
  newShoe.save().then(res.send({}));
});

// get shoe details from the database
router.get("/getshoe", (req, res) => {
  Shoe.findOne({ styleId: req.query.id }).then((shoe) => {
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

router.post("/changeprofile", (req, res) => {
  User.findById(req.body.newId).then((user) => {
    socketManager.getIo().emit("profilechange", user);
    res.send({});
  });
});

// create a new trade listing
router.post("/createtrade", (req, res) => {
  const tradeDetails = {
    shoeName: req.body.name,
    size: req.body.size,
    colorway: req.body.colorway,
    brand: req.body.brand,
    retail: req.body.retail,
    image: req.body.image,
  };
  const newTrade = new Trade({
    creator: req.body.id,
    details: tradeDetails,
    status: "active",
    originalTrade: "",
  });
  newTrade.save().then((trade) => {
    socketManager.getIo().emit("newtrade", trade);
    res.send({});
  });
});

// reply to an original trade listing
router.post("/replytrade", (req, res) => {
  const tradeDetails = {
    shoeName: req.body.name,
    size: req.body.size,
    colorway: req.body.colorway,
    brand: req.body.brand,
    retail: req.body.retail,
    image: req.body.image,
  };
  const newTrade = new Trade({
    creator: req.body.id,
    details: tradeDetails,
    status: "pending",
    originalTrade: req.body.originalTrade,
  });
  newTrade.save().then((trade) => {
    socketManager.getIo().emit("newreplytrade", trade);
    res.send({});
  });
});

// get a trade listing/request by ID
router.get("/gettrade", (req, res) => {
  Trade.findById(req.query.tradeId).then((trade) => {
    res.send(trade);
  });
});

router.get("/tradelistings", (req, res) => {
  // filter out active, original trade posts from trade listings
  Trade.find({}).then((trades) => {
    let tradeListings = trades.filter((trade) => trade.status == "active");
    res.send(tradeListings);
  });
});

router.get("/traderequests", (req, res) => {
  let tradeRequests = [];
  const async_process = async () => {
    // get all trades made by the user
    await Trade.find({ creator: req.query.creator }).then(async (trades) => {
      // find all trades with an original post trade made by the user
      for (const trade of trades) {
        await Trade.find({ originalTrade: trade._id }).then((replyTrades) => {
          // get trade requests that are active
          let activeReplyTrades = replyTrades.filter(
            (replyTrade) => replyTrade.status == "pending"
          );
          tradeRequests.push(...activeReplyTrades);
        });
      }
    });
  };

  async_process().then(() => {
    res.send(tradeRequests);
  });
});

// accept a trade request, update trade listings, start new chat
router.post("/accepttrade", (req, res) => {
  Trade.findByIdAndUpdate(req.body.originalTrade, {
    $set: { status: "complete" },
  }).then(() => {
    Trade.findByIdAndUpdate(req.body.requestId, {
      $set: { status: "accepted" },
    }).then(() => {
      const newMessage = new Message({
        sender: req.body.originalTradeCreator,
        content: "Hi, I've accepted your trade offer",
      });
      newMessage.save().then((message) => {
        const newChat = new Chat({
          messages: [message._id],
        });
        newChat.save().then((chat) => {
          User.findByIdAndUpdate(req.body.creator, {
            $push: { chats: chat._id },
          }).then(
            User.findByIdAndUpdate(req.body.originalTradeCreator, {
              $push: { chats: chat._id },
            }).then(res.send({}))
          );
        });
      });
    });
  });
});

// get a chat by its ID
router.get("/getchat", (req, res) => {
  Chat.findById(req.query.chatId).then((chat) => {
    res.send(chat);
  });
});

// get a message by its ID
router.get("/getmessage", (req, res) => {
  Message.findById(req.query.messageId).then((message) => {
    res.send(message);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
