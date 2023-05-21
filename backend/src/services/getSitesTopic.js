import { MongoClient } from 'mongodb';
import { Client, logger, Variables } from "camunda-external-task-client-js";
import { MONGODB_URL, DB_NAME, SITE_COLLECTION, BASE_URL } from '../config.js';

const config = {
  baseUrl: BASE_URL,
  use: logger,
};

const uri = `mongodb://${MONGODB_URL}`;
const client = new MongoClient(uri);
const database = client.db(DB_NAME);
const sitesCollection = database.collection(SITE_COLLECTION);

const camundaClient = new Client(config);

export const subscribeToGetSites = () => {
  camundaClient.subscribe('getSites', async ({ task, taskService }) => {

    try {
      const processVariables = task.variables.getAll();

      // if process started manual then get ad-hoc site name
      if (processVariables.startEventType === 'manual') {
        const stringArray = processVariables.siteList.split(", ");
        const newProcessVariables = new Variables().set("siteList", stringArray);
        await taskService.complete(task, newProcessVariables);

      } else {
        // get sites names from MongoDB
        await client.connect();
        const siteList = await sitesCollection.find({}).toArray();
        const newProcessVariables = new Variables().set("siteList", siteList[0].sites);
        await taskService.complete(task, newProcessVariables);
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  )
}