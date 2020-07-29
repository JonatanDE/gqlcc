const resolvers = {
    Query: {
        spaceships: async (_, { }, { dataSources: { spacehipsAPI } }) => spacehipsAPI.getAllSpaceships(),
        spaceship: async (_, { id }, { dataSources: { spacehipsAPI } }) => spacehipsAPI.getSpaceshipById(id),
    },
    Mutation: {
        buildSpaceship: async (_, { input }, { dataSources: { spacehipsAPI } }) =>
            spacehipsAPI.createSpaceship(input),
        upgradeSpaceship: async (_, { id, model }, { dataSources: { spacehipsAPI } }) =>
            spacehipsAPI.updateSpaceship(id, model),
    }
};

module.exports = { resolvers };
