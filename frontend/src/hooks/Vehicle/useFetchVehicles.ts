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
    driver: {
        name: string;
        phone: string;
        status: string;
    } | null;
    debug_info?: {
        vehicle_status: string;
        has_mission: boolean;
        has_driver: boolean;
        has_user: boolean;
        mission_status: string | null;
    };
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

            console.log('API response data:', data.data);
            
            const vehicles: IVehicle[] = data.data.map((item): IVehicle => {
                console.log(`Vehicle ${item.id} brand_logo:`, item.brand_logo);
                
                if (item.debug_info) {
                    console.log(`Vehicle ${item.id} debug info:`, item.debug_info);
                }
                
                return {
                    id: item.id,
                    brand: item.brand,
                    registration: item.registration_number,
                    brandLogo: item.brand_logo ?? '',
                    status: item.status,
                    driver: item.driver_name !== "Driver On Mission" ? item.driver_name ?? 'Unassigned' : 'Unassigned',
                    driverDetails: item.driver,
                    kilometers: item.kilometrage ?? 0,
                    dailyCost: item.leasing_price ?? 0,
                    vidangeNextDue: item.technical_status?.vidange?.next_due ?? 0,
                };
            });

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
