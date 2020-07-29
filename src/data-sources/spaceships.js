const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectId } = require('mongodb');

class SpacehipsAPI extends MongoDataSource {
    getAllSpaceships() {
        return this.collection.find({}).toArray();
    }
    async getSpaceshipById(id) {
        return this.collection.findOne({ _id: new ObjectId(id) });
    }
    async updateSpaceship(id, model) {
        const response = await this.collection.update({ _id: new ObjectId(id) }, { $set: { model } });

        return response.result;
    }
    async createSpaceship(input) {
        const response = await this.collection.insertOne({ name: input.name, model: input.model })

        return this.collection.findOne({ _id: new ObjectId(response.insertedId) });
    }
}

module.exports = SpacehipsAPI;
