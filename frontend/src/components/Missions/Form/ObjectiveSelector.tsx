import React, { useState, useEffect } from 'react';
import { IMissionObjectiveOption } from '../../../interfaces/mission/IMissionForm';
import { ChevronDown } from 'lucide-react';

interface ObjectiveSelectorProps {
    selectedObjective: string;
    onChange: (objective: string) => void;
    error?: string;
    objectives: IMissionObjectiveOption[];
}

export const ObjectiveSelector: React.FC<ObjectiveSelectorProps> = ({
    selectedObjective,
    onChange,
    error,
    objectives = [] // Default to empty array if not provided
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Get selected objective name for display
    const selectedObjectiveName = objectives.find(o => o.id === selectedObjective)?.name || '';
    
    // Debug objectives array on mount and when it changes
    useEffect(() => {
        console.log('ObjectiveSelector - Objectives changed:', objectives);
        console.log('ObjectiveSelector - Objectives length:', objectives.length);
        console.log('ObjectiveSelector - First objective (if any):', objectives[0]);
    }, [objectives]);
    
    // Debug objectives array
    console.log('ObjectiveSelector - Objectives:', objectives);
    console.log('ObjectiveSelector - Selected Objective:', selectedObjective);
    
    const toggleDropdown = () => {
        console.log('Toggling dropdown. Current state:', isOpen);
        setIsOpen(!isOpen);
        console.log('New dropdown state will be:', !isOpen);
    };
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Objectif de Mission
            </label>
            
            <div className="relative">
                <button
                    type="button"
                    className={`bg-white relative w-full border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    onClick={toggleDropdown}
                >
                    {selectedObjectiveName ? (
                        <span className="block truncate">{selectedObjectiveName}</span>
                    ) : (
                        <span className="block truncate text-gray-400">Choisir Objectif</span>
                    )}
                    
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown size={16} className="text-gray-400" />
                    </span>
                </button>
                
                {/* Dropdown menu */}
                {isOpen && (
                    <>
                    {console.log("Dropdown should be visible")}
                    <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                         style={{ pointerEvents: 'auto' }}>
                        {objectives.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-500">No objectives available</div>
                        ) : (
                            objectives.map((objective) => (
                                <div
                                    key={objective.id}
                                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                                        selectedObjective === objective.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                        onChange(objective.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className={`block truncate ${selectedObjective === objective.id ? 'font-medium' : 'font-normal'}`}>
                                        {objective.name}
                                    </span>
                                    
                                    {selectedObjective === objective.id && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    </>
                )}
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 