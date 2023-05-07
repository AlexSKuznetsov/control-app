export type ProcessDefinition = {
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
