const axios = require('axios')
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

const resolvers = {
  Query: {
    user: (_, { id }) => axios.get(`http://localhost:3000/user/${id}`)
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = schema
