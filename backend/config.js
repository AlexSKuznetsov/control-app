import * as dotenv from 'dotenv'

dotenv.config();

export const { PORT, BASE_URL } = {
  PORT: process.env.PORT || 6000,
  BASE_URL: process.env.CAMUNDA_API_BASE_URL || 8080,
}
