// src/components/Vehicles/vehicleDtails/summary/VehicleSummaryCard.tsx

import { IVehicleDetail } from '../../../interfaces/Vehicle/IvehicleDetail';
import { FuelGaugeChart } from './FuelGaugeChart';
import { ConsumptionCircular } from './ConsumptionCircular';

interface VehicleSummaryCardProps {
    vehicle: IVehicleDetail;
}

export const VehicleSummaryCard = ({ vehicle }: VehicleSummaryCardProps) => {
    return (
        <div className="bg-[#EAEFED] p-6 rounded-xl shadow w-full">
            {/* 1. Brand Title */}
            <h2 className="text-lg font-bold text-gray-700">
                {vehicle.brand.name?.toUpperCase()}{' '}{vehicle.model?.toUpperCase()}
            </h2>
            <p className="text-[16px] font-bold text-gray-700 mb-4">
                {vehicle.registration?.toUpperCase()}
            </p>

            {/* 2. 2x2 Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* LEFT COLUMN */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Vehicle Image */}
                    <div className="mb-4">
                        <img
                            src={vehicle.image_url}
                            alt="Vehicle"
                            style={{ width: '300px', height: '150px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Vehicle Info */}
                    <div className="grid grid-cols-2 gap-y-1 text-xs text-[#3F3F3F] w-full mb-5">
                        {/* Row 1: Contrôle tech & Date ex */}
                        <div className="w-full">
                            <span>Contrôle tech : </span>
                            <span className="font-semibold text-[#3F3F3F]">{vehicle.technical_control.status}</span>
                        </div>
                        <div className="w-full text-right">
                            <span>Date ex : </span>
                            <span className="font-semibold text-[#3F3F3F]">{vehicle.technical_control.expiration_date}</span>
                        </div>

                        {/* Row 2: Assurance & Date ex */}
                        <div className="w-full">
                            <span>Assurance : </span>
                            <span className="font-semibold text-[#3F3F3F] truncate max-w-[110px]">
                                {vehicle.insurance.type}
                            </span>
                        </div>
                        <div className="w-full text-right">
                            <span>Date ex : </span>
                            <span className="font-semibold text-[#3F3F3F]">{vehicle.insurance.expiry_date}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between w-full gap-2 mt-3">
                        <button className="bg-white text-[#3eb7f8] border border-[#cfe8f6] px-3 py-[6px] text-xs font-medium rounded shadow-sm hover:bg-[#e7f6fd] transition-all">
                            Consulter Historique
                        </button>
                        <button className="bg-white text-[#304ff2] border border-[#304ff2] px-3 py-[6px] text-xs font-medium rounded shadow-sm hover:bg-[#edf0ff] transition-all">
                            Signaler Une Panne
                        </button>
                    </div>



                </div>

                {/* RIGHT COLUMN */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Fuel Gauge */}
                    <FuelGaugeChart value={parseFloat(vehicle.fuel_level)} />

                    {/* Consumption Circular */}
                    <ConsumptionCircular
                        average={parseFloat(vehicle.consumption.average)}
                        current={parseFloat(vehicle.consumption.current)}
                    />
                </div>
            </div>
        </div>
    );
};
