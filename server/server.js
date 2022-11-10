const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const pathLib = require('path');
const express = require('express');
const login = require('./login_register');
const constants = require('./constants');

let db;

async function connectToDb() {
    const client = new MongoClient(constants.url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB at', constants.url);
    db = client.db();
}

const resolvers = {
    Query: {
        login: async (_1, args) => {
            return await login.login(db, args.login_name, args.password);
        },
        student_profile: async (_1, args) => {
            return await login.student_profile(db, args.login_id);
        },
        search: async (_1, { name }) => {
            return await login.search(db, name);
        }
    },
    Mutation: {
        register: async (_, { login_name, password, student_name, date_of_birth, major }) => await login.register(db, login_name, password, student_name, date_of_birth, major),
        update_details: async (_, { login_id, first_name, last_name, data_of_birth, email, major }) => await login.update_details(db, login_id, first_name, last_name, data_of_birth, email, major)
    }
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

const app = express();
const staticService = express.static('public');
app.use(staticService);

(async function () {
    try {
        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        await connectToDb();

        app.all('*', function (req, res) {
            var path = __dirname + '/../public/index.html';
            path = pathLib.resolve(path);
            res.sendFile(path);
        });

        app.listen(3000, function () {
            console.log('App started on port 3000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();