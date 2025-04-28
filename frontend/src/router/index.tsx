import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
// import { DashboardPage } from '../pages/DashboardPage'; // Later we will create it
import { useAuth } from '../context/auth/useAuth';

export function AppRouter() {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />}  />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes (only if authenticated) */}
                {isAuthenticated ? (
                    <>
                        
                    </>
                ) : (
                    <>
                        {/* If not logged in, redirect any unknown route to login */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}
