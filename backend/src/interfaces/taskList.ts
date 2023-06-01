type CheckList = {
  checkName: string;
  description: string;
  isCompleted: boolean;
};

export interface Task {
  processId: string;
  processVariables: any;
  status: string;
  taskId: string;
  managerTaskId: string | null;
  taskVariables: TaskVariable[];
  assigne: string;
  timestamp: Date;
  checkList: CheckList[];
}

export interface CamundaTask {
  id: string | null;
  name: string | null;
  assignee: string | null;
  owner: string | null;
  created: string | null;
  lastUpdated: string | null;
  due: string | null;
  followUp: string | null;
  delegationState: ("PENDING" | "RESOLVED") | null;
  description: string | null;
  executionId: string | null;
  parentTaskId: string | null;
  priority: number | null;
  processDefinitionId: string | null;
  processInstanceId: string | null;
  caseExecutionId: string | null;
  caseDefinitionId: string | null;
  caseInstanceId: string | null;
  taskDefinitionKey: string | null;
  suspended: boolean | null;
  formKey: string | null;
  camundaFormRef: {} | null;
  tenantId: string | null;
}

export type TaskVariable = {
  [key: string]: {
    value: any;
    type: string;
    valueInfo: {
      objectTypeName: string;
      serializationDataFormat: string;
    };
  };
};
