import { useState, useEffect } from 'react';
import api from '../../lib/axios';

interface VehicleType {
  vehicleTypeID: number;
  name: string;
}

export function useVehicleTypes() {
  const [types, setTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        // Assuming there's an endpoint to fetch vehicle types
        const response = await api.get('/admin/vehicles/form/data');
        setTypes(response.data.types || []);
      } catch (err) {
        console.error('Error fetching vehicle types:', err);
        setError('Failed to load vehicle types');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, loading, error };
} 