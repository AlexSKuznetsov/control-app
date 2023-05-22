import * as dotenv from 'dotenv';
dotenv.config();

export const {
  PORT, BASE_URL, MONGODB_URL, ENV, DB_NAME, SITE_COLLECTION, PROCESSES_COLLECTION
} = {
  PORT: process.env.PORT || 6001,
  BASE_URL: process.env.CAMUNDA_API_BASE_URL || 8080,
  MONGODB_URL: process.env.MONGODB_URL || 'localhost:27017',
  ENV: process.env.ENV,
  DB_NAME: process.env.DB_NAME || 'control-app',
  SITE_COLLECTION: process.env.SITE_COLLECTION || 'sites',
  PROCESSES_COLLECTION: process.env.PROCESSES_COLLECTION || 'processes'
};
