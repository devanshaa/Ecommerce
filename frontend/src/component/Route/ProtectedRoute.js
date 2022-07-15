import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import { useParams
//  } from "react-router-dom";
const ProtectedRoute = ({ isAdmin,element: Element, ...rest }) => {
  // const {isAdmin} = useParams();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  // console.log("HELLO");
  // console.log("he is "+isAuthenticated);

  return (
    <Fragment>
    {/* {console.log("is loading "+loading)}; */}
      {loading === false && (
          <Routes>
            <Route
              render={(props) => {
              // console.log(props)
                if (isAuthenticated === false) {
                  return <Navigate to="/login" />;
                }
                console.log(isAdmin);
                if (isAdmin === true && user.role !== "admin") {
                  return <Navigate to="/login" />;
                }

                return <Element {...props} />;
              }}
            />
          </Routes>
      )}
      <Outlet/>
    </Fragment>
  );
};

export default ProtectedRoute;
