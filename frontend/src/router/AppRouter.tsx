// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VehiclesPage } from '../pages/vehicles/VehiclePage';
import VehicleDetailPage from '../pages/vehicles/VehicleDetailPage';
import AddVehicle from '../pages/vehicles/AddVehicle';
import { ProtectedRoute } from '../components/utils/ProtectedRoute';
import { DashboardProvider } from '../context/Dashboard/DashboardProvider';
import { VehicleFormProvider } from '../context/vehicle/AddVehicle/VehicleFormProvider';
import MissionDashboardPage from '../pages/MissionDashboardPage';
import AddMissionPage from '../pages/AddMissionPage';
import { MissionProvider } from '../context/mission/MissionProvider';

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
                            <VehicleFormProvider>
                                <AddVehicle />
                            </VehicleFormProvider>
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            {/* Mission Routes */}
            <Route
                path="/missions"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <MissionProvider>
                                <MissionDashboardPage />
                            </MissionProvider>
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/missions/add"
                element={
                    <ProtectedRoute>
                        <DashboardProvider>
                            <MissionProvider>
                                <AddMissionPage />
                            </MissionProvider>
                        </DashboardProvider>
                    </ProtectedRoute>
                }
            />

            {/* Catch-all: redirect unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
