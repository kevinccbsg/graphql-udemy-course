const axios = require('axios')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Company {
    id: String
    name: String
    description: String
  }

  type User {
    id: String!
    firstName: String
    age: Int
    company: Company
  }

  type Query {
    user(id: String): User
    companies: [Company]
    company(id: String): Company
  }
`

const resolvers = {
  Query: {
    user: (_, { id }) => {
      console.log('user');
      return axios.get(`http://localhost:3000/users/${id}`)
      .then(resp => resp.data)
    },
    companies: () => {
      console.log('comapnies');
      return axios.get('http://localhost:3000/companies')
      .then(resp => resp.data)
    },
    company: (_, args) => {
      console.log(_, args);
      return axios.get(`http://localhost:3000/companies/${args.id}`)
      .then(resp => resp.data)
    },
  },
  User: {
    company: (_, args) => {
      console.log(_, args);
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
