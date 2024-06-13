/* const express = require("express");
const app = express(); */

/* app.use(express.json());
app.use("/api", require("./routes/crud"));

app.get("/", (req, res) => {
  res.send("Graphql is sitting");
});

app.listen(PORT, () => {
  console.log(`Graphql is running on port ${PORT}`);
}); */

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
33;

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./dbConfig");
const PORT = 5000;
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // middlewares
  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT} `);
};

startServer().catch((error) => {
  console.error("Error starting the server", error);
});
