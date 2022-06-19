import React from 'react';
// eslint-disable-next-line no-unused-vars
import { PathRouteProps, Route } from 'react-router';

const PrivateRoute = ({ element: Element, ...rest }: PathRouteProps) => {
  return <Route {...rest} element={Element} />;
};

export default PrivateRoute;
