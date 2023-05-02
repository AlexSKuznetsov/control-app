type ProcessData = {
  id: string;
  deploymentTime: string;
  links: string[];
  source: string;
  tenantId: string | null;
  name: string | null;
};

export const GetProcessList = async () => {
  try {
    const response = await fetch('http://localhost:8081');
    const data: ProcessData[] = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
