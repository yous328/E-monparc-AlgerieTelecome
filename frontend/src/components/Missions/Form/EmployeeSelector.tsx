import React, { useState } from 'react';
import { IEmployeeOption } from '../../../interfaces/mission/IMissionForm';
import { ChevronDown, Users, X } from 'lucide-react';

interface EmployeeSelectorProps {
    selectedEmployeeIds: number[];
    onChange: (employeeIds: number[]) => void;
    error?: string;
    employees: IEmployeeOption[];
    maxSelections?: number;
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
    selectedEmployeeIds,
    onChange,
    error,
    employees = [], // Default to empty array if not provided
    maxSelections = 4 // Default to 4 max selections
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterText, setFilterText] = useState('');
    
    // Get selected employees details for display
    const selectedEmployees = employees.filter(e => selectedEmployeeIds.includes(e.id));
    
    // Filter employees based on search text
    const filteredEmployees = filterText
        ? employees.filter(employee => 
            employee.name.toLowerCase().includes(filterText.toLowerCase()) ||
            employee.department.toLowerCase().includes(filterText.toLowerCase()) ||
            employee.position.toLowerCase().includes(filterText.toLowerCase())
        )
        : employees;
    
    // Toggle employee selection
    const toggleEmployee = (employeeId: number) => {
        if (selectedEmployeeIds.includes(employeeId)) {
            // Remove if already selected
            onChange(selectedEmployeeIds.filter(id => id !== employeeId));
        } else if (selectedEmployeeIds.length < maxSelections) {
            // Add if not at max capacity
            onChange([...selectedEmployeeIds, employeeId]);
        }
    };
    
    // Remove a specific employee
    const removeEmployee = (employeeId: number, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        onChange(selectedEmployeeIds.filter(id => id !== employeeId));
    };
    
    // Clear all selections
    const clearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange([]);
    };
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                A l'accompagnement De (max {maxSelections})
            </label>
            
            <div className="relative">
                <button
                    type="button"
                    className={`bg-white relative w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedEmployees.length > 0 ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Users size={16} className="mr-2 text-gray-400" />
                                <span className="block truncate">
                                    {selectedEmployees.length === 1 
                                        ? selectedEmployees[0].name 
                                        : `${selectedEmployees.length} employés sélectionnés`}
                                </span>
                            </div>
                            
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={clearAll}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-400">
                            <Users size={16} className="mr-2" />
                            <span className="block truncate">Choisir Employé(s)</span>
                        </div>
                    )}
                    
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown size={16} className="text-gray-400" />
                    </span>
                </button>
                
                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none sm:text-sm">
                        {/* Search filter */}
                        <div className="p-2 border-b">
                            <input
                                type="text"
                                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Rechercher un employé..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        
                        {/* Selection status */}
                        <div className="px-3 py-2 bg-gray-50 border-b text-xs text-gray-500">
                            {selectedEmployeeIds.length} sur {maxSelections} sélectionnés
                        </div>
                        
                        {/* Employee list */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map(employee => (
                                    <div
                                        key={employee.id}
                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                                            selectedEmployeeIds.includes(employee.id) ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                        onClick={() => {
                                            toggleEmployee(employee.id);
                                            // Don't close dropdown after selection to allow multiple selections
                                            setFilterText('');
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <span className={`block truncate ${selectedEmployeeIds.includes(employee.id) ? 'font-medium' : 'font-normal'}`}>
                                                {employee.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {employee.position} - {employee.department}
                                            </span>
                                        </div>
                                        
                                        {selectedEmployeeIds.includes(employee.id) && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center text-gray-500">
                                    Aucun employé trouvé
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Show selected employees */}
            {selectedEmployees.length > 0 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                        Employés à l'accompagnement ({selectedEmployees.length})
                    </div>
                    <div className="space-y-2">
                        {selectedEmployees.map(employee => (
                            <div key={employee.id} className="flex items-start">
                                <div className="flex-1">
                                    <div className="font-medium text-sm">{employee.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {employee.position} - {employee.department}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeEmployee(employee.id)} 
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 