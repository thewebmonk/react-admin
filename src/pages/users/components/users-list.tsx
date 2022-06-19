import React, { useEffect, useState } from 'react';
import { Button, Card, notification, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styles from '../users-page.module.scss';
import Heading from '../../commom/components/heading/heading';
import { ReactComponent as Plus } from '../../../common/svg/plus.svg';
import { useDispatch } from 'react-redux';
import { useIsAdmin } from '../../../hooks';
import { Dispatch, RootState } from '../../../types/index.types';
import { getUsersTableColumns } from '../utils';
import { User } from '../../login/login.types';
import { deleteUser, getAllUsers } from '../actions/async-action';
import { transformUserFromAPItoUI } from '../transformers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { openNotification } from '../../../common/utils';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<Dispatch>();
  const getUsers = () => {
    dispatch(getAllUsers()).then((data: User[] | null) => {
      if (data) {
        const users = data.filter((usr: User) => user?.id !== usr.id);
        setUsers(transformUserFromAPItoUI(users));
      }
    });
  };
  const handleDelete = async (id: any) => {
    const isDeleted = await dispatch(deleteUser(id));
    if (isDeleted) {
      openNotification({
        message: 'User Deleted.'
      });
      getUsers();
    }
  };
  const columns = getUsersTableColumns(handleDelete);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <Heading title="Users" className="ml-1" />
        <Link to={'./addUser'}>
          <Button
            icon={<Plus height={20} width={20} className="mr-1" />}
            type="primary"
            className="is-flex is-align-items-center"
          >
            Add User
          </Button>
        </Link>
      </div>
      <Card className="mt-2">
        <div className={`${styles.tableContainer} mt-3`}>
          <Table columns={columns} dataSource={users}></Table>
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
