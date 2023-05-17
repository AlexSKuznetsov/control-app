import { Router } from 'express';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import { createProcessPayload } from '../controllers/processController.js';

const router = Router();

// define routes
router.get('/process-definition', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/process-definition`);
    res.send(response.data);
  } catch (e) {
    console.log(e);
  }
});

router.post('/start-process', async (req, res) => {
  const processKey = req.body.processKey;
  const variables = req.body.variables;

  if (!processKey) {
    return res.status(400).send('Proscess key missed');
  }

  if (processKey) {
    try {
      const response = await axios.post(
        `${BASE_URL}/process-definition/key/${processKey}/start`,
        {
          variables: variables || null,
          businessKey: 'manualStart',
        }
      );

      const result = await createProcessPayload(response.data.id);
      console.log(result);

      return res.json(response.data);
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
  }
});

router.get('/process-instance', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/process-instance`);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/deployment', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/deployment`);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/get-tasks', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/task`);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.post('/complete-task', async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const isCompleted = req.body.isCompleted;
    const response = await axios.post(`${BASE_URL}/task/${taskId}/complete`, {
      variables: {
        checkListApprove: { value: isCompleted },
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
