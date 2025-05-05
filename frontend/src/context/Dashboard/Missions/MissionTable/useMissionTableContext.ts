import { useContext } from 'react';
import { MissionTableContext } from './CreateMissionTableContext';

export function useMissionTableContext() {
    const context = useContext(MissionTableContext);
    if (!context) {
        throw new Error('useMissionTableContext must be used within a MissionTableProvider');
    }
    return context;
}
