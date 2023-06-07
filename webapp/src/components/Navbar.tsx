import { NavLink } from 'react-router-dom';
import { NavElement } from './NavElement';

export const Navbar = () => {
  return (
    <header>
      <nav className='border-gray-200 bg-[#303240] dark:bg-gray-900'>
        <div className='flex items-center justify-between'>
          <NavLink to='/'>
            <span className='ml-8 text-2xl font-semibold text-white'>
              BPM Control App
            </span>
          </NavLink>

          <ul className='mr-8 mt-0 flex flex-row space-x-8'>
            <NavElement linkName='Employee' linkTo='/' />
            <NavElement linkName='Manager' linkTo='/manager' />
            <NavElement linkName='Admin' linkTo='/admin' />
          </ul>
        </div>
      </nav>
    </header>
  );
};
