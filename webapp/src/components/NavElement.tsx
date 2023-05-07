import { NavLink } from 'react-router-dom';

type PropsType = {
  linkTo: string;
  linkName: string;
};

export const NavElement: React.FC<PropsType> = ({ linkTo, linkName }) => {
  return (
    <NavLink
      to={linkTo}
      className='block py-2 pl-3 pr-4 text-gray-900 aria-[current=page]:text-blue-700'
    >
      {linkName}
    </NavLink>
  );
};
