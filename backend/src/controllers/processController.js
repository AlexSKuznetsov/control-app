import { MongoClient } from 'mongodb';
import { MONGODB_URL, DB_NAME, PROCESSES_COLLECTION } from '../config.js';


const uri = `mongodb://${MONGODB_URL}`;
const client = new MongoClient(uri);
const database = client.db(DB_NAME);
const collection = database.collection(PROCESSES_COLLECTION);


const payload = {
  checkList: [
    { task1: false },
    { task2: false },
    { task3: false },
  ],
};

export const createProcessPayload = async (processId, variables) => {
  try {
    await client.connect();
    const result = await collection.insertOne({
      payload,
      processId,
      variables,
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

export const getProcessList = async () => {
  try {
    await client.connect();
    const result = await collection.find({ status: 'in progress' }).toArray()
    return result;
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
}


