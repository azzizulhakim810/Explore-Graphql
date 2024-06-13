const dataSchema = require("./dataSchema");
// The GraphQL schema
const rootSchema = `#graphql

type Query {
    _: Boolean
}

type Mutation {
    _:Boolean
}
`;

module.exports = [rootSchema, dataSchema];
