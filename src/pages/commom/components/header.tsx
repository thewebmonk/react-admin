import { Avatar, Popover } from 'antd';
import React, { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLogout, useNavContext } from '../../../hooks';
import { RootState } from '../../../types/index.types';
import styles from './header.module.scss';
import { ReactComponent as MenuIcon } from '../../../common/svg/menu.svg';
import { ReactComponent as ArrowLeft } from '../../../common/svg/arrow-left.svg';
import { Link } from 'react-router-dom';

type HeaderProps = {
  setSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
  sideBarOpen: boolean;
};

const Header = ({ setSideBarOpen, sideBarOpen }: HeaderProps) => {
  const [visible, setVisible] = useState(false);
  const { goBackRoute, setGoBackRoute } = useNavContext();
  const user = useSelector((state: RootState) => state.auth.user);
  const logout = useLogout();
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  console.log(goBackRoute);
  return (
    <div className={styles.container}>
      <div className={styles.greetingContainer}>
        {!goBackRoute ? (
          <MenuIcon onClick={() => setSideBarOpen(!sideBarOpen)} className="cursor-pointer" height={25} width={25} />
        ) : (
          <Link to={goBackRoute} className="mt-2">
            <ArrowLeft
              onClick={() => setGoBackRoute && setGoBackRoute('')}
              color="#444"
              className="cursor-pointer"
              height={22}
              width={22}
            />
          </Link>
        )}
        <div className={styles.greeting}>
          Welcome, <span>{user?.firstName}</span>
        </div>
      </div>
      <span>
        <Popover
          content={
            <a onClick={() => logout()} className="link">
              Logout
            </a>
          }
          title={user?.firstName}
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          className={styles.spopover}
          placement={'bottomLeft'}
        >
          {user?.firstName && (
            <Avatar size={'large'} className={styles.avatar}>
              {user.firstName.substring(0, 1)}
            </Avatar>
          )}
        </Popover>
      </span>
    </div>
  );
};

export default Header;
