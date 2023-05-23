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
      { processKey, variables }
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

export type Task = {
  _id: string;
  processId: string;
  taskId: string;
  taskVariables: {
    siteName: {
      value: string;
    };
    adHocDescription: {
      value: string;
      type: string;
    };
  };
  proccesVariables: {
    siteList: {
      value: string;
      type: string;
    };
    startEventType: {
      value: string;
      type: string;
    };
    adHocDescription: {
      value: string;
      type: string;
    };
  };
  assignee: string;
  status: string;
  timestamp: string;
  checkList: [
    {
      checkName: string;
      description: string;
    }
  ];
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
