import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MissionFormActionsProps {
    onSubmit: () => void;
    isSubmitting: boolean;
}

export const MissionFormActions: React.FC<MissionFormActionsProps> = ({
    onSubmit,
    isSubmitting
}) => {
    const navigate = useNavigate();
    
    const handleCancel = () => {
        navigate('/missions');
    };
    
    return (
        <div className="flex justify-end space-x-4 mt-6">
            <button
                type="button"
                className="py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleCancel}
                disabled={isSubmitting}
            >
                Annuler
            </button>
            
            <button
                type="button"
                className="py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Programmation...
                    </div>
                ) : (
                    'Programmer'
                )}
            </button>
        </div>
    );
}; 