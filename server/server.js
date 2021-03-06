const express = require('express');
const db = require('./config/connection');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs } = require('./schemas/');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// init expres
const app = express();

// set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: "https://support-guru.herokuapp.com/"
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

// init apollo
const server = new ApolloServer({
    typeDefs,
    resolvers
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
}

startApolloServer(typeDefs, resolvers);


