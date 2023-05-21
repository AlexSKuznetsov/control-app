import { Link } from 'react-router-dom';
import { PageLayout } from '.';

export const NoProcessDefinition = () => {
  return (
    <PageLayout>
      <div className='flex items-center justify-center h-full'>
        <div className='inline-block font-bold text-md my-12 mx-6 bg-slate-100 p-2 rounded shadow'>
          <p> There are no processes uploaded to Caumunda Engine.</p>
          Please use{' '}
          <Link
            to={'https://camunda.com/download/modeler'}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            Camunda modeler
          </Link>{' '}
          for uploading new process.
          <p className='text-sm font-normal mt-4'>
            Rest endpoint: http://localhost:8080/engine-rest
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
