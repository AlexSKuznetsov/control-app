import { Client, Variables, logger } from "camunda-external-task-client-js";
import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: process.env.CAMUNDA_API_BASE_URL,
  use: logger,
};

const PORT = process.env.WEBHOOK_PORT || 9000;

app.post('/topic', (req, res) => {
  // Extract the new topic name from the webhook payload
  const newTopicName = req.body.topicName;

  subscribeToTopic(newTopicName);

  res.status(200).send(`Notification topic name was changed to: ${newTopicName}`);
})

// create a Client instance with custom configuration
const client = new Client(config);

const subscribeToTopic = (topicName) => {
  client.subscribe(topicName, async ({ task, taskService }) => {
    // Put your business logic
    // complete the task
    console.log(task, taskService)

    await taskService.complete(task);

  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server listening at http://localhost:${PORT}`);
});


