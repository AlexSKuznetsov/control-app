import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      Page not found. Go to{' '}
      <Link to='/' className='text-blue-600'>
        main page
      </Link>
    </div>
  );
};
