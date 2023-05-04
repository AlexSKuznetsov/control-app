const express = require('express');
const router = express.Router();
const axios = require('axios');
const { BASE_URL } = require('../config');

// define routes
router.get('/process-definition', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/process-definition`)
    res.send(response.data)

  } catch (e) {
    console.log(e)
  }
})

router.get('/process-instance', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/process-instance`)
    res.send(response.data)
  } catch (error) {
    console.log(error)
  }
})

router.get('/deployment', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/deployment`)
    res.send(response.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;