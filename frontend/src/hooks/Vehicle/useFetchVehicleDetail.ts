import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/axios';
import { IVehicleDetail } from '../../interfaces/Vehicle/IvehicleDetail';

export const useFetchVehicleDetail = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<IVehicleDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/admin/vehicles/${id}`);
                setVehicle(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchVehicle();
    }, [id]);

    return { vehicle, loading, error };
};
