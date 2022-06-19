import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import styles from '../login/login.module.scss';
import { useParams } from 'react-router';
import { resetPassword } from '../login/actions/async-action';
import { Dispatch } from '../../types/index.types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [validated, setValidated] = useState(false);
  const dispatch: Dispatch = useDispatch();
  const token = useParams().token;
  const onFinish = (formData: any) => {
    const onSuccess = () => {
      alert('Password reset successfully !');
    };
    if (formData.password === formData.confirmPassword && token) {
      dispatch(resetPassword(formData.password, token, onSuccess));
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    setValidated(true);
  });
  if (validated)
    return (
      <div className={styles.container}>
        <Card title="Reset Password">
          <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your password agin' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Link className="mt-4" to={'/login'}>
          Back to login
        </Link>
      </div>
    );
  return <>Loading..</>;
};

export default ResetPassword;
