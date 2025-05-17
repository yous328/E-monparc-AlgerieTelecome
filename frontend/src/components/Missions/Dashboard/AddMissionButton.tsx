import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Add a width prop to control button width
interface AddMissionButtonProps {
    width?: 'full' | 'auto';
}

export const AddMissionButton: React.FC<AddMissionButtonProps> = ({ width = 'full' }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/missions/add');
    };
    
    // Use the original styling but make width conditional
    const buttonClass = `${width === 'full' ? 'w-full' : 'w-auto'} bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-3 px-4 rounded-lg flex items-center justify-center transition duration-200 ease-in-out shadow-sm`;
    
    return (
        <button
            onClick={handleClick}
            className={buttonClass}
        >
            <Plus size={18} className="mr-2 text-blue-600" />
            <span className="font-medium">Ajouter Une Mission</span>
        </button>
    );
}; 