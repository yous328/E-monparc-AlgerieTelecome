import { IKpiData } from './IkpiData';

export interface IKpiCardsContext {
    kpiData: IKpiData | null;
    loading: boolean;
    error: string | null;
}
