import { PageLayout, TaskTable } from '../components';

export const Manager = () => {
  return (
    <PageLayout>
      <div className='text-sm p-8 font-bold'>Manager task list:</div>
      <TaskTable viewType='manager' />
    </PageLayout>
  );
};
