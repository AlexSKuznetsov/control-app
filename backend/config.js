require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 6000,
  BASE_URL: process.env.CAMUNDA_API_BASE_URL || 8080,
}