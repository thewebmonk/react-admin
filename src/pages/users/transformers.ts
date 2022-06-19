import { User } from '../login/login.types';

export const transformUserFromAPItoUI = (users: User[]) => {
  return users.map((user: User) => {
    return { ...user, key: user.id };
  });
};
