const fs = require('fs');
const dir = './mongodb';

const { ApolloServer } = require('apollo-server');
const { mongodHelper } = require('./db');
const { MongoClient } = require('mongodb');

const { typeDefs } = require('./src/schemas/index');
const { resolvers } = require('./src/resolvers/index');
const SpacehipsAPI = require('./src/data-sources/spaceships');

let IS_INITIAL = false;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    IS_INITIAL = true;
}

mongodHelper.run().then(async (_started) => {
    console.log('mongod is running');

    const client = new MongoClient('mongodb://localhost:27018/center');

    await client.connect();
    const collection = client.db().collection('spaceships');

    if (IS_INITIAL) {
        collection.insertMany([
            {
                'name': 'Normandy',
                'model': 'SR-2',
                'props': {
                    'speed': 50000,
                    'capacity': 100,
                }
            },
            {
                'name': 'Brittany',
                'model': 'SR-1',
                'props': {
                    'speed': 40000,
                    'capacity': 200,
                }
            }
        ])
    }

    const dataSources = () => ({
        spacehipsAPI: new SpacehipsAPI(collection),
    });

    const server = new ApolloServer({ typeDefs, resolvers, dataSources });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });

}, (e) => {
    console.log('error starting', e);
});
