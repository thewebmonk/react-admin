import React from 'react';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { User } from '../login/login.types';
import { adminRoles, roles } from '../login/constants';
import { capitalizeFirstLetter } from '../../common/utils';
import { Link } from 'react-router-dom';

export const getUsersTableColumns = (onConfirm: (id: any) => void) => {
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      key: 'firstName',
      render: (user: User) => (
        <>
          {user.firstName} {user.lastName}
        </>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value: string) => (
        <Tag color={adminRoles.includes(value) ? 'blue' : 'purple'}>{capitalizeFirstLetter(value)}</Tag>
      )
    },
    {
      title: 'Permission',
      key: 'permission',
      render: (_, user) => (
        <Space size="middle">
          <>
            {Object.entries(user.permission).map((prm: [string, boolean]) => (
              <Tag className="m-0" color={adminRoles.includes(user.role) || prm[1] ? 'green' : 'red'} key={prm[0]}>
                {prm[0]}
              </Tag>
            ))}
          </>
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'permission',
      render: (_, user) => (
        <Space size="middle">
          <Link to={`./editUser/${user.id}`}>
            <Button type="text">Edit</Button>
          </Link>
          <Popconfirm
            placement="bottomRight"
            title={'Are you sure that you want to delete ?'}
            onConfirm={() => onConfirm(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return columns;
};
