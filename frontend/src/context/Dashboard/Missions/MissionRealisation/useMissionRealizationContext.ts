import { useContext } from 'react';
import { MissionRealisationContext } from '../MissionRealisation/CreateMissionRealisationContext';

export function useMissionRealizationContext() {
    const context = useContext(MissionRealisationContext);
    if (!context) {
        throw new Error('useMissionRealizationContext must be used within a MissionRealizationProvider');
    }
    return context;
}
