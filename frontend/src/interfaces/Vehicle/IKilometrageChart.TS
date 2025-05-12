export interface IKilometrageChart {
    month: string;
    days: {
        [day: string]: number;
    };
}
