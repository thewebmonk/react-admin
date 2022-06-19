import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getFirstApplicablePage } from './common/utils';
import { NavContext, useIsAdmin, usePermission } from './hooks';
import Header from './pages/commom/components/header';
import SideBar from './pages/commom/components/side-bar';
import Dashboard from './pages/dashboard';
import { getLoggedInUserAndPermission } from './actions/async-action';
import Profile from './pages/profile';
import { Dispatch } from './types/index.types';
import UsersPage from './pages/users';
import NewsLetter from './pages/newsletter';
import Videos from './pages/videos';

const AppLayout = () => {
  const dispatch = useDispatch<Dispatch>();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [goBackRoute, setGoBackRoute] = useState('');
  const [intialDataFetched, setIntialDataFetched] = useState(false);
  const permission = usePermission();
  const isAdmin = useIsAdmin();
  const firstApplicablePage = getFirstApplicablePage(permission, isAdmin);
  useEffect(() => {
    const onSuccess = () => {
      setIntialDataFetched(true);
    };
    dispatch(getLoggedInUserAndPermission(onSuccess));
  }, []);
  return intialDataFetched && firstApplicablePage ? (
    <NavContext.Provider value={{ goBackRoute, setGoBackRoute }}>
      <div className="ash-admin">
        <SideBar {...{ setSideBarOpen, sideBarOpen, permission, isAdmin }} />
        <div className="main">
          <Header {...{ setSideBarOpen, sideBarOpen }} />
          <div className="content">
            <Routes>
              <Route
                path="/videos/*"
                element={permission.VIDEOS ? <Videos /> : <Navigate to={`/${firstApplicablePage}`} replace />}
              />
              <Route
                path="/newsletter"
                element={permission.NEWSLETTER ? <NewsLetter /> : <Navigate to={`/${firstApplicablePage}`} replace />}
              />
              <Route
                path="/dashboard"
                element={permission.DASHBOARD ? <Dashboard /> : <Navigate to={`/${firstApplicablePage}`} replace />}
              />
              <Route
                path="/users/*"
                element={isAdmin ? <UsersPage /> : <Navigate to={`/${firstApplicablePage}`} replace />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/*" element={<Navigate to={`/${firstApplicablePage}`} replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </NavContext.Provider>
  ) : (
    <></>
  );
};

export default AppLayout;
