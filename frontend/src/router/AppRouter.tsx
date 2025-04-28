import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { useAuth } from '../context/auth/useAuth';

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
                <>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </>
            ) : (
                <>
                    {/* Redirect any unknown route to login if not authenticated */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            )}
        </Routes>
    );
}