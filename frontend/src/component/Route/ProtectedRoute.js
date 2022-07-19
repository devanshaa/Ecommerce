import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, Route, Routes } from "react-router-dom";
// import { useParams
//  } from "react-router-dom";
const ProtectedRoute = ({ isAdmin,element: Element, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  // console.log("HELLO");
  // console.log("he is "+isAdmin);

  return (
    <Fragment>
    {/* {console.log(isAdmin === true && user?.role !== "admin")}; */}
      {loading === false && (
          <Routes>
            <Route
              render={(props) => {
              // console.log(props)
              // console.log("hi");
                if (isAuthenticated === false) {
                  return navigate("/login" );
                }
                if (isAdmin === true && user?.role !== "admin") {
                  return navigate("/login" );
                }

                return <Element {...props} />;
              }}
            />
            {/* {console.log("Ji")} */}
          </Routes>
      )}
      <Outlet/>
    </Fragment>
  );
};

export default ProtectedRoute;
