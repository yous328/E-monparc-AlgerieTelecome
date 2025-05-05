import { createContext } from 'react';
import { IKpiCardsContext } from '../../../interfaces/Dashboard/KpiCards/IkpiCardContext';

export const KpiCardsContext = createContext<IKpiCardsContext | undefined>(undefined);
