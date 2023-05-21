import { NavLink } from 'react-router-dom';
import { NavElement } from './NavElement';

export const Navbar = () => {
  return (
    <header>
      <nav className='border-gray-200 bg-slate-300 shadow-md dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <NavLink to='/' className='flex items-center'>
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              BPM Control App
            </span>
          </NavLink>
          <button className='ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-6 w-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <div className='hidden w-full md:block md:w-auto'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8  md:border-0 md:p-0 md:dark:bg-gray-900'>
              <NavElement linkName='Employee' linkTo='/' />
              <NavElement linkName='Manager' linkTo='/manager' />
              <NavElement linkName='Admin' linkTo='/admin' />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
