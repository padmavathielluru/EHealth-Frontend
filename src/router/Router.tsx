// src/router/Router.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Pages/Layout';
import { Inbox } from '@mui/icons-material';
import InboxComponent from '../Pages/Inbox';

// ✅ Lazy-loaded pages
const CalendarM = lazy(() => import('../components/cards'));
const Login = lazy(() => import('../components/Login'));
const Appointment = lazy(() => import('../Pages/Appointment'));
const NotFound = lazy(() => import('../components/NotFound'));
const dashboard = lazy(()=>import('../Pages/Layout'));

// ✅ Example Protected Route Wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// ✅ Router Component
const AppRouter: React.FC = () => {
  // Replace this with your real authentication state
  const isAuthenticated = true; // e.g., from Redux, Zustand, or Context

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CalendarM />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Appointment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Appointment />
            </ProtectedRoute>
          }
        />

         <Route
          path="/inbox"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <InboxComponent />
            </ProtectedRoute>
          }
        />


        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
