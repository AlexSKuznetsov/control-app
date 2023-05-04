import {
  Client,
  logger,
  Variables,
  File,
} from "camunda-external-task-client-js";
import * as dotenv from 'dotenv'
dotenv.config()

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: process.env.CAMUNDA_API_BASE_URL,
  use: logger,
};

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe("notify", async function ({ task, taskService }) {
  // Put your business logic
  // complete the task
  console.log(task, taskService)
  await taskService.complete(task);

});

