// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VehiclesPage } from '../pages/vehicles/VehiclePage';
import VehicleDetailPage from '../pages/vehicles/VehicleDetailPage';
import AddVehicle from '../pages/vehicles/AddVehicle';
import { ProtectedRoute } from '../components/utils/ProtectedRoute';
import { DashboardProvider } from '../context/Dashboard/DashboardProvider';

export function AppRouter() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
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

            <Route
                path="/vehicles"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <VehiclesPage />
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicles/:id"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <VehicleDetailPage />
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicles/add"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <AddVehicle />
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            {/* Catch-all: redirect unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
