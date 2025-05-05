import { createContext } from 'react';
import { IMissionInProgress } from '../../../../interfaces/Dashboard/Missions/MissionTable';

export const MissionTableContext = createContext<{
    missionsData: IMissionInProgress[];
    loading: boolean;
    error: string | null;
} | undefined>(undefined);
