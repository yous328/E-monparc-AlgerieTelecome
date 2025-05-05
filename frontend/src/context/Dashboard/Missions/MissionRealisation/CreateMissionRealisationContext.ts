import { createContext } from 'react';
import { IMonthlyMissionStat } from '../../../../interfaces/Dashboard/Missions/MissionRealisation/index';

export const MissionRealisationContext = createContext<{
    monthlyMissionStats: IMonthlyMissionStat[];
    loading: boolean;
    error: string | null;
} | undefined>(undefined);
