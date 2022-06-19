import React, { useRef } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../types/index.types';
import Heading from '../../commom/components/heading/heading';
import { updatePassword } from '../actions/async-action';
import styles from '../profile.module.scss';
import { openNotification } from '../../../common/utils';

const UpdatePassword = () => {
  const form: any = useRef(null);
  const dispatch = useDispatch<Dispatch>();
  const onFinish = async (values: any) => {
    const { newPassword, password } = values;
    if (newPassword && password) {
      const isUpdated = await dispatch(updatePassword(password, newPassword));
      if (isUpdated) {
        openNotification({
          message: 'Password Updated'
        });
        form.current && form.current.resetFields();
      }
    }
  };

  return (
    <>
      <Heading title="Update Password" type="small" className="mb-3" />
      <Form ref={form} onFinish={onFinish} className={styles.profileForm}>
        <Form.Item
          className="mb-3"
          label="Current Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be minimum 6 characters.' }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="mb-3"
          label="Confirm New Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            { min: 6, message: 'Password must be minimum 6 characters.' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The passwords that you entered do not match!');
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePassword;
