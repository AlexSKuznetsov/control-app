import { Client, Variables, logger } from "camunda-external-task-client-js";
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: process.env.CAMUNDA_API_BASE_URL,
  use: logger,
};

const testAccount = await nodemailer.createTestAccount();

const PORT = process.env.WEBHOOK_PORT || 9001;

app.get('/', (_, res) => {
  res.send('Notification service is working')
})

app.post('/topic', (req, res) => {
  // Extract the new topic name from the webhook payload
  const { topicName } = req.body;

  subscribeToTopic(topicName);

  res.status(200).send(`Notification topic name was changed to: ${topicName}`);
})

// create a Client instance with custom configuration
const client = new Client(config);

const subscribeToTopic = (topicName) => {
  console.log(process.env.MAILSERVICE_URL)

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.DEV === 'DEV' ? "127.0.0.1" : 'mailhog',
    port: process.env.MAILSERVICE_MAILSERVICE_SMTP_PORT || 1025,
    secure: false,
    // auth: {
    //   user: "",
    //   pass: "", 
    // },
    logger: true,
  });

  client.subscribe(topicName, async ({ task, taskService }) => {

    const processVariables = task.variables.getAll();

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"BPM Contol App" <foo@example.com>', // sender address
      to: 'Nodemailer <example@nodemailer.com>',
      subject: `Overdue task for ${processVariables.siteName}`, // Subject line
      text: `Ad-hoc reason ${processVariables.adHocDescription}`, // plain text body
      html: `<b>foo</b>`, // html body
    });

    await taskService.complete(task);

  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server listening at http://localhost:${PORT}`);
});


