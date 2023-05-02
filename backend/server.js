const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
require('dotenv').config()

const PORT = 5000;

if (!process.env.CAMUNDA_API_BASE_URL) {
  throw new Error('Camunda api url not found!')
}



app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.CAMUNDA_API_BASE_URL}/deployment`)
    res.send(response.data)
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})