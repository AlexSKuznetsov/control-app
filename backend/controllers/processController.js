import { MongoClient } from 'mongodb';
import { Client, Variables, logger } from "camunda-external-task-client-js";
import { MONGODB_URL, BASE_URL } from '../config.js';

const config = {
  baseUrl: BASE_URL,
  use: logger,
};

const camundaClient = new Client(config);

const uri = `mongodb://${MONGODB_URL}`; // Replace with your MongoDB server URI
const client = new MongoClient(uri);
const database = client.db('control-app');
const collection = database.collection('processes');
const sitesCollection = database.collection('sites');

const payload = {
  checkList: {
    task1: false,
    task2: false,
    task3: false,
  },

};

export const createProcessPayload = async (processId) => {
  try {
    await client.connect();
    const result = await collection.insertOne({
      payload,
      processId,
      status: 'in progress',
      timestamp: new Date(),
    });
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

export const subscribeToTopic = (topicName) => {
  camundaClient.subscribe(topicName, async ({ task, taskService }) => {
    // Put your business logic
    // complete the task
    console.log(task, taskService)
    const siteList = await sitesCollection.find({}).toArray();
    const processVariables = new Variables()
      .set("siteList", JSON.stringify(siteList.sites))
    await taskService.complete(task, processVariables);

  });
}

export const seedSitesList = async () => {
  const newList = [
    "Site 1",
    "Site 2",
    "Site 3",
  ];

  try {
    const dbList = await sitesCollection.find({}).toArray();

    if (dbList.length === 0) {
      const result = await sitesCollection.insertOne({ sites: newList });
      console.log('site list created', result.insertedId);
    }

    console.log('MongoDB already have sites list');
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
