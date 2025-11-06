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
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" />
      <Nav />  {/* Always show navbar */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />

        {/* Auth Routes */}
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

        {/* Protected Routes */}
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
