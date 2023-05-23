import { MongoClient } from 'mongodb';
import axios from 'axios';
import { MONGODB_URL, DB_NAME, PROCESSES_COLLECTION, BASE_URL } from '../config.js';


const uri = `mongodb://${MONGODB_URL}`;
const client = new MongoClient(uri);
const database = client.db(DB_NAME);
const collection = database.collection(PROCESSES_COLLECTION);

export const createProcessPayload = async (taskList) => {
  try {
    await client.connect();
    const result = await collection.insertMany(taskList);
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
    const result = await collection.find().toArray()
    return result;
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
}

export const startProcessInstance = async (processKey, variables) => {
  try {
    const processResponse = await axios.post(
      `${BASE_URL}/process-definition/key/${processKey}/start`,
      {
        variables: JSON.parse(variables) || null,
        businessKey: 'manualStart',
      }
    )

    return processResponse.data;

  } catch (e) {
    console.log('Failed to start process instance with id:', processKey, e.message)
  }
}

export const getProcessInstanceTasks = async (processInstanceId) => {
  try {
    const taskList = await axios.post(`${BASE_URL}/task`,
      {
        processInstanceId: processInstanceId
      })

    return taskList.data;
  } catch (e) {
    console.log('Failed to load process tasks', e.message)
  }
}

export const modifyTaskStatus = async (taskId, status) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          status,
        }
      },
      {
        upsert: false,
      }
    )
    return result;
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }

}

export const modifyManagerTaskId = async (taskId, managerTaskId, assignee) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          managerTaskId,
          assignee,
        }
      },
      { upsert: false }
    )

    return result;
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
}

export const modifyCheckList = async (taskId, checkList) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          checkList,
        }
      },
      { upsert: false }
    )

    return result;
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
}


