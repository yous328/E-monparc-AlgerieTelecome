import { useContext } from 'react';
import { KpiCardsContext } from './CreateKpiCardsContext';

export function useKpiCards() {
    const context = useContext(KpiCardsContext);

    if (!context) {
        throw new Error('useKpiCards must be used within a KpiCardsProvider');
    }

    return context;
}