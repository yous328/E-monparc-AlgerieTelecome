import { ReactNode } from 'react';
import { useFetchMissionTypes } from '../../../../hooks/Dashboard/Missions/useFetchMissionTypes';
import { MissionTypesContext } from './CreateMissionTypesContext';

interface Props {
    children: ReactNode;
}

export function MissionTypesProvider({ children }: Props) {
    const { data: missionTypeStats, loading, error } = useFetchMissionTypes();

    return (
        <MissionTypesContext.Provider
            value={{ missionTypeStats: missionTypeStats!, loading, error }}
        >
            {children}
        </MissionTypesContext.Provider>
    );
}

