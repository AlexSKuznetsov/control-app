import { Link } from 'react-router-dom';

export const NoProcessDefinition = () => {
  return (
    <div className='flex h-4/5 items-center justify-center'>
      <div className='text-md inline-block rounded border border-red-600 p-2 font-bold shadow'>
        <p>
          No processes have been uploaded to the Camunda Engine at the moment.
        </p>
        Please, make use{' '}
        <Link
          to={'https://camunda.com/download/modeler'}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:underline'
        >
          Camunda modeler
        </Link>{' '}
        for uploading new process model.
        <p className='mt-4 text-sm font-normal'>
          Rest endpoint:{' '}
          <span className='font-semibold'>
            http://localhost:8080/engine-rest
          </span>
        </p>
      </div>
    </div>
  );
};
