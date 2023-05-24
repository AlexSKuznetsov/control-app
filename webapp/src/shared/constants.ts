export const QUERY_KEYS = {
  GET_PROCESSES: 'GET_PROCESSES',
  GET_PROCESS_DEFINITION: 'GET_PROCESS_DEFINITION',
  GET_USERS: 'GET_USERS',
  GET_EMPLOYEE_TASKS: 'GET_EMPLOYEE_TASKS',
  GET_SITES_LIST: 'GET_SITES_LIST',
};

export const BACKEND_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:6001'
  : 'http://localhost:8081';

export const NOTIFICATION_SERVICE_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:9001'
  : 'http://localhost:8082';

console.log('MODE:', import.meta.env.MODE);
