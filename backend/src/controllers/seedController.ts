import { MongoClient } from "mongodb";
import { MONGODB_URL, DB_NAME, SITE_COLLECTION } from "../config";
import { SITE_LIST } from "../mocks/sites";

const uri = `mongodb://${MONGODB_URL}`;
const client = new MongoClient(uri);
const database = client.db(DB_NAME);
const sitesCollection = database.collection(SITE_COLLECTION);

export const seedSitesList = async () => {
  try {
    const dbList = await sitesCollection.find({}).toArray();

    if (dbList.length === 0) {
      const result = await sitesCollection.insertOne({ sites: SITE_LIST });
      console.log("site list created", result.insertedId);
    } else {
      console.log("MongoDB already have sites list");
    }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};
