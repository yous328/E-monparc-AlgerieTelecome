import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import { IMissionInProgress } from '../../../interfaces/Dashboard/Missions/MissionTable';

export function useFetchMissionTable() {
    const [missions, setMissions] = useState<IMissionInProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get('admin/dashboard/stats/current/missions')
            .then((res) => {
                setMissions(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch mission table data:', err);
                setError('Failed to load missions data.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { missions, loading, error };
}