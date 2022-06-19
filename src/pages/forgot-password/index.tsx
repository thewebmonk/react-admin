import React from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import styles from '../login/login.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../types/index.types';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../login/actions/async-action';
const LoginPage = () => {
  const dispatch: Dispatch = useDispatch();
  const onFinish = (formData: any) => {
    const onSuccess = () => {
      alert('Password reset link sent successfully !');
    };
    if (formData.email) {
      dispatch(forgotPassword(formData.email, onSuccess));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <Card title="Forgot Password">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send verification link
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Link className="mt-4" to={'/login'}>
        Back to login
      </Link>
    </div>
  );
};
export default LoginPage;
