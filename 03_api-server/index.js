// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('../config.json');

const client = new CosmosClient({
  endpoint: config.cosmos.endpoint,
  auth: {
    masterKey: config.cosmos.masterKey
  }
});

// db container
let container;
//questo è condivido?

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const response = await container.items
    .query({query: "SELECT * FROM root r"})
    .toArray();

  res.send({
    results: response.result
  });
});

app.post('/', async (req, res) => {
  const content = req.body;
  const response = await container.items.upsert(content);
  res.send(response.body);
});

async function run() {
  const responseCreation = await client.databases.createIfNotExists({
    id: 'movierank',
  });
  const db = responseCreation.database;
  console.log("created db");

  const responseContainer = await db.containers.createIfNotExists({
    id: 'movies',
  });

  container = responseContainer.container;

  app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
  });
}

run();