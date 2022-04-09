import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  children: any;
  to: string;
}

export const MenuItem: FC<MenuItemProps> = ({ to, children }) => (
  <NavLink to={to} activeClassName="active" className="menu-item">
    {children}
  </NavLink>
);
