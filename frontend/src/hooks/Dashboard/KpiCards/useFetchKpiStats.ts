// src/hooks/dashboard/useFetchKpiStats.ts
import { useState, useEffect } from 'react';
import api from '../../../lib/axios';
import { IKpiData } from '../../../interfaces/Dashboard/KpiCards/IkpiData';

export function useFetchKpiStats() {
    const [kpiData, setKpiData] = useState<IKpiData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const endpoints = ['vehicles', 'drivers', 'missions'];
                const responses = await Promise.all(
                    endpoints.map(endpoint => api.get(`admin/dashboard/stats/${endpoint}`))
                );

                console.log("Fetched KPI responses:", responses.map(r => r.data));

                setKpiData({
                    vehicles: {
                        total: responses[0]?.data?.total || 0,
                        occupied: responses[0]?.data?.occupied || 0,
                        available: responses[0]?.data?.available ?? responses[0]?.data?.Available ?? 0,
                        in_breakdown: responses[0]?.data?.in_breakdown ?? responses[0]?.data?.in_breakdown ?? 0,
                    },
                    drivers: {
                        total: responses[1]?.data?.total || 0,
                        occupied: responses[1]?.data?.occupied ?? responses[1]?.data?.on_mission ?? 0,
                        available: responses[1]?.data?.available || 0,
                        unavailable: responses[1]?.data?.unavailable || 0,
                    },
                    missions: {
                        total: responses[2]?.data?.total || 0,
                        cancelled: responses[2]?.data?.cancelled ?? responses[2]?.data?.canceled ?? 0,
                        in_progress: responses[2]?.data?.in_progress ?? responses[2]?.data?.ongoing ?? 0,
                        planned: responses[2]?.data?.planned ?? responses[2]?.data?.scheduled ?? 0,
                    },
                });
            } catch (err) {
                console.error('Error fetching KPI stats:', err);
                setError('Failed to load KPI data.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { kpiData, loading, error };
}
