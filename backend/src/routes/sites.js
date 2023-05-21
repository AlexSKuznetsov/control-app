import { Router } from 'express';
import { MongoClient } from 'mongodb';
import { MONGODB_URL } from '../config.js';

const uri = `mongodb://${MONGODB_URL}`; // Replace with your MongoDB server URI
const client = new MongoClient(uri);
const database = client.db('control-app');
const sitesCollection = database.collection('sites');

const router = Router();

router.get('/get-sites', async (req, res) => {
  try {
    await client.connect();
    const siteList = await sitesCollection.find({}).toArray();

    res.send(siteList[0].sites)
  } catch (e) {

    console.log(e)
  } finally {
    await client.close();
  }
})


export default router;