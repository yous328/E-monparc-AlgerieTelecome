import { IVehicleDetail } from '../../../interfaces/Vehicle/IvehicleDetail';
import { FuelGaugeChart } from './FuelGaugeChart';
import { ConsumptionCircular } from './ConsumptionCircular';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface VehicleSummaryCardProps {
    vehicle: IVehicleDetail;
}

export const VehicleSummaryCard = ({ vehicle }: VehicleSummaryCardProps) => {
    const [imageError, setImageError] = useState(false);
    
    // Using the existing fallback image in public directory
    const placeholderImage = '/fallback-vehicle.png';
    
    // Handle image loading errors
    const handleImageError = () => {
        console.log('Image failed to load:', vehicle.model?.photo);
        setImageError(true);
    };

    // Get image source with proper error handling
    const getImageSource = () => {
        if (imageError || !vehicle.model?.photo) {
            return placeholderImage;
        }
        
        return vehicle.model.photo;
    };

    return (
        <div className="bg-white rounded-lg shadow w-full overflow-hidden">
            {/* Header with Brand Title and More Options */}
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {vehicle.brand.name?.toUpperCase()} {vehicle.model.name?.toUpperCase()}
                    </h2>
                    <p className="text-base font-bold text-gray-700">
                        {vehicle.registration?.toUpperCase()}
                    </p>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 p-4">
                {/* LEFT COLUMN */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Vehicle Image */}
                    <div className="mb-2 bg-gray-50 rounded w-64 h-40 flex items-center justify-center">
                        <img
                            src={getImageSource()}
                            alt={`${vehicle.brand.name} ${vehicle.model.name}`}
                            className="w-full h-full object-contain p-2"
                            onError={handleImageError}
                        />
                    </div>

                    {/* Vehicle Info */}
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600 w-full px-2">
                        {/* Row 1: Contrôle tech & Date ex */}
                        <div className="w-full">
                            <span>Contrôle tech : </span>
                            <span className="font-semibold">{vehicle.technical_control.status}</span>
                        </div>
                        <div className="w-full text-right">
                            <span>Date ex : </span>
                            <span className="font-semibold">{vehicle.technical_control.expiration_date}</span>
                        </div>

                        {/* Row 2: Assurance & Date ex */}
                        <div className="w-full">
                            <span>Assurance : </span>
                            <span className="font-semibold truncate max-w-[110px] inline-block align-bottom">
                                {vehicle.insurance.type}
                            </span>
                        </div>
                        <div className="w-full text-right">
                            <span>Date ex : </span>
                            <span className="font-semibold">{vehicle.insurance.expiry_date}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full px-2 gap-2 mt-2">
                        <button className="bg-white text-[#3eb7f8] border border-[#cfe8f6] px-3 py-2 text-xs font-medium rounded shadow-sm hover:bg-[#e7f6fd] transition-all flex-1">
                            Consulter Historique
                        </button>
                        <button className="bg-white text-[#304ff2] border border-[#304ff2] px-3 py-2 text-xs font-medium rounded shadow-sm hover:bg-[#edf0ff] transition-all flex-1">
                            Signaler Une Panne
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Fuel Gauge */}
                    <FuelGaugeChart value={parseFloat(vehicle.fuel_level ?? '0')} />

                    {/* Consumption Circular */}
                    <ConsumptionCircular
                        average={parseFloat(vehicle.consumption.average.toString())}
                        current={parseFloat(vehicle.consumption.current.toString())}
                        averagePercent={vehicle.consumption.average_percent}
                        currentPercent={vehicle.consumption.current_percent}
                    />
                </div>
            </div>
        </div>
    );
};
