import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import { IMonthlyMissionStat } from '../../../interfaces/Dashboard/Missions/MissionRealisation';

interface RawStat {
    month: string;
    planned: number;
    completed: number;
}

export function useFetchMissionRealisation() {
    const [data, setData] = useState<IMonthlyMissionStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get('admin/dashboard/stats/monthly')
            .then((res) => {
                const rawStats = res.data as RawStat[];

                if (!Array.isArray(rawStats)) {
                    throw new Error('Invalid monthly mission stats format');
                }

                const chartData: IMonthlyMissionStat[] = rawStats.map((item) => ({
                    month: item.month,
                    planned: item.planned,
                    realized: item.completed, // map 'completed' to 'realized'
                }));

                setData(chartData);
            })
            .catch((error) => {
                console.error('Error fetching mission stats:', error);
                setError('Failed to load mission realization data');
            })
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
