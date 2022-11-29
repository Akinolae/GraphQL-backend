const schemas = `#graphql


input UserInput {
    firstName: String!
    lastName: String!
}

input Login {
    username: String!
    userPassword: String!
}

type UserData {
    firstName: String!
    lastName: String!
    email: String!
    accountNumber: String!
    accountBalance: String!
}

type transactions {
    transaction_id: String!
    user_id: String!
    transaction_type: String!
    amount: Int!
    description: String!
    transaction_date: String!
}

type LoginData {
        email: String
        token: String
        has2fa: Boolean
    }




input NameInput {
    name: String!
}

type Query {
    getTransactions: [transactions]
    random: Int!
}

type Mutation {
    user(input: UserInput): UserData
    login(input: Login) : LoginData
}
  `;
export default schemas;
