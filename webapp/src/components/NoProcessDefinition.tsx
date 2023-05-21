import { Link } from 'react-router-dom';
import { PageLayout } from '.';

export const NoProcessDefinition = () => {
  return (
    <PageLayout>
      <div className='flex h-full items-center justify-center'>
        <div className='text-md mx-6 my-12 inline-block rounded bg-slate-100 p-2 font-bold shadow'>
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
          <p className='mt-4 text-sm font-normal'>
            Rest endpoint: http://localhost:8080/engine-rest
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
