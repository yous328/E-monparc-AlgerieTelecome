import { ReactNode } from 'react';
import { KpiCardsProvider } from '../../context/Dashboard/KpiCards/KpiCardsProvider';
import { MissionTableProvider } from '../../context/Dashboard/Missions/MissionTable/MissionTableProvider';
import { MissionTypesProvider } from '../../context/Dashboard/Missions/MissionType/MissionTypesProvider';
import { MissionRealisationProvider } from './Missions/MissionRealisation/MissionRealisationProvider';

interface DashboardProviderProps {
    children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
    return (
        <KpiCardsProvider>
            <MissionTableProvider>
            <MissionTypesProvider>
                <MissionRealisationProvider>
                {children}
                </MissionRealisationProvider>
            </MissionTypesProvider>
            </MissionTableProvider>
        </KpiCardsProvider>
    );

}
