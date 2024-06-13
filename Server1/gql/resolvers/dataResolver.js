const { collection } = require("../../dbConfig/index");
const { ObjectId } = require("mongodb");

// A map of functions which return data for the schema.
module.exports = {
  Query: {
    // hello: () => "world", // static data
    getBooks: async () => {
      const findResult = await collection.find({}).toArray();
      return findResult;
    },
  },
  Mutation: {
    addBook: async (_, req) => {
      console.log("My req", req);
      const data = await collection.insertOne(req.input);
      console.log("data", data);
      req.input.id = data.insertedId;
      return req.input;
    },

    updateBookPrice: async (_, req) => {
      // console.log(req);
      const id = req.input._id;
      const updatePrice = req.input.price;

      const filter = { _id: new ObjectId(id) };

      const options = { upsert: false };

      const updateDoc = {
        $set: {
          price: updatePrice,
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      return req.input;
    },

    deleteBook: async (_, req) => {
      // console.log(req);
      const id = req._id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(query);
    },
  },
};
