import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import { IMissionTypeStats } from '../../../interfaces/Dashboard/Missions/MissionType';

export function useFetchMissionTypes() {
    const [data, setData] = useState<IMissionTypeStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await api.get<IMissionTypeStats>('admin/dashboard/stats/type/missions');
                setData(response.data);
            } catch (err) {
                console.error('Error fetching mission type stats:', err);
                setError('Failed to load mission type stats');
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { data, loading, error };
}
