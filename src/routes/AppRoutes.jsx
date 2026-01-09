import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ForgotPassword from "../features/auth/ForgotPassword";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../features/auth/Login"));
const Dashboard = lazy(() => import("../features/dashboard/Dashboard"));
const Register = lazy(() => import("../features/auth/Register"));
const Users = lazy(() => import("../features/users/Users"));
const AddUser = lazy(() => import("../features/users/AddUser"));
const Reports = lazy(() => import("../features/reports/Reports"));
const Settings = lazy(() => import("../features/settings/Settings"));
const ProductList = lazy(() => import("../features/shop/ProductList"));
const ProductDetail = lazy(() => import("../features/shop/ProductDetail"));
const Cart = lazy(() => import("../features/shop/Cart"));
const Checkout = lazy(() => import("../features/shop/Checkout"));
const AdminProducts = lazy(() => import("../features/shop/AdminProducts"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </Suspense>
  );
}
