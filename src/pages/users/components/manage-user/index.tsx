import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import { permissions } from '../../../../common/utils/constants';
import Heading from '../../../commom/components/heading/heading';
import { useUserForm } from '../../hooks/hooks';
import styles from './manage-user.module.scss';
import { roles } from '../../../login/constants';
import { UserFormField } from '../../users.types';
import { useNavContext } from '../../../../hooks';
type ManageUserProps = {
  editMode?: boolean;
};

const ManageUser = ({ editMode }: ManageUserProps) => {
  const { form, role, setRole, initialValues, handleCreateUser, handleEditUser } = useUserForm(editMode);
  const { setGoBackRoute } = useNavContext();
  const onFinish = async (values: UserFormField) => {
    if (editMode) {
      handleEditUser(values);
    } else {
      handleCreateUser(values);
    }
  };
  useEffect(() => {
    setGoBackRoute && setGoBackRoute('./users');
  }, []);
  const onRoleChnage = (value: string) => {
    setRole(value);
    if (form.current) {
      if (value === roles.ADMIN) {
        const values = form.current.getFieldsValue();
        form.current.setFieldsValue({ ...values, permission: Object.values(permissions) });
      } else {
        const values = form.current.getFieldsValue();
        form.current.setFieldsValue({ ...values, permission: [] });
      }
    }
  };

  return (
    <Card>
      <Heading title={`${editMode ? 'Edit' : 'Add'} User`} type="small" className="mb-3" />
      <Form initialValues={initialValues} ref={form} onFinish={onFinish} className={styles.profileForm}>
        <Form.Item
          className="mb-3"
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please add first name', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Last name"
          name="lastName"
          rules={[{ required: false, message: 'Please add first name', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter email', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select a option " onChange={onRoleChnage} allowClear>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="editor">Editor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="permission" label="Permission" rules={[{ required: true }]}>
          <Checkbox.Group disabled={role === roles.ADMIN} options={Object.values(permissions)} />
        </Form.Item>
        {!editMode && (
          <>
            <Form.Item
              className="mb-3"
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!', whitespace: true },
                { min: 6, message: 'Username must be minimum 6 characters.' }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              className="mb-3"
              label="Confirm Password"
              name="password_confirmation"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                  whitespace: true
                },
                { min: 6, message: 'Username must be minimum 6 characters.' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {`${editMode ? 'Edit' : 'Add'} User`}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ManageUser;
