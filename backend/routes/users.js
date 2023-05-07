const express = require('express');
const router = express.Router();
const axios = require('axios');
const { BASE_URL } = require('../config');

router.get('/user-list', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`)
    res.send(response.data)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;