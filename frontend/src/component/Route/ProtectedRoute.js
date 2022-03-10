import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import {  Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Outlet
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate to="/login" />;
            }
            
            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

 export default ProtectedRoute;

// import React, { Fragment } from 'react';
// import { useSelector } from "react-redux";
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const { loading, isAuthenticated, user, isAdmin } = useSelector((state) => state.user);
//   console.log('selector state values', isAuthenticated, user, isAdmin, loading)
// if(!loading){
// if(!isAuthenticated){
//   return <Navigate to="/login"/>
// }
// if(isAdmin === true && user.role !== "admin"){
//   return <Navigate to="/login"/>
// }
// return children
// }
// return <div>Loading...</div>
// };

// export default ProtectedRoute;