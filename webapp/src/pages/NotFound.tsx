import { Link } from 'react-router-dom';
import { PageLayout } from '../components';

export const NotFound = () => {
  return (
    <PageLayout>
      <div className='flex justify-center items-center h-full'>
        <p>
          Page not found. Go to{' '}
          <Link to='/' className='text-blue-600'>
            main page
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};
