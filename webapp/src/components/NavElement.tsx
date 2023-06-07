import { NavLink } from 'react-router-dom';

type PropsType = {
  linkTo: string;
  linkName: string;
};

export const NavElement: React.FC<PropsType> = ({ linkTo, linkName }) => {
  return (
    <NavLink
      to={linkTo}
      className='aria-[current=page] block border-blue-600 px-4 py-4 font-semibold text-white aria-[current=page]:border-b-4 aria-[current=page]:bg-slate-800   aria-[current=page]:text-slate-100'
    >
      {linkName}
    </NavLink>
  );
};
