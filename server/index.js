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

app.get('/:collection/first', async function (req, res) {
  try {
    console.log('HTTP GET REQUEST /:collection/first');

    const collection = client.db(dbName).collection(req.params.collection);

    const filterString = req.query["filter"];

    const filterObject = filterString ? JSON.parse(filterString) : {};

    console.log('get One', req.params.collection, filterObject);

    const findOneResult = await collection.findOne(filterObject);

    if (findOneResult && findOneResult._id) {

      res.status(200).send({ success: true, data: findOneResult, message: 'Document found successfully' });

    } else {

      res.status(404).send({ success: false, message: 'Failed to find document' });

    }
  } catch (error) {

    res.status(500).send({ success: false, message: 'Failed to find document', data: error });

  }
});

app.get('/:collection', async function (req, res) {
  try {
    console.log('HTTP GET REQUEST /:collection');

    const collection = client.db(dbName).collection(req.params.collection);

    const filterString = req.query["filter"];

    const filterObject = filterString ? JSON.parse(filterString) : {};

    console.log('get', req.params.collection, filterObject);

    const findResult = await collection.find(filterObject).toArray();

    if (findResult.length > 0) {

      res.status(200).send({ success: true, data: findResult, message: 'Documents found successfully' });

    } else {

      res.status(404).send({ success: false, message: 'Failed to find documents' });

    }
  } catch (error) {

    res.status(500).send({ success: false, message: 'Failed to find documents', data: error });

  }
});

app.put('/:collection', async function (req, res) {
  try {
    console.log('HTTP PUT REQUEST /:collection');

    const collection = client.db(dbName).collection(req.params.collection);

    console.log('put', req.params.collection, req.body._id, req.body);

    const updateResult = await collection.updateOne({ _id: req.body._id }, { $set: req.body });

    if (updateResult.upsertedId) {

      const updatedRecord = await collection.findOne({ _id: updateResult.upsertedId });
      res.status(200).send({ success: true, data: updatedRecord, message: 'Document updated successfully' });

    } else {

      res.status(404).send({ success: false, message: 'Failed to update document' });

    }
  } catch (error) {

    res.status(500).send({ success: false, message: 'Failed to update document', data: error });

  }
});

app.post('/:collection', async function (req, res) {
  try {
    console.log('HTTP POST REQUEST /:collection');

    const collection = client.db(dbName).collection(req.params.collection);

    console.log('post', req.params.collection, req.body);

    const insertResult = await collection.insertOne(req.body);

    if (insertResult.insertedId) {

      const insertedRecord = await collection.findOne({ _id: insertResult.insertedId });
      res.status(200).send({ success: true, data: insertedRecord, message: 'Document inserted successfully' });

    } else {

      res.status(404).send({ success: false, message: 'Failed to insert document' });

    }
  } catch (error) {

    res.status(500).send({ success: false, message: 'Failed to insert document', data: error });

  }
});

app.delete('/:collection', async function (req, res) {
  try {
    console.log('HTTP DELETE REQUEST /:collection');

    const collection = client.db(dbName).collection(req.params.collection);

    console.log('delete', req.params.collection, req.body);

    const deleteResult = await collection.deleteMany(req.body);

    if (deleteResult.deletedCount > 0) {

      res.status(200).send({ success: true, data: deleteResult.deletedCount, message: 'Documents deleted successfully' });

    } else {

      res.status(404).send({ success: false, message: 'No documents found' });

    }
  } catch (error) {

    res.status(500).send({ success: false, message: 'Failed to delete documents', data: error });

  }
});

app.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  await client.connect();
  console.log('Connected successfully to server');
});