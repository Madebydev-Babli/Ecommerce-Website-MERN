import React, { memo, useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './components/Nav';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import { Toaster } from "react-hot-toast";

function App() {
  let { userData } = useContext(userDataContext);
  let location = useLocation();

  return (
    <>
    <Toaster position="top-center" />
      {userData && <Nav />}
      <Routes>
        {/* Login and Signup routes can always be accessed IF not logged in */}
        <Route
          path="/login"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Signup />
          }
        />

        {/* PROTECTED ROUTES: redirect to /login if no userData */}
        <Route
          path="/"
          element={
            userData
              ? <Home />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/about"
          element={
            userData
              ? <About />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/contact"
          element={
            userData
              ? <Contact />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/collection"
          element={
            userData
              ? <Collection />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/product"
          element={
            userData
              ? <Product />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/productdetail/:id"
          element={
            userData
              ? <ProductDetail />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/cart"
          element={
            userData
              ? <CartPage />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/placeorder"
          element={
            userData
              ? <PlaceOrder />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
        <Route
          path="/orders"
          element={
            userData
              ? <Orders />
              : <Navigate to="/login" state={{ from: location.pathname }} replace />
          }
        />
      </Routes>
    </>
  );
}

export default memo(App);
