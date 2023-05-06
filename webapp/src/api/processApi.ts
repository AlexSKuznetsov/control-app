import axios, { AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../shared/constants';

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
      `${BACKEND_BASE_URL}/deployment`
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};

type ProcessDefinition = {
  id: string | null;
  key: string | null;
  category: string | null;
  description: string | null;
  name: string | null;
  version: number | null;
  resource: string | null;
  deploymentId: string | null;
  diagram: null | null;
  suspended: boolean | null;
  tenantId: string | null;
  versionTag: string | null;
  historyTimeToLive: number | null;
  startableInTasklist: boolean | null;
};

export const getProcessDefinition = async () => {
  try {
    const response = await axios.get<ProcessDefinition[]>(
      `${BACKEND_BASE_URL}/process-definition`
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
    const response = await axios.post(`${BACKEND_BASE_URL}/start-process`, {
      processKey,
      variables,
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.message);
  }
};
