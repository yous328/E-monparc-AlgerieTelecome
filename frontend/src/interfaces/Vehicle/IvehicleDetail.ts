import { IBrand } from "./IBrand";
import { IModel } from "./IModel";
import { IConsumption } from "./IConsumption";
import { IInsurance } from "./Iinsurance";
import { ITechnicalControl } from "./ITechnicalControl";
import { ITechnicalStatus } from "./ITechnicalStatus";
import { IUsageHistory } from "./IUsageHistory";
import { IMission } from "./IMission";
import { IMissionStats } from "./IMissionStat";
import { IKilometrageChart } from "./IKilometrageChart";



export interface IVehicleDetail {
    id: number;
    registration: string;
    status: string;
    brand: IBrand;
    model: IModel;
    driver: string | null;
    consumption: IConsumption;
    fuel_level: string;
    insurance: IInsurance;
    technical_control: ITechnicalControl;
    technical_status: ITechnicalStatus;
    usage_history: IUsageHistory[];
    missions: IMission[];
    mission_stats: IMissionStats[];
    monthly_kilometrage: IKilometrageChart[];
}
