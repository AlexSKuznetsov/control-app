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

router.post('/start-process', async (req, res) => {
  const processKey = req.body.processKey;
  const variables = req.body.variables;

  if (!processKey) {
    return res.status(400).send('Proscess key missed')
  }

  if (processKey) {
    try {
      const response = await axios.post(`${BASE_URL}/process-definition/key/${processKey}/start`, {
        variables: variables,
        businessKey: "manualStart"
      });

      return res.json(response.data)

    } catch (e) {
      console.log(e)
      res.status(400).send(e.message)
    }
  }
});



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