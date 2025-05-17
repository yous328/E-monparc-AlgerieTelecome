import React, { useState } from 'react';
import { IMission } from '../../../interfaces/mission/IMission';
import { MissionItem } from './MissionItem';
import { Filter, Search } from 'lucide-react';

interface MissionsListProps {
    missions: IMission[];
    onMissionSelect: (mission: IMission) => void;
    selectedMissionId?: string;
}

export const MissionsList: React.FC<MissionsListProps> = ({ 
    missions = [], 
    onMissionSelect,
    selectedMissionId 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    
    // Map the filter buttons to actual status values in the data
    const statusMapping = {
        'en-cours': 'in-progress',
        'programme': 'scheduled',
        'annule': 'canceled',
        'termine': 'completed'
    };
    
    // Filter missions based on search term and status filter
    const filteredMissions = Array.isArray(missions) 
        ? missions.filter(mission => {
            // Filter by search term
            const matchesSearch = mission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  mission.destination.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Filter by status if a status filter is selected
            const matchesStatus = statusFilter ? mission.status === statusMapping[statusFilter as keyof typeof statusMapping] : true;
            
            return matchesSearch && matchesStatus;
        })
        : [];
    
    // Calculate status counts for debugging
    const statusCounts = Array.isArray(missions) 
        ? {
            'in-progress': missions.filter(m => m.status === 'in-progress').length,
            'scheduled': missions.filter(m => m.status === 'scheduled').length,
            'canceled': missions.filter(m => m.status === 'canceled').length,
            'completed': missions.filter(m => m.status === 'completed').length,
            'total': missions.length
        }
        : { 'in-progress': 0, 'scheduled': 0, 'canceled': 0, 'completed': 0, 'total': 0 };
    
    // Log status counts once when component renders or missions change
    React.useEffect(() => {
        console.log('MissionsList - Status Counts:', statusCounts);
    }, [JSON.stringify(statusCounts)]);
    
    // Handle filter button click
    const handleFilterClick = (filterKey: string) => {
        // Toggle filter off if it's already selected
        if (statusFilter === filterKey) {
            setStatusFilter(null);
        } else {
            setStatusFilter(filterKey);
        }
    };
    
    // Helper to get button style based on active filter
    const getFilterButtonStyle = (filterKey: string) => {
        const isActive = statusFilter === filterKey;
        
        switch (filterKey) {
            case 'en-cours':
                return `px-3 py-1 text-xs rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} font-medium`;
            case 'programme':
                return `px-3 py-1 text-xs rounded-full ${isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'} font-medium`;
            case 'annule':
                return `px-3 py-1 text-xs rounded-full ${isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'} font-medium`;
            case 'termine':
                return `px-3 py-1 text-xs rounded-full ${isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'} font-medium`;
            default:
                return 'px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium';
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Missions</h2>
                
                <button 
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={18} />
                </button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full bg-gray-50 border border-gray-200 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rechercher une mission..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Filters (conditionally rendered) */}
            {showFilters && (
                <div className="p-3 bg-gray-50 rounded-md mb-4 border border-gray-100">
                    <div className="text-sm font-medium text-gray-700 mb-2">Filtrer par statut</div>
                    <div className="flex flex-wrap gap-2">
                        <button 
                            className={getFilterButtonStyle('en-cours')}
                            onClick={() => handleFilterClick('en-cours')}
                        >
                            En cours
                        </button>
                        <button 
                            className={getFilterButtonStyle('programme')}
                            onClick={() => handleFilterClick('programme')}
                        >
                            Programmé
                        </button>
                        <button 
                            className={getFilterButtonStyle('annule')}
                            onClick={() => handleFilterClick('annule')}
                        >
                            Annulé
                        </button>
                        <button 
                            className={getFilterButtonStyle('termine')}
                            onClick={() => handleFilterClick('termine')}
                        >
                            Terminé
                        </button>
                    </div>
                </div>
            )}
            
            {/* Mission List */}
            <div className="flex-1 overflow-y-auto">
                {filteredMissions.length > 0 ? (
                    filteredMissions.map(mission => (
                        <MissionItem 
                            key={mission.id}
                            mission={mission}
                            onClick={onMissionSelect}
                            isSelected={mission.id === selectedMissionId}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <svg className="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm">Aucune mission trouvée</p>
                    </div>
                )}
            </div>
        </div>
    );
}; 