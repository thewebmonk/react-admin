import React from 'react';
import './App.scss';
import './common/scss/global.scss';
import LoginPage from './pages/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import { useIsAuthentciated } from './hooks';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/forgot-password/reset-pssword';
import AppLoader from './common/components/app-loader';
import ErrorModal from './common/components/error-modal';
// import PrivateRoute from './route/PrivateRoute';

function App() {
  const isAuthentciated = useIsAuthentciated();
  return (
    <>
      <AppLoader />
      <ErrorModal />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isAuthentciated ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/forgotPassword" element={!isAuthentciated ? <ForgotPassword /> : <Navigate to="/" replace />} />
          <Route
            path="/resetPassword/:token"
            element={!isAuthentciated ? <ResetPassword /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={isAuthentciated ? <AppLayout /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
