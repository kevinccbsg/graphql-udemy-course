const axios = require('axios')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Company {
    id: String
    name: String
    description: String
    users: [User]
  }

  type User {
    id: String!
    firstName: String
    age: Int
    company: Company
  }

  input NewUser {
    firstName: String!
    age: Int
  }

  type Query {
    user(id: String): User
    companies: [Company]
    company(id: String): Company
  }

  type Mutation {
    addUser(user: NewUser): User
    deleteUser(id: ID!): User
    updateUser(id: ID!, user: NewUser): User
  }
`

const resolvers = {
  Query: {
    user: (_, { id }) => {
      return axios.get(`http://localhost:3000/users/${id}`)
      .then(resp => resp.data)
    },
    companies: () => {
      return axios.get('http://localhost:3000/companies')
      .then(resp => resp.data)
    },
    company: (_, args) => {
      return axios.get(`http://localhost:3000/companies/${args.id}`)
      .then(resp => resp.data)
    },
  },
  Mutation: {
    addUser: (_, args) => {
      return axios.post('http://localhost:3000/users/', args)
      .then(resp => resp.data)
    },
    deleteUser: (_, { id }) => {
      return axios.delete(`http://localhost:3000/users/${id}`)
      .then(resp => resp.data)
    },
    updateUser: (_, { id, user }) => {
      return axios.patch(`http://localhost:3000/users/${id}`, user)
      .then(resp => resp.data)
    },
  },
  Company: {
    users: (_, args) => {
      return axios.get(`http://localhost:3000/companies/${_.id}/users`)
      .then(resp => resp.data);
    },
  },
  User: {
    company: (_, args) => {
      return axios.get(`http://localhost:3000/companies/${_.companyId}`)
      .then(resp => resp.data)
    },
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = schema
