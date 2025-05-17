import React, { useState } from 'react';
import { IVehicleOption } from '../../../interfaces/mission/IMissionForm';
import { ChevronDown } from 'lucide-react';

interface VehicleSelectorProps {
    selectedVehicleId: number | null;
    onChange: (vehicleId: number | null) => void;
    error?: string;
    vehicles: IVehicleOption[];
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
    selectedVehicleId,
    onChange,
    error,
    vehicles = [] // Default to empty array if not provided
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Debug vehicles data
    console.log('VehicleSelector received vehicles:', vehicles);
    
    // Get selected vehicle details for display
    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Véhicule
            </label>
            
            <div className="relative">
                <button
                    type="button"
                    className={`bg-white relative w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedVehicle ? (
                        <span className="block truncate">{selectedVehicle.name}</span>
                    ) : (
                        <span className="block truncate text-gray-400">Choisir Véhicule</span>
                    )}
                    
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown size={16} className="text-gray-400" />
                    </span>
                </button>
                
                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {vehicles.length > 0 ? (
                            vehicles.map(vehicle => (
                                <div
                                    key={vehicle.id}
                                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                                        selectedVehicleId === vehicle.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                        onChange(vehicle.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <span className={`block truncate ${selectedVehicleId === vehicle.id ? 'font-medium' : 'font-normal'}`}>
                                            {vehicle.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {vehicle.brand} {vehicle.model ? `• ${vehicle.model}` : ''}
                                        </span>
                                    </div>
                                    
                                    {selectedVehicleId === vehicle.id && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500">Aucun véhicule disponible</div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 