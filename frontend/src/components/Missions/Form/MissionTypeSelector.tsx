import React, { useState } from 'react';
import { IMissionTypeOption } from '../../../interfaces/mission/IMissionForm';

interface MissionTypeSelectorProps {
    selectedType: string;
    onChange: (type: string) => void;
    error?: string;
    missionTypes: IMissionTypeOption[];
}

export const MissionTypeSelector: React.FC<MissionTypeSelectorProps> = ({
    selectedType,
    onChange,
    error,
    missionTypes = [] // Default to empty array if not provided
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de Mission
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {missionTypes.map((type) => (
                    <button
                        key={type.id}
                        type="button"
                        className={`px-4 py-2 rounded-md border ${
                            selectedType === type.id
                                ? 'bg-blue-50 border-blue-500 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium`}
                        onClick={() => onChange(type.id)}
                    >
                        {type.name}
                    </button>
                ))}
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 