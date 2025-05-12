// src/context/vehicle/useVehicles.tsx
import { useContext } from 'react';
import { VehiclesContext } from '../../context/vehicle/CreateVehiclesContext';

export const useVehicles = () => {
    const context = useContext(VehiclesContext);
    if (!context) {
        throw new Error('useVehicles must be used within a VehiclesProvider');
    }
    return context;
};
