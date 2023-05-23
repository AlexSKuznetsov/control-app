import { Router } from 'express';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import {
  createProcessPayload,
  getProcessList,
  startProcessInstance,
  getProcessInstanceTasks,
  modifyTaskStatus,
  modifyManagerTaskId,
  modifyCheckList,
  modifyTaskId
} from '../controllers/processController.js';


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

  try {
    const processResponse = await startProcessInstance(processKey, variables);

    setTimeout(async () => {

      const processesTasks = await getProcessInstanceTasks(processResponse.id);

      if (processesTasks && processesTasks.length > 0) {
        const bdResult = await Promise.all(processesTasks.map(async (task) => {
          const taskVariables = await axios.get(`${BASE_URL}/task/${task.id}/variables?deserializeValues=false`)

          return {
            processId: processResponse.id,
            proccesVariables: JSON.parse(variables),
            status: 'in progress',
            taskId: task.id,
            managerTaskId: null,
            taskVariables: taskVariables.data,
            assignee: task.assignee,
            timestamp: new Date(),
            checkList: [
              {
                checkName: 'Check 1',
                description: 'Make check 1',
                isCompleted: false
              },
              {
                checkName: 'Check 2',
                description: 'Make check 2',
                isCompleted: false,
              },
              {
                checkName: 'Check 3',
                description: 'Make check 3',
                isCompleted: false
              },
            ],
          }
        }))

        await createProcessPayload(bdResult);
      }

    }, 1000)

    return res.json(processResponse);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
})


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
    const result = await getProcessList();
    res.send(result)
  } catch (error) {
    console.log(error);
  }
});

router.post('/complete-task', async (req, res) => {
  try {
    const { taskId, processId, managerTaskId, isCompleted, checkList } = req.body;

    // complete task by manager
    if (managerTaskId !== null && managerTaskId !== undefined) {
      const newStatus = isCompleted ? 'completed' : 'rejected';
      await modifyTaskStatus(taskId, newStatus);

      const response = await axios.post(`${BASE_URL}/task/${managerTaskId}/complete`, {
        variables: {
          checkListApprove: { value: isCompleted },
        },
      })

      if (!isCompleted) {
        await modifyManagerTaskId(taskId, managerTaskId, 'employee');

        // get next task id for employee
        const { data } = await axios.post(`${BASE_URL}/task`, {
          processInstanceId: processId,
          assignee: 'employee'
        })

        await modifyTaskId(taskId, data[0].id);
      }

      res.send(response.data)

    } else {
      // complete task by employee

      // modify task status in DB
      await modifyTaskStatus(taskId, 'in review');
      await modifyCheckList(taskId, checkList)

      // complete task
      const response = await axios.post(`${BASE_URL}/task/${taskId}/complete`, {});

      // get next task for manager
      const { data } = await axios.post(`${BASE_URL}/task`, {
        processInstanceId: processId,
        assignee: 'manager'
      })

      // add manager task id in DB and change assignee
      await modifyManagerTaskId(taskId, data[0].id, 'manager')

      res.send(response.data);
    }

  } catch (error) {
    console.log(error.message);
  }
});


export default router;
