export type Auth = {
  authToken: string | null;
  permission: Permission | null;
  user: User | null;
};
export type Authtoken = {
  authToken: string;
  expiresIn: string;
  user: any;
};

export type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

export type User = {
  id: number;
  firstName: string;
  lastName?: any;
  email: string;
  email_verified_at?: any;
  role: Role;
  permission: Permission;
  created_at?: any;
  updated_at?: any;
};

export type Role = 'root' | 'admin' | 'editor' | 'viewer';

export type Permission = {
  NEWSLETTER: boolean;
  VIDEOS: boolean;
  DASHBOARD: boolean;
};
