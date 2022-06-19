import React from 'react';
import styles from './nav-item.module.scss';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  name: string;
  route: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

const NavItem = ({ name, route, icon, onClick }: NavItemProps) => {
  const Icon = icon;
  return (
    <NavLink
      onClick={() => {
        onClick && onClick();
      }}
      className={styles.navItem}
      to={`./${route}`}
    >
      <Icon height={20} width={20} color={'#fff'} strokeWidth={1.5} />
      <span>{name}</span>
    </NavLink>
  );
};

export default NavItem;
