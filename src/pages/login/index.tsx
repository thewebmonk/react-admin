import React from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import styles from './login.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthToken } from './actions';
import { login } from './actions/async-action';
import { LoginPayload } from './login.types';
import { Dispatch } from '../../types/index.types';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const dispatch: Dispatch = useDispatch();
  const onFinish = (formData: any) => {
    const payload: LoginPayload = {
      email: formData.email,
      password: formData.password,
      remember: formData.remember
    };
    const onFail = () => {
      console.log('failed');
    };
    const onSuccess = (data: any) => {
      const date = new Date(new Date().getTime() + 100 * 60 * 60 * 1000);
      dispatch(
        setAuthToken({
          authToken: data.authToken,
          expiresIn: date.toString(),
          user: data.user
        })
      );
    };
    dispatch(login(payload, onFail, onSuccess));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    axios.post('');
  };
  return (
    <div className={styles.container}>
      <Card title="Login">
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

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Link className="mt-4" to={'/forgotPassword'}>
        Forgot Password ?
      </Link>
    </div>
  );
};
export default LoginPage;
