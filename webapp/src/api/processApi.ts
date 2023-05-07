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
