import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Outlet,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home.js";
import { ProductDetails } from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSinUp.js";
import store from "./store.js";
import { useState, useEffect } from "react";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/Not Found/NotFound.js";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/payment/stripeapikey");
    // console.log("stripeApiKey11:", data);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />

        <Route exact path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route path="/account/*" element={<ProtectedRoute />}>
          <Route path="/account/*" element={<Profile />} />
        </Route>

        <Route path="/me/update/*" element={<ProtectedRoute />}>
          <Route path="/me/update/*" element={<UpdateProfile />} />
        </Route>

        <Route path="/password/update/*" element={<ProtectedRoute />}>
          <Route path="/password/update/*" element={<UpdatePassword />} />
        </Route>

        <Route path="/password/forgot/*" element={<ProtectedRoute />}>
          <Route path="/password/forgot/*" element={<ForgotPassword />} />
        </Route>

        <Route path="/password/reset/:token/*" element={<ProtectedRoute />}>
          <Route path="/password/reset/:token/*" element={<ResetPassword />} />
        </Route>

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route
          path="/login/shipping/*"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        >
          <Route path="/login/shipping/*" element={<Shipping />} />
        </Route>

        <Route path="/orders/*" element={<ProtectedRoute />}>
          <Route path="/orders/*" element={<MyOrders />} />
        </Route>

        <Route path="/order/confirm/*" element={<ProtectedRoute />}>
          <Route path="/order/confirm/*" element={<ConfirmOrder />} />
        </Route>

        <Route path="/order/:id/*" element={<ProtectedRoute />}>
          <Route path="/order/:id/*" element={<OrderDetails />} />
        </Route>

        {stripeApiKey && (
          <Route exact path="/payment/process/*" element={<ProtectedRoute />}>
            <Route
              exact
              path="/payment/process/*"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            ></Route>
          </Route>
        )}

        <Route path="/success/*" element={<ProtectedRoute />}>
          <Route path="/success/*" element={<OrderSuccess />} />
        </Route>

        <Route
          path="/admin/dashboard/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route
          path="/admin/products/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/products/*" element={<ProductList />} />
        </Route>

        <Route
          path="/admin/product/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product/*" element={<NewProduct />} />
        </Route>

        <Route
          path="/admin/product/:id/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product/:id/*" element={<UpdateProduct />} />
        </Route>

        <Route
          path="/admin/orders/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/orders/*" element={<OrderList />} />
        </Route>

        <Route
          path="/admin/order/:id/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/order/:id/*" element={<ProcessOrder />} />
        </Route>

        <Route
          path="/admin/users/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/users/*" element={<UserList />} />
        </Route>

        <Route
          path="/admin/user/:id/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/user/:id/*" element={<UpdateUser />} />
        </Route>

        <Route
          path="/admin/reviews/*"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/reviews/*" element={<ProductReviews />} />
        </Route>

        <Route path="*" element={<NotFound/>}/>
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
