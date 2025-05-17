import { createContext } from 'react';
import { IMission } from '../../interfaces/mission/IMission';
import { IMissionStats } from '../../interfaces/mission/IMissionStats';

interface IMissionContext {
    missions: IMission[];
    loading: boolean;
    error: string | null;
    stats: IMissionStats;
    selectedMission: IMission | null;
    fetchMissions: () => Promise<void>;
    fetchMissionById: (id: string) => Promise<void>;
    createMission: (missionData: any) => Promise<void>;
    updateMission: (id: string, missionData: any) => Promise<void>;
    deleteMission: (id: string) => Promise<void>;
}

export const MissionContext = createContext<IMissionContext | undefined>(undefined); 