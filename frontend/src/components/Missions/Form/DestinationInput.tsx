import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface DestinationInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const DestinationInput: React.FC<DestinationInputProps> = ({
    value,
    onChange,
    error
}) => {
    const [suggestedLocations, setSuggestedLocations] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Mock location suggestions - in a real app, this would use a maps API
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue);
        
        // Show suggestions only if there's input text
        if (inputValue.length > 2) {
            // Mock location suggestions based on input
            const mockSuggestions = [
                `${inputValue}, Alger, Algérie`,
                `${inputValue} Centre, Oran, Algérie`,
                `${inputValue} Nord, Constantine, Algérie`,
                `${inputValue} Est, Annaba, Algérie`,
                `${inputValue} Sud, Ghardaia, Algérie`,
            ];
            
            setSuggestedLocations(mockSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestedLocations([]);
            setShowSuggestions(false);
        }
    };
    
    const selectSuggestion = (suggestion: string) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
            </label>
            
            <div className="relative">
                {/* Input with icon */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-gray-400" />
                    </div>
                    
                    <input
                        type="text"
                        className={`block w-full pl-10 pr-3 py-2 border ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="Ajouter Destination"
                        value={value}
                        onChange={handleInputChange}
                        onFocus={() => value.length > 2 && setShowSuggestions(true)}
                        onBlur={() => {
                            // Delay hiding suggestions to allow clicking them
                            setTimeout(() => setShowSuggestions(false), 200);
                        }}
                    />
                </div>
                
                {/* Location suggestions dropdown */}
                {showSuggestions && suggestedLocations.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {suggestedLocations.map((location, index) => (
                            <div
                                key={index}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                                onClick={() => selectSuggestion(location)}
                                onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing before click
                            >
                                <MapPin size={16} className="text-gray-400 mr-2" />
                                <span>{location}</span>
                            </div>
                        ))}
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