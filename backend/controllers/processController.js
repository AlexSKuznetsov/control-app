import { MongoClient } from 'mongodb';
import { MONGODB_URL } from '../config.js';

const uri = `mongodb://${MONGODB_URL}`; // Replace with your MongoDB server URI
const client = new MongoClient(uri);
const database = client.db('control-app');
const collection = database.collection('processes');

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
