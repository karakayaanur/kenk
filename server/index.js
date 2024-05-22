var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors')
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const hostname = '127.0.0.1';
const port = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'kenk';

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:collection', async function (req, res) {
  const collection = client.db(dbName).collection(req.params.collection);

  const findResult = await collection.find({}).toArray();

  res.contentType('application/json');
  res.end(JSON.stringify(findResult));
});

app.put('/:collection', async function (req, res) {
  const collection = client.db(dbName).collection(req.params.collection);

  const updatedRecord = await collection.updateOne({ _id: req.body._id }, { $set: req.body });

  res.contentType('application/json');
  res.end(JSON.stringify(updatedRecord));
});

app.post('/:collection', async function (req, res) {
  const collection = client.db(dbName).collection(req.params.collection);

  const insertedRecord = await collection.insertOne(req.body);
  
  res.contentType('application/json');
  res.end(JSON.stringify(insertedRecord));
});

app.delete('/:collection', async function (req, res) {
  const collection = client.db(dbName).collection(req.params.collection);

  // İstemciden gelen sorgu parametrelerini al
  const query = req.body;

  try {
    const deleteResult = await collection.deleteMany(query);
    if (deleteResult.deletedCount > 0) {
      res.status(200).send({ success: true, count: deleteResult.deletedCount, message: 'Documents deleted successfully' });
    } else {
      res.status(404).send({ success: false, message: 'No documents found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to delete documents', error: error });
  }
});




app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  await client.connect();
  console.log('Connected successfully to server');
});