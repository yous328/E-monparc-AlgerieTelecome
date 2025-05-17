import React, { useState, useEffect } from 'react';
import { IMission } from '../../../interfaces/mission/IMission';
import { ChevronDown, ChevronUp, MapPin, Check, Calendar, User, Truck, Tag } from 'lucide-react';

interface MissionItemProps {
    mission: IMission;
    onClick: (mission: IMission) => void;
    isSelected?: boolean;
}

export const MissionItem: React.FC<MissionItemProps> = ({ mission, onClick, isSelected = false }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Log the mission data when component mounts
    useEffect(() => {
        console.log('Mission data:', mission);
    }, [mission]);
    
    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };
    
    // Determine progress color based on status
    const getProgressColor = () => {
        switch (mission.status) {
            case 'in-progress':
                return '#3eb7f8';
            case 'scheduled':
                return '#304ff2';
            case 'canceled':
                return '#ff5555';
            case 'completed':
                return '#4ade80';
            default:
                return '#9ca3af';
        }
    };
    
    // Get readable status text
    const getStatusText = () => {
        switch (mission.status) {
            case 'in-progress':
                return 'En cours';
            case 'scheduled':
                return 'Programmé';
            case 'canceled':
                return 'Annulé';
            case 'completed':
                return 'Terminé';
            default:
                return mission.status;
        }
    };
    
    // Add border and background color for selected mission
    const selectedStyle = isSelected ? 
        'border-blue-500 bg-blue-50' : 
        'border-gray-100';
    
    return (
        <div 
            className={`bg-white rounded-lg mb-2 overflow-hidden border ${selectedStyle} shadow-sm cursor-pointer transition-all duration-200`}
            onClick={() => onClick(mission)}
        >
            {/* Mission Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {/* Vehicle Icon */}
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17H4C3.44772 17 3 16.5523 3 16V12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12V16C21 16.5523 20.5523 17 20 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
                            <path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" fill="currentColor"/>
                            <path d="M3 11L6 5H18L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    
                    {/* Mission Info */}
                    <div>
                        <div className="font-semibold text-gray-800">{mission.id}</div>
                        <div className="text-sm text-gray-500">
                            {mission.destination}
                            <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-100">
                                {getStatusText()}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Toggle Button */}
                <button 
                    className="text-gray-500 hover:bg-gray-100 rounded-full p-1"
                    onClick={toggleExpand}
                >
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>
            
            {/* Progress Bar */}
            <div className="px-4 pb-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full rounded-full" 
                        style={{ 
                            width: `${mission.progress}%`,
                            backgroundColor: getProgressColor()
                        }}
                    />
                </div>
                <div className="text-xs text-right mt-1 text-gray-500">
                    {mission.progress}% {mission.status === 'in-progress' ? 'en cours' : ''}
                </div>
            </div>
            
            {/* Expanded Content */}
            {expanded && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                    {/* Additional Information */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                        <div className="flex items-center">
                            <Truck size={14} className="mr-1 text-gray-400" />
                            <span>{mission.vehicle.name}</span>
                        </div>
                        <div className="flex items-center">
                            <User size={14} className="mr-1 text-gray-400" />
                            <span>{mission.driver.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            <span>{mission.date} • {mission.time}</span>
                        </div>
                        <div className="flex items-center">
                            <Tag size={14} className="mr-1 text-gray-400" />
                            <span>{mission.type}</span>
                        </div>
                    </div>
                    
                    {/* Points */}
                    <div className="space-y-3 mt-2">
                        {mission.points.map((point, index) => (
                            <div key={index} className="flex items-start">
                                {/* Status Indicator */}
                                <div className="mt-1 mr-2">
                                    {point.status === 'completed' ? (
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <Check size={12} className="text-white" />
                                        </div>
                                    ) : point.status === 'current' ? (
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                    )}
                                </div>
                                
                                {/* Point Content */}
                                <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-800">{point.name}</div>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <MapPin size={12} className="mr-1" />
                                        {point.location}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {point.date} • {point.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 