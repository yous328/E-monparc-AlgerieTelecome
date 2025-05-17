import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DatePickerProps {
    selectedDate: string;
    onChange: (date: string) => void;
    error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    selectedDate,
    onChange,
    error
}) => {
    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de Mission
            </label>
            
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                </div>
                
                <input
                    type="date"
                    className={`block w-full pl-10 pr-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={selectedDate}
                    onChange={(e) => onChange(e.target.value)}
                    min={today}
                    placeholder="Choisir Date"
                />
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

interface TimePickerProps {
    selectedTime: string;
    onChange: (time: string) => void;
    error?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    selectedTime,
    onChange,
    error
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Choisir l'Heure
            </label>
            
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-gray-400" />
                </div>
                
                <input
                    type="time"
                    className={`block w-full pl-10 pr-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={selectedTime}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Choisir l'Heure"
                />
            </div>
            
            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 