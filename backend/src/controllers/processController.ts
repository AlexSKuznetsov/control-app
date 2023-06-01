import { MongoClient, MongoError } from "mongodb";
import axios, { AxiosError } from "axios";
import {
  MONGODB_URL,
  DB_NAME,
  PROCESSES_COLLECTION,
  BASE_URL,
} from "../config";
import { Task, CamundaTask } from "../interfaces/taskList";
import { AxiosResponse } from "axios";
import { ProcessResponse } from "../interfaces/process";

const uri = `mongodb://${MONGODB_URL}`;
const client = new MongoClient(uri);
const database = client.db(DB_NAME);
const collection = database.collection(PROCESSES_COLLECTION);

export const createProcessPayload = async (taskList: Task[]) => {
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
    const result = await collection.find().toArray();
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

export const startProcessInstance = async (
  processKey: string,
  variables: string
) => {
  try {
    const processResponse = await axios.post<
      any,
      AxiosResponse<ProcessResponse>
    >(`${BASE_URL}/process-definition/key/${processKey}/start`, {
      variables: JSON.parse(variables) || null,
      businessKey: "manualStart",
    });

    return processResponse.data;
  } catch (e) {
    const error = e as AxiosError;
    console.log(
      "Failed to start process instance with id:",
      processKey,
      error.message
    );
  }
};

export const getProcessInstanceTasks = async (processInstanceId: string) => {
  try {
    const taskList = await axios.post<
      { processInstanceId: string },
      AxiosResponse<CamundaTask[]>
    >(`${BASE_URL}/task`, {
      processInstanceId: processInstanceId,
    });

    return taskList.data;
  } catch (e) {
    const error = e as AxiosError;
    console.log("Failed to load process tasks", error.message);
  }
};

export const modifyTaskStatus = async (taskId: string, status: string) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          status,
        },
      },
      {
        upsert: false,
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

export const modifyManagerTaskId = async (
  taskId: string,
  managerTaskId: string,
  assignee: string
) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          managerTaskId,
          assignee,
        },
      },
      { upsert: false }
    );

    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

export const modifyCheckList = async (taskId: string, checkList: string) => {
  try {
    await client.connect();
    const result = await collection.updateOne(
      { taskId },
      {
        $set: {
          checkList,
        },
      },
      { upsert: false }
    );

    return result;
  } catch (e) {
    const error = e as MongoError;
    console.log(error.message);
  } finally {
    await client.close();
  }
};

export const modifyTaskId = async (prevTaskId: string, newTaskId: string) => {
  try {
    await client.connect();

    const result = await collection.updateOne(
      { taskId: prevTaskId },
      {
        $set: {
          taskId: newTaskId,
        },
      },
      { upsert: false }
    );

    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};
