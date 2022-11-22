const schemas = `
input UserInput {
    firstName: String!
    lastName: String!
}

type UserData {
    firstName: String!
    lastName: String!
    email: String!
    accountNumber: String!
}

type Name {
    name: String
}

type Info {
    name: String!
    country: String!
}

type Query {
    quoteOfTheDay: String
    random(name: String!): [UserData]
    rollThreeDice: [Int]
    userInfo: Info
    getUser: Name
}

type Mutation {
    user(input: UserInput): Name
}
  
  `;

module.exports = schemas;
