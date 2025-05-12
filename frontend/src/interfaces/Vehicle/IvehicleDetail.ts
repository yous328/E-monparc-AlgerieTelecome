import { IBrand } from "./IBrand";
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
    model: string;
    image_url: string;
    driver: string | null;
    consumption: IConsumption;
    fuel_level: string;
    insurance: IInsurance;
    technical_control: ITechnicalControl;
    technical_status: ITechnicalStatus;
    usage_history: IUsageHistory[];
    missions: IMission[];
    mission_stats: IMissionStats[];
    kilometrage_chart: IKilometrageChart[];
    monthly_kilometrage: IKilometrageChart[];
}