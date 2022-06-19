import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { openNotification } from '../../../common/utils';
import { permissions } from '../../../common/utils/constants';
import { Dispatch } from '../../../types/index.types';
import { roles } from '../../login/constants';
import { Permission, User } from '../../login/login.types';
import { createUser, getUser, updateUser } from '../actions/async-action';
import { CreateUserPayload, UserFormField } from '../users.types';

export const useUserForm = (editMode?: boolean) => {
  const form: any = useRef(null);
  const [role, setRole] = useState(roles.ADMIN);
  const [initialValues, setInitialValues] = useState<UserFormField>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'admin',
    permission: Object.values(permissions),
    password: '',
    password_confirmation: ''
  });
  const dispatch = useDispatch<Dispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleCreateUser = async (formValue: UserFormField) => {
    const permission: any = {};
    Object.values(permissions).map((prm: string) => {
      permission[prm] = formValue.permission.includes(prm);
    });
    const payload: CreateUserPayload = {
      ...formValue,
      permission: JSON.stringify(permission)
    };
    const user = await dispatch(createUser(payload));
    if (user) {
      openNotification({
        message: 'User Created.'
      });
      form.current && form.current.resetFields();
    } else {
      openNotification({
        message: 'Something went wrong'
      });
    }
  };
  const handleEditUser = async (formValue: UserFormField) => {
    const permission: any = {};
    Object.values(permissions).map((prm: string) => {
      permission[prm] = formValue.permission.includes(prm);
    });
    const payload: CreateUserPayload = {
      ...formValue,
      permission: JSON.stringify(permission)
    };
    const user = await dispatch(updateUser(id, payload));
    if (user) {
      openNotification({
        message: 'User Updated.'
      });
      navigate('../');
    } else {
      openNotification({
        message: 'Something went wrong'
      });
    }
  };

  useEffect(() => {
    if (editMode && id) {
      dispatch(getUser(id)).then((data: User | null) => {
        if (data) {
          const prms: string[] = [];
          Object.entries(data.permission).forEach((prm: [string, boolean]) => {
            prm[1] && prms.push(prm[0]);
          });
          const { firstName, lastName, email, role } = data;
          setRole(role);
          if (form.current) {
            const values = form.current.getFieldsValue();
            form.current.setFieldsValue({ ...values, firstName, lastName, email, role, permission: prms });
          }
        } else {
          navigate('../');
        }
      });
    }
  }, []);

  return { form, role, setRole, initialValues, handleCreateUser, handleEditUser };
};
