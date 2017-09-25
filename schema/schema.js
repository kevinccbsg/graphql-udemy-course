const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type User {
    id: String
    firstName: String
    age: Int
  }

  type Query {
    user(id: String!): User
  }
`
const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Smantha', age: 21 },
]

const resolvers = {
  Query: {
    user: (_, { id }) => (
      (users.filter(o => o.id === id)[0])
    )
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = schema
