import React, { SetStateAction } from 'react';
import { brandName } from '../../../common/utils/constants';
import { Permission } from '../../login/login.types';
import NavItem from '../components/nav-item';
import { getSideBar, SideBarNavItemType } from '../utils/utils';
import styles from './side-bar.module.scss';

type SideBarProps = {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
  permission: Permission;
  isAdmin: boolean;
};

const SideBar = ({ sideBarOpen, setSideBarOpen, permission, isAdmin }: SideBarProps) => {
  const sideBarItems = getSideBar(permission, isAdmin);
  return sideBarOpen ? (
    <div className={`side-bar ${styles.sideBarContainer}`}>
      <div onClick={() => setSideBarOpen(!sideBarOpen)} className={styles.overlay}></div>
      <div className={styles.brandConatiner}>
        <span className={styles.text}>{brandName}</span>
      </div>
      <div className={styles.listcontainer}>
        {sideBarItems.map((navItem: SideBarNavItemType, index: number) => (
          <NavItem
            onClick={() => setSideBarOpen(sideBarOpen)}
            key={index}
            name={navItem.name}
            route={navItem.route}
            icon={navItem.icon}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SideBar;
