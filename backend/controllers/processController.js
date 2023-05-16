import { MongoClient } from 'mongodb';


const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB server URI
const client = new MongoClient(uri);
const database = client.db('control-app');
const collection = database.collection('processes');



const payload = {
  checkList: {
    task1: false,
    task2: false,
    task3: false,
  }
}

export const createProcessPayload = async (processId) => {
  try {
    await client.connect();
    const result = await collection.insertOne({ payload, processId, timestamp: new Date() });
    return result;
  } catch (error) {
    console.log(error)
  } finally {
    await client.close();
  }
}