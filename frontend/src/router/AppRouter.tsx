// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

import { DashboardProvider } from '../context/Dashboard/DashboardProvider';

export function AppRouter() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected dashboard route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <DashboardPage />
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
