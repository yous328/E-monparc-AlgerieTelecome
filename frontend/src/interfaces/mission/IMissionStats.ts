export interface IMissionStat {
    count: number;
    label: string;
    icon: string;
    color: string;
}

export interface IMissionStats {
    inProgress: IMissionStat;
    scheduled: IMissionStat;
    canceled: IMissionStat;
    completed: IMissionStat;
} 