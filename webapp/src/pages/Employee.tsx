import { PageLayout, TaskTable } from '../components';

export const Employee = () => {
  return (
    <PageLayout>
      <div className='text-sm p-8 font-bold'>Employee task list:</div>
      <TaskTable viewType='employee' />
    </PageLayout>
  );
};
