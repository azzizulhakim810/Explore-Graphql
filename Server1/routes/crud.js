const express = require("express");
const router = express.Router();
const { collection } = require("../dbConfig/index");
const { ObjectId } = require("mongodb");

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// define the home page route
router.get("/", async (req, res) => {
  const findResult = await collection.find({}).toArray();
  res.send(findResult);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const findResult = await collection.findOne(query);
  res.send(findResult);
});

router.post("/add", async (req, res) => {
  const insertResult = await collection.insertOne({ a: 48 });
  // console.log('Inserted documents =>', insertResult);
  res.send(insertResult);
});

module.exports = router;
