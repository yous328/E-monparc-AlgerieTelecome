import { ReactNode, useState } from 'react';
import { MissionContext } from './missionContext';
import { IMission } from '../../interfaces/mission/IMission';
import { IMissionStats } from '../../interfaces/mission/IMissionStats';
import api from '../../lib/axios';

// Backend API endpoint for missions
const API_URL = 'admin/missions';

// Mock data for development
const MOCK_MISSIONS: IMission[] = [
    {
        id: 'MISS-3',
        vehicle: { id: 1, name: 'Toyota Corolla' },
        driver: { id: 1, name: 'Ahmed Benali' },
        accompanyingEmployee: {
            id: 1,
            name: 'Bouziane Nadir',
            position: 'Technicien Réseau',
            department: 'DOT ANNABA'
        },
        type: 'transport',
        destination: 'Annaba',
        date: '17/02/2025',
        time: '08:45',
        objective: 'network-maintenance',
        description: 'Mission de maintenance réseau',
        status: 'in-progress',
        progress: 50,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Sétif',
                time: '08:45',
                date: '17/02/2025',
                status: 'completed'
            },
            {
                id: 2,
                name: "Point d'arriver",
                location: 'Annaba',
                time: '10:45',
                date: '17/02/2025',
                status: 'pending'
            }
        ],
        createdAt: '17/02/2025',
        updatedAt: '17/02/2025'
    },
    {
        id: 'MISS-4',
        vehicle: { id: 2, name: 'Honda Civic' },
        driver: { id: 2, name: 'Mohammed Riad' },
        type: 'transport',
        destination: 'Annaba',
        date: '18/02/2025',
        time: '10:00',
        objective: 'client-visit',
        status: 'scheduled',
        progress: 0,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Alger',
                time: '10:00',
                date: '18/02/2025',
                status: 'pending'
            },
            {
                id: 2,
                name: "Point d'arriver",
                location: 'Annaba',
                time: '13:00',
                date: '18/02/2025',
                status: 'pending'
            }
        ],
        createdAt: '16/02/2025',
        updatedAt: '16/02/2025'
    },
    {
        id: 'MISS-5',
        vehicle: { id: 3, name: 'Ford Explorer' },
        driver: { id: 3, name: 'Karim Ziani' },
        type: 'maintenance',
        destination: 'Constantine',
        date: '15/02/2025',
        time: '09:30',
        objective: 'technical-support',
        status: 'scheduled',
        progress: 0,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Alger',
                time: '09:30',
                date: '15/02/2025',
                status: 'pending'
            },
            {
                id: 2,
                name: "Point d'arriver",
                location: 'Constantine',
                time: '12:30',
                date: '15/02/2025',
                status: 'pending'
            }
        ],
        createdAt: '14/02/2025',
        updatedAt: '14/02/2025'
    },
    {
        id: 'MISS-6',
        vehicle: { id: 4, name: 'Dacia Logan' },
        driver: { id: 4, name: 'Sofiane Feghouli' },
        type: 'customer-support',
        destination: 'Oran',
        date: '19/02/2025',
        time: '08:00',
        objective: 'technical-visit',
        status: 'completed',
        progress: 100,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Alger',
                time: '08:00',
                date: '19/02/2025',
                status: 'completed'
            },
            {
                id: 2,
                name: "Point d'arriver",
                location: 'Oran',
                time: '11:30',
                date: '19/02/2025',
                status: 'completed'
            }
        ],
        createdAt: '15/02/2025',
        updatedAt: '19/02/2025'
    },
    {
        id: 'MISS-7',
        vehicle: { id: 5, name: 'Renault Symbol' },
        driver: { id: 5, name: 'Ismael Bennacer' },
        type: 'installation',
        destination: 'Blida',
        date: '16/02/2025',
        time: '14:00',
        objective: 'equipment-installation',
        status: 'canceled',
        progress: 0,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Alger',
                time: '14:00',
                date: '16/02/2025',
                status: 'pending'
            },
            {
                id: 2,
                name: "Point d'arriver",
                location: 'Blida',
                time: '15:30',
                date: '16/02/2025',
                status: 'pending'
            }
        ],
        createdAt: '13/02/2025',
        updatedAt: '15/02/2025'
    },
    {
        id: 'MISS-8',
        vehicle: { id: 6, name: 'Hyundai Accent' },
        driver: { id: 6, name: 'Riyad Mahrez' },
        type: 'delivery',
        destination: 'Tlemcen',
        date: '20/02/2025',
        time: '07:30',
        objective: 'equipment-delivery',
        status: 'in-progress',
        progress: 65,
        points: [
            {
                id: 1,
                name: 'Point de départ',
                location: 'Alger',
                time: '07:30',
                date: '20/02/2025',
                status: 'completed'
            },
            {
                id: 2,
                name: 'Point intermédiaire',
                location: 'Chlef',
                time: '10:30',
                date: '20/02/2025',
                status: 'current'
            },
            {
                id: 3,
                name: "Point d'arriver",
                location: 'Tlemcen',
                time: '14:00',
                date: '20/02/2025',
                status: 'pending'
            }
        ],
        createdAt: '18/02/2025',
        updatedAt: '20/02/2025'
    }
];

const MOCK_STATS = {
    inProgress: {
        count: 1800,
        label: 'Mission en cours',
        icon: 'paper-plane',
        color: '#3eb7f8',
    },
    scheduled: {
        count: 350,
        label: 'Mission Programmer',
        icon: 'calendar',
        color: '#304ff2',
    },
    canceled: {
        count: 50,
        label: 'Mission Annulé',
        icon: 'ban',
        color: '#ff5555',
    }
};

// Helper function to transform backend mission data to our frontend format
const transformMissionData = (mission: any): IMission => {
    // Add safety checks to handle missing properties
    if (!mission) {
        console.error('Mission data is undefined');
        return {} as IMission;
    }

    console.log('Transforming mission data:', mission);
    
    // Extract vehicle information
    const vehicleName = mission.vehicle 
        ? (mission.vehicle.model && mission.vehicle.registration_number 
            ? `${mission.vehicle.model} (${mission.vehicle.registration_number})` 
            : mission.vehicle.model || mission.vehicle.registration_number || 'Unknown Vehicle')
        : 'Unknown Vehicle';
    
    // Extract driver information
    const driverName = mission.driver 
        ? (mission.driver.firstName && mission.driver.lastName 
            ? `${mission.driver.firstName} ${mission.driver.lastName}` 
            : mission.driver.name || 'Unknown Driver')
        : 'Unknown Driver';
        
    // Get mission status in the correct format
    const status = (() => {
        const backendStatus = mission.status || 'scheduled';
        
        console.log(`Mission ID ${mission.id || mission.missionID}: Converting status from '${backendStatus}'`);
        
        // Map backend status formats to our frontend format
        switch(backendStatus) {
            case 'in_progress':
                return 'in-progress';
            case 'scheduled':
            case 'pending':
            case 'not_started_yet': // Treat 'not_started_yet' as scheduled
                return 'scheduled';
            case 'cancelled':  // British spelling from API
            case 'canceled':   // American spelling used in frontend
                return 'canceled';
            case 'completed':
            case 'done':
                return 'completed';
            default:
                console.warn(`Unknown status format: '${backendStatus}', defaulting to 'scheduled'`);
                return 'scheduled';
        }
    })();
    
    // Calculate progress based on status if not explicitly provided
    const progress = mission.progress !== undefined ? mission.progress : 
        status === 'in-progress' ? 50 : 
        status === 'completed' ? 100 : 0;
    
    // Format dates for display
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        
        // Try to parse date in common formats
        let date;
        try {
            date = new Date(dateStr);
            // Check if valid date
            if (isNaN(date.getTime())) {
                return dateStr; // Return original if invalid
            }
            return date.toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            });
        } catch (e) {
            return dateStr; // Return original if can't parse
        }
    };

    // Format times for display
    const formatTime = (timeStr: string) => {
        if (!timeStr) return '';
        
        // If it's already just a time (HH:MM), return as is
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeStr)) {
            return timeStr;
        }
        
        // Try to extract time from datetime
        try {
            const date = new Date(timeStr);
            if (isNaN(date.getTime())) {
                return timeStr; // Return original if invalid
            }
            return date.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
        } catch (e) {
            return timeStr; // Return original if can't parse
        }
    };
    
    // Prepare points array with default values if missing
    const departurePoint = {
        id: 1,
        name: 'Point de départ',
        location: mission.departure_location || 'Non spécifié',
        time: formatTime(mission.mission_time || mission.created_at || ''),
        date: formatDate(mission.mission_date || mission.created_at || ''),
        status: status === 'completed' ? 'completed' : status === 'in-progress' ? 'current' : 'pending'
    };
    
    const destinationPoint = {
        id: 2,
        name: "Point d'arriver",
        location: mission.destination || 'Non spécifié',
        time: formatTime(mission.mission_time || mission.created_at || ''),
        date: formatDate(mission.mission_date || mission.created_at || ''),
        status: status === 'completed' ? 'completed' : 'pending'
    };
    
    // Use provided points or create default ones
    const points = mission.points && Array.isArray(mission.points) && mission.points.length > 0 
        ? mission.points 
        : [departurePoint, destinationPoint];

    return {
        id: mission.id || `MISS-${mission.missionID || '0'}`,
        vehicle: { 
            id: mission.vehicleID || mission.vehicle?.vehicleID || 0, 
            name: vehicleName
        },
        driver: { 
            id: mission.driverID || mission.driver?.driverID || 0, 
            name: driverName
        },
        accompanyingEmployee: mission.accompanyingEmployee ? {
            id: mission.accompanyingEmployeeID || mission.accompanyingEmployee.employeeID || 0,
            name: mission.accompanyingEmployee.name || `${mission.accompanyingEmployee.firstName || ''} ${mission.accompanyingEmployee.lastName || ''}`,
            position: mission.accompanyingEmployee.position || 'Employee',
            department: mission.accompanyingEmployee.department || 'Department'
        } : undefined,
        type: mission.type || (mission.missionType ? mission.missionType.category || mission.missionType.name || 'Mission' : 'Mission'),
        destination: mission.destination || 'Non spécifié',
        date: formatDate(mission.mission_date || mission.created_at || ''),
        time: formatTime(mission.mission_time || mission.created_at || ''),
        objective: mission.objective || (mission.missionObjective ? mission.missionObjective.name || '' : ''),
        description: mission.description || '',
        status: status,
        progress: progress,
        points: points,
        createdAt: formatDate(mission.created_at || ''),
        updatedAt: formatDate(mission.updated_at || '')
    };
};

interface MissionProviderProps {
    children: ReactNode;
}

export const MissionProvider = ({ children }: MissionProviderProps) => {
    const [missions, setMissions] = useState<IMission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMission, setSelectedMission] = useState<IMission | null>(null);
    
    // Default stats
    const [stats, setStats] = useState<IMissionStats>({
        inProgress: {
            count: 0,
            label: 'Mission en cours',
            icon: 'paper-plane',
            color: '#3eb7f8',
        },
        scheduled: {
            count: 0,
            label: 'Mission Programmer',
            icon: 'calendar',
            color: '#304ff2',
        },
        canceled: {
            count: 0,
            label: 'Mission Annulé',
            icon: 'ban',
            color: '#ff5555',
        },
        completed: {
            count: 0,
            label: 'Mission Terminé',
            icon: 'check-circle',
            color: '#10b981',
        },
    });

    const fetchMissions = async () => {
        setLoading(true);
        setError(null);
        try {
            // Attempt to fetch from the real API
            try {
                console.log('Fetching missions from API...');
                // Get missions from the API
                const missionsResponse = await api.get(API_URL);
                
                console.log('API Response:', missionsResponse);
                
                if (missionsResponse.data && Array.isArray(missionsResponse.data)) {
                    console.log('Number of missions from API:', missionsResponse.data.length);
                    // Transform backend data to our frontend format
                    const transformedMissions = missionsResponse.data.map(transformMissionData);
                    console.log('Transformed missions:', transformedMissions);
                    
                    // Always calculate stats directly from the transformed missions
                    const inProgressCount = transformedMissions.filter(m => m.status === 'in-progress').length;
                    const scheduledCount = transformedMissions.filter(m => m.status === 'scheduled').length;
                    const canceledCount = transformedMissions.filter(m => m.status === 'canceled').length;
                    const completedCount = transformedMissions.filter(m => m.status === 'completed').length;
                    
                    console.log('Final mission stats:', {
                        inProgress: inProgressCount,
                        scheduled: scheduledCount,
                        canceled: canceledCount,
                        completed: completedCount,
                        total: transformedMissions.length
                    });
                    
                    // Set both missions and stats in the same render cycle to ensure consistency
                    setMissions(transformedMissions);
                    setStats({
                        inProgress: {
                            count: inProgressCount,
                            label: 'Mission en cours',
                            icon: 'paper-plane',
                            color: '#3eb7f8',
                        },
                        scheduled: {
                            count: scheduledCount,
                            label: 'Mission Programmer',
                            icon: 'calendar',
                            color: '#304ff2',
                        },
                        canceled: {
                            count: canceledCount,
                            label: 'Mission Annulé',
                            icon: 'ban',
                            color: '#ff5555',
                        },
                        completed: {
                            count: completedCount,
                            label: 'Mission Terminé',
                            icon: 'check-circle',
                            color: '#10b981',
                        },
                    });
                    
                    // Remove the API stats code and stats calculation in catch blocks
                    // Get stats from a separate endpoint
                    try {
                        const statsResponse = await api.get(`${API_URL}/stats`);
                        console.log('API Stats response (not used):', statsResponse.data);
                        // We're intentionally not using the API stats to ensure consistency
                    } catch (statsError) {
                        console.log('Stats API not available (ignored)');
                    }
                } else {
                    console.warn('Invalid API response format:', missionsResponse);
                    throw new Error('Invalid missions data format');
                }
            } catch (apiError: any) {
                console.warn('API error:', apiError.message || apiError);
                if (apiError.response) {
                    console.warn('API response error:', apiError.response.status, apiError.response.data);
                }
                console.log('Falling back to mock data');
                // Fallback to mock data if API call fails
                setMissions(MOCK_MISSIONS);
                setStats(MOCK_STATS);
            }
        } catch (error: any) {
            const errorMsg = error.message || 'Unknown error';
            setError(`Failed to fetch missions: ${errorMsg}`);
            console.error('Error fetching missions:', error);
            // Always fall back to mock data on any error
            setMissions(MOCK_MISSIONS);
            setStats(MOCK_STATS);
        } finally {
            setLoading(false);
        }
    };

    const fetchMissionById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            // Try to fetch from the API
            try {
                // Extract numeric ID from formatted string (MISS-123 => 123)
                const numericId = id.replace('MISS-', '');
                
                const response = await api.get(`${API_URL}/${numericId}`);
                const transformedMission = transformMissionData(response.data);
                setSelectedMission(transformedMission);
            } catch (apiError) {
                console.warn('API not available, using mock data:', apiError);
                // Use mock data when API is not available
                const mockMission = MOCK_MISSIONS.find(m => m.id === id) || null;
                setSelectedMission(mockMission);
            }
        } catch (err) {
            setError('Failed to fetch mission details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createMission = async (missionData: any) => {
        setLoading(true);
        setError(null);
        try {
            // Prepare data for the backend
            const formattedData = {
                vehicleID: missionData.vehicleId,
                driverID: missionData.driverId,
                accompanyingEmployeeIDs: missionData.accompanyingEmployeeIds || [], // Array of employee IDs
                missionTypeID: missionData.type, // Assuming we're passing the missionTypeID directly
                departure_location: "DG Alger", // Default departure for now
                destination: missionData.destination,
                mission_date: missionData.date,
                mission_time: missionData.time,
                missionObjectiveID: missionData.objective, // Assuming we're passing the objectiveID directly
                description: missionData.description || ""
            };
            
            // Try to post to the API
            try {
                await api.post(API_URL, formattedData);
            } catch (apiError) {
                console.warn('API not available, using mock data:', apiError);
                // Mock success for development
                console.log('Mission created (mock):', missionData);
            }
            await fetchMissions(); // Refresh the missions list
        } catch (err) {
            setError('Failed to create mission');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateMission = async (id: string, missionData: any) => {
        setLoading(true);
        setError(null);
        try {
            // Extract numeric ID
            const numericId = id.replace('MISS-', '');
            
            // Prepare data for the backend (similar to createMission)
            const formattedData = {
                vehicleID: missionData.vehicleId,
                driverID: missionData.driverId,
                accompanyingEmployeeIDs: missionData.accompanyingEmployeeIds || [],
                missionTypeID: missionData.type,
                departure_location: missionData.departureLocation || "DG Alger",
                destination: missionData.destination,
                mission_date: missionData.date,
                mission_time: missionData.time,
                missionObjectiveID: missionData.objective,
                description: missionData.description || ""
            };
            
            // Try to put to the API
            try {
                await api.put(`${API_URL}/${numericId}`, formattedData);
            } catch (apiError) {
                console.warn('API not available, using mock data:', apiError);
                // Mock success for development
                console.log('Mission updated (mock):', id, missionData);
            }
            
            // If the mission being updated is the selected one, update it
            if (selectedMission && selectedMission.id === id) {
                await fetchMissionById(id);
            }
            
            await fetchMissions(); // Refresh the missions list
        } catch (err) {
            setError('Failed to update mission');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteMission = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            // Extract numeric ID
            const numericId = id.replace('MISS-', '');
            
            // Try to delete from the API
            try {
                await api.delete(`${API_URL}/${numericId}`);
            } catch (apiError) {
                console.warn('API not available, using mock data:', apiError);
                // Mock success for development
                console.log('Mission deleted (mock):', id);
            }
            
            // If the mission being deleted is the selected one, clear it
            if (selectedMission && selectedMission.id === id) {
                setSelectedMission(null);
            }
            
            await fetchMissions(); // Refresh the missions list
        } catch (err) {
            setError('Failed to delete mission');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <MissionContext.Provider
            value={{
                missions,
                loading,
                error,
                stats,
                selectedMission,
                fetchMissions,
                fetchMissionById,
                createMission,
                updateMission,
                deleteMission,
            }}
        >
            {children}
        </MissionContext.Provider>
    );
}; 