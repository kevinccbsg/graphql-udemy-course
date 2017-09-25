const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const PORT = process.env.PORT || 3000
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', 
  bodyParser.json(),
  graphqlExpress({
    schema,
  })  
)

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

app.listen(PORT, () => console.log('Linening'))
