import React from 'react';
import { Button, Card, Divider } from 'antd';
import ProfieDetails from './components/profie-details';
import UpdatePassword from './components/update-password';
import styles from './profile.module.scss';
import { useLogout } from '../../hooks';

const Profile = () => {
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Card>
        <ProfieDetails />
        <Divider />
        <UpdatePassword />
        <Divider />
        <Button onClick={logout} type="default" danger>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
