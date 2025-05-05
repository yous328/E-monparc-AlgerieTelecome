import { createContext } from 'react';
import { IMissionTypeStats } from '../../../../interfaces/Dashboard/Missions/MissionType';

export const MissionTypesContext = createContext<{
    missionTypeStats: IMissionTypeStats;
    loading: boolean;
    error: string | null;
} | undefined>(undefined);
