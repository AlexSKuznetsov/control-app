import * as dotenv from 'dotenv';

dotenv.config();

export const {
  PORT, BASE_URL, MONGODB_URL, ENV,
} = {
  PORT: process.env.PORT || 6000,
  BASE_URL: process.env.CAMUNDA_API_BASE_URL || 8080,
  MONGODB_URL: process.env.MONGODB_URL || 'localhost:27017',
  ENV: process.env.ENV,
};
