import React, { useState } from 'react';
import { IDriverOption } from '../../../interfaces/mission/IMissionForm';
import { ChevronDown, User } from 'lucide-react';

interface DriverSelectorProps {
    selectedDriverId: number | null;
    onChange: (driverId: number | null) => void;
    error?: string;
    drivers: IDriverOption[];
}

export const DriverSelector: React.FC<DriverSelectorProps> = ({
    selectedDriverId,
    onChange,
    error,
    drivers = [] // Default to empty array if not provided
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Get selected driver details for display
    const selectedDriver = drivers.find(d => d.id === selectedDriverId);
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Choisir Chauffeur
            </label>
            
            <div className="relative">
                <button
                    type="button"
                    className={`bg-white relative w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedDriver ? (
                        <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <span className="block truncate">{selectedDriver.name}</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-400">
                            <User size={16} className="mr-2" />
                            <span className="block truncate">Choisir Chauffeur</span>
                        </div>
                    )}
                    
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown size={16} className="text-gray-400" />
                    </span>
                </button>
                
                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {drivers.length > 0 ? (
                            drivers.map(driver => (
                                <div
                                    key={driver.id}
                                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                                        selectedDriverId === driver.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                        onChange(driver.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2 text-gray-400" />
                                        <span className={`block truncate ${selectedDriverId === driver.id ? 'font-medium' : 'font-normal'}`}>
                                            {driver.name}
                                        </span>
                                    </div>
                                    
                                    {selectedDriverId === driver.id && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500">Aucun chauffeur disponible</div>
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