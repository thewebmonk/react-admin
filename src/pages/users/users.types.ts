import { Permission } from '../login/login.types';

export type UserFormField = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permission: string[];
  password: string;
  password_confirmation: string;
};

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permission: string;
  password: string;
  password_confirmation: string;
};
