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
    accountBalance: String!
}

type Name {
    name: String
}

type Info {
    name: String!
    country: String!
}

input NameInput {
    name: String!
}

type Query {
    quoteOfTheDay: String
    random(name: String!): UserData
    rollThreeDice: [Int]
    userInfo: Info
    getUser: Name
}

type Mutation {
    user(input: UserInput): UserData
}
  `;

module.exports = schemas;
