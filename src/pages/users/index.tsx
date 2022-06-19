import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { useRoutes } from 'react-router-dom';
import ManageUser from './components/manage-user';
import UsersList from './components/users-list';

const UsersPage = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/addUser" element={<ManageUser />} />
      <Route path="/editUser/:id" element={<ManageUser editMode={true} />} />
      <Route path="/*" element={<Navigate to={`/users`} replace />} />
    </Routes>
  );
};

export default UsersPage;
