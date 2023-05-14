import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../shared/constants';
import { ProcessDefinition } from '../types/processDefinition';

type DeploymentData = {
  id: string;
  deploymentTime: string;
  links: string[];
  source: string;
  tenantId: string | null;
  name: string | null;
};

export const getDeploymentData = async () => {
  try {
    const response = await axios.get<DeploymentData[]>(
      `${BACKEND_BASE_URL}/process/deployment`
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

export const getProcessDefinition = async () => {
  try {
    const response = await axios.get<ProcessDefinition[]>(
      `${BACKEND_BASE_URL}/process/process-definition`
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

export const startNewInstanceByProcessKey = async (
  processKey: string,
  variables?: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/process/start-process`,
      {
        processKey,
        variables,
      }
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

type Task = {
  assignee: string | null;
  camundaFormRef: { [key: string]: string } | null;
  caseDefinitionId: string | null;
  caseExecutionId: string | null;
  caseInstanceId: string | null;
  created: string | null;
  delegationState: string | null;
  description: string | null;
  due: string | null;
  executionId: string | null;
  followUp: string | null;
  formKey: string | null;
  id: string | null;
  lastUpdated: string | null;
  name: string | null;
  owner: string | null;
  parentTaskId: string | null;
  priority: number | null;
  processDefinitionId: string | null;
  processInstanceId: string | null;
  suspended: boolean | null;
  taskDefinitionKey: string | null;
  tenantId: string | null;
};

export const getEmployeeTasks = async () => {
  try {
    const response = await axios.get<Task[]>(
      `${BACKEND_BASE_URL}/process/get-tasks`
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

export const completeTask = async ({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/process/complete-task`,
      {
        taskId: id,
        isCompleted,
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
