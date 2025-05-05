import { useContext } from 'react';
import { MissionTypesContext } from './CreateMissionTypesContext';

export function useMissionTypesContext() {
    const context = useContext(MissionTypesContext);
    if (!context) {
        throw new Error('useMissionTypesContext must be used within a MissionTypesProvider');
    }
    return context;
}
