import { ReactNode } from 'react';
import { useFetchMissionRealisation } from '../../../../hooks/Dashboard/Missions/useFetchMissionRealisation';
import { MissionRealisationContext } from './CreateMissionRealisationContext';

interface Props {
    children: ReactNode;
}

export function MissionRealisationProvider({ children }: Props) {
    const { data, loading, error } = useFetchMissionRealisation();

    return (
        <MissionRealisationContext.Provider value={{ monthlyMissionStats: data, loading, error }}>
            {children}
        </MissionRealisationContext.Provider>
    );
}
