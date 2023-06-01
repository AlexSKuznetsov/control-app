type Link = {
  rel: string | null;
  href: string | null;
  method: string | null;
};

export interface ProcessResponse {
  id: string | null;
  definitionId: string | null;
  businessKey: string | null;
  caseInstanceId: string | null;
  suspended: boolean | null;
  tenantId: string | null;
  links: Link[] | null;
}

export interface ProcessDefinition {}
