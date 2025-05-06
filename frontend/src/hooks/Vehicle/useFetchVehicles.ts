import { useCallback } from 'react';
import api from '../../lib/axios';
import { IVehicle } from '../../interfaces/Vehicle/IVehicle';

interface VehicleFilters {
    type?: string;
    status?: string;
    assignment?: string;
}

interface TechnicalItemRaw {
    done_at: number;
    next_due: number;
}

interface VehicleApiResponse {
    id: number;
    brand: string;
    registration_number: string;
    image_url: string;
    status: string;
    kilometrage: number;
    fuel: number;
    consumption_avg: number;
    consumption_current: number;
    price: number;
    leasing_price: number;
    driver_name: string;
    technical_check_expiry: string;
    insurance_type: string;
    insurance_expiry: string;
    usage_history: Array<{
        driver_name: string;
        phone: string;
        date: string;
        from: string;
        to: string;
        distance_km: number;
        average_speed: string;
    }>;
    missions_per_month: number;
    technical_status: {
        vidange: TechnicalItemRaw;
        batterie: TechnicalItemRaw;
        bougies: TechnicalItemRaw;
        gaz_clim: TechnicalItemRaw;
        chaine: TechnicalItemRaw;
        pneus: TechnicalItemRaw;
        filtres: TechnicalItemRaw;
        plaquettes_frein: TechnicalItemRaw;
    };
}

export function useFetchVehicles() {
    const fetchVehicles = useCallback(async (filters: VehicleFilters = {}) => {
        const params = new URLSearchParams();

        if (filters.type) params.append('type', filters.type);
        if (filters.status) params.append('status', filters.status);
        if (filters.assignment) params.append('assignment', filters.assignment);

        const url = [filters.type, filters.status, filters.assignment].some(Boolean)
            ? `admin/vehicles?${params.toString()}`
            : `admin/vehicles`;

        const { data } = await api.get<VehicleApiResponse[]>(url);

        return data.map((item): IVehicle => ({
            id: item.id,
            brand: item.brand,
            model: item.brand,
            registration: item.registration_number,
            imageUrl: item.image_url ?? '',
            status: item.status as 'Disponible' | 'Occupé' | 'En Panne',
            kilometers: item.kilometrage ?? 0,
            fuelLevel: item.fuel ?? 0,
            costPerKm: item.price ?? 0,
            dailyCost: item.leasing_price ?? 0,
            driver: item.driver_name ?? 'Unassigned',
            insurance: item.insurance_type ?? '',
            inspectionDate: item.technical_check_expiry ?? '',
            expirationDate: item.insurance_expiry ?? '',
            averageConsumption: {
                label: 'Consommation Moyenne',
                value: Number(item.consumption_avg),
            },
            currentConsumption: {
                label: 'Consommation Actuelle',
                value: Number(item.consumption_current),
            },
            missions_per_month: item.missions_per_month ?? 0,
            usageHistory: item.usage_history.map((h) => ({
                driverName: h.driver_name,
                phoneNumber: h.phone,
                date: h.date,
                route: `${h.from} → ${h.to}`,
                distance: h.distance_km,
                speed: parseFloat(h.average_speed),
            })),
            technicalStatus: {
                vidange: item.technical_status.vidange,
                batterie: item.technical_status.batterie,
                bougies: item.technical_status.bougies,
                gazClim: item.technical_status.gaz_clim,
                chaine: item.technical_status.chaine,
                pneus: item.technical_status.pneus,
                filtres: item.technical_status.filtres,
                plaquettesFrein: item.technical_status.plaquettes_frein,
            },
        }));
    }, []);

    return { fetchVehicles };
}
