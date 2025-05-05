// src/context/Dashboard/KpiCards/KpiCardsProvider.tsx
import { ReactNode } from 'react';
import { KpiCardsContext } from './CreateKpiCardsContext';
import { IKpiCardsContext } from '../../../interfaces/Dashboard/KpiCards/IkpiCardContext';
import { useFetchKpiStats } from '../../../hooks/Dashboard/KpiCards/useFetchKpiStats';

interface KpiCardsProviderProps {
    children: ReactNode;
}

export function KpiCardsProvider({ children }: KpiCardsProviderProps) {
    const { kpiData, loading, error } = useFetchKpiStats();

    const value: IKpiCardsContext = {
        kpiData,
        loading,
        error,
    };

    return (
        <KpiCardsContext.Provider value={value}>
            {children}
        </KpiCardsContext.Provider>
    );
}
