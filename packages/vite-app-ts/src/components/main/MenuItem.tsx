import { FC } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  children: any;
  to: string;
  active?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ to, children, active }) => (
  <Link to={to} className="menu-item">
    {children}
  </Link>
);
