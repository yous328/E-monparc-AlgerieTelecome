import { useCallback } from 'react';
import api from '../../lib/axios';
import { IVehicle } from '../../interfaces/Vehicle/IVehicle';

interface VehicleFilters {
    type?: string;
    status?: string;
    assignment?: string;
}

interface VehicleApiResponse {
    id: number;
    brand: string;
    registration_number: string;
    brand_logo: string;
    status: string;
    driver_name: string;
    kilometrage: number;
    leasing_price: number;
    technical_status: {
        vidange: {
            next_due: number;
        };
    };
}

export function useFetchVehicles() {
    const fetchVehicles = useCallback(
        async (filters: VehicleFilters = {}, page: number = 1) => {
            const params = new URLSearchParams();

            if (filters.type) params.append('type', filters.type);
            if (filters.status) params.append('status', filters.status);
            if (filters.assignment) params.append('assignment', filters.assignment);
            params.append('page', page.toString());

            const url =
                [filters.type, filters.status, filters.assignment].some(Boolean)
                    ? `admin/vehicles?${params.toString()}`
                    : `admin/vehicles?page=${page}`;

            const { data } = await api.get<{
                data: VehicleApiResponse[];
                current_page: number;
                last_page: number;
                total: number;
            }>(url);

            const vehicles: IVehicle[] = data.data.map((item): IVehicle => ({
                id: item.id,
                brand: item.brand,
                model: item.brand,
                registration: item.registration_number,
                brandLogo: item.brand_logo ?? '',
                status: item.status,
                driver: item.driver_name ?? 'Unassigned',
                kilometers: item.kilometrage ?? 0,
                dailyCost: item.leasing_price ?? 0,
                vidangeNextDue: item.technical_status?.vidange?.next_due ?? 0,
            }));

            return {
                vehicles,
                currentPage: data.current_page,
                totalPages: data.last_page,
                total: data.total,
            };
        },
        []
    );

    return { fetchVehicles };
}
