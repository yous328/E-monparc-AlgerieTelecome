import { useEffect, useState } from "react";
import api from "../../lib/axios";

import {
    VehicleBrand,
    VehicleType,
    EngineType,
    FuelType,
    Color,
    Service,
} from "../../interfaces/Vehicle/IVehicleFormOptions";

interface VehicleFormOptions {
    brands: VehicleBrand[];
    types: VehicleType[];
    engines: EngineType[];
    fuels: FuelType[];
    colors: Color[];
    services: Service[];
}

export const useVehicleFormOptions = () => {
    const [options, setOptions] = useState<VehicleFormOptions>({
        brands: [],
        types: [],
        engines: [],
        fuels: [],
        colors: [],
        services: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await api.get("admin/vehicles/form/data");
                setOptions(response.data);
            } catch (error) {
                console.error("Error fetching vehicle form data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    return { options, loading };
};
