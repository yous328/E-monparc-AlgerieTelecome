import React from 'react';
import { AlignLeft } from 'lucide-react';

interface DescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({
    value,
    onChange,
    error
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
            </label>
            
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlignLeft size={16} className="text-gray-400" />
                </div>
                
                <textarea
                    rows={4}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="Ajouter Description"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                ></textarea>
            </div>
            
            {/* Counter for character limit */}
            <div className="mt-1 flex justify-end">
                <span className="text-xs text-gray-500">
                    {value.length} / 500 caractères
                </span>
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 