import React from 'react';
import { IMissionStat } from '../../../interfaces/mission/IMissionStats';

interface MissionStatCardProps {
    stat: IMissionStat;
    total: number;
}

export const MissionStatCard: React.FC<MissionStatCardProps> = ({ stat, total }) => {
    // Calculate the percentage for circular progress
    const percentage = total > 0 ? Math.round((stat.count / total) * 100) : 0;
    
    // CircularProgress style calculations
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
        <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex flex-col items-center justify-center space-y-2">
                {/* Icon */}
                <div 
                    className="w-16 h-16 flex items-center justify-center rounded-md"
                    style={{ backgroundColor: `${stat.color}10` }}
                >
                    {stat.icon === 'paper-plane' && (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                    {stat.icon === 'calendar' && (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2V6" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 2V6" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 10H21" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                    {stat.icon === 'ban' && (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.93 4.93L19.07 19.07" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </div>
                
                {/* Label */}
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
            
            {/* Circular Progress */}
            <div className="relative w-[120px] h-[120px]">
                {/* Background Circle */}
                <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                    <circle 
                        cx={size / 2} 
                        cy={size / 2} 
                        r={radius}
                        fill="none" 
                        stroke="#f1f5f9" 
                        strokeWidth={strokeWidth} 
                    />
                </svg>
                
                {/* Progress Circle */}
                <svg className="w-full h-full absolute top-0 left-0 -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                    <circle 
                        cx={size / 2} 
                        cy={size / 2} 
                        r={radius}
                        fill="none" 
                        stroke={stat.color} 
                        strokeWidth={strokeWidth} 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                
                {/* Count Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: stat.color }}>
                        {stat.count}
                    </span>
                </div>
                
                {/* Small progress indicator */}
                <div className="absolute bottom-0 right-0 flex items-center justify-center">
                    <div 
                        className="h-6 p-1 px-2 rounded-full bg-gray-50 text-xs font-medium flex items-center justify-center"
                        style={{ color: stat.color }}
                    >
                        {/* Small graph icon representing progress */}
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Missions</span>
                    </div>
                </div>
            </div>
        </div>
    );
}; 