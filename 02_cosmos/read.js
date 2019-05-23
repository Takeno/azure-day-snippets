const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('../config.json');

const client = new CosmosClient({
  endpoint: config.cosmos.endpoint,
  auth: {
    masterKey: config.cosmos.masterKey
  }
});

async function run() {
  const responseCreation = await client.databases.createIfNotExists({
    id: 'movierank',
  });
  const db = responseCreation.database;

  const responseContainer = await db.containers.createIfNotExists({
    id: 'movies',
  });

  const container = responseContainer.container;

  const response = await container.items
    .query({query: "SELECT * FROM root r"})
    .toArray();

  console.log(response.result);
}

run();
