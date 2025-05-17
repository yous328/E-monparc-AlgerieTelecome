import React, { useEffect, useState } from 'react';
import { MissionStatCard } from '../components/Missions/Dashboard/MissionStatCard';
import { MissionsList } from '../components/Missions/Dashboard/MissionsList';
import { MissionMap } from '../components/Missions/Map/MissionMap';
import { AddMissionButton } from '../components/Missions/Dashboard/AddMissionButton';
import { useMission } from '../context/mission/useMission';
import { IMission } from '../interfaces/mission/IMission';
import { Layout } from '../layouts/MainLayout';

const MissionDashboardPage: React.FC = () => {
    const { missions, stats, loading, error, fetchMissions } = useMission();
    const [selectedMission, setSelectedMission] = useState<IMission | null>(null);
    
    // Use an empty dependency array to only fetch missions once when the component mounts
    useEffect(() => {
        fetchMissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Calculate total missions for stat percentages
    const totalMissions = (stats?.inProgress?.count || 0) + 
                          (stats?.scheduled?.count || 0) + 
                          (stats?.canceled?.count || 0) +
                          (stats?.completed?.count || 0);
    
    // Debug: Check if stats match actual mission counts
    useEffect(() => {
        if (missions.length > 0) {
            const actualCounts = {
                inProgress: missions.filter(m => m.status === 'in-progress').length,
                scheduled: missions.filter(m => m.status === 'scheduled').length,
                canceled: missions.filter(m => m.status === 'canceled').length,
                completed: missions.filter(m => m.status === 'completed').length,
                total: missions.length
            };
            
            console.log('Stats from context:', {
                inProgress: stats.inProgress.count,
                scheduled: stats.scheduled.count,
                canceled: stats.canceled.count,
                completed: stats.completed.count,
                total: totalMissions
            });
            
            console.log('Actual counts from missions array:', actualCounts);
            
            // Alert if there's a significant mismatch
            if (stats.canceled.count !== actualCounts.canceled ||
                stats.inProgress.count !== actualCounts.inProgress ||
                stats.scheduled.count !== actualCounts.scheduled ||
                stats.completed.count !== actualCounts.completed) {
                console.warn('⚠️ Stats mismatch detected between KPI cards and actual mission counts!');
            }
        }
    }, [missions, stats, totalMissions]);
    
    // Handle mission selection for map display
    const handleMissionSelect = (mission: IMission) => {
        setSelectedMission(mission);
    };
    
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center mb-6">
                        <svg className="w-6 h-6 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7V12L14.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Missions
                    </h1>
                    
                    {/* Stats Cards Grid - Removing Mission terminé card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <MissionStatCard stat={stats.inProgress} total={totalMissions} />
                        <MissionStatCard stat={stats.scheduled} total={totalMissions} />
                        <MissionStatCard stat={stats.canceled} total={totalMissions} />
                    </div>
                    
                    {/* Add Mission Button between KPI cards and map */}
                    <div className="flex justify-end mb-4">
                        <AddMissionButton width="auto" />
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mission List */}
                    <div className="lg:col-span-1 h-[600px]">
                        <MissionsList 
                            missions={missions} 
                            onMissionSelect={handleMissionSelect}
                            selectedMissionId={selectedMission?.id}
                        />
                    </div>
                    
                    {/* Map */}
                    <div className="lg:col-span-2 h-[600px]">
                        {/* Force re-render the map component when mission changes using key */}
                        <MissionMap 
                            key={selectedMission?.id || 'no-mission'} 
                            mission={selectedMission} 
                        />
                    </div>
                </div>
                
                {/* Loading and Error States */}
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-md shadow-lg">
                            <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-2 text-center text-gray-600">Chargement...</p>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md shadow-lg">
                        <div className="flex">
                            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="font-bold">Erreur</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default MissionDashboardPage; 