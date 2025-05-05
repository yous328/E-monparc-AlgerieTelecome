import { ReactNode } from 'react';
import { MissionTableContext } from './CreateMissionTableContext';
import { useFetchMissionTable } from '../../../../hooks/Dashboard/Missions/useFetchMissionTable';

interface Props {
    children: ReactNode;
}

export function MissionTableProvider({ children }: Props) {
    const { missions, loading, error } = useFetchMissionTable();

    return (
        <MissionTableContext.Provider value={{ missionsData: missions, loading, error }}>
            {children}
        </MissionTableContext.Provider>
    );
}
